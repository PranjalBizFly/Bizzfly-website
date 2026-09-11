/**
 * Glossary — commercial and data terms.
 *
 * The vocabulary that appears in growth and technology conversations and is
 * usually left undefined. Definition first, then what it changes in practice.
 */

import type { Resource } from "@/types/content";

export const businessGlossary: Resource[] = [
  {
    slug: "what-is-conversion-rate",
    type: "glossary",
    topic: "Conversion",
    title: "Conversion Rate",
    answer:
      "Conversion rate is the proportion of visitors who complete a defined action (an enquiry, a signup, a purchase) expressed as a percentage. It is only meaningful when the action and the population being measured are both stated.",
    body: [
      "The number is meaningless without its denominator. A 2% rate across all traffic and a 2% rate among visitors who reached a pricing page describe completely different businesses. Comparing your rate to an industry benchmark is almost always comparing two differently-defined numbers.",
      "It can improve for bad reasons. Cutting spend on broad discovery traffic raises conversion rate while reducing total enquiries; so does adding friction that deters the undecided. Rate should be read alongside volume and enquiry quality, or it will reward the wrong changes.",
      "Segmenting is where the useful information is. Conversion by device, by source and by landing page usually reveals one specific failure (a form that breaks on mobile, a campaign sending unqualified traffic) that an aggregate figure conceals entirely.",
    ],
    supports: ["conversion-rate-optimisation", "analytics-implementation"],
    seo: {
      title: "What Is Conversion Rate?",
      description:
        "Conversion rate is meaningless without its denominator. Why it can improve for bad reasons and why segmentation holds the useful information.",
      primaryTopic: "conversion rate",
      secondaryTopics: ["CRO", "analytics", "measurement"],
      intent: "informational",
    },
    audience: ["A3", "A1"],
    phase: "P1",
    cta: {
      label: "Read about Conversion Rate Optimisation",
      href: "/services/conversion-rate-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "What is a good conversion rate?",
        answer:
          "There is no portable answer. It depends on traffic mix, offer, price point and how the action is defined. Your own rate over time, segmented by source and device, is far more useful than any benchmark.",
      },
      {
        question: "Why did our conversion rate rise while enquiries fell?",
        answer:
          "Usually because broad top-of-funnel traffic was reduced. The remaining visitors are more qualified, so the percentage rises while the absolute number falls, which is why rate should never be read alone.",
      },
    ],
    related: [
      {
        label: "Website Conversion Checklist",
        href: "/resources/website-conversion-checklist/",
        type: "CHECKLIST",
      },
      {
        label: "Improve website conversion",
        href: "/use-cases/improve-website-conversion/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-is-customer-lifetime-value",
    type: "glossary",
    topic: "Analytics",
    title: "Customer Lifetime Value",
    answer:
      "Customer lifetime value is the total profit expected from a customer across the whole relationship, rather than from the first transaction. It sets the ceiling on what acquiring a customer can rationally cost.",
    body: [
      "It changes which channels look viable. A channel that appears expensive against first-order value can be clearly profitable against lifetime value, and businesses that only measure the first transaction systematically underinvest in acquisition, and are outbid by competitors who do the fuller arithmetic.",
      "It should be built on margin, not revenue, and on observed retention rather than hoped-for retention. The most common error is using an optimistic assumed lifespan, which produces a large number that justifies overspending until cash flow disagrees.",
      "It is also a segmentation tool. Average lifetime value across all customers usually hides a wide distribution, and knowing which segments are worth several times the average is more actionable than the average itself: it tells you who to acquire more of.",
    ],
    supports: ["business-intelligence", "analytics-implementation"],
    seo: {
      title: "What Is Customer Lifetime Value?",
      description:
        "Lifetime value sets the ceiling on acquisition cost. Why margin and observed retention matter, and why the average hides the useful information.",
      primaryTopic: "customer lifetime value",
      secondaryTopics: ["CLV", "unit economics", "acquisition cost"],
      intent: "informational",
    },
    audience: ["A2", "A8", "A3"],
    phase: "P1",
    cta: {
      label: "Read about Business Intelligence",
      href: "/services/business-intelligence/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How do we calculate lifetime value?",
        answer:
          "Start with average margin per order, multiplied by observed purchase frequency and observed retention period. Use what the data shows rather than an assumed lifespan; optimistic assumptions are how this number justifies overspending.",
      },
      {
        question: "Why does lifetime value matter for marketing?",
        answer:
          "It sets what you can rationally pay to acquire a customer. Businesses measuring only the first transaction underinvest and lose auctions to competitors who understand the full value.",
      },
    ],
    related: [
      {
        label: "Marketing Attribution",
        href: "/resources/what-is-marketing-attribution/",
        type: "GLOSSARY",
      },
      {
        label: "Business Intelligence",
        href: "/services/business-intelligence/",
        type: "SERVICE",
      },
    ],
  },
  {
    slug: "what-is-machine-learning",
    type: "glossary",
    topic: "AI",
    title: "Machine Learning",
    answer:
      "Machine learning is the practice of building systems that derive their rules from data rather than having those rules written by a programmer. The system learns a pattern from examples and applies it to new cases.",
    body: [
      "It is the broader field that generative AI sits inside. Classifying an email, forecasting demand, scoring a lead and detecting an anomaly are all machine learning, and most of them use far simpler and cheaper methods than a language model.",
      "The dependency is data. A model learns from examples, so it needs enough of them, labelled correctly, representing the situations it will meet. Where a business lacks that history, machine learning is not yet the answer regardless of how well suited the problem sounds.",
      "It also inherits whatever is in the examples. A model trained on past decisions reproduces the patterns in those decisions, including the ones nobody intended to encode, which is why the question of what the training data represents matters more than the choice of algorithm.",
    ],
    supports: ["ai-consulting", "business-intelligence"],
    seo: {
      title: "What Is Machine Learning?",
      description:
        "Systems that derive rules from data rather than being programmed. Why data availability decides feasibility and why training data carries its own bias.",
      primaryTopic: "machine learning",
      secondaryTopics: ["ML", "AI", "predictive models"],
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
        question: "Is machine learning the same as AI?",
        answer:
          "Machine learning is a subset of artificial intelligence, and generative AI is a subset of machine learning. Many business problems described as AI are better solved with simpler, cheaper machine learning methods.",
      },
      {
        question: "How much data do we need?",
        answer:
          "It depends on the problem, but the harder constraint is usually quality rather than quantity: correctly labelled examples that represent the situations the system will actually meet.",
      },
    ],
    related: [
      {
        label: "Large language model",
        href: "/resources/what-is-a-large-language-model/",
        type: "GLOSSARY",
      },
      { label: "AI Stack", href: "/technologies/ai-stack/", type: "TECHNOLOGY" },
    ],
  },
  {
    slug: "what-is-prompt-engineering",
    type: "glossary",
    topic: "AI",
    title: "Prompt Engineering",
    answer:
      "Prompt engineering is the practice of writing instructions and context for a language model so it produces reliable, useful output: specifying the task, the format, the constraints and what to do when unsure.",
    body: [
      "It is closer to specification writing than to a trick. The gains come from stating the task precisely, giving relevant context, showing an example of the expected output, and defining what the model should do when it lacks information, not from a magic phrase.",
      "In production it becomes an engineering artefact rather than a message someone types. Prompts get versioned, tested against a set of known inputs, and changed deliberately, because a small edit can alter behaviour across every case the system handles.",
      "Its limits are worth stating. A prompt cannot supply information the model does not have; that requires retrieval. It cannot make output deterministic. And it cannot make a model reliable on a task it is fundamentally unsuited to, which is a design problem, not a wording problem.",
    ],
    supports: ["ai-consulting", "ai-agents"],
    seo: {
      title: "What Is Prompt Engineering?",
      description:
        "Writing instructions and context so a model produces reliable output. Why it is specification writing, and the three things a prompt cannot fix.",
      primaryTopic: "prompt engineering",
      secondaryTopics: ["LLM", "AI implementation"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: {
      label: "Read about AI Consulting",
      href: "/services/ai-consulting/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Can a better prompt fix wrong answers?",
        answer:
          "Only when the cause is ambiguity in the instruction. If the model lacks the information, the fix is retrieval; if the task is unsuited to the model, the fix is a different design.",
      },
      {
        question: "Should prompts be version controlled?",
        answer:
          "Yes, in any production system. A prompt determines behaviour across every request, so it should be versioned, tested against known inputs and changed as deliberately as code.",
      },
    ],
    related: [
      {
        label: "Retrieval-augmented generation",
        href: "/resources/what-is-retrieval-augmented-generation/",
        type: "GLOSSARY",
      },
      {
        label: "Hallucination (AI)",
        href: "/resources/what-is-hallucination-in-ai/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-fine-tuning",
    type: "glossary",
    topic: "AI",
    title: "Fine-Tuning",
    answer:
      "Fine-tuning further trains an existing model on your own examples so it adopts a particular style, format or task behaviour. It teaches the model how to respond, not what is currently true.",
    body: [
      "The distinction from retrieval is the one that matters commercially. Retrieval supplies facts at question time and updates the moment the underlying documents change. Fine-tuning bakes patterns into the model's weights, where they are fixed until it is trained again.",
      "That makes it a poor way to teach facts and a good way to teach form. Consistent output structure, a particular tone, or a specialised classification task are reasonable uses. Product details, prices and policies are not: they change, and a fine-tuned model will keep confidently reciting the old version.",
      "It also has costs that outlast the project: preparing quality training examples, evaluating the result, and repeating the exercise whenever the base model is updated or the requirement shifts. For most business applications, retrieval over current documents is the better first architecture.",
    ],
    supports: ["ai-consulting", "ai-agents"],
    seo: {
      title: "What Is Fine-Tuning?",
      description:
        "Fine-tuning teaches a model how to respond, not what is true. Why retrieval is usually the better first architecture for business facts.",
      primaryTopic: "fine-tuning",
      secondaryTopics: ["LLM", "RAG", "model training"],
      intent: "informational",
    },
    audience: ["A7"],
    phase: "P1",
    cta: {
      label: "Read about AI Consulting",
      href: "/services/ai-consulting/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Should we fine-tune a model on our documents?",
        answer:
          "Usually not for factual content. Facts change, and fine-tuned facts go stale invisibly. Use retrieval for what is true and fine-tuning only for how output should be shaped.",
      },
      {
        question: "When is fine-tuning worth it?",
        answer:
          "When you need consistent format or tone at volume, or a specialised classification task where examples teach the behaviour better than instructions do, and where the maintenance cost is understood.",
      },
    ],
    related: [
      {
        label: "Retrieval-augmented generation",
        href: "/resources/what-is-retrieval-augmented-generation/",
        type: "GLOSSARY",
      },
      {
        label: "Large language model",
        href: "/resources/what-is-a-large-language-model/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-middleware",
    type: "glossary",
    topic: "Software",
    title: "Middleware",
    answer:
      "Middleware is software that sits between systems and handles the work of connecting them (translating formats, routing messages, retrying failures), so each system does not need to know about the others.",
    body: [
      "Without it, integrations are built point to point, and the number of connections grows far faster than the number of systems. Five systems connected directly to each other is ten connections, each with its own error handling and each needing changes when any system changes.",
      "A middle layer changes that shape. Each system connects once, to the layer, which handles translation and routing centrally. Adding a sixth system becomes one connection rather than five, and the retry, logging and error-handling logic exists in one place rather than being reimplemented each time.",
      "It is not free. It is another component to run, monitor and understand, and it can become a bottleneck or a single point of failure if it is treated as an afterthought. For two or three systems, direct integration is usually simpler and correct.",
    ],
    supports: ["systems-integration", "custom-software"],
    seo: {
      title: "What Is Middleware?",
      description:
        "Middleware connects systems centrally so each connects once rather than to every other. When the shape pays off and when it is overkill.",
      primaryTopic: "middleware",
      secondaryTopics: ["integration architecture", "message routing"],
      intent: "informational",
    },
    audience: ["A7"],
    phase: "P1",
    cta: {
      label: "Read about Systems Integration",
      href: "/services/systems-integration/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Do we need middleware?",
        answer:
          "Not for two or three systems, where direct integration is simpler. It starts to pay off as the number of connected systems grows and the point-to-point connections become more numerous than the systems themselves.",
      },
      {
        question: "Is middleware a single point of failure?",
        answer:
          "It can be, which is why monitoring, retries and a documented recovery path matter more here than in a point-to-point integration. Treating it as infrastructure rather than glue is the difference.",
      },
    ],
    related: [
      {
        label: "Systems Integration",
        href: "/services/systems-integration/",
        type: "SERVICE",
      },
      {
        label: "Connect business systems",
        href: "/use-cases/connect-business-systems/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-is-structured-content",
    type: "glossary",
    topic: "Web",
    title: "Structured Content",
    answer:
      "Structured content is content stored as discrete, labelled fields rather than as a single block of formatted text, so a title, an answer, a date and a relationship each exist as data that can be used independently.",
    body: [
      "The difference shows up when content has to be reused. A page stored as one rich-text blob can only be displayed as that page. The same content stored as fields can populate a listing, a search result, a structured data block and an API response without anyone rewriting it.",
      "It is also what makes consistency possible at scale. When every service page has the same fields, every one of them gets the same heading structure, the same schema and the same related-content logic automatically, rather than depending on whoever wrote it remembering.",
      "The cost is up front. Deciding the content model requires knowing what the content is for, and a model that is too rigid becomes an obstacle when a page genuinely needs to be different. The useful balance is structuring what repeats and leaving room for what does not.",
    ],
    supports: ["corporate-websites"],
    seo: {
      title: "What Is Structured Content?",
      description:
        "Content stored as labelled fields rather than a formatted blob. Why it enables reuse and consistency, and where rigidity becomes a cost.",
      primaryTopic: "structured content",
      secondaryTopics: ["content model", "CMS", "content strategy"],
      intent: "informational",
    },
    audience: ["A4", "A7"],
    phase: "P1",
    cta: {
      label: "Read about Content Platforms",
      href: "/technologies/content-platforms/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How is structured content different from schema markup?",
        answer:
          "Structured content is how content is stored and managed. Schema markup is one of the outputs it makes easy to generate reliably, because the fields already exist separately rather than needing to be extracted from prose.",
      },
      {
        question: "Does structured content help with AI search?",
        answer:
          "Indirectly and substantially. Consistent fields produce consistent headings, answers and structured data across every page, which is exactly what makes content reliably extractable.",
      },
    ],
    related: [
      {
        label: "Schema Markup",
        href: "/resources/what-is-schema-markup/",
        type: "GLOSSARY",
      },
      {
        label: "Headless CMS",
        href: "/resources/what-is-a-headless-cms/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-a-data-warehouse",
    type: "glossary",
    topic: "Analytics",
    title: "Data Warehouse",
    answer:
      "A data warehouse is a central store that brings together data from several operational systems in a consistent structure, so it can be analysed together rather than queried separately in each source.",
    body: [
      "Operational systems are built to run a process, not to answer questions about it. Querying them directly for analysis is slow, competes with live operations, and produces figures that disagree because each system defines its terms differently. A warehouse exists to resolve both problems.",
      "The hard part is not storage; it is agreement. Deciding what a customer is, when an order counts as complete, and which system is authoritative for each field is where most of the effort goes, and those are business decisions dressed as technical ones.",
      "It is not always the right first step. A business with two systems and a handful of recurring questions is often better served by a small number of well-defined reports. Warehouses justify themselves when the number of sources and the number of questions both grow.",
    ],
    supports: ["business-intelligence", "analytics-implementation"],
    seo: {
      title: "What Is a Data Warehouse?",
      description:
        "A central store combining data from several systems consistently. Why agreement is harder than storage, and when it is not yet worth building.",
      primaryTopic: "data warehouse",
      secondaryTopics: ["business intelligence", "reporting", "data platform"],
      intent: "informational",
    },
    audience: ["A7", "A8", "A2"],
    phase: "P1",
    cta: {
      label: "Read about Business Intelligence",
      href: "/services/business-intelligence/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Do we need a data warehouse?",
        answer:
          "Only when several sources and a growing set of questions make separate reporting unworkable. With two systems and a few recurring questions, well-defined reports are cheaper and faster to trust.",
      },
      {
        question: "Why do our systems report different numbers?",
        answer:
          "Because each defines its terms differently: what counts as an order, when a customer is active, which date is used. Resolving those definitions is the real work, and it is a business decision rather than a technical one.",
      },
    ],
    related: [
      {
        label: "Business Intelligence",
        href: "/services/business-intelligence/",
        type: "SERVICE",
      },
      {
        label: "Connect business systems",
        href: "/use-cases/connect-business-systems/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-is-a-digital-growth-engine",
    type: "glossary",
    topic: "Digital Growth",
    title: "Digital Growth Engine",
    answer:
      "A digital growth engine is the connected system that turns demand into revenue repeatedly: visibility that brings the right people, a site that convinces them, a route that captures them, and operations that can absorb them.",
    body: [
      "The term is useful because it insists on the connection. Most businesses have the components in isolation (someone doing SEO, a website, a CRM, an operations team), with no one accountable for whether they work as one system. The weakest link sets the output regardless of how good the others are.",
      "That framing changes where effort goes. If enquiries arrive and are answered in three days, more visibility makes the customer experience worse rather than better. If the site converts poorly, more traffic amplifies the leak. The useful question is always which link is currently binding.",
      "It also implies measurement across the whole chain rather than per channel. Visibility, engagement, enquiry, qualification and fulfilment each need a number, because a fall at the end is frequently caused by something at the beginning, and channel-level reporting cannot see that.",
    ],
    supports: ["digital-strategy", "conversion-rate-optimisation"],
    seo: {
      title: "What Is a Digital Growth Engine?",
      description:
        "The connected system turning demand into revenue: visibility, persuasion, capture and capacity. Why the weakest link sets the output.",
      primaryTopic: "digital growth engine",
      secondaryTopics: ["growth strategy", "demand generation"],
      intent: "informational",
    },
    audience: ["A1", "A2", "A3"],
    phase: "P1",
    cta: {
      label: "Read about Digital Strategy",
      href: "/services/digital-strategy/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Where do most growth engines break?",
        answer:
          "Most often between enquiry and response, and between demand and capacity. Both sit outside marketing, which is why channel-level reporting rarely surfaces them.",
      },
      {
        question: "Is this just a marketing funnel?",
        answer:
          "It extends further. A funnel usually ends at the enquiry; a growth engine includes whether the business can fulfil the demand well, because growth that degrades delivery does not compound.",
      },
    ],
    related: [
      {
        label: "Digital Growth Audit Checklist",
        href: "/resources/digital-growth-audit-checklist/",
        type: "CHECKLIST",
      },
      {
        label: "Digital growth methodology",
        href: "/company/digital-growth-methodology/",
        type: "COMPANY",
      },
    ],
  },
];
