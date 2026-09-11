/**
 * Services — seed set proving the data-driven routing scales.
 * Prompt 3 expands this to the full service catalogue in
 * docs/architecture/sitemap.csv (99 service pages).
 */

import type { Service } from "@/types/content";
import { visibilityServices } from "./visibility-services";
import { deliveryServices } from "./delivery-services";
import { webServices } from "./web-services";
import { searchServices } from "./search-services";
import { platformServices } from "./platform-services";
import { contentForService } from "./service-content";
import { metaForService } from "./service-meta";

const coreServices: Service[] = [
  {
    slug: "seo",
    practice: "search-ai-visibility",
    title: "SEO",
    answer:
      "Search engine optimisation is the work of making a site findable and credible for the queries your buyers use: fixing the technical constraints that cap visibility, structuring content so it can be understood, and earning the authority that makes it rank.",
    seo: {
      title: "SEO Services",
      description:
        "Technical SEO, content structure and authority building, measured against enquiries rather than rankings alone.",
      primaryTopic: "search engine optimisation",
      secondaryTopics: ["technical SEO", "on-page SEO", "SEO strategy"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P1",
    whoFor: [
      "Businesses whose traffic has flattened despite publishing consistently",
      "Sites that rank for their brand name and almost nothing else",
      "Teams who have been given rankings reports but no commercial answer",
    ],
    included: [
      "Technical audit: crawl, index coverage, site speed, structured data",
      "Information architecture and internal linking",
      "Keyword and query strategy mapped to buying stages",
      "On-page optimisation and content briefs",
      "Authority building through digital PR and earned links",
      "Monthly reporting against enquiries, not just positions",
    ],
    approach: [
      {
        index: 1,
        title: "Audit",
        description:
          "Full technical and content audit. You get the findings whether or not you continue with us.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Fix the foundation",
        description:
          "Crawl and index problems, site architecture, page speed, schema. Nothing else works until these do.",
        duration: "Weeks 3–6",
      },
      {
        index: 3,
        title: "Build relevance",
        description:
          "Content structured around real queries, and internal linking that makes the site legible to search engines.",
        duration: "Weeks 6–12",
      },
      {
        index: 4,
        title: "Build authority",
        description: "Earned coverage and links from sources that matter in your sector.",
        duration: "Ongoing",
      },
    ],
    timeline:
      "8–12 weeks to meaningful movement. Weeks 1–2 are audit; you will not see ranking change before week 10.",
    outOfScope: [
      "Buying links or private blog networks",
      "Guaranteed positions: no agency can honestly promise them",
      "Content volume without a query behind it",
    ],
    technologies: ["Google Search Console", "Screaming Frog", "GA4"],
    cta: {
      label: "Get a free SEO audit",
      href: "/contact/",
      tier: "T3",
      note: "We send the findings whether or not you work with us.",
    },
    faqs: [
      {
        question: "How long does SEO take to work?",
        answer:
          "Technical fixes can show results within weeks. Competitive rankings typically take three to six months. Any agency promising first-page results in 30 days is either targeting queries nobody searches or using tactics that will cost you later.",
      },
      {
        question: "Do you guarantee rankings?",
        answer:
          "No. Nobody controls Google's index, so a ranking guarantee is either meaningless or a promise about worthless keywords. We commit to a process, a reporting cadence, and honest measurement against enquiries.",
      },
      {
        question: "Is SEO still worth it now that AI answers questions directly?",
        answer:
          "Yes, but the target has widened. AI systems cite sources, and the qualities that earn a citation (clear structure, extractable answers, a coherent entity) are the same foundations good SEO has always built. We treat them as one programme.",
      },
      {
        question: "What does an SEO engagement actually include?",
        answer:
          "A technical audit covering crawl, index coverage, site speed and structured data; information architecture and internal linking; a query strategy mapped to buying stages rather than to search volume; on-page work and content briefs; and authority building through earned coverage. The order matters more than the list. Technical constraints cap everything built on top of them, so the foundation is repaired before content is commissioned.",
      },
      {
        question: "How do you measure whether SEO is working?",
        answer:
          "In four separate layers, because an aggregate traffic number cannot tell you which one is failing. Eligibility is whether pages are indexed at all. Appearance is impressions and average position for the queries that describe your business. Arrival is clicks. Outcome is enquiries. Rankings alone will tell you a flattering story in a year when clicks are falling industry-wide, and enquiries alone will not tell you why.",
      },
      {
        question: "Does SEO work the same way for a local business and a national one?",
        answer:
          "No, and the difference is structural rather than a matter of effort. Local results are decided largely by proximity, prominence and relevance, and proximity is the one you cannot change: no business ranks everywhere, and a competitor two streets away has an advantage you cannot buy. National visibility is won on topical depth and earned authority instead, which is slower but not bounded by geography.",
      },
      {
        question: "What is deliberately not part of this service?",
        answer:
          "Buying links or using private blog networks, guaranteeing positions, and producing content volume with no query behind it. The first two carry penalty risk disproportionate to any benefit, and no agency controls a search index well enough to promise a position honestly. The third is the most common way an SEO budget is spent without moving anything.",
      },
      {
        question: "What happens to the results if the work stops?",
        answer:
          "It depends on which layer earned them. Technical fixes persist, because a site that can be crawled and rendered stays that way until someone changes it. Content keeps earning for as long as it remains accurate and nothing better is published against the same query. Authority and freshness decay slowly rather than disappearing, because competitors continue publishing while you do not.",
      },
    ],
    related: [
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
      {
        label: "AI Search Optimisation",
        href: "/services/ai-search-optimisation/",
        type: "SERVICE",
      },
      { label: "Increase organic traffic", href: "/use-cases/increase-organic-traffic/", type: "USE CASE" },
    ],
  },
  {
    slug: "ai-search-optimisation",
    practice: "search-ai-visibility",
    title: "AI Search Optimisation",
    answer:
      "AI search optimisation is the work of getting a brand cited inside AI-generated answers: in Google AI Overviews, ChatGPT, Perplexity and Gemini. It is won through content structure, entity clarity and machine-readable data, not through keyword density.",
    seo: {
      title: "AI Search Optimisation",
      description:
        "Get cited in AI answers. Entity optimisation, structured data, and content shaped for retrieval across ChatGPT, Perplexity, Gemini and AI Overviews.",
      primaryTopic: "AI search optimisation",
      secondaryTopics: ["AEO", "GEO", "AI Overviews", "entity optimisation"],
      intent: "commercial",
    },
    audience: ["A3", "A2"],
    phase: "P1",
    whoFor: [
      "Brands whose organic clicks are falling while rankings hold steady",
      "Marketing leads who cannot answer 'do we appear in ChatGPT?'",
      "Businesses in categories where buyers now start with an AI assistant",
    ],
    included: [
      "Baseline measurement across a fixed prompt set, re-run monthly",
      "Entity audit: how machines currently understand your brand",
      "Structured data and schema implementation, anchored to one organisation entity",
      "Crawlability for AI agents, including robots and llms.txt policy",
      "Content restructured for extraction and citation",
      "Citation tracking across the major AI systems",
    ],
    timeline:
      "Baseline in week 1. Structural work weeks 2–8. Citation change is typically visible from month three.",
    outOfScope: [
      "Guaranteed citations: no one controls what a model retrieves",
      "Gaming model outputs through manipulated content",
    ],
    cta: {
      label: "Request an AI visibility assessment",
      href: "/contact/",
      tier: "T3",
      note: "You get the measurement, whether or not you continue.",
    },
    faqs: [
      {
        question: "What is the difference between AEO and GEO?",
        answer:
          "Answer Engine Optimisation targets extractive answers: featured snippets and direct answers, where a system lifts your text. Generative Engine Optimisation targets citation inside a synthesised response, where a model reads several sources and attributes some of them. Different mechanisms, overlapping foundations.",
      },
      {
        question: "How do you measure AI visibility?",
        answer:
          "We run a fixed set of around 50 buyer questions against each major AI system on a monthly schedule and log which brands are cited. A fixed prompt set matters: without one, the measurement is noise, because model outputs vary between runs.",
      },
      {
        question: "Can you guarantee we will appear in ChatGPT?",
        answer:
          "No. Nobody can, and anyone who claims otherwise does not understand how retrieval works. What we can do is remove the reasons a model would not cite you: unclear entity, unstructured content, blocked crawlers, and answers buried below marketing copy.",
      },
    ],
    related: [
      { label: "SEO", href: "/services/seo/", type: "SERVICE" },
      { label: "Get found in AI search", href: "/use-cases/get-found-in-ai-search/", type: "USE CASE" },
    ],
  },
  {
    slug: "technical-seo",
    practice: "search-ai-visibility",
    parent: "seo",
    title: "Technical SEO",
    answer:
      "Technical SEO removes the structural reasons a site underperforms: crawl and index problems, slow pages, broken architecture and missing structured data. It is the constraint that caps everything else you do in search.",
    seo: {
      title: "Technical SEO",
      description:
        "Crawl, index, performance and structured data problems diagnosed and fixed: the constraints that cap search visibility.",
      primaryTopic: "technical SEO",
      secondaryTopics: ["crawl budget", "indexation", "Core Web Vitals", "schema"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P1",
    whoFor: [
      "Sites where good content is not being indexed",
      "Teams who have had a sudden, unexplained traffic drop",
      "Large sites where crawl budget is being wasted",
    ],
    included: [
      "Full crawl and log-file analysis",
      "Index coverage and canonicalisation review",
      "Core Web Vitals and render-path diagnosis",
      "Structured data implementation and validation",
      "Internal link and site architecture repair",
      "Migration and redirect planning",
    ],
    timeline: "2–3 weeks for the audit, then fixes prioritised by impact.",
    cta: { label: "Get a technical SEO audit", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "What causes most technical SEO problems?",
        answer:
          "On the sites we audit, the most common causes are theme and page-builder output: render-blocking CSS and JavaScript, duplicate URL patterns from plugins, and templates that omit headings entirely. These are template problems, not content problems.",
      },
    ],
    related: [
      { label: "SEO", href: "/services/seo/", type: "SERVICE" },
      { label: "Website Performance", href: "/services/website-performance/", type: "SERVICE" },
    ],
  },
  {
    slug: "ai-agents",
    practice: "ai-automation",
    title: "AI Agents",
    answer:
      "An AI agent completes a defined task end to end: reading a request, retrieving what it needs, taking an action in your systems, and escalating to a person when it should. Unlike a chatbot, it does work rather than answering questions.",
    seo: {
      title: "AI Agents",
      description:
        "AI agents that complete real tasks in your systems, with explicit boundaries and a human escalation path.",
      primaryTopic: "AI agents",
      secondaryTopics: ["intelligent automation", "AI workflows"],
      intent: "commercial",
    },
    audience: ["A6", "A7"],
    phase: "P1",
    whoFor: [
      "Teams doing high-volume repetitive work with clear rules",
      "Operations leads who need throughput without headcount",
      "Businesses where response time is costing revenue",
    ],
    included: [
      "Process mapping: what gets automated and what explicitly does not",
      "Agent design with defined tools, permissions and boundaries",
      "Integration with your existing systems",
      "Human-in-the-loop escalation and review paths",
      "Failure-mode design and monitoring",
      "Handover documentation and team training",
    ],
    timeline: "6–10 weeks for a first production agent on a single process.",
    outOfScope: [
      "Agents with unsupervised write access to financial systems",
      "Replacing judgement-heavy roles",
      "Deployments without a defined escalation path",
    ],
    cta: {
      label: "Request an automation assessment",
      href: "/contact/",
      tier: "T3",
      note: "We map the process and the risk before anything is built.",
    },
    faqs: [
      {
        question: "What is the difference between an AI agent and a chatbot?",
        answer:
          "A chatbot answers questions. An agent takes actions: looking up a record, updating a system, scheduling something, routing a request. The distinction matters commercially, because an agent needs permissions, guardrails and an escalation path that a chatbot does not.",
      },
      {
        question: "What happens when the agent gets something wrong?",
        answer:
          "That is a design question we answer before building. Every agent we deploy has defined confidence boundaries, an escalation path to a person, and logging of what it did and why. An agent without a defined failure mode should not be in production.",
      },
    ],
    related: [
      { label: "AI Chatbots", href: "/services/ai-chatbots/", type: "SERVICE" },
      { label: "Workflow Automation", href: "/services/workflow-automation/", type: "SERVICE" },
      { label: "Reduce manual work", href: "/use-cases/reduce-manual-work/", type: "USE CASE" },
    ],
  },
  {
    slug: "workflow-automation",
    practice: "ai-automation",
    title: "Workflow Automation",
    answer:
      "Workflow automation removes repetitive steps from a business process (moving data between systems, routing approvals, generating documents), so the work happens without someone having to remember to do it.",
    seo: {
      title: "Workflow Automation",
      description:
        "Automate repetitive business processes (data movement, routing, approvals and reporting) across the systems you already run.",
      primaryTopic: "workflow automation",
      secondaryTopics: ["process automation", "business process digitisation"],
      intent: "commercial",
    },
    audience: ["A6"],
    phase: "P1",
    whoFor: [
      "Teams rekeying the same data into more than one system",
      "Processes that depend on someone remembering a step",
      "Operations running on spreadsheets and email chains",
    ],
    included: [
      "Process mapping and time audit",
      "Integration between existing systems",
      "Automated routing, notifications and approvals",
      "Exception handling and monitoring",
      "Documentation your team can maintain",
    ],
    timeline: "4–8 weeks per process, depending on how many systems are involved.",
    cta: { label: "Request an automation assessment", href: "/contact/", tier: "T3" },
    related: [
      { label: "AI Agents", href: "/services/ai-agents/", type: "SERVICE" },
      { label: "Reduce manual work", href: "/use-cases/reduce-manual-work/", type: "USE CASE" },
    ],
  },
  {
    slug: "corporate-websites",
    practice: "web-development",
    title: "Corporate Websites",
    answer:
      "A corporate website has one commercial job: make a serious business look serious to the people evaluating it. That means clear structure, credible depth, fast loading, and content a buyer can actually navigate.",
    seo: {
      title: "Corporate Website Development",
      description:
        "Corporate websites built for credibility, discoverability and speed, structured so buyers can find what they need.",
      primaryTopic: "corporate website development",
      secondaryTopics: ["business websites", "company websites"],
      intent: "commercial",
    },
    audience: ["A2", "A3"],
    phase: "P1",
    whoFor: [
      "Companies whose site is smaller than the business behind it",
      "Businesses being evaluated by procurement or enterprise buyers",
      "Teams who need to publish without a developer",
    ],
    included: [
      "Information architecture and content structure",
      "Design system and page templates",
      "CMS setup so your team can publish independently",
      "Performance and accessibility built in, not retrofitted",
      "Search and AI visibility foundations",
      "Analytics and enquiry tracking",
    ],
    timeline: "8–14 weeks depending on page count and content readiness.",
    cta: { label: "Discuss your project", href: "/contact/", tier: "T4" },
    related: [
      { label: "Website Redesign", href: "/services/website-redesign/", type: "SERVICE" },
      { label: "UI/UX Design", href: "/services/ui-ux-design/", type: "SERVICE" },
    ],
  },
];

const allServices: Service[] = [
  ...coreServices,
  ...visibilityServices,
  ...deliveryServices,
  ...webServices,
  ...searchServices,
  ...platformServices,
];

/**
 * Services are assembled at read time: definition + problem/outcome content
 * + composition metadata. Adding a service means adding structured data in
 * these three places, never a new page component.
 */
export const services: Service[] = allServices.map((service) => {
  const extra = contentForService(service.slug);
  const meta = metaForService(service.slug);
  return {
    ...service,
    problems: service.problems ?? extra.problems,
    outcomes: service.outcomes ?? extra.outcomes,
    group: service.group ?? meta.group,
    layout: service.layout ?? meta.layout,
    diagram: service.diagram ?? meta.diagram,
  };
});

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByPractice(practice: string): Service[] {
  return services.filter((s) => s.practice === practice);
}
