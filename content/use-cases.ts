/**
 * Use cases — problem-first, in the buyer's own words.
 * Structural rule: no BizzFly service is named above "How we solve it".
 */

import type { UseCase } from "@/types/content";
import { moreUseCases } from "./more-use-cases";
import { operationsUseCases } from "./use-cases-operations";

const coreUseCases: UseCase[] = [
  {
    slug: "generate-more-leads",
    title: "Generate more qualified leads",
    answer:
      "Most lead problems are not traffic problems. They are usually a visibility gap on the queries buyers actually use, a site that does not convert the visitors it already gets, or follow-up slow enough that interest cools before anyone responds.",
    symptoms: [
      "Enquiry volume has been flat for months while spend has not",
      "The leads that do arrive are the wrong size or the wrong sector",
      "Sales says marketing leads are unusable; marketing says sales does not follow up",
      "You cannot say which channel produced last month's best client",
    ],
    rootCauses: [
      "Visible only for your own brand name, not for what you sell",
      "The site answers who you are, but not what problem you solve",
      "No tracking connecting an enquiry back to the page that produced it",
      "Response time measured in days when the category expects hours",
    ],
    approach: [
      {
        index: 1,
        title: "Find where demand already exists",
        description:
          "Query research against real buying language, not internal vocabulary — including how people phrase things to an AI assistant.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Fix conversion before adding traffic",
        description:
          "More visitors to a page that does not convert multiplies the waste. Conversion work comes first because it is faster and cheaper.",
        duration: "Weeks 2–5",
      },
      {
        index: 3,
        title: "Build visibility on the queries that matter",
        description:
          "Search and AI visibility work targeted at commercial-intent queries rather than vanity terms.",
        duration: "Weeks 4–12",
      },
      {
        index: 4,
        title: "Close the response gap",
        description:
          "Route and acknowledge enquiries automatically so nothing waits for someone to check an inbox.",
        duration: "Weeks 6–10",
      },
    ],
    targetState:
      "A traceable flow of enquiries from named sources, converting at a rate you can measure, with response fast enough to stay in the running.",
    realisticTimeline:
      "Conversion improvements can show within a month. Search-driven volume typically takes three to six months to compound. Anyone promising both in 30 days is describing paid media, not growth.",
    services: ["seo", "ai-search-optimisation", "workflow-automation"],
    industries: ["manufacturing", "real-estate", "education"],
    seo: {
      title: "Generate more qualified leads",
      description:
        "Diagnose why enquiry volume is flat — visibility gaps, conversion leaks and slow follow-up — and fix them in the right order.",
      primaryTopic: "lead generation",
      secondaryTopics: ["qualified leads", "enquiry volume", "conversion"],
      intent: "commercial",
    },
    audience: ["A1", "A3", "A5"],
    phase: "P1",
    cta: {
      label: "Get a lead-flow assessment",
      href: "/contact/",
      tier: "T3",
      note: "We map where enquiries are being lost.",
    },
    faqs: [
      {
        question: "Should we fix the website or drive more traffic first?",
        answer:
          "Almost always the website. Conversion work is faster, cheaper and compounds with every channel afterwards. Sending more traffic to a page that converts at half the rate it should is the most common way agencies waste a budget.",
      },
    ],
    related: [
      { label: "SEO Services", href: "/services/seo/", type: "SERVICE" },
      { label: "Manufacturing", href: "/industries/manufacturing/", type: "INDUSTRY" },
    ],
  },
  {
    slug: "get-found-in-ai-search",
    title: "Get found in AI search",
    answer:
      "When buyers ask ChatGPT, Perplexity or Google's AI Overviews for a recommendation, some brands get named and most do not. The difference is rarely budget — it is whether a machine can identify the business, verify what it does, and extract a usable answer from its content.",
    symptoms: [
      "Rankings have held but organic clicks are falling",
      "You have no idea whether your brand appears in AI answers",
      "Competitors are being named in AI responses and you are not",
      "An AI assistant describes your business incorrectly",
    ],
    rootCauses: [
      "The brand entity is ambiguous — inconsistent name, address and details across sources",
      "Content buries the answer beneath marketing copy, so nothing is extractable",
      "No structured data connecting pages to a single organisation identity",
      "Content that reads as promotional rather than as a citable source",
    ],
    approach: [
      {
        index: 1,
        title: "Measure the baseline",
        description:
          "A fixed set of buyer questions run against each major AI system, logged monthly. Without a fixed prompt set, the measurement is noise.",
        duration: "Week 1",
      },
      {
        index: 2,
        title: "Resolve the entity",
        description:
          "One consistent identity across the site, structured data and every external profile, anchored to a single organisation record.",
        duration: "Weeks 2–4",
      },
      {
        index: 3,
        title: "Restructure for extraction",
        description:
          "Answer-first content, real definitions, self-contained FAQ answers, and headings that match the questions people ask.",
        duration: "Weeks 3–8",
      },
      {
        index: 4,
        title: "Open the door to AI crawlers",
        description:
          "Crawlability, structured data and server-rendered content, so systems that do not execute JavaScript can still read you.",
        duration: "Weeks 2–6",
      },
    ],
    targetState:
      "Your brand is named and described accurately when buyers ask an AI assistant about your category, and you can show the change month over month.",
    realisticTimeline:
      "Structural work takes six to eight weeks. Citation change is typically visible from month three, and compounds as more of your content becomes citable.",
    services: ["ai-search-optimisation", "seo", "technical-seo"],
    industries: ["professional-services", "education"],
    seo: {
      title: "Get found in AI search",
      description:
        "Appear in AI-generated answers across ChatGPT, Perplexity, Gemini and Google AI Overviews — measured against a fixed prompt set.",
      primaryTopic: "AI search visibility",
      secondaryTopics: ["AI citations", "AEO", "GEO"],
      intent: "commercial",
    },
    audience: ["A3", "A2"],
    phase: "P1",
    cta: {
      label: "Request an AI visibility assessment",
      href: "/contact/",
      tier: "T3",
      note: "You get the baseline measurement either way.",
    },
    faqs: [
      {
        question: "Is this just SEO with a new name?",
        answer:
          "It shares foundations — crawlability, structure, authority — but the target is different. SEO competes for a position in a list. AI search competes to be the source a model quotes, which rewards extractable answers and a clear entity far more than keyword coverage.",
      },
    ],
    related: [
      {
        label: "AI Search Optimisation",
        href: "/services/ai-search-optimisation/",
        type: "SERVICE",
      },
    ],
  },
  {
    slug: "reduce-manual-work",
    title: "Reduce manual work",
    answer:
      "Repetitive work rarely appears as a line item, so it rarely gets fixed. It shows up instead as capable people spending their week rekeying data, chasing approvals and rebuilding the same report — and as a business that cannot grow without hiring.",
    symptoms: [
      "The same data is typed into more than one system",
      "A process stops when one particular person is on leave",
      "Reporting takes days to assemble and is out of date on arrival",
      "Growth conversations always end at 'we would need to hire'",
    ],
    rootCauses: [
      "Systems that were never integrated, bridged by people instead",
      "Processes that live in someone's head rather than in a system",
      "Tools bought for one team that do not connect to anything else",
      "No owner for the process end to end",
    ],
    approach: [
      {
        index: 1,
        title: "Map where the time actually goes",
        description:
          "Follow the real process, not the documented one. The expensive steps are usually not where people expect.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Automate the highest-cost repetitive step first",
        description:
          "One process, end to end, in production — not a platform rollout that takes a year to show anything.",
        duration: "Weeks 3–8",
      },
      {
        index: 3,
        title: "Design the failure path",
        description:
          "What happens when the automation is unsure, or wrong. Decided before launch, not after an incident.",
        duration: "Concurrent",
      },
      {
        index: 4,
        title: "Hand over properly",
        description:
          "Documentation and training so your team can maintain and extend it without calling us.",
        duration: "Weeks 8–10",
      },
    ],
    targetState:
      "The repetitive parts of the process run without supervision, exceptions reach a person with context attached, and capacity grows without headcount.",
    realisticTimeline:
      "Four to eight weeks for a first process in production, depending on how many systems must be connected.",
    services: ["workflow-automation", "ai-agents"],
    industries: ["manufacturing", "real-estate"],
    seo: {
      title: "Reduce manual work",
      description:
        "Automate the repetitive work consuming your team — data movement, routing, approvals and reporting — starting with the highest-cost process.",
      primaryTopic: "reducing manual work",
      secondaryTopics: ["workflow automation", "operational efficiency"],
      intent: "commercial",
    },
    audience: ["A6"],
    phase: "P1",
    cta: { label: "Request an automation assessment", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Will automation mean losing people from the team?",
        answer:
          "In the engagements we run, it usually means the same team absorbing growth without hiring, and spending their time on work that needs judgement. We scope around specific repetitive tasks, not roles.",
      },
    ],
    related: [
      {
        label: "Workflow automation",
        href: "/services/workflow-automation/",
        type: "SERVICE",
      },
      { label: "AI Agents", href: "/services/ai-agents/", type: "SERVICE" },
    ],
  },
  {
    slug: "increase-organic-traffic",
    title: "Increase organic traffic",
    answer:
      "Organic traffic stalls for three common reasons: search engines cannot crawl or understand large parts of the site, the content targets topics rather than queries, or the site has no authority signals in a competitive category.",
    symptoms: [
      "Traffic has plateaued despite publishing regularly",
      "Pages are indexed but never appear for anything meaningful",
      "A traffic drop happened and nobody can explain it",
      "You rank for informational terms but nothing commercial",
    ],
    rootCauses: [
      "Technical constraints capping how much of the site gets indexed",
      "Content written around themes rather than around real queries",
      "Flat site architecture with no topical grouping",
      "No authority in a category where competitors have plenty",
    ],
    approach: [
      {
        index: 1,
        title: "Diagnose before prescribing",
        description:
          "Technical audit and index coverage analysis. Most stalled sites have a structural cause, not a content one.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Fix the constraints",
        description: "Crawl, index, speed and architecture — the ceiling on everything else.",
        duration: "Weeks 3–6",
      },
      {
        index: 3,
        title: "Build topical depth",
        description:
          "Clusters that cover a subject properly rather than isolated pages competing with each other.",
        duration: "Weeks 6–16",
      },
    ],
    targetState:
      "Traffic growing on commercial-intent queries, with a clear line from those queries to enquiries.",
    realisticTimeline:
      "Three to six months for compounding growth. Technical fixes can show earlier.",
    services: ["seo", "technical-seo"],
    seo: {
      title: "Increase organic traffic",
      description:
        "Diagnose why organic growth has stalled — technical constraints, content targeting or authority — and fix the actual cause.",
      primaryTopic: "organic traffic growth",
      secondaryTopics: ["SEO", "search visibility"],
      intent: "commercial",
    },
    audience: ["A3"],
    phase: "P1",
    cta: { label: "Get a free SEO audit", href: "/contact/", tier: "T3" },
    related: [{ label: "SEO Services", href: "/services/seo/", type: "SERVICE" }],
  },
];

export const useCases: UseCase[] = [
  ...coreUseCases,
  ...moreUseCases,
  ...operationsUseCases,
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}
