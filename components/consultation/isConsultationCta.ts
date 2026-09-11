import type { Cta } from "@/types/content";

/**
 * Whether a CTA is asking for a consultation.
 *
 * THE TEST IS THE DESTINATION, NOT THE WORDING.
 *
 * Matching on the label was the obvious approach and it was wrong. The
 * wording of a conversion CTA varies by page on purpose — "Book a
 * consultation" on a company page, "Get a free SEO audit" on the SEO
 * service, "Request an automation assessment" on the chatbot one, "Let's
 * talk" as the site-wide default. Every one of those is the same ask, and a
 * label test wires up whichever phrasings someone thought of, leaving the
 * rest to behave differently for no reason a visitor could discover.
 *
 * What they have in common is where they point. A CTA rendered as a button
 * whose destination is the contact page is an enquiry CTA, whatever it says
 * on it, and the booking dialog is a better answer to it than a page with a
 * form further down. Low-tier CTAs never reach this test — CtaBlock renders
 * those as text links, which are navigation rather than conversion.
 *
 * Anything not matched keeps its existing behaviour exactly: it navigates.
 * And so does everything that IS matched, if JavaScript never arrives — see
 * ConsultationCta, which stays a real link to a real page.
 */
export function isConsultationCta(cta: Pick<Cta, "label" | "href">): boolean {
  return cta.href.startsWith("/contact");
}
