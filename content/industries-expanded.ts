/**
 * Additional industries.
 *
 * These pages describe sector dynamics and map them to capabilities we
 * actually have. They deliberately make no claim of prior work in the
 * sector: no client counts, no named logos, no "years serving X". Where a
 * sector carries regulatory constraints, those are described as constraints
 * to plan around rather than as compliance we certify.
 */

import type { Industry } from "@/types/content";

export const expandedIndustries: Industry[] = [
  {
    slug: "saas",
    title: "SaaS",
    layout: "opportunity-led",
    diagram: "experience-flow",
    answer:
      "SaaS businesses compete in categories where buyers research heavily before contacting anyone. Most of the decision happens across search, comparison content and AI answers — before a demo is ever requested.",
    opportunity:
      "Because the buying journey is almost entirely self-directed, the content that explains, compares and qualifies is doing the selling. That is work a SaaS company can control.",
    context:
      "Growth is measured in trials, activation and retention rather than one-off sales, which changes what marketing has to produce. Acquisition cost is judged against lifetime value, so a channel that compounds is worth more than one that converts faster. Product-led motions add a further constraint: the site has to qualify honestly, because a poorly qualified signup costs support time and churns.",
    problems: [
      {
        title: "The category page ranks, the product page does not",
        description:
          "Buyers search the problem before they search a product. Sites built only around features never enter the research stage where the shortlist is formed.",
        addressedBy: ["seo", "digital-strategy"],
      },
      {
        title: "Comparison queries are owned by review sites",
        description:
          "Third-party listicles capture the highest-intent queries in the category, and the vendor has no presence in the conversation about its own product.",
        addressedBy: ["seo", "answer-engine-optimisation"],
      },
      {
        title: "AI assistants describe the product inaccurately",
        description:
          "Where documentation is thin or inconsistent, assistants answer from whatever they can find — often an outdated review or a competitor's comparison page.",
        addressedBy: ["ai-search-optimisation", "generative-engine-optimisation"],
      },
      {
        title: "Signups arrive unqualified",
        description:
          "Volume rises while activation does not, because the site sells the category rather than describing who the product is genuinely right for.",
        addressedBy: ["conversion-rate-optimization", "ui-ux-design"],
      },
    ],
    useCases: [
      "increase-organic-traffic",
      "get-found-in-ai-search",
      "improve-website-conversion",
      "generate-more-leads",
    ],
    services: [
      "seo",
      "ai-search-optimisation",
      "conversion-rate-optimization",
      "answer-engine-optimisation",
    ],
    seo: {
      title: "Digital Growth for SaaS Companies",
      description:
        "SaaS buyers research before they contact anyone. How search, comparison content and AI answers shape the shortlist, and where vendors lose it.",
      primaryTopic: "SaaS digital growth",
      secondaryTopics: ["SaaS SEO", "product-led growth", "AI search"],
      intent: "commercial",
    },
    audience: ["A3", "A2"],
    phase: "P1",
    cta: {
      label: "Talk through your funnel",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "Should a SaaS company invest in SEO or paid acquisition?",
        answer:
          "Usually both, weighted by runway. Paid buys immediate, measurable signups; organic compounds and lowers blended acquisition cost over time. Relying only on paid means renting the same demand indefinitely.",
      },
      {
        question: "How do we compete with review sites on comparison queries?",
        answer:
          "Not by outranking them everywhere. By owning the honest version of the comparison on your own site — including where you are not the right choice, which is what makes it credible enough to be cited.",
      },
    ],
    related: [
      { label: "SEO Services", href: "/services/seo/", type: "SERVICE" },
      {
        label: "Improve website conversion",
        href: "/use-cases/improve-website-conversion/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    layout: "challenge-led",
    answer:
      "Healthcare organisations are searched by people making consequential decisions, often urgently. Accuracy, clarity and accessibility matter more here than persuasion, and the regulatory constraints are real.",
    context:
      "Patients and carers search symptoms, conditions, procedures and providers, frequently under stress and often on a phone. The content that serves them well is specific, readable and honest about uncertainty. Because health information is held to a higher standard by both search engines and readers, thin or exaggerated content performs worse here than in almost any other sector.",
    problems: [
      {
        title: "Practical questions are unanswered",
        description:
          "Sites describe services in clinical language while patients search in everyday words about cost, waiting time, preparation and what will actually happen.",
        addressedBy: ["seo", "answer-engine-optimisation"],
      },
      {
        title: "Local visibility is incomplete",
        description:
          "Multi-site providers frequently have inconsistent listings, wrong hours or missing services, which affects both search and the patient's first impression.",
        addressedBy: ["google-business-profile", "seo"],
      },
      {
        title: "Accessibility failures exclude patients",
        description:
          "Small text, poor contrast and forms that cannot be completed with assistive technology exclude exactly the people most likely to need the service.",
        addressedBy: ["ui-ux-design", "website-performance"],
      },
      {
        title: "Administrative load falls on clinical staff",
        description:
          "Appointment queries, form chasing and routine information requests consume time that should be clinical.",
        addressedBy: ["workflow-automation", "ai-chatbots"],
      },
    ],
    complianceNotes:
      "Patient data handling, consent and record-keeping obligations vary by jurisdiction and by the nature of the data involved. We design to keep personal data out of systems that do not need it, and we expect the obligations that apply to a specific organisation to be confirmed by that organisation's own compliance advisers rather than assumed by us.",
    useCases: [
      "rank-in-local-search",
      "improve-customer-experience",
      "reduce-manual-work",
      "improve-digital-presence",
    ],
    services: [
      "seo",
      "google-business-profile",
      "workflow-automation",
      "ui-ux-design",
    ],
    seo: {
      title: "Digital Growth for Healthcare Providers",
      description:
        "Patients search under stress, on phones, for practical answers. Where healthcare sites fail them, and the regulatory constraints to plan around.",
      primaryTopic: "healthcare digital growth",
      secondaryTopics: ["healthcare SEO", "patient experience", "accessibility"],
      intent: "commercial",
    },
    audience: ["A2", "A6"],
    phase: "P2",
    cta: {
      label: "Talk through your constraints",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "Can AI be used safely in a healthcare setting?",
        answer:
          "For administrative work — routing enquiries, drafting non-clinical correspondence, answering logistical questions from approved content — with human review and no clinical decision-making. Clinical applications carry regulatory obligations that must be assessed by the provider's own advisers.",
      },
      {
        question: "Why does accessibility matter more in healthcare?",
        answer:
          "Because the people most likely to need the service are disproportionately likely to rely on assistive technology, larger text or high contrast. An inaccessible site excludes exactly its intended audience.",
      },
    ],
    related: [
      {
        label: "Google Business Profile Optimisation",
        href: "/services/google-business-profile/",
        type: "SERVICE",
      },
      {
        label: "Improve customer experience",
        href: "/use-cases/improve-customer-experience/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "financial-services",
    title: "Financial Services",
    layout: "challenge-led",
    answer:
      "Financial services buyers research extensively and trust cautiously. Credibility is established through clarity and specificity rather than claims, and much of what can be said is constrained by regulation.",
    context:
      "Products are compared on terms that are hard to explain simply, and the gap between what a firm may say and what a customer wants to know is where most content fails. Trust signals matter disproportionately, and because financial content is held to a higher standard by search engines, vagueness is penalised more than in other sectors.",
    problems: [
      {
        title: "Compliance-safe content says nothing",
        description:
          "Legal review strips content until it is accurate and useless. The result ranks poorly and answers nothing a customer actually asked.",
        addressedBy: ["seo", "digital-strategy"],
      },
      {
        title: "Comparison queries go unanswered",
        description:
          "Customers want to understand options before choosing. Firms that will not explain the alternatives are absent from the stage where the decision forms.",
        addressedBy: ["answer-engine-optimisation", "seo"],
      },
      {
        title: "Onboarding is slow and manual",
        description:
          "Document collection, verification and approval steps handled by email and spreadsheets create delay that customers experience as disinterest.",
        addressedBy: ["workflow-automation", "systems-integration"],
      },
      {
        title: "Reporting cannot answer basic questions",
        description:
          "Data spread across policy, CRM and finance systems means simple commercial questions take days to answer and arrive contested.",
        addressedBy: ["business-intelligence", "analytics-implementation"],
      },
    ],
    complianceNotes:
      "Financial promotions, advice boundaries and record-keeping obligations differ by jurisdiction and by the permissions a firm holds. Content and automation should be designed with the firm's compliance function involved from the outset rather than reviewed at the end, and the applicable obligations confirmed by that function rather than by us.",
    useCases: [
      "generate-more-leads",
      "reduce-manual-work",
      "improve-digital-presence",
      "connect-business-systems",
    ],
    services: [
      "seo",
      "workflow-automation",
      "business-intelligence",
      "systems-integration",
    ],
    seo: {
      title: "Digital Growth for Financial Services",
      description:
        "Where compliance-safe content stops being useful, why comparison queries go unanswered, and the operational drag in onboarding.",
      primaryTopic: "financial services digital growth",
      secondaryTopics: ["financial services marketing", "onboarding automation"],
      intent: "commercial",
    },
    audience: ["A2", "A3", "A8"],
    phase: "P2",
    cta: {
      label: "Talk through your constraints",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "How do we produce useful content within compliance limits?",
        answer:
          "Involve compliance in the brief rather than the review. Most useful content explains how something works and what the trade-offs are, which is usually permissible; it is the unqualified claim about outcomes that is not.",
      },
      {
        question: "Can onboarding be automated in a regulated firm?",
        answer:
          "The administrative parts frequently can — document collection, status tracking, reminders, routing — with decisions and verification staying with authorised people and a full audit trail retained.",
      },
    ],
    related: [
      {
        label: "Business Intelligence",
        href: "/services/business-intelligence/",
        type: "SERVICE",
      },
      {
        label: "Connect business systems",
        href: "/use-cases/connect-business-systems/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce & Retail",
    layout: "journey-led",
    diagram: "experience-flow",
    answer:
      "E-commerce visibility is decided by product and category pages that most sites treat as templates. Where those pages are thin, duplicated or slow, the catalogue competes against itself and against marketplaces.",
    context:
      "Retail search spans discovery, comparison and repeat purchase, each with different requirements. Large catalogues generate technical problems that smaller sites never encounter — faceted navigation creating near-infinite URLs, out-of-stock handling, and variants that duplicate each other. Marketplaces compete for the same queries with far greater authority, so specificity is the available advantage.",
    problems: [
      {
        title: "Faceted navigation generates crawl waste",
        description:
          "Filter combinations produce thousands of near-identical URLs, spending crawl effort on pages that should never have been indexable.",
        addressedBy: ["technical-seo"],
      },
      {
        title: "Category pages are thin",
        description:
          "A heading and a product grid gives a search engine almost nothing to rank, on exactly the pages that should capture discovery queries.",
        addressedBy: ["seo", "conversion-rate-optimization"],
      },
      {
        title: "Speed costs conversion on mobile",
        description:
          "Heavy imagery, third-party tags and layout shift are worst on the devices most shopping happens on, and the effect on revenue is direct.",
        addressedBy: ["website-performance"],
      },
      {
        title: "Operations do not scale with orders",
        description:
          "Stock, fulfilment and customer queries handled manually cap growth and degrade experience precisely when demand rises.",
        addressedBy: ["workflow-automation", "systems-integration"],
      },
    ],
    useCases: [
      "increase-organic-traffic",
      "improve-website-conversion",
      "reduce-manual-work",
      "connect-business-systems",
    ],
    services: [
      "technical-seo",
      "website-performance",
      "conversion-rate-optimization",
      "workflow-automation",
    ],
    seo: {
      title: "Digital Growth for E-commerce & Retail",
      description:
        "Faceted navigation, thin category pages, mobile speed and operations that do not scale — the four constraints that cap retail growth.",
      primaryTopic: "ecommerce digital growth",
      secondaryTopics: ["ecommerce SEO", "retail conversion", "site speed"],
      intent: "commercial",
    },
    audience: ["A1", "A3", "A6"],
    phase: "P2",
    cta: {
      label: "Talk through your catalogue",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "Should filter pages be indexable?",
        answer:
          "Only where a filter combination matches real demand and has content worth ranking. Everything else should be blocked or canonicalised, because indexing them spends crawl effort and splits signals across near-duplicates.",
      },
      {
        question: "How do we compete with marketplaces?",
        answer:
          "Rarely on head terms, where their authority is decisive. The available advantage is specificity — depth on the products and questions a general marketplace covers shallowly.",
      },
    ],
    related: [
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
      {
        label: "Website Performance",
        href: "/services/website-performance/",
        type: "SERVICE",
      },
    ],
  },
  {
    slug: "logistics",
    title: "Logistics & Supply Chain",
    layout: "challenge-led",
    diagram: "system-architecture",
    answer:
      "Logistics operations run on coordination between systems that were rarely designed to work together. The cost of that gap appears as manual reconciliation, status queries and decisions made on stale data.",
    context:
      "Work spans transport management, warehousing, customer systems and partner platforms, frequently including partners whose systems you do not control. Margins are thin enough that administrative overhead matters directly, and customers increasingly expect the visibility they get from consumer parcel tracking.",
    problems: [
      {
        title: "Status requests consume operational time",
        description:
          "Customers call or email for information that exists in a system nobody has exposed to them, and staff act as a lookup service.",
        addressedBy: ["workflow-automation", "systems-integration"],
      },
      {
        title: "Data is rekeyed between systems",
        description:
          "Bookings, manifests and invoices retyped between platforms create both cost and a steady rate of error that is expensive to unpick.",
        addressedBy: ["systems-integration", "workflow-automation"],
      },
      {
        title: "Reporting arrives too late to act on",
        description:
          "Figures assembled manually from several systems describe last week, when the decisions they inform are being made today.",
        addressedBy: ["business-intelligence", "analytics-implementation"],
      },
      {
        title: "Partner integrations are fragile",
        description:
          "File-based exchanges built years ago fail silently and are discovered when something has already gone wrong downstream.",
        addressedBy: ["systems-integration"],
      },
    ],
    useCases: [
      "connect-business-systems",
      "reduce-manual-work",
      "improve-operational-efficiency",
      "improve-customer-experience",
    ],
    services: [
      "systems-integration",
      "workflow-automation",
      "business-intelligence",
      "custom-software",
    ],
    seo: {
      title: "Digital Growth for Logistics & Supply Chain",
      description:
        "Status requests, rekeyed data, late reporting and fragile partner integrations — where coordination gaps cost logistics operators most.",
      primaryTopic: "logistics digital transformation",
      secondaryTopics: ["supply chain systems", "logistics automation"],
      intent: "commercial",
    },
    audience: ["A6", "A2", "A7"],
    phase: "P2",
    cta: {
      label: "Talk through your systems",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "Can we integrate with partners who have no API?",
        answer:
          "Usually, through scheduled file exchange or an intermediary layer — but those routes fail quietly, so alerting and reconciliation matter more than the integration itself.",
      },
      {
        question: "Where is the quickest operational return?",
        answer:
          "Normally self-service status visibility. It removes a high volume of inbound queries without changing any underlying process, and customers experience it as a service improvement.",
      },
    ],
    related: [
      {
        label: "Systems Integration",
        href: "/services/systems-integration/",
        type: "SERVICE",
      },
      {
        label: "Improve operational efficiency",
        href: "/use-cases/improve-operational-efficiency/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "it-services",
    title: "IT Services",
    layout: "opportunity-led",
    answer:
      "IT services firms sell capability that is hard to differentiate on a website. Buyers compare providers who describe themselves in near-identical language, so specificity is the only real distinguishing signal.",
    context:
      "Buying is usually a considered, referral-influenced process where the website's job is to qualify and reassure rather than to generate demand alone. Because most competitors publish the same service lists in the same words, the firms that state how they work, what they refuse, and what a project actually involves stand out disproportionately.",
    problems: [
      {
        title: "The site is indistinguishable from competitors",
        description:
          "Identical service lists and the same adjectives leave a buyer with nothing to compare except price.",
        addressedBy: ["digital-strategy", "seo"],
      },
      {
        title: "Technical expertise is invisible to search",
        description:
          "Genuine depth lives in the team's heads rather than in published content, so the firm never appears during the research stage.",
        addressedBy: ["seo", "answer-engine-optimisation"],
      },
      {
        title: "Enquiries are poorly qualified",
        description:
          "Without a clear statement of who the firm is right for, sales time is spent on conversations that were never going to fit.",
        addressedBy: ["conversion-rate-optimization", "ui-ux-design"],
      },
      {
        title: "Internal delivery is less systematic than the pitch",
        description:
          "Firms selling process improvement frequently run their own operations on spreadsheets and inherited habits.",
        addressedBy: ["workflow-automation", "business-intelligence"],
      },
    ],
    useCases: [
      "generate-more-leads",
      "improve-digital-presence",
      "increase-organic-traffic",
      "improve-website-conversion",
    ],
    services: [
      "seo",
      "digital-strategy",
      "conversion-rate-optimization",
      "workflow-automation",
    ],
    seo: {
      title: "Digital Growth for IT Services Firms",
      description:
        "IT services sites describe themselves identically. Why specificity is the only differentiator, and where expertise stays invisible to search.",
      primaryTopic: "IT services marketing",
      secondaryTopics: ["B2B services SEO", "lead qualification"],
      intent: "commercial",
    },
    audience: ["A1", "A2", "A3"],
    phase: "P2",
    cta: {
      label: "Talk through your positioning",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "Does publishing technical content win work?",
        answer:
          "Indirectly and reliably. It rarely produces an enquiry on its own, but it is what makes a firm findable during research and credible during evaluation — and increasingly what makes it citable in AI answers.",
      },
      {
        question: "How do we qualify enquiries better?",
        answer:
          "State plainly who the firm is right for and who it is not, including project size. Firms are reluctant to do this and it is the single most effective qualification change available.",
      },
    ],
    related: [
      {
        label: "Digital Strategy",
        href: "/services/digital-strategy/",
        type: "SERVICE",
      },
      {
        label: "Professional Services",
        href: "/industries/professional-services/",
        type: "INDUSTRY",
      },
    ],
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    layout: "journey-led",
    answer:
      "Hospitality is discovered locally and booked on mobile, often within minutes of the search. Visibility, speed and accurate information decide bookings more than any brand message on the site.",
    context:
      "Guests search by location, occasion and availability, compare quickly across tabs, and abandon anything slow or unclear. A significant share of the decision happens on third-party platforms and map results before a website is opened at all, which makes profile accuracy and direct-booking friction the two highest-leverage areas.",
    problems: [
      {
        title: "Listings carry wrong or missing information",
        description:
          "Outdated hours, missing facilities and inconsistent details across platforms cost bookings before the site is ever reached.",
        addressedBy: ["google-business-profile", "seo"],
      },
      {
        title: "Direct booking loses to aggregators",
        description:
          "A slow or awkward booking path sends guests to a platform that charges commission for a customer the venue had already earned.",
        addressedBy: ["conversion-rate-optimization", "website-performance"],
      },
      {
        title: "Mobile experience is an afterthought",
        description:
          "Heavy imagery and desktop-first layouts fail on the devices almost all hospitality browsing happens on.",
        addressedBy: ["website-performance", "ui-ux-design"],
      },
      {
        title: "Enquiry handling is manual and slow",
        description:
          "Event and group enquiries handled by inbox alone are answered inconsistently and sometimes not at all.",
        addressedBy: ["workflow-automation", "sales-automation"],
      },
    ],
    useCases: [
      "rank-in-local-search",
      "improve-website-conversion",
      "generate-more-leads",
      "improve-customer-experience",
    ],
    services: [
      "google-business-profile",
      "conversion-rate-optimization",
      "website-performance",
      "workflow-automation",
    ],
    seo: {
      title: "Digital Growth for Hospitality",
      description:
        "Discovered locally, booked on mobile. Why listing accuracy and direct-booking friction decide more than the website's message.",
      primaryTopic: "hospitality digital marketing",
      secondaryTopics: ["local search", "direct booking", "mobile experience"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P2",
    cta: {
      label: "Talk through your bookings",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "How do we win more direct bookings?",
        answer:
          "Mostly by removing friction rather than by discounting. A fast, obvious booking path with no forced account creation recovers guests who already intended to book direct before the process discouraged them.",
      },
      {
        question: "Do we still need listing platforms?",
        answer:
          "Usually yes, for discovery. The goal is not to leave them but to ensure guests who then search the venue by name find a direct path that is easier than returning to the platform.",
      },
    ],
    related: [
      {
        label: "Rank in local search",
        href: "/use-cases/rank-in-local-search/",
        type: "USE CASE",
      },
      {
        label: "Local SEO checklist",
        href: "/resources/local-seo-checklist/",
        type: "CHECKLIST",
      },
    ],
  },
  {
    slug: "startups",
    title: "Startups",
    layout: "opportunity-led",
    answer:
      "Startups have less time and less money than the playbooks assume. The useful question is not which channels exist but which single one can be made to work before the runway matters.",
    context:
      "Early-stage constraints are severe: no domain authority, no content history, a product still changing, and a team too small to run several channels properly. That argues for concentration rather than coverage, and for building only the infrastructure that a decision actually depends on.",
    problems: [
      {
        title: "Effort is spread across too many channels",
        description:
          "A little of everything produces nothing measurable, and the team concludes that none of it works.",
        addressedBy: ["digital-strategy"],
      },
      {
        title: "SEO is expected to deliver immediately",
        description:
          "Organic search is a compounding channel. Expecting enquiries within a quarter leads to abandoning it just before it starts to work.",
        addressedBy: ["seo", "digital-strategy"],
      },
      {
        title: "The site explains the product, not the problem",
        description:
          "Founders describe what they built. Buyers search the problem they have, and never encounter a page written in their words.",
        addressedBy: ["conversion-rate-optimization", "seo"],
      },
      {
        title: "Manual processes are rebuilt rather than removed",
        description:
          "Early operational shortcuts harden into permanent work that consumes the small team's capacity as volume grows.",
        addressedBy: ["workflow-automation"],
      },
    ],
    useCases: [
      "generate-more-leads",
      "improve-website-conversion",
      "get-found-in-ai-search",
      "reduce-manual-work",
    ],
    services: [
      "digital-strategy",
      "conversion-rate-optimization",
      "seo",
      "corporate-websites",
    ],
    seo: {
      title: "Digital Growth for Startups",
      description:
        "Less time and money than the playbooks assume. Why concentration beats coverage, and the four mistakes that waste an early-stage quarter.",
      primaryTopic: "startup digital growth",
      secondaryTopics: ["early stage marketing", "startup SEO"],
      intent: "commercial",
    },
    audience: ["A1", "A2"],
    phase: "P2",
    cta: {
      label: "Talk through the priority",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "Is SEO worth it for an early-stage startup?",
        answer:
          "Only if you can sustain it for two or three quarters and there is existing search demand for the problem you solve. If either is missing, spend the money on a channel that produces feedback faster and revisit later.",
      },
      {
        question: "What should a startup build first?",
        answer:
          "The narrowest thing that tests the riskiest assumption. Infrastructure built before there is evidence of demand is the most common way early engineering budget disappears.",
      },
    ],
    related: [
      {
        label: "Digital Strategy",
        href: "/services/digital-strategy/",
        type: "SERVICE",
      },
      {
        label: "SEO vs paid search",
        href: "/resources/seo-vs-paid-search/",
        type: "COMPARISON",
      },
    ],
  },
];
