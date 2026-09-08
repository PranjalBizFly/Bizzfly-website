#!/usr/bin/env node
/**
 * Page audit — inventory, duplication and similarity.
 *
 *   npm run audit:pages
 *
 * Reads the content registry for intent metadata and the built HTML in
 * .next/server/app for what actually shipped, then writes three artefacts:
 *
 *   page-inventory.json        every published page with its intent metadata
 *   page-count-report.json     the counts, reconciled against the build
 *   final-page-inventory.csv   the same set, flat, for review outside the repo
 *
 * It also runs the checks that matter for an expansion of this size, because
 * the failure mode of adding a hundred pages is not a broken build — it is
 * two pages that quietly compete for the same intent:
 *
 *   - duplicate URLs, slugs, titles, H1s and meta descriptions
 *   - duplicate primary keywords (keyword cannibalisation)
 *   - near-duplicate opening paragraphs and heading sets
 *   - orphan pages, missing canonicals, missing H1s
 *   - placeholder or unfinished-content markers on published pages
 *
 * Similarity is deliberately reported as PASS / REVIEW / REJECT rather than
 * acted on automatically. Two pages about adjacent subjects are expected to
 * share vocabulary; only near-identical structure is a real problem, and a
 * script should not delete a legitimate page on a threshold.
 *
 * Exits non-zero on any REJECT or hard duplicate.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

import { allEntries, publishedEntries } from "@/lib/registry";
import { resources } from "@/content/resources";
import { services } from "@/content/services";
import { practices } from "@/content/practices";
import { industries } from "@/content/industries";
import { useCases } from "@/content/use-cases";
import { technologies } from "@/content/technologies";
import { allCompanyPages } from "@/content/company";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUILD_DIR = join(ROOT, ".next", "server", "app");

/* --- Built HTML ---------------------------------------------------------- */

function collectBuiltPages(): Map<string, string> {
  const pages = new Map<string, string>();
  if (!existsSync(BUILD_DIR)) return pages;

  const walk = (dir: string) => {
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, name.name);
      if (name.isDirectory()) walk(full);
      else if (name.name.endsWith(".html")) {
        const rel = relative(BUILD_DIR, full).replace(/\\/g, "/");
        const path = rel.replace(/\.html$/, "");
        const url = path === "index" ? "/" : `/${path}/`;
        pages.set(url, readFileSync(full, "utf8"));
      }
    }
  };
  walk(BUILD_DIR);
  return pages;
}

/* --- Extraction ---------------------------------------------------------- */

const strip = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const firstMatch = (html: string, re: RegExp) => html.match(re)?.[1]?.trim() ?? "";

/*
 * The page's own content, with the shared chrome removed.
 *
 * Measured over the whole document, every page shares the header, mega menu
 * and footer, so the opening several hundred words are identical and a naive
 * similarity check reports every pair as a duplicate. It did — 13,670 false
 * positives — before this was scoped.
 *
 * Scoping to <main> does not work here: the App Router streams, so <main>
 * holds a short fallback and the real content arrives later in the document,
 * after </footer>. Removing <header> and <footer> by element is reliable
 * because each appears exactly once, wherever the content lands.
 */
const mainOf = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ");

const extract = (html: string) => {
  const main = mainOf(html);
  return {
    /* Head metadata is document-level. */
    title: firstMatch(html, /<title>([^<]*)<\/title>/i),
    description: firstMatch(html, /<meta name="description" content="([^"]*)"/i),
    canonical: firstMatch(html, /<link rel="canonical" href="([^"]*)"/i),

    /* Everything below is the page's own content. */
    h1: strip(firstMatch(main, /<h1[^>]*>([\s\S]*?)<\/h1>/i)),
    headings: [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
      strip(m[1] ?? ""),
    ),
    links: [
      ...new Set([...main.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1] ?? "")),
    ].filter(Boolean),
    text: strip(main),
  };
};

/* --- Similarity ----------------------------------------------------------
   Jaccard over word trigrams. Cheap, order-sensitive enough to distinguish
   "same subject" from "same sentences", and it needs no dependency.
   ------------------------------------------------------------------------ */

