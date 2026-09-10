/**
 * Delivery and operations use cases.
 *
 * These share a shape: a process that worked at a smaller size and now costs
 * more than anyone has measured. Each says what should be simplified or
 * stopped before anything is built, because the cheapest system is the one
 * that turns out not to be needed.
 */

import type { UseCase } from "@/types/content";

export const deliveryUseCases: UseCase[] = [
  {
    slug: "reduce-support-tickets",
    layout: "problem-solution",
    title: "Reduce support tickets",
    answer:
      "Deflection works by answering questions before they are asked, not by making contact harder. The first step is reading what people actually ask, which is nearly always narrower than the team believes.",
    whyItMatters:
      "Repetitive contact consumes the capacity that would otherwise go to the complex cases where support genuinely changes a customer's experience.",
    symptoms: [
      "The same handful of questions dominates the queue every week",
      "Response times slip because volume exceeds capacity",
      "Customers phone because they cannot find an answer online",
      "Support answers questions that the product or documentation should have",
    ],
    rootCauses: [
      "Documentation exists but is not findable at the moment of need",
      "An interface or a process is unclear and generates predictable confusion",
      "Status information is held internally and customers have no way to see it",
      "Ticket categories are too coarse to reveal what people are asking about",
    ],
    approach: [
      {
        index: 1,
        title: "Read the tickets",
        description:
          "Categorise several months of contact by the question actually asked. Teams routinely find that five themes account for well over half the volume, which changes what is worth fixing.",
      },
      {
        index: 2,
        title: "Fix the cause where there is one",
        description:
          "If a hundred people a month ask the same thing, the interface or the process is the problem. Answering it faster is a worse fix than removing the confusion.",
      },
      {
        index: 3,
        title: "Answer where it is asked",
        description:
          "Put the answer at the point of confusion rather than in a help centre. Documentation nobody reaches deflects nothing.",
      },
      {
        index: 4,
        title: "Give visibility",
        description:
          "Status, history and documents available to the customer directly. A large share of contact is people asking where something is, which self-service answers completely.",
      },
    ],
    targetState:
      "Routine questions are answered before contact, the team's time goes to cases that need judgement, and deflection comes from usefulness rather than from hiding the contact route.",
    realisticTimeline:
      "Four to twelve weeks depending on whether the fix is content, interface or a portal.",
    services: ["ai-chatbots", "customer-portals", "ui-ux-design"],
    industries: ["saas", "ecommerce"],
    seo: {
      title: "Reduce Support Tickets",
      description:
        "Categorise real contact, fix the causes, answer at the point of confusion, and give customers visibility of their own status.",
      primaryTopic: "reduce support tickets",
      secondaryTopics: ["ticket deflection", "self-service"],
      intent: "commercial",
    },
    audience: ["A6", "A2"],
    phase: "P2",
    cta: { label: "Discuss support volume", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Will a chatbot reduce our tickets?",
        answer:
          "Only if it answers accurately from real source content. A bot that cannot answer adds a step before the human contact people wanted, which raises effort and satisfaction complaints at the same time.",
      },
      {
        question: "Is hiding the contact number an option?",
        answer:
          "It reduces recorded tickets and increases frustration, which surfaces later as churn and public complaints. Deflection should come from the question being answered, not from the route being obscured.",
      },
    ],
    related: [
      { label: "Automate customer support", href: "/use-cases/automate-customer-support/", type: "USE CASE" },
      { label: "Customer Portals", href: "/services/customer-portals/", type: "SERVICE" },
    ],
  },
  {
    slug: "improve-data-quality",
    layout: "problem-solution",
    diagram: "system-architecture",
    title: "Improve data quality",
    answer:
      "Agree definitions first, then assign ownership, then validate at entry. Cleansing before those three is a temporary fix to a permanent process, and the data degrades again within months.",
    whyItMatters:
      "Every decision, report and automation downstream inherits the quality of the data underneath. Poor data does not stay a data problem; it becomes a trust problem, and then a decision problem.",
    symptoms: [
      "Two reports of the same measure disagree and both are defended",
      "Duplicate customer records exist and nobody knows which is current",
      "Analysts spend most of their time reconciling rather than analysing",
      "Automations fail on records that do not match the expected shape",
    ],
    rootCauses: [
      "Key terms are defined differently by different teams",
      "No one is accountable for the accuracy of specific fields",
      "Data is entered free-form where a constrained list would do",
      "Integrations create records without checking whether one already exists",
    ],
    approach: [
      {
        index: 1,
        title: "Agree the definitions",
        description:
          "What counts as an active customer, when an order is complete, which date reporting uses. This is a business conversation, and most quality disputes dissolve once it is held.",
      },
      {
        index: 2,
        title: "Name the owners",
        description:
          "A business owner per field or record type, not a database administrator. Unowned data degrades because nobody is responsible for the judgement calls that keep it consistent.",
      },
      {
        index: 3,
        title: "Validate at entry",
        description:
          "Required formats, constrained lists, duplicate checks at creation. Prevention costs a fraction of correction and it does not have to be repeated.",
      },
      {
        index: 4,
        title: "Monitor",
        description:
          "Completeness, duplication and out-of-range values, checked on a schedule with someone notified. Silent degradation is what turns a working dashboard into one nobody trusts.",
      },
    ],
    targetState:
      "One agreed definition per measure, an owner for each, validation preventing the common faults, and monitoring that surfaces degradation before it reaches a report.",
    realisticTimeline:
      "Eight to sixteen weeks, of which the definition work is often the longest part.",
    services: ["business-intelligence", "systems-integration", "reporting-dashboards"],
    industries: ["financial-services", "logistics"],
    seo: {
      title: "Improve Data Quality",
      description:
        "Definitions, ownership, validation at entry and monitoring — in that order. Why cleansing first buys only a few months.",
      primaryTopic: "improve data quality",
      secondaryTopics: ["data governance", "master data"],
      intent: "commercial",
    },
    audience: ["A7", "A8"],
    phase: "P2",
    cta: { label: "Discuss data quality", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Can a tool fix our data quality?",
        answer:
          "Tools enforce rules; they do not decide what the rules should be. Applied before definitions are agreed, they encode the existing disagreement and make it harder to unpick later.",
      },
      {
        question: "Where do duplicates come from?",
        answer:
          "Usually from integrations that create rather than match, and from entry that allows a near-identical record without warning. Both are preventable at the point of creation, which is where the fix belongs.",
      },
    ],
    related: [
      { label: "Data Quality Framework", href: "/resources/data-quality-framework/", type: "GUIDE" },
      { label: "Data Platforms", href: "/technologies/data-platforms/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "consolidate-business-tools",
    layout: "outcome-led",
    diagram: "system-architecture",
    title: "Consolidate business tools",
    answer:
      "Count the real cost before consolidating: licences, plus the hours spent moving data between systems by hand, plus the errors that movement causes. The manual bridges are usually more expensive than the software.",
    whyItMatters:
      "Tool sprawl accumulates quietly. Each addition was reasonable on its own, and the cost only becomes visible when someone totals the licences and the hours together.",
    symptoms: [
      "Nobody can list every tool the business pays for",
      "The same information is typed into two or three systems",
      "Two tools do overlapping jobs and different teams prefer each",
      "Licence renewals arrive for products nobody remembers approving",
    ],
    rootCauses: [
      "Tools were adopted per team without a shared view",
      "Systems that should exchange data have no integration, so people are the integration",
      "Nobody owns the software estate as a whole",
      "Switching cost is assumed to be higher than the ongoing cost of not switching",
    ],
    approach: [
      {
        index: 1,
        title: "Inventory honestly",
        description:
          "Every tool, its cost, its owner and what it is genuinely used for. Expect surprises — unused licences and forgotten subscriptions are close to universal.",
      },
      {
        index: 2,
        title: "Map the manual bridges",
        description:
          "Where people carry data between systems, and how long it takes. This is the hidden cost, and it usually exceeds the licence savings under discussion.",
      },
      {
        index: 3,
        title: "Decide: consolidate or connect",
        description:
          "Sometimes one system should replace three. Often the tools are individually good and the fix is integration. The inventory decides which, rather than a preference for fewer logos.",
      },
      {
        index: 4,
        title: "Migrate deliberately",
        description:
          "One system at a time with the data and the process moved together. Consolidations attempted in one step tend to be abandoned halfway, leaving more tools than before.",
      },
    ],
    targetState:
      "A software estate someone owns, where systems exchange data directly and each tool has a reason to exist that someone can state.",
    realisticTimeline:
      "Three to nine months depending on how many systems move and how much data has to come with them.",
    services: ["systems-integration", "digital-strategy", "api-development"],
    industries: ["professional-services", "logistics"],
    seo: {
      title: "Consolidate Business Tools",
      description:
        "Inventory the estate, cost the manual bridges between systems, then decide whether to consolidate or connect.",
      primaryTopic: "consolidate business software",
      secondaryTopics: ["tool sprawl", "software estate"],
      intent: "commercial",
    },
    audience: ["A8", "A7", "A2"],
    phase: "P2",
    cta: { label: "Discuss your systems", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Is fewer tools always better?",
        answer:
          "No. A single platform doing six jobs adequately can be worse than four specialised tools that are properly integrated. The right measure is total cost including the manual work, not the number of vendors.",
      },
      {
        question: "What usually costs the most?",
        answer:
          "The manual bridges. Licence totals are visible and get attention; the hours spent moving data between systems are spread across many people and rarely counted, which is why they persist.",
      },
    ],
    related: [
      { label: "Connect business systems", href: "/use-cases/connect-business-systems/", type: "USE CASE" },
      { label: "Total Cost of Ownership", href: "/resources/what-is-total-cost-of-ownership/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "onboard-customers-faster",
    layout: "workflow-led",
    diagram: "process-transformation",
    title: "Onboard customers faster",
    answer:
      "Onboarding usually stalls on document collection and on the customer not knowing what happens next. Both are fixable without changing anything about how the work itself is done.",
    whyItMatters:
      "The onboarding period sets the tone of the relationship, and delays here are attributed to competence. It is also the point at which a customer is most likely to reconsider.",
    symptoms: [
      "Onboarding takes weeks and most of that is waiting",
      "Staff chase the same documents repeatedly",
      "Customers ask where things stand because nothing tells them",
      "Information collected at sale is asked for again at onboarding",
    ],
    rootCauses: [
      "Document collection happens by email with no tracking",
      "Requirements are communicated in stages rather than up front",
      "No status is visible to the customer, so progress is invisible",
      "Data captured during the sale is not carried into delivery",
    ],
    approach: [
      {
        index: 1,
        title: "Map the actual elapsed time",
        description:
          "Where the days go, separated into work time and waiting time. Almost always the waiting dominates, which points the fix away from doing the work faster.",
      },
      {
        index: 2,
        title: "Ask once, ask early",
        description:
          "A single structured request for everything needed, with a clear reason for each item. Staged requests multiply the waiting by the number of stages.",
      },
      {
        index: 3,
        title: "Make status visible",
        description:
          "Show the customer what is done, what is outstanding and what happens next. This removes a large share of the chasing in both directions.",
      },
      {
        index: 4,
        title: "Automate the chase",
        description:
          "Reminders that fire on their own, so following up does not depend on someone remembering during a busy week.",
      },
    ],
    targetState:
      "Requirements are requested once, progress is visible to both sides, reminders happen automatically, and the elapsed time reflects the work rather than the waiting.",
    realisticTimeline:
      "Six to fourteen weeks depending on whether a portal is involved.",
    services: ["workflow-automation", "customer-portals", "systems-integration"],
    industries: ["financial-services", "professional-services"],
    seo: {
      title: "Onboard Customers Faster",
      description:
        "Separate work time from waiting time, request everything once, make status visible, and automate the chasing.",
      primaryTopic: "faster customer onboarding",
      secondaryTopics: ["client onboarding", "document collection"],
      intent: "commercial",
    },
    audience: ["A6", "A2"],
    phase: "P2",
    cta: { label: "Discuss onboarding", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Why does onboarding take so long?",
        answer:
          "Usually waiting rather than working. Documents outstanding, an approval pending, a question unanswered. Measuring elapsed time against actual work time shows the gap immediately and redirects the fix.",
      },
      {
        question: "Do customers use a portal for this?",
        answer:
          "They use it when it is genuinely easier than email and when it shows them something they cannot otherwise see. A portal that only collects, and gives nothing back, gets abandoned for the inbox.",
      },
    ],
    related: [
      { label: "Customer Portals", href: "/services/customer-portals/", type: "SERVICE" },
      { label: "Improve customer experience", href: "/use-cases/improve-customer-experience/", type: "USE CASE" },
    ],
  },
  {
    slug: "scale-without-hiring",
    layout: "outcome-led",
    diagram: "process-transformation",
    title: "Scale without hiring",
    answer:
      "Capacity can be found in process before it is bought in people — but only up to a point, and being honest about that point is what separates this from an automation pitch.",
    whyItMatters:
      "Hiring to absorb growth locks in cost that is hard to reverse. Recovering capacity from process is reversible, faster to deploy, and it makes the eventual hire a better one.",
    symptoms: [
      "Volume has grown and the team is at capacity",
      "Skilled staff spend significant time on administration",
      "Growth is being turned away or delivered late",
      "Every new customer adds a fixed amount of manual work",
    ],
    rootCauses: [
      "Processes designed for a smaller volume have never been revisited",
      "Work is coordinated through email and personal memory",
      "Systems do not exchange data, so people carry it",
      "Approval steps exist that no longer have a reason",
    ],
    approach: [
      {
        index: 1,
        title: "Find where the time goes",
        description:
          "Observed rather than estimated, for the roles under pressure. The distribution is usually surprising, and it rarely matches where management assumes the load sits.",
      },
      {
        index: 2,
        title: "Remove before automating",
        description:
          "Test each step against a current reason to exist. Removing steps is free, immediate, and frequently returns more than the automation would have.",
      },
      {
        index: 3,
        title: "Automate the repetitive remainder",
        description:
          "High-frequency, low-judgement work first. That is where automation is reliable and where the recovered time is large enough to notice.",
      },
      {
        index: 4,
        title: "Say when hiring is the answer",
        description:
          "Some capacity limits are judgement, relationship or craft, and no automation addresses them. Naming those is part of the work rather than a failure of it.",
      },
    ],
    targetState:
      "Administrative load reduced enough that skilled people spend their time on the work only they can do, with a clear view of where the next genuine hire is needed.",
    realisticTimeline:
      "Three to six months for measurable capacity change across a team.",
    services: ["workflow-automation", "systems-integration", "ai-consulting"],
    industries: ["professional-services", "manufacturing"],
    seo: {
      title: "Scale Without Hiring",
      description:
        "Find where time goes, remove steps before automating them, automate the repetitive remainder, and name where a hire is genuinely the answer.",
      primaryTopic: "scale operations without hiring",
      secondaryTopics: ["capacity", "operational efficiency"],
      intent: "commercial",
    },
    audience: ["A2", "A6"],
    phase: "P2",
    cta: { label: "Discuss capacity", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Can automation replace a role?",
        answer:
          "It replaces tasks, and occasionally enough of them that a role changes shape. Framing a project as replacing a person tends to produce resistance from the people whose knowledge the project depends on.",
      },
      {
        question: "When should we hire instead?",
        answer:
          "When the constraint is judgement, relationships or specialist skill rather than repetition. Automating around a genuine skills gap produces a faster version of the wrong outcome.",
      },
    ],
    related: [
      { label: "Automation business case", href: "/resources/automation-business-case-guide/", type: "GUIDE" },
      { label: "Improve operational efficiency", href: "/use-cases/improve-operational-efficiency/", type: "USE CASE" },
    ],
  },
  {
    slug: "launch-a-digital-product",
    layout: "workflow-led",
    diagram: "process-transformation",
    title: "Launch a digital product",
    answer:
      "Build the smallest version that tests the riskiest assumption. For most products the risk is whether anyone wants it, and that is answerable with far less than a full build.",
    whyItMatters:
      "Most product failures are demand failures, not engineering ones. Finding that out after twelve months of building is the most expensive way to learn it.",
    symptoms: [
      "A product idea has been discussed for months without a decision",
      "The proposed scope keeps growing as more people are consulted",
      "Nobody has spoken to a potential buyer about paying for it",
      "The business case rests on assumptions nobody has tested",
    ],
    rootCauses: [
      "The riskiest assumption has not been identified, so everything is being built at once",
      "Success is defined as launching rather than as being used",
      "Feedback is planned for after launch rather than during the build",
      "Internal enthusiasm is being read as market demand",
    ],
    approach: [
      {
        index: 1,
        title: "Name the riskiest assumption",
        description:
          "Usually that a specific group will pay for this specific thing. Everything else is secondary until that one is tested.",
      },
      {
        index: 2,
        title: "Design the smallest test",
        description:
          "The least that produces a real answer. Sometimes that is software; often it is a landing page, a manual service, or ten conversations with people who would buy.",
      },
      {
        index: 3,
        title: "Build a usable core",
        description:
          "One complete workflow that a real user can finish, rather than a broad set of partial features. A narrow product that works teaches you more than a wide one that does not.",
      },
      {
        index: 4,
        title: "Learn in public",
        description:
          "Release to real users early and let the evidence redirect the roadmap. Assumptions written before anyone used the product are the least reliable input available.",
      },
    ],
    targetState:
      "A working product in real users' hands early, with a roadmap directed by observed behaviour rather than by the original specification.",
    realisticTimeline:
      "Eight to twenty weeks to a usable first version, depending on the domain and integration needs.",
    services: ["web-applications", "custom-software", "ui-ux-design"],
    industries: ["startups", "saas"],
    seo: {
      title: "Launch a Digital Product",
      description:
        "Identify the riskiest assumption, design the smallest test of it, build one complete workflow, and let real use direct the roadmap.",
      primaryTopic: "launch a digital product",
      secondaryTopics: ["MVP", "product launch"],
      intent: "commercial",
    },
    audience: ["A1", "A7"],
    phase: "P2",
    cta: { label: "Discuss a product build", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "How small should a first version be?",
        answer:
          "Small enough to reach real users quickly, complete enough that one workflow genuinely works end to end. A product that does one thing properly produces usable feedback; one that does five things partially produces complaints.",
      },
      {
        question: "What if the test says there is no demand?",
        answer:
          "That is the cheapest possible outcome. It is the same answer you would have received after a full build, arrived at for a fraction of the cost and with the budget still available.",
      },
    ],
    related: [
      { label: "Minimum Viable Product", href: "/resources/what-is-a-minimum-viable-product/", type: "GLOSSARY" },
      { label: "Startups", href: "/industries/startups/", type: "INDUSTRY" },
    ],
  },
  {
    slug: "replace-spreadsheet-processes",
    layout: "problem-solution",
    diagram: "process-transformation",
    title: "Replace spreadsheet processes",
    answer:
      "A spreadsheet becomes a liability when several people need it at once, when a mistake is expensive, or when the business depends on one person understanding it. Below that, it is often the right tool.",
    whyItMatters:
      "Spreadsheet-run processes fail quietly. The formula error, the outdated copy and the departure of the person who built it are all discovered after the damage, not before.",
    symptoms: [
      "A critical process runs on a file that one person maintains",
      "Multiple versions circulate and nobody is sure which is current",
      "Errors are found downstream, weeks after they were introduced",
      "The file has grown to a size where it is slow and fragile",
    ],
    rootCauses: [
      "The process outgrew the tool gradually and nobody marked the point",
      "There is no audit trail, so mistakes cannot be traced",
      "Concurrent editing is not supported, so copies proliferate",
      "Business logic lives in formulas nobody has documented",
    ],
    approach: [
      {
        index: 1,
        title: "Test whether it should move",
        description:
          "Concurrency, error cost and key-person dependency. If none apply, keep the spreadsheet — replacing a working one with software is a common and expensive mistake.",
      },
      {
        index: 2,
        title: "Extract the logic",
        description:
          "Document the rules buried in formulas, including the exceptions. This step regularly uncovers errors that have been affecting decisions for years.",
      },
      {
        index: 3,
        title: "Simplify, then build",
        description:
          "Rebuilding a spreadsheet's accumulated workarounds in software preserves them permanently. Decide what the process should be before deciding what to build.",
      },
      {
        index: 4,
        title: "Migrate with the data",
        description:
          "Clean at the point of migration, run in parallel briefly, and then retire the file properly. Spreadsheets that survive alongside the new system become the shadow source of truth.",
      },
    ],
    targetState:
      "The process runs in a system with an audit trail, concurrent access and validation — and the logic that used to live in one person's file is documented and owned.",
    realisticTimeline:
      "Ten to twenty weeks for a business-critical process, including parallel running.",
    services: ["custom-software", "web-applications", "workflow-automation"],
    industries: ["manufacturing", "logistics"],
    seo: {
      title: "Replace Spreadsheet Processes",
      description:
        "The three tests that say a spreadsheet has become a liability, extracting the logic, simplifying before building, and retiring the file properly.",
      primaryTopic: "replace spreadsheets with software",
      secondaryTopics: ["spreadsheet risk", "process software"],
      intent: "commercial",
    },
    audience: ["A6", "A7"],
    phase: "P2",
    cta: { label: "Discuss a process build", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "When is a spreadsheet still the right tool?",
        answer:
          "When one person uses it, mistakes are cheap and visible, and the logic is simple enough to read. Spreadsheets are fast, flexible and free — replacing one that works is a cost with no return.",
      },
      {
        question: "What is the biggest risk in replacing one?",
        answer:
          "Rebuilding its accumulated workarounds as permanent features. Years of exceptions get treated as requirements, and the new system inherits complexity the business had already stopped needing.",
      },
    ],
    related: [
      { label: "Modernise legacy processes", href: "/use-cases/modernise-legacy-processes/", type: "USE CASE" },
      { label: "Data Warehouse vs Spreadsheets", href: "/resources/data-warehouse-vs-spreadsheets/", type: "COMPARISON" },
    ],
  },
];
