/**
 * Comparison pages — the second set.
 *
 * Each states the conditions under which either side wins, including the
 * cases where the answer is "neither yet" or "both". None concludes that the
 * option we sell is always correct, because that is not true.
 */

import type { Resource } from "@/types/content";

export const moreComparisons: Resource[] = [
  {
    slug: "seo-audit-vs-seo-strategy",
    type: "comparison",
    topic: "SEO",
    title: "SEO Audit vs SEO Strategy",
    answer:
      "An audit establishes what is wrong. A strategy decides what to do about it and in what order. Buying the second without the first means executing a plan built on assumptions.",
    body: [
      "An audit is diagnostic and finite. It examines access, indexation, relevance and competition, and produces a list of findings with evidence. Its output is knowledge, and its value is highest when nobody can currently explain why performance is flat.",
      "A strategy is a sequence of decisions: which constraint is binding, what work removes it, in what order, and what would show whether it worked. It is only as good as the diagnosis underneath it, which is why strategies written from a briefing call tend to restate what the client already believed.",
      "The common failure is buying an audit and stopping. A list of thirty findings with no prioritisation is a document, not a plan, and the most common outcome is that the easy items get done and the binding constraint does not.",
      "The sensible sequence is audit, then a short strategy that names the constraint and the first three pieces of work. If a supplier offers a strategy before diagnosis, ask what evidence it rests on.",
    ],
    supports: ["seo-audit", "digital-strategy"],
    seo: {
      title: "SEO Audit vs SEO Strategy",
      description:
        "An audit finds what is wrong; a strategy decides what to do. Why a finding list without prioritisation fails, and the sensible sequence.",
      primaryTopic: "seo audit vs strategy",
      secondaryTopics: ["SEO planning", "diagnosis"],
      intent: "commercial",
    },
    audience: ["A3", "A2"],
    phase: "P1",
    cta: { label: "Read about our SEO Audit", href: "/services/seo-audit/", tier: "T1" },
    faqs: [
      {
        question: "Can we skip the audit if we already know the problem?",
        answer:
          "Sometimes, if the problem is specific and evidenced. Most of the time 'we know the problem' means a hypothesis nobody has tested, and acting on the wrong one is the expensive mistake an audit exists to prevent.",
      },
      {
        question: "How much of an audit's value is the prioritisation?",
        answer:
          "Most of it. Finding thirty issues is straightforward; saying which three actually limit performance is the judgement being bought.",
      },
    ],
    related: [
      { label: "SEO Audit", href: "/services/seo-audit/", type: "SERVICE" },
      { label: "SEO Audit Checklist", href: "/resources/seo-audit-checklist/", type: "CHECKLIST" },
    ],
  },
  {
    slug: "local-seo-vs-national-seo",
    type: "comparison",
    topic: "SEO",
    title: "Local SEO vs National SEO",
    answer:
      "Local visibility is ranked partly on the searcher's proximity, which caps how far it reaches and makes profile accuracy decisive. National visibility has no proximity ceiling and competes on authority and depth instead.",
    body: [
      "Proximity changes the whole shape of the work. In local results a competitor two streets away has an advantage you cannot buy, and visibility falls with distance from your location. That is a structural limit, not something to optimise away, which is why 'we want to rank locally everywhere' is not achievable.",
      "The levers differ accordingly. Local performance is dominated by the business profile, consistent details across the web, genuine location content and earned reviews. National performance is dominated by content depth, technical health and credible external references.",
      "Most businesses need a weighted mix rather than a choice. A firm serving one city primarily needs local; one selling nationally needs depth; one doing both needs location pages that are genuinely different from each other, not a template with the place name swapped.",
      "The failure mode at the boundary is doorway pages: near-identical pages for every town within reach. They violate guidelines, rarely hold rankings, and signal low-value content to the systems assessing the rest of the site.",
    ],
    supports: ["local-seo", "seo"],
    seo: {
      title: "Local SEO vs National SEO",
      description:
        "Proximity caps local reach and makes profile accuracy decisive; national competes on depth and authority. Where the boundary produces doorway pages.",
      primaryTopic: "local vs national seo",
      secondaryTopics: ["local search", "multi-location"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P1",
    cta: { label: "Read about Local SEO", href: "/services/local-seo/", tier: "T1" },
    faqs: [
      {
        question: "Can we rank locally in cities where we have no address?",
        answer:
          "Service-area businesses can appear without displaying an address, but must genuinely serve the area. Creating pages for towns you do not operate in is a doorway pattern and a policy violation.",
      },
      {
        question: "Should a national business bother with local SEO?",
        answer:
          "If it has physical locations customers visit, yes. If it serves clients remotely nationwide, effort is usually better spent on depth than on local signals it cannot benefit from.",
      },
    ],
    related: [
      { label: "Local SEO", href: "/services/local-seo/", type: "SERVICE" },
      { label: "Local SEO Checklist", href: "/resources/local-seo-checklist/", type: "CHECKLIST" },
    ],
  },
  {
    slug: "in-house-vs-outsourced-development",
    type: "comparison",
    topic: "Software",
    title: "In-House vs Outsourced Development",
    answer:
      "In-house gives continuity and accumulated context at a fixed ongoing cost. Outsourcing gives capacity and breadth without a permanent commitment. The question is whether the software is core to what you sell.",
    body: [
      "Build a team for what is core. If software is the product, or the process it encodes is the competitive advantage, the accumulated knowledge of a permanent team is worth its cost, and losing that knowledge between suppliers is expensive in ways that do not appear on an invoice.",
      "Outsource for capacity and specialism. A defined project, a skill you need for three months, or peak load alongside a small internal team are all reasonable. So is starting: hiring a team before you know whether the product has demand is a large fixed cost against an unproven assumption.",
      "The hybrid is common and works when ownership is clear. Internal architecture and priorities with external delivery capacity avoids both extremes, but only if someone internal can review the work. Fully outsourced software with no internal counterpart is how organisations end up unable to change their own systems.",
      "Whichever route, ownership of code and infrastructure should sit with you from the first commit. That is what makes changing the arrangement later a decision rather than a negotiation.",
    ],
    supports: ["custom-software", "web-applications"],
    seo: {
      title: "In-House vs Outsourced Development",
      description:
        "Build a team for what is core; outsource for capacity and specialism. Why fully outsourced software with no internal counterpart goes wrong.",
      primaryTopic: "in-house vs outsourced development",
      secondaryTopics: ["development team", "software sourcing"],
      intent: "commercial",
    },
    audience: ["A2", "A7"],
    phase: "P2",
    cta: { label: "Talk through the decision", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "Is outsourcing cheaper?",
        answer:
          "Per hour, often. Over years for core software, frequently not, because knowledge does not accumulate in your organisation and each new supplier rebuilds understanding you already paid for once.",
      },
      {
        question: "What is the biggest risk of outsourcing?",
        answer:
          "Having nobody internally who can evaluate the work. Without that, quality problems surface only when something breaks, and by then the cost of the fix is much higher.",
      },
    ],
    related: [
      { label: "How to Evaluate a Software Development Partner", href: "/resources/how-to-evaluate-a-software-development-partner/", type: "DECISION" },
      { label: "Custom Software", href: "/services/custom-software/", type: "SERVICE" },
    ],
  },
  {
    slug: "no-code-vs-custom-development",
    type: "comparison",
    topic: "Software",
    title: "No-Code vs Custom Development",
    answer:
      "No-code gets something working in days and is genuinely the right answer for many internal tools. Custom development costs more and removes the ceiling. The deciding factors are volume, complexity and how long it must last.",
    body: [
      "No-code is under-used rather than over-used. An internal tool for a team of eight, an approval workflow, a form-driven process: these are frequently built as bespoke software when a no-code platform would deliver in a fraction of the time and be maintainable by the team that uses it.",
      "The ceilings are real and arrive suddenly. Performance at volume, logic complex enough to become unreadable in a visual editor, integrations the platform does not support, and pricing that scales with records or users. Hitting one usually means rebuilding rather than extending.",
      "Portability is the risk most often ignored. Business logic expressed in a proprietary editor cannot be exported, version-controlled or reviewed like code, and a platform's pricing or ownership change becomes a rebuild you did not plan.",
      "The pragmatic sequence is to prototype in no-code, learn what the process actually needs, and rebuild only the parts that hit a ceiling. Starting with custom development on an unvalidated process is how the expensive version of the wrong thing gets built.",
    ],
    supports: ["custom-software", "workflow-automation"],
    seo: {
      title: "No-Code vs Custom Development",
      description:
        "No-code is right more often than teams admit. Where the ceilings arrive, why portability is the ignored risk, and the pragmatic sequence.",
      primaryTopic: "no-code vs custom development",
      secondaryTopics: ["low-code", "internal tools"],
      intent: "commercial",
    },
    audience: ["A2", "A6"],
    phase: "P2",
    cta: { label: "Talk through the decision", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "When does no-code stop working?",
        answer:
          "At volume, when logic becomes too complex to read in a visual editor, when an integration is not supported, or when per-record pricing outgrows the value. Those ceilings usually require a rebuild rather than an extension.",
      },
      {
        question: "Can we start with no-code and migrate later?",
        answer:
          "Often the best route, provided you expect to. Treat it as a prototype that teaches you the requirements, rather than as a permanent system that will be replaced under pressure.",
      },
    ],
    related: [
      { label: "Minimum Viable Product", href: "/resources/what-is-a-minimum-viable-product/", type: "GLOSSARY" },
      { label: "Automation Platforms", href: "/technologies/automation-platforms/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "chatbot-vs-ai-agent",
    type: "comparison",
    topic: "AI",
    title: "Chatbot vs AI Agent",
    answer:
      "A chatbot answers questions. An agent can take actions: looking things up, updating records, completing steps. The difference is permissions, and permissions are where the risk sits.",
    body: [
      "A chatbot grounded in your documentation is a retrieval problem: find the right passage, answer from it, cite it, escalate when confidence is low. It is comparatively safe because the worst failure is an unhelpful answer.",
      "An agent decides what to do next and acts. That is far more useful and introduces a category of failure a chatbot cannot have: a confident, incorrect action against real data. Whether that matters depends entirely on what it is permitted to touch.",
      "The practical rule is to scope by reversibility. Reading data, drafting a reply for approval, classifying a request: cheap to get wrong. Issuing refunds, changing records, sending external communication unsupervised: expensive, and appropriate only with narrow permissions and an audit trail.",
      "Most businesses should start with the chatbot shape and add actions individually as each proves reliable. Starting with a broadly-permissioned agent is how the first serious incident happens before anyone has calibrated their trust.",
    ],
    supports: ["ai-chatbots", "ai-agents"],
    seo: {
      title: "Chatbot vs AI Agent",
      description:
        "A chatbot answers; an agent acts. Why the difference is permissions, how to scope by reversibility, and why to start with the safer shape.",
      primaryTopic: "chatbot vs ai agent",
      secondaryTopics: ["AI agents", "conversational AI"],
      intent: "commercial",
    },
    audience: ["A6", "A7"],
    phase: "P1",
    cta: { label: "Read about AI Agents", href: "/services/ai-agents/", tier: "T1" },
    faqs: [
      {
        question: "Which should we build first?",
        answer:
          "Usually the chatbot shape: grounded answers with escalation. Add actions one at a time as each proves reliable, rather than granting broad permissions before anyone knows how often it is wrong.",
      },
      {
        question: "What actions should never be automated?",
        answer:
          "Irreversible or regulated ones without human approval: payments, contractual commitments, external communication that cannot be retracted. Reversibility is a better test than complexity.",
      },
    ],
    related: [
      { label: "AI Agent", href: "/resources/what-is-an-ai-agent/", type: "GLOSSARY" },
      { label: "AI Chatbots", href: "/services/ai-chatbots/", type: "SERVICE" },
    ],
  },
  {
    slug: "rag-vs-fine-tuning",
    type: "comparison",
    topic: "AI",
    title: "RAG vs Fine-Tuning",
    answer:
      "Retrieval supplies facts at question time and updates when the documents do. Fine-tuning teaches format and behaviour and fixes it into the model. Use retrieval for what is true and fine-tuning for how output should look.",
    body: [
      "Retrieval is the right default for business content. It cites its source, updates the moment the underlying document changes, and makes wrong answers diagnosable: you can see which passage was used. That traceability is usually worth more than any quality gain from tuning.",
      "Fine-tuning is for form. Consistent output structure, a specific tone, or a classification task where examples teach the behaviour better than instructions can. It genuinely outperforms prompting for those, and it is the wrong tool for facts.",
      "Fine-tuned facts go stale invisibly. A price, a policy or a product detail baked into weights keeps being recited confidently after it changes, with no signal that it is outdated. Retrieval has no equivalent failure because it reads the current document.",
      "Cost and maintenance differ too. Retrieval needs a curated corpus and a good chunking strategy; fine-tuning needs quality training examples, evaluation, and repetition whenever the base model updates. For most business applications, retrieval first and tuning only if a specific quality gap remains.",
    ],
    supports: ["ai-agents", "ai-consulting"],
    seo: {
      title: "RAG vs Fine-Tuning",
      description:
        "Retrieval for facts, fine-tuning for form. Why tuned facts go stale invisibly, and how the maintenance burden differs.",
      primaryTopic: "rag vs fine-tuning",
      secondaryTopics: ["retrieval augmented generation", "LLM"],
      intent: "informational",
    },
    audience: ["A7"],
    phase: "P2",
    cta: { label: "Read about AI Consulting", href: "/services/ai-consulting/", tier: "T1" },
    faqs: [
      {
        question: "Can we use both?",
        answer:
          "Yes, and sophisticated systems often do: fine-tuning for consistent output format, retrieval for the facts inside it. Start with retrieval, because it solves the more common problem.",
      },
      {
        question: "Why is our fine-tuned model giving outdated answers?",
        answer:
          "Because the facts are in the weights rather than in a document it reads. They were correct at training time and there is no mechanism telling the model they have changed.",
      },
    ],
    related: [
      { label: "Retrieval-augmented generation", href: "/resources/what-is-retrieval-augmented-generation/", type: "GLOSSARY" },
      { label: "Fine-Tuning", href: "/resources/what-is-fine-tuning/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "data-warehouse-vs-spreadsheets",
    type: "comparison",
    topic: "Data",
    title: "Data Warehouse vs Spreadsheets",
    answer:
      "Spreadsheets are the right tool for exploration and small volumes, and they remain so for longer than technology vendors suggest. A warehouse earns its place when several sources and repeated questions make manual assembly unreliable.",
    body: [
      "Spreadsheets win on speed, flexibility and universal literacy. A question answered once, or a model built to test an idea, does not justify a pipeline. Businesses that jump to a platform for questions they ask twice a year buy maintenance they do not need.",
      "They stop working for identifiable reasons: the same report rebuilt every month by hand, several people holding different versions, figures that cannot be reproduced because the steps live in someone's memory, and volumes that make the file slow or fragile.",
      "The tipping point is repetition combined with sources. One system and a monthly question is a spreadsheet. Four systems and a weekly question that three people need to agree on is a warehouse, because the manual assembly is now both a cost and a source of error.",
      "The transition rarely goes well without first agreeing definitions. A warehouse built while people still disagree about what counts as an order will encode one version and produce confident numbers the other half of the business does not accept.",
    ],
    supports: ["business-intelligence", "reporting-dashboards"],
    seo: {
      title: "Data Warehouse vs Spreadsheets",
      description:
        "Spreadsheets remain right for longer than vendors suggest. The identifiable signs they have stopped working, and the definitions problem underneath.",
      primaryTopic: "data warehouse vs spreadsheets",
      secondaryTopics: ["reporting", "business intelligence"],
      intent: "commercial",
    },
    audience: ["A8", "A2"],
    phase: "P2",
    cta: { label: "Read about Reporting Dashboards", href: "/services/reporting-dashboards/", tier: "T1" },
    faqs: [
      {
        question: "When do spreadsheets become a liability?",
        answer:
          "When the same report is rebuilt manually every period, when several versions circulate, or when the steps to produce a figure exist only in someone's memory. Each is a continuity risk as much as an efficiency one.",
      },
      {
        question: "Can we keep using spreadsheets alongside a warehouse?",
        answer:
          "Yes, and most organisations do. The warehouse becomes the agreed source; spreadsheets remain the tool for exploring it. The problem is only when they are the source.",
      },
    ],
    related: [
      { label: "Data Warehouse", href: "/resources/what-is-a-data-warehouse/", type: "GLOSSARY" },
      { label: "Replace spreadsheet processes", href: "/use-cases/replace-spreadsheet-processes/", type: "USE CASE" },
    ],
  },
  {
    slug: "native-vs-web-apps",
    type: "comparison",
    topic: "Web",
    title: "Native Apps vs Web Apps",
    answer:
      "A web application is reachable by URL, findable in search and updated instantly. A native app can use device capabilities and work offline, at the cost of installation, store review and platform-specific work.",
    body: [
      "The install barrier decides most cases. Someone will open a link; asking them to download an app for an occasional interaction loses most of them. For anything used infrequently or discovered through search, web is the honest answer.",
      "Native earns its place through capability and frequency: offline operation, push notifications, camera or sensor access, background processing, and use often enough that an icon on the home screen is a convenience rather than clutter.",
      "Discoverability is the trade people underestimate. Content inside an app is not on the web: it cannot be crawled, ranked, cited in an AI answer or linked to. Anything that should be found belongs on the site regardless of what else exists.",
      "Cross-platform frameworks sit between the two, giving one codebase and near-native capability with a performance ceiling most business applications never approach. The remaining case for fully native is sustained graphics or deep platform integration.",
    ],
    supports: ["web-applications", "custom-software"],
    seo: {
      title: "Native Apps vs Web Apps",
      description:
        "Install friction against device capability. Why discoverability is the underestimated trade, and where cross-platform frameworks fit.",
      primaryTopic: "native vs web app",
      secondaryTopics: ["mobile apps", "PWA"],
      intent: "commercial",
    },
    audience: ["A7", "A2"],
    phase: "P2",
    cta: { label: "Read about Mobile Platforms", href: "/technologies/mobile-platforms/", tier: "T1" },
    faqs: [
      {
        question: "Do we need an app or a website?",
        answer:
          "A website, unless you need offline use, push notifications or device hardware and people will use it often enough to install it. An app used occasionally loses most of its potential audience at the download step.",
      },
      {
        question: "Can an app help us get found?",
        answer:
          "Not in search. App content is not on the web, so it cannot be crawled, ranked or cited. Discoverability has to come from the site regardless.",
      },
    ],
    related: [
      { label: "Mobile Platforms", href: "/technologies/mobile-platforms/", type: "TECHNOLOGY" },
      { label: "Web Applications", href: "/services/web-applications/", type: "SERVICE" },
    ],
  },
  {
    slug: "organic-vs-paid-social",
    type: "comparison",
    topic: "Marketing",
    title: "Organic vs Paid Social",
    answer:
      "Organic social builds an audience you can reach repeatedly but reaches only a fraction of it. Paid social buys precise reach that stops when spending stops. For most B2B businesses, neither is a primary acquisition channel.",
    body: [
      "Organic reach on the major platforms is a small share of followers, because the platforms sell distribution. Building an audience still has value (for credibility, recruitment and staying visible to people who already know you) but treating it as free distribution misunderstands the business model of the platform.",
      "Paid social is precise and immediate, and it interrupts rather than intercepts. Unlike search, the person was not looking for you, so it works best for problems people do not know are solvable, and worse for high-consideration purchases someone is actively researching.",
      "For most B2B businesses both are supporting channels. Search intercepts existing demand and usually converts better; social builds familiarity that makes the later search more likely to end with your name. Judging social on last-click conversions will always conclude it does not work.",
      "The honest question is whether your buyers are on the platform in a buying frame of mind. Where they are, social can be primary. Where they are not, it is brand maintenance, and it should be budgeted as such rather than as acquisition.",
    ],
    supports: ["performance-marketing", "digital-strategy"],
    seo: {
      title: "Organic vs Paid Social",
      description:
        "Organic reaches a fraction of your audience; paid interrupts rather than intercepts. Why last-click measurement always condemns social.",
      primaryTopic: "organic vs paid social",
      secondaryTopics: ["social media strategy", "paid social"],
      intent: "commercial",
    },
    audience: ["A3", "A1"],
    phase: "P2",
    cta: { label: "Read about Performance Marketing", href: "/services/performance-marketing/", tier: "T1" },
    faqs: [
      {
        question: "Why does our organic social reach so few followers?",
        answer:
          "Because platforms sell distribution. Organic reach is a small share of followers by design, and it has trended downward for years. Treating it as free distribution misreads the business model.",
      },
      {
        question: "Should a B2B business invest in social?",
        answer:
          "As a supporting channel for credibility and familiarity, usually yes. As a primary acquisition channel, only where buyers genuinely research on the platform, which is worth checking before committing budget.",
      },
    ],
    related: [
      { label: "SEO vs Paid Search", href: "/resources/seo-vs-paid-search/", type: "COMPARISON" },
      { label: "Marketing Attribution", href: "/resources/what-is-marketing-attribution/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "agency-vs-freelancer",
    type: "comparison",
    topic: "Company",
    title: "Agency vs Freelancer",
    answer:
      "A freelancer gives you one specialist at lower cost with direct access. An agency gives breadth, continuity and cover when someone is unavailable. The deciding factor is how many disciplines the work genuinely needs.",
    body: [
      "For a single well-defined discipline, a good freelancer is frequently the better value: no account management layer, direct communication with the person doing the work, and lower cost. Where the requirement is 'a technical SEO specialist for eight weeks', that is usually the right answer.",
      "Work spanning several disciplines is where it breaks down. A site that needs technical engineering, content, design and analytics either requires several freelancers coordinated by you, or an agency that coordinates internally. The coordination is real work, and someone pays for it either way.",
      "Continuity is the other difference. A freelancer taking a holiday, a new contract or a sick week pauses the work; an agency covers. For anything time-critical or ongoing, that matters more than the day rate difference.",
      "The failure mode for both is identical: no internal owner. Whether recommendations come from one person or a team, they need someone inside who can prioritise and approve. Without that, both arrangements produce documents.",
    ],
    supports: ["digital-strategy"],
    seo: {
      title: "Agency vs Freelancer",
      description:
        "One specialist at lower cost against breadth and continuity. How many disciplines the work needs, and the failure mode both share.",
      primaryTopic: "agency vs freelancer",
      secondaryTopics: ["hiring", "supplier selection"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P2",
    cta: { label: "See How We Work", href: "/how-we-work/", tier: "T1" },
    faqs: [
      {
        question: "Is a freelancer always cheaper?",
        answer:
          "Per day, usually. Not necessarily overall, once coordination across several specialists falls to you and gaps appear when one is unavailable. The comparison should include your own time.",
      },
      {
        question: "When is an agency clearly the better choice?",
        answer:
          "When the work genuinely spans several disciplines, when continuity matters, or when you need a specialism intermittently rather than continuously.",
      },
    ],
    related: [
      { label: "How to Choose a Digital Growth Partner", href: "/resources/how-to-choose-a-digital-growth-partner/", type: "DECISION" },
      { label: "In-House SEO vs Agency SEO", href: "/resources/in-house-seo-vs-agency-seo/", type: "COMPARISON" },
    ],
  },
];