function trigrams(text: string): Set<string> {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/);
  const out = new Set<string>();
  for (let i = 0; i + 2 < words.length; i += 1) {
    out.add(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  return out;
}

function similarity(a: string, b: string): number {
  const A = trigrams(a);
  const B = trigrams(b);
  if (A.size === 0 || B.size === 0) return 0;
  let shared = 0;
  for (const t of A) if (B.has(t)) shared += 1;
  return shared / (A.size + B.size - shared);
}

/* --- Intent metadata from the content records ---------------------------- */

interface IntentMeta {
  pageType: string;
  primaryIntent: string;
  targetAudience: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  services: string[];
  industries: string[];
  useCases: string[];
  technologies: string[];
  status: string;
}

const intentByHref = new Map<string, IntentMeta>();

const record = (
  href: string,
  pageType: string,
  e: {
    seo?: { primaryTopic?: string; secondaryTopics?: string[]; intent?: string };
    audience?: string[];
    status?: string;
    relatedServices?: string[];
    relatedIndustries?: string[];
    relatedUseCases?: string[];
    relatedTechnologies?: string[];
    services?: string[];
    industries?: string[];
    useCases?: string[];
    technologies?: string[];
    supports?: string[];
  },
) => {
  intentByHref.set(href, {
    pageType,
    primaryIntent: e.seo?.intent ?? "",
    targetAudience: e.audience ?? [],
    primaryKeyword: e.seo?.primaryTopic ?? "",
    secondaryKeywords: e.seo?.secondaryTopics ?? [],
    services: e.services ?? e.relatedServices ?? e.supports ?? [],
    industries: e.industries ?? e.relatedIndustries ?? [],
    useCases: e.useCases ?? e.relatedUseCases ?? [],
    technologies: e.technologies ?? e.relatedTechnologies ?? [],
    status: e.status ?? "published",
  });
};

for (const s of services) record(`/services/${s.slug}/`, "service", s);
for (const p of practices) record(`/services/${p.slug}/`, "practice", p);
for (const i of industries) record(`/industries/${i.slug}/`, "industry", i);
for (const u of useCases) record(`/use-cases/${u.slug}/`, "use-case", u);
for (const t of technologies) record(`/technologies/${t.slug}/`, "technology", t);
for (const c of allCompanyPages) record(`/company/${c.slug}/`, "company", c);
for (const r of resources)
  record(`/resources/${r.slug}/`, `resource:${r.type}`, r);

/* --- Build the inventory -------------------------------------------------- */

const built = collectBuiltPages();
const errors: string[] = [];
const warnings: string[] = [];

interface InventoryRow {
  id: string;
  url: string;
  slug: string;
  pageType: string;
  category: string;
  title: string;
  h1: string;
  description: string;
  canonical: string;
  primaryIntent: string;
  targetAudience: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  services: string[];
  industries: string[];
  useCases: string[];
  technologies: string[];
  status: string;
  wordCount: number;
  internalLinks: number;
  intro: string;
  headings: string[];
}

const categoryFor = (url: string) => {
  const seg = url.split("/").filter(Boolean)[0] ?? "home";
  return (
    {
      services: "Services",
      industries: "Industries",
      "use-cases": "Use Cases",
      technologies: "Technologies",
      resources: "Resources",
      "case-studies": "Case Studies",
      company: "Company",
      contact: "Company",
      home: "Other",
    }[seg] ?? "Other"
  );
};

const inventory: InventoryRow[] = [];

for (const [url, html] of [...built.entries()].sort()) {
  /* Route handlers and error pages are not content pages. */
  if (/^\/(404|500|_not-found)/.test(url)) continue;

  const meta = extract(html);
  const intent = intentByHref.get(url);
  const slug = url.split("/").filter(Boolean).pop() ?? "";

  inventory.push({
    id: url === "/" ? "home" : url.replace(/^\/|\/$/g, "").replace(/\//g, "--"),
    url,
    slug: url === "/" ? "" : slug,
    pageType: intent?.pageType ?? (url.split("/").filter(Boolean).length <= 1 ? "index" : "page"),
    category: categoryFor(url),
    title: meta.title,
    h1: meta.h1,
    description: meta.description,
    canonical: meta.canonical,
    primaryIntent: intent?.primaryIntent ?? "",
    targetAudience: intent?.targetAudience ?? [],
    primaryKeyword: intent?.primaryKeyword ?? "",
    secondaryKeywords: intent?.secondaryKeywords ?? [],
    services: intent?.services ?? [],
    industries: intent?.industries ?? [],
    useCases: intent?.useCases ?? [],
    technologies: intent?.technologies ?? [],
    status: intent?.status ?? "published",
    wordCount: meta.text.split(/\s+/).filter(Boolean).length,
    internalLinks: meta.links.length,
    intro: meta.text.slice(0, 600),
    headings: meta.headings,
  });
}

/* --- Checks --------------------------------------------------------------- */

const dupe = <T>(rows: InventoryRow[], key: (r: InventoryRow) => T, label: string) => {
  const seen = new Map<string, string[]>();
  for (const r of rows) {
    const k = String(key(r)).trim().toLowerCase();
    if (!k) continue;
    seen.set(k, [...(seen.get(k) ?? []), r.url]);
  }
  let count = 0;
  for (const [k, urls] of seen) {
    if (urls.length > 1) {
      count += 1;
      errors.push(`duplicate ${label}: "${k.slice(0, 60)}" → ${urls.join(", ")}`);
    }
  }
  return count;
};

const duplicateUrls = new Set(inventory.map((r) => r.url)).size !== inventory.length;
if (duplicateUrls) errors.push("duplicate URLs present in the build output");

const duplicateTitles = dupe(inventory, (r) => r.title, "title");
const duplicateH1s = dupe(inventory, (r) => r.h1, "H1");
const duplicateDescriptions = dupe(inventory, (r) => r.description, "meta description");
const duplicateKeywords = dupe(
  inventory.filter((r) => r.primaryKeyword),
  (r) => r.primaryKeyword,
  "primary keyword",
);

/* Missing essentials. */
for (const r of inventory) {
  if (!r.h1) errors.push(`missing H1: ${r.url}`);
  if (!r.canonical) errors.push(`missing canonical: ${r.url}`);
  if (!r.title) errors.push(`missing title: ${r.url}`);
  if (!r.description) errors.push(`missing meta description: ${r.url}`);
  if (r.internalLinks === 0) errors.push(`no internal links: ${r.url}`);
  for (const marker of ["[CONTENT_REQUIRED]", "lorem ipsum", "Digitak"]) {
    if (r.intro.toLowerCase().includes(marker.toLowerCase())) {
      errors.push(`placeholder content (${marker}): ${r.url}`);
    }
  }
}

/* Orphans: reachable from at least one other page. */
const linkedTo = new Set<string>();
for (const [, html] of built) {
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1] ?? "";
    linkedTo.add(href.endsWith("/") ? href : `${href}/`);
  }
}
const orphans = inventory.filter((r) => r.url !== "/" && !linkedTo.has(r.url));
for (const o of orphans) errors.push(`orphan page: ${o.url}`);

