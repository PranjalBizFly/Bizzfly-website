/**
 * Additional technology pages.
 *
 * These describe the role a technology plays in solving a business problem,
 * not a developer portfolio. Where a specific vendor could not be verified we
 * describe how the choice is made rather than naming a product we cannot
 * stand behind — see content rules in the architecture docs.
 */

import type { Technology } from "@/types/content";

export const moreTechnologies: Technology[] = [
  {
    slug: "search-and-analytics",
    title: "Search & Analytics",
    category: "Search / Data",
    group: "search-data",
    layout: "capability-led",
    diagram: "search-surfaces",
    whyItMatters:
      "Search and analytics tooling decides whether you can see what is happening. Without it, every visibility decision is a guess and every report is an argument.",
    answer:
      "The search and analytics layer is how we measure visibility and behaviour: index coverage, crawl health, ranking and citation tracking, and conversion data that survives ad blockers and browser restrictions.",
    choices: [
      {
        name: "Google Search Console",
        rationale:
          "The only source of truth for how Google actually sees a site: index coverage, queries and Core Web Vitals field data.",
      },
      {
        name: "Site crawlers",
        rationale:
          "Full-site crawls surface the structural problems that cap visibility: broken canonicals, orphan pages, redirect chains, missing headings.",
      },
      {
        name: "GA4 with server-side tagging",
        rationale:
          "Client-side analytics loses a meaningful share of conversions to blocking. Server-side collection recovers enough of it to make decisions on.",
      },
      {
        name: "AI citation tracking against a fixed prompt set",
        rationale:
          "Model output varies between runs, so a fixed set of buyer questions run on a schedule is the only way to read the trend rather than the noise.",
      },
    ],
    whenNotToUse: [
      "Adding a second analytics platform because the first one is inconvenient: two sources of truth is worse than one imperfect one",
      "Heavy tracking on a site with too little traffic for the data to mean anything",
      "Session recording where the privacy cost outweighs what you would learn",
    ],
    decisionCriteria: [
      "What decision will this data actually change?",
      "Who reads it, and how often?",
      "What is the privacy and consent position?",
    ],
    services: ["analytics-implementation", "seo", "technical-seo", "business-intelligence"],
    relatedUseCases: ["increase-organic-traffic", "get-found-in-ai-search"],
    seo: {
      title: "Search & Analytics",
      description:
        "The measurement layer behind visibility work: Search Console data, crawlers, GA4 with server-side tagging, and AI citation tracking.",
      primaryTopic: "search and analytics technology",
      secondaryTopics: ["GA4", "Search Console", "measurement"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P1",
    cta: { label: "Request an assessment", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Why does our analytics undercount conversions?",
        answer:
          "Ad blockers, browser tracking prevention and consent choices all remove client-side events before they are recorded. Server-side collection recovers a large share of that gap, which is usually the difference between analytics and the CRM matching or not.",
      },
    ],
  },
  {
    slug: "integrations",
    title: "Integrations",
    category: "Integrations",
    group: "automation",
    layout: "architecture-led",
    diagram: "system-architecture",
    whyItMatters:
      "Most businesses do not have a tooling problem, they have a connection problem. Each system works; nothing talks. People become the integration layer.",
    answer:
      "Integration work connects the systems a business already runs so that data moves between them automatically, with one agreed source of truth, defined error handling, and monitoring when something fails.",
    choices: [
      {
        name: "Direct API integration",
        rationale:
          "Where volume, reliability or complex logic justify it. More work upfront, far less fragile over time.",
      },
      {
        name: "Integration platforms for simple flows",
        rationale:
          "Straightforward data movement with a few conditions is faster to build and easier for a non-developer to adjust later.",
      },
      {
        name: "Webhooks and event-driven updates",
        rationale:
          "Systems react to change rather than polling on a timer, which keeps data current without unnecessary load.",
      },
      {
        name: "A single declared source of truth per data type",
        rationale:
          "The most common integration failure is two systems both believing they own the same record. This is a design decision, not a technical one.",
      },
    ],
    whenNotToUse: [
      "Integrating a system you are about to replace",
      "Connecting processes nobody owns: automating an undefined process makes the confusion faster, not smaller",
      "Real-time sync where a scheduled update would do, at a fraction of the complexity",
    ],
    decisionCriteria: [
      "Which system owns this record?",
      "What happens when the integration fails at 2am?",
      "Is the volume high enough to justify the build?",
    ],
    services: ["systems-integration", "workflow-automation", "custom-software"],
    relatedUseCases: ["reduce-manual-work", "improve-operational-efficiency"],
    relatedIndustries: ["manufacturing"],
    seo: {
      title: "Integrations",
      description:
        "Connect the systems you already run: APIs, integration platforms and event-driven updates, with one declared source of truth.",
      primaryTopic: "systems integration technology",
      secondaryTopics: ["API", "webhooks", "data sync"],
      intent: "commercial",
    },
    audience: ["A6", "A7"],
    phase: "P1",
    cta: { label: "Technical discovery call", href: "/contact/", tier: "T4" },
    faqs: [
      {
        question: "Should we integrate or replace our systems?",
        answer:
          "Integrate first in most cases. Replacement is disruptive and expensive, and a well-connected set of adequate tools usually outperforms a single system nobody has fully adopted. Replace when the underlying system genuinely cannot do the job.",
      },
    ],
  },
  {
    slug: "content-platforms",
    title: "Content Platforms",
    category: "Web",
    group: "web",
    layout: "capability-led",
    diagram: "content-structure",
    whyItMatters:
      "The platform decides who can publish. If every content change needs a developer, the site stops being updated, and a stale site is a visibility problem before it is a design one.",
    answer:
      "A content platform is what lets a marketing team publish without a developer. The right choice depends on how much content there is, how often it changes, and who edits it, not on which platform is fashionable.",
    choices: [
      {
        name: "Structured content modelling",
        rationale:
          "Content stored as entities with relationships rather than as pages, so one fact updates everywhere it appears instead of being copy-pasted.",
      },
      {
        name: "Headless CMS with a server-rendered front end",
        rationale:
          "Editors get a familiar interface; crawlers get complete HTML. This combination is what makes a large content site both maintainable and discoverable.",
      },
      {
        name: "Preview environments on every change",
        rationale:
          "Editors should see exactly what will publish before it publishes, without involving a developer.",
      },
      {
        name: "Platform chosen per project, not per agency habit",
        rationale:
          "We do not standardise on one CMS across every client. The right platform depends on content volume, editing team and integration needs, and we would rather answer that per project than default to whatever we know best.",
      },
    ],
    whenNotToUse: [
      "A five-page site that changes twice a year: a CMS is overhead nobody will use",
      "Teams with no capacity to publish; a platform does not create a content operation",
      "Migrating platform to solve a problem that is actually content strategy",
    ],
    decisionCriteria: [
      "How many pages, changing how often?",
      "Who edits, and what is their technical comfort?",
      "Does the content have relationships, or is every page standalone?",
    ],
    services: ["corporate-websites", "website-redesign", "ui-ux-design"],
    relatedUseCases: ["improve-website-conversion"],
    seo: {
      title: "Content Platforms",
      description:
        "How BizzFly chooses a content platform: structured content, headless CMS with server rendering, and who actually has to edit it.",
      primaryTopic: "content management platforms",
      secondaryTopics: ["CMS", "headless CMS", "structured content"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P2",
    cta: { label: "Discuss your project", href: "/contact/", tier: "T4" },
    faqs: [
      {
        question: "Is WordPress a bad choice?",
        answer:
          "No, and it runs a large share of the web perfectly well. It becomes a problem when a purchased theme brings hundreds of kilobytes of code you did not choose and cannot easily remove, which is where most performance and structure problems on WordPress sites originate.",
      },
    ],
  },
  {
    slug: "cloud-and-hosting",
    title: "Cloud & Hosting",
    category: "Software",
    group: "software",
    layout: "architecture-led",
    diagram: "system-architecture",
    whyItMatters:
      "Hosting decides how fast your site responds and how it behaves when something breaks. It is invisible until it is the only thing anyone is talking about.",
    answer:
      "The hosting and infrastructure layer covers where applications run, how they are deployed, and what happens when they fail, chosen for reliability and operational simplicity rather than for scale nobody needs yet.",
    choices: [
      {
        name: "Static generation with edge delivery",
        rationale:
          "Pages served as pre-built files from close to the user. The fastest and most reliable option for content sites, with no server to fall over.",
      },
      {
        name: "Managed platforms over self-managed servers",
        rationale:
          "For most mid-market workloads the operational burden of running servers is not repaid. Managed hosting removes a category of work nobody wants.",
      },
      {
        name: "Preview deployments per change",
        rationale:
          "Every change reviewable at a real URL before it reaches production.",
      },
      {
        name: "Hosting chosen for the workload, not for a partnership",
        rationale:
          "We have no reseller arrangement steering this choice. Hosting is selected on the application's actual requirements: traffic pattern, data residency, and who operates it.",
      },
    ],
    whenNotToUse: [
      "Complex orchestration for an application with modest and predictable traffic",
      "Multi-region deployment before there is a second region of users",
      "Self-hosting to save money when the engineering time costs more than the saving",
    ],
    decisionCriteria: [
      "What is the real traffic pattern, not the hoped-for one?",
      "Who operates this at 2am?",
      "What are the data residency requirements?",
    ],
    services: ["custom-software", "web-applications", "website-performance"],
    seo: {
      title: "Cloud & Hosting",
      description:
        "Where applications run and how they are deployed: static generation, edge delivery, managed platforms and preview environments.",
      primaryTopic: "cloud hosting and infrastructure",
      secondaryTopics: ["hosting", "deployment", "edge"],
      intent: "commercial",
    },
    audience: ["A7"],
    phase: "P2",
    cta: { label: "Technical discovery call", href: "/contact/", tier: "T4" },
  },
];
