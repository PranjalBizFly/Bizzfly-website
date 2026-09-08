/**
 * Resources — seed set. Prompt 4 expands to the full knowledge system
 * (guides, articles, glossary, FAQs) in docs/architecture/sitemap.csv.
 *
 * Glossary entries lead with a definition of 40 words or fewer, because these
 * pages exist to be extracted and cited.
 */

import type { Resource } from "@/types/content";
import { moreResources } from "./more-resources";
import { searchGlossary } from "./glossary-search";
import { technologyGlossary } from "./glossary-technology";
import { comparisons } from "./comparisons";
import { decisions } from "./decisions";
import { checklists } from "./checklists";
import { guides } from "./guides";
import { seoTermsGlossary } from "./glossary-seo-terms";
import { businessGlossary } from "./glossary-business";
import { metricsGlossary } from "./glossary-metrics";
import { moreChecklists } from "./resources-checklists";
import { moreComparisons } from "./resources-comparisons";
import { moreDecisions } from "./resources-decisions";
import { frameworks } from "./resources-frameworks";

const coreResources: Resource[] = [
  {
    slug: "what-is-generative-engine-optimisation",
    type: "glossary",
    topic: "AI Search",
    title: "What Is Generative Engine Optimisation?",
    answer:
      "Generative Engine Optimisation is the practice of making a brand more likely to be cited as a source inside AI-generated answers — in systems such as ChatGPT, Perplexity, Gemini and Google AI Overviews.",
    body: [
      "GEO differs from traditional SEO in what it competes for. SEO competes for a position in a ranked list of links. GEO competes to be one of the sources a model reads, trusts and attributes when it composes an answer.",
      "In practice that shifts the work. Keyword coverage matters less. What matters is whether a machine can identify your organisation unambiguously, whether your content states a claim clearly enough to be quoted, and whether the systems doing the retrieval can reach your pages at all.",
      "The three levers are entity clarity, extractable structure, and crawler access. Entity clarity means one consistent identity across your site, your structured data and every external profile. Extractable structure means the answer appears before the argument, in complete sentences that survive being lifted out of context. Crawler access means server-rendered HTML and a robots policy that does not accidentally block the systems you want to be read by.",
      "GEO is frequently confused with AEO. Answer Engine Optimisation targets extractive answers, where a system lifts your text more or less directly — a featured snippet, a direct answer. GEO targets synthesis, where a model reads several sources and attributes some of them. The foundations overlap; the content shape and the measurement differ.",
    ],
    supports: ["generative-engine-optimisation", "ai-search-optimisation"],
    seo: {
      title: "What Is Generative Engine Optimisation (GEO)?",
      description:
        "GEO is the practice of getting a brand cited inside AI-generated answers. How it differs from SEO and AEO, and the three levers that actually move it.",
      primaryTopic: "what is generative engine optimisation",
      secondaryTopics: ["GEO", "AI citations", "AEO"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    /** Glossary pages carry no hard CTA — tier T1 at most. */
    cta: {
      label: "Read about AI Search Optimisation",
      href: "/services/ai-search-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is GEO different from SEO?",
        answer:
          "Yes. SEO competes for a ranking position in a list of links. GEO competes to be a cited source inside a generated answer. They share technical foundations such as crawlability and structure, but reward different content shapes.",
      },
      {
        question: "Can you guarantee an AI system will cite my brand?",
        answer:
          "No. Retrieval is not controllable, and any guarantee is a misunderstanding of how these systems work. What is controllable is removing the reasons a model would not cite you: an ambiguous entity, unstructured content and blocked crawlers.",
      },
    ],
    related: [
      {
        label: "AI Search Optimisation",
        href: "/services/ai-search-optimisation/",
        type: "SERVICE",
      },
      {
        label: "Get found in AI search",
        href: "/use-cases/get-found-in-ai-search/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-is-answer-engine-optimisation",
    type: "glossary",
    topic: "AI Search",
    title: "What Is Answer Engine Optimisation?",
    answer:
      "Answer Engine Optimisation is the practice of structuring content so that search and AI systems can extract it directly as the answer to a question — in featured snippets, direct answers and AI Overviews.",
    body: [
      "AEO is about extraction. A system finds a passage on your page that answers the query and lifts it, usually with attribution. That only works if the passage stands alone: complete sentences, no pronouns pointing back at a heading, and the answer stated before any elaboration.",
      "Most service pages fail this without realising. A large hero, a value proposition and three benefit statements push the actual answer past the point where extraction typically looks. The page may rank perfectly well and still never be quoted.",
      "The practical changes are unglamorous. Put the definition first. Use headings that match the question a person would type. Write FAQ answers that make sense pasted into a chat window with no surrounding page. Use tables for comparable data, because prose comparisons cannot be extracted cleanly.",
    ],
    supports: ["answer-engine-optimisation", "ai-search-optimisation"],
    seo: {
      title: "What Is Answer Engine Optimisation (AEO)?",
      description:
        "AEO is the practice of structuring content so search and AI systems can extract it as a direct answer. What it changes on a page, and how it differs from GEO.",
      primaryTopic: "what is answer engine optimisation",
      secondaryTopics: ["AEO", "featured snippets", "direct answers"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: {
      label: "Read about AI Search Optimisation",
      href: "/services/ai-search-optimisation/",
      tier: "T1",
    },
    related: [
      {
        label: "Generative Engine Optimisation",
        href: "/resources/what-is-generative-engine-optimisation/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "why-ai-overviews-cut-your-clicks",
    type: "article",
    topic: "AI Search",
    title: "Why AI Overviews are cutting your clicks",
    answer:
      "If your rankings have held steady but organic clicks are falling, the most likely cause is that an AI-generated summary now answers the query above your result — and a share of the people who would have clicked no longer need to.",
    readingTime: "5 min read",
    body: [
      "This is the pattern we see most often in audits at the moment: position unchanged, impressions flat or up, clicks down. It is easy to misread as a ranking problem and respond by producing more content, which does not help.",
      "What has changed is the shape of the result page. For informational queries especially, a generated summary sits above the organic results and answers the question. Some users still click through for depth. Many do not, because they got what they came for.",
      "The strategic response is not to abandon informational content. It is to recognise that its job has shifted. Content that used to earn a click now earns a citation, and a citation is worth having — it puts your brand in front of the buyer at the exact moment they are forming a shortlist, even without a visit.",
      "That means two changes. First, structure informational content to be citable: answer first, clean headings, self-contained passages. Second, move your click expectations to commercial-intent queries, where a generated summary is less likely to satisfy the user completely and where a visit is genuinely necessary.",
      "It also means changing what you measure. Sessions alone will understate your visibility from here on. Tracking citation presence across a fixed set of buyer questions gives you the part of the picture analytics no longer sees.",
    ],
    supports: ["ai-search-optimisation", "seo"],
    seo: {
      title: "Why AI Overviews Are Cutting Your Clicks",
      description:
        "Rankings holding but clicks falling? AI-generated summaries now answer many queries above the results. What to change in strategy and measurement.",
      primaryTopic: "AI Overviews impact on traffic",
      secondaryTopics: ["organic clicks", "AI search", "search strategy"],
      intent: "informational",
    },
    audience: ["A3"],
    phase: "P1",
    cta: {
      label: "Request an AI visibility assessment",
      href: "/contact/",
      tier: "T1",
    },
    related: [
      {
        label: "Get found in AI search",
        href: "/use-cases/get-found-in-ai-search/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-the-first-90-days-of-seo-look-like",
    type: "article",
    topic: "SEO",
    title: "What the first 90 days of SEO actually look like",
    answer:
      "The first 90 days of an SEO engagement are mostly diagnosis and repair, not publishing. Expect two weeks of audit, a month of technical fixes, and the first meaningful ranking movement somewhere around week ten.",
    readingTime: "6 min read",
    body: [
      "Most disappointment in SEO engagements comes from a mismatch of expectations in the first quarter. The work that matters early is invisible from outside, which makes it feel like nothing is happening.",
      "Weeks one and two are audit. Crawl the site, analyse index coverage, review architecture, check what search engines can actually reach and understand. This regularly surfaces the real constraint — pages excluded from the index, a template shipping no headings, duplicate URL patterns from a plugin.",
      "Weeks three to six are repair. Fixing those constraints is unglamorous and produces no immediate chart movement, but nothing else works until it is done. Adding content to a site search engines cannot crawl properly is spending money to no effect.",
      "Weeks six to twelve are where content and authority work begins to compound, and where the first genuine ranking changes usually appear. Anyone promising that in week three is either targeting queries with no competition or doing something that will cost you later.",
      "One honest caveat: this timeline assumes the technical fixes actually get deployed. The most common cause of a stalled engagement is not strategy — it is recommendations sitting in a document because nobody has the development capacity to implement them.",
    ],
    supports: ["seo", "technical-seo"],
    seo: {
      title: "What the First 90 Days of SEO Actually Look Like",
      description:
        "An honest timeline for an SEO engagement — two weeks of audit, a month of repair, and first ranking movement around week ten.",
      primaryTopic: "SEO timelines",
      secondaryTopics: ["SEO process", "SEO expectations"],
      intent: "informational",
    },
    audience: ["A1", "A3"],
    phase: "P1",
    cta: { label: "Explore SEO services", href: "/services/seo/", tier: "T1" },
    related: [{ label: "SEO Services", href: "/services/seo/", type: "SERVICE" }],
  },
];

/**
 * The knowledge system, assembled from its clusters. Order here is the order
 * the index page falls back to, so the original editorial pieces lead and the
 * reference material follows.
 */
export const resources: Resource[] = [
  ...coreResources,
  ...moreResources,
  ...guides,
  ...comparisons,
  ...decisions,
  ...checklists,
  ...searchGlossary,
  ...technologyGlossary,
  ...seoTermsGlossary,
  ...businessGlossary,
  ...metricsGlossary,
  ...moreChecklists,
  ...moreComparisons,
  ...moreDecisions,
  ...frameworks,
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesByType(type: string): Resource[] {
  return resources.filter((r) => r.type === type);
}