/* Similarity — content pages only, index pages excluded. */
const contentPages = inventory.filter((r) => r.pageType !== "index" && r.wordCount > 120);
interface SimilarityFinding {
  a: string;
  b: string;
  intro: number;
  headings: number;
  verdict: "REVIEW" | "REJECT";
}
const similarPairs: SimilarityFinding[] = [];

for (let i = 0; i < contentPages.length; i += 1) {
  for (let j = i + 1; j < contentPages.length; j += 1) {
    const a = contentPages[i]!;
    const b = contentPages[j]!;
    const intro = similarity(a.intro, b.intro);
    const headings = similarity(a.headings.join(" "), b.headings.join(" "));
    if (intro >= 0.5 || (intro >= 0.35 && headings >= 0.6)) {
      similarPairs.push({
        a: a.url,
        b: b.url,
        intro: Number(intro.toFixed(3)),
        headings: Number(headings.toFixed(3)),
        verdict: intro >= 0.65 ? "REJECT" : "REVIEW",
      });
    }
  }
}
for (const p of similarPairs) {
  const line = `${p.verdict}: ${p.a} ~ ${p.b} (intro ${p.intro}, headings ${p.headings})`;
  if (p.verdict === "REJECT") errors.push(line);
  else warnings.push(line);
}

/* --- Artefacts ------------------------------------------------------------ */

