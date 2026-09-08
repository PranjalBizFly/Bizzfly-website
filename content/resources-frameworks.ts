/**
 * Guides and frameworks.
 *
 * Longer than a checklist and more prescriptive than a glossary entry: each
 * gives a repeatable method for a decision that recurs. Frameworks are
 * described in enough detail to be used without us.
 */

import type { Resource } from "@/types/content";

export const frameworks: Resource[] = [
  {
    slug: "seo-reporting-framework",
    type: "guide",
    topic: "Analytics",
    title: "SEO Reporting Framework",
    readingTime: "6 min",
    answer:
      "Report SEO in four separate layers — eligibility, appearance, arrival and outcome — against a stated hypothesis. Aggregated traffic conceals which layer is failing, which is why most reports cannot explain a decline.",
    body: [
      "Layer one is eligibility: how many of your pages are indexed, and which fell out. A content programme producing unindexed pages looks like a content problem in a traffic chart and is a technical one. Reporting this first stops that misdiagnosis.",
      "Layer two is appearance: impressions and average position for the queries that describe your business. This is where you are competing, independently of clicks — and it is the layer that shows AI-driven click loss, because impressions hold while clicks fall.",
      "Layer three is arrival: sessions segmented by page type and query intent. Aggregate sessions are nearly useless here; a rise driven by informational pages and a rise driven by commercial pages mean opposite things about the quarter.",
      "Layer four is outcome: enquiries, qualified enquiries and, where available, revenue. Noisy and lagging, so it is read as a trend rather than a monthly verdict — and always alongside the layers above, because a fall here usually originates in one of them.",
      "Around the four layers, every report should state what was believed to be limiting performance, what was done, and whether the measure moved. When it did not, that is the headline. A report that cannot say a hypothesis was wrong will keep funding it.",
      "Finally, label sampling as sampling. AI visibility is sampled by asking a fixed question set repeatedly; it is not a measurement, and presenting it as one is how AI reporting becomes theatre.",
    ],
    supports: ["seo", "analytics-implementation"],
    seo: {
      title: "SEO Reporting Framework",
      description:
        "Four measurement layers reported separately against a stated hypothesis. Why aggregate traffic cannot explain a decline.",
      primaryTopic: "seo reporting framework",
      secondaryTopics: ["SEO reporting", "KPIs", "measurement"],
      intent: "informational",
    },
    audience: ["A3", "A8"],
    phase: "P1",
    cta: { label: "See how we report", href: "/company/how-we-report/", tier: "T1" },
    faqs: [
      {
        question: "How often should SEO be reported?",
        answer:
          "Monthly for most programmes, read as a quarterly trend. Weekly reporting on a channel that moves over quarters produces reaction to noise, and the usual casualty is work about to start paying.",
      },
      {
        question: "What single chart is most useful?",
        answer:
          "Impressions and clicks on the same axis for your priority queries. Divergence between them is the clearest signal of the zero-click shift, and it is invisible in a sessions chart.",
      },
    ],
    related: [
      { label: "How to measure search visibility", href: "/resources/how-to-measure-search-visibility/", type: "GUIDE" },
      { label: "How we report", href: "/company/how-we-report/", type: "COMPANY" },
    ],
  },
  {
    slug: "enterprise-seo-framework",
    type: "guide",
    topic: "SEO",
    title: "Enterprise SEO Framework",
    readingTime: "6 min",
    answer:
      "At enterprise scale the constraint is rarely knowledge — it is getting change deployed across teams who do not report to you. The framework is governance: templates over pages, standards over requests, and evidence over opinion.",
    body: [
      "Work at the template level. On a site of thousands of pages, fixing individual pages is a treadmill; changing the template that generates them fixes a class of problem permanently. Prioritising by template rather than by page is the single largest efficiency available.",
      "Convert recommendations into standards. A request to a development team competes with every other request. A documented standard — server-rendered content, one H1, canonical rules, structured data — becomes part of the definition of done and stops being renegotiated each sprint.",
      "Instrument the standards so violations surface automatically. A check that fails a build is enforcement; a page in a wiki is a suggestion, and it decays as soon as the people who wrote it move on.",
      "Prioritise with commercial evidence rather than volume. In a large organisation, competing teams all have data; the one with revenue attached to their proposal wins the sprint. Framing SEO work as a revenue constraint rather than a ranking opportunity is a political necessity, not a presentational one.",
      "Expect the bottleneck to be organisational. The most valuable role at scale is usually a person who can navigate approvals, not another audit — which is why enterprise programmes that consist only of external recommendations rarely move anything.",
    ],
    supports: ["enterprise-seo", "seo"],
    seo: {
      title: "Enterprise SEO Framework",
      description:
        "Templates over pages, standards over requests, automated enforcement, and commercial framing. Why the constraint at scale is organisational.",
      primaryTopic: "enterprise seo framework",
      secondaryTopics: ["enterprise SEO", "governance", "scale"],
      intent: "informational",
    },
    audience: ["A3", "A2"],
    phase: "P2",
    cta: { label: "Read about Enterprise SEO", href: "/services/enterprise-seo/", tier: "T1" },
    faqs: [
      {
        question: "What makes enterprise SEO different?",
        answer:
          "The bottleneck moves from knowing what to do to getting it deployed across teams with their own priorities. That makes governance, standards and automated enforcement more valuable than further analysis.",
      },
      {
        question: "How do we get development time for SEO work?",
        answer:
          "Attach it to revenue and convert it into standards rather than requests. Work that is part of the definition of done stops competing for prioritisation every sprint.",
      },
    ],
    related: [
      { label: "Enterprise SEO", href: "/services/enterprise-seo/", type: "SERVICE" },
      { label: "Site Architecture", href: "/services/site-architecture/", type: "SERVICE" },
    ],
  },
  {
    slug: "content-planning-framework",
    type: "guide",
    topic: "SEO",
    title: "Content Planning Framework",
    readingTime: "6 min",
    answer:
      "Plan content against the questions buyers actually ask across the whole decision, then check which have no page that answers them. Planning from keyword volume produces coverage of what is searched rather than what is decided.",
    body: [
      "Start by listing the decision, not the keywords. What does someone need to understand, compare and verify before buying what you sell? That list is usually twelve to twenty questions, and it maps to the pages that should exist.",
      "Then check each against the results page. Search the question and read what ranks: the page type ranking tells you what kind of page can win, and that decides the format before a word is written.",
      "Then audit for gaps. Most businesses find the same shape: strong on what they sell, thin on the explanatory and comparative middle, absent on the questions that make someone trust a supplier. That middle is where AI answers are assembled from, which raises its value beyond direct traffic.",
      "Then sequence by proximity to the decision. Pages closest to the purchase are worth writing first even at lower volume, because they convert; explanatory pages compound more slowly but earn citation and links.",
      "Then plan maintenance from the outset. Content decays as competitors publish and facts change, and a quarterly pass updating what exists usually returns more than the same effort producing new pages. Plans that only schedule new content guarantee a growing pile of stale ones.",
    ],
    supports: ["content-strategy", "seo"],
    seo: {
      title: "Content Planning Framework",
      description:
        "Plan against buyer questions, verify format from the results page, find the middle-of-decision gap, sequence by proximity to purchase.",
      primaryTopic: "content planning framework",
      secondaryTopics: ["content strategy", "editorial planning"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: { label: "Read about SEO Content Strategy", href: "/services/content-strategy/", tier: "T1" },
    faqs: [
      {
        question: "Should we plan from keyword volume?",
        answer:
          "Only as a secondary input. Volume tells you how many people search, not what they need to decide. Planning from the decision produces the comparison and evaluation pages that volume-led plans consistently miss.",
      },
      {
        question: "How much content is enough?",
        answer:
          "As many pages as the decision has distinct questions. Pages created to hit a monthly quota are the ones that read as thin and compete with the pages that were needed.",
      },
    ],
    related: [
      { label: "Content cluster", href: "/resources/what-is-a-content-cluster/", type: "GLOSSARY" },
      { label: "How search intent works", href: "/resources/how-search-intent-works/", type: "GUIDE" },
    ],
  },
  {
    slug: "technical-seo-migration-guide",
    type: "guide",
    topic: "Technical SEO",
    title: "Technical SEO Migration Guide",
    readingTime: "7 min",
    answer:
      "A migration protects visibility when URL mapping, content parity and rendering parity are treated as delivery requirements rather than launch-week tasks. Nearly all migration losses are planning failures.",
    body: [
      "Begin with an inventory before design starts: every indexable URL with its traffic, conversions, inbound links and rankings. This is the reference against which everything later is checked, and building it after the new site exists is far harder.",
      "Map each URL to a destination. Kept, redirected in one hop to the closest genuine equivalent, or deliberately retired with a clean 410. Chains, loops and mass redirects to the homepage are the three patterns that cause the damage attributed to migrations generally.",
      "Preserve content depth on pages that earn visibility. New templates frequently trim content to fit a design, and a page that ranked on 900 words of substance does not rank on 200 words of the same subject. Where a template forces the trim, the template is wrong.",
      "Check rendering parity explicitly. If the old site served content in HTML and the new one assembles it in the browser, visibility will fall for reasons no redirect map addresses — and it will fall hardest with AI crawlers.",
      "Stage the launch so problems are visible. Where possible, migrate a section first and observe it for a fortnight. A phased migration turns a single high-risk event into a series of small ones with a rollback path.",
      "Then monitor deliberately: index coverage, redirect resolution, structured data validity and priority rankings, closely for two weeks and weekly for a quarter. Effects lag the change, so a problem introduced at launch often surfaces after everyone has moved on.",
    ],
    supports: ["seo-migration", "technical-seo"],
    seo: {
      title: "Technical SEO Migration Guide",
      description:
        "Inventory, URL mapping, content and rendering parity, phased launch and deliberate monitoring — treated as delivery requirements.",
      primaryTopic: "seo migration guide",
      secondaryTopics: ["site migration", "replatform"],
      intent: "informational",
    },
    audience: ["A7", "A3"],
    phase: "P1",
    cta: { label: "Read about SEO Migration", href: "/services/seo-migration/", tier: "T1" },
    faqs: [
      {
        question: "Can we migrate without losing traffic?",
        answer:
          "A short dip while search engines reprocess is normal and recovers. Sustained loss is avoidable and traces to unmapped URLs, trimmed content or changed rendering.",
      },
      {
        question: "Is a phased migration always better?",
        answer:
          "Where the site divides cleanly, yes — it converts one large risk into several small ones with a rollback path. Where a platform change forces everything at once, compensate with heavier pre-launch parity checking.",
      },
    ],
    related: [
      { label: "Site migration checklist", href: "/resources/site-migration-checklist/", type: "CHECKLIST" },
      { label: "Why your website redesign lost traffic", href: "/resources/why-your-website-redesign-lost-traffic/", type: "ARTICLE" },
    ],
  },
  {
    slug: "ai-visibility-measurement-guide",
    type: "guide",
    topic: "AI Search",
    title: "AI Visibility Measurement Guide",
    readingTime: "6 min",
    answer:
      "There is no rank position in an AI answer, so visibility is sampled rather than measured: a fixed set of buyer questions, asked repeatedly across the assistants your market uses, recorded over time.",
    body: [
      "Build the question set from real buyer language, not keywords. Twenty to forty questions someone would actually type or say, covering the decision — what a thing is, how to choose, who provides it, what it costs. Fix the list, because changing it breaks comparability.",
      "Ask them on a schedule across the assistants your market actually uses, and record three things each time: whether you were mentioned, whether you were cited with a link, and which sources were named instead. The third is the most useful and the most often skipped.",
      "Treat the numbers as directional. Responses vary between runs for the same question, and personalisation and model updates both move results. Anyone reporting AI visibility to a decimal place is describing noise with unearned precision.",
      "Corroborate with signals that survive zero-click: branded search volume, direct arrivals, and enquiries that mention having found you through an assistant. Adding one question to your enquiry form about how someone found you produces better evidence than most tooling.",
      "Finally, read it alongside crawler access. If your server logs show AI crawlers receiving errors or thin HTML, sampling will confirm absence without explaining it — and the fix is technical rather than editorial.",
    ],
    supports: ["ai-search-optimisation", "generative-engine-optimisation"],
    seo: {
      title: "AI Visibility Measurement Guide",
      description:
        "Sample a fixed question set across assistants, record mentions, citations and rival sources, and corroborate with branded search.",
      primaryTopic: "measure ai visibility",
      secondaryTopics: ["GEO measurement", "AI search reporting"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: { label: "Read our AI search methodology", href: "/company/ai-search-methodology/", tier: "T1" },
    faqs: [
      {
        question: "Why do we get different answers to the same question?",
        answer:
          "Because generation is probabilistic and personalisation, region and model version all affect it. That is why this is sampling: read the trend across repeated runs, not any single response.",
      },
      {
        question: "What should we record besides whether we appear?",
        answer:
          "Which sources are cited instead. That tells you who the systems currently trust on your subject, which is far more actionable than your own absence.",
      },
    ],
    related: [
      { label: "How AI search works", href: "/resources/how-ai-search-works/", type: "GUIDE" },
      { label: "AI search readiness checklist", href: "/resources/ai-search-readiness-checklist/", type: "CHECKLIST" },
    ],
  },
  {
    slug: "automation-business-case-guide",
    type: "guide",
    topic: "Automation",
    title: "Building the Business Case for Automation",
    readingTime: "6 min",
    answer:
      "A credible automation case counts recovered hours honestly, includes build and maintenance cost, and states what happens to the time saved. Cases that fail review usually claim savings nobody can point to afterwards.",
    body: [
      "Measure the current process before estimating. Frequency, time per occurrence, and who does it — observed rather than recalled, because estimates of one's own repetitive work are consistently wrong in both directions. A week of observation makes the whole case defensible.",
      "Count only the time that changes. If automation removes four minutes from a task done twice a day, that is the saving; the rest of the process is unaffected. Cases claiming the whole task disappears are the ones finance rejects.",
      "Include the full cost: build, plus ongoing maintenance, plus the exception handling that will still be manual. An automation covering 80% of cases leaves 20% needing a person, and the case has to account for that rather than assuming full coverage.",
      "State what happens to the recovered time. 'Saves 200 hours a year' is not a saving unless someone can say whether that becomes reduced headcount, absorbed growth, or work moved to something else. Finance will ask, and 'efficiency' is not an answer.",
      "Include the error and risk case, which is often stronger than the time case. Rekeying data has an error rate; errors have a cost in rework and occasionally in customer trust. Where that can be estimated it frequently exceeds the hours saved.",
    ],
    supports: ["workflow-automation", "digital-strategy"],
    seo: {
      title: "Building the Business Case for Automation",
      description:
        "Measure before estimating, count only the time that changes, include maintenance and exceptions, and state where recovered time goes.",
      primaryTopic: "automation business case",
      secondaryTopics: ["ROI", "process automation"],
      intent: "informational",
    },
    audience: ["A8", "A6", "A2"],
    phase: "P1",
    cta: { label: "Read about Workflow Automation", href: "/services/workflow-automation/", tier: "T1" },
    faqs: [
      {
        question: "Why do automation business cases get rejected?",
        answer:
          "Usually because the savings cannot be pointed at afterwards. Naming what happens to the recovered time — absorbed growth, reduced overtime, reallocated work — is what makes the case reviewable.",
      },
      {
        question: "Should the case include maintenance?",
        answer:
          "Always. Automations break when systems change and credentials rotate. A case that funds the build and not the upkeep produces something that quietly stops working within a year.",
      },
    ],
    related: [
      { label: "Automation readiness checklist", href: "/resources/automation-readiness-checklist/", type: "CHECKLIST" },
      { label: "Total cost of ownership", href: "/resources/what-is-total-cost-of-ownership/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "ai-governance-guide",
    type: "guide",
    topic: "AI",
    title: "AI Governance for Small Teams",
    readingTime: "6 min",
    answer:
      "Governance for a small organisation is four decisions written down: what data may be sent to which providers, which decisions require a human, who owns each system, and how output is checked.",
    body: [
      "Start with data. List which categories — customer records, financial data, employee information, anything under contract — may or may not be sent to an external model, and to which providers. Most informal AI use in small organisations is uncontrolled precisely because nobody has written this down.",
      "Then decisions. Name the classes of decision that always require a person: anything irreversible, anything with contractual or regulatory weight, anything affecting an individual's treatment. Everything else can be delegated with review.",
      "Then ownership. Each AI-assisted system gets a named owner responsible for its behaviour, its prompts, its source content and its errors. Systems without an owner drift as models update and source documents go stale, and nobody notices until output is visibly wrong.",
      "Then verification. How output is checked, by whom, and how often — sampling is fine, absence is not. Where the system cites sources, checking a sample of citations is the cheapest meaningful quality control available.",
      "Keep it to a page or two. Governance documents nobody reads provide no protection, and for an organisation of this size the value is in having made the four decisions rather than in the formality of recording them.",
    ],
    supports: ["ai-consulting", "ai-readiness-assessment"],
    seo: {
      title: "AI Governance for Small Teams",
      description:
        "Four decisions written down: permitted data, decisions needing a human, named owners, and how output is verified. Kept to a page.",
      primaryTopic: "ai governance",
      secondaryTopics: ["AI policy", "AI risk"],
      intent: "informational",
    },
    audience: ["A2", "A8"],
    phase: "P2",
    cta: { label: "Read about AI Consulting", href: "/services/ai-consulting/", tier: "T1" },
    faqs: [
      {
        question: "Do small businesses need an AI policy?",
        answer:
          "A short one, yes — mostly because staff are already using these tools. The risk is not a formal programme going wrong; it is client data pasted into a consumer chatbot by someone trying to be helpful.",
      },
      {
        question: "What is the minimum viable AI policy?",
        answer:
          "Which data may be sent where, which decisions need a person, who owns each system, and how output is checked. Four answers on one page beats a document nobody finishes reading.",
      },
    ],
    related: [
      { label: "AI project readiness checklist", href: "/resources/ai-project-checklist/", type: "CHECKLIST" },
      { label: "Data and privacy approach", href: "/company/data-and-privacy-approach/", type: "COMPANY" },
    ],
  },
  {
    slug: "website-brief-guide",
    type: "guide",
    topic: "Web",
    title: "How to Write a Website Brief",
    readingTime: "6 min",
    answer:
      "A good brief states the commercial outcome, the audiences and their tasks, the constraints that are real, and what will be judged at the end. It does not specify pages, because that is the answer rather than the question.",
    body: [
      "Lead with the outcome. 'We need more qualified enquiries from mid-market manufacturers' gives a supplier something to design against. 'We need a modern website' gives them nothing, and produces proposals that compete on visual taste.",
      "Describe audiences by task, not demographics. What does each need to do, and what do they need to believe before doing it? A site is a set of tasks completed, and briefs that describe visitors without describing their tasks lead to sites that look right and convert badly.",
      "State constraints honestly and early: the platform you must stay on, the brand rules that are fixed, the integrations that must work, the approval process, and the immovable dates. Constraints discovered mid-project are what turn a fixed price into a change request.",
      "Include what exists and what performs. Which current pages earn traffic and enquiries, and what must not be lost. Briefs that omit this get proposals that would discard the pages doing the work.",
      "Then state how it will be judged. Named measures, checked at a named point after launch. A brief with no success criterion produces a project that ends when everyone is tired rather than when it has worked.",
    ],
    supports: ["corporate-websites", "website-redesign"],
    seo: {
      title: "How to Write a Website Brief",
      description:
        "State the outcome, audiences by task, real constraints, what already performs, and how it will be judged. Why not to specify pages.",
      primaryTopic: "website brief",
      secondaryTopics: ["web project", "RFP"],
      intent: "informational",
    },
    audience: ["A3", "A1"],
    phase: "P1",
    cta: { label: "Read our website development process", href: "/company/website-development-process/", tier: "T1" },
    faqs: [
      {
        question: "Should a brief include a sitemap?",
        answer:
          "Usually not. The structure is part of what you are commissioning; specifying it up front locks in your current mental model and removes the value of the supplier's information architecture work.",
      },
      {
        question: "Should we include a budget?",
        answer:
          "A range, once the outcome is stated. It lets suppliers propose something realistic. Giving the number first tends to produce a plan built to fit it.",
      },
    ],
    related: [
      { label: "How to plan a website redesign", href: "/resources/how-to-plan-a-website-redesign/", type: "DECISION" },
      { label: "Website development process", href: "/company/website-development-process/", type: "COMPANY" },
    ],
  },
  {
    slug: "software-requirements-guide",
    type: "guide",
    topic: "Software",
    title: "How to Write Software Requirements",
    readingTime: "6 min",
    answer:
      "Describe the behaviour the system must produce and the rules it must obey, not the screens. Requirements written as interface descriptions constrain the solution before anyone understands the problem.",
    body: [
      "Write behaviour: what must happen, under which conditions, with what result. 'When an order is cancelled after dispatch, the stock is not returned and finance is notified' is a requirement. 'A cancel button on the order screen' is a design decision wearing a requirement's clothing.",
      "State the rules explicitly, including the awkward ones. Rounding, time zones, what happens on the boundary, which record wins in a conflict. These are the details that cause rework, and they are almost never in the first draft because everyone assumes their own answer is obvious.",
      "Include the unhappy paths. What happens when the external service is unavailable, when the input is malformed, when the same request arrives twice. Most of the cost overrun in software projects lives in cases the requirements did not mention.",
      "Attach examples. Two or three concrete cases with real values are worth several paragraphs of prose, and they double as acceptance tests. Where a rule is complex, a small table of inputs and expected outputs removes the ambiguity entirely.",
      "Then say what is out of scope. Explicit exclusions prevent the most common scope disagreement, which is not about what was promised but about what everyone assumed was implied.",
    ],
    supports: ["custom-software", "web-applications"],
    seo: {
      title: "How to Write Software Requirements",
      description:
        "Describe behaviour and rules rather than screens, include unhappy paths, attach concrete examples, and state exclusions.",
      primaryTopic: "software requirements",
      secondaryTopics: ["specification", "acceptance criteria"],
      intent: "informational",
    },
    audience: ["A7", "A6"],
    phase: "P2",
    cta: { label: "Read our software development process", href: "/company/software-development-process/", tier: "T1" },
    faqs: [
      {
        question: "How detailed should requirements be?",
        answer:
          "Detailed on rules and edge cases, loose on interface. The rules are what cause rework when wrong; the interface is better resolved with a working version than a document.",
      },
      {
        question: "Should requirements be finished before development starts?",
        answer:
          "Enough to start, not all of it. Requirements written before anyone has used a working version are the least reliable input available, which is why increments beat complete specifications.",
      },
    ],
    related: [
      { label: "Minimum viable product", href: "/resources/what-is-a-minimum-viable-product/", type: "GLOSSARY" },
      { label: "Custom Software Development", href: "/services/custom-software/", type: "SERVICE" },
    ],
  },
  {
    slug: "data-quality-framework",
    type: "guide",
    topic: "Data",
    title: "Data Quality Framework",
    readingTime: "6 min",
    answer:
      "Data quality is settled in this order: agree definitions, assign ownership, validate at entry, then monitor. Tooling applied before the first two encodes the disagreement rather than resolving it.",
    body: [
      "Definitions first, because most data quality disputes are definition disputes wearing a technical costume. What counts as an active customer, when an order is complete, which date is used for reporting. Until those are agreed, two systems will disagree and both will be correct by their own rules.",
      "Then ownership. Each field or record type gets someone accountable for its accuracy — a business owner, not a database administrator. Data without an owner degrades because nobody is responsible for the decisions that keep it consistent.",
      "Then validation at the point of entry, which is where quality is cheapest to enforce. A required format, a constrained list, a duplicate check at creation. Cleaning bad data later costs many times more than preventing it, and it recurs.",
      "Then monitoring: completeness, duplication rates, and values outside expected ranges, checked on a schedule with someone notified. Data degrades continuously as sources change, and undetected degradation is what turns a dashboard into something nobody trusts.",
      "Resist starting with a cleansing project. A one-off clean of data that keeps being created badly buys a few months of accuracy and teaches the organisation that quality is a project rather than a practice.",
    ],
    supports: ["business-intelligence", "analytics-implementation"],
    seo: {
      title: "Data Quality Framework",
      description:
        "Definitions, ownership, validation at entry, then monitoring. Why tooling applied first encodes a disagreement instead of resolving it.",
      primaryTopic: "data quality framework",
      secondaryTopics: ["data governance", "data management"],
      intent: "informational",
    },
    audience: ["A7", "A8"],
    phase: "P2",
    cta: { label: "Read about Business Intelligence", href: "/services/business-intelligence/", tier: "T1" },
    faqs: [
      {
        question: "Where should we start with data quality?",
        answer:
          "With definitions, and it is a business conversation rather than a technical one. Most disputes about numbers turn out to be two teams applying different, individually reasonable rules.",
      },
      {
        question: "Is a data cleansing project worth it?",
        answer:
          "Only alongside fixing how the data is created. Cleaning without validation at entry buys a few months and teaches the organisation that quality is a project rather than a practice.",
      },
    ],
    related: [
      { label: "Improve data quality", href: "/use-cases/improve-data-quality/", type: "USE CASE" },
      { label: "Data Platforms", href: "/technologies/data-platforms/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "conversion-research-guide",
    type: "guide",
    topic: "Conversion",
    title: "Conversion Research Guide",
    readingTime: "6 min",
    answer:
      "Research before testing. Analytics shows where people leave, recordings show what happened, and asking customers shows why — and the three together usually make testing unnecessary for the first round of fixes.",
    body: [
      "Start with analytics to locate the problem: which step loses people, on which device, from which source. This narrows the investigation from a whole site to a specific moment, which is the only part testing tools are good at telling you.",
      "Then watch what actually happens. Session recordings and form analytics show the behaviour behind the number — a field being retried, a button being tapped repeatedly, a page abandoned mid-scroll. Most sites contain at least one outright fault found this way within an hour.",
      "Then ask people. A single question on the confirmation page — what nearly stopped you from enquiring — produces more usable insight per hour than any other method available, and it surfaces objections the team had never considered.",
      "Then fix the obvious before testing anything. If research reveals a broken mobile form or an unanswerable question, fix it. A/B testing a known fault is a way of spending traffic to confirm something you already established.",
      "Test only where the answer is genuinely uncertain and traffic supports significance. Below a few hundred conversions a month, tests rarely conclude, and teams read noise as insight — which is worse than not testing, because it produces confident wrong decisions.",
    ],
    supports: ["conversion-rate-optimization", "ui-ux-design"],
    seo: {
      title: "Conversion Research Guide",
      description:
        "Analytics locates, recordings explain, customers tell you why. Fix what research finds before testing, and test only where volume supports it.",
      primaryTopic: "conversion research",
      secondaryTopics: ["CRO", "user research", "A/B testing"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: { label: "Read about Conversion Optimisation", href: "/services/conversion-rate-optimization/", tier: "T1" },
    faqs: [
      {
        question: "Do we need A/B testing to improve conversion?",
        answer:
          "Usually not for the first round. Research typically finds outright faults and clarity problems whose fixes do not need validating. Testing earns its place once the obvious is fixed and the remaining questions are genuinely uncertain.",
      },
      {
        question: "What is the highest-return research method?",
        answer:
          "One question on the confirmation page asking what nearly stopped them. It is cheap, it runs continuously, and it surfaces objections nobody internally had considered.",
      },
    ],
    related: [
      { label: "Website conversion checklist", href: "/resources/website-conversion-checklist/", type: "CHECKLIST" },
      { label: "Conversion funnel", href: "/resources/what-is-a-conversion-funnel/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "first-90-days-automation",
    type: "guide",
    topic: "Automation",
    title: "The First 90 Days of Automation",
    readingTime: "6 min",
    answer:
      "A realistic first quarter: two weeks understanding the process, two weeks simplifying it, four to six weeks building one automation in production, and the remainder handing it over with an owner.",
    body: [
      "Weeks one and two are observation. Follow the real process rather than the documented one, record frequency and time, and note every exception. Expect the map to differ from what management believes, because that difference is usually where the cost sits.",
      "Weeks three and four are simplification, and this is the stage most often skipped. Test each step against a current reason to exist; remove what fails. Frequently this returns more than the automation will, and it always reduces what has to be built.",
      "Weeks five to ten are building one process, end to end, in production. Not a platform rollout, not three processes in parallel — one, chosen for volume and stability, with the exception path and failure behaviour designed in rather than added later.",
      "Weeks eleven and twelve are handover: documentation, a named owner, alerting that reaches someone, and a short review of what the automation actually changed against the baseline recorded in week one. Without that baseline the result is a matter of opinion.",
      "What should not happen in the first ninety days: a platform selection exercise, an automation centre of excellence, or a roadmap of twenty processes. Those follow evidence from a first project; done before it, they commit an organisation to assumptions nobody has tested.",
    ],
    supports: ["workflow-automation", "digital-strategy"],
    seo: {
      title: "The First 90 Days of Automation",
      description:
        "Two weeks observing, two simplifying, six building one process in production, two handing over. What should not happen in the first quarter.",
      primaryTopic: "automation first 90 days",
      secondaryTopics: ["automation programme", "process automation"],
      intent: "informational",
    },
    audience: ["A6", "A2"],
    phase: "P1",
    cta: { label: "Read our automation approach", href: "/company/automation-approach/", tier: "T1" },
    faqs: [
      {
        question: "Why only one process in the first quarter?",
        answer:
          "Because the first one corrects the assumptions in the rest of the plan. Running three in parallel means discovering the same wrong assumption three times at triple the cost.",
      },
      {
        question: "Should we select an automation platform first?",
        answer:
          "No. Platform selection before a first project commits you to assumptions about what you need. One process delivered end to end tells you far more about the requirements than any evaluation matrix.",
      },
    ],
    related: [
      { label: "How to build an automation roadmap", href: "/resources/how-to-build-an-automation-roadmap/", type: "GUIDE" },
      { label: "Automation approach", href: "/company/automation-approach/", type: "COMPANY" },
    ],
  },
];
