/**
 * Glossary — AI, automation and software terms.
 *
 * Definition first, in plain language, for readers who are technical decision
 * makers but not necessarily specialists. Nothing here describes BizzFly's
 * own stack; that lives under /technologies/ where it can be verified.
 */

import type { Resource } from "@/types/content";

export const technologyGlossary: Resource[] = [
  {
    slug: "what-is-a-large-language-model",
    type: "glossary",
    topic: "AI",
    title: "Large Language Model (LLM)",
    answer:
      "A large language model is a system trained on very large amounts of text to predict likely continuations of language. That single capability is what lets it summarise, answer, translate, classify and draft.",
    body: [
      "The mechanism is prediction, not retrieval. A model does not look up an answer in a database; it produces text that is statistically plausible given everything it has seen and the prompt in front of it. Understanding that one fact explains most of the behaviour that surprises people.",
      "It explains fluency without reliability. The same process that produces a well-formed sentence produces a well-formed sentence that is wrong, with no internal signal distinguishing the two. Confidence in the output is a property of the language, not of the facts.",
      "It also explains why grounding matters. A model given relevant source material at the time of the question performs very differently from one asked to answer from training alone. This is why serious business applications retrieve context first rather than trusting recall.",
      "For a business the practical question is rarely 'how good is the model'. It is 'what does it have access to, what happens when it is unsure, and who is accountable for the answer'. Those are design decisions, not model choices.",
    ],
    supports: ["ai-consulting", "ai-agents"],
    seo: {
      title: "What Is a Large Language Model (LLM)?",
      description:
        "An LLM predicts likely continuations of text. Why that explains fluent-but-wrong answers, why grounding matters, and the questions that actually matter.",
      primaryTopic: "large language model",
      secondaryTopics: ["LLM", "generative AI", "AI"],
      intent: "informational",
    },
    audience: ["A7", "A2"],
    phase: "P1",
    cta: {
      label: "Read about AI Consulting",
      href: "/services/ai-consulting/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Why do language models make things up?",
        answer:
          "Because they generate plausible text rather than retrieving verified facts. When the training data is thin or the prompt is ambiguous, the most plausible continuation can be false, and the model has no separate mechanism telling it so.",
      },
      {
        question: "Do we need to train our own model?",
        answer:
          "Almost never. For most business problems, a hosted model given access to your own documents at question time performs better than a fine-tuned one, at a fraction of the cost and maintenance burden.",
      },
    ],
    related: [
      {
        label: "Retrieval-augmented generation",
        href: "/resources/what-is-retrieval-augmented-generation/",
        type: "GLOSSARY",
      },
      { label: "AI Consulting", href: "/services/ai-consulting/", type: "SERVICE" },
    ],
  },
  {
    slug: "what-is-retrieval-augmented-generation",
    type: "glossary",
    topic: "AI",
    title: "Retrieval-Augmented Generation (RAG)",
    answer:
      "Retrieval-augmented generation is a pattern where a system searches your own documents for relevant passages and gives them to a language model as context, so the answer is grounded in your material rather than the model's memory.",
    body: [
      "The sequence is simple. A question arrives; the system retrieves the passages most relevant to it from a body of content you control; those passages are supplied to the model along with the question; the model composes an answer from what it was given.",
      "It is usually the right first architecture for business use. It keeps answers tied to source material you can point at, it updates the moment the underlying documents change, and it makes citation possible — the system can show which passage an answer came from.",
      "The quality ceiling is retrieval, not the model. If the right passage is not found, no model will produce a correct answer from what it did receive. Most disappointing RAG systems are retrieval problems wearing an AI costume: badly chunked documents, missing content, or a corpus nobody curated.",
      "The design decision that matters most is the confidence boundary. A system that answers everything will answer wrongly at the edges. A system that escalates to a person when retrieval is weak, carrying the full context with it, is the one businesses can actually stand behind.",
    ],
    supports: ["ai-agents", "ai-chatbots", "ai-consulting"],
    seo: {
      title: "What Is Retrieval-Augmented Generation (RAG)?",
      description:
        "RAG grounds AI answers in your own documents by retrieving relevant passages first. Why retrieval quality is the real ceiling, and why escalation matters.",
      primaryTopic: "retrieval augmented generation",
      secondaryTopics: ["RAG", "grounding", "AI agents"],
      intent: "informational",
    },
    audience: ["A7", "A6"],
    phase: "P1",
    cta: {
      label: "Read about AI Agents",
      href: "/services/ai-agents/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is RAG better than fine-tuning?",
        answer:
          "For factual, changing business content, usually yes. RAG updates when the documents update and can cite its source. Fine-tuning teaches style and format well but bakes facts into the model, where they go stale and cannot be traced.",
      },
      {
        question: "Why does our AI assistant still give wrong answers?",
        answer:
          "Most often the retrieval step failed rather than the model. Check whether the correct passage exists in the corpus at all, whether it was chunked so the answer survives intact, and whether the system escalates instead of guessing when confidence is low.",
      },
    ],
    related: [
      { label: "AI Agents", href: "/services/ai-agents/", type: "SERVICE" },
      {
        label: "Vector search",
        href: "/resources/what-is-vector-search/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-vector-search",
    type: "glossary",
    topic: "AI",
    title: "Vector Search",
    answer:
      "Vector search finds content by meaning rather than by matching words. Text is converted into numeric representations, and results are the passages whose representations sit closest to the query's.",
    body: [
      "Keyword search matches characters: a query for 'invoice not paid' misses a document that says 'outstanding remittance'. Vector search compares meaning, so conceptually similar passages are found even when they share no vocabulary.",
      "The conversion step is an embedding — a model that turns a passage into a list of numbers positioned so that similar meanings land near each other. Search then becomes a proximity problem in that space.",
      "It is not strictly better than keyword search, and the best systems use both. Vector search is weak exactly where precision matters: product codes, names, part numbers and any query where the literal string is the point. Hybrid retrieval covers both cases.",
      "The practical failure mode is chunking. Documents are split before embedding, and if a split lands mid-argument, the retrieved passage answers half a question. How content is divided usually affects answer quality more than which embedding model was chosen.",
    ],
    supports: ["ai-agents", "ai-consulting"],
    seo: {
      title: "What Is Vector Search?",
      description:
        "Vector search finds content by meaning rather than matching words. How embeddings work, where keyword search still wins, and why chunking decides quality.",
      primaryTopic: "vector search",
      secondaryTopics: ["embeddings", "semantic search", "RAG"],
      intent: "informational",
    },
    audience: ["A7"],
    phase: "P1",
    cta: {
      label: "Read about AI Agents",
      href: "/services/ai-agents/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Does vector search replace keyword search?",
        answer:
          "No. It handles meaning well and exact strings badly. Product codes, names and reference numbers are found more reliably by keyword matching, which is why hybrid retrieval is the usual production answer.",
      },
      {
        question: "What is an embedding?",
        answer:
          "A numeric representation of a passage, produced by a model, positioned so that passages with similar meaning are close together. Comparing embeddings is what makes search by meaning possible.",
      },
    ],
    related: [
      {
        label: "Retrieval-augmented generation",
        href: "/resources/what-is-retrieval-augmented-generation/",
        type: "GLOSSARY",
      },
      { label: "AI Stack", href: "/technologies/ai-stack/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "what-is-an-ai-agent",
    type: "glossary",
    topic: "AI",
    title: "AI Agent",
    answer:
      "An AI agent is a system that uses a language model to decide which actions to take toward a goal — calling tools, querying systems, and continuing over several steps — rather than producing a single block of text.",
    body: [
      "The difference from a chatbot is the ability to act. A chatbot answers. An agent can look up an order, check a policy, draft a reply and, where permitted, complete a step in a process — deciding at each point what to do next.",
      "That capability is exactly what makes boundaries the whole design problem. An agent given broad permissions and vague instructions is a system that will eventually take a confident, incorrect action against real data. The useful question is never how autonomous it can be, but which actions it may take unsupervised and what happens at the edge of that set.",
      "Well-built agents are narrow. A defined task, a small set of tools, explicit permissions, a clear confidence boundary, and an escalation path that hands a person the full context rather than a bare failure.",
      "Reliability comes from constraint, not capability. Most agent projects that disappoint were scoped by what the technology could theoretically do rather than by which decision a business was willing to delegate.",
    ],
    supports: ["ai-agents", "ai-consulting", "workflow-automation"],
    seo: {
      title: "What Is an AI Agent?",
      description:
        "An AI agent decides which actions to take toward a goal, not just what to say. Why boundaries are the design problem and why narrow agents work best.",
      primaryTopic: "AI agent",
      secondaryTopics: ["agents", "AI automation", "tool use"],
      intent: "informational",
    },
    audience: ["A6", "A7", "A2"],
    phase: "P1",
    cta: {
      label: "Read about AI Agents",
      href: "/services/ai-agents/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How is an AI agent different from a chatbot?",
        answer:
          "A chatbot produces replies. An agent can take actions — querying systems, calling tools, completing steps — and decides which to take next. That makes permissions and escalation the central design questions.",
      },
      {
        question: "Are AI agents safe to put in front of customers?",
        answer:
          "Only with defined boundaries. A narrow task, limited permissions, grounded answers and an escalation path to a person when confidence is low. Broad autonomy over real data without those controls is where agent projects go wrong.",
      },
    ],
    related: [
      { label: "AI Agents", href: "/services/ai-agents/", type: "SERVICE" },
      {
        label: "Introduce AI into operations",
        href: "/use-cases/introduce-ai-into-operations/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-is-hallucination-in-ai",
    type: "glossary",
    topic: "AI",
    title: "Hallucination (AI)",
    answer:
      "A hallucination is output that is fluent and confident but false — an invented citation, a policy that does not exist, a figure with no source. It is a normal consequence of how generative models work, not a malfunction.",
    body: [
      "Because a model generates plausible continuations rather than retrieving verified facts, a false statement can be produced by exactly the same process as a true one. There is no internal flag separating them, which is why the tone of a wrong answer is indistinguishable from a right one.",
      "The risk concentrates where the model is least constrained: questions outside its training, questions about your specific business, and anything requiring a precise figure, date or reference. These are also, unhelpfully, the questions businesses most want answered.",
      "Mitigation is architectural. Ground answers in retrieved source material, keep the corpus curated, show the source alongside the answer so a reader can check it, and define a confidence boundary below which the system escalates rather than guesses.",
      "It cannot be eliminated, and any supplier claiming otherwise is describing a system they have not stress-tested. The realistic goal is to make errors rare, visible and recoverable — and to keep humans accountable for decisions that matter.",
    ],
    supports: ["ai-consulting", "ai-chatbots"],
    seo: {
      title: "What Is Hallucination in AI?",
      description:
        "A hallucination is fluent, confident, false output. Why it happens, where the risk concentrates, and the architectural mitigations that actually reduce it.",
      primaryTopic: "AI hallucination",
      secondaryTopics: ["AI accuracy", "grounding", "LLM risk"],
      intent: "informational",
    },
    audience: ["A2", "A7", "A8"],
    phase: "P1",
    cta: {
      label: "Read about AI Consulting",
      href: "/services/ai-consulting/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Can hallucination be eliminated?",
        answer:
          "No. It can be made rare, visible and recoverable through grounding, source citation and escalation at low confidence. A supplier promising elimination is describing something they have not tested properly.",
      },
      {
        question: "Where is the risk highest?",
        answer:
          "On questions about your own business that the model was never trained on, and on anything requiring an exact figure, date or reference. Those are the cases that most need retrieval and a visible source.",
      },
    ],
    related: [
      {
        label: "Retrieval-augmented generation",
        href: "/resources/what-is-retrieval-augmented-generation/",
        type: "GLOSSARY",
      },
      { label: "AI Chatbots", href: "/services/ai-chatbots/", type: "SERVICE" },
    ],
  },
  {
    slug: "what-is-robotic-process-automation",
    type: "glossary",
    topic: "Automation",
    title: "Robotic Process Automation (RPA)",
    answer:
      "Robotic process automation uses software to perform the interface actions a person would perform — opening applications, copying values, clicking through screens — to complete a repetitive task without changing the underlying systems.",
    body: [
      "RPA works at the surface. Rather than integrating two systems through their data layers, it drives the screens a person drives. That is its whole appeal: it can automate a process across software that offers no integration options, without touching either system.",
      "It is also its whole weakness. Anything driven through an interface breaks when the interface changes. A relabelled field or a new confirmation dialog stops the automation, often silently, and maintenance becomes a permanent cost rather than a one-off build.",
      "It earns its place in specific circumstances: legacy software with no API, a vendor system you cannot modify, a process that must be automated now while a proper integration is planned. Used deliberately for those reasons it is pragmatic engineering.",
      "It becomes a liability when used to avoid fixing the process. Automating a bad process at the interface layer preserves every step that should have been removed, and adds a fragile dependency on top.",
    ],
    supports: ["workflow-automation", "systems-integration"],
    seo: {
      title: "What Is Robotic Process Automation (RPA)?",
      description:
        "RPA automates interface actions rather than integrating systems. Where it genuinely earns its place, and why it becomes a maintenance liability.",
      primaryTopic: "robotic process automation",
      secondaryTopics: ["RPA", "business automation", "legacy systems"],
      intent: "informational",
    },
    audience: ["A6", "A7"],
    phase: "P1",
    cta: {
      label: "Read about Workflow Automation",
      href: "/services/workflow-automation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is RPA the same as workflow automation?",
        answer:
          "No. RPA drives user interfaces to mimic a person. Workflow automation connects systems through their data and events. Where an integration is possible it is almost always more durable than driving screens.",
      },
      {
        question: "When is RPA the right choice?",
        answer:
          "When the system genuinely offers no integration path — old vendor software you cannot modify — and the process is stable. Treat it as a bridge with an owner and a maintenance budget, not a permanent architecture.",
      },
    ],
    related: [
      {
        label: "Workflow Automation",
        href: "/services/workflow-automation/",
        type: "SERVICE",
      },
      {
        label: "Automation vs manual operations",
        href: "/resources/automation-vs-manual-operations/",
        type: "COMPARISON",
      },
    ],
  },
  {
    slug: "what-is-an-api",
    type: "glossary",
    topic: "Software",
    title: "API",
    answer:
      "An API is a defined way for one piece of software to request something from another — retrieving data, creating a record, triggering an action — through a documented contract rather than through a human interface.",
    body: [
      "The contract is the important part. An API states what can be asked, in what format, what comes back, and what happens when something fails. Because that contract is explicit, two systems built by different teams at different times can work together reliably.",
      "It is what makes integration durable. An interface changes when a vendor redesigns a screen; a published API is versioned, with deprecation notice, precisely because other systems depend on it. This is the difference between an integration that survives and one that breaks at the next update.",
      "APIs are also how most modern software is assembled. Payments, messaging, mapping, document generation and AI models are all consumed this way, which is why 'can it integrate' is now a procurement question rather than a technical detail.",
      "The questions worth asking about any system are consistent: is there an API at all, is it documented, is it versioned, what are the rate limits, and how does it authenticate. A system that fails those is a system that will be expensive to connect later.",
    ],
    supports: ["systems-integration", "custom-software"],
    seo: {
      title: "What Is an API?",
      description:
        "An API is a documented contract letting software request things from other software. Why the contract makes integration durable, and what to ask of any system.",
      primaryTopic: "API",
      secondaryTopics: ["integration", "software architecture"],
      intent: "informational",
    },
    audience: ["A7", "A2"],
    phase: "P1",
    cta: {
      label: "Read about Systems Integration",
      href: "/services/systems-integration/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Why does it matter whether a system has an API?",
        answer:
          "Because it decides how expensive that system is to connect to anything else. Without one, integration means driving screens or exporting files — both fragile. With one, the connection is a documented contract that survives updates.",
      },
      {
        question: "What is the difference between an API and a webhook?",
        answer:
          "An API is something you call when you want data. A webhook is something that calls you when an event happens. Most integrations use both: webhooks to learn that something changed, APIs to fetch the detail.",
      },
    ],
    related: [
      {
        label: "Systems Integration",
        href: "/services/systems-integration/",
        type: "SERVICE",
      },
      {
        label: "Webhook",
        href: "/resources/what-is-a-webhook/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-a-webhook",
    type: "glossary",
    topic: "Software",
    title: "Webhook",
    answer:
      "A webhook is an automated message one system sends to another when something happens — an order placed, a form submitted, a payment received — so the receiving system can react immediately instead of checking repeatedly.",
    body: [
      "The distinction from an API call is direction. With an API, your system asks; with a webhook, the other system tells you. That inversion is what makes near-real-time automation possible without constant polling.",
      "Polling is the alternative and it is wasteful. Checking every minute for an event that happens twice a day means thousands of pointless requests, and still a delay of up to a minute. A webhook arrives when the event does.",
      "Webhooks introduce their own failure modes, which is where most amateur integrations break. Messages can arrive twice, arrive out of order, or fail to arrive if the receiver is briefly down. Production integrations handle duplicates safely, verify the message really came from the sender, and provide a way to recover missed events.",
      "The practical test of an integration's quality is what happens when the receiver is offline for ten minutes. A well-built one catches up; a fragile one silently loses the events.",
    ],
    supports: ["systems-integration", "workflow-automation"],
    seo: {
      title: "What Is a Webhook?",
      description:
        "A webhook is a message sent when an event happens, so systems react immediately instead of polling. The failure modes that break amateur integrations.",
      primaryTopic: "webhook",
      secondaryTopics: ["integration", "events", "automation"],
      intent: "informational",
    },
    audience: ["A7", "A6"],
    phase: "P1",
    cta: {
      label: "Read about Systems Integration",
      href: "/services/systems-integration/",
      tier: "T1",
    },
    faqs: [
      {
        question: "What happens if a webhook fails to deliver?",
        answer:
          "That depends on the sender. Good ones retry with backoff; others send once and forget. A robust integration assumes delivery is unreliable and provides a reconciliation path to catch anything missed.",
      },
      {
        question: "Are webhooks secure?",
        answer:
          "Only if verified. A webhook endpoint is a public URL, so the receiver must confirm the message genuinely came from the expected sender — usually through a signature — before acting on it.",
      },
    ],
    related: [
      { label: "API", href: "/resources/what-is-an-api/", type: "GLOSSARY" },
      {
        label: "Connect business systems",
        href: "/use-cases/connect-business-systems/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-is-technical-debt",
    type: "glossary",
    topic: "Software",
    title: "Technical Debt",
    answer:
      "Technical debt is the accumulated cost of implementation choices that were quicker at the time but make future change harder. Like financial debt, it is not inherently bad — it becomes a problem when nobody is tracking the interest.",
    body: [
      "Some debt is deliberate and rational: shipping a simpler version to learn whether anyone wants the feature, with a plan to revisit. Some is accidental, accumulated through turnover, deadline pressure and decisions made without the context to know better.",
      "The interest shows up as slowness. Estimates inflate for no visible reason, small changes require touching many files, releases become risky, and the team spends more of each week on maintenance than on anything new. Those symptoms are usually visible to a business long before anyone names the cause.",
      "The wrong response is a rewrite. Full rewrites take longer than expected, freeze delivery while they run, and reliably reintroduce bugs the original had already fixed. They are occasionally correct and usually a way of avoiding a harder diagnosis.",
      "The workable response is incremental: identify the parts that change most often, improve those first, and pay debt down as a normal part of delivery rather than as a project that has to be argued for separately.",
    ],
    supports: ["custom-software", "web-applications"],
    seo: {
      title: "What Is Technical Debt?",
      description:
        "Technical debt is the future cost of quicker implementation choices. How it shows up as slowness, and why incremental repayment beats a rewrite.",
      primaryTopic: "technical debt",
      secondaryTopics: ["software maintenance", "legacy code", "refactoring"],
      intent: "informational",
    },
    audience: ["A7", "A2"],
    phase: "P1",
    cta: {
      label: "Read about Custom Software Development",
      href: "/services/custom-software/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Should we rewrite our legacy system?",
        answer:
          "Usually not first. Rewrites freeze delivery, take longer than planned and lose behaviour the original had already got right. Incremental replacement of the parts that change most often is lower risk and delivers value sooner.",
      },
      {
        question: "How do we explain technical debt to a board?",
        answer:
          "In delivery terms rather than code terms: how long a typical change takes now versus a year ago, and how much of the team's time goes to maintenance rather than new work. Those are the numbers debt actually moves.",
      },
    ],
    related: [
      {
        label: "Custom Software Development",
        href: "/services/custom-software/",
        type: "SERVICE",
      },
      {
        label: "Our Engineering Standards",
        href: "/technologies/engineering-standards/",
        type: "TECHNOLOGY",
      },
    ],
  },
  {
    slug: "what-is-a-headless-cms",
    type: "glossary",
    topic: "Web",
    title: "Headless CMS",
    answer:
      "A headless CMS stores and manages content without controlling how it is displayed. Content is delivered through an API, and a separate front end decides how it is presented on a website, an app or anywhere else.",
    body: [
      "Traditional systems couple editing and rendering: the same platform holds the content and produces the pages, usually through themes and templates. A headless system separates them, exposing content as data and leaving presentation entirely to whatever consumes it.",
      "The benefits are real where they apply. One content source can feed a website, a mobile app and a partner integration. Front-end technology can change without migrating content. Performance is easier to control because the rendering layer is not constrained by the platform's assumptions.",
      "The costs are equally real and often understated. Two systems to run instead of one, preview and editing experiences that need building rather than inheriting, and a hard dependency on developers for changes that a marketer could previously make alone.",
      "The honest test is whether content genuinely has more than one destination, or whether the front end has requirements the platform cannot meet. A single marketing website with a small team is usually served better by a mature traditional platform.",
    ],
    supports: ["corporate-websites", "web-applications"],
    seo: {
      title: "What Is a Headless CMS?",
      description:
        "A headless CMS manages content without controlling presentation, delivering it by API. The real benefits, the understated costs, and when it is overkill.",
      primaryTopic: "headless CMS",
      secondaryTopics: ["content management", "web architecture"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Corporate Websites",
      href: "/services/corporate-websites/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is a headless CMS better for SEO?",
        answer:
          "Not inherently. It makes fast, server-rendered output easier to achieve, which helps. It also makes it easy to build a front end that renders only in the browser, which is worse for search and AI crawlers than a traditional platform.",
      },
      {
        question: "Do we need one?",
        answer:
          "Only if content genuinely serves more than one destination, or the front end has requirements a conventional platform cannot meet. For one website and a small team, the extra moving parts rarely pay for themselves.",
      },
    ],
    related: [
      {
        label: "Content Platforms",
        href: "/technologies/content-platforms/",
        type: "TECHNOLOGY",
      },
      {
        label: "Headless vs traditional CMS",
        href: "/resources/headless-vs-traditional-cms/",
        type: "COMPARISON",
      },
    ],
  },
  {
    slug: "what-is-server-side-rendering",
    type: "glossary",
    topic: "Web",
    title: "Server-Side Rendering",
    answer:
      "Server-side rendering means the HTML for a page is produced on the server and sent complete to the browser, rather than being assembled in the browser by JavaScript after the page loads.",
    body: [
      "The distinction decides what a machine sees. A server-rendered page arrives as readable HTML: content is present in the initial response. A client-rendered page arrives as a near-empty shell plus instructions, and the content exists only once JavaScript has run.",
      "For crawlers this is the difference between being read and being skipped. Search engines can execute JavaScript, but do so on a delay and inconsistently. Many AI crawlers execute little or none, which means client-only content can be effectively invisible to exactly the systems that increasingly decide whether a business is found.",
      "It also affects the first impression. A server-rendered page shows content as soon as it arrives; a client-rendered one shows a blank area or a spinner until the bundle downloads, parses and executes — worst on the slower devices most visitors actually use.",
      "This is not an argument against JavaScript. It is an argument about where the first render happens. Modern frameworks render on the server and enhance in the browser, which gives both machine readability and interactivity.",
    ],
    supports: ["website-performance", "technical-seo", "corporate-websites"],
    seo: {
      title: "What Is Server-Side Rendering?",
      description:
        "Server-side rendering sends complete HTML rather than assembling it in the browser. Why it decides whether AI crawlers can read a site at all.",
      primaryTopic: "server-side rendering",
      secondaryTopics: ["SSR", "JavaScript SEO", "web performance"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Website Performance",
      href: "/services/website-performance/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Can search engines read JavaScript sites?",
        answer:
          "Google can, on a delay and not always completely. Many AI crawlers do far less, or none. Content that exists only after JavaScript runs is at real risk of being invisible to the systems that assemble answers.",
      },
      {
        question: "Is server-side rendering slower?",
        answer:
          "For the visitor, usually the opposite: content appears without waiting for a bundle to download and execute. It puts more work on the server, which is a cost question rather than a user-experience one.",
      },
    ],
    related: [
      { label: "Web Stack", href: "/technologies/web-stack/", type: "TECHNOLOGY" },
      {
        label: "Core Web Vitals",
        href: "/resources/what-is-core-web-vitals/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-marketing-attribution",
    type: "glossary",
    topic: "Analytics",
    title: "Marketing Attribution",
    answer:
      "Marketing attribution is the practice of assigning credit for a conversion to the marketing interactions that preceded it, so spending decisions can be based on contribution rather than on whichever channel happened to be last.",
    body: [
      "The problem it addresses is that buying journeys are plural. Someone reads an article, searches the brand a week later, clicks an ad, then arrives directly and enquires. Crediting the enquiry entirely to the final click describes the last step, not the reason.",
      "Every model is a simplification with a bias. Last-click over-credits capture channels such as brand search. First-click over-credits discovery. Linear treats a passing visit as equal to a decisive one. Data-driven models are better but need volume, and remain estimates rather than measurements.",
      "Measurement has also become harder rather than easier. Privacy controls, cross-device journeys and searches that end without a click all remove signal. Attribution now describes a decreasing share of what actually happened, and treating it as complete is a mistake.",
      "The workable posture is to use attribution directionally, corroborate it with evidence it cannot see — branded search volume, direct arrivals, what buyers say when asked — and reserve precision for decisions that genuinely need it.",
    ],
    supports: ["analytics-implementation", "performance-marketing"],
    seo: {
      title: "What Is Marketing Attribution?",
      description:
        "Attribution assigns conversion credit across marketing interactions. Why every model is biased, why measurement is shrinking, and how to use it honestly.",
      primaryTopic: "marketing attribution",
      secondaryTopics: ["analytics", "conversion tracking", "measurement"],
      intent: "informational",
    },
    audience: ["A3", "A8"],
    phase: "P1",
    cta: {
      label: "Read about Analytics Implementation",
      href: "/services/analytics-implementation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Which attribution model should we use?",
        answer:
          "Whichever you understand the bias of, applied consistently. Comparing the same decision under two models is more informative than trusting one. Switching models to make a channel look better is how attribution stops being useful.",
      },
      {
        question: "Why does attributed revenue not match actual revenue?",
        answer:
          "Because attribution only sees tracked interactions. Privacy controls, cross-device journeys and zero-click searches all remove signal, so the attributed figure is a subset of reality, not a reconciliation of it.",
      },
    ],
    related: [
      {
        label: "Analytics Implementation",
        href: "/services/analytics-implementation/",
        type: "SERVICE",
      },
      {
        label: "How to measure search visibility",
        href: "/resources/how-to-measure-search-visibility/",
        type: "GUIDE",
      },
    ],
  },
];
