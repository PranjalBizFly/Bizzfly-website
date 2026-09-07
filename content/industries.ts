/**
 * Industries — seed set. Prompt 3 expands to the 14 sectors in sitemap.csv.
 * Sectors chosen first are those already represented in testimonials on the
 * live site: real estate, education, manufacturing, professional services.
 */

import type { Industry } from "@/types/content";
import { expandedIndustries } from "./industries-expanded";

const coreIndustries: Industry[] = [
  {
    slug: "manufacturing",
    title: "Manufacturing",
    answer:
      "Manufacturers usually have a distribution problem before they have a marketing problem: buyers searching for a product specification cannot find the firm that makes it, and enquiries that do arrive get lost between an inbox and a spreadsheet.",
    context:
      "Most mid-market manufacturers grew through dealer networks and trade relationships. That channel still works, but a growing share of buyers now start with a specification search, compare three suppliers online, and shortlist before anyone picks up a phone. A firm invisible at that stage never enters the RFQ.",
    problems: [
      {
        title: "Invisible for product and specification searches",
        description:
          "Buyers search by material, tolerance, capacity or application. Most manufacturer sites are organised around company structure instead, so they never match the query.",
        addressedBy: ["seo", "technical-seo"],
      },
      {
        title: "RFQ response takes days",
        description:
          "Enquiries arrive by email and wait for someone to notice. By the time a quote goes out, a faster competitor has already been shortlisted.",
        addressedBy: ["workflow-automation", "ai-agents"],
      },
      {
        title: "The website understates the business",
        description:
          "A capable engineering firm presented through eight pages and a stock photograph reads as smaller and less credible than it is.",
        addressedBy: ["corporate-websites"],
      },
      {
        title: "Dealer and distributor coordination is manual",
        description:
          "Pricing, stock and specification updates travel by email and spreadsheet, so the channel is always working from something slightly out of date.",
        addressedBy: ["workflow-automation"],
      },
    ],
    useCases: ["generate-more-leads", "reduce-manual-work"],
    services: ["seo", "corporate-websites", "workflow-automation", "ai-agents"],
    seo: {
      title: "Manufacturing",
      description:
        "Digital growth and automation for manufacturers — specification search visibility, faster RFQ response, and websites that match the capability behind them.",
      primaryTopic: "manufacturing digital and automation",
      secondaryTopics: ["manufacturing SEO", "RFQ automation"],
      intent: "commercial",
    },
    audience: ["A1", "A2", "A6"],
    phase: "P1",
    cta: { label: "Book a consultation", href: "/contact/", tier: "T4" },
    faqs: [
      {
        question: "We sell through distributors. Does search visibility still matter?",
        answer:
          "Yes, and often more. Specifiers and engineers research independently before they contact a distributor. If your firm is not visible at that stage, the distributor sells whichever brand the buyer already found.",
      },
    ],
    related: [
      { label: "SEO Services", href: "/services/seo/", type: "SERVICE" },
      {
        label: "Workflow automation",
        href: "/services/workflow-automation/",
        type: "SERVICE",
      },
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    answer:
      "Real estate businesses are usually paying twice for the same buyer: once to a listing portal for a shared lead, and again in time spent chasing enquiries that went cold while someone was on a site visit.",
    context:
      "Portal dependency has quietly become the sector's largest fixed cost. Leads arrive shared with competitors, priced per enquiry, and with no relationship attached. The firms escaping it are the ones building direct visibility on project and locality searches, and responding fast enough to matter.",
    problems: [
      {
        title: "Portal dependency drives up cost per enquiry",
        description:
          "Leads are shared with three competitors and priced by the platform. There is no compounding return on the spend.",
        addressedBy: ["seo", "corporate-websites"],
      },
      {
        title: "Project pages do not rank for locality searches",
        description:
          "Buyers search by locality, configuration and budget. Most developer sites have one page per project and nothing matching how people actually search.",
        addressedBy: ["seo", "technical-seo"],
      },
      {
        title: "Enquiry response is too slow",
        description:
          "Property enquiries decay in hours. A response the next morning is competing against someone who replied in ten minutes.",
        addressedBy: ["workflow-automation", "ai-agents"],
      },
      {
        title: "No single view of the pipeline",
        description:
          "Enquiries live across portals, forms, messaging apps and spreadsheets, so nobody can say what the real pipeline is.",
        addressedBy: ["workflow-automation"],
      },
    ],
    useCases: ["generate-more-leads", "reduce-manual-work"],
    services: ["seo", "corporate-websites", "workflow-automation"],
    seo: {
      title: "Real Estate",
      description:
        "Direct enquiry generation for real estate — locality search visibility, faster response, and less dependence on listing portals.",
      primaryTopic: "real estate digital growth",
      secondaryTopics: ["real estate SEO", "property lead generation"],
      intent: "commercial",
    },
    audience: ["A2", "A1"],
    phase: "P1",
    cta: { label: "Talk to a strategist", href: "/contact/", tier: "T4" },
    related: [
      { label: "SEO Services", href: "/services/seo/", type: "SERVICE" },
      {
        label: "Generate more leads",
        href: "/use-cases/generate-more-leads/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "education",
    title: "Education & EdTech",
    answer:
      "Education institutions compete for attention in a narrow admissions window, against a search landscape dominated by aggregators and ranking sites — while their own admissions team drowns in repetitive enquiries.",
    context:
      "Admissions is seasonal and unforgiving: demand concentrates into a few weeks, and the enquiries that arrive are largely the same twenty questions. Institutions that win the window are the ones visible on course and eligibility searches, and able to answer instantly at volume.",
    problems: [
      {
        title: "Aggregators outrank the institution itself",
        description:
          "Course and eligibility searches return listing sites first. Prospective students form a shortlist before reaching the institution's own site.",
        addressedBy: ["seo", "ai-search-optimisation"],
      },
      {
        title: "The same questions consume the admissions team",
        description:
          "Fees, eligibility, dates, documents, accommodation. The same enquiries, thousands of times, in a compressed window.",
        addressedBy: ["ai-agents", "workflow-automation"],
      },
      {
        title: "Enquiries are not followed up consistently",
        description:
          "Interest captured in the peak week goes cold because follow-up depends on manual effort at exactly the busiest time.",
        addressedBy: ["workflow-automation"],
      },
      {
        title: "AI assistants answer for you, inaccurately",
        description:
          "Prospective students increasingly ask an AI assistant about courses and fees. If your data is not structured, the answer comes from somewhere else, and may be wrong.",
        addressedBy: ["ai-search-optimisation"],
      },
    ],
    useCases: ["generate-more-leads", "get-found-in-ai-search"],
    services: ["seo", "ai-search-optimisation", "workflow-automation"],
    seo: {
      title: "Education & EdTech",
      description:
        "Admissions visibility and enquiry automation for education institutions — course search rankings, AI answer accuracy, and follow-up that does not depend on peak-week effort.",
      primaryTopic: "education sector digital",
      secondaryTopics: ["education SEO", "admissions automation"],
      intent: "commercial",
    },
    audience: ["A2", "A3"],
    phase: "P1",
    cta: { label: "Book a consultation", href: "/contact/", tier: "T4" },
    related: [
      {
        label: "AI Search Optimisation",
        href: "/services/ai-search-optimisation/",
        type: "SERVICE",
      },
    ],
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    answer:
      "Consultancies and professional firms sell expertise that is hard to evaluate from outside — so buyers use proxies: who ranks, who is cited, who looks established. Most firms publish nothing that supports any of those.",
    context:
      "Referral has always carried professional services, and it still does. But referred buyers now verify online before they call, and increasingly ask an AI assistant for a shortlist first. A firm with no published thinking loses at the verification step, however strong the referral.",
    problems: [
      {
        title: "Invisible outside the referral network",
        description:
          "Growth is capped by the size of the partner address book, because nothing brings in demand independently.",
        addressedBy: ["seo"],
      },
      {
        title: "No published expertise to verify against",
        description:
          "A referred buyer searches the firm, finds a services list and no substance, and hesitates.",
        addressedBy: ["seo", "ai-search-optimisation"],
      },
      {
        title: "Not surfaced when buyers ask an AI assistant",
        description:
          "AI systems recommend firms they can identify and verify. An unclear entity with thin content does not get named.",
        addressedBy: ["ai-search-optimisation"],
      },
      {
        title: "Administrative load on billable people",
        description:
          "Scheduling, onboarding, document collection and reporting consume time that should be chargeable.",
        addressedBy: ["workflow-automation"],
      },
    ],
    useCases: ["generate-more-leads", "get-found-in-ai-search"],
    services: ["seo", "ai-search-optimisation", "workflow-automation"],
    seo: {
      title: "Professional Services",
      description:
        "Visibility and efficiency for consultancies and professional firms — published expertise, AI-assistant presence, and less administrative load.",
      primaryTopic: "professional services growth",
      secondaryTopics: ["consulting firm marketing", "local visibility"],
      intent: "commercial",
    },
    audience: ["A1", "A2"],
    phase: "P2",
    cta: { label: "Book a consultation", href: "/contact/", tier: "T4" },
  },
];

export const industries: Industry[] = [...coreIndustries, ...expandedIndustries];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
