/**
 * The search and AI visibility disciplines.
 *
 * All five are named on the live bizzfly.com SEO page (AEO, GEO, AIO, SXO)
 * plus Google Business Profile Optimisation, so these are verified BizzFly
 * capabilities rather than invented ones.
 *
 * Kept in a separate module from services.ts purely for file size; they are
 * merged into the single services array that every route reads.
 */

import type { Service } from "@/types/content";

export const visibilityServices: Service[] = [
  {
    slug: "answer-engine-optimisation",
    practice: "search-ai-visibility",
    parent: "ai-search-optimisation",
    title: "Answer Engine Optimisation (AEO)",
    answer:
      "Answer Engine Optimisation structures content so search and AI systems can lift it directly as the answer to a question: in featured snippets, direct answers and AI Overviews. It is about extraction, not ranking.",
    seo: {
      title: "Answer Engine Optimisation (AEO)",
      description:
        "Structure content so search and AI systems extract it as the direct answer. Featured snippets, direct answers and AI Overviews.",
      primaryTopic: "answer engine optimisation",
      secondaryTopics: ["AEO", "featured snippets", "direct answers"],
      intent: "commercial",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    whoFor: [
      "Sites that rank well but are never quoted in the answer box",
      "Businesses whose category is dominated by question-shaped searches",
      "Teams publishing good content that no system can extract from",
    ],
    included: [
      "Question and query mapping against real buyer language",
      "Answer-first restructuring of existing pages",
      "FAQ architecture with self-contained answers",
      "Structured data for questions, answers and how-to content",
      "Snippet and answer-presence tracking",
    ],
    timeline: "4–8 weeks to restructure a core content set; movement typically follows within a month of deployment.",
    outOfScope: [
      "Guaranteed snippet ownership: position is not controllable",
      "Thin question pages produced purely to chase answer boxes",
    ],
    cta: {
      label: "Request an AI visibility assessment",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "What is the difference between AEO and SEO?",
        answer:
          "SEO competes for a position in a list of links. AEO competes to be the passage a system lifts and shows as the answer. The technical foundations overlap, but AEO rewards a page that states its answer completely in the first few sentences, which is the opposite of how most marketing pages are written.",
      },
      {
        question: "Does winning the answer box cost us clicks?",
        answer:
          "Sometimes, yes. For purely informational queries a user may get what they need without visiting. The trade is brand presence at the moment of research, which matters more in considered purchases than a session that would have bounced anyway.",
      },
    ],
    related: [
      { label: "Generative Engine Optimisation", href: "/services/generative-engine-optimisation/", type: "SERVICE" },
      { label: "AI Search Optimisation", href: "/services/ai-search-optimisation/", type: "SERVICE" },
    ],
  },
  {
    slug: "generative-engine-optimisation",
    practice: "search-ai-visibility",
    parent: "ai-search-optimisation",
    title: "Generative Engine Optimisation (GEO)",
    answer:
      "Generative Engine Optimisation makes a brand more likely to be cited as a source inside AI-generated answers: in ChatGPT, Perplexity, Gemini and Google AI Overviews. It is won through entity clarity, citable content and crawler access.",
    seo: {
      title: "Generative Engine Optimisation (GEO)",
      description:
        "Get cited as a source inside AI-generated answers across ChatGPT, Perplexity, Gemini and AI Overviews.",
      primaryTopic: "generative engine optimisation",
      secondaryTopics: ["GEO", "AI citations", "ChatGPT visibility"],
      intent: "commercial",
    },
    audience: ["A3", "A2"],
    phase: "P1",
    whoFor: [
      "Brands whose buyers now start research with an AI assistant",
      "Companies being described inaccurately by AI systems",
      "Categories where competitors are already being named and you are not",
    ],
    included: [
      "Baseline citation measurement against a fixed prompt set",
      "Entity resolution across the site, structured data and external profiles",
      "Content restructured to be quotable and attributable",
      "Crawler access policy for AI agents",
      "Monthly citation tracking across the major systems",
    ],
    timeline:
      "Structural work over 6–8 weeks. Citation change is typically visible from month three.",
    outOfScope: [
      "Guaranteed citations: retrieval is not controllable by anyone",
      "Manipulating model outputs through deceptive content",
    ],
    cta: {
      label: "Request an AI visibility assessment",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "How is GEO different from AEO?",
        answer:
          "AEO targets extraction, where a system lifts your text more or less directly. GEO targets synthesis, where a model reads several sources, composes its own answer and attributes some of them. Same foundations, different content shape and different measurement.",
      },
    ],
    related: [
      { label: "Answer Engine Optimisation", href: "/services/answer-engine-optimisation/", type: "SERVICE" },
      { label: "Get found in AI search", href: "/use-cases/get-found-in-ai-search/", type: "USE CASE" },
    ],
  },
  {
    slug: "ai-optimisation",
    practice: "search-ai-visibility",
    parent: "ai-search-optimisation",
    title: "AI Optimisation (AIO)",
    answer:
      "AI Optimisation structures a business's digital assets so AI-powered discovery systems can read, classify and reuse them, covering machine-readable data, crawler access, and the server-rendered content most AI crawlers require.",
    seo: {
      title: "AI Optimisation (AIO)",
      description:
        "Structure digital assets for AI-powered discovery: machine-readable data, crawler access and rendering that AI systems can actually read.",
      primaryTopic: "AI optimisation",
      secondaryTopics: ["AIO", "AI crawlability", "structured data"],
      intent: "commercial",
    },
    audience: ["A7", "A3"],
    phase: "P2",
    whoFor: [
      "Sites built as single-page applications that render nothing without JavaScript",
      "Businesses with rich data that no machine can currently parse",
      "Teams that have blocked AI crawlers by accident",
    ],
    included: [
      "Rendering audit: what a non-JavaScript crawler actually sees",
      "Structured data across every page type, anchored to one organisation entity",
      "Crawler access policy and monitoring",
      "Machine-readable content and data feeds where relevant",
    ],
    timeline: "3–6 weeks, longer where a rendering change is required.",
    outOfScope: ["Rebuilding an application purely for crawlability without a commercial case"],
    cta: { label: "Request an assessment", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Why does server rendering matter for AI visibility?",
        answer:
          "Most AI crawlers execute little or no JavaScript. If your content only exists after a client-side render, those systems see an empty page, which means you cannot be cited regardless of how good the content is.",
      },
    ],
    related: [
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
      { label: "AI Stack", href: "/technologies/ai-stack/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "search-experience-optimisation",
    practice: "search-ai-visibility",
    title: "Search Experience Optimisation (SXO)",
    answer:
      "Search Experience Optimisation closes the gap between being found and being chosen, improving what happens after the click so that search visibility turns into enquiries rather than bounces.",
    seo: {
      title: "Search Experience Optimisation (SXO)",
      description:
        "Turn search visits into enquiries. Page experience, intent matching and conversion work applied to the pages search actually sends people to.",
      primaryTopic: "search experience optimisation",
      secondaryTopics: ["SXO", "conversion", "page experience"],
      intent: "commercial",
    },
    audience: ["A3", "A5"],
    phase: "P2",
    whoFor: [
      "Sites with healthy traffic and disappointing enquiry volume",
      "Pages that rank for a query they do not actually answer",
      "Businesses paying for visibility that converts poorly",
    ],
    included: [
      "Intent-to-page matching review",
      "Page experience and speed work on landing pages",
      "Conversion path analysis and remediation",
      "Enquiry tracking tied back to the query that produced it",
    ],
    timeline: "4–6 weeks, with results visible faster than most search work.",
    cta: { label: "Request a CRO assessment", href: "/contact/", tier: "T3" },
    related: [
      { label: "Improve website conversion", href: "/use-cases/improve-website-conversion/", type: "USE CASE" },
      { label: "SEO", href: "/services/seo/", type: "SERVICE" },
    ],
  },
  {
    slug: "google-business-profile",
    practice: "search-ai-visibility",
    parent: "seo",
    title: "Google Business Profile",
    answer:
      "Google Business Profile optimisation improves how a business appears in local search and maps: the listing, the categories, the questions, the reviews and the local signals that decide whether you show up when someone nearby searches.",
    seo: {
      title: "Google Business Profile Optimisation",
      description:
        "Improve local search and maps visibility: profile completeness, categories, local signals and review management.",
      primaryTopic: "Google Business Profile optimisation",
      secondaryTopics: ["local SEO", "Google Maps", "local search"],
      intent: "commercial",
    },
    audience: ["A1"],
    phase: "P1",
    whoFor: [
      "Businesses that depend on nearby customers finding them",
      "Multi-location businesses with inconsistent listings",
      "Firms invisible in the map pack for their own category",
    ],
    included: [
      "Profile audit and completion",
      "Category and attribute strategy",
      "Consistent name, address and phone data across directories",
      "Review and question management process",
      "Local ranking tracking",
    ],
    timeline: "2–4 weeks for setup; local ranking movement over 2–3 months.",
    outOfScope: [
      "Buying or incentivising fake reviews, which risks the listing entirely",
    ],
    cta: { label: "Get a local visibility audit", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Why is consistent business information so important?",
        answer:
          "Search engines and AI systems cross-check your name, address and phone number across many sources. When those sources disagree, confidence in the business entity drops and visibility suffers. It is one of the most common and most fixable local search problems.",
      },
    ],
    related: [
      { label: "SEO", href: "/services/seo/", type: "SERVICE" },
      { label: "Rank in local search", href: "/use-cases/rank-in-local-search/", type: "USE CASE" },
    ],
  },
];
