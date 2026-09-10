/**
 * Company — commercial transparency pages.
 *
 * These exist because the questions they answer are asked in every first
 * conversation, and answering them publicly is cheaper than answering them
 * eight times. Nothing here claims a credential, a client count or a track
 * record; each states how we work and what we will not do.
 */

import type { CompanyPage } from "@/types/content";

export const transparencyPages: CompanyPage[] = [
  {
    slug: "how-we-price",
    section: "about",
    title: "How we price",
    eyebrow: "Working together",
    answer:
      "We price by the shape of the work rather than by the hour: a fixed price for a diagnostic, a fixed price for a defined project, and a monthly figure for ongoing programmes. What drives the number is scope and uncertainty, not headcount.",
    body: [
      "A diagnostic is fixed because its scope is fixed. We agree what will be examined and what the output is, and the price does not change if it takes longer than expected. That risk sits with us, which is the point — it is the engagement where you know least about us.",
      "Projects are priced against a defined outcome. The largest variable is not effort but uncertainty: how many systems are involved, how much is undocumented, and how many people must agree. We would rather narrow the scope until it can be priced honestly than quote a range wide enough to be meaningless.",
      "Ongoing programmes are a monthly figure with a scope agreed each month against a stated priority. We do not price these by deliverable count, because counting deliverables rewards producing them rather than moving the thing that matters.",
      "Two things we will not do. We will not quote before understanding the problem, because a number produced from a briefing call is a guess wearing a decimal point. And we will not price on a share of results we cannot control, which sounds aligned and in practice creates pressure to claim credit for outcomes that had other causes.",
    ],
    seo: {
      title: "How we price",
      description:
        "Fixed for diagnostics, fixed for defined projects, monthly for programmes. What drives the number, and the two things we will not price on.",
      primaryTopic: "agency pricing model",
      secondaryTopics: ["pricing", "engagement cost"],
      intent: "commercial",
    },
    audience: ["A8", "A2", "A1"],
    phase: "P1",
    cta: {
      label: "Ask what your situation would cost",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["digital-strategy"],
    related: [
      { label: "Engagement Models", href: "/engagement-models/", type: "COMPANY" },
      { label: "How We Work", href: "/how-we-work/", type: "COMPANY" },
    ],
  },
  {
    slug: "how-we-report",
    section: "about",
    title: "How we report",
    eyebrow: "Working together",
    answer:
      "We report against the constraint we said was binding, in four separate layers — eligibility, appearance, arrival and outcome — and we say when something did not work. A report that only contains good news is not a report.",
    body: [
      "Aggregate traffic is the least useful number in most reports, because it conceals which stage is failing. Separating indexation, impressions, sessions and enquiries means a fall has a location: pages dropping out of the index is a different problem from pages that rank and are not clicked.",
      "Every report states what we believed was limiting performance, what we did about it, and whether the measure moved. When it did not, that is the headline rather than a footnote, because the alternative is discovering six months later that a hypothesis was wrong.",
      "We distinguish measurement from sampling. Search and analytics figures are measurements. AI visibility is a sample: a fixed set of buyer questions asked repeatedly across assistants. Presenting a sample as a measurement is how AI reporting becomes theatre, so we label it.",
      "Cadence matches the mechanism. Monthly for programmes on channels that move over quarters; weekly numbers on slow-moving work produce reaction to noise, and the usual casualty is work that was about to start paying.",
    ],
    seo: {
      title: "How we report",
      description:
        "Four measurement layers, reported separately, against a stated hypothesis — including when it was wrong. Why sampling is labelled as sampling.",
      primaryTopic: "agency reporting",
      secondaryTopics: ["reporting", "measurement", "KPIs"],
      intent: "commercial",
    },
    audience: ["A3", "A8", "A2"],
    phase: "P1",
    cta: {
      label: "See what a report would cover",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["analytics-implementation", "seo"],
    related: [
      {
        label: "How to Measure Search Visibility",
        href: "/resources/how-to-measure-search-visibility/",
        type: "GUIDE",
      },
      { label: "How we price", href: "/company/how-we-price/", type: "COMPANY" },
    ],
  },
  {
    slug: "what-we-do-not-do",
    section: "about",
    title: "What we do not do",
    eyebrow: "Working together",
    answer:
      "We do not guarantee rankings or AI citations, buy links, publish fabricated proof, take work we are not equipped for, or price on a share of results we do not control. Each of these is a common offer and each is a bad one.",
    body: [
      "We do not guarantee rankings or citations. Both depend on systems nobody controls and on competitors who keep working. A guarantee is either a misunderstanding of the mechanism or a promise written on terms narrow enough to be meaningless, and neither is worth buying.",
      "We do not buy links or publish content designed to look like editorial coverage that was not earned. The short-term gain is real and so is the penalty risk, and the risk lands on your domain rather than on ours.",
      "We do not publish invented proof. No fabricated metrics, no logos of companies that were not clients, no testimonials nobody said. Where we have no verified figure we say so, which is why parts of this site describe method rather than results.",
      "We do not take work we are not equipped for. If the constraint is a specialism we do not have, saying so costs us a project and saves you two quarters. And we do not scope by budget: telling us the number before we understand the problem produces a plan built to fit it rather than to fix anything.",
    ],
    seo: {
      title: "What we do not do",
      description:
        "No ranking guarantees, no bought links, no fabricated proof, no work we are not equipped for. Five common offers and why each is a bad one.",
      primaryTopic: "agency scope boundaries",
      secondaryTopics: ["guarantees", "ethics", "scope"],
      intent: "commercial",
    },
    audience: ["A2", "A1", "A8"],
    phase: "P1",
    cta: {
      label: "Ask us what we would refuse",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["digital-strategy"],
    related: [
      {
        label: "How to Evaluate SEO Services",
        href: "/resources/how-to-evaluate-seo-services/",
        type: "DECISION",
      },
      { label: "Content standards", href: "/company/content-standards/", type: "COMPANY" },
    ],
  },
  {
    slug: "content-standards",
    section: "about",
    title: "Content standards",
    eyebrow: "Working together",
    answer:
      "Everything published here follows three rules: no invented proof, no claim we cannot support, and no statistic without a source. Where a figure would help and we do not have a verified one, the page says what is known instead of inventing something.",
    body: [
      "The reason is practical rather than moral. Fabricated statistics are increasingly easy to check, and a single claim contradicted by a better source damages the credibility of everything around it — including the parts that were true. In a market where buyers verify before contacting, that is an expensive trade.",
      "So this site carries no client logos we were not given permission to use, no testimonials nobody wrote, no awards, no certifications and no years-of-experience figure. Case studies appear only when the client has approved the numbers in writing and the source of each is stated.",
      "Where a number is genuinely useful and unavailable, we describe the mechanism instead. 'Most AI crawlers execute little or no JavaScript' is a statement about how the systems work and can be verified. 'AI search drives 43% more qualified traffic' is a statement about outcomes we have not measured, so it does not appear.",
      "The same rule governs what we write for clients. A page that overstates is a page that has to be defended later, usually by someone who did not write it.",
    ],
    seo: {
      title: "Content standards",
      description:
        "No invented proof, no unsupported claim, no statistic without a source. Why the site describes mechanisms rather than results it cannot verify.",
      primaryTopic: "content standards",
      secondaryTopics: ["editorial policy", "credibility"],
      intent: "informational",
    },
    audience: ["A3", "A2"],
    phase: "P1",
    cta: {
      label: "Read what we do not do",
      href: "/company/what-we-do-not-do/",
      tier: "T1",
    },
    relatedServices: ["content-strategy"],
    related: [
      { label: "What we do not do", href: "/company/what-we-do-not-do/", type: "COMPANY" },
      { label: "How we publish client work", href: "/case-studies/", type: "CASE STUDY" },
    ],
  },
  {
    slug: "accessibility-commitment",
    section: "about",
    title: "Accessibility commitment",
    eyebrow: "Working together",
    answer:
      "We build to WCAG 2.2 AA as a delivery requirement rather than a later audit, and we state what is tested and what is not. Accessibility claimed without testing is a claim, not a commitment.",
    body: [
      "The requirements are set before design, because retrofitting them is where accessibility budgets go. Colour contrast verified rather than eyeballed, target sizes that meet the standard, a heading structure that survives editing, visible focus states, and forms with real labels and error messages.",
      "What we test automatically: contrast ratios against the tokens, target sizes, heading order, alternative text presence, and keyboard reachability of every interactive element. What automated testing cannot judge — whether alternative text is useful, whether an error message is comprehensible, whether a flow makes sense with a screen reader — is checked manually.",
      "What we do not claim is a conformance certificate. Automated checks catch a minority of real accessibility problems, and a site can pass every one of them while remaining difficult to use. Where a project needs formal conformance, that requires a specialist audit including testing with people who use assistive technology.",
      "Reduced motion is honoured throughout, because vestibular triggers are not a preference. Any animation on a site we build collapses to an opacity change when the operating system asks for it.",
    ],
    seo: {
      title: "Accessibility commitment",
      description:
        "WCAG 2.2 AA as a delivery requirement, not a later audit. What is tested automatically, what is checked by hand, and what we do not claim.",
      primaryTopic: "accessibility commitment",
      secondaryTopics: ["WCAG", "inclusive design"],
      intent: "informational",
    },
    audience: ["A7", "A3"],
    phase: "P1",
    cta: {
      label: "Read about our Accessibility Audit",
      href: "/services/accessibility-audit/",
      tier: "T1",
    },
    relatedServices: ["accessibility-audit", "ui-ux-design"],
    related: [
      {
        label: "Accessibility Standards",
        href: "/technologies/accessibility-standards/",
        type: "TECHNOLOGY",
      },
      {
        label: "Website Accessibility Checklist",
        href: "/resources/accessibility-checklist/",
        type: "CHECKLIST",
      },
    ],
  },
  {
    slug: "data-and-privacy-approach",
    section: "about",
    title: "Data and privacy approach",
    eyebrow: "Working together",
    answer:
      "We design so that systems hold the least data that will do the job. The cheapest way to protect personal data is not to collect it, and the second cheapest is not to copy it into a second system.",
    body: [
      "Data minimisation is a design decision made early. Every field on a form and every column in an integration should have someone who acts on it; fields collected because they might be useful create obligation without value, and they measurably reduce form completions as well.",
      "We keep personal data out of systems that do not need it. Analytics implementations are configured to avoid capturing personal information in URLs and event properties, and integrations pass identifiers rather than copying records wherever the receiving system does not need the detail.",
      "For AI work this matters more, not less. Sending business documents to a hosted model is a data transfer, and it should be a decision rather than a side effect. We state which data leaves your systems, where it goes, and what the provider's retention terms are, so the decision is made with the facts.",
      "What we do not do is offer legal advice on your obligations. Requirements differ by jurisdiction, sector and the nature of the data, and they should be confirmed by your own advisers. Our part is to build so that the surface those obligations apply to is as small as it can reasonably be.",
    ],
    seo: {
      title: "Data and privacy approach",
      description:
        "Hold the least data that will do the job. How minimisation is applied to forms, analytics and integrations — and why AI work needs it stated.",
      primaryTopic: "data privacy approach",
      secondaryTopics: ["data minimisation", "privacy by design"],
      intent: "informational",
    },
    audience: ["A8", "A7", "A2"],
    phase: "P1",
    cta: {
      label: "Read our privacy policy",
      href: "/company/privacy-policy/",
      tier: "T1",
    },
    relatedServices: ["analytics-implementation", "systems-integration"],
    related: [
      { label: "Privacy Policy", href: "/company/privacy-policy/", type: "COMPANY" },
      {
        label: "Security & Access",
        href: "/technologies/security-and-access/",
        type: "TECHNOLOGY",
      },
    ],
  },
  {
    slug: "working-with-us",
    section: "about",
    title: "Working with us",
    eyebrow: "Working together",
    answer:
      "The engagements that work have three things on your side: someone who can decide, access to the systems involved, and a willingness to hear that the problem is not the one you expected. None of them is about budget.",
    body: [
      "A decision-maker matters more than a large team. The most common reason an engagement produces documents rather than results is that recommendations reach someone who agrees with them and cannot authorise them. One person who can prioritise and approve is worth more than a committee.",
      "Access is the second. Analytics, search console, the content management system, the repository, and whichever systems the work touches. Waiting three weeks for a login is three weeks of a fixed-length engagement spent waiting, and it happens often enough that we now ask about it before starting.",
      "The third is harder to ask for. Diagnosis sometimes concludes that the constraint is not where you thought — that the site converts badly rather than being under-visited, or that the process needs simplifying before automation. Engagements where that finding is unwelcome tend to end with the original plan being delivered anyway.",
      "What you should expect from us: a written diagnosis you keep, plain language rather than jargon, an early answer when something is not working, and a direct answer when the honest one is that you do not need us.",
    ],
    seo: {
      title: "Working with us",
      description:
        "What makes an engagement work: a decision-maker, system access, and willingness to hear the problem is elsewhere. What to expect in return.",
      primaryTopic: "working with an agency",
      secondaryTopics: ["engagement", "collaboration"],
      intent: "commercial",
    },
    audience: ["A2", "A1", "A3"],
    phase: "P1",
    cta: {
      label: "Start a conversation",
      href: "/contact/",
      tier: "T4",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["digital-strategy"],
    related: [
      { label: "Discovery Process", href: "/discovery-process/", type: "COMPANY" },
      { label: "Engagement Models", href: "/engagement-models/", type: "COMPANY" },
    ],
  },
  {
    slug: "faq",
    section: "about",
    title: "Frequently Asked Questions",
    eyebrow: "Working together",
    answer:
      "The questions that come up before a first call: what we do, how engagements start, how long things take, what we guarantee, and who owns what we build. Answered directly, including where the answer is unwelcome.",
    body: [
      "Most of what a prospective client wants to know before committing time is procedural rather than technical: how this starts, what it costs, how long before anything is visible, and what happens if it does not work. Those answers are below and on the pages they link to.",
      "The pattern behind them is consistent. We prefer a small, fixed first engagement to a large open-ended one, we report against a stated hypothesis including when it fails, and we decline work we are not equipped for.",
    ],
    faqs: [
      {
        question: "What does BizzFly actually do?",
        answer:
          "Four connected things: search and AI visibility, websites and digital experience, software and automation, and the analytics that measure them. Most engagements start in one and touch a second, because visibility and the ability to serve demand are usually the same problem.",
      },
      {
        question: "How does an engagement start?",
        answer:
          "Almost always with a fixed-scope diagnostic rather than a retainer. It establishes which constraint is actually binding, produces a written diagnosis you keep either way, and lets both sides judge the relationship before committing further.",
      },
      {
        question: "How long before we see results?",
        answer:
          "Technical work can show measurable movement in indexing and impressions within about eight to twelve weeks. Content and credibility work usually takes longer to show commercially. Automation and software show a result as soon as the first process is in production, typically four to twelve weeks.",
      },
      {
        question: "Do you guarantee rankings or AI citations?",
        answer:
          "No, and anyone who does is describing something they do not control. What we commit to is removing the reasons a system would not rank or cite you, and reporting honestly on whether it moved.",
      },
      {
        question: "Who owns the code and the accounts?",
        answer:
          "You do, from the start. Code lives in your repositories and infrastructure in your accounts. Ownership arranged at the end of a project is ownership you negotiate for at the worst possible moment.",
      },
      {
        question: "Do you work with small businesses?",
        answer:
          "Yes, though the shape differs. Smaller engagements are usually a single focused project rather than an ongoing programme, because a programme needs enough scope each month to be worth the overhead of running one.",
      },
      {
        question: "What if we already have an in-house team?",
        answer:
          "That is usually the better arrangement. Internal ownership of strategy and delivery with external depth for specific work outperforms either extreme — and it is the setup where recommendations actually get implemented.",
      },
      {
        question: "Can you take over a project someone else started?",
        answer:
          "Often, subject to what state it is in. The first step is an assessment of what exists, because inheriting a system without understanding it is how the second supplier repeats the first one's mistakes.",
      },
    ],
    seo: {
      title: "Frequently Asked Questions",
      description:
        "What we do, how engagements start, how long results take, what we guarantee, and who owns the code. The questions asked before a first call.",
      primaryTopic: "bizzfly faq",
      secondaryTopics: ["questions", "engagement"],
      intent: "informational",
    },
    audience: ["A1", "A2", "A8"],
    phase: "P1",
    cta: {
      label: "Ask something not answered here",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["digital-strategy"],
    related: [
      { label: "How we price", href: "/company/how-we-price/", type: "COMPANY" },
      { label: "Working with us", href: "/company/working-with-us/", type: "COMPANY" },
    ],
  },
];
