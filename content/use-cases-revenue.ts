/**
 * Revenue-side use cases.
 *
 * Each starts from a symptom a commercial leader would recognise before they
 * would name a service, and each is honest about the cases where the stated
 * problem turns out not to be the real one.
 */

import type { UseCase } from "@/types/content";

export const revenueUseCases: UseCase[] = [
  {
    slug: "reduce-customer-churn",
    layout: "problem-solution",
    diagram: "process-transformation",
    title: "Reduce customer churn",
    answer:
      "Most churn is visible before it happens: usage falls, contact stops, a renewal date approaches with no conversation. The work is capturing those signals somewhere a person will see them in time to act.",
    whyItMatters:
      "Retaining an existing customer is materially cheaper than replacing one, and churn compounds: the accounts lost this quarter also take their referrals and their expansion revenue with them.",
    symptoms: [
      "Cancellations arrive as a surprise to the account team",
      "Renewal conversations start in the last fortnight of a contract",
      "Nobody can say which accounts are currently at risk",
      "Support knows an account is unhappy and the commercial team does not",
    ],
    rootCauses: [
      "Usage and engagement data lives in a system the commercial team does not open",
      "There is no agreed definition of what a declining account looks like",
      "Renewal dates are tracked in a spreadsheet nobody reviews on a schedule",
      "Support tickets and account health are never joined up",
    ],
    approach: [
      {
        index: 1,
        title: "Define the signals",
        description:
          "Look at accounts that already left and find what preceded it. The pattern is usually specific to your business (a drop in a particular activity, a change of contact, a support theme) and it is far more useful than a generic health score.",
      },
      {
        index: 2,
        title: "Bring the data together",
        description:
          "Usage, support and commercial history in one place. This is the step that makes everything after it possible, and it is where most retention programmes stall.",
      },
      {
        index: 3,
        title: "Alert a person",
        description:
          "Route a flagged account to a named owner with the context attached. An alert that lands in a dashboard nobody opens has the same effect as no alert.",
      },
      {
        index: 4,
        title: "Structure the response",
        description:
          "Agree what happens when an account is flagged. Without that, alerting produces awareness of churn rather than prevention of it.",
      },
    ],
    targetState:
      "Accounts at risk are identified while there is still time to act, with the signal reaching a named person and a defined response rather than a dashboard.",
    realisticTimeline:
      "Six to twelve weeks to instrument and alert. Whether churn falls depends on what happens after the alert, which is an operating decision rather than a technical one.",
    services: ["systems-integration", "business-intelligence", "workflow-automation"],
    industries: ["saas", "professional-services"],
    seo: {
      title: "Reduce Customer Churn",
      description:
        "Identify the signals that precede cancellation, join the data that carries them, and route at-risk accounts to a person in time to act.",
      primaryTopic: "reduce customer churn",
      secondaryTopics: ["retention", "churn signals", "account health"],
      intent: "commercial",
    },
    audience: ["A2", "A5"],
    phase: "P2",
    cta: { label: "Discuss retention data", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Can churn be predicted?",
        answer:
          "Patterns can be identified from accounts that already left, and they are usually specific to one business rather than universal. That is more useful than a predictive score nobody can interpret, because it tells you what to look at.",
      },
      {
        question: "Do we need machine learning for this?",
        answer:
          "Rarely at the start. Most organisations get most of the value from three or four explicit rules built from observed patterns. A model becomes worth considering once those rules are running and the volume justifies refinement.",
      },
    ],
    related: [
      { label: "Business Intelligence", href: "/services/business-intelligence/", type: "SERVICE" },
      { label: "Improve customer experience", href: "/use-cases/improve-customer-experience/", type: "USE CASE" },
    ],
  },
  {
    slug: "shorten-sales-cycle",
    layout: "workflow-led",
    diagram: "process-transformation",
    title: "Shorten the sales cycle",
    answer:
      "Deals rarely slow down evenly. They stall at specific points: waiting for a quote, waiting for an approval, waiting for information the buyer needs to justify the decision internally. Find the stall, then remove it.",
    whyItMatters:
      "A shorter cycle raises capacity without adding headcount, and it reduces the number of deals lost to nothing more than elapsed time and changed priorities.",
    symptoms: [
      "Deals sit at the same stage for weeks with no clear reason",
      "Quotes take days to produce and often need revising",
      "Buyers go quiet after a proposal and nobody knows what they needed next",
      "Forecast dates slip repeatedly by the same amount",
    ],
    rootCauses: [
      "Stage definitions describe your process rather than the buyer's decision",
      "Pricing or approval requires a person who is a bottleneck",
      "The buyer needs material to persuade colleagues and you have not provided it",
      "Follow-up depends on individual memory rather than on a trigger",
    ],
    approach: [
      {
        index: 1,
        title: "Measure the stalls",
        description:
          "Time in stage across closed deals, won and lost. The pattern usually points at one or two specific transitions rather than a general slowness, which changes what is worth fixing.",
      },
      {
        index: 2,
        title: "Find the dependency",
        description:
          "For the stall points, identify what the deal is waiting on. It is commonly a person, a document, or an answer the buyer needs for someone else in their organisation.",
      },
      {
        index: 3,
        title: "Remove or automate it",
        description:
          "Approval thresholds, quote generation, and the material buyers need to build an internal case. Each is a different fix; treating them as one produces a CRM change that solves none of them.",
      },
      {
        index: 4,
        title: "Trigger the follow-up",
        description:
          "Behaviour-based prompts so the next action happens without being remembered, which is where the most consistent time is recovered.",
      },
    ],
    targetState:
      "Deals move because the next step is triggered rather than remembered, quotes are produced in minutes, and the material a buyer needs internally exists before they ask.",
    realisticTimeline:
      "Six to sixteen weeks depending on how many of the stalls are process rather than system.",
    services: ["sales-automation", "crm-implementation", "marketing-automation"],
    industries: ["professional-services", "manufacturing"],
    seo: {
      title: "Shorten the Sales Cycle",
      description:
        "Measure where deals actually stall, identify what each stall waits on, and remove or automate that dependency.",
      primaryTopic: "shorten sales cycle",
      secondaryTopics: ["sales velocity", "deal stalls"],
      intent: "commercial",
    },
    audience: ["A5", "A2"],
    phase: "P2",
    cta: { label: "Discuss the sales process", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Is a longer cycle always bad?",
        answer:
          "No. Considered purchases take time, and compressing genuine evaluation produces worse-fit customers who churn. The target is removing waiting, not removing thinking.",
      },
      {
        question: "Where do most deals stall?",
        answer:
          "Your own time-in-stage data will say, and it is worth measuring before assuming. The two transitions that most often turn out to be waiting rather than working are quotation and the buyer's internal approval: the first addressable by automating pricing logic, the second by giving the buyer material that makes their internal case for them.",
      },
    ],
    related: [
      { label: "Speed up quoting", href: "/use-cases/speed-up-quoting/", type: "USE CASE" },
      { label: "Sales Automation", href: "/services/sales-automation/", type: "SERVICE" },
    ],
  },
  {
    slug: "qualify-leads-automatically",
    layout: "workflow-led",
    diagram: "process-transformation",
    title: "Qualify leads automatically",
    answer:
      "Capture the information that decides whether an enquiry is worth a conversation at the point of enquiry, then route accordingly. The aim is that a salesperson's first contact is with someone worth contacting.",
    whyItMatters:
      "Sales time spent on unqualified enquiries is the most expensive kind of waste in a commercial team, and it delays response to the enquiries that would have converted.",
    symptoms: [
      "Sales spends the first call establishing whether there is a fit at all",
      "Enquiry volume looks healthy and conversion does not",
      "Good enquiries wait behind poor ones in the same queue",
      "Marketing and sales disagree about lead quality every month",
    ],
    rootCauses: [
      "The enquiry form asks for contact details and nothing that qualifies",
      "There is no agreed definition of a qualified lead",
      "Everything routes to one queue in arrival order",
      "Information that would qualify exists in other systems and is never joined",
    ],
    approach: [
      {
        index: 1,
        title: "Agree the criteria",
        description:
          "What actually predicts a good customer here, from won and lost deals, not from a template. This conversation between sales and marketing is the substance of the work; the automation is the easy part.",
      },
      {
        index: 2,
        title: "Capture at the point of enquiry",
        description:
          "Ask the two or three questions that qualify, without turning the form into an interrogation. Each additional field costs completions, so the questions have to earn their place.",
      },
      {
        index: 3,
        title: "Enrich and route",
        description:
          "Join what you already know, then route by criteria rather than arrival order. Fit enquiries reach a person quickly; the rest get a useful response without consuming sales time.",
      },
      {
        index: 4,
        title: "Review the misroutes",
        description:
          "Check monthly which qualified leads were mishandled and which unqualified ones got through. Criteria set once and never revisited drift away from the business within a year.",
      },
    ],
    targetState:
      "Enquiries are sorted before a person sees them, fit prospects reach sales quickly, and everyone else receives a genuinely useful response rather than silence.",
    realisticTimeline:
      "Four to ten weeks. The agreement on criteria usually takes longer than the implementation.",
    services: ["sales-automation", "marketing-automation", "crm-implementation"],
    industries: ["professional-services", "saas"],
    seo: {
      title: "Qualify Leads Automatically",
      description:
        "Capture qualifying information at the point of enquiry, enrich it, route by fit rather than arrival order, and review the misroutes.",
      primaryTopic: "automated lead qualification",
      secondaryTopics: ["lead routing", "lead scoring"],
      intent: "commercial",
    },
    audience: ["A5", "A3"],
    phase: "P2",
    cta: { label: "Discuss lead handling", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Will more form fields reduce enquiries?",
        answer:
          "Yes, and that is sometimes the point. Fewer, better-qualified enquiries can be worth more than a larger volume that consumes sales time. The trade has to be made deliberately rather than by default.",
      },
      {
        question: "What happens to unqualified enquiries?",
        answer:
          "They should get a helpful response: relevant resources, an honest statement of fit, or a referral. Silence damages your reputation with people who may fit later or know someone who does.",
      },
    ],
    related: [
      { label: "Lead Scoring", href: "/resources/what-is-lead-scoring/", type: "GLOSSARY" },
      { label: "Generate more leads", href: "/use-cases/generate-more-leads/", type: "USE CASE" },
    ],
  },
  {
    slug: "speed-up-quoting",
    layout: "workflow-led",
    diagram: "process-transformation",
    title: "Speed up quoting",
    answer:
      "Quoting is usually slow for two reasons: the pricing logic lives in someone's head, and approval requires a person who is busy. Both are addressable, and the first must be settled before the second.",
    whyItMatters:
      "In competitive situations the first credible quote often sets the terms of the comparison, and a quote that takes four days competes against one that arrived on the same afternoon.",
    symptoms: [
      "Quotes take days and the delay is mostly waiting",
      "Two people quoting the same job produce different numbers",
      "Errors in quotes are found after they have been sent",
      "Approval sits with one person and stops when they are away",
    ],
    rootCauses: [
      "Pricing rules are undocumented and applied by judgement",
      "Every quote is assembled by hand from a previous one",
      "Approval thresholds have never been defined, so everything is approved individually",
      "Product, pricing and discount data live in separate places",
    ],
    approach: [
      {
        index: 1,
        title: "Document the pricing logic",
        description:
          "Rules, exceptions and the discretion that genuinely needs to remain. Undocumented pricing is the actual constraint, and writing it down often reveals inconsistencies worth more than the speed gain.",
      },
      {
        index: 2,
        title: "Structure the inputs",
        description:
          "One source for products, prices and rules. Quoting from scattered sources is why the same job gets two answers.",
      },
      {
        index: 3,
        title: "Generate the document",
        description:
          "Assemble from structured inputs rather than editing last month's file. This removes the error class where an old client's name survives into a new quote.",
      },
      {
        index: 4,
        title: "Set approval thresholds",
        description:
          "Standard quotes issue immediately; only genuine exceptions route to a person. Approving everything individually is what makes one person the bottleneck.",
      },
    ],
    targetState:
      "Standard quotes are produced in minutes and consistently, with human attention reserved for the ones that genuinely need judgement.",
    realisticTimeline:
      "Eight to sixteen weeks, longer where pricing logic is complex or genuinely undocumented.",
    services: ["workflow-automation", "custom-software", "systems-integration"],
    industries: ["manufacturing", "professional-services"],
    seo: {
      title: "Speed Up Quoting",
      description:
        "Document the pricing logic, structure the inputs, generate rather than edit, and reserve approval for real exceptions.",
      primaryTopic: "faster quoting process",
      secondaryTopics: ["quote automation", "CPQ"],
      intent: "commercial",
    },
    audience: ["A6", "A5"],
    phase: "P2",
    cta: { label: "Discuss quoting", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "What if our pricing is too complex to automate?",
        answer:
          "Complexity is usually the reason to do it rather than not to. What blocks automation is undocumented complexity: rules that exist only as judgement. Once written down, most of it is codifiable and the genuine exceptions are a small minority.",
      },
      {
        question: "Do we lose flexibility?",
        answer:
          "No, if discretion is designed in. Automate the standard path and route the exceptions to a person with the context attached. That is more flexibility than a process where everything waits behind one approver.",
      },
    ],
    related: [
      { label: "Shorten the sales cycle", href: "/use-cases/shorten-sales-cycle/", type: "USE CASE" },
      { label: "Workflow Automation", href: "/services/workflow-automation/", type: "SERVICE" },
    ],
  },
  {
    slug: "prove-marketing-roi",
    layout: "outcome-led",
    diagram: "system-architecture",
    title: "Prove marketing ROI",
    answer:
      "Attribution can show which channels contribute to enquiries and which do not. It cannot fully allocate credit across a considered purchase, and a measurement approach that pretends otherwise produces confident wrong decisions.",
    whyItMatters:
      "Budget goes to what can be evidenced. Marketing that genuinely works but cannot be measured loses funding to marketing that is measurable and less effective.",
    symptoms: [
      "Spend is defended with traffic figures rather than revenue",
      "Finance asks which half of the budget works and there is no answer",
      "Channels are judged on last-click and the ones that start conversations look worthless",
      "Sales and marketing report different numbers for the same period",
    ],
    rootCauses: [
      "Enquiries are not traceable to their source once they enter the CRM",
      "Offline conversion (the call, the meeting, the contract) never returns to the analytics",
      "Different definitions of a lead in marketing and sales systems",
      "Buying journeys span months and several devices, which no single tool sees end to end",
    ],
    approach: [
      {
        index: 1,
        title: "Connect enquiry to source",
        description:
          "Carry the source through the form into the CRM and keep it there. Without this nothing downstream is possible, and it is the step most often missing.",
      },
      {
        index: 2,
        title: "Close the loop from sales",
        description:
          "Return won and lost outcomes to the reporting layer, so channels are judged on revenue rather than on enquiries.",
      },
      {
        index: 3,
        title: "Agree the definitions",
        description:
          "One definition of a lead, a qualified lead and a customer, shared by both teams. Most ROI disputes are definition disputes.",
      },
      {
        index: 4,
        title: "State the limits",
        description:
          "Document what cannot be attributed: brand effects, offline influence, dark social. A report that acknowledges its blind spots is trusted; one that claims completeness is eventually caught out.",
      },
    ],
    targetState:
      "Channel performance is reported against revenue with a stated confidence, and the unattributable portion is named rather than quietly assigned to whichever channel touched last.",
    realisticTimeline:
      "Eight to sixteen weeks depending on CRM state and how many systems the journey crosses.",
    services: ["analytics-implementation", "business-intelligence", "reporting-dashboards"],
    industries: ["professional-services", "ecommerce"],
    seo: {
      title: "Prove Marketing ROI",
      description:
        "Connect enquiry to source, close the loop from sales, agree definitions, and state honestly what cannot be attributed.",
      primaryTopic: "prove marketing roi",
      secondaryTopics: ["attribution", "marketing measurement"],
      intent: "commercial",
    },
    audience: ["A3", "A8"],
    phase: "P2",
    cta: { label: "Discuss measurement", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Can every enquiry be attributed?",
        answer:
          "No. Considered purchases involve touchpoints no tool observes: a conversation, a recommendation, something read months earlier. Good measurement narrows the unknown and labels what remains rather than assigning it arbitrarily.",
      },
      {
        question: "Is last-click attribution useless?",
        answer:
          "Not useless, but systematically biased toward channels that appear late. Used alone it defunds the activity that starts conversations, which is why it should be read alongside source-of-first-touch and assisted contribution.",
      },
    ],
    related: [
      { label: "SEO Reporting Framework", href: "/resources/seo-reporting-framework/", type: "GUIDE" },
      { label: "Analytics Implementation", href: "/services/analytics-implementation/", type: "SERVICE" },
    ],
  },
  {
    slug: "recover-lost-traffic",
    layout: "problem-solution",
    diagram: "search-surfaces",
    title: "Recover lost traffic",
    answer:
      "Diagnosis first. A decline caused by a migration, an algorithm update, lost content or the shift to zero-click search needs a different response in each case, and acting before diagnosing usually wastes the quarter.",
    whyItMatters:
      "Traffic declines compound while they are being debated. The pages losing visibility keep losing it, and recovery takes longer the further the position has fallen.",
    symptoms: [
      "Organic sessions fell and have not recovered",
      "Rankings held but clicks did not",
      "A specific section of the site lost visibility while the rest held",
      "The decline coincides with a redesign nobody connected it to",
    ],
    rootCauses: [
      "A migration or redesign that removed content, changed URLs or changed rendering",
      "An algorithm update that reweighted what the site was relying on",
      "Competitors publishing better material on the same queries",
      "AI answers absorbing informational clicks the site used to receive",
    ],
    approach: [
      {
        index: 1,
        title: "Date the decline precisely",
        description:
          "Find when it started and what changed on or near that date. A decline that begins on a deployment day is a different investigation from one that begins on an update date.",
      },
      {
        index: 2,
        title: "Segment it",
        description:
          "By page type, query type and device. A site-wide fall and a fall confined to informational pages have entirely different causes, and the aggregate chart hides which one you have.",
      },
      {
        index: 3,
        title: "Separate impressions from clicks",
        description:
          "If impressions held and clicks fell, the pages are still eligible and something changed in presentation, which points at zero-click rather than at a ranking loss.",
      },
      {
        index: 4,
        title: "Remediate against the finding",
        description:
          "Restore content, fix redirects, correct rendering, or accept the click loss and shift the measure, as the evidence dictates rather than as a default checklist.",
      },
    ],
    targetState:
      "The cause is identified and evidenced, remediation is directed at it, and where traffic is not recoverable that is stated plainly rather than pursued indefinitely.",
    realisticTimeline:
      "Two to four weeks to diagnose. Recovery depends entirely on the cause: redirect faults resolve in weeks, lost content depth takes a quarter or more.",
    services: ["seo-audit", "technical-seo", "seo-migration"],
    industries: ["ecommerce", "media"],
    seo: {
      title: "Recover Lost Search Traffic",
      description:
        "Date the decline, segment it, separate impressions from clicks, then remediate against the finding rather than a checklist.",
      primaryTopic: "recover lost search traffic",
      secondaryTopics: ["traffic decline", "ranking recovery"],
      intent: "commercial",
    },
    audience: ["A3", "A1"],
    phase: "P1",
    cta: { label: "Discuss a traffic decline", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Is all lost traffic recoverable?",
        answer:
          "No. Informational clicks absorbed by AI answers are unlikely to return in their previous volume, and pursuing them wastes effort better spent on queries that still produce visits. Part of an honest diagnosis is saying which is which.",
      },
      {
        question: "How quickly can we recover from a migration error?",
        answer:
          "A missing redirect map corrected within days usually recovers within weeks. Lost content depth or a change in rendering takes a quarter or more, because the pages have to re-earn their positions.",
      },
    ],
    related: [
      { label: "Why Your Website Redesign Lost Traffic", href: "/resources/why-your-website-redesign-lost-traffic/", type: "ARTICLE" },
      { label: "SEO Audit", href: "/services/seo-audit/", type: "SERVICE" },
    ],
  },
  {
    slug: "enter-a-new-market",
    layout: "outcome-led",
    diagram: "search-surfaces",
    title: "Enter a new market",
    answer:
      "Test for demand before committing to a presence. Search behaviour, competitor visibility and enquiry response in the target market give a cheap read on whether the opportunity is real before anything is built.",
    whyItMatters:
      "Market entry commits budget and attention for a year or more. Evidence gathered in a few weeks changes the decision, and occasionally cancels it, which is the cheapest possible outcome.",
    symptoms: [
      "A new market has been chosen on intuition and needs validating",
      "An existing market has plateaued and growth has to come from elsewhere",
      "Enquiries arrive from a region you do not serve properly",
      "A competitor has entered a market and nobody knows how it is going",
    ],
    rootCauses: [
      "Demand has never been measured, only assumed",
      "The vocabulary differs and existing content does not match how the market searches",
      "Trust signals that work at home mean nothing in the new market",
      "The delivery model has not been tested against local expectations",
    ],
    approach: [
      {
        index: 1,
        title: "Measure the demand",
        description:
          "Search volume, query language and competitor visibility in the target market. Cheap, fast, and it settles the question of whether anyone is looking.",
      },
      {
        index: 2,
        title: "Read the competition",
        description:
          "Who is visible, what they offer, and where they are weak. An unoccupied market is more often an absent one than an opportunity.",
      },
      {
        index: 3,
        title: "Test with a minimum presence",
        description:
          "A focused set of pages targeting the market's actual language, with enquiry tracking. Real enquiries settle arguments that research cannot.",
      },
      {
        index: 4,
        title: "Commit or stop",
        description:
          "Decide against the evidence at a date agreed in advance. Entries that drift without a decision point consume budget for years.",
      },
    ],
    targetState:
      "Entry is decided on measured demand and observed response rather than on assumption, with a defined point at which the decision is reviewed.",
    realisticTimeline:
      "Four to eight weeks for research and a minimum presence; a quarter of live data before the commit decision.",
    services: ["digital-strategy", "seo", "content-strategy"],
    industries: ["saas", "professional-services"],
    seo: {
      title: "Enter a New Market",
      description:
        "Measure demand, read the competition, test with a minimum presence, then commit or stop against evidence at an agreed date.",
      primaryTopic: "enter a new market digitally",
      secondaryTopics: ["market entry", "expansion"],
      intent: "commercial",
    },
    audience: ["A2", "A1"],
    phase: "P2",
    cta: { label: "Discuss market entry", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "How much does it cost to test a market?",
        answer:
          "Considerably less than entering one. Research plus a focused page set is a fraction of a full launch, and it produces the evidence that makes the larger commitment defensible or unnecessary.",
      },
      {
        question: "What if there is no search volume in the new market?",
        answer:
          "That is a finding, not a failure. It may mean the category is bought through other channels, or that the demand is not there. Either way it is better known before the budget is committed.",
      },
    ],
    related: [
      { label: "Digital Strategy", href: "/services/digital-strategy/", type: "SERVICE" },
      { label: "Content Planning Framework", href: "/resources/content-planning-framework/", type: "GUIDE" },
    ],
  },
];
