/**
 * Homepage content.
 *
 * Organised around the visitor's problem rather than BizzFly's service
 * catalogue. Every entry links to a page that exists in the content model —
 * no invented destinations, no fabricated proof.
 */

export interface CapabilityGroup {
  key: string;
  label: string;
  question: string;
  summary: string;
  items: { label: string; href: string }[];
  href: string;
}

/** Section 02 — capabilities grouped by the job the visitor needs done. */
export const capabilityGroups: CapabilityGroup[] = [
  {
    key: "be-found",
    label: "Be found",
    question: "Can your buyers actually find you?",
    summary:
      "Discovery now happens across search results, AI answers and maps. Being absent from any one of them is invisible demand you never see.",
    href: "/services/search-ai-visibility/",
    items: [
      { label: "SEO", href: "/services/seo/" },
      { label: "Answer Engine Optimisation", href: "/services/answer-engine-optimisation/" },
      { label: "Generative Engine Optimisation", href: "/services/generative-engine-optimisation/" },
      { label: "AI Optimisation", href: "/services/ai-optimisation/" },
      { label: "Search Experience Optimisation", href: "/services/search-experience-optimisation/" },
      { label: "Google Business Profile", href: "/services/google-business-profile/" },
    ],
  },
  {
    key: "build",
    label: "Build",
    question: "Does what they find hold up?",
    summary:
      "Visibility sends people to a website. If that website is slow, unclear or built for a different decade, the visibility was wasted.",
    href: "/services/web-development/",
    items: [
      { label: "Website design & development", href: "/services/corporate-websites/" },
      { label: "Custom software development", href: "/services/custom-software/" },
      { label: "Web applications", href: "/services/web-applications/" },
      { label: "UI/UX design", href: "/services/ui-ux-design/" },
    ],
  },
  {
    key: "automate",
    label: "Automate",
    question: "Can you handle the demand when it arrives?",
    summary:
      "Growth that breaks your operations is not growth. The enquiry you answer in three days is the enquiry a competitor already won.",
    href: "/services/ai-automation/",
    items: [
      { label: "Business automation", href: "/services/workflow-automation/" },
      { label: "AI-powered solutions", href: "/services/ai-agents/" },
      { label: "AI chatbots", href: "/services/ai-chatbots/" },
      { label: "Sales automation", href: "/services/sales-automation/" },
    ],
  },
  {
    key: "grow",
    label: "Grow",
    question: "Do you know what is actually working?",
    summary:
      "Most businesses cannot trace an enquiry back to the thing that produced it, which makes every budget decision a guess.",
    href: "/services/digital-marketing/",
    items: [
      { label: "Digital growth strategy", href: "/services/digital-strategy/" },
      { label: "Performance marketing", href: "/services/performance-marketing/" },
      { label: "Conversion optimisation", href: "/services/conversion-rate-optimization/" },
      { label: "Business intelligence", href: "/services/business-intelligence/" },
    ],
  },
];

export interface VisibilityLayer {
  code: string;
  name: string;
  surface: string;
  question: string;
  description: string;
  mechanism: string;
  href: string;
}

/**
 * Section 03 — the discoverability spectrum.
 * Each layer describes a genuinely different retrieval mechanism, which is
 * why they are five services rather than five names for one thing.
 */
export const visibilityLayers: VisibilityLayer[] = [
  {
    code: "SEO",
    name: "Search Engine Optimisation",
    surface: "Ranked results",
    question: "Do we appear in the list?",
    description:
      "The original surface, and still the largest. A ranked list of links where position determines whether anyone sees you.",
    mechanism:
      "Crawling, indexing and ranking. Won through technical health, relevance to a query, and authority.",
    href: "/services/seo/",
  },
  {
    code: "AEO",
    name: "Answer Engine Optimisation",
    surface: "Direct answers",
    question: "Are we quoted as the answer?",
    description:
      "Featured snippets and direct answers, where a system lifts a passage from a page and shows it instead of the list.",
    mechanism:
      "Extraction. Rewards a complete answer stated in the first few sentences, in language that survives being pulled out of context.",
    href: "/services/answer-engine-optimisation/",
  },
  {
    code: "GEO",
    name: "Generative Engine Optimisation",
    surface: "AI-generated answers",
    question: "Are we cited as a source?",
    description:
      "ChatGPT, Perplexity, Gemini and AI Overviews compose an answer from several sources and attribute some of them.",
    mechanism:
      "Retrieval and synthesis. Rewards an unambiguous brand entity, checkable claims and content a model can attribute confidently.",
    href: "/services/generative-engine-optimisation/",
  },
  {
    code: "AIO",
    name: "AI Optimisation",
    surface: "Machine readability",
    question: "Can a machine read us at all?",
    description:
      "The layer underneath the others. If AI crawlers cannot render or parse your site, nothing above this line is achievable.",
    mechanism:
      "Server-rendered HTML, structured data anchored to one entity, and crawler access that is deliberate rather than accidental.",
    href: "/services/ai-optimisation/",
  },
  {
    code: "SXO",
    name: "Search Experience Optimisation",
    surface: "After the click",
    question: "Do we convert what we win?",
    description:
      "Being found is not being chosen. This layer covers what happens between the click and the enquiry.",
    mechanism:
      "Intent matching, page experience and conversion path work applied to the pages search actually sends people to.",
    href: "/services/search-experience-optimisation/",
  },
];

export interface VisitorProblem {
  problem: string;
  detail: string;
  href: string;
  linkLabel: string;
}

