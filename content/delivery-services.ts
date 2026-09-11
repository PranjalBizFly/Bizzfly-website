/**
 * Build, automate and growth services.
 *
 * Every entry here is a capability named on the live bizzfly.com services
 * pages, so none are invented. Prompt 3 deepens these; this module makes them
 * real routes so homepage and mega-menu links resolve.
 */

import type { Service } from "@/types/content";

export const deliveryServices: Service[] = [
  /* ---------------------------------------------------------------- BUILD */
  {
    slug: "custom-software",
    practice: "software-development",
    title: "Custom Software",
    answer:
      "Custom software is what you build when the process you run is genuinely specific and no off-the-shelf product fits it without expensive compromise: internal systems, portals, and applications shaped around how the business actually works.",
    seo: {
      title: "Custom Software Development",
      description:
        "Software built around your actual process: internal systems, portals and applications, engineered to be maintainable by your own team.",
      primaryTopic: "custom software development",
      secondaryTopics: ["bespoke software", "internal systems"],
      intent: "commercial",
    },
    audience: ["A7", "A2"],
    phase: "P1",
    whoFor: [
      "Businesses running a core process on spreadsheets that have outgrown them",
      "Teams paying for several tools that still do not join up",
      "Companies whose competitive advantage is the process itself",
    ],
    included: [
      "Discovery and process mapping before any code",
      "Architecture and technology decisions, documented with reasoning",
      "Iterative delivery with working software at each checkpoint",
      "Testing, code review and documentation as standard",
      "Handover and training so your team can maintain it",
    ],
    timeline: "12–20 weeks for a first production release, depending on scope.",
    outOfScope: [
      "Rebuilding something an existing product already does well",
      "Fixed-scope contracts on genuinely unknown requirements",
    ],
    cta: { label: "Technical discovery call", href: "/contact/", tier: "T4" },
    faqs: [
      {
        question: "Should we build or buy?",
        answer:
          "Buy, unless the process is genuinely a differentiator. Building something the market already solves well means paying to maintain it forever. We will tell you when buying is the better answer, including when that means we do less work.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do, from day one. The repository is yours, the documentation is yours, and there is no dependency on us to keep it running.",
      },
    ],
    related: [
      { label: "Web applications", href: "/services/web-applications/", type: "SERVICE" },
      { label: "Systems Integration", href: "/services/systems-integration/", type: "SERVICE" },
    ],
  },
  {
    slug: "web-applications",
    practice: "software-development",
    title: "Web Applications",
    answer:
      "A web application is software your team or your customers use through a browser: a portal, a dashboard, a booking system, an internal tool. Built properly, it replaces a stack of spreadsheets and manual handoffs.",
    seo: {
      title: "Web Application Development",
      description:
        "Browser-based business applications: portals, dashboards, booking systems and internal tools built for real workloads.",
      primaryTopic: "web application development",
      secondaryTopics: ["business applications", "portals", "dashboards"],
      intent: "commercial",
    },
    audience: ["A7", "A6"],
    phase: "P1",
    whoFor: [
      "Teams coordinating work through email and shared files",
      "Businesses that need customers to self-serve",
      "Companies with a process no existing product supports",
    ],
    included: [
      "User and process research",
      "Interface design and prototyping",
      "Application build with authentication and permissions",
      "Integration with existing systems",
      "Deployment, monitoring and handover",
    ],
    timeline: "10–16 weeks for a first release.",
    cta: { label: "Technical discovery call", href: "/contact/", tier: "T4" },
    related: [
      { label: "Custom Software", href: "/services/custom-software/", type: "SERVICE" },
      { label: "UI/UX Design", href: "/services/ui-ux-design/", type: "SERVICE" },
    ],
  },
  {
    slug: "ui-ux-design",
    practice: "web-development",
    title: "UI/UX Design",
    answer:
      "Interface design decides whether people can actually use what you have built. The work is research, structure and interaction, not decoration applied at the end of a project.",
    seo: {
      title: "UI/UX Design",
      description:
        "Interface and experience design grounded in how people actually use a product: research, structure, prototyping and interaction.",
      primaryTopic: "UI and UX design",
      secondaryTopics: ["interface design", "user experience", "product design"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P1",
    whoFor: [
      "Products where users abandon a specific step and nobody knows why",
      "Websites that get traffic and produce very few enquiries",
      "Teams about to build something significant with no design phase planned",
    ],
    included: [
      "User research and task analysis",
      "Information architecture",
      "Wireframes and interactive prototypes",
      "Visual design and a reusable component system",
      "Accessibility built in rather than retrofitted",
    ],
    timeline: "4–8 weeks depending on the number of flows.",
    cta: { label: "Discuss your project", href: "/contact/", tier: "T4" },
    related: [
      { label: "Corporate Websites", href: "/services/corporate-websites/", type: "SERVICE" },
      { label: "Improve website conversion", href: "/use-cases/improve-website-conversion/", type: "USE CASE" },
    ],
  },
  {
    slug: "systems-integration",
    practice: "software-development",
    title: "Systems Integration",
    answer:
      "Systems integration connects the tools a business already runs so data moves between them automatically, instead of being carried across by a person with a spreadsheet.",
    seo: {
      title: "Systems Integration",
      description:
        "Connect the systems you already run (CRM, accounting, operations), so data moves automatically instead of being rekeyed.",
      primaryTopic: "systems integration",
      secondaryTopics: ["API integration", "data flow"],
      intent: "commercial",
    },
    audience: ["A6", "A7"],
    phase: "P2",
    whoFor: [
      "Businesses where the same record is typed into three systems",
      "Teams reconciling reports because two systems disagree",
      "Companies whose tools each work well alone and badly together",
    ],
    included: [
      "System and data audit",
      "Integration design with a defined source of truth",
      "Build, error handling and retry logic",
      "Monitoring and alerting",
    ],
    timeline: "4–10 weeks depending on how many systems are involved.",
    cta: { label: "Technical discovery call", href: "/contact/", tier: "T4" },
    related: [
      { label: "Workflow Automation", href: "/services/workflow-automation/", type: "SERVICE" },
      { label: "Custom Software", href: "/services/custom-software/", type: "SERVICE" },
    ],
  },

  /* ------------------------------------------------------------- AUTOMATE */
  {
    slug: "ai-chatbots",
    practice: "ai-automation",
    title: "AI Chatbots",
    answer:
      "An AI chatbot answers the questions your team answers most often, grounded in your own content so it does not invent answers, with a clear handover to a person the moment it is out of its depth.",
    seo: {
      title: "AI Chatbots",
      description:
        "Conversational AI grounded in your own content, with defined boundaries and a clear escalation path to a person.",
      primaryTopic: "AI chatbots",
      secondaryTopics: ["conversational AI", "customer support automation"],
      intent: "commercial",
    },
    audience: ["A6", "A1"],
    phase: "P1",
    whoFor: [
      "Teams answering the same twenty questions every day",
      "Businesses with enquiry volume concentrated into short windows",
      "Companies losing enquiries received outside working hours",
    ],
    included: [
      "Question analysis from real enquiry history",
      "Retrieval over your own documented answers, so responses are grounded",
      "Explicit boundaries: what it will not attempt to answer",
      "Human escalation path with full conversation context",
      "Monitoring, review and ongoing correction",
    ],
    timeline: "4–8 weeks to production.",
    outOfScope: [
      "Answering questions with regulatory or financial consequence without human review",
      "Deployments with no escalation route to a person",
    ],
    cta: { label: "Request an automation assessment", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "What stops it from making things up?",
        answer:
          "It answers from your own content rather than from general model knowledge, and it is built to say it does not know and hand over. A chatbot allowed to answer anything will eventually answer something wrong confidently.",
      },
    ],
    related: [
      { label: "AI Agents", href: "/services/ai-agents/", type: "SERVICE" },
      { label: "Automate customer support", href: "/use-cases/automate-customer-support/", type: "USE CASE" },
    ],
  },
  {
    slug: "sales-automation",
    practice: "ai-automation",
    title: "Sales Automation",
    answer:
      "Sales automation removes the delay between an enquiry arriving and someone responding to it: routing, acknowledgement, follow-up sequences and CRM updates that happen without anyone remembering to do them.",
    seo: {
      title: "Sales Automation",
      description:
        "Stop losing enquiries to slow follow-up. Automated routing, acknowledgement, sequencing and CRM updates.",
      primaryTopic: "sales automation",
      secondaryTopics: ["lead routing", "follow-up automation", "CRM"],
      intent: "commercial",
    },
    audience: ["A5"],
    phase: "P1",
    whoFor: [
      "Businesses where response time is measured in days",
      "Teams whose follow-up depends on someone remembering",
      "Companies with enquiries spread across several inboxes",
    ],
    included: [
      "Enquiry routing rules by source, sector and value",
      "Immediate acknowledgement with useful content, not an auto-reply",
      "Follow-up sequences with human handover points",
      "CRM integration and pipeline hygiene",
      "Response time reporting",
    ],
    timeline: "3–6 weeks.",
    cta: { label: "Get a lead-flow assessment", href: "/contact/", tier: "T3" },
    related: [
      { label: "Automate sales follow-up", href: "/use-cases/automate-sales-follow-up/", type: "USE CASE" },
      { label: "Workflow Automation", href: "/services/workflow-automation/", type: "SERVICE" },
    ],
  },
  {
    slug: "ai-consulting",
    practice: "ai-automation",
    title: "AI Consulting",
    answer:
      "AI consulting is the work of deciding where AI genuinely helps your business and where it would be an expensive answer to a problem a rule already solves, then sequencing the work so the first project is small enough to succeed.",
    seo: {
      title: "AI Consulting",
      description:
        "Work out where AI actually helps your business, what it would cost, and which project to do first.",
      primaryTopic: "AI consulting",
      secondaryTopics: ["AI strategy", "AI roadmap"],
      intent: "commercial",
    },
    audience: ["A2", "A7"],
    phase: "P1",
    whoFor: [
      "Leadership teams under pressure to have an AI answer",
      "Businesses that tried a pilot and got nowhere",
      "Companies unsure which processes are even candidates",
    ],
    included: [
      "Process assessment against genuine AI suitability",
      "Cost, risk and data-handling review",
      "A sequenced roadmap with a deliberately small first project",
      "Honest assessment of where AI is the wrong tool",
    ],
    timeline: "3–5 weeks.",
    outOfScope: ["Recommending AI where a rule engine would be correct and cheaper"],
    cta: { label: "Book a consultation", href: "/contact/", tier: "T4" },
    faqs: [
      {
        question: "What if the answer is that we should not use AI?",
        answer:
          "Then that is the recommendation, and we will say which parts of the process to fix instead. Most failed AI programmes we see started with the technology rather than the constraint.",
      },
    ],
    related: [
      { label: "AI Agents", href: "/services/ai-agents/", type: "SERVICE" },
      { label: "AI Stack", href: "/technologies/ai-stack/", type: "TECHNOLOGY" },
    ],
  },

  /* ----------------------------------------------------------------- GROW */
  {
    slug: "digital-strategy",
    practice: "digital-marketing",
    title: "Digital Strategy",
    answer:
      "Digital strategy is deciding what to do and, more usefully, what not to do: which channels matter for your buyers, what sequence the work should follow, and how you will know whether it worked.",
    seo: {
      title: "Digital Strategy",
      description:
        "Decide which channels matter, in what order, and how success will be measured, before committing budget.",
      primaryTopic: "digital strategy",
      secondaryTopics: ["growth planning", "channel strategy"],
      intent: "commercial",
    },
    audience: ["A2", "A3"],
    phase: "P1",
    whoFor: [
      "Businesses doing a bit of everything and measuring none of it",
      "Leadership teams with conflicting advice from several suppliers",
      "Companies about to commit significant budget with no plan",
    ],
    included: [
      "Market and competitor visibility analysis",
      "Buyer journey and channel mapping",
      "Prioritised roadmap with sequencing rationale",
      "Measurement framework tied to commercial outcomes",
    ],
    timeline: "4–6 weeks.",
    cta: { label: "Talk to a strategist", href: "/contact/", tier: "T4" },
    related: [
      { label: "Performance Marketing", href: "/services/performance-marketing/", type: "SERVICE" },
      { label: "Business Intelligence", href: "/services/business-intelligence/", type: "SERVICE" },
    ],
  },
  {
    slug: "performance-marketing",
    practice: "digital-marketing",
    title: "Performance Marketing",
    answer:
      "Performance marketing is buying demand where the numbers justify it: paid search and paid social managed against cost per qualified enquiry rather than clicks or impressions.",
    seo: {
      title: "Performance Marketing",
      description:
        "Paid search and paid social managed against cost per qualified enquiry, not impressions.",
      primaryTopic: "performance marketing",
      secondaryTopics: ["paid search", "paid social", "cost per lead"],
      intent: "commercial",
    },
    audience: ["A3", "A5"],
    phase: "P1",
    whoFor: [
      "Businesses whose paid spend has risen while enquiries have not",
      "Companies needing demand faster than organic can deliver",
      "Teams unable to say what a lead currently costs",
    ],
    included: [
      "Account and spend audit",
      "Campaign restructure around commercial intent",
      "Landing page and conversion work, because the click is only half of it",
      "Conversion tracking that survives ad blocking",
      "Reporting against cost per qualified enquiry",
    ],
    timeline: "2–4 weeks to restructure; performance change within the first month.",
    outOfScope: ["Spending budget on channels where your buyers demonstrably are not"],
    cta: { label: "Request a performance audit", href: "/contact/", tier: "T3" },
    related: [
      { label: "Conversion Rate Optimisation", href: "/services/conversion-rate-optimisation/", type: "SERVICE" },
      { label: "Generate more leads", href: "/use-cases/generate-more-leads/", type: "USE CASE" },
    ],
  },
  {
    slug: "conversion-rate-optimisation",
    practice: "digital-marketing",
    title: "Conversion Rate Optimisation",
    answer:
      "Conversion optimisation gets more from the traffic you already have. It is usually the cheapest available growth, because a small improvement compounds across every channel feeding the site.",
    seo: {
      title: "Conversion Rate Optimisation",
      description:
        "Get more enquiries from existing traffic: the cheapest growth available, and it compounds across every channel.",
      primaryTopic: "conversion rate optimisation",
      secondaryTopics: ["CRO", "conversion", "landing pages"],
      intent: "commercial",
    },
    audience: ["A3", "A5"],
    phase: "P1",
    whoFor: [
      "Sites with healthy traffic and disappointing enquiry volume",
      "Businesses about to increase spend on a site that converts poorly",
      "Teams with forms that are longer than they need to be",
    ],
    included: [
      "Behaviour and funnel analysis",
      "Friction audit across the enquiry path",
      "Prioritised change list with expected impact",
      "Implementation and measurement",
    ],
    timeline: "4–6 weeks for the first round of changes.",
    cta: { label: "Request a CRO assessment", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Should we do this before or after SEO?",
        answer:
          "Before, in almost every case. Conversion work is faster and cheaper, and sending more traffic to a page that underperforms just multiplies the waste.",
      },
    ],
    related: [
      { label: "Improve website conversion", href: "/use-cases/improve-website-conversion/", type: "USE CASE" },
      { label: "Search Experience Optimisation", href: "/services/search-experience-optimisation/", type: "SERVICE" },
    ],
  },
  {
    slug: "business-intelligence",
    practice: "data-analytics",
    title: "Business Intelligence",
    answer:
      "Business intelligence brings the numbers scattered across your systems into one place, so leadership can answer a question in a minute instead of waiting three days for someone to assemble a spreadsheet.",
    seo: {
      title: "Business Intelligence",
      description:
        "Bring scattered business data into one reliable view: dashboards and reporting leadership can actually act on.",
      primaryTopic: "business intelligence",
      secondaryTopics: ["dashboards", "reporting", "data"],
      intent: "commercial",
    },
    audience: ["A2", "A6"],
    phase: "P2",
    whoFor: [
      "Leadership relying on a monthly spreadsheet somebody builds by hand",
      "Businesses where two systems give two different answers",
      "Companies making budget decisions on incomplete data",
    ],
    included: [
      "Data source audit and definition of a single source of truth",
      "Metric definitions agreed before anything is built",
      "Dashboards designed for decisions rather than for display",
      "Automated refresh and reliability monitoring",
    ],
    timeline: "6–10 weeks.",
    cta: { label: "Request an assessment", href: "/contact/", tier: "T3" },
    related: [
      { label: "Analytics Implementation", href: "/services/analytics-implementation/", type: "SERVICE" },
      { label: "Systems Integration", href: "/services/systems-integration/", type: "SERVICE" },
    ],
  },
  {
    slug: "analytics-implementation",
    practice: "data-analytics",
    title: "Analytics Implementation",
    answer:
      "Analytics implementation is the unglamorous work of making your measurement trustworthy: correct tracking, sensible event design, and conversion data that survives ad blockers and browser restrictions.",
    seo: {
      title: "Analytics Implementation",
      description:
        "Tracking you can trust: correct implementation, sensible events, and conversion data that survives ad blocking.",
      primaryTopic: "analytics implementation",
      secondaryTopics: ["GA4", "conversion tracking", "measurement"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P1",
    whoFor: [
      "Teams who suspect their numbers are wrong and cannot prove otherwise",
      "Businesses whose reported conversions do not match actual enquiries",
      "Companies about to make budget decisions on unverified data",
    ],
    included: [
      "Tracking audit against actual site behaviour",
      "Event and conversion design tied to commercial outcomes",
      "Server-side tagging where it materially improves accuracy",
      "Documentation so the setup remains maintainable",
    ],
    timeline: "2–4 weeks.",
    cta: { label: "Request an assessment", href: "/contact/", tier: "T3" },
    related: [
      { label: "Business Intelligence", href: "/services/business-intelligence/", type: "SERVICE" },
      { label: "Conversion Rate Optimisation", href: "/services/conversion-rate-optimisation/", type: "SERVICE" },
    ],
  },
];
