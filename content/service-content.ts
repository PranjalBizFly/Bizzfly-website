/**
 * Problem and outcome content, keyed by service slug.
 *
 * Kept separate from the service definitions so this layer can be filled in
 * progressively without touching structure. Merged into each service at read
 * time by content/services.ts.
 *
 * Outcomes are deliberately qualitative. No percentage, multiple or ranking
 * claim appears anywhere here, because none has been verified.
 */

interface ServiceContent {
  problems?: string[];
  outcomes?: string[];
}

export const serviceContent: Record<string, ServiceContent> = {
  seo: {
    problems: [
      "The site ranks for its own brand name and very little else",
      "Good content is published consistently and traffic stays flat",
      "Pages are indexed but never appear for anything commercial",
      "Previous agencies reported rankings and never connected them to revenue",
    ],
    outcomes: [
      "Visibility on the queries buyers actually use, not the ones that are easy to win",
      "A technical foundation that stops capping everything built on top of it",
      "Content structured around real search intent rather than internal vocabulary",
      "Reporting that connects search performance to enquiries",
    ],
  },
  "ai-search-optimisation": {
    problems: [
      "Rankings have held steady while organic clicks have fallen",
      "Nobody can answer whether the brand appears in ChatGPT or Perplexity",
      "Competitors are being named in AI answers and you are not",
      "An AI assistant describes the business inaccurately",
    ],
    outcomes: [
      "A measurable baseline for how often the brand is cited in AI answers",
      "One unambiguous brand entity across the site, schema and external profiles",
      "Content structured so a model can quote it and attribute it confidently",
      "Crawler access that is deliberate rather than accidental",
    ],
  },
  "technical-seo": {
    problems: [
      "Pages are published but never indexed",
      "Traffic dropped suddenly and nobody can explain why",
      "Crawl budget is being spent on pages that do not matter",
      "The template ships no headings, so nothing has structure",
    ],
    outcomes: [
      "Search engines able to reach, render and understand the whole site",
      "Duplicate URL patterns resolved to one canonical version",
      "Structured data that validates and anchors to a single entity",
      "A faster render path, which helps both ranking and extraction",
    ],
  },
  "answer-engine-optimisation": {
    problems: [
      "The site ranks on page one and is never quoted in the answer box",
      "Content buries its answer beneath a hero and a value proposition",
      "FAQ answers only make sense in the context of the page around them",
    ],
    outcomes: [
      "Answers stated completely in the first few sentences of a page",
      "Headings that match the questions people actually type",
      "FAQ content that survives being lifted out of context",
    ],
  },
  "generative-engine-optimisation": {
    problems: [
      "Buyers research with an AI assistant and the brand is never mentioned",
      "The business entity is ambiguous across sources, so nothing resolves to it",
      "Content reads as promotional, which makes it unusable as a citation",
    ],
    outcomes: [
      "A brand a model can identify, verify and attribute",
      "Claims specific enough to be worth quoting",
      "Monthly visibility tracking against a fixed set of buyer questions",
    ],
  },
  "google-business-profile": {
    problems: [
      "Competitors appear in the map results and you do not",
      "Business information differs between your site, the profile and directories",
      "Reviews go unanswered and the listing looks abandoned",
    ],
    outcomes: [
      "One consistent set of business details everywhere it is published",
      "A profile categorised for how customers search, not how you describe yourself",
      "A review process that runs rather than one that is remembered",
    ],
  },
  "corporate-websites": {
    problems: [
      "The website is smaller and less credible than the business behind it",
      "Publishing anything requires a developer, so nothing gets published",
      "Enterprise buyers and procurement cannot find what they need",
    ],
    outcomes: [
      "A site that matches the seriousness of the company",
      "A team able to publish without engineering involvement",
      "Structure that search engines and AI systems can read completely",
    ],
  },
  "website-redesign": {
    problems: [
      "The current site was built for a business that has since changed",
      "A previous redesign lost traffic and nobody wants to repeat it",
      "The theme it runs on cannot be extended any further",
    ],
    outcomes: [
      "A site that reflects the business as it is now",
      "Search performance carried across rather than lost in migration",
      "A foundation that can be extended instead of replaced again in two years",
    ],
  },
  "website-performance": {
    problems: [
      "Mobile visitors leave before the page finishes rendering",
      "Core Web Vitals are failing and nobody has diagnosed why",
      "Third-party scripts have accumulated with no owner",
    ],
    outcomes: [
      "A faster first render, particularly on mobile connections",
      "Fewer visitors lost before the content appears",
      "A performance budget so the gains do not silently regress",
    ],
  },
  "custom-software": {
    problems: [
      "A core process runs on spreadsheets that have outgrown themselves",
      "Several tools are paid for and none of them join up",
      "The process that differentiates the business is the one with no system",
    ],
    outcomes: [
      "Software shaped around the process rather than the process bent around software",
      "A codebase your own team can maintain and extend",
      "Documented architecture decisions, so the reasoning survives the handover",
    ],
  },
  "workflow-automation": {
    problems: [
      "The same data is typed into more than one system",
      "A process stops entirely when one person is on leave",
      "Reporting is assembled by hand and out of date by the time it is read",
    ],
    outcomes: [
      "Repetitive steps running without supervision",
      "Exceptions reaching a person with the context already attached",
      "Capacity that grows without proportional headcount",
    ],
  },
  "sales-automation": {
    problems: [
      "Enquiries wait in a shared inbox until somebody notices them",
      "Follow-up depends on individual diligence rather than a system",
      "Nobody can state the current average response time",
    ],
    outcomes: [
      "Every enquiry acknowledged within minutes rather than days",
      "Routing by source, sector and value without manual triage",
      "Follow-up that happens whether or not anyone remembers",
    ],
  },
  "ai-agents": {
    problems: [
      "High-volume repetitive work with clear rules is consuming skilled people",
      "Throughput is capped by headcount rather than by demand",
      "A previous AI pilot produced a demo and never reached production",
    ],
    outcomes: [
      "A defined task completed end to end, in production, with monitoring",
      "Explicit boundaries around what the system will and will not attempt",
      "An escalation path so an uncertain case reaches a person with context",
    ],
  },
  "ai-chatbots": {
    problems: [
      "The same twenty questions consume most of the support day",
      "Enquiries arriving outside working hours wait until morning",
      "Off-the-shelf bots answer confidently and incorrectly",
    ],
    outcomes: [
      "Routine questions answered instantly from your own documented content",
      "A visible, immediate route to a person when the answer is not there",
      "A shorter queue, so genuine problems reach the team faster",
    ],
  },
  "ai-consulting": {
    problems: [
      "Leadership is under pressure to have an AI position and no basis to choose",
      "A pilot was run, produced nothing, and left scepticism behind",
      "Nobody can say which processes are even candidates",
    ],
    outcomes: [
      "A clear view of which processes AI suits and which it does not",
      "A sequenced roadmap with a first project small enough to succeed",
      "An honest answer where a rule engine would be cheaper and more reliable",
    ],
  },
  "conversion-rate-optimization": {
    problems: [
      "Traffic is healthy and enquiry volume is not",
      "Visitors reach the contact page and abandon the form",
      "Paid campaigns look efficient on clicks and expensive on leads",
    ],
    outcomes: [
      "A higher share of existing visitors becoming enquiries",
      "Fewer fields and clearer next steps on the paths that matter",
      "Enough measurement to know which pages are responsible",
    ],
  },
  "performance-marketing": {
    problems: [
      "Spend has increased and enquiries have not",
      "Nobody can state the current cost per qualified enquiry",
      "Campaigns send traffic to pages that were never built to convert it",
    ],
    outcomes: [
      "Spend concentrated where it produces qualified enquiries",
      "Landing experiences built for the campaign rather than borrowed",
      "Conversion tracking that survives ad blocking",
    ],
  },
  "business-intelligence": {
    problems: [
      "Leadership decisions rest on a spreadsheet someone rebuilds each month",
      "Two systems give two different answers to the same question",
      "Reporting arrives too late to change anything",
    ],
    outcomes: [
      "One agreed source of truth per metric",
      "Reporting that refreshes itself and can be trusted",
      "Decisions made on current data rather than on last quarter's",
    ],
  },
  "analytics-implementation": {
    problems: [
      "Reported conversions do not match actual enquiries",
      "Tracking was set up once and never verified",
      "Budget decisions are being made on numbers nobody trusts",
    ],
    outcomes: [
      "Measurement that matches reality closely enough to act on",
      "Events designed around commercial outcomes rather than page views",
      "Documentation so the setup stays maintainable",
    ],
  },
  "systems-integration": {
    problems: [
      "The same record is maintained in three places",
      "Reports have to be reconciled because systems disagree",
      "Each tool works well alone and badly with the others",
    ],
    outcomes: [
      "Data moving between systems without a person carrying it",
      "One declared owner per record, so disagreements stop",
      "Monitoring, so a failed sync is noticed before month end",
    ],
  },
  "ui-ux-design": {
    problems: [
      "Users abandon one specific step and nobody knows why",
      "The interface grew feature by feature with no structure",
      "Design was applied at the end of the last project rather than the start",
    ],
    outcomes: [
      "Flows grounded in how people actually use the product",
      "A reusable component system rather than one-off screens",
      "Accessibility built in rather than retrofitted",
    ],
  },
};

export function contentForService(slug: string): ServiceContent {
  return serviceContent[slug] ?? {};
}