/** Section 04 — stated from the visitor's side, not ours. */
export const visitorProblems: VisitorProblem[] = [
  {
    problem: "We rank, but the clicks are falling",
    detail:
      "An AI-generated summary is answering the query above your result. The traffic did not go to a competitor — it stopped existing.",
    href: "/use-cases/get-found-in-ai-search/",
    linkLabel: "Get found in AI search",
  },
  {
    problem: "Nobody finds us unless they already know our name",
    detail:
      "You rank for your brand and almost nothing else, so the site only reaches people you already reached some other way.",
    href: "/use-cases/increase-organic-traffic/",
    linkLabel: "Increase organic traffic",
  },
  {
    problem: "Our website is smaller than our business",
    detail:
      "A capable company presented through eight thin pages reads as less established than it is, and loses to competitors who are worse but look better.",
    href: "/services/corporate-websites/",
    linkLabel: "Website design & development",
  },
  {
    problem: "Enquiries arrive and then go cold",
    detail:
      "Leads sit in an inbox until someone notices. By the time a reply goes out, a faster competitor has already been shortlisted.",
    href: "/use-cases/automate-sales-follow-up/",
    linkLabel: "Automate sales follow-up",
  },
  {
    problem: "Our team spends the week rekeying data",
    detail:
      "Systems that were never integrated, bridged by people instead. It never appears as a line item, so it never gets fixed.",
    href: "/use-cases/reduce-manual-work/",
    linkLabel: "Reduce manual work",
  },
  {
    problem: "We cannot grow without hiring",
    detail:
      "Every growth conversation ends at headcount, because the processes underneath do not scale without more people running them.",
    href: "/use-cases/improve-operational-efficiency/",
    linkLabel: "Improve operational efficiency",
  },
];

export interface BusinessStage {
  index: string;
  stage: string;
  situation: string;
  focus: string;
  work: { label: string; href: string }[];
}

/** Section 05 — by business situation, not by package. No pricing invented. */
export const businessStages: BusinessStage[] = [
  {
    index: "01",
    stage: "Start",
    situation: "Establishing a digital foundation",
    focus:
      "Getting the basics right once, so you are not rebuilding in eighteen months. A site that works, tracking that can be trusted, and visibility for the terms that matter most.",
    work: [
      { label: "Website design & development", href: "/services/corporate-websites/" },
      { label: "Local search visibility", href: "/services/google-business-profile/" },
      { label: "Analytics implementation", href: "/services/analytics-implementation/" },
    ],
  },
  {
    index: "02",
    stage: "Grow",
    situation: "Needs stronger visibility and acquisition",
    focus:
      "The foundation exists but demand is flat. Work concentrates on search and AI visibility, conversion, and closing the gap between traffic and enquiries.",
    work: [
      { label: "SEO", href: "/services/seo/" },
      { label: "AI search optimisation", href: "/services/ai-search-optimisation/" },
      { label: "Conversion optimisation", href: "/services/conversion-rate-optimization/" },
    ],
  },
  {
    index: "03",
    stage: "Scale",
    situation: "Improving systems, automation and technology",
    focus:
      "Demand is arriving faster than operations can absorb it. The constraint moves from acquisition to throughput, so the work moves to automation and systems.",
    work: [
      { label: "Business automation", href: "/services/workflow-automation/" },
      { label: "Custom software", href: "/services/custom-software/" },
      { label: "Systems integration", href: "/services/systems-integration/" },
    ],
  },
  {
    index: "04",
    stage: "Transform",
    situation: "Adopting AI and advanced digital systems",
    focus:
      "Changing how the business operates rather than optimising what exists. Sequenced deliberately, because most AI programmes fail on scope rather than technology.",
    work: [
      { label: "AI consulting", href: "/services/ai-consulting/" },
      { label: "AI agents", href: "/services/ai-agents/" },
      { label: "Business intelligence", href: "/services/business-intelligence/" },
    ],
  },
];

export interface VisitorJourney {
  intent: string;
  destination: string;
  href: string;
}

/** Section 08 — navigation by intent, phrased as the visitor would say it. */
export const visitorJourneys: VisitorJourney[] = [
  {
    intent: "I want more customers",
    destination: "Generate more qualified leads",
    href: "/use-cases/generate-more-leads/",
  },
  {
    intent: "I want my business visible in AI search",
    destination: "AI search optimisation",
    href: "/services/ai-search-optimisation/",
  },
  {
    intent: "I need a better website",
    destination: "Website design & development",
    href: "/services/corporate-websites/",
  },
  {
    intent: "I want to automate repetitive work",
    destination: "Business automation",
    href: "/services/workflow-automation/",
  },
  {
    intent: "I need custom software",
    destination: "Custom software development",
    href: "/services/custom-software/",
  },
  {
    intent: "I want to use AI in my business",
    destination: "AI-powered solutions",
    href: "/services/ai-agents/",
  },
  {
    intent: "My traffic dropped and I do not know why",
    destination: "Recover from a traffic drop",
    href: "/services/technical-seo/",
  },
  {
    intent: "I am not sure what I need",
    destination: "Talk to us about it",
    href: "/contact/",
  },
];

/**
 * Section 09 — trust.
 * BizzFly has no published, client-approved case studies yet, so this section
 * states the publishing standard rather than showing fabricated proof.
 * The eleven case studies on the old site were theme demo content.
 */
export const trustCommitments = [
  {
    index: "01",
    title: "No metric without a source",
    body: "Every number we publish carries a before value, an after value, a measurement window and where it came from. If we cannot show all four, the number does not appear.",
  },
  {
    index: "02",
    title: "No client named without written approval",
    body: "Case studies are published only after the client has approved the wording and the attribution in writing. Where they prefer not to be named, we describe the business honestly instead of inventing one.",
  },
  {
    index: "03",
    title: "Every case study says what went wrong",
    body: "A project retrospective with no difficult section is a sales document. Ours name the things that proved harder than expected, because that is the part worth reading.",
  },
];
