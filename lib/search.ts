/**
 * Search index and query engine.
 *
 * Built from the content registry at build time — no external provider, no
 * runtime cost, and nothing duplicated. Because the registry applies
 * publication status, a draft entity can never appear in search results.
 *
 * The SearchDocument shape is provider-agnostic, so Prompt 5 can swap in a
 * hosted service without changing the UI.
 */

import type { SearchDocument } from "@/types/content";
import {
  publishedEntries,
  sectionPages,
  type RegistryKind,
} from "@/lib/registry";

export const searchIndex: SearchDocument[] = publishedEntries.map((entry) => ({
  id: entry.id,
  title: entry.title,
  category: entry.category,
  description: entry.description,
  href: entry.href,
  boost: entry.boost,
  keywords: entry.keywords,
}));

/**
 * The order sections are shown in, everywhere.
 *
 * Grouping alone is not enough: `groupResults` emits groups in whatever order
 * the ranking happened to produce them, so the same query could put Company
 * above Services one keystroke and below it the next. A person scanning a
 * results panel is navigating by position as much as by label, and a list
 * that reorders under them is one they have to re-read every time.
 *
 * This is the site's own hierarchy — what we do, who for, what problem, what
 * with — not a ranking. Ranking still decides what appears inside a section.
 */
export const SECTION_ORDER = [
  "Services",
  "Industries",
  "Use Cases",
  "Technologies",
  "Case Studies",
  "Resources",
  "Glossary",
  "Company",
  "Contact",
] as const;

/** Where each section's own index lives, for the "all N" links. */
export const SECTION_HUB: Record<string, string> = {
  Services: "/services/",
  Industries: "/industries/",
  "Use Cases": "/use-cases/",
  Technologies: "/technologies/",
  "Case Studies": "/case-studies/",
  Resources: "/resources/",
  Glossary: "/resources/#glossary",
  Company: "/company/",
  Contact: "/contact/",
};

const sectionRank = (category: string) => {
  const index = (SECTION_ORDER as readonly string[]).indexOf(category);
  /* An unknown category sorts last rather than disappearing. */
  return index === -1 ? SECTION_ORDER.length : index;
};

/**
 * Facets offered in the UI, derived from what is actually in the index and
 * ordered the way results are — an alphabetical facet row above a
 * hierarchical result list asks the reader to hold two orders at once.
 */
export const searchCategories: string[] = [
  ...new Set(publishedEntries.map((entry) => entry.category)),
].sort((a, b) => sectionRank(a) - sectionRank(b));

/**
 * Synonym map — users do not search in our taxonomy.
 * From docs/architecture/06.
 */
const SYNONYMS: Record<string, string[]> = {
  aeo: ["answer engine optimisation", "featured snippets", "direct answers"],
  geo: ["generative engine optimisation", "ai citations"],
  aio: ["ai optimisation", "crawlability"],
  sxo: ["search experience optimisation", "conversion"],
  ai: ["artificial intelligence", "chatgpt", "llm"],
  website: ["web design", "web development", "site"],
  chatbot: ["ai agent", "virtual assistant", "bot"],
  price: ["pricing", "cost", "rates", "charges", "budget", "quote"],
  cost: ["pricing", "price", "rates", "budget"],
  automation: ["automate", "workflow", "process"],
  seo: ["search engine optimisation", "organic", "rankings"],
  leads: ["enquiries", "lead generation", "pipeline"],
  gbp: ["google business profile", "local search", "maps"],
  case: ["case study", "client work", "proof"],
  guide: ["article", "resource", "insight"],
};

function expandQuery(query: string): string[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);
  const expanded = new Set(terms);
  for (const term of terms) {
    for (const syn of SYNONYMS[term] ?? []) expanded.add(syn);
  }
  return [...expanded];
}

/** Cheap edit-distance-1 check, used only for terms of 5+ characters. */
function isNearMatch(term: string, target: string): boolean {
  if (term.length < 5) return false;
  if (Math.abs(term.length - target.length) > 1) return false;
  let mismatches = 0;
  let i = 0;
  let j = 0;
  while (i < term.length && j < target.length) {
    if (term[i] === target[j]) {
      i += 1;
      j += 1;
      continue;
    }
    mismatches += 1;
    if (mismatches > 1) return false;
    if (term.length > target.length) i += 1;
    else if (term.length < target.length) j += 1;
    else {
      i += 1;
      j += 1;
    }
  }
  return true;
}

export interface SearchResult extends SearchDocument {
  score: number;
}

