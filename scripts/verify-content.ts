/**
 * Content validation.
 *
 * Runs against the content registry before a build, so structural problems
 * fail loudly in development rather than rendering as broken links or empty
 * pages in production.
 *
 *   npm run verify:content
 *
 * Checks:
 *   - every slug present, URL-safe, lowercase and unique within its kind
 *   - no duplicate hrefs anywhere in the registry
 *   - required fields present (title, description, SEO metadata)
 *   - every declared relationship points at an entity that exists
 *   - no published entity references a draft one
 *   - no CONTENT_REQUIRED or VERIFY_WITH_BIZZFLY marker in published copy
 */

import { allEntries, publishedEntries, sectionPages } from "../lib/registry.ts";
import { services } from "../content/services.ts";
import { practices } from "../content/practices.ts";
import { industries } from "../content/industries.ts";
import { useCases } from "../content/use-cases.ts";
import { technologies } from "../content/technologies.ts";
import { resources } from "../content/resources.ts";
import { caseStudies } from "../content/case-studies.ts";
import { allCompanyPages } from "../content/company.ts";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MARKERS = ["[CONTENT_REQUIRED]", "[VERIFY_WITH_BIZZFLY]"];

const errors: string[] = [];
const warnings: string[] = [];

const fail = (message: string) => errors.push(message);
const warn = (message: string) => warnings.push(message);

/* --- Slugs -------------------------------------------------------------- */

const seenByKind = new Map<string, Set<string>>();
for (const entry of allEntries) {
  if (!entry.slug) {
    fail(`Missing slug on ${entry.kind} entry "${entry.title}"`);
    continue;
  }
  if (!SLUG_PATTERN.test(entry.slug)) {
    fail(
      `Slug "${entry.slug}" (${entry.kind}) is not lowercase, URL-safe and hyphenated`,
    );
  }
  const bucket = seenByKind.get(entry.kind) ?? new Set<string>();
  if (bucket.has(entry.slug)) {
    fail(`Duplicate slug "${entry.slug}" within kind "${entry.kind}"`);
  }
  bucket.add(entry.slug);
  seenByKind.set(entry.kind, bucket);
}

/* --- Hrefs must be globally unique -------------------------------------- */

const seenHrefs = new Map<string, string>();
for (const entry of allEntries) {
  const existing = seenHrefs.get(entry.href);
  if (existing) {
    fail(`Duplicate URL ${entry.href} used by both ${existing} and ${entry.id}`);
  }
  seenHrefs.set(entry.href, entry.id);
}

/* --- Required fields ----------------------------------------------------- */

for (const entry of allEntries) {
  if (!entry.title?.trim()) fail(`Missing title on ${entry.id}`);
  if (!entry.description?.trim()) fail(`Missing meta description on ${entry.id}`);
  if (entry.description && entry.description.length > 200) {
    warn(
      `Meta description on ${entry.id} is ${entry.description.length} chars (aim for under 160)`,
    );
  }
}

/* --- Relationship integrity ---------------------------------------------- */

const serviceSlugs = new Set([
  ...services.map((s) => s.slug),
  ...practices.map((p) => p.slug),
]);
const industrySlugs = new Set(industries.map((i) => i.slug));
const useCaseSlugs = new Set(useCases.map((u) => u.slug));
const technologySlugs = new Set(technologies.map((t) => t.slug));
const resourceSlugs = new Set(resources.map((r) => r.slug));

const publishedHrefs = new Set([
  ...publishedEntries.map((e) => e.href),
  ...sectionPages.map((s) => s.href),
]);

function checkRefs(
  owner: string,
  refs: string[] | undefined,
  valid: Set<string>,
  dimension: string,
) {
  for (const ref of refs ?? []) {
    if (!valid.has(ref)) {
      fail(`${owner} references unknown ${dimension} "${ref}"`);
    }
  }
}

for (const service of services) {
  const owner = `service/${service.slug}`;
  if (service.parent && !serviceSlugs.has(service.parent)) {
    fail(`${owner} has unknown parent "${service.parent}"`);
  }
  checkRefs(owner, service.relatedServices, serviceSlugs, "service");
  checkRefs(owner, service.relatedIndustries, industrySlugs, "industry");
  checkRefs(owner, service.relatedUseCases, useCaseSlugs, "use case");
  checkRefs(owner, service.relatedTechnologies, technologySlugs, "technology");
  checkRefs(owner, service.relatedResources, resourceSlugs, "resource");
}

