/**
 * Methodology pages.
 *
 * How the work is actually run, stated in enough detail that a prospective
 * client can judge it before committing. No team sizes, no founding dates,
 * no certifications, no client counts — none of those are verified, and a
 * methodology page does not need them to be useful.
 */

import type { CompanyPage } from "@/types/content";

export const methodologyPages: CompanyPage[] = [
  {
    slug: "discovery-process",
    section: "about",
    title: "Discovery process",
    eyebrow: "Methodology",
    answer:
      "Discovery establishes which constraint is actually binding before anything is proposed. It runs for roughly two weeks, produces a written diagnosis, and the findings are yours whether or not the engagement continues.",
    body: [
      "The purpose of discovery is to be able to say what is wrong with confidence. That sounds obvious, and it is the step most commonly skipped: proposals are frequently written from a briefing call, which means the plan reflects what the client already believed rather than what the evidence shows.",
      "We look at four layers in order — whether you can be found, whether what people find is credible, whether it converts, and whether the operation behind it can absorb more demand. The order matters, because a constraint at an earlier layer makes work at a later one worthless.",
      "The output is a written diagnosis: what the binding constraint appears to be, what evidence supports that, what we would do about it, and what we would not do. It includes the things we think are fine, which is usually the part clients find most useful.",
      "Discovery is deliberately separable. It is scoped and priced on its own so that continuing is a decision made with the findings in hand rather than a commitment made before them. If the conclusion is that you do not need us, that is a legitimate result and we will say so.",
    ],
    seo: {
      title: "Discovery process",
      description:
        "Two weeks to establish which constraint is actually binding, four layers examined in order, and a written diagnosis you keep either way.",
      primaryTopic: "discovery process",
      secondaryTopics: ["diagnosis", "engagement process"],
      intent: "commercial",
    },
    audience: ["A2", "A8"],
    phase: "P1",
    cta: {
      label: "Start with a diagnostic",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["digital-strategy"],
    related: [
      { label: "Our approach", href: "/company/approach/", type: "COMPANY" },
      {
        label: "Digital growth audit checklist",
        href: "/resources/digital-growth-audit-checklist/",
        type: "CHECKLIST",
      },
    ],
  },
  {
    slug: "digital-growth-methodology",
    section: "about",
    title: "Digital growth methodology",
    eyebrow: "Methodology",
    answer:
      "We treat growth as a sequence of constraints rather than a set of channels. The work is to find the one currently binding, remove it, and then find the next — because effort spent anywhere else does not move the outcome.",
    body: [
      "Most growth programmes are organised by channel: someone owns search, someone owns paid, someone owns content. That structure guarantees that every channel is worked on continuously, whether or not any of them is the actual constraint.",
      "The alternative is to ask what specifically is preventing growth right now. Sometimes it is visibility — nobody finds you. Sometimes visibility is fine and the site does not convert. Sometimes both are fine and enquiries are answered too slowly to close. These require entirely different work, and only one of them is limiting at a time.",
      "That framing changes what a plan looks like. Rather than a schedule of deliverables across every channel, it is a stated hypothesis about the constraint, the work that would remove it, and the measure that would show whether it worked. When the measure moves, the constraint has usually moved too.",
      "It also changes reporting. We report against the constraint we said was binding, including when the evidence says we were wrong. A programme that cannot report being wrong is one where nobody will find out for a long time.",
    ],
    seo: {
      title: "Digital growth methodology",
      description:
        "Growth as a sequence of constraints rather than a set of channels: find the binding one, remove it, then find the next.",
      primaryTopic: "digital growth methodology",
      secondaryTopics: ["growth strategy", "constraints"],
      intent: "commercial",
    },
    audience: ["A2", "A3"],
    phase: "P1",
    cta: {
      label: "Talk through your constraint",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["digital-strategy", "seo", "conversion-rate-optimization"],
    related: [
      {
        label: "Digital Strategy",
        href: "/services/digital-strategy/",
        type: "SERVICE",
      },
      { label: "Discovery process", href: "/company/discovery-process/", type: "COMPANY" },
    ],
  },
  {
    slug: "seo-methodology",
    section: "about",
    title: "SEO methodology",
    eyebrow: "Methodology",
    answer:
      "We work SEO in a fixed order — foundation, coverage, credibility, then compounding — because each stage makes the next one worth doing. Most stalled programmes are stuck at a stage they skipped.",
    body: [
      "Foundation comes first: crawlability, rendering, indexation, canonicalisation and site health. This stage produces no exciting reporting and it is where most under-performing sites are actually stuck. Publishing over a broken foundation adds pages nobody will see.",
      "Coverage follows. We map the questions your buyers ask across the whole decision, not just the transactional ones, and identify which have no page that genuinely answers them. Gaps almost always sit at the explanatory and comparative stages, because those pages never feel urgent enough to commission.",
      "Credibility is the part that cannot be manufactured from inside the site. References from places your market already trusts take time, resist shortcuts, and are the reason we will not promise a timeline that assumes they arrive on schedule.",
      "Compounding is the stage most programmes never reach. Search visibility decays as competitors publish and content ages, so a quarterly pass that updates, consolidates and prunes is usually worth more than the same effort spent producing new pages.",
      "Throughout, we report against indexation, appearance, arrival and enquiries separately, because aggregate traffic hides which of those is failing.",
    ],
    seo: {
      title: "SEO methodology",
      description:
        "Foundation, coverage, credibility, compounding — worked in order, reported in four layers, with no ranking guarantees.",
      primaryTopic: "SEO methodology",
      secondaryTopics: ["SEO process", "search visibility"],
      intent: "commercial",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: {
      label: "Talk through your site",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["seo", "technical-seo"],
    related: [
      {
        label: "How to build search visibility",
        href: "/resources/how-to-build-search-visibility/",
        type: "GUIDE",
      },
      { label: "SEO Services", href: "/services/seo/", type: "SERVICE" },
    ],
  },
  {
    slug: "ai-search-methodology",
    section: "about",
    title: "AI search methodology",
    eyebrow: "Methodology",
    answer:
      "AI visibility work removes the reasons a system would not cite you: unreachable content, an ambiguous identity, and answers that cannot survive being lifted out of context. Nobody can guarantee citation, and we do not.",
    body: [
      "We start with access, because it eliminates businesses silently. Many AI crawlers execute little or no JavaScript, so a site that renders in the browser can be invisible to them while performing acceptably in conventional search. Confirming server-rendered content and an appropriate robots policy comes before anything else.",
      "Then identity. One canonical organisation record with a stable identifier, referenced rather than repeated across templates, and details that agree across the site and every external profile. Systems resolve competing facts by weighing sources, and inconsistency is where smaller businesses lose that contest.",
      "Then answer shape. On pages that answer questions, the answer goes before the argument, in complete sentences that make sense alone, under headings phrased the way questions are actually asked. A passage that depends on its surroundings cannot be extracted or quoted.",
      "Measurement is agreed before the work starts, because sessions will not show this. We sample a fixed set of buyer questions across the assistants your market uses, repeat it on a schedule, and read it alongside branded search and direct arrivals. It is sampling rather than measurement, and we describe it as such.",
    ],
    seo: {
      title: "AI search methodology",
      description:
        "Access, identity and answer shape — the three things that remove reasons not to cite you. How we sample AI visibility, and what we will not promise.",
      primaryTopic: "AI search methodology",
      secondaryTopics: ["GEO", "AEO", "AI visibility"],
      intent: "commercial",
    },
    audience: ["A3", "A4", "A2"],
    phase: "P1",
    cta: {
      label: "Talk through AI visibility",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["ai-search-optimisation", "generative-engine-optimisation"],
    related: [
      {
        label: "How AI search works",
        href: "/resources/how-ai-search-works/",
        type: "GUIDE",
      },
      {
        label: "AI search readiness checklist",
        href: "/resources/ai-search-readiness-checklist/",
        type: "CHECKLIST",
      },
    ],
  },
  {
    slug: "website-development-process",
    section: "about",
    title: "Website development process",
    eyebrow: "Methodology",
    answer:
      "We set the non-visual requirements before design, build in increments that can be reviewed in a browser rather than a document, and treat URL continuity and rendering as delivery requirements rather than launch-week tasks.",
    body: [
      "Requirements that constrain design are agreed first: server-rendered output, performance budgets, accessible components, a content model that survives editing, and structured data. These are far cheaper to specify than to retrofit, and retrofitting them is what makes redesigns overrun.",
      "Design happens against real content, not placeholder text. Layouts that look balanced with invented copy routinely fail with the actual headings, and discovering that during build is expensive.",
      "Build proceeds in increments that are reviewable in a browser. Written specifications are a poor medium for agreeing what a page should do; a working page is a good one, and it corrects assumptions while correcting them is still cheap.",
      "Launch is planned as a monitored event. Every existing URL has a decided destination before design finishes, rendered output is compared against the old site on key templates, and indexing and structured data are verified in the first days — because the first fortnight is when a fixable problem is still cheap to fix.",
    ],
    seo: {
      title: "Website development process",
      description:
        "Non-visual requirements first, design against real content, increments reviewable in a browser, and launch treated as a monitored event.",
      primaryTopic: "website development process",
      secondaryTopics: ["web development", "launch process"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P1",
    cta: {
      label: "Talk through a build",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["corporate-websites", "website-redesign"],
    related: [
      {
        label: "Website launch checklist",
        href: "/resources/website-launch-checklist/",
        type: "CHECKLIST",
      },
      {
        label: "How to plan a website redesign",
        href: "/resources/how-to-plan-a-website-redesign/",
        type: "DECISION",
      },
    ],
  },
  {
    slug: "software-development-process",
    section: "about",
    title: "Software development process",
    eyebrow: "Methodology",
    answer:
      "We deliver software in increments that reach production, with your team owning the code and infrastructure from the first commit. Handover is a condition of the engagement rather than a phase at the end of it.",
    body: [
      "Scope starts narrow deliberately. The smallest version that replaces a real part of the current process, in production, teaches more about the requirements than any specification written before anyone has used something. Large up-front specifications are the most reliable predictor of building the wrong thing.",
      "Code lives in your repositories and infrastructure in your accounts from the beginning. Ownership arranged at the end of a project is ownership negotiated at the worst possible moment, and it is a commercial position rather than a technical necessity.",
      "Testing and review are part of delivery, not a later phase. Automated tests around the behaviour that matters and review on every change are what make the second year of a system affordable — which is where most of its total cost actually sits.",
      "Documentation is written for someone who was not there. The test we apply is whether a developer who joins afterwards can run the system locally, understand the decisions and deploy a change without asking us.",
    ],
    seo: {
      title: "Software development process",
      description:
        "Narrow first scope, code and infrastructure owned by you from the start, testing as part of delivery, and documentation written for a successor.",
      primaryTopic: "software development process",
      secondaryTopics: ["custom software", "handover", "engineering process"],
      intent: "commercial",
    },
    audience: ["A7", "A2", "A8"],
    phase: "P1",
    cta: {
      label: "Talk through a project",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["custom-software", "web-applications"],
    related: [
      {
        label: "Our Engineering Standards",
        href: "/technologies/engineering-standards/",
        type: "TECHNOLOGY",
      },
      {
        label: "How to evaluate a software development partner",
        href: "/resources/how-to-evaluate-a-software-development-partner/",
        type: "DECISION",
      },
    ],
  },
  {
    slug: "automation-approach",
    section: "about",
    title: "Automation approach",
    eyebrow: "Methodology",
    answer:
      "We simplify a process before automating it, automate the stable core rather than every exception, and decide the failure path during design. Automating a process nobody has simplified preserves every unnecessary step.",
    body: [
      "Mapping comes first, and it is observed rather than described. The documented process and the real one differ in almost every organisation, and the difference is usually where the cost sits. It is also where the disagreements surface — two people describing the same process differently is a problem to resolve before any build.",
      "Simplification follows, and it frequently returns more than the automation does. Steps that exist for reasons that no longer apply can be removed outright, which is cheaper than making them faster and leaves less to maintain.",
      "We automate the stable core and route exceptions to a person with the full context attached. Chasing complete coverage is where cost and fragility escalate sharply, and the last few percent of cases are usually the ones that most need judgement.",
      "The failure path is designed, not discovered. What happens when input is unrecognised, a system is unavailable or confidence is low is a business decision, and deciding it during design is far cheaper than learning the default behaviour during an incident.",
      "Every automation gets a named owner and a maintenance expectation, because integrations break when systems change and credentials rotate. Automations without an owner quietly stop working.",
    ],
    seo: {
      title: "Automation approach",
      description:
        "Simplify before automating, automate the stable core, design the failure path, and give every automation an owner.",
      primaryTopic: "automation approach",
      secondaryTopics: ["process automation", "workflow design"],
      intent: "commercial",
    },
    audience: ["A6", "A2"],
    phase: "P1",
    cta: {
      label: "Talk through a process",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["workflow-automation", "systems-integration"],
    related: [
      {
        label: "How to build an automation roadmap",
        href: "/resources/how-to-build-an-automation-roadmap/",
        type: "GUIDE",
      },
      {
        label: "Automation readiness checklist",
        href: "/resources/automation-readiness-checklist/",
        type: "CHECKLIST",
      },
    ],
  },
  {
    slug: "engagement-models",
    section: "about",
    title: "Engagement models",
    eyebrow: "Methodology",
    answer:
      "We work in three shapes: a fixed-scope diagnostic, a defined project with a stated outcome, and an ongoing programme with a monthly scope. Which fits depends on how well the problem is understood, not on budget.",
    body: [
      "A diagnostic is fixed in scope, price and duration. It suits situations where the constraint is genuinely unclear, and it is deliberately separable so that continuing is a decision made with findings in hand. You keep the written diagnosis whether or not anything follows.",
      "A project has a defined outcome and an end. It suits work whose shape is known — a site rebuilt, an integration delivered, a process automated. We prefer projects to be scoped narrowly enough to finish, because a project that runs for a year has usually become a programme without anyone deciding it should.",
      "A programme is ongoing work with a scope agreed each month against a stated priority. It suits compounding work such as search visibility, where the useful unit is a quarter rather than a deliverable. The risk with programmes is drift, so each month names what it is trying to move.",
      "What we avoid is the open-ended retainer with a deliverable list and no stated outcome. It is comfortable for both parties and it is the arrangement most likely to run for a year without anyone being able to say whether it worked.",
    ],
    seo: {
      title: "Engagement models",
      description:
        "A fixed-scope diagnostic, a defined project, or an ongoing programme. Which fits depends on how well the problem is understood.",
      primaryTopic: "engagement models",
      secondaryTopics: ["working together", "retainer", "project scope"],
      intent: "commercial",
    },
    audience: ["A2", "A8", "A1"],
    phase: "P1",
    cta: {
      label: "Talk through which fits",
      href: "/contact/",
      tier: "T3",
      note: "Thirty minutes on the problem, not a pitch.",
    },
    relatedServices: ["digital-strategy"],
    related: [
      { label: "How we work", href: "/company/how-we-work/", type: "COMPANY" },
      {
        label: "How to choose a digital growth partner",
        href: "/resources/how-to-choose-a-digital-growth-partner/",
        type: "DECISION",
      },
    ],
  },
];
