#!/usr/bin/env node
/**
 * Content depth audit.
 *
 *   npm run audit:depth
 *
 * page-audit.ts answers "do two pages compete for the same intent". This
 * answers a different question: "is there enough on this page for the visit
 * to have been worth making", and it reads the content model rather than
 * built HTML so it can run before a build and name the field that is empty.
 *
 * Per entity it counts the words a reader actually gets, the structured
 * sections that are populated, the FAQs, and the outbound contextual links.
 * It then reports:
 *
 *   THIN      below the word floor for its kind
 *   NO-FAQ    no questions answered on a page type that should have them
 *   FEW-LINKS fewer than two contextual links out of the page
 *   SHARED    an opening sentence that appears on another page too
 *
 * Thresholds are per kind, because a glossary definition and a service page
 * are not the same object and holding both to one number would either
 * excuse the service or condemn the definition.
 */

import { writeFileSync } from "node:fs";

import { publishedEntries } from "@/lib/registry";
import { services } from "@/content/services";
import { practices } from "@/content/practices";
import { industries } from "@/content/industries";
import { useCases } from "@/content/use-cases";
import { technologies } from "@/content/technologies";
import { resources } from "@/content/resources";
import { allCompanyPages } from "@/content/company";

type Kind =
  | "practice"
  | "service"
  | "industry"
  | "use-case"
  | "technology"
  | "resource"
  | "company";

interface Row {
  kind: Kind;
  slug: string;
  href: string;
  title: string;
  words: number;
  faqs: number;
  links: number;
  sections: string[];
  missing: string[];
  flags: string[];
  opening: string;
}