for (const practice of practices) {
  checkRefs(`practice/${practice.slug}`, practice.services, serviceSlugs, "service");
}

for (const industry of industries) {
  const owner = `industry/${industry.slug}`;
  checkRefs(owner, industry.services, serviceSlugs, "service");
  checkRefs(owner, industry.useCases, useCaseSlugs, "use case");
  checkRefs(owner, industry.relatedTechnologies, technologySlugs, "technology");
  for (const problem of industry.problems) {
    checkRefs(
      `${owner} problem "${problem.title}"`,
      problem.addressedBy,
      serviceSlugs,
      "service",
    );
  }
}

for (const useCase of useCases) {
  const owner = `use-case/${useCase.slug}`;
  checkRefs(owner, useCase.services, serviceSlugs, "service");
  checkRefs(owner, useCase.industries, industrySlugs, "industry");
  checkRefs(owner, useCase.relatedTechnologies, technologySlugs, "technology");
}

for (const technology of technologies) {
  const owner = `technology/${technology.slug}`;
  checkRefs(owner, technology.services, serviceSlugs, "service");
  checkRefs(owner, technology.relatedIndustries, industrySlugs, "industry");
  checkRefs(owner, technology.relatedUseCases, useCaseSlugs, "use case");
}

for (const resource of resources) {
  checkRefs(`resource/${resource.slug}`, resource.supports, serviceSlugs, "service");
}

for (const study of caseStudies) {
  const owner = `case-study/${study.slug}`;
  checkRefs(owner, study.servicesDelivered, serviceSlugs, "service");
  checkRefs(owner, [study.industry], industrySlugs, "industry");
  checkRefs(owner, study.technologies, technologySlugs, "technology");
}

/* --- Curated related links must resolve to a published page -------------- */

const withRelated = [
  ...services.map((s) => ({ id: `service/${s.slug}`, related: s.related })),
  ...industries.map((i) => ({ id: `industry/${i.slug}`, related: i.related })),
  ...useCases.map((u) => ({ id: `use-case/${u.slug}`, related: u.related })),
  ...technologies.map((t) => ({ id: `technology/${t.slug}`, related: t.related })),
  ...resources.map((r) => ({ id: `resource/${r.slug}`, related: r.related })),
];

for (const { id, related } of withRelated) {
  for (const link of related ?? []) {
    if (link.href.startsWith("http") || link.href === "#") continue;
    if (!publishedHrefs.has(link.href) && !link.href.startsWith("/contact")) {
      fail(`${id} links to ${link.href}, which is not a published page`);
    }
  }
}

/* --- Placeholder markers must not appear in published copy --------------- */

for (const entry of publishedEntries) {
  const haystack = `${entry.title} ${entry.description} ${entry.answer ?? ""}`;
  for (const marker of MARKERS) {
    if (haystack.includes(marker)) {
      fail(
        `Published entry ${entry.id} contains ${marker} in its title, description or answer`,
      );
    }
  }
}

/*
 * `body` is published copy too, and it was not being checked — which is how
 * both legal pages came to render "[VERIFY_WITH_BIZZFLY] ..." to visitors
 * while every guard reported green. An editorial note belongs in the
 * non-rendered `reviewNote` field, never in the prose.
 */
for (const page of allCompanyPages) {
  for (const paragraph of page.body ?? []) {
    for (const marker of MARKERS) {
      if (paragraph.includes(marker)) {
        fail(
          `Company page "${page.slug}" contains ${marker} in its body copy, which is rendered to visitors — move the note to reviewNote`,
        );
      }
    }
  }
}

/* Outstanding review notes stay visible to the team without reaching a page. */
const pendingReview = allCompanyPages.filter((page) => page.reviewNote);
for (const page of pendingReview) {
  warn(`Company page "${page.slug}" is awaiting sign-off: ${page.reviewNote}`);
}

/* --- Report -------------------------------------------------------------- */

console.log(`\nContent validation\n${"─".repeat(66)}`);
console.log(`Entities in registry : ${allEntries.length}`);
console.log(`Published            : ${publishedEntries.length}`);
console.log(`Draft or review      : ${allEntries.length - publishedEntries.length}`);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const message of warnings) console.log(`  ! ${message}`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} error(s):`);
  for (const message of errors) console.error(`  ✗ ${message}`);
  console.error("");
  process.exit(1);
}

console.log(`${"─".repeat(66)}`);
console.log("\nAll content checks passed.\n");
