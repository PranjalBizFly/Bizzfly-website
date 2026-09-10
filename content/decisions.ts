/**
 * Decision-support pages.
 *
 * Each answers a question a buyer asks before they are ready to buy, and each
 * is willing to conclude "not yet" or "you do not need this". That is the
 * point of the format: a page that always concludes in favour of hiring
 * someone is a sales page wearing a decision page's title.
 */

import type { Resource } from "@/types/content";

export const decisions: Resource[] = [
  {
    slug: "when-do-you-need-an-seo-agency",
    type: "decision",
    topic: "SEO",
    title: "When Do You Need an SEO Agency?",
    answer:
      "You need outside help when the constraint is capability or capacity rather than effort — when you know what should be done and cannot do it, or cannot tell why performance is flat. If nobody internally owns the work, an agency will not fix that.",
    body: [
      "The strongest signal is a diagnosis you cannot reach. Traffic is flat or falling, the obvious explanations have been ruled out, and nobody internally can say why with confidence. Diagnosis is where outside pattern recognition genuinely pays, because the failure is usually one someone has seen before on another site.",
      "The second signal is a known fix nobody can implement. Plenty of businesses know their site renders in the browser, or that their templates lack structure, and have no one with the time or specialism to change it. That is a capacity problem, and it is a reasonable thing to buy.",
      "There are cases where you should not hire. If the product has no demand, if the site cannot be changed for six months, or if there is nobody internally who can prioritise and approve work, an agency will produce recommendations that sit unimplemented. That is the most common way this money is wasted, and it is rarely the agency's fault.",
      "A useful test before signing anything: name the decision you expect the engagement to inform, and the person who will act on it. If either is missing, fix that first.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "When Do You Need an SEO Agency?",
      description:
        "Hire when the constraint is diagnosis or capacity. The cases where an agency cannot help, and the test to apply before signing anything.",
      primaryTopic: "when to hire an SEO agency",
      secondaryTopics: ["SEO agency", "in-house SEO"],
      intent: "commercial",
    },
    audience: ["A1", "A3", "A2"],
    phase: "P1",
    cta: { label: "Start with a diagnostic", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "Is it too early to hire an SEO agency?",
        answer:
          "If you have not validated that anyone searches for what you sell, yes. Demand research is cheap and can be done first. SEO amplifies existing demand; it does not create a market that is not there.",
      },
      {
        question: "What should the first engagement be?",
        answer:
          "Usually a diagnostic rather than a retainer. A fixed-scope audit that identifies the actual constraint is lower risk for both sides and tells you whether the relationship is worth continuing.",
      },
    ],
    related: [
      {
        label: "In-house SEO vs agency SEO",
        href: "/resources/in-house-seo-vs-agency-seo/",
        type: "COMPARISON",
      },
      {
        label: "How to evaluate SEO services",
        href: "/resources/how-to-evaluate-seo-services/",
        type: "DECISION",
      },
    ],
  },
  {
    slug: "when-should-you-redesign-your-website",
    type: "decision",
    topic: "Web",
    title: "When Should You Redesign Your Website?",
    answer:
      "Redesign when the site is measurably failing a job it needs to do — converting, being found, being updated — not when it looks dated. Appearance is the most common trigger and the weakest reason on its own.",
    body: [
      "Start from a named failure. Enquiries have fallen while traffic held. Visitors reach a page and leave without acting. Content cannot be published without a developer. The site cannot be made fast. Each of these points at a specific fix, and some of them do not require a redesign at all.",
      "'It looks old' deserves care. Sometimes it is a real credibility problem, especially in sectors where buyers judge competence by presentation. Often it is internal fatigue: the team has seen the site every day for four years and visitors have not. Evidence — session recordings, sales feedback, conversion data — distinguishes the two.",
      "Timing matters more than most teams expect. A redesign freezes ordinary improvement for its duration, and a rebuild carries real risk to existing search visibility. Doing one during a peak season, or while another major change is in flight, converts a manageable project into a stressful one.",
      "The strongest case is a structural constraint plus a commercial cost you can name. The weakest is a new stakeholder who dislikes the current design. If you cannot state what will be true afterwards that is not true now, the project has no finish line.",
    ],
    supports: ["website-redesign", "corporate-websites"],
    seo: {
      title: "When Should You Redesign Your Website?",
      description:
        "Redesign against a named failure, not because the site looks dated. How to test the appearance argument and why timing matters more than expected.",
      primaryTopic: "when to redesign a website",
      secondaryTopics: ["website redesign", "conversion"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P1",
    cta: { label: "Talk through the constraint", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "How often should a website be redesigned?",
        answer:
          "There is no correct interval. A site that is maintained continuously may never need a full redesign; one left untouched for five years usually does. Replacing on a schedule rather than against a problem wastes money.",
      },
      {
        question: "Can we improve conversion without a redesign?",
        answer:
          "Frequently, and it is worth trying first. Clearer messaging, a better-structured page and a simpler form often move conversion more than a visual rebuild, at a fraction of the cost and risk.",
      },
    ],
    related: [
      {
        label: "Website redesign vs rebuild",
        href: "/resources/website-redesign-vs-rebuild/",
        type: "COMPARISON",
      },
      {
        label: "How to plan a website redesign",
        href: "/resources/how-to-plan-a-website-redesign/",
        type: "DECISION",
      },
    ],
  },
  {
    slug: "when-should-you-build-custom-software",
    type: "decision",
    topic: "Software",
    title: "When Should You Build Custom Software?",
    answer:
      "Build when the process is a genuine competitive advantage that products force you to compromise, or when the total cost of the current patchwork exceeds the cost of owning something fitted. Otherwise buy.",
    body: [
      "The first test is differentiation. If the way you quote, schedule, price or fulfil is part of why customers choose you, bending it to fit a product's assumptions erodes the advantage. That is the clearest legitimate case for building, and it is narrower than most businesses assume.",
      "The second is accumulated cost. Several subscriptions bridged by spreadsheets, exports and manual re-entry can quietly cost more than a fitted system — but only when the comparison includes the labour, the errors and the delay, not the licence fees alone. Do that arithmetic honestly before deciding.",
      "The strongest counter-signal is a mature product that already fits. If a category has established players and your requirements are ordinary, building is spending scarce engineering to reach a starting line others crossed years ago.",
      "Whatever you decide, budget the decade rather than the build. Custom software needs hosting, monitoring, dependency updates, security patching and someone who understands it after the original team has moved on. Projects that fail usually funded the first version and nothing after it.",
    ],
    supports: ["custom-software", "web-applications"],
    seo: {
      title: "When Should You Build Custom Software?",
      description:
        "Build when the process is a real advantage or the patchwork costs more than ownership. The counter-signal, and why you must budget the decade.",
      primaryTopic: "when to build custom software",
      secondaryTopics: ["build vs buy", "custom development"],
      intent: "commercial",
    },
    audience: ["A2", "A7", "A8"],
    phase: "P1",
    cta: { label: "Talk through the decision", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "How do we know if our process is really a differentiator?",
        answer:
          "Ask whether customers would notice if it changed. If the process could be replaced with an industry-standard one and nobody outside the company would care, it is not a differentiator — it is just familiar.",
      },
      {
        question: "What is the biggest hidden cost?",
        answer:
          "Ownership after launch: hosting, monitoring, updates, security and the knowledge to maintain it. It is ongoing and it is the line most often missing from the original business case.",
      },
    ],
    related: [
      {
        label: "Custom software vs off-the-shelf",
        href: "/resources/custom-software-vs-off-the-shelf/",
        type: "COMPARISON",
      },
      {
        label: "Custom Software Development",
        href: "/services/custom-software/",
        type: "SERVICE",
      },
    ],
  },
  {
    slug: "when-should-you-automate-a-process",
    type: "decision",
    topic: "Automation",
    title: "When Should You Automate a Process?",
    answer:
      "Automate when a process is repetitive, rule-based, high-volume and stable, and when the steps have already been simplified. Automating a process that is still changing shape locks in the version you were about to improve.",
    body: [
      "Frequency and stability predict return better than irritation does. The task people complain about most is often infrequent and full of judgement — a poor candidate. The task nobody mentions because it is merely tedious, done forty times a week identically, is usually the better one.",
      "Simplify before automating. The most valuable output of mapping a process is normally the discovery that several steps exist for reasons that no longer apply. Removing a step returns more than accelerating it, and it is cheaper.",
      "Automate the core, not the exceptions. Most processes have a stable majority and a long tail of special cases. Handling the majority automatically and routing exceptions to a person with full context captures most of the benefit; chasing total coverage is where cost and fragility escalate.",
      "Do not automate what should stay accountable. Pricing a difficult deal, resolving a complaint, deciding an unusual case — these belong with people. Automating them tends to produce confident wrong answers and removes the judgement that made the outcome defensible.",
    ],
    supports: ["workflow-automation", "sales-automation"],
    seo: {
      title: "When Should You Automate a Process?",
      description:
        "Automate repetitive, stable, high-volume work — after simplifying it. Why the most irritating task is rarely the right first one.",
      primaryTopic: "when to automate a process",
      secondaryTopics: ["business automation", "process improvement"],
      intent: "commercial",
    },
    audience: ["A6", "A2"],
    phase: "P1",
    cta: { label: "Talk through a first project", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "What makes a bad automation candidate?",
        answer:
          "Low frequency, unstable steps, heavy judgement, or a process currently being redesigned. Automating any of those costs more to build and maintain than the time it returns.",
      },
      {
        question: "Should we map the process first?",
        answer:
          "Yes, and expect the map to change the plan. Mapping usually reveals steps that can be removed outright, which returns more value than automating them would have.",
      },
    ],
    related: [
      {
        label: "How to Choose a First Automation Project",
        href: "/resources/how-to-choose-a-first-automation-project/",
        type: "ARTICLE",
      },
      {
        label: "Automation vs manual operations",
        href: "/resources/automation-vs-manual-operations/",
        type: "COMPARISON",
      },
    ],
  },
  {
    slug: "when-should-a-business-invest-in-ai",
    type: "decision",
    topic: "AI",
    title: "When Should a Business Invest in AI?",
    answer:
      "Invest when you have a specific, repeated task involving unstructured information, and the data that task needs already exists and is accessible. Investing because AI is expected of you produces pilots that never reach production.",
    body: [
      "Start from a task, not a technology. 'We should use AI' has no success criterion. 'We spend twelve hours a week reading enquiry emails and routing them' does — it names the work, the volume and the thing that would change. Projects framed the second way survive contact with reality far more often.",
      "Check the data before anything else. AI applied to your business needs access to your business's information: documents, records, history. If that material is scattered, contradictory or locked in systems nobody can query, the first project is data access, not AI. Most stalled initiatives stalled here.",
      "Prefer tasks where being occasionally wrong is survivable. Drafting a reply a person approves, classifying an enquiry, summarising a call — errors are visible and cheap. Irreversible or regulated decisions are the wrong place to begin, whatever the demo suggested.",
      "It is legitimate to conclude not yet. If the process is unstable, the data is not ready, or nobody owns the outcome, waiting is a decision rather than a failure — and considerably cheaper than a pilot that quietly ends.",
    ],
    supports: ["ai-consulting", "ai-agents"],
    seo: {
      title: "When Should a Business Invest in AI?",
      description:
        "Invest against a specific repeated task with accessible data. Why most stalled AI projects stall on data, and why 'not yet' is a legitimate answer.",
      primaryTopic: "when to invest in AI",
      secondaryTopics: ["AI adoption", "AI strategy"],
      intent: "commercial",
    },
    audience: ["A2", "A6", "A7"],
    phase: "P1",
    cta: { label: "Talk through a first use case", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "Do we need our data in order first?",
        answer:
          "You need the data the specific task requires to be accessible and reasonably consistent. That is a much smaller job than a full data programme, and it is where most stalled AI projects actually stopped.",
      },
      {
        question: "What is a realistic first AI project?",
        answer:
          "A narrow, repeated task with unstructured input and a human check — classifying enquiries, drafting replies for approval, summarising documents. Visible, cheap errors and a clear before-and-after.",
      },
    ],
    related: [
      { label: "AI Consulting", href: "/services/ai-consulting/", type: "SERVICE" },
      {
        label: "Introduce AI into operations",
        href: "/use-cases/introduce-ai-into-operations/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "how-to-choose-a-digital-growth-partner",
    type: "decision",
    topic: "Company",
    title: "How to Choose a Digital Growth Partner",
    answer:
      "Judge a partner on how they diagnose, what they refuse to promise, and whether their proposal names a constraint specific to your business. Credentials and client lists say much less than the quality of their first questions.",
    body: [
      "Watch the diagnosis. A partner who proposes a package before understanding the constraint is selling capacity, not judgement. The useful signal is whether their early questions are about your business — how enquiries arrive, what a good customer is worth, what has already been tried — or about your budget.",
      "Pay attention to refusals. Anyone guaranteeing rankings, citations or a conversion rate is describing something they cannot control. A partner who says a channel is wrong for you, or that a piece of work should wait, is demonstrating the judgement you are actually buying.",
      "Ask what happens when it does not work. Everyone has a plan for success. The more revealing questions are how quickly under-performance surfaces, what is reported when a month goes badly, and what they would stop doing. Vague answers here predict vague reporting later.",
      "Finally, check for an internal owner on your side. The most common cause of a failed engagement is not a bad supplier; it is recommendations nobody had the authority or time to implement.",
    ],
    supports: ["digital-strategy"],
    seo: {
      title: "How to Choose a Digital Growth Partner",
      description:
        "Judge partners on diagnosis, refusals and specificity — not credentials. The questions that reveal judgement, and the failure that is usually internal.",
      primaryTopic: "choosing a digital growth partner",
      secondaryTopics: ["agency selection", "vendor evaluation"],
      intent: "commercial",
    },
    audience: ["A1", "A2", "A8"],
    phase: "P1",
    cta: { label: "See How We Work", href: "/how-we-work/", tier: "T1" },
    faqs: [
      {
        question: "What should we ask in a first meeting?",
        answer:
          "Ask what they would need to know before recommending anything, what they would refuse to promise, and what they would do if three months produced nothing. The answers separate judgement from sales process.",
      },
      {
        question: "Do case studies matter?",
        answer:
          "Less than the reasoning behind them. A case study without named constraints, methods and a verifiable source is a story. Ask what they would have done differently — that reveals more than the result.",
      },
    ],
    related: [
      { label: "How We Work", href: "/how-we-work/", type: "COMPANY" },
      {
        label: "How to evaluate SEO services",
        href: "/resources/how-to-evaluate-seo-services/",
        type: "DECISION",
      },
    ],
  },
  {
    slug: "how-to-evaluate-seo-services",
    type: "decision",
    topic: "SEO",
    title: "How to Evaluate SEO Services",
    answer:
      "Evaluate on diagnosis quality, reporting honesty and what the provider refuses to guarantee. Deliverable counts, ranking promises and traffic guarantees are the three clearest signals to walk away.",
    body: [
      "Guarantees are disqualifying. Nobody controls a search engine's ranking or an AI system's citation, so guaranteeing either means the provider is either misunderstanding the mechanism or expecting you to. The same applies to promised traffic percentages presented without conditions.",
      "Deliverable counts measure activity, not outcomes. 'Twenty blog posts and forty links a month' says nothing about whether any of it addresses your constraint. Ask instead what they believe is currently limiting performance and what evidence led them there.",
      "Ask how they will report a bad month, before you sign. Providers who only present favourable metrics tend to keep doing it, and the first sign is usually a report showing impressions rising while enquiries do not. Reports should tie back to commercial outcomes and should say when something did not work.",
      "Finally, ask what they will not do. A provider willing to say a tactic is inappropriate for your market, or that a result will take longer than you hoped, is showing the judgement you are paying for.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "How to Evaluate SEO Services",
      description:
        "Judge on diagnosis, reporting honesty and refusals. Why guarantees and deliverable counts are the clearest signals to walk away.",
      primaryTopic: "evaluating SEO services",
      secondaryTopics: ["SEO agency", "SEO proposal"],
      intent: "commercial",
    },
    audience: ["A1", "A3", "A8"],
    phase: "P1",
    cta: { label: "Ask us these questions", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "Are ranking guarantees ever legitimate?",
        answer:
          "No. Rankings depend on systems no provider controls and on competitors who keep working. A guarantee is either a misunderstanding of the mechanism or a promise made on terms narrow enough to be meaningless.",
      },
      {
        question: "How long before we can judge an SEO engagement?",
        answer:
          "Expect diagnosis and technical work to show measurable movement in indexing and impressions within about eight to twelve weeks. Commercial results typically take longer, and anyone promising otherwise is guessing.",
      },
    ],
    related: [
      {
        label: "What the first 90 days of SEO look like",
        href: "/resources/what-the-first-90-days-of-seo-look-like/",
        type: "ARTICLE",
      },
      { label: "SEO Services", href: "/services/seo/", type: "SERVICE" },
    ],
  },
  {
    slug: "how-to-evaluate-a-software-development-partner",
    type: "decision",
    topic: "Software",
    title: "How to Evaluate a Software Development Partner",
    answer:
      "Evaluate on how they handle ambiguity, what they say about maintenance, and whether your team could take the code over. Portfolio screenshots say almost nothing about whether a system will survive its third year.",
    body: [
      "Give them an ambiguous requirement and watch. A partner who immediately estimates has not understood it; one who asks what happens in the edge cases, what the data looks like and who uses it, is doing the work that prevents expensive surprises later.",
      "Ask about maintenance before features. Who updates dependencies, how security patches reach production, what the deployment process is, what happens if the original developers leave. A partner uninterested in these questions is optimising for delivery day rather than for the years after it.",
      "Insist on handover as a condition, not a favour. Code in your repositories, infrastructure in your accounts, documentation written for someone who was not there. If leaving would be difficult, that difficulty is a commercial position rather than a technical fact.",
      "Testing and review practice is the clearest quality proxy available before you commit. Ask how changes are reviewed and what is tested automatically. 'We test manually before release' is an honest answer that tells you exactly what the third year will cost.",
    ],
    supports: ["custom-software", "web-applications"],
    seo: {
      title: "How to Evaluate a Software Development Partner",
      description:
        "Judge on how they handle ambiguity, what they say about maintenance, and whether handover is a condition. Why portfolios say little.",
      primaryTopic: "evaluating a software development partner",
      secondaryTopics: ["development agency", "vendor selection"],
      intent: "commercial",
    },
    audience: ["A7", "A2", "A8"],
    phase: "P1",
    cta: {
      label: "Read our engineering standards",
      href: "/technologies/engineering-standards/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Should we own the code?",
        answer:
          "Yes, and it should live in your repositories with infrastructure in your accounts from the start. Ownership arranged at the end of a project is ownership you will negotiate for at the worst possible moment.",
      },
      {
        question: "What is the most revealing question to ask?",
        answer:
          "What happens when the people who built it are gone. The answer covers documentation, testing, deployment and handover in one, and it is the question suppliers optimising for delivery day answer least convincingly.",
      },
    ],
    related: [
      {
        label: "Our Engineering Standards",
        href: "/technologies/engineering-standards/",
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
    slug: "how-to-plan-a-website-redesign",
    type: "decision",
    topic: "Web",
    title: "How to Plan a Website Redesign",
    answer:
      "Plan backwards from the outcome you need, protect what already works, and treat URL and content parity as a delivery requirement rather than a launch-week task. Most redesign traffic losses are planning failures, not surprises.",
    body: [
      "Begin with an inventory of what currently works. Which pages produce enquiries, which earn search visibility, which are cited or linked. Redesigns lose traffic mainly by discarding or diluting pages nobody realised were performing, and that is preventable with a week of analysis.",
      "Map every URL before design begins, not after. Each existing address needs a destination — kept, redirected to the closest equivalent, or deliberately retired. Redirect chains, loops and mass redirects to the homepage are the specific patterns that cause damage.",
      "Set the non-visual requirements early, because they constrain the design. Server-rendered output, structured content, performance budgets, accessible components and a heading structure that survives editing are all far cheaper to specify than to retrofit.",
      "Plan the launch as a monitored event. Compare rendered content against the old site on key templates, verify indexing and structured data in the first days, and keep the old analytics available for comparison. The first fortnight is when a fixable problem is still cheap.",
    ],
    supports: ["website-redesign", "technical-seo"],
    seo: {
      title: "How to Plan a Website Redesign",
      description:
        "Protect what works, map every URL before design, set non-visual requirements early, and monitor launch. Why traffic losses are planning failures.",
      primaryTopic: "planning a website redesign",
      secondaryTopics: ["website migration", "redirects"],
      intent: "informational",
    },
    audience: ["A3", "A7"],
    phase: "P1",
    cta: {
      label: "Read about Website Redesign",
      href: "/services/website-redesign/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How do we avoid losing traffic in a redesign?",
        answer:
          "Inventory what performs, map every URL to a destination before design starts, keep content depth on pages that earn visibility, preserve server-rendered output, and verify indexing in the first fortnight after launch.",
      },
      {
        question: "Should we redesign and replatform at once?",
        answer:
          "Only with a reason. Doing both together means that if traffic drops you cannot tell which change caused it. Sequencing them is slower and makes diagnosis possible.",
      },
    ],
    related: [
      {
        label: "Website redesign vs rebuild",
        href: "/resources/website-redesign-vs-rebuild/",
        type: "COMPARISON",
      },
      {
        label: "Website launch checklist",
        href: "/resources/website-launch-checklist/",
        type: "CHECKLIST",
      },
    ],
  },
  {
    slug: "how-to-plan-a-digital-transformation-project",
    type: "decision",
    topic: "Company",
    title: "How to Plan a Digital Transformation Project",
    answer:
      "Plan it as a sequence of small, independently valuable changes against named business constraints. Programmes defined by technology adoption rather than by a problem are the ones that run for years and deliver little.",
    body: [
      "Name the constraint in operational terms. 'Quotes take four days because pricing lives in three systems' is a problem you can solve and measure. 'Digital transformation' is a budget line with no finish condition, which is why so many of these programmes end without anyone being able to say whether they worked.",
      "Sequence by dependency and evidence. The first project should be small enough to finish, valuable enough to notice, and instructive enough to change the plan. Large simultaneous change is how organisations discover their assumptions were wrong after committing to all of them.",
      "Expect the process work to exceed the technology work. Most of the delay in these programmes comes from unclear ownership, disagreement about which system is authoritative for a given record, and steps preserved for reasons nobody can now explain. Software makes those explicit rather than solving them.",
      "Build the measurement before the build. If nobody can state today's cycle time, error rate or cost per transaction, nobody will be able to demonstrate improvement afterwards — and the programme will be judged on impressions instead of evidence.",
    ],
    supports: ["digital-strategy", "systems-integration"],
    seo: {
      title: "How to Plan a Digital Transformation Project",
      description:
        "Sequence small, independently valuable changes against named constraints. Why process work exceeds technology work and why baselines come first.",
      primaryTopic: "digital transformation planning",
      secondaryTopics: ["transformation programme", "systems integration"],
      intent: "informational",
    },
    audience: ["A2", "A6", "A7"],
    phase: "P1",
    cta: { label: "Talk through the sequence", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "Where do digital transformation projects usually fail?",
        answer:
          "On process and ownership rather than technology: unclear accountability, disagreement over which system holds the authoritative record, and steps kept for reasons nobody can explain. Software exposes those problems rather than resolving them.",
      },
      {
        question: "How long should the first phase be?",
        answer:
          "Short enough to finish and be judged — typically weeks, not quarters. The purpose of the first phase is as much to test the assumptions in the plan as to deliver the change itself.",
      },
    ],
    related: [
      {
        label: "Systems Integration",
        href: "/services/systems-integration/",
        type: "SERVICE",
      },
      {
        label: "Modernise legacy processes",
        href: "/use-cases/modernise-legacy-processes/",
        type: "USE CASE",
      },
    ],
  },
];
