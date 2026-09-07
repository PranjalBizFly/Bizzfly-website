/**
 * Case studies.
 *
 * DELIBERATELY EMPTY.
 *
 * The live site carries 11 fabricated case studies from the Digitak theme
 * demo content (one names "Client: Logistic Company, Location: New York, USA"
 * on a Pune agency site). None are reusable.
 *
 * No case study is published until every field of the model in
 * types/content.ts is filled with verified, client-approved data — including
 * the mandatory `challenges` field and sourced metrics.
 * See docs/architecture/07-existing-site-audit.md finding F1, and risk R1.
 *
 * The listing page renders a designed empty state explaining what BizzFly
 * publishes and why. It does not render placeholder cards.
 */

import type { CaseStudy } from "@/types/content";

export const caseStudies: CaseStudy[] = [];

/** Only publishable, fully verified case studies ever reach a route. */
export const publishedCaseStudies: CaseStudy[] = caseStudies.filter(
  (c) => c.publishable,
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return publishedCaseStudies.find((c) => c.slug === slug);
}
