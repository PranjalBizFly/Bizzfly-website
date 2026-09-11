/**
 * Comparison pages.
 *
 * Each one exists because a real buyer has to choose between two options and
 * the honest answer is conditional. Every page states the conditions under
 * which each side wins, including the cases where the answer is "neither yet"
 * or "both". None of them concludes that the option BizzFly sells is always
 * correct, because that is not true and a reader can tell.
 */

import type { Resource } from "@/types/content";

export const comparisons: Resource[] = [
  {
    slug: "seo-vs-paid-search",
    type: "comparison",
    topic: "Search",
    title: "SEO vs Paid Search",
    answer:
      "Paid search buys immediate, controllable visibility that stops when spending stops. SEO builds visibility that compounds but takes months to arrive. Most businesses need both, weighted by how urgently they need demand and how long they can wait.",
    body: [
      "The economics differ in shape, not just size. Paid search has a marginal cost per click that persists forever: the thousandth visit costs roughly what the first did. SEO has a high fixed cost and a marginal cost close to zero, which is why its return improves with time and volume, and why it is a poor answer to an urgent revenue gap.",
      "Control differs too. Paid search can be switched on this afternoon, targeted precisely and turned off when a quarter goes badly. Organic position cannot be bought, bid on or scheduled, and it does not respond to pressure. That makes paid the right instrument for testing demand, seasonal peaks and launches.",
      "The strongest argument for doing both is that each answers the other's weakness. Paid data reveals which queries actually convert, which is the best possible input to an organic content plan. Organic presence reduces the share of demand you have to rent, which lowers blended acquisition cost over time.",
      "The decision is usually about runway rather than preference. A business needing enquiries this month should buy them and build organic alongside. A business with twelve months of runway that keeps renting the same demand is paying for the same visitors repeatedly.",
    ],
    supports: ["seo", "performance-marketing"],
    seo: {
      title: "SEO vs Paid Search: How to Choose",
      description:
        "Paid search buys immediate visibility; SEO compounds slowly. The economics, the control trade-off, and why the decision is usually about runway.",
      primaryTopic: "SEO vs paid search",
      secondaryTopics: ["PPC", "organic search", "marketing budget"],
      intent: "commercial",
    },
    audience: ["A1", "A3", "A2"],
    phase: "P1",
    cta: {
      label: "Talk through the mix",
      href: "/contact/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is SEO cheaper than paid search?",
        answer:
          "Over a long enough period and enough volume, usually, because its marginal cost approaches zero while paid search keeps charging per click. In the first six months it is normally more expensive per enquiry, because the investment precedes the return.",
      },
      {
        question: "Can we stop paid search once SEO works?",
        answer:
          "Sometimes, but rarely completely. Paid retains value for launches, seasonal peaks, testing new messages and defending brand queries. What usually changes is the proportion, not the presence.",
      },
    ],
    related: [
      { label: "SEO", href: "/services/seo/", type: "SERVICE" },
      {
        label: "Performance Marketing",
        href: "/services/performance-marketing/",
        type: "SERVICE",
      },
    ],
  },
  {
    slug: "seo-vs-aeo",
    type: "comparison",
    topic: "AI Search",
    title: "SEO vs AEO",
    answer:
      "SEO competes for a position in a ranked list of links. AEO competes to be the passage a system extracts and shows as the answer. They share technical foundations but reward different content shapes and are measured differently.",
    body: [
      "The unit of competition is what separates them. SEO optimises a page against a query and wins a position. AEO optimises a passage so it can be lifted out of the page and still make sense, which means the answer has to appear before the argument, in complete sentences that survive losing their context.",
      "The foundations overlap almost entirely. Both need crawlable, server-rendered content, a clear structure, and a site that is technically healthy. A page that cannot be reached or parsed fails at both. This is why AEO is rarely a separate programme; it is a discipline applied to content that also has to rank.",
      "Measurement is where teams get confused. AEO success can reduce clicks: winning the extracted answer means the reader may never arrive. Judged on sessions, a successful AEO page looks like a failure. It has to be judged on presence in answers, branded search lift and assisted conversions.",
      "The practical relationship is sequence rather than choice. Ranking gets you into the candidate set a system considers; extractable structure decides whether your passage is the one used. Doing the second without the first is optimising for a competition you have not entered.",
    ],
    supports: ["seo", "answer-engine-optimisation"],
    seo: {
      title: "SEO vs AEO: What Is the Difference?",
      description:
        "SEO wins a ranking position; AEO wins the extracted answer. Shared foundations, different content shapes, and why measuring AEO on sessions misleads.",
      primaryTopic: "SEO vs AEO",
      secondaryTopics: ["answer engine optimisation", "featured snippets"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Answer Engine Optimisation",
      href: "/services/answer-engine-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Do we need to choose between SEO and AEO?",
        answer:
          "No. They are sequential rather than alternative. Ranking puts you in the set of sources a system will consider; extractable structure decides whether your passage is used. The same page can and should do both.",
      },
      {
        question: "Does AEO reduce our traffic?",
        answer:
          "It can, on queries where the extracted answer is complete. That is a real trade, and the reason to accept it is that the alternative is a competitor's passage being shown instead of yours.",
      },
    ],
    related: [
      {
        label: "Answer Engine Optimisation",
        href: "/services/answer-engine-optimisation/",
        type: "SERVICE",
      },
      {
        label: "AEO vs GEO",
        href: "/resources/aeo-vs-geo/",
        type: "COMPARISON",
      },
    ],
  },
  {
    slug: "aeo-vs-geo",
    type: "comparison",
    topic: "AI Search",
    title: "AEO vs GEO",
    answer:
      "AEO targets extraction: a system lifting your text more or less directly as the answer. GEO targets synthesis: a model reading several sources, composing an answer and attributing some of them. The foundations overlap; the content shape and measurement differ.",
    body: [
      "Extraction rewards self-contained precision. For AEO, one passage has to carry the whole answer, because that passage may be shown alone. Length is constrained, ambiguity is fatal, and the format the question invites (paragraph, list, table) largely determines whether the passage can be used.",
      "Synthesis rewards something different: being a source worth reading among several. For GEO, a model is assembling an answer from multiple documents, so what matters is whether your material is identifiable as coming from a credible, clearly defined organisation, and whether its claims are specific enough to be worth attributing.",
      "This is why entity work matters far more to GEO than to AEO. Extraction can happen from a page whose author is unclear. Attribution requires the system to know who it is citing, which is a question about your organisation's identity across the whole web, not about one page.",
      "In practice most businesses should treat them as one programme with two tests. Can a machine lift a complete answer from this page? And can it tell, unambiguously, whose answer it is? A page that passes both is doing the available work.",
    ],
    supports: ["answer-engine-optimisation", "generative-engine-optimisation"],
    seo: {
      title: "AEO vs GEO: What Is the Difference?",
      description:
        "AEO targets extraction of your passage; GEO targets being cited in a synthesised answer. Why entity clarity matters far more to one than the other.",
      primaryTopic: "AEO vs GEO",
      secondaryTopics: ["answer engines", "generative engines", "AI citation"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Generative Engine Optimisation",
      href: "/services/generative-engine-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Should we do AEO or GEO first?",
        answer:
          "Neither in isolation. Both depend on crawlable, well-structured content and a clear organisational identity. Do that foundation, then shape individual pages for extraction where the query invites a direct answer.",
      },
      {
        question: "Which one affects AI Overviews?",
        answer:
          "Both. AI Overviews extract passages and synthesise across sources depending on the query, so the same page can be reached either way. That is a further argument for treating them as one programme.",
      },
    ],
    related: [
      {
        label: "Generative Engine Optimisation",
        href: "/services/generative-engine-optimisation/",
        type: "SERVICE",
      },
      {
        label: "SEO vs AEO",
        href: "/resources/seo-vs-aeo/",
        type: "COMPARISON",
      },
    ],
  },
  {
    slug: "traditional-search-vs-ai-search",
    type: "comparison",
    topic: "AI Search",
    title: "Traditional Search vs AI Search",
    answer:
      "Traditional search returns a ranked list of links and lets the person choose. AI search composes an answer and may cite a few sources. The first distributes attention across many results; the second concentrates it on a handful.",
    body: [
      "The behavioural change is concentration. A results page offers ten organic positions, and being fourth still earns visits. A generated answer names perhaps three sources. Position four in a list is a modest outcome; fourth-most-relevant to an assembled answer is usually invisible.",
      "The evaluation changes too. Ranking rewards relevance to a query. Synthesis rewards being a source a model can identify, trust and quote, which brings organisational clarity, consistency and specificity into scope in a way that keyword-led work never did.",
      "What has not changed is the foundation. Both surfaces need to reach your content, parse it and understand what it says. Sites that fail on crawlability, rendering or structure fail on both, which is why the first work is usually the same regardless of which surface you care about.",
      "The realistic position for most businesses is that both matter and neither is replacing the other soon. Transactional and navigational queries still resolve as lists. Explanatory and comparative queries increasingly resolve as answers. The mix depends on what your buyers actually search.",
    ],
    supports: ["ai-search-optimisation", "seo"],
    seo: {
      title: "Traditional Search vs AI Search",
      description:
        "Ranked lists distribute attention; generated answers concentrate it on a few sources. What changes, what does not, and why both still matter.",
      primaryTopic: "traditional search vs AI search",
      secondaryTopics: ["AI overviews", "search behaviour"],
      intent: "informational",
    },
    audience: ["A2", "A3"],
    phase: "P1",
    cta: {
      label: "Read about AI Search Optimisation",
      href: "/services/ai-search-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is AI search replacing traditional search?",
        answer:
          "Not wholesale. Transactional and navigational queries still resolve as lists of links. Explanatory and comparative queries increasingly resolve as generated answers. Which matters more to you depends on what your buyers search.",
      },
      {
        question: "Does our existing SEO work still count?",
        answer:
          "Most of the technical foundation does: crawlability, rendering, structure and site health serve both. What transfers least well is keyword-density-led content, which was never a strong approach and is a weak one for synthesis.",
      },
    ],
    related: [
      {
        label: "AI Search Optimisation",
        href: "/services/ai-search-optimisation/",
        type: "SERVICE",
      },
      {
        label: "Zero-Click Search",
        href: "/resources/what-is-zero-click-search/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "website-redesign-vs-rebuild",
    type: "comparison",
    topic: "Web",
    title: "Website Redesign vs Rebuild",
    answer:
      "A redesign changes how a site looks and reads on its existing platform. A rebuild replaces the underlying technology as well. The right choice depends on whether the constraint you are hitting is presentational or structural.",
    body: [
      "Diagnose before choosing. If the complaint is that the site looks dated, communicates poorly or converts badly, that is presentation and information architecture; a redesign addresses it, at materially lower cost and risk. If the complaint is that pages cannot be made fast, content cannot be structured properly, or every change requires a developer, that is the platform, and no amount of visual work will fix it.",
      "Rebuilds carry risks redesigns do not. URLs change, templates change, and rendering behaviour changes, which is why traffic loss after a rebuild is common and almost always self-inflicted rather than mysterious. Those risks are manageable with redirect mapping and parity checks, but they have to be planned for, not discovered.",
      "Cost is not the only difference. A redesign is usually weeks; a rebuild is usually months, during which normal improvement stops. That freeze is a real cost that rarely appears in the comparison.",
      "The case for rebuilding is strongest when the platform actively prevents work you need: server rendering, structured content, performance headroom, integration. Rebuilding because a site feels old is how organisations end up doing it again in three years.",
    ],
    supports: ["website-redesign", "corporate-websites"],
    seo: {
      title: "Website Redesign vs Rebuild: Which Do You Need?",
      description:
        "A redesign changes presentation; a rebuild replaces the platform. How to tell which constraint you are hitting, and the risks a rebuild carries.",
      primaryTopic: "website redesign vs rebuild",
      secondaryTopics: ["website replatform", "web development"],
      intent: "commercial",
    },
    audience: ["A1", "A3", "A7"],
    phase: "P1",
    cta: {
      label: "Read about Website Redesign",
      href: "/services/website-redesign/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How do we know if our platform is the problem?",
        answer:
          "Ask what you have wanted to do and could not. If the blocked list is about speed, content structure, rendering or integration, the platform is the constraint. If it is about layout, messaging or navigation, it is not.",
      },
      {
        question: "Will a rebuild hurt our search traffic?",
        answer:
          "It can, and most losses are avoidable. They come from unmapped URL changes, dropped content, altered rendering or removed internal links, all of which are planning failures rather than inevitable consequences.",
      },
    ],
    related: [
      {
        label: "Website Redesign",
        href: "/services/website-redesign/",
        type: "SERVICE",
      },
      {
        label: "Why Your Website Redesign Lost Traffic",
        href: "/resources/why-your-website-redesign-lost-traffic/",
        type: "ARTICLE",
      },
    ],
  },
  {
    slug: "custom-software-vs-off-the-shelf",
    type: "comparison",
    topic: "Software",
    title: "Custom Software vs Off-the-Shelf",
    answer:
      "Off-the-shelf software is cheaper, faster and maintained by someone else, but requires you to work its way. Custom software fits your process exactly and becomes your responsibility to run. The deciding question is whether the process is a genuine differentiator.",
    body: [
      "Default to buying. A mature product has absorbed years of edge cases, security work and support burden that you would otherwise fund yourself. Most business processes (accounting, payroll, CRM, helpdesk) are not differentiators, and building them is spending scarce engineering on a solved problem.",
      "Build when the process is the advantage. If the way you quote, schedule, price or fulfil is genuinely what makes the business competitive, forcing it into a product's assumptions can erode the thing customers value. That is the strongest and most honest argument for custom software.",
      "The second legitimate case is accumulated cost. Several subscriptions bridged by spreadsheets and manual re-entry can quietly exceed the cost of one fitted system, and that comparison should be made on total cost including the labour, not licence fees alone.",
      "The cost people underestimate is ownership. Custom software needs hosting, monitoring, dependency updates, security patching and someone who understands it after the original team moves on. Budgeting the build and not the decade is the most common way these projects disappoint.",
    ],
    supports: ["custom-software", "systems-integration"],
    seo: {
      title: "Custom Software vs Off-the-Shelf",
      description:
        "Buy unless the process is a genuine differentiator. The two legitimate cases for building, and the ownership cost that gets underestimated.",
      primaryTopic: "custom software vs off-the-shelf",
      secondaryTopics: ["build vs buy", "software procurement"],
      intent: "commercial",
    },
    audience: ["A2", "A7", "A8"],
    phase: "P1",
    cta: {
      label: "Read about Custom Software",
      href: "/services/custom-software/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is custom software always more expensive?",
        answer:
          "Not always, but the comparison has to include ownership over years, not just the build. Where several subscriptions are bridged by manual work, the honest total cost sometimes favours building. Where a mature product fits, it rarely does.",
      },
      {
        question: "Can we start with off-the-shelf and build later?",
        answer:
          "Often the best sequence. Using a product first teaches you which constraints genuinely hurt, which is far better evidence for a build than a requirements workshop held before anyone has felt the problem.",
      },
    ],
    related: [
      {
        label: "Custom Software",
        href: "/services/custom-software/",
        type: "SERVICE",
      },
      {
        label: "When Should You Build Custom Software?",
        href: "/resources/when-should-you-build-custom-software/",
        type: "DECISION",
      },
    ],
  },
  {
    slug: "automation-vs-manual-operations",
    type: "comparison",
    topic: "Automation",
    title: "Automation vs Manual Operations",
    answer:
      "Automation is worth it when a process is repetitive, rule-based, high-volume and stable. Manual handling remains correct where judgement, exceptions or relationships dominate, and where the process is still changing shape.",
    body: [
      "Volume and stability decide most cases. A task done fifty times a week the same way is a strong candidate. A task done twice a month with different context each time is not, however tedious it feels, because the automation will cost more to build and maintain than the time it returns.",
      "Automating an unstable process is the classic expensive mistake. If a process is still being redesigned, automation freezes the current version and makes further change harder. The right sequence is to simplify first, confirm the shape has settled, then automate, which frequently reveals that steps could be removed rather than accelerated.",
      "The realistic target is rarely total. Most processes have a stable core and a long tail of exceptions. Automating the core and routing exceptions to a person with the full context usually captures the majority of the benefit at a fraction of the complexity of trying to handle everything.",
      "Judgement work should stay manual on purpose. Pricing a difficult deal, handling a complaint, deciding an unusual case: automating these tends to produce confident wrong answers and remove the accountability that made the decision defensible.",
    ],
    supports: ["workflow-automation", "sales-automation"],
    seo: {
      title: "Automation vs Manual Operations",
      description:
        "Automate repetitive, stable, high-volume work. Why automating an unstable process is expensive, and why the core-plus-exceptions split usually wins.",
      primaryTopic: "automation vs manual operations",
      secondaryTopics: ["business automation", "process design"],
      intent: "commercial",
    },
    audience: ["A6", "A2"],
    phase: "P1",
    cta: {
      label: "Read about Workflow Automation",
      href: "/services/workflow-automation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "What should we automate first?",
        answer:
          "The most repetitive, highest-volume, most stable task with the clearest rules, not the one people complain about most. Frequency and stability predict return far better than irritation does.",
      },
      {
        question: "Should we aim to automate a process completely?",
        answer:
          "Usually not. Automating the stable core and routing exceptions to a person captures most of the value at a fraction of the complexity. Full coverage is where cost and fragility escalate sharply.",
      },
    ],
    related: [
      {
        label: "Workflow Automation",
        href: "/services/workflow-automation/",
        type: "SERVICE",
      },
      {
        label: "Reduce manual work",
        href: "/use-cases/reduce-manual-work/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "ai-automation-vs-rule-based-automation",
    type: "comparison",
    topic: "Automation",
    title: "AI Automation vs Rule-Based Automation",
    answer:
      "Rule-based automation follows explicit instructions and behaves identically every time. AI-based automation interprets ambiguous input and produces a judgement. Rules are correct wherever the logic can be written down; AI earns its place where it cannot.",
    body: [
      "Rules are underrated. They are cheap, fast, auditable and predictable: given the same input they produce the same output, and when they are wrong you can point at the line responsible. For any process whose logic can be stated, rules are the better engineering choice and the easier one to defend.",
      "AI earns its place on unstructured input. Classifying a free-text enquiry, extracting fields from a document that arrives in twenty formats, summarising a conversation: these resist explicit rules because the input varies without limit. That is the real dividing line: not complexity, but whether the logic can be written down.",
      "The trade is determinism. An AI component will occasionally be confidently wrong, and the same input can produce different output. That is acceptable when a person reviews the result or the cost of an error is low, and unacceptable when the step is irreversible or regulated.",
      "Most durable systems are hybrids. AI interprets the ambiguous part (reading the document, classifying the request), and rules handle everything downstream, so the deterministic part of the process stays deterministic and auditable.",
    ],
    supports: ["workflow-automation", "ai-agents", "ai-consulting"],
    seo: {
      title: "AI Automation vs Rule-Based Automation",
      description:
        "Rules are cheap, auditable and predictable. AI handles unstructured input. The real dividing line, the determinism trade, and why hybrids win.",
      primaryTopic: "AI automation vs rule-based automation",
      secondaryTopics: ["intelligent automation", "workflow design"],
      intent: "informational",
    },
    audience: ["A6", "A7"],
    phase: "P1",
    cta: {
      label: "Read about AI & Automation",
      href: "/services/ai-automation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "When should we use AI instead of rules?",
        answer:
          "When the input is unstructured enough that the logic cannot be written down: free text, varied documents, conversation. If you can state the rule, use a rule: it is cheaper, faster and auditable.",
      },
      {
        question: "Is AI automation less reliable?",
        answer:
          "Less deterministic, which is not the same thing. It can handle input rules cannot, but the same input may produce different output. That is why irreversible or regulated steps should stay rule-based.",
      },
    ],
    related: [
      { label: "AI & Automation", href: "/services/ai-automation/", type: "SERVICE" },
      {
        label: "Robotic process automation",
        href: "/resources/what-is-robotic-process-automation/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "in-house-seo-vs-agency-seo",
    type: "comparison",
    topic: "SEO",
    title: "In-House SEO vs Agency SEO",
    answer:
      "In-house SEO gives continuous context and full control at the cost of a narrow skill range. An agency brings breadth and pattern recognition across many sites but never knows your business as well. The right answer usually changes as a programme matures.",
    body: [
      "In-house strength is context. Someone inside the business knows the products, the customers, the internal politics and who can actually get a change deployed. That knowledge is where a great deal of SEO value comes from, and it is genuinely hard to buy.",
      "In-house weakness is breadth and volume. SEO now spans technical engineering, content, digital PR, analytics and AI visibility. One person cannot be strong across all of it, and a single hire tends to be excellent at the part they came from and thin elsewhere.",
      "Agency strength is exactly that breadth, plus pattern recognition from having seen the same failure across many sites. Agency weakness is that context has to be rebuilt for each client, and that the recommendations still need someone internal with the authority to get them shipped, which is where most agency relationships actually fail.",
      "The hybrid is common because it works: internal ownership of strategy, priorities and delivery, with external specialists for technical depth, peak capacity and independent audit. What rarely works is either extreme: an agency with no internal counterpart, or one internal generalist expected to cover everything.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "In-House SEO vs Agency SEO",
      description:
        "In-house gives context; agencies give breadth and pattern recognition. Why most agency relationships fail internally, and why the hybrid usually wins.",
      primaryTopic: "in-house SEO vs agency",
      secondaryTopics: ["SEO team", "agency selection"],
      intent: "commercial",
    },
    audience: ["A3", "A2"],
    phase: "P1",
    cta: {
      label: "Talk to us about the mix",
      href: "/contact/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Can one in-house hire cover SEO?",
        answer:
          "For a small site, often yes. As soon as the work spans technical engineering, content, analytics and AI visibility, one person will be strong in one area and thin in the rest. That is an argument for supplementing, not for replacing them.",
      },
      {
        question: "Why do agency relationships fail?",
        answer:
          "Most often because recommendations are never implemented. Without someone internal who owns priorities and can get changes deployed, an agency produces documents rather than results, which is a structural problem, not an effort one.",
      },
    ],
    related: [
      {
        label: "How to Evaluate SEO Services",
        href: "/resources/how-to-evaluate-seo-services/",
        type: "DECISION",
      },
      { label: "How We Work", href: "/how-we-work/", type: "COMPANY" },
    ],
  },
  {
    slug: "headless-vs-traditional-cms",
    type: "comparison",
    topic: "Web",
    title: "Headless vs Traditional CMS",
    answer:
      "A traditional CMS manages content and renders pages together. A headless CMS manages content and leaves rendering to a separate front end. Headless buys flexibility and multi-channel reuse at the cost of more moving parts.",
    body: [
      "Traditional platforms are integrated, which is their advantage. Editing, preview, templating and publishing arrive as one product a marketing team can operate without a developer. For a single website maintained by a small team, that integration is worth a great deal and is routinely undervalued in these comparisons.",
      "Headless separates content from presentation, which pays off when content has more than one destination (a site, an app, a partner feed), or when the front end has requirements the platform cannot meet, such as fine-grained control over rendering and performance.",
      "The understated cost is operational. Two systems to run, preview and editing experiences that have to be built rather than inherited, and a developer dependency for changes an editor could previously make alone. Teams that skip that assessment often end up with a faster site nobody can update.",
      "Search outcomes depend on the front end, not the CMS choice. Headless makes excellent server-rendered output achievable, and equally makes it easy to ship a browser-only front end that AI crawlers cannot read. The platform does not decide this; the implementation does.",
    ],
    supports: ["corporate-websites"],
    seo: {
      title: "Headless vs Traditional CMS",
      description:
        "Traditional platforms are integrated and operable by marketers. Headless buys flexibility at the cost of moving parts. Why SEO depends on the front end.",
      primaryTopic: "headless vs traditional CMS",
      secondaryTopics: ["content management", "web platform"],
      intent: "commercial",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Content Platforms",
      href: "/technologies/content-platforms/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is headless better for performance?",
        answer:
          "It makes excellent performance achievable by removing platform constraints on rendering. It does not deliver it automatically: a poorly built headless front end can easily be slower than a well-tuned traditional site.",
      },
      {
        question: "Will our marketing team still be able to edit pages?",
        answer:
          "Only if the editing and preview experience is deliberately built. This is the most common disappointment with headless projects: the site gets faster and the team loses the ability to change it without a developer.",
      },
    ],
    related: [
      {
        label: "Headless CMS",
        href: "/resources/what-is-a-headless-cms/",
        type: "GLOSSARY",
      },
      {
        label: "Content Platforms",
        href: "/technologies/content-platforms/",
        type: "TECHNOLOGY",
      },
    ],
  },
];
