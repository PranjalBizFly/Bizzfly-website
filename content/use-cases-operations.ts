/**
 * Use cases — operations, systems and AI adoption.
 *
 * Each starts from a problem a business actually describes, in the words they
 * describe it in, and works back to what would have to change. No metrics
 * appear here, because we have no verified client figures to quote.
 */

import type { UseCase } from "@/types/content";

export const operationsUseCases: UseCase[] = [
  {
    slug: "connect-business-systems",
    title: "Connect business systems",
    layout: "workflow-led",
    diagram: "system-architecture",
    answer:
      "When systems do not talk to each other, people become the integration. The cost appears as rekeying, as reports that disagree, and as decisions made on numbers nobody fully trusts — not as a line in any budget.",
    whyItMatters:
      "Disconnected systems cap how much work a business can handle without hiring, and quietly erode confidence in its own reporting.",
    symptoms: [
      "The same customer record exists, differently, in three systems",
      "Someone exports a spreadsheet weekly so two teams can agree on numbers",
      "Reports from two systems disagree and nobody can say which is right",
      "A new tool cannot be adopted because it would not connect to anything",
    ],
    rootCauses: [
      "Tools bought per team, each solving one problem in isolation",
      "No declared source of truth for any given record",
      "Integrations built once as one-way exports and never maintained",
      "Systems chosen without asking whether they offer an API at all",
    ],
    approach: [
      {
        index: 1,
        title: "Establish the source of truth",
        description:
          "For each record that matters — customer, order, invoice — decide which system owns it. Most integration disputes are really this question, unanswered.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Map the real data flows",
        description:
          "Including the manual ones. A spreadsheet emailed every Friday is an integration; it just has a person inside it.",
        duration: "Weeks 1–3",
      },
      {
        index: 3,
        title: "Connect the highest-cost flow first",
        description:
          "One integration in production, with error handling and reconciliation, rather than a platform programme that shows nothing for months.",
        duration: "Weeks 3–8",
      },
      {
        index: 4,
        title: "Make failure visible",
        description:
          "Integrations fail quietly by default. Alerting, retries and a reconciliation path decide whether a bad hour becomes a bad quarter.",
        duration: "Concurrent",
      },
    ],
    targetState:
      "Each record has one owning system, data moves between systems without a person copying it, and failures surface immediately rather than being discovered in a month-end reconciliation.",
    realisticTimeline:
      "Four to ten weeks for a first integration in production, depending on whether the systems involved offer usable APIs.",
    services: ["systems-integration", "workflow-automation", "custom-software"],
    industries: ["manufacturing", "professional-services"],
    seo: {
      title: "Connect Business Systems",
      description:
        "When systems do not talk, people become the integration. Symptoms, root causes and how to connect the highest-cost flow first.",
      primaryTopic: "connect business systems",
      secondaryTopics: ["systems integration", "data flow", "API integration"],
      intent: "commercial",
    },
    audience: ["A6", "A7", "A2"],
    phase: "P1",
    cta: {
      label: "Talk through your systems",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "What if our systems have no API?",
        answer:
          "There are still options — scheduled file exchange, database-level integration, or driving the interface — but each is more fragile and needs a named owner and maintenance budget. Treat it as a bridge while a better route is found.",
      },
      {
        question: "Should we replace our systems instead of integrating them?",
        answer:
          "Rarely as a first step. Replacement is slower, riskier and more expensive than connecting what exists. Integrate first; replacement becomes a much better-informed decision afterwards.",
      },
    ],
    related: [
      {
        label: "Systems Integration",
        href: "/services/systems-integration/",
        type: "SERVICE",
      },
      { label: "API", href: "/resources/what-is-an-api/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "modernise-legacy-processes",
    title: "Modernise legacy processes",
    layout: "problem-solution",
    diagram: "process-transformation",
    answer:
      "Legacy processes are rarely kept because anyone prefers them. They survive because nobody can safely say which steps still matter — so the whole thing is preserved, including the parts that stopped being necessary years ago.",
    whyItMatters:
      "Processes that cannot be changed become the ceiling on everything built on top of them, including any new system a business buys.",
    symptoms: [
      "Steps exist that nobody can explain the original reason for",
      "New staff take months to learn a process rather than days",
      "Changing anything requires one specific long-serving person",
      "Software has been bought to sit alongside the process rather than replace it",
    ],
    rootCauses: [
      "Institutional knowledge held by people rather than written down",
      "Controls added after an incident and never reviewed once the risk changed",
      "Fear that removing a step will break something unknown downstream",
      "No owner with authority to change the process end to end",
    ],
    approach: [
      {
        index: 1,
        title: "Document what actually happens",
        description:
          "Observed, not described. The documented process and the real one differ in almost every organisation, and the difference is where the cost sits.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Test each step against a current reason",
        description:
          "For every step, name the risk it manages or the value it adds today. Steps that fail this are candidates for removal before anything is automated.",
        duration: "Weeks 2–3",
      },
      {
        index: 3,
        title: "Redesign, then build",
        description:
          "Simplify first. Automating a process before simplifying it preserves every unnecessary step and makes it harder to remove later.",
        duration: "Weeks 3–6",
      },
      {
        index: 4,
        title: "Transition with a fallback",
        description:
          "Run the new path alongside the old for a defined period, with a way back. Legacy processes usually carry edge cases nobody remembers until they occur.",
        duration: "Weeks 6–10",
      },
    ],
    targetState:
      "The process has fewer steps than it started with, each remaining step has a stated purpose, and it can be changed by more than one person without institutional risk.",
    realisticTimeline:
      "Six to twelve weeks for a single process, with most of the early time spent on understanding rather than building.",
    services: ["workflow-automation", "custom-software", "systems-integration"],
    industries: ["manufacturing", "professional-services"],
    seo: {
      title: "Modernise Legacy Processes",
      description:
        "Legacy processes survive because nobody can say which steps still matter. How to test each step against a current reason before automating anything.",
      primaryTopic: "modernise legacy processes",
      secondaryTopics: ["process improvement", "digital transformation"],
      intent: "commercial",
    },
    audience: ["A6", "A2"],
    phase: "P1",
    cta: {
      label: "Talk through a process",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "How do we know which steps can be removed?",
        answer:
          "Ask what risk each step manages or what value it adds today, not why it was introduced. Steps whose original reason has gone are candidates — verified with whoever owns the downstream outcome before removal.",
      },
      {
        question: "Is this a technology project?",
        answer:
          "Mostly not. The majority of the work is understanding and simplification. Technology implements the result, and applying it first tends to preserve the problem in a faster form.",
      },
    ],
    related: [
      {
        label: "Workflow Automation",
        href: "/services/workflow-automation/",
        type: "SERVICE",
      },
      {
        label: "How to plan a digital transformation project",
        href: "/resources/how-to-plan-a-digital-transformation-project/",
        type: "DECISION",
      },
    ],
  },
  {
    slug: "introduce-ai-into-operations",
    title: "Introduce AI into operations",
    layout: "problem-solution",
    diagram: "ai-workflow",
    answer:
      "Most AI initiatives stall for the same two reasons: the project was defined by a technology rather than a task, and the data the task needed was not actually accessible. Both are avoidable by choosing differently at the start.",
    whyItMatters:
      "A first AI project that reaches production teaches an organisation more than a year of evaluation, and makes the second one cheaper.",
    symptoms: [
      "A pilot was built, demonstrated well and never reached production",
      "People spend hours reading and routing unstructured messages or documents",
      "Answers to routine questions live in documents nobody can search quickly",
      "There is board pressure to 'use AI' with no specific task attached",
    ],
    rootCauses: [
      "The initiative was scoped around a capability rather than a repeated task",
      "The information the task depends on is scattered or inaccessible",
      "No decision was made about what happens when the system is unsure",
      "Nobody owned the outcome once the demonstration was over",
    ],
    approach: [
      {
        index: 1,
        title: "Choose a task, not a technology",
        description:
          "A repeated task with unstructured input, a measurable before-and-after, and errors that are visible and cheap to correct.",
        duration: "Week 1",
      },
      {
        index: 2,
        title: "Check the data honestly",
        description:
          "Does the material the task needs exist, is it accessible, and is it consistent? This is where most stalled initiatives actually stopped.",
        duration: "Weeks 1–2",
      },
      {
        index: 3,
        title: "Ground the system in your own content",
        description:
          "Retrieval over your documents rather than reliance on model memory, so answers can be traced to a source and update when the source does.",
        duration: "Weeks 2–6",
      },
      {
        index: 4,
        title: "Define the confidence boundary",
        description:
          "Where the system stops and hands to a person, carrying full context. Decided during design, because a system that answers everything answers wrongly at the edges.",
        duration: "Concurrent",
      },
    ],
    targetState:
      "One task runs in production with grounded answers, a visible source, and a defined escalation path — and the organisation knows from evidence whether the second project is worth starting.",
    realisticTimeline:
      "Six to twelve weeks to a first production use case, with data access usually the longest pole rather than the model work.",
    services: ["ai-consulting", "ai-agents", "workflow-automation"],
    seo: {
      title: "Introduce AI Into Operations",
      description:
        "Most AI pilots stall on scoping and data access. How to choose a first task, ground it in your own content and define the escalation boundary.",
      primaryTopic: "introduce AI into operations",
      secondaryTopics: ["AI adoption", "AI agents", "operations"],
      intent: "commercial",
    },
    audience: ["A2", "A6", "A7"],
    phase: "P1",
    cta: {
      label: "Talk through a first use case",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "Why did our AI pilot never reach production?",
        answer:
          "Usually because it was scoped around a capability rather than a task, or because the data it needed was not accessible outside the demo. Both are scoping problems rather than technology ones.",
      },
      {
        question: "Do we need a data platform first?",
        answer:
          "No. You need the specific data the first task requires to be accessible and reasonably consistent. That is a much smaller undertaking than a data programme, and it can be done project by project.",
      },
    ],
    related: [
      { label: "AI Consulting", href: "/services/ai-consulting/", type: "SERVICE" },
      {
        label: "When should a business invest in AI?",
        href: "/resources/when-should-a-business-invest-in-ai/",
        type: "DECISION",
      },
    ],
  },
  {
    slug: "build-a-custom-business-platform",
    title: "Build a custom business platform",
    layout: "outcome-led",
    diagram: "system-architecture",
    answer:
      "A custom platform is worth building when the way you operate is genuinely part of your advantage and no product supports it without compromise. It is rarely worth building because existing tools are merely irritating.",
    whyItMatters:
      "Building the wrong thing is expensive twice: once to build it, and again in the years it must be maintained by someone.",
    symptoms: [
      "The core process is run in spreadsheets because no product fits it",
      "Several subscriptions are bridged by manual re-entry between them",
      "Product limitations are being worked around rather than used",
      "Onboarding a customer takes far longer than the work itself justifies",
    ],
    rootCauses: [
      "An operating model that genuinely differs from the category's assumptions",
      "Tools selected individually, never as a system",
      "Growth past the point where manual coordination worked",
      "A process that is a real differentiator being forced into a generic shape",
    ],
    approach: [
      {
        index: 1,
        title: "Test the build decision honestly",
        description:
          "Confirm the process is a differentiator and that no product fits without compromising it. If buying works, we will say so.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Define the smallest useful system",
        description:
          "The narrowest version that replaces a real part of the current workaround, in production, rather than a full specification built at once.",
        duration: "Weeks 2–4",
      },
      {
        index: 3,
        title: "Build against the real workflow",
        description:
          "Delivered in increments people actually use, so the requirements are corrected by evidence rather than by review meetings.",
        duration: "Weeks 4–16",
      },
      {
        index: 4,
        title: "Hand over ownership",
        description:
          "Code in your repositories, infrastructure in your accounts, documentation written for someone who was not there.",
        duration: "Ongoing",
      },
    ],
    targetState:
      "The process that differentiates the business runs in a system built for it, your team can operate and extend it, and the manual bridges between tools are gone.",
    realisticTimeline:
      "Three to six months to a first production version for a focused scope. Anything promising less is describing a prototype.",
    services: ["custom-software", "web-applications", "systems-integration"],
    seo: {
      title: "Build a Custom Business Platform",
      description:
        "Build when the process is a genuine differentiator no product supports. How to test that honestly and start with the smallest useful system.",
      primaryTopic: "custom business platform",
      secondaryTopics: ["custom software", "build vs buy"],
      intent: "commercial",
    },
    audience: ["A2", "A7"],
    phase: "P1",
    cta: {
      label: "Talk through the decision",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "How do we avoid building the wrong thing?",
        answer:
          "Deliver in increments people use, rather than specifying everything up front. Requirements written before anyone has used a working version are the least reliable input to a build.",
      },
      {
        question: "What happens if we outgrow it?",
        answer:
          "A well-built system is extended rather than replaced, which is why ownership, documentation and testing matter more than the initial feature list.",
      },
    ],
    related: [
      {
        label: "Custom Software Development",
        href: "/services/custom-software/",
        type: "SERVICE",
      },
      {
        label: "Custom software vs off-the-shelf",
        href: "/resources/custom-software-vs-off-the-shelf/",
        type: "COMPARISON",
      },
    ],
  },
  {
    slug: "improve-digital-presence",
    title: "Improve digital presence",
    layout: "problem-solution",
    diagram: "content-structure",
    answer:
      "Digital presence is what a buyer finds when they check you out — the website, the search results, the profiles, the answers an assistant gives about you. It is usually assembled by accident and rarely reviewed as a whole.",
    whyItMatters:
      "Most buyers verify a business before contacting it. What they find during that check decides whether the enquiry happens at all.",
    symptoms: [
      "Searching the company name returns outdated or inconsistent information",
      "The website describes the business differently from every other profile",
      "An AI assistant asked about the company gives a vague or wrong answer",
      "Prospects arrive already unsure whether the business is the right size for them",
    ],
    rootCauses: [
      "Profiles created over years by different people with no shared source",
      "A website written for the business rather than for someone assessing it",
      "No canonical description of what the company does and who it serves",
      "Nobody owning the presence as a whole rather than channel by channel",
    ],
    approach: [
      {
        index: 1,
        title: "Audit what a buyer actually finds",
        description:
          "Search, profiles, third-party listings and AI assistants. Recorded as found, not as intended.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Agree one canonical description",
        description:
          "What the business does, who it is for, where it operates. One version that everything else is corrected to match.",
        duration: "Week 2",
      },
      {
        index: 3,
        title: "Correct the site and the profiles",
        description:
          "Consistent details everywhere, structured data referencing one organisation entity, and pages that answer what a buyer is checking.",
        duration: "Weeks 3–6",
      },
      {
        index: 4,
        title: "Give it an owner",
        description:
          "Presence drifts because no one is responsible for it. A review cadence and a single owner is what keeps it corrected.",
        duration: "Ongoing",
      },
    ],
    targetState:
      "A buyer checking the business finds consistent, current and specific information wherever they look, including in AI-generated answers about the company.",
    realisticTimeline:
      "Four to eight weeks to correct and align, then a light quarterly review to stop it drifting again.",
    services: ["digital-strategy", "corporate-websites", "google-business-profile"],
    seo: {
      title: "Improve Digital Presence",
      description:
        "Digital presence is what a buyer finds when they check you out. How to audit it as a whole, agree one canonical description and keep it consistent.",
      primaryTopic: "improve digital presence",
      secondaryTopics: ["brand consistency", "online presence"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P1",
    cta: {
      label: "Talk through your presence",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "Why does an AI assistant describe our business wrongly?",
        answer:
          "Usually because the sources it can reach disagree, or are thin. Inconsistent details across your site and external profiles leave a system to choose between competing facts, and it may choose badly.",
      },
      {
        question: "Is this the same as branding?",
        answer:
          "No. Branding is how you choose to present yourself. Presence is what actually exists in the places buyers look, which is often several years out of date with the brand.",
      },
    ],
    related: [
      {
        label: "Entity optimisation",
        href: "/resources/what-is-entity-optimisation/",
        type: "GLOSSARY",
      },
      {
        label: "Digital Strategy",
        href: "/services/digital-strategy/",
        type: "SERVICE",
      },
    ],
  },
  {
    slug: "build-scalable-digital-infrastructure",
    title: "Build scalable digital infrastructure",
    layout: "workflow-led",
    diagram: "system-architecture",
    answer:
      "Infrastructure becomes a constraint before anyone calls it one. It shows up as releases that are risky, changes that take longer each quarter, and incidents nobody can diagnose quickly — long before it shows up as downtime.",
    whyItMatters:
      "Every commercial plan assumes the systems underneath can absorb it. When they cannot, the plan fails for reasons that look unrelated.",
    symptoms: [
      "Deployments are infrequent and treated as events",
      "Nobody is confident what is running in production",
      "Incidents take hours to diagnose because there is little visibility",
      "Adding a feature increasingly requires touching unrelated parts of the system",
    ],
    rootCauses: [
      "Environments configured by hand and drifted apart over time",
      "No automated testing, so every release carries unquantified risk",
      "Monitoring added after incidents rather than designed in",
      "Architecture that made sense at a tenth of the current load",
    ],
    approach: [
      {
        index: 1,
        title: "Establish what is actually running",
        description:
          "Environments, dependencies, versions and access. Surprisingly often this inventory does not exist in one place.",
        duration: "Weeks 1–2",
      },
      {
        index: 2,
        title: "Make releases boring",
        description:
          "Automated build, test and deploy so shipping is routine rather than an event. This single change usually returns more than any other.",
        duration: "Weeks 2–6",
      },
      {
        index: 3,
        title: "Add visibility before capacity",
        description:
          "Logging, metrics and alerting first. Scaling a system you cannot observe means guessing at which part to scale.",
        duration: "Weeks 3–8",
      },
      {
        index: 4,
        title: "Address the real bottleneck",
        description:
          "Measured, not assumed. The constraint is frequently a single query or an unindexed table rather than the architecture everyone suspected.",
        duration: "Weeks 6–12",
      },
    ],
    targetState:
      "Releases are routine and reversible, the team can see what production is doing, and capacity decisions are made from measurement rather than assumption.",
    realisticTimeline:
      "Eight to sixteen weeks for meaningful change, sequenced so each stage is useful on its own.",
    services: ["custom-software", "web-applications", "systems-integration"],
    seo: {
      title: "Build Scalable Digital Infrastructure",
      description:
        "Infrastructure constrains before it fails. Make releases boring, add visibility before capacity, and fix the measured bottleneck.",
      primaryTopic: "scalable digital infrastructure",
      secondaryTopics: ["cloud", "deployment", "reliability"],
      intent: "commercial",
    },
    audience: ["A7", "A2"],
    phase: "P1",
    cta: {
      label: "Talk through your stack",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "Do we need to move to the cloud?",
        answer:
          "Not necessarily. Cloud helps with elasticity and managed services, but it does not fix manual deployment, missing tests or absent monitoring — and those are usually the actual constraint.",
      },
      {
        question: "What returns the most first?",
        answer:
          "Automated, repeatable deployment. It reduces release risk, shortens the path from change to production, and makes every subsequent improvement cheaper to ship.",
      },
    ],
    related: [
      {
        label: "Cloud & Hosting",
        href: "/technologies/cloud-and-hosting/",
        type: "TECHNOLOGY",
      },
      {
        label: "Technical debt",
        href: "/resources/what-is-technical-debt/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "improve-customer-experience",
    title: "Improve customer experience",
    layout: "problem-solution",
    answer:
      "Customer experience problems are usually operational rather than attitudinal. People are rarely unhelpful on purpose; they are working without the information, tools or authority the moment required.",
    whyItMatters:
      "Experience decides retention and referral, and both are cheaper sources of growth than acquisition.",
    symptoms: [
      "Customers repeat information they have already given",
      "Response times vary widely depending on who picks the request up",
      "Complaints arrive about the same handful of moments repeatedly",
      "Support and sales hold different versions of the same customer's history",
    ],
    rootCauses: [
      "Customer history fragmented across systems that do not share it",
      "No defined ownership for a request once it crosses a team boundary",
      "Front-line staff without authority to resolve common exceptions",
      "Processes designed around internal structure rather than the customer's journey",
    ],
    approach: [
      {
        index: 1,
        title: "Map the journey as the customer experiences it",
        description:
          "Including the handovers between teams, which is where most of the damage happens and where no one owns the outcome.",
        duration: "Weeks 1–3",
      },
      {
        index: 2,
        title: "Find the repeated failure moments",
        description:
          "From complaints, support tickets and recordings — not from a workshop. The same few moments usually account for most dissatisfaction.",
        duration: "Weeks 2–4",
      },
      {
        index: 3,
        title: "Give people the context and the authority",
        description:
          "One view of the customer at the moment of contact, and clear permission to resolve common exceptions without escalating.",
        duration: "Weeks 4–10",
      },
      {
        index: 4,
        title: "Automate the waiting, not the judgement",
        description:
          "Acknowledgements, status updates and routing can be automated. The conversation that resolves a difficult case should not be.",
        duration: "Weeks 6–12",
      },
    ],
    targetState:
      "A customer does not repeat themselves, knows where their request stands, and reaches someone who has both the context and the authority to resolve it.",
    realisticTimeline:
      "Six to twelve weeks to change the highest-volume failure moments, longer for changes that cross several systems.",
    services: ["ai-chatbots", "workflow-automation", "systems-integration"],
    industries: ["professional-services", "education"],
    seo: {
      title: "Improve Customer Experience",
      description:
        "Experience problems are usually operational. Map the journey including handovers, find repeated failure moments, and automate waiting rather than judgement.",
      primaryTopic: "improve customer experience",
      secondaryTopics: ["customer service", "CX", "support automation"],
      intent: "commercial",
    },
    audience: ["A6", "A5", "A2"],
    phase: "P1",
    cta: {
      label: "Talk through the journey",
      href: "/contact/",
      tier: "T3",
      note: "30 minutes. No deck.",
    },
    faqs: [
      {
        question: "Will a chatbot improve customer experience?",
        answer:
          "Only for questions it can genuinely answer, with a fast route to a person for everything else. A bot that cannot resolve the request and will not hand over makes the experience measurably worse.",
      },
      {
        question: "Where should we start?",
        answer:
          "With the handovers between teams. That is where context is lost and where nobody owns the outcome, and it is usually the cheapest place to make a visible difference.",
      },
    ],
    related: [
      {
        label: "Automate customer support",
        href: "/use-cases/automate-customer-support/",
        type: "USE CASE",
      },
      { label: "AI Chatbots", href: "/services/ai-chatbots/", type: "SERVICE" },
    ],
  },
];