const published = inventory.filter((r) => r.status === "published");
const report = {
  generated: new Date().toISOString().slice(0, 10),
  existingPages: inventory.length,
  publishedPages: published.length,
  draftPages: allEntries.length - publishedEntries.length,
  incompletePages: inventory.filter((r) =>
    r.intro.includes("[CONTENT_REQUIRED]"),
  ).length,
  brokenPages: 0,
  orphanPages: orphans.length,
  duplicatePages: duplicateTitles + duplicateH1s + duplicateKeywords,
  duplicateUrls: duplicateUrls ? 1 : 0,
  duplicateTitles,
  duplicateH1s,
  duplicateDescriptions,
  duplicatePrimaryKeywords: duplicateKeywords,
  highSimilarityPairs: similarPairs.filter((p) => p.verdict === "REJECT").length,
  reviewSimilarityPairs: similarPairs.filter((p) => p.verdict === "REVIEW").length,
  sitemapPages: 0,
  byCategory: Object.fromEntries(
    [...new Set(inventory.map((r) => r.category))].sort().map((c) => [
      c,
      inventory.filter((r) => r.category === c).length,
    ]),
  ),
  byPageType: Object.fromEntries(
    [...new Set(inventory.map((r) => r.pageType))].sort().map((t) => [
      t,
      inventory.filter((r) => r.pageType === t).length,
    ]),
  ),
};

/* Sitemap count, read from the generated route. */
const sitemapFile = join(BUILD_DIR, "sitemap.xml.body");
if (existsSync(sitemapFile)) {
  report.sitemapPages = (readFileSync(sitemapFile, "utf8").match(/<loc>/g) ?? []).length;
}

writeFileSync(
  join(ROOT, "page-inventory.json"),
  `${JSON.stringify(inventory, null, 2)}\n`,
);
writeFileSync(
  join(ROOT, "page-count-report.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);

const csvCell = (v: unknown) => `"${String(v).replace(/"/g, '""')}"`;
const csv = [
  [
    "ID", "URL", "TITLE", "PAGE TYPE", "CATEGORY", "PRIMARY INTENT",
    "TARGET AUDIENCE", "PRIMARY KEYWORD", "CONTENT ANGLE", "STATUS",
    "WORD COUNT", "INTERNAL LINKS",
  ].join(","),
  ...inventory.map((r) =>
    [
      r.id, r.url, r.title, r.pageType, r.category, r.primaryIntent,
      r.targetAudience.join(" "), r.primaryKeyword, r.h1, r.status,
      r.wordCount, r.internalLinks,
    ]
      .map(csvCell)
      .join(","),
  ),
].join("\n");
writeFileSync(join(ROOT, "final-page-inventory.csv"), `${csv}\n`);

/* --- Output --------------------------------------------------------------- */

const line = "─".repeat(74);
console.log(`\nBizzFly page audit\n${line}`);
console.log(`Pages in build        : ${inventory.length}`);
console.log(`Published             : ${report.publishedPages}`);
console.log(`Draft / review        : ${report.draftPages}`);
console.log(`Sitemap URLs          : ${report.sitemapPages}`);
console.log(`Orphan pages          : ${report.orphanPages}`);
console.log(`Duplicate titles      : ${duplicateTitles}`);
console.log(`Duplicate H1s         : ${duplicateH1s}`);
console.log(`Duplicate descriptions: ${duplicateDescriptions}`);
console.log(`Duplicate keywords    : ${duplicateKeywords}`);
console.log(`Similarity REJECT     : ${report.highSimilarityPairs}`);
console.log(`Similarity REVIEW     : ${report.reviewSimilarityPairs}`);

console.log(`\nBy category\n${line}`);
for (const [c, n] of Object.entries(report.byCategory)) {
  console.log(`  ${c.padEnd(16)} ${String(n).padStart(4)}`);
}

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s)\n${line}`);
  for (const w of warnings.slice(0, 25)) console.log(`  ⚠ ${w}`);
  if (warnings.length > 25) console.log(`  …and ${warnings.length - 25} more`);
}

if (errors.length) {
  console.error(`\n${errors.length} error(s)\n${line}`);
  for (const e of errors.slice(0, 40)) console.error(`  ✗ ${e}`);
  if (errors.length > 40) console.error(`  …and ${errors.length - 40} more`);
  console.error("");
  process.exit(1);
}

console.log(
  `\n${line}\n${inventory.length} pages audited. ` +
    `page-inventory.json, page-count-report.json and final-page-inventory.csv written.\n`,
);
