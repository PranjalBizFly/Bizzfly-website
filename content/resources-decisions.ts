/**
 * Decision-support pages — the second set.
 *
 * Each is willing to conclude "not yet" or "you do not need this". A page
 * that always concludes in favour of buying is a sales page with a question
 * for a title.
 */

import type { Resource } from "@/types/content";

export const moreDecisions: Resource[] = [
  {
    slug: "when-to-hire-an-seo-specialist",
    type: "decision",
    topic: "SEO",
    title: "When to Hire an In-House SEO Specialist",
    answer:
      "Hire in-house when there is enough continuous work to occupy someone and enough internal complexity that context is the bottleneck. Below that, a specialist will spend most of their time waiting for other teams.",
    body: [
      "The strongest signal is that external recommendations keep going unimplemented. When the constraint is not knowing what to do but getting it deployed, someone internal who can navigate the organisation is worth more than more advice.",
      "The second is volume. A site publishing continuously, running experiments and managing technical debt has enough work for a full role. A brochure site with quarterly updates does not, and the hire will be under-used and eventually reassigned.",
      "The counter-signal is expecting one person to cover everything. SEO now spans technical engineering, content, digital PR, analytics and AI visibility; a single hire will be strong in the discipline they came from and thin elsewhere. That is an argument for supplementing them, not for skipping the hire.",
      "It is legitimate to conclude not yet. If nobody can currently get a change deployed, hiring a specialist to be blocked by the same obstacle adds salary to the problem rather than solving it.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "When to Hire an In-House SEO Specialist",
      description:
        "Hire when implementation is the bottleneck and there is continuous work. Why one hire cannot cover the whole discipline.",
      primaryTopic: "hire in-house seo",
      secondaryTopics: ["SEO hiring", "in-house team"],
      intent: "commercial",
    },
    audience: ["A3", "A2"],
    phase: "P1",
    cta: { label: "Talk through the gap", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "Should our first SEO hire be technical or content?",
        answer:
          "Whichever matches the binding constraint. If pages are not indexed or rendered, technical. If the site is healthy and thin, content. Hiring the discipline you are most comfortable managing is the common mistake.",
      },
      {
        question: "Can one person replace an agency?",
        answer:
          "For a small site, often. For work spanning technical engineering, content, PR and analytics, they will cover one well and the rest thinly — which is a case for both, not either.",
      },
    ],
    related: [
      { label: "In-House SEO vs Agency SEO", href: "/resources/in-house-seo-vs-agency-seo/", type: "COMPARISON" },
      { label: "When Do You Need an SEO Agency?", href: "/resources/when-do-you-need-an-seo-agency/", type: "DECISION" },
    ],
  },
  {
    slug: "when-to-replatform-a-website",
    type: "decision",
    topic: "Web",
    title: "When to Replatform a Website",
    answer:
      "Replatform when the platform actively prevents work you need to do — server rendering, structured content, performance, integration. Replatforming because the site feels dated is how organisations do it again in three years.",
    body: [
      "The diagnostic question is what you have wanted to do and could not. Write the list. If it is dominated by rendering, content structure, speed or integration, the platform is the constraint. If it is about layout, messaging or navigation, it is not, and a redesign on the existing platform is faster and far less risky.",
      "Cost of change is the other signal. When every routine update requires a developer, or a simple content change takes two weeks, the platform is imposing a tax that compounds. That is measurable and makes a better business case than appearance.",
      "Against it: a replatform freezes normal improvement for months, carries real risk to existing search visibility, and reintroduces work the current site already got right. Those costs are usually absent from the proposal that recommends it.",
      "Do not replatform and redesign simultaneously if you can avoid it. Doing both means that if traffic drops afterwards, you cannot tell which change caused it — and diagnosis becomes guesswork.",
    ],
    supports: ["website-redesign", "corporate-websites"],
    seo: {
      title: "When to Replatform a Website",
      description:
        "Replatform when the platform blocks work you need. The diagnostic list, the cost-of-change signal, and why not to redesign simultaneously.",
      primaryTopic: "when to replatform",
      secondaryTopics: ["website platform", "CMS migration"],
      intent: "commercial",
    },
    audience: ["A7", "A3"],
    phase: "P1",
    cta: { label: "Talk through the constraint", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "How do we know the platform is the problem?",
        answer:
          "List what you have wanted to do and could not. If the blocked items are about rendering, content structure, performance or integration, it is the platform. If they are about design or messaging, it is not.",
      },
      {
        question: "Will replatforming lose our rankings?",
        answer:
          "It can, and most losses are avoidable. They come from unmapped URLs, lost content depth and changed rendering — planning failures rather than inevitable consequences.",
      },
    ],
    related: [
      { label: "Website Redesign vs Rebuild", href: "/resources/website-redesign-vs-rebuild/", type: "COMPARISON" },
      { label: "Site Migration Checklist", href: "/resources/site-migration-checklist/", type: "CHECKLIST" },
    ],
  },
  {
    slug: "when-to-build-a-mobile-app",
    type: "decision",
    topic: "Software",
    title: "When to Build a Mobile App",
    answer:
      "Build an app when you need device capabilities a browser cannot reach and people will use it often enough to justify installing it. Both conditions have to hold; either alone produces an app nobody opens.",
    body: [
      "The capability test is concrete: offline operation, push notifications, camera or sensor access, background processing, or performance a browser cannot deliver. If none applies, a responsive web application does the same job without an install step.",
      "The frequency test is equally hard. Installing is a real barrier, and an icon on a home screen has to earn its place. Weekly use justifies it; occasional use does not, and 'our customers would download it' is an assumption worth testing with a web version first.",
      "The cost people underestimate is not the build but the tail: two platforms to maintain, store review on every release, operating system updates that break things annually, and support for versions people have not updated.",
      "The wrong reason is presence. An app because competitors have one, or because it signals seriousness, produces a permanent maintenance obligation and a listing with no downloads — which signals the opposite.",
    ],
    supports: ["web-applications", "custom-software"],
    seo: {
      title: "When to Build a Mobile App",
      description:
        "Two conditions must both hold: device capability you genuinely need, and frequency that justifies installing. Why presence is the wrong reason.",
      primaryTopic: "when to build a mobile app",
      secondaryTopics: ["mobile strategy", "app development"],
      intent: "commercial",
    },
    audience: ["A2", "A7"],
    phase: "P2",
    cta: { label: "Talk through the decision", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "Could a progressive web app work instead?",
        answer:
          "Often. It covers offline use and home-screen installation without store distribution, which handles a good share of cases where an app seemed necessary — though platform support for some capabilities still varies.",
      },
      {
        question: "What is the ongoing cost of an app?",
        answer:
          "Two platforms to maintain, store review on each release, annual operating system changes that break things, and support for people on old versions. It is a permanent obligation, not a project.",
      },
    ],
    related: [
      { label: "Native Apps vs Web Apps", href: "/resources/native-vs-web-apps/", type: "COMPARISON" },
      { label: "Mobile Platforms", href: "/technologies/mobile-platforms/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "when-to-invest-in-analytics",
    type: "decision",
    topic: "Analytics",
    title: "When to Invest in Analytics",
    answer:
      "Invest when there is a decision you would make differently with better data. Analytics built without a decision attached produces dashboards nobody opens and a maintenance burden nobody owns.",
    body: [
      "Start from the decision, not the data. 'Should we keep spending on this channel' and 'where do enquiries drop out of the form' are decisions that justify measurement. 'We should understand our users better' is not, and it generates the sprawling implementations that later have to be untangled.",
      "The second condition is that the decision recurs. Instrumenting for a one-off question is usually more expensive than answering it manually. Recurring decisions are where automated measurement repays the setup.",
      "The counter-signal is volume. Below a few hundred conversions a month, most differences you observe are noise, and elaborate analysis will confidently describe randomness. At that scale, talking to customers returns more than segmenting them.",
      "There is a floor worth having regardless: know where enquiries come from and whether the form works. That is a small implementation, and businesses without it are making budget decisions on impressions.",
    ],
    supports: ["analytics-implementation", "business-intelligence"],
    seo: {
      title: "When to Invest in Analytics",
      description:
        "Invest when a recurring decision would change with better data. Why low volume makes elaborate analysis describe noise, and the floor worth having.",
      primaryTopic: "when to invest in analytics",
      secondaryTopics: ["measurement", "analytics strategy"],
      intent: "commercial",
    },
    audience: ["A8", "A3"],
    phase: "P1",
    cta: { label: "Talk through what to measure", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "What is the minimum analytics setup?",
        answer:
          "Know where enquiries come from and confirm the form works. That is a small implementation and it is the difference between deciding on evidence and deciding on impressions.",
      },
      {
        question: "Do we have enough traffic for A/B testing?",
        answer:
          "Below a few hundred conversions a month, rarely. Tests will not reach significance and teams read noise as insight. At that scale, fixing clarity problems beats testing them.",
      },
    ],
    related: [
      { label: "Analytics Implementation Checklist", href: "/resources/analytics-implementation-checklist/", type: "CHECKLIST" },
      { label: "Prove marketing ROI", href: "/use-cases/prove-marketing-roi/", type: "USE CASE" },
    ],
  },
  {
    slug: "when-to-outsource-development",
    type: "decision",
    topic: "Software",
    title: "When to Outsource Development",
    answer:
      "Outsource for capacity, a specialism you need temporarily, or a defined project with a clear end. Keep in-house whatever is genuinely core, because that is where accumulated knowledge compounds.",
    body: [
      "Capacity is the cleanest case. A team that knows what to build and cannot build it fast enough loses nothing by adding hands, provided the internal team keeps architectural ownership.",
      "Specialism is the second. Work needing a skill for two months — an integration, a performance problem, an accessibility remediation — does not justify a permanent hire, and the alternative is a permanent employee learning on your project.",
      "The case against is anything core. If the software is the product, or encodes the process that differentiates you, the knowledge built while making it is an asset you want retained. Outsourcing that means paying twice: once to build, again for each supplier to relearn.",
      "Whatever the route, keep an internal counterpart who can evaluate the work. Fully outsourced software with nobody internally able to review it is how organisations lose the ability to change their own systems — and that is discovered at the worst moment.",
    ],
    supports: ["custom-software", "web-applications"],
    seo: {
      title: "When to Outsource Development",
      description:
        "Outsource capacity, temporary specialism and defined projects. Keep what is core, and always retain an internal counterpart who can review.",
      primaryTopic: "when to outsource development",
      secondaryTopics: ["outsourcing", "development capacity"],
      intent: "commercial",
    },
    audience: ["A2", "A7"],
    phase: "P2",
    cta: { label: "Talk through the split", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "What should never be outsourced?",
        answer:
          "Architectural ownership and the ability to evaluate the work. You can outsource who writes the code; you cannot outsource knowing whether it is any good without consequences.",
      },
      {
        question: "How do we protect against supplier lock-in?",
        answer:
          "Code in your repositories and infrastructure in your accounts from the first commit, plus documentation written for someone who was not there. Arrange it at the start, not at the end.",
      },
    ],
    related: [
      { label: "In-House vs Outsourced Development", href: "/resources/in-house-vs-outsourced-development/", type: "COMPARISON" },
      { label: "Software development process", href: "/company/software-development-process/", type: "COMPANY" },
    ],
  },
  {
    slug: "how-to-choose-a-cms",
    type: "decision",
    topic: "Web",
    title: "How to Choose a CMS",
    answer:
      "Choose on who edits, how often, and what the content has to feed. Feature comparisons rarely decide anything useful, because most platforms in the category can do most things.",
    body: [
      "Start with the editors. If a marketing team must publish without a developer, the editing and preview experience is the deciding criterion, and it is exactly what headless platforms trade away unless someone builds it. Getting this wrong produces a fast site nobody can update.",
      "Then frequency and volume. Daily publishing needs workflow, roles and scheduling. Quarterly updates need almost none of that, and paying for a platform built around editorial workflow is paying for governance you will not use.",
      "Then destinations. Content serving one website is a different problem from content feeding a site, an app and a partner feed. The second is the genuine case for separating content from presentation; the first usually is not.",
      "Then the constraints that are expensive to discover later: can it produce server-rendered output, can the content model be structured properly, does it expose an API, and what does migrating away look like. That last question is worth asking before signing, not after.",
    ],
    supports: ["corporate-websites", "content-strategy"],
    seo: {
      title: "How to Choose a CMS",
      description:
        "Decide on editors, frequency, destinations and the constraints that are expensive to discover late. Why feature comparisons decide little.",
      primaryTopic: "how to choose a cms",
      secondaryTopics: ["content management", "platform selection"],
      intent: "commercial",
    },
    audience: ["A4", "A7"],
    phase: "P1",
    cta: { label: "Read about Content Platforms", href: "/technologies/content-platforms/", tier: "T1" },
    faqs: [
      {
        question: "Should we go headless?",
        answer:
          "Only if content genuinely serves more than one destination, or the front end has requirements a conventional platform cannot meet. For one website and a small team, the extra moving parts rarely pay for themselves.",
      },
      {
        question: "What is the most overlooked criterion?",
        answer:
          "What migrating away looks like. Content locked in a proprietary structure with no clean export turns the next decision into a rebuild.",
      },
    ],
    related: [
      { label: "Headless vs Traditional CMS", href: "/resources/headless-vs-traditional-cms/", type: "COMPARISON" },
      { label: "Structured Content", href: "/resources/what-is-structured-content/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "how-to-set-a-digital-budget",
    type: "decision",
    topic: "Company",
    title: "How to Set a Digital Budget",
    answer:
      "Allocate against the constraint that is currently binding rather than spreading across channels. A budget divided evenly guarantees that every channel is under-funded relative to what would make it work.",
    body: [
      "Identify the binding constraint first. If nobody finds you, spending on conversion optimisation is premature. If the site converts poorly, more traffic amplifies a leak. If enquiries are answered in three days, more of them makes the customer experience worse. Only one of these limits growth at a time.",
      "Then fund it to the level that could actually move it. Channels have thresholds below which they produce nothing: a content programme of one page a month, or a paid budget too small to gather significant data, spends money without buying information.",
      "Separate the run cost from the change cost. Hosting, licences, maintenance and support are the price of continuing to exist and should not compete with growth work in the same line — otherwise maintenance gets deferred until it becomes an incident.",
      "Set a review point rather than an annual commitment. Digital constraints move: the thing limiting growth this quarter is often fixed by next, and a budget locked to last year's diagnosis funds work that has stopped being the priority.",
    ],
    supports: ["digital-strategy"],
    seo: {
      title: "How to Set a Digital Budget",
      description:
        "Fund the binding constraint rather than spreading evenly, respect channel thresholds, separate run cost from change cost, and review often.",
      primaryTopic: "digital marketing budget",
      secondaryTopics: ["budget planning", "marketing spend"],
      intent: "commercial",
    },
    audience: ["A8", "A2", "A1"],
    phase: "P1",
    cta: { label: "Talk through priorities", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "What percentage of revenue should we spend?",
        answer:
          "Benchmarks vary so widely by sector and stage that they offer little guidance. A more useful question is what the binding constraint is and what it would cost to remove it.",
      },
      {
        question: "Should budget be split evenly across channels?",
        answer:
          "No. Even splits guarantee every channel sits below the threshold where it produces useful information. Concentration on the constraint beats coverage.",
      },
    ],
    related: [
      { label: "Digital growth methodology", href: "/company/digital-growth-methodology/", type: "COMPANY" },
      { label: "How to Prioritise Digital Work", href: "/resources/how-to-prioritise-digital-work/", type: "DECISION" },
    ],
  },
  {
    slug: "how-to-brief-an-seo-agency",
    type: "decision",
    topic: "SEO",
    title: "How to Brief an SEO Agency",
    answer:
      "Bring the commercial problem, the constraints you know about, access to your data, and the decision you need to make. A brief specifying deliverables invites a quote rather than a diagnosis.",
    body: [
      "Lead with the commercial situation rather than the tactics. 'Enquiries have fallen 30% since March and we do not know why' tells a competent supplier far more than 'we need twelve blog posts a month', and it lets them tell you if the second would not fix the first.",
      "State the constraints honestly: what cannot be changed, who has to approve work, how quickly your development team can deploy, and any commitments already made. Suppliers who discover these later either miss deadlines or quietly stop recommending things that require them.",
      "Offer read access to analytics and search console during the proposal stage. Suppliers who look at data before proposing will produce a better plan, and the ones who decline to look are telling you something.",
      "Finally, name the decision. If you are choosing between rebuilding the site and improving it, say so — the brief's job is to get you an answer to that question, not a list of activities.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "How to Brief an SEO Agency",
      description:
        "Lead with the commercial problem, state real constraints, offer data access, and name the decision. Why a deliverables brief gets a quote.",
      primaryTopic: "brief an seo agency",
      secondaryTopics: ["agency brief", "RFP"],
      intent: "commercial",
    },
    audience: ["A3", "A8"],
    phase: "P1",
    cta: { label: "Send us a problem", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "Should we say our budget in the brief?",
        answer:
          "A range helps, once the problem is stated. Giving a number before describing the problem tends to produce a plan built to fit the number rather than to fix anything.",
      },
      {
        question: "Should we ask for a strategy in the pitch?",
        answer:
          "Ask how they would diagnose it and what they would need to know. A full strategy produced before any data access is a template, and it tells you less than the questions would.",
      },
    ],
    related: [
      { label: "How to Evaluate SEO Services", href: "/resources/how-to-evaluate-seo-services/", type: "DECISION" },
      { label: "Discovery Process", href: "/discovery-process/", type: "COMPANY" },
    ],
  },
  {
    slug: "how-to-audit-your-own-website",
    type: "decision",
    topic: "SEO",
    title: "How to Audit Your Own Website",
    answer:
      "You can get most of the way with a browser and a search engine: check what is indexed, view the page source, test on a phone, and complete your own enquiry form. No paid tools required.",
    body: [
      "Start with what is indexed. Search your domain with a site: query and see roughly what is listed, whether the important pages appear, and whether anything unexpected does — staging pages, duplicates, filter URLs. Surprises here are worth investigating before anything else.",
      "Then view the page source rather than the rendered page. Right-click, view source, and search for a sentence from the middle of your content. If it is not there, the content is assembled by JavaScript — which is the single most common reason a modern site underperforms with AI crawlers.",
      "Then use it on a mid-range phone on mobile data, not on your desktop. Time how long the main content takes to appear, check whether anything jumps as it loads, and see whether buttons are comfortably tappable.",
      "Then complete your own enquiry form and see what happens. Does the confirmation say anything useful, does an email arrive, how quickly does someone respond. A surprising number of forms are broken, and nobody notices because nobody submits them.",
    ],
    supports: ["seo-audit", "conversion-rate-optimisation"],
    seo: {
      title: "How to Audit Your Own Website",
      description:
        "Four checks with no paid tools: what is indexed, whether content is in the source, how it behaves on a real phone, and whether the form works.",
      primaryTopic: "audit your own website",
      secondaryTopics: ["DIY SEO", "website check"],
      intent: "informational",
    },
    audience: ["A1", "A4"],
    phase: "P1",
    cta: { label: "Read about our SEO Audit", href: "/services/seo-audit/", tier: "T1" },
    faqs: [
      {
        question: "What is the single most revealing check?",
        answer:
          "Viewing the page source and searching for a sentence from your content. If it is absent, the page is assembled in the browser, and machine readers may see nothing.",
      },
      {
        question: "Do we need paid tools?",
        answer:
          "Not for the checks above. Paid tools help with scale, competitor comparison and monitoring over time — but they will not tell you anything the four checks above miss on a small site.",
      },
    ],
    related: [
      { label: "Technical SEO Checklist", href: "/resources/technical-seo-checklist/", type: "CHECKLIST" },
      { label: "Server-Side Rendering", href: "/resources/what-is-server-side-rendering/", type: "GLOSSARY" },
    ],
  },
  {
    slug: "how-to-prioritise-digital-work",
    type: "decision",
    topic: "Company",
    title: "How to Prioritise Digital Work",
    answer:
      "Sequence by binding constraint rather than by effort or enthusiasm. The work that matters is whatever currently prevents the next unit of growth, and only one thing holds that position at a time.",
    body: [
      "Effort-versus-impact scoring is the common method and it has a flaw: it treats all impact as additive. If nobody can find you, a conversion improvement scored as high impact returns nothing, because it multiplies a number that is currently too small.",
      "The alternative is to ask what would happen if each item were completed and nothing else changed. Work that would not move the outcome on its own is not ready yet, whatever its score. That single question re-orders most backlogs.",
      "Then apply reversibility. Among items that would move the outcome, prefer the ones that are cheap to undo and quick to learn from. A three-month project that teaches you nothing until it ships is a large bet on an untested assumption.",
      "Then revisit on a cadence. Constraints move — fixing visibility makes conversion the constraint, and fixing conversion makes capacity the constraint. A roadmap fixed for a year funds work that stopped being the priority in month three.",
    ],
    supports: ["digital-strategy"],
    seo: {
      title: "How to Prioritise Digital Work",
      description:
        "Sequence by binding constraint, not effort-impact scoring. The one question that re-orders most backlogs, and why constraints move.",
      primaryTopic: "prioritise digital work",
      secondaryTopics: ["roadmap", "prioritisation"],
      intent: "commercial",
    },
    audience: ["A2", "A3"],
    phase: "P1",
    cta: { label: "Talk through the sequence", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "What is wrong with impact-effort scoring?",
        answer:
          "It assumes impacts add up independently. They do not: improving conversion when nobody visits multiplies a number that is too small. Constraint order matters more than individual scores.",
      },
      {
        question: "How often should priorities be revisited?",
        answer:
          "Quarterly for most organisations. Constraints move as each is removed, and a roadmap fixed for a year continues funding work that stopped being the priority early on.",
      },
    ],
    related: [
      { label: "Digital growth methodology", href: "/company/digital-growth-methodology/", type: "COMPANY" },
      { label: "How to Set a Digital Budget", href: "/resources/how-to-set-a-digital-budget/", type: "DECISION" },
    ],
  },
];
