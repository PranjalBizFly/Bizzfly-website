/**
 * Additional use cases referenced from services and the homepage.
 * Same problem-first shape as content/use-cases.ts.
 */

import type { UseCase } from "@/types/content";

export const moreUseCases: UseCase[] = [
  {
    slug: "automate-sales-follow-up",
    title: "Automate sales follow-up",
    answer:
      "Most lost enquiries are not lost to a better competitor. They are lost to a faster one. When a reply takes two days, the buyer has already spoken to someone else.",
    symptoms: [
      "Enquiries sit in a shared inbox until somebody notices",
      "Follow-up happens when the team remembers, not on a schedule",
      "Nobody can say how long a typical reply actually takes",
      "Leads from different channels never reach the same place",
    ],
    rootCauses: [
      "No routing rules, so every enquiry waits for a human decision",
      "Follow-up depends on individual diligence rather than a system",
      "CRM data entered manually, so it is always behind",
      "Peak demand arrives exactly when the team has least capacity",
    ],
    approach: [
      {
        index: 1,
        title: "Measure the real response time",
        description:
          "From enquiry received to first human reply, across every channel. It is almost always worse than the team believes.",
        duration: "Week 1",
      },
      {
        index: 2,
        title: "Route automatically",
        description:
          "Rules by source, sector and value, so an enquiry reaches the right person without anyone triaging an inbox.",
        duration: "Weeks 2–3",
      },
      {
        index: 3,
        title: "Acknowledge immediately, usefully",
        description:
          "An instant reply that answers something, not an auto-responder that says we have received your message.",
        duration: "Weeks 3–4",
      },
      {
        index: 4,
        title: "Sequence the follow-up",
        description:
          "Scheduled follow-up with clear handover points where a person takes over.",
        duration: "Weeks 4–6",
      },
    ],
    targetState:
      "Every enquiry acknowledged within minutes, routed to the right person, and followed up on a schedule that does not depend on anyone remembering.",
    realisticTimeline:
      "Three to six weeks. Response-time improvement is visible immediately; conversion impact takes a full sales cycle to read.",
    services: ["sales-automation", "workflow-automation"],
    industries: ["real-estate", "education"],
    seo: {
      title: "Automate sales follow-up",
      description:
        "Stop losing enquiries to slow response. Automated routing, immediate acknowledgement and scheduled follow-up.",
      primaryTopic: "sales follow-up automation",
      secondaryTopics: ["lead response time", "CRM automation"],
      intent: "commercial",
    },
    audience: ["A5"],
    phase: "P1",
    cta: { label: "Get a lead-flow assessment", href: "/contact/", tier: "T3" },
    related: [
      { label: "Sales Automation", href: "/services/sales-automation/", type: "SERVICE" },
      { label: "Generate more leads", href: "/use-cases/generate-more-leads/", type: "USE CASE" },
    ],
  },
  {
    slug: "automate-customer-support",
    title: "Automate customer support",
    answer:
      "A large share of support volume is the same handful of questions asked repeatedly. Handling those automatically frees the team for the enquiries that actually need judgement.",
    symptoms: [
      "The same questions consume most of the team's day",
      "Response times stretch during predictable peaks",
      "Enquiries outside working hours wait until morning",
      "Good people spend their time on work that does not need them",
    ],
    rootCauses: [
      "Answers exist but are scattered and hard for customers to find",
      "No triage between routine questions and genuine problems",
      "Volume concentrated into windows the team cannot staff for",
    ],
    approach: [
      {
        index: 1,
        title: "Analyse real enquiry history",
        description:
          "Which questions, how often, and how much time each consumes. This decides what is worth automating and what is not.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Ground answers in your own content",
        description:
          "Retrieval over your documented answers so responses are accurate and traceable, rather than generated from general knowledge.",
        duration: "Weeks 2–5",
      },
      {
        index: 3,
        title: "Define the boundary",
        description:
          "What the system will not attempt, and how it hands over to a person with full context. Decided before launch, not after an incident.",
        duration: "Concurrent",
      },
      {
        index: 4,
        title: "Monitor and correct",
        description:
          "Review what it answered and how, and correct the source content when it gets something wrong.",
        duration: "Ongoing",
      },
    ],
    targetState:
      "Routine questions answered instantly and accurately, everything else reaching a person faster because the queue is shorter.",
    realisticTimeline: "Four to eight weeks to production.",
    services: ["ai-chatbots", "ai-agents"],
    industries: ["education", "professional-services"],
    seo: {
      title: "Automate customer support",
      description:
        "Handle repetitive support questions automatically, grounded in your own content, with a clear escalation path to a person.",
      primaryTopic: "customer support automation",
      secondaryTopics: ["AI chatbots", "support deflection"],
      intent: "commercial",
    },
    audience: ["A6"],
    phase: "P1",
    cta: { label: "Request an automation assessment", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Will customers be annoyed by a bot?",
        answer:
          "They are annoyed by a bot that traps them in a loop and will not let them reach a person. Handled properly — accurate answers, an obvious route to a human, no pretence that it is a person — most customers prefer an instant answer to a queue.",
      },
    ],
    related: [
      { label: "AI Chatbots", href: "/services/ai-chatbots/", type: "SERVICE" },
      { label: "Reduce manual work", href: "/use-cases/reduce-manual-work/", type: "USE CASE" },
    ],
  },
  {
    slug: "improve-website-conversion",
    title: "Improve website conversion",
    answer:
      "Improving conversion is usually the cheapest growth available. A modest improvement compounds across every channel already sending traffic to the site, without spending more to acquire anyone.",
    symptoms: [
      "Traffic is healthy and enquiries are not",
      "Visitors reach the contact page and do not complete the form",
      "Paid campaigns look efficient on clicks and expensive on leads",
      "Nobody can say which page produces the enquiries you do get",
    ],
    rootCauses: [
      "Pages that describe the company rather than answer the visitor",
      "Forms asking for more than is needed to start a conversation",
      "No obvious next step, or several competing ones",
      "Measurement too weak to tell what is working",
    ],
    approach: [
      {
        index: 1,
        title: "Find where people leave",
        description:
          "Funnel and behaviour analysis to locate the actual drop-off rather than the assumed one.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Remove friction",
        description:
          "Shorter forms, clearer next steps, faster pages, and content that answers the question the visitor arrived with.",
        duration: "Weeks 2–4",
      },
      {
        index: 3,
        title: "Measure properly",
        description:
          "Conversion tracking tied back to the page and channel that produced it, so the next decision is informed.",
        duration: "Weeks 3–5",
      },
    ],
    targetState:
      "A higher share of existing visitors becoming enquiries, and enough measurement to know which pages are responsible.",
    realisticTimeline:
      "Four to six weeks for the first round. Conversion work usually shows results faster than acquisition work.",
    services: ["conversion-rate-optimisation", "ui-ux-design", "search-experience-optimisation"],
    seo: {
      title: "Improve website conversion",
      description:
        "Turn more of your existing traffic into enquiries — the cheapest growth available, and it compounds across every channel.",
      primaryTopic: "website conversion improvement",
      secondaryTopics: ["conversion rate", "CRO"],
      intent: "commercial",
    },
    audience: ["A3", "A5"],
    phase: "P1",
    cta: { label: "Request a CRO assessment", href: "/contact/", tier: "T3" },
    related: [
      { label: "Conversion Optimisation", href: "/services/conversion-rate-optimisation/", type: "SERVICE" },
      { label: "UI/UX Design", href: "/services/ui-ux-design/", type: "SERVICE" },
    ],
  },
  {
    slug: "rank-in-local-search",
    title: "Rank in local search",
    answer:
      "Local search decides who gets called when someone nearby needs what you sell. It is won through consistent business information, a complete profile, and genuine local relevance rather than volume of content.",
    symptoms: [
      "Competitors appear in the map results and you do not",
      "Your listing shows outdated hours, categories or contact details",
      "Customers say they could not find you online",
      "Multiple locations with inconsistent information",
    ],
    rootCauses: [
      "Business name, address and phone number differing across sources",
      "Incomplete or wrongly categorised business profile",
      "No local relevance signals on the website itself",
      "Reviews unmanaged and unanswered",
    ],
    approach: [
      {
        index: 1,
        title: "Fix the business information",
        description:
          "One consistent name, address and phone number everywhere. Search engines cross-check these, and disagreement costs visibility.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Complete and categorise the profile",
        description:
          "Categories, attributes, services and photos, chosen for how people actually search rather than how you describe yourself.",
        duration: "Weeks 2–3",
      },
      {
        index: 3,
        title: "Build local relevance on the site",
        description:
          "Location content that is genuinely useful, plus structured data that confirms where you operate.",
        duration: "Weeks 3–6",
      },
    ],
    targetState:
      "Appearing consistently for local searches in your category, with information customers can act on.",
    realisticTimeline:
      "Profile work shows within weeks. Local ranking movement typically takes two to three months.",
    services: ["google-business-profile", "seo"],
    industries: ["professional-services", "real-estate"],
    seo: {
      title: "Rank in local search",
      description:
        "Be found by nearby customers — consistent business information, a complete profile, and genuine local relevance.",
      primaryTopic: "local search ranking",
      secondaryTopics: ["local SEO", "Google Maps", "map pack"],
      intent: "commercial",
    },
    audience: ["A1"],
    phase: "P1",
    cta: { label: "Get a local visibility audit", href: "/contact/", tier: "T3" },
    related: [
      { label: "Google Business Profile", href: "/services/google-business-profile/", type: "SERVICE" },
      { label: "SEO Services", href: "/services/seo/", type: "SERVICE" },
    ],
  },
  {
    slug: "improve-operational-efficiency",
    title: "Improve operational efficiency",
    answer:
      "Operational drag rarely shows up as a line item. It shows up as capable people spending their week on work a system should be doing, and as a business that cannot grow without hiring.",
    symptoms: [
      "Every growth conversation ends at headcount",
      "Processes stop when one particular person is unavailable",
      "Reporting takes days to assemble and is stale on arrival",
      "The same information is maintained in several places",
    ],
    rootCauses: [
      "Systems bridged by people rather than by integration",
      "Processes that live in individual habit rather than in a system",
      "Tools bought per team, connected to nothing",
      "No end-to-end owner for the process",
    ],
    approach: [
      {
        index: 1,
        title: "Map where the time goes",
        description:
          "Follow the real process, not the documented one. The expensive steps are rarely where people expect them.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Automate the costliest repetitive step",
        description:
          "One process end to end and in production, rather than a platform rollout that shows nothing for a year.",
        duration: "Weeks 3–8",
      },
      {
        index: 3,
        title: "Connect the systems underneath",
        description:
          "Integration so data stops being carried between tools by a person with a spreadsheet.",
        duration: "Weeks 6–12",
      },
      {
        index: 4,
        title: "Make performance visible",
        description:
          "Reporting that updates itself, so the next constraint is obvious rather than argued about.",
        duration: "Weeks 10–14",
      },
    ],
    targetState:
      "Capacity that grows without proportional headcount, and a team spending its time on work that needs judgement.",
    realisticTimeline:
      "First process in production within four to eight weeks; compounding benefit over two to three quarters.",
    services: ["workflow-automation", "systems-integration", "business-intelligence"],
    industries: ["manufacturing", "real-estate"],
    seo: {
      title: "Improve operational efficiency",
      description:
        "Grow capacity without proportional headcount — automate the costly repetitive work and connect the systems underneath.",
      primaryTopic: "operational efficiency",
      secondaryTopics: ["process automation", "systems integration"],
      intent: "commercial",
    },
    audience: ["A6", "A2"],
    phase: "P1",
    cta: { label: "Request an automation assessment", href: "/contact/", tier: "T3" },
    related: [
      { label: "Workflow Automation", href: "/services/workflow-automation/", type: "SERVICE" },
      { label: "Reduce manual work", href: "/use-cases/reduce-manual-work/", type: "USE CASE" },
    ],
  },
];