export function search(
  query: string,
  options: { limit?: number; category?: string } = {},
): SearchResult[] {
  const { limit = 20, category } = options;
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const terms = expandQuery(trimmed);
  const results: SearchResult[] = [];

  const pool = category
    ? searchIndex.filter((doc) => doc.category === category)
    : searchIndex;

  for (const doc of pool) {
    const haystackTitle = doc.title.toLowerCase();
    const haystackBody =
      `${doc.description} ${(doc.keywords ?? []).join(" ")}`.toLowerCase();
    let score = 0;

    for (const term of terms) {
      if (haystackTitle === term) score += 60;
      else if (haystackTitle.startsWith(term)) score += 40;
      else if (haystackTitle.includes(term)) score += 25;

      if (haystackBody.includes(term)) score += 10;

      if (score === 0) {
        const words = haystackTitle.split(/\s+/);
        if (words.some((w) => isNearMatch(term, w))) score += 8;
      }
    }

    if (score > 0) {
      results.push({ ...doc, score: score + doc.boost / 10 });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Grouped for display — category headers rather than a badge per row.
 *
 * Ordered by SECTION_ORDER rather than by which section happened to rank
 * first, so the full results page and the search dialog present the same
 * sections in the same sequence.
 */
export function groupResults(results: SearchResult[]): [string, SearchResult[]][] {
  const groups = new Map<string, SearchResult[]>();
  for (const r of results) {
    const existing = groups.get(r.category);
    if (existing) existing.push(r);
    else groups.set(r.category, [r]);
  }
  return [...groups.entries()].sort(
    ([a], [b]) => sectionRank(a) - sectionRank(b),
  );
}

/* ==========================================================================
   Section-wise results
   ========================================================================== */

export interface SearchSection {
  category: string;
  /** Ranked results for this section, capped to `perSection`. */
  items: SearchResult[];
  /** How many matched in total, which is what makes "N more" honest. */
  total: number;
  hub: string;
}

/**
 * Results grouped into sections, in the site's own order.
 *
 * A single ranked list of twenty is dominated by whichever section happens to
 * have the most pages — with 145 resources against 26 industries, "seo"
 * returned a wall of glossary entries and no industry at all. Allocating a
 * few rows per section instead means every part of the site that has an
 * answer gets to show one, and the count says how much more there is.
 */
export function searchSections(
  query: string,
  options: { perSection?: number; pool?: number } = {},
): SearchSection[] {
  const { perSection = 4, pool = 400 } = options;
  const results = search(query, { limit: pool });
  if (results.length === 0) return [];

  const grouped = new Map<string, SearchResult[]>();
  for (const result of results) {
    const existing = grouped.get(result.category);
    if (existing) existing.push(result);
    else grouped.set(result.category, [result]);
  }

  return [...grouped.entries()]
    .map(([category, items]) => ({
      category,
      items: items.slice(0, perSection),
      total: items.length,
      hub: SECTION_HUB[category] ?? "/search/",
    }))
    .sort((a, b) => sectionRank(a.category) - sectionRank(b.category));
}

/** Every result a section-wise view is showing, in reading order. */
export const flattenSections = (sections: SearchSection[]): SearchResult[] =>
  sections.flatMap((section) => section.items);

/* ==========================================================================
   The complete page directory
   ========================================================================== */

export interface DirectorySection {
  category: string;
  hub: string;
  items: SearchDocument[];
}

/**
 * Every published page on the site, grouped into the same sections search
 * uses and ordered the same way.
 *
 * This is the registry itself, not a copy of it: adding a page to content/
 * puts it here, and an unpublished one cannot appear because the registry
 * has already applied the publication gate. Nothing on this page is written
 * by hand, which is the only way a directory of 300 entries stays true.
 */
export function pageDirectory(): DirectorySection[] {
  const grouped = new Map<string, SearchDocument[]>();
  for (const doc of searchIndex) {
    const existing = grouped.get(doc.category);
    if (existing) existing.push(doc);
    else grouped.set(doc.category, [doc]);
  }

  return [...grouped.entries()]
    .map(([category, items]) => ({
      category,
      hub: SECTION_HUB[category] ?? "/",
      items: [...items].sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => sectionRank(a.category) - sectionRank(b.category));
}

/** Section landing pages, which are routes rather than content entities. */
export const directoryHubs: { label: string; href: string }[] = sectionPages
  .filter((page) => page.href !== "/contact/")
  .map((page) => ({ label: page.title, href: page.href }));

/** How many pages the directory holds, for the label on the way into it. */
export const totalPageCount = searchIndex.length + directoryHubs.length;

/**
 * Directory filter. Deliberately not the ranked `search` above: on this page
 * the reader is scanning a known list, so a plain substring match over title
 * and section keeps every entry in its own group and preserves the ordering
 * they are reading. Ranking would reshuffle the alphabet under them.
 */
export function filterDirectory(
  sections: DirectorySection[],
  query: string,
): DirectorySection[] {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) return sections;

  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(needle) ||
          item.href.toLowerCase().includes(needle) ||
          section.category.toLowerCase().includes(needle) ||
          (item.keywords ?? []).some((k) => k.toLowerCase().includes(needle)),
      ),
    }))
    .filter((section) => section.items.length > 0);
}

/** Curated starting points shown before a query is typed. */
export const popularSearches = [
  { label: "AI search visibility", href: "/services/ai-search-optimisation/" },
  { label: "SEO services", href: "/services/seo/" },
  { label: "Workflow automation", href: "/services/workflow-automation/" },
  { label: "Generate more leads", href: "/use-cases/generate-more-leads/" },
];

/** Section entry points offered in empty and no-results states. */
export const browseSections: { label: string; href: string; kind: RegistryKind }[] =
  [
    { label: "Services", href: "/services/", kind: "service" },
    { label: "Industries", href: "/industries/", kind: "industry" },
    { label: "Use cases", href: "/use-cases/", kind: "use-case" },
    { label: "Technologies", href: "/technologies/", kind: "technology" },
    { label: "Case studies", href: "/case-studies/", kind: "case-study" },
    { label: "Resources", href: "/resources/", kind: "resource" },
  ];