/** Words a reader actually receives, from every prose-bearing field. */
const countWords = (...parts: unknown[]): number => {
  let total = 0;
  const walk = (value: unknown) => {
    if (typeof value === "string") {
      total += value.trim().split(/\s+/).filter(Boolean).length;
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (value && typeof value === "object") {
      Object.values(value as Record<string, unknown>).forEach(walk);
    }
  };
  parts.forEach(walk);
  return total;
};

/** The word floor below which a page of this kind is not worth the click. */
const FLOOR: Record<Kind, number> = {
  practice: 450,
  service: 450,
  industry: 450,
  "use-case": 400,
  technology: 350,
  resource: 300,
  company: 300,
};

/** Page kinds where a visitor arrives with questions. */
const WANTS_FAQ = new Set<Kind>([
  "practice",
  "service",
  "industry",
  "use-case",
  "technology",
]);

const rows: Row[] = [];

const openingOf = (entity: { answer?: string }): string =>
  (entity.answer ?? "").trim().slice(0, 90).toLowerCase();

const push = (
  kind: Kind,
  entity: {
    slug: string;
    title: string;
    answer?: string;
    faqs?: readonly unknown[];
  },
  href: string,
  sectionMap: Record<string, unknown>,
  links: number,
) => {
  const sections = Object.entries(sectionMap)
    .filter(([, v]) => (Array.isArray(v) ? v.length > 0 : Boolean(v)))
    .map(([k]) => k);
  const missing = Object.keys(sectionMap).filter((k) => !sections.includes(k));

  const words = countWords(entity.answer, ...Object.values(sectionMap));
  const faqs = entity.faqs?.length ?? 0;

  const flags: string[] = [];
  if (words < FLOOR[kind]) flags.push("THIN");
  if (WANTS_FAQ.has(kind) && faqs === 0) flags.push("NO-FAQ");
  if (links < 2) flags.push("FEW-LINKS");

  rows.push({
    kind,
    slug: entity.slug,
    href,
    title: entity.title,
    words,
    faqs,
    links,
    sections,
    missing,
    flags,
    opening: openingOf(entity as { answer?: string }),
  });
};

for (const p of practices) {
  push("practice", p, `/services/${p.slug}/`, { process: p.process, sections: p.sections }, p.services.length);
}

for (const s of services) {
  push(
    "service",
    s,
    `/services/${s.slug}/`,
    {
      sections: s.sections,
      problems: s.problems,
      whoFor: s.whoFor,
      included: s.included,
      approach: s.approach,
      outcomes: s.outcomes,
      outOfScope: s.outOfScope,
      technologies: s.technologies,
    },
    (s.technologies?.length ?? 0) + (s.parent ? 1 : 0) + 1,
  );
}

for (const i of industries) {
  push(
    "industry",
    i,
    `/industries/${i.slug}/`,
    {
      sections: i.sections,
      context: i.context,
      opportunity: i.opportunity,
      problems: i.problems,
      complianceNotes: i.complianceNotes,
    },
    i.services.length + i.useCases.length,
  );
}

for (const u of useCases) {
  push(
    "use-case",
    u,
    `/use-cases/${u.slug}/`,
    {
      sections: u.sections,
      whyItMatters: u.whyItMatters,
      symptoms: u.symptoms,
      rootCauses: u.rootCauses,
      approach: u.approach,
      targetState: u.targetState,
    },
    u.services.length + (u.industries?.length ?? 0),
  );
}

for (const t of technologies) {
  push(
    "technology",
    t,
    `/technologies/${t.slug}/`,
    {
      sections: t.sections,
      whyItMatters: t.whyItMatters,
      choices: t.choices,
      whenNotToUse: t.whenNotToUse,
      decisionCriteria: t.decisionCriteria,
    },
    t.services?.length ?? 0,
  );
}

for (const r of resources) {
  push("resource", r, `/resources/${r.slug}/`, { body: r.body, sections: r.sections }, r.supports?.length ?? 0);
}

for (const c of allCompanyPages) {
  push("company", c, `/company/${c.slug}/`, { body: c.body, sections: c.sections }, 0);
}

/* --- Shared openings ----------------------------------------------------- */

const byOpening = new Map<string, string[]>();
for (const row of rows) {
  if (row.opening.length < 40) continue;
  const bucket = byOpening.get(row.opening) ?? [];
  bucket.push(row.href);
  byOpening.set(row.opening, bucket);
}
const shared = [...byOpening.values()].filter((hrefs) => hrefs.length > 1);
const sharedHrefs = new Set(shared.flat());
for (const row of rows) if (sharedHrefs.has(row.href)) row.flags.push("SHARED");

/* --- Report -------------------------------------------------------------- */

const pad = (s: string | number, n: number) => String(s).padEnd(n);
const flagged = rows.filter((r) => r.flags.length > 0);

console.log("\nContent depth audit");
console.log("─".repeat(78));
console.log(`Routes audited: ${rows.length}  (registry published: ${publishedEntries.length})\n`);

const kinds: Kind[] = [
  "practice", "service", "industry", "use-case", "technology", "resource", "company",
];
console.log(pad("kind", 12), pad("pages", 7), pad("median", 8), pad("thin", 6), pad("no-faq", 8), "few-links");
for (const kind of kinds) {
  const set = rows.filter((r) => r.kind === kind);
  if (set.length === 0) continue;
  const sorted = set.map((r) => r.words).sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)] ?? 0;
  console.log(
    pad(kind, 12),
    pad(set.length, 7),
    pad(median, 8),
    pad(set.filter((r) => r.flags.includes("THIN")).length, 6),
    pad(set.filter((r) => r.flags.includes("NO-FAQ")).length, 8),
    set.filter((r) => r.flags.includes("FEW-LINKS")).length,
  );
}

console.log("\nThinnest 25 pages");
console.log("─".repeat(78));
for (const row of [...rows].sort((a, b) => a.words - b.words).slice(0, 25)) {
  console.log(pad(row.words, 6), pad(row.kind, 11), pad(row.href, 46), row.flags.join(","));
}

if (shared.length) {
  console.log(`\nShared opening sentences: ${shared.length} group(s)`);
  for (const group of shared.slice(0, 10)) console.log("  " + group.join("  ↔  "));
}

writeFileSync(
  "content-depth-report.json",
  JSON.stringify({ generated: new Date().toISOString(), rows, shared }, null, 2),
);

console.log(`\n${flagged.length} of ${rows.length} routes carry at least one flag.`);
console.log("Written: content-depth-report.json\n");
