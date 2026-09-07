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
import { publishedEntries, type RegistryKind } from "@/lib/registry";

export const searchIndex: SearchDocument[] = publishedEntries.map((entry) => ({
  id: entry.id,
  title: entry.title,
  category: entry.category,
  description: entry.description,
  href: entry.href,
  boost: entry.boost,
  keywords: entry.keywords,
}));

/** Facets offered in the UI, derived from what is actually in the index. */
export const searchCategories: string[] = [
  ...new Set(publishedEntries.map((entry) => entry.category)),
].sort();

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

/** Grouped for display — category headers rather than a badge per row. */
export function groupResults(results: SearchResult[]): [string, SearchResult[]][] {
  const groups = new Map<string, SearchResult[]>();
  for (const r of results) {
    const existing = groups.get(r.category);
    if (existing) existing.push(r);
    else groups.set(r.category, [r]);
  }
  return [...groups.entries()];
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
