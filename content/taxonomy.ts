/**
 * Presentation groupings shared between pages.
 *
 * These are not part of the content model — an industry does not "have" a
 * group the way it has problems and services. They are editorial decisions
 * about how to arrange a list that has grown past the point where a flat
 * version is readable, and they live here rather than in a page file because
 * more than one page arranges the same list.
 *
 * Every grouping is paired with a resolver that appends anything the groups
 * do not name. A page that quietly dropped an entry would orphan it, so the
 * catch-all is the mechanism that makes forgetting harmless.
 */

import type { DirectoryGroup } from "@/components/sections";
import { industries } from "./industries";
import { useCases } from "./use-cases";

interface SlugGroup {
  heading: string;
  slugs: string[];
}

/**
 * Sectors by how the business earns, not by category.
 *
 * A buyer arriving at an industries page does not think "I am in a vertical";
 * they think "I make things" or "I am regulated". The digital problem a
 * manufacturer has also looks far more like a logistics operator's than like
 * that of another company sharing its industry code.
 */
export const SECTOR_GROUPS: SlugGroup[] = [
  {
    heading: "Make, build and move",
    slugs: [
      "manufacturing",
      "logistics",
      "construction",
      "automotive",
      "energy",
      "agriculture",
    ],
  },
  {
    heading: "Sell and serve",
    slugs: ["ecommerce", "d2c-brands", "hospitality", "travel", "real-estate"],
  },
  {
    heading: "Regulated and professional",
    slugs: [
      "financial-services",
      "healthcare",
      "legal-services",
      "accounting",
      "education",
      "nonprofit",
    ],
  },
  {
    heading: "Technology and growth",
    slugs: [
      "saas",
      "technology",
      "it-services",
      "startups",
      "professional-services",
      "b2b-services",
      "recruitment",
      "media",
      "smes",
    ],
  },
];

/** Use cases by the outcome someone is actually after. */
export const OUTCOME_GROUPS: SlugGroup[] = [
  {
    heading: "Get found",
    slugs: [
      "get-found-in-ai-search",
      "increase-organic-traffic",
      "rank-in-local-search",
      "recover-lost-traffic",
      "improve-digital-presence",
    ],
  },
  {
    heading: "Win more work",
    slugs: [
      "generate-more-leads",
      "improve-website-conversion",
      "qualify-leads-automatically",
      "shorten-sales-cycle",
      "speed-up-quoting",
      "automate-sales-follow-up",
      "prove-marketing-roi",
      "enter-a-new-market",
    ],
  },
  {
    heading: "Run leaner",
    slugs: [
      "reduce-manual-work",
      "improve-operational-efficiency",
      "scale-without-hiring",
      "automate-customer-support",
      "reduce-support-tickets",
      "onboard-customers-faster",
      "consolidate-business-tools",
    ],
  },
  {
    heading: "Build and modernise",
    slugs: [
      "connect-business-systems",
      "modernise-legacy-processes",
      "build-a-custom-business-platform",
      "build-scalable-digital-infrastructure",
      "introduce-ai-into-operations",
      "launch-a-digital-product",
      "replace-spreadsheet-processes",
      "improve-data-quality",
      "improve-customer-experience",
      "reduce-customer-churn",
    ],
  },
];

function resolve(
  groups: SlugGroup[],
  all: { slug: string; title: string }[],
  base: string,
  catchAll: string,
): DirectoryGroup[] {
  const bySlug = (slug: string) => all.find((item) => item.slug === slug);

  const resolved: DirectoryGroup[] = groups.map((group) => ({
    heading: group.heading,
    items: group.slugs
      .map(bySlug)
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .map((item) => ({ label: item.title, href: `${base}${item.slug}/` })),
  }));

  const placed = new Set(groups.flatMap((group) => group.slugs));
  const missing = all.filter((item) => !placed.has(item.slug));
  if (missing.length > 0) {
    resolved.push({
      heading: catchAll,
      items: missing.map((item) => ({
        label: item.title,
        href: `${base}${item.slug}/`,
      })),
    });
  }

  return resolved.filter((group) => group.items.length > 0);
}

/** Every industry, grouped — including any the groups above do not name. */
export const sectorDirectory = (): DirectoryGroup[] =>
  resolve(SECTOR_GROUPS, industries, "/industries/", "Also covered");

/** Every use case, grouped — including any the groups above do not name. */
export const outcomeDirectory = (): DirectoryGroup[] =>
  resolve(OUTCOME_GROUPS, useCases, "/use-cases/", "More");
