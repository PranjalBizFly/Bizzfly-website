/**
 * Company pages.
 * Only verified facts. Team size, founding year and certifications are
 * unverified — see content/site.ts and the audit.
 */

import type { CompanyPage } from "@/types/content";
import { site } from "./site";
import { extraCompanyPages } from "./company-pages";
import { methodologyPages } from "./company-methodology";
import { transparencyPages } from "./company-transparency";

export { extraCompanyPages };

export const companyPages: CompanyPage[] = [
  {
    slug: "about",
    section: "about",
    title: "About BizzFly",
    answer:
      "BizzFly is a Pune-based digital growth and technology company. We make businesses discoverable across search and AI platforms, then build the websites, software and automation that turn that discovery into revenue.",
    body: [
      `Most companies we work with have the same underlying problem in a different costume: they are hard to find, and the systems behind them were not built for the volume they now need to handle. Those two things are usually treated as separate disciplines by separate suppliers, which is why neither gets solved properly.`,
      `We work across both. The same team that finds the crawl problem capping your visibility can fix the template causing it. The same engagement that improves your search presence can build the automation that answers the enquiries it produces.`,
      `That combination matters more now than it did five years ago. Discovery is moving from a list of links to a generated answer, and the qualities that earn a citation from an AI system — a clear entity, structured content, machine-readable data, server-rendered pages — are engineering problems wearing a marketing hat.`,
      `BizzFly was founded by ${site.founder}, and operates from Pune. We work with mid-market businesses across manufacturing, real estate, education and professional services.`,
    ],
    seo: {
      title: "About BizzFly",
      description:
        "BizzFly is a Pune-based digital growth and technology company working across search visibility, websites, software and business automation.",
      primaryTopic: "about BizzFly",
      secondaryTopics: ["company", "digital growth agency Pune"],
      intent: "navigational",
    },
    audience: ["A2", "A9", "A8"],
    phase: "P1",
    cta: { label: "Book a consultation", href: "/contact/", tier: "T4" },
    related: [
      { label: "How We Work", href: "/how-we-work/", type: "COMPANY" },
      { label: "Services", href: "/services/", type: "SECTION" },
      { label: "Contact", href: "/contact/", type: "CONTACT" },
    ],
  },
  {
    slug: "how-we-work",
    section: "about",
    title: "How We Work",
    answer:
      "Every engagement starts with diagnosis, not a proposal. We spend the first two weeks establishing what is actually wrong, because fixing the wrong constraint is the expensive mistake — and you keep those findings whether or not you continue with us.",
    body: [
      `Most agency relationships fail in the same predictable way. A proposal is written before anyone understands the problem, the work is delivered against that proposal, and six months later the commercial result has not moved because the original diagnosis was wrong.`,
      `We work in the other order. Diagnosis first, scoped proposal second. That means our first deliverable is usually a document telling you what is broken — including the parts we are not the right people to fix.`,
      `We also state boundaries in writing. Every proposal says what is out of scope as explicitly as what is in it. Naming the boundary early removes the most common source of disappointment in an engagement, and it is the fastest way to tell whether a supplier actually understands the work.`,
      `On delivery, we report against agreed commercial measures — enquiries, response times, hours removed — rather than against activity. A monthly report full of impressions and rankings that avoids the commercial question is a way of not being accountable.`,
    ],
    seo: {
      title: "How We Work",
      description:
        "Our engagement process: diagnosis before proposal, boundaries stated in writing, and reporting against commercial measures rather than activity.",
      primaryTopic: "how BizzFly works",
      secondaryTopics: ["engagement process", "ways of working"],
      intent: "commercial",
    },
    audience: ["A2", "A7", "A8"],
    phase: "P1",
    cta: { label: "Book a consultation", href: "/contact/", tier: "T4" },
    related: [
      { label: "About Us", href: "/about-us/", type: "COMPANY" },
      { label: "Our Engineering Standards", href: "/technologies/engineering-standards/", type: "TECHNOLOGY" },
      { label: "Contact", href: "/contact/", type: "CONTACT" },
    ],
  },
];

/**
 * Legal pages.
 *
 * The live site carries a privacy policy at /privacy-policy-2/ — the "-2"
 * indicates a duplicate was created and the original never removed — and
 * terms that were not verified as bespoke rather than theme boilerplate.
 * Both need legal review before publication, so the routes exist with the
 * requirement stated rather than with invented legal text.
 */
export const legalPages: CompanyPage[] = [
  {
    slug: "privacy-policy",
    section: "legal",
    title: "Privacy Policy",
    answer:
      "This page will set out what personal data BizzFly collects through this website, why it is collected, how long it is kept, and how to request its deletion.",
    reviewNote:
      "[VERIFY_WITH_BIZZFLY] The privacy policy on the current site is published at a duplicated URL and has not been verified as bespoke rather than theme boilerplate. It requires legal review before it is republished here.",
    body: [
      "A full privacy policy is being prepared and will be published here once it has completed legal review.",
      "In the meantime, here is what this site does today: the contact form collects the name, email address, optional phone number and message you submit, together with the page you submitted it from. That information is used to respond to your enquiry. Analytics are not enabled on this build.",
      "To ask what we hold about you, or to have it deleted, email sales@bizzfly.com.",
    ],
    seo: {
      title: "Privacy Policy",
      description:
        "How BizzFly collects, uses and stores personal data submitted through this website.",
      primaryTopic: "privacy policy",
      intent: "navigational",
      noindex: true,
    },
    audience: ["A8"],
    phase: "P1",
    cta: { label: "Contact us", href: "/contact/", tier: "T2" },
  },
  {
    slug: "terms",
    section: "legal",
    title: "Terms & Conditions",
    answer:
      "This page will set out the terms governing use of this website and the basis on which BizzFly provides services.",
    reviewNote:
      "[VERIFY_WITH_BIZZFLY] Terms require review and confirmation of the contracting entity before publication. Drafting commercial terms without that confirmation would put wrong information in front of buyers.",
    body: [
      "Full website terms are being prepared and will be published here once they have completed legal review.",
      "Engagement terms — scope, payment, intellectual property and notice — are set out in the proposal for each engagement. Intellectual property in work we deliver is yours.",
    ],
    seo: {
      title: "Terms & Conditions",
      description: "Terms governing use of the BizzFly website and services.",
      primaryTopic: "terms and conditions",
      intent: "navigational",
      noindex: true,
    },
    audience: ["A8"],
    phase: "P1",
    cta: { label: "Contact us", href: "/contact/", tier: "T2" },
  },
];

export const allCompanyPages: CompanyPage[] = [
  ...companyPages,
  ...extraCompanyPages,
  ...methodologyPages,
  ...transparencyPages,
  ...legalPages,
];

export function getCompanyPage(slug: string): CompanyPage | undefined {
  return allCompanyPages.find((page) => page.slug === slug);
}
