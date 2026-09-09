/**
 * Client testimonials.
 *
 * DELIBERATELY EMPTY. This is not an oversight and the array should not be
 * populated from the old site.
 *
 * bizzfly.com currently publishes four testimonials with full attribution
 * (Nakul Kumar Yadav, Sneha Iyer, Arvind Wadgaonkar, Shamali Patel), a
 * "4.9/5 based on 1,500+ reviews" rating, and a "10+ years" figure. None of
 * those has a verifiable source, the rating sits against no review platform,
 * and the years figure contradicts a broken "0 +" counter on that site's own
 * about page. See site.unverified and docs/architecture/07-existing-site-audit.md.
 *
 * This site has published a promise about exactly this, at
 * /company/how-we-publish/ and in content/company-transparency.ts:
 *
 *   "this site carries no client logos we were not given permission to use,
 *    no testimonials nobody wrote, no awards, no certifications and no
 *    years-of-experience figure."
 *
 * Copying the old quotes across would make that sentence false, which is a
 * worse outcome than having no testimonials — the promise is currently doing
 * more persuasive work than four unattributed quotes would.
 *
 * TO POPULATE THIS, each entry needs, in writing from the client:
 *   - the exact wording they approve
 *   - the name and job title they approve being published
 *   - the company name, or an honest description if they prefer not to be named
 *   - which engagement it refers to
 *
 * Once any entry exists, TestimonialCarousel renders automatically and the
 * homepage section appears. Until then the section does not render at all,
 * and TrustStandard carries the proof position on its own.
 */

import { VERIFY_WITH_BIZZFLY } from "@/types/content";

export interface Testimonial {
  /** The approved wording, verbatim. Never edited for flow. */
  quote: string;
  name: string;
  /** Job title as the person approved it. */
  role: string;
  /** Company name, or an honest description where they prefer anonymity. */
  company: string;
  /** The engagement this refers to, so the quote has a context. */
  context: string;
  /** Optional link to the matching case study, once one is published. */
  href?: string;
}

/**
 * Empty until approved quotes exist. `TestimonialCarousel` and the homepage
 * section both check `.length` and render nothing when it is zero, so adding
 * the first entry is the only step required to turn the section on.
 */
export const testimonials: Testimonial[] = [];

/**
 * What is blocking publication, kept in code so it shows up in a grep for
 * outstanding content rather than living only in a comment.
 */
export const testimonialsStatus = {
  state: VERIFY_WITH_BIZZFLY,
  reason:
    "Four testimonials exist on bizzfly.com without a verifiable source or written client approval. They require approval of wording and attribution before they can be republished here.",
} as const;
