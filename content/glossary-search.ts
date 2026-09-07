/**
 * Glossary — search and AI visibility terms.
 *
 * Every entry leads with a definition of roughly 40 words or fewer, because
 * these pages exist to be read, extracted and cited. The definition states
 * what the thing is before anything is said about what BizzFly sells.
 *
 * No statistics appear here unless they are a property of the mechanism
 * being described. Nothing about client results, volumes or rankings.
 */

import type { Resource } from "@/types/content";

export const searchGlossary: Resource[] = [
  {
    slug: "what-is-search-intent",
    type: "glossary",
    topic: "Search",
    title: "Search Intent",
    answer:
      "Search intent is the goal behind a query — what the person actually wants to happen next. It is usually grouped as informational, navigational, commercial or transactional, and it determines which kind of page can rank at all.",
    body: [
      "Intent is the reason a ranking page looks the way it does. If a query is informational, search engines have already decided that explanations rank; a product page will not win that result no matter how well it is optimised. The page type has to match the goal before anything else matters.",
      "The four common categories are useful but blunt. Informational queries want an explanation. Navigational queries want a specific destination. Commercial queries want to compare options before buying. Transactional queries want to act now. Many real queries sit between two of these, and the results page is the evidence of which one dominates.",
      "The practical method is to read the results, not the keyword. Search the query and look at what is actually ranking: if the first page is entirely guides, that query is informational regardless of how commercial the words sound. This is also why keyword volume alone is a poor planning input — it says how many people search, not what they expect to find.",
      "Intent also decides what success looks like. An informational page earns its place through assisted conversions and AI citations, not direct enquiries. Holding it to a lead target will get a useful page deleted for failing at a job it was never doing.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "What Is Search Intent?",
      description:
        "Search intent is the goal behind a query. The four categories, why the results page is better evidence than the keyword, and how intent decides page type.",
      primaryTopic: "search intent",
      secondaryTopics: ["keyword research", "SEO strategy"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: {
      label: "Read about SEO Services",
      href: "/services/seo/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How do I find the intent behind a keyword?",
        answer:
          "Search it and read the first page of results. The page types that rank are the search engine's own judgement about what people want. If guides rank, the intent is informational; if product and category pages rank, it is transactional.",
      },
      {
        question: "Can one page target several intents?",
        answer:
          "Rarely well. A page that tries to explain a concept and sell a service usually does neither clearly enough to rank or convert. Separate pages that link to each other perform better than one page attempting both jobs.",
      },
    ],
    related: [
      { label: "SEO Services", href: "/services/seo/", type: "SERVICE" },
      {
        label: "Increase organic traffic",
        href: "/use-cases/increase-organic-traffic/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-is-entity-optimisation",
    type: "glossary",
    topic: "AI Search",
    title: "Entity Optimisation",
    answer:
      "Entity optimisation is the work of making a machine able to identify your organisation, people and products unambiguously — as distinct things in the world rather than as strings of text that happen to appear on a page.",
    body: [
      "Search and AI systems do not reason about your business as a set of keywords. They resolve it to an entity: a specific organisation with a name, a location, a set of relationships and a body of things said about it. If that resolution fails, or resolves to the wrong company, everything downstream weakens — including whether a model is willing to cite you.",
      "Ambiguity is the usual failure. A company name shared with a larger brand, an address written three different ways across the site, a founder credited under two spellings, structured data on one template but not the others. Each is small; together they make the entity harder to pin down than a competitor whose details agree everywhere.",
      "The work is unglamorous and mostly consistency. One canonical organisation record with a stable identifier, the same name, address and contact details everywhere they appear, structured data that references that record rather than repeating it, and external profiles that agree with the site rather than contradicting it.",
      "Entity clarity is a foundation, not a tactic. It does not produce a ranking on its own, and no reputable practitioner can promise it will. What it does is remove a class of reason for a system to be uncertain about who you are, which is a precondition for being retrieved and attributed.",
    ],
    supports: ["ai-search-optimisation", "generative-engine-optimisation"],
    seo: {
      title: "What Is Entity Optimisation?",
      description:
        "Entity optimisation makes a machine able to identify your organisation unambiguously. Why ambiguity weakens AI citation, and what the work actually involves.",
      primaryTopic: "entity optimisation",
      secondaryTopics: ["entity SEO", "knowledge graph", "AI search"],
      intent: "informational",
    },
    audience: ["A4", "A3", "A7"],
    phase: "P1",
    cta: {
      label: "Read about AI Search Optimisation",
      href: "/services/ai-search-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is entity optimisation the same as schema markup?",
        answer:
          "No. Schema markup is one way of stating an entity in machine-readable form. Entity optimisation is the broader work of making the identity consistent everywhere it appears — on the site, in structured data and on external profiles — so those statements agree.",
      },
      {
        question: "Does this matter if we only care about Google rankings?",
        answer:
          "It still helps. Entity clarity supports knowledge panels and brand results in conventional search as well as citation in AI answers. The two goals share most of the same underlying work.",
      },
    ],
    related: [
      {
        label: "AI Search Optimisation",
        href: "/services/ai-search-optimisation/",
        type: "SERVICE",
      },
      {
        label: "Knowledge graph",
        href: "/resources/what-is-a-knowledge-graph/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-a-knowledge-graph",
    type: "glossary",
    topic: "AI Search",
    title: "Knowledge Graph",
    answer:
      "A knowledge graph is a structured map of entities and the relationships between them — people, organisations, places, products — used by search and AI systems to understand context rather than matching text.",
    body: [
      "A graph stores facts as connections. Rather than holding a page that mentions a company and a city, it holds an organisation entity linked to a location entity by a relationship. That structure is what lets a system answer a question it has never seen phrased that way, because it can traverse relationships instead of looking for matching words.",
      "Being represented in a graph is not something you submit to. Systems build their own from sources they already trust: structured data on your site, authoritative directories, references from other pages, and consistency between all of them. Your job is to make the facts easy to extract and hard to contradict.",
      "This is why inconsistency is expensive. Two different addresses, or a service described under different names on different pages, create competing facts. A graph resolves competing facts by weighing sources, and a small company rarely wins that contest against a larger one with tidier data.",
      "For most businesses the practical goal is modest and worthwhile: one unambiguous organisation entity, correctly related to what it does and where it operates, stated the same way in every place a machine will look.",
    ],
    supports: ["ai-search-optimisation", "ai-optimisation"],
    seo: {
      title: "What Is a Knowledge Graph?",
      description:
        "A knowledge graph maps entities and their relationships so systems understand context, not text. How they are built and why consistency decides representation.",
      primaryTopic: "knowledge graph",
      secondaryTopics: ["entities", "structured data", "AI search"],
      intent: "informational",
    },
    audience: ["A4", "A7"],
    phase: "P1",
    cta: {
      label: "Read about AI Optimisation",
      href: "/services/ai-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Can we add our company to a knowledge graph?",
        answer:
          "Not directly. Systems build graphs from sources they trust. What you can control is the quality and consistency of those sources — your structured data, your site content, and the external profiles that describe you.",
      },
      {
        question: "How is this different from a database?",
        answer:
          "A database stores records in tables. A knowledge graph stores entities and typed relationships between them, which is what lets a system infer an answer by following connections rather than retrieving a stored row.",
      },
    ],
    related: [
      {
        label: "Entity optimisation",
        href: "/resources/what-is-entity-optimisation/",
        type: "GLOSSARY",
      },
      {
        label: "Schema markup",
        href: "/resources/what-is-schema-markup/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-schema-markup",
    type: "glossary",
    topic: "Technical SEO",
    title: "Schema Markup",
    answer:
      "Schema markup is structured data added to a page in a standard vocabulary, usually as JSON-LD, that states explicitly what the page is about — an organisation, an article, a product, an FAQ — rather than leaving a machine to infer it.",
    body: [
      "Markup does not change what a visitor sees. It adds a parallel, machine-readable statement of the same facts: this is an article, published on this date, by this organisation, which is this specific entity. Systems that would otherwise guess can then read.",
      "The most common mistake is treating it as a ranking lever. Schema is not a ranking factor in itself. What it enables is eligibility — for rich results, for confident entity resolution, and for being parsed cleanly by systems that assemble answers. Those are real benefits, and they are not the same as a position increase.",
      "The second most common mistake is marking up claims the page does not make. Structured data that describes content not visible on the page is a guideline violation and is routinely ignored or penalised. The markup should describe the page, not decorate it.",
      "A small, correct set beats a large, sprawling one. For most sites that means one Organization record with a stable identifier, referenced by the page-level types rather than repeated, plus Article or FAQPage where those genuinely apply.",
    ],
    supports: ["technical-seo", "ai-search-optimisation"],
    seo: {
      title: "What Is Schema Markup?",
      description:
        "Schema markup states what a page is about in machine-readable form. What it does, what it does not do, and the two mistakes that make it worthless.",
      primaryTopic: "schema markup",
      secondaryTopics: ["structured data", "JSON-LD", "rich results"],
      intent: "informational",
    },
    audience: ["A4", "A7"],
    phase: "P1",
    cta: {
      label: "Read about Technical SEO",
      href: "/services/technical-seo/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Does schema markup improve rankings?",
        answer:
          "Not directly. It makes a page eligible for rich results and helps systems resolve entities and parse content confidently. Those can affect how often a page is clicked or cited, which is a different mechanism from a ranking increase.",
      },
      {
        question: "Which format should we use?",
        answer:
          "JSON-LD. It is the format search engines recommend, it sits in a single block rather than being woven through the markup, and it is far easier to validate and maintain than microdata.",
      },
    ],
    related: [
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
      {
        label: "Knowledge graph",
        href: "/resources/what-is-a-knowledge-graph/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-zero-click-search",
    type: "glossary",
    topic: "AI Search",
    title: "Zero-Click Search",
    answer:
      "A zero-click search is one where the person gets their answer on the results page itself — from a snippet, a panel or an AI-generated summary — and never visits a website.",
    body: [
      "Zero-click is not new; it began with weather, definitions and calculators. What changed is scope. As results pages answer more complex questions directly, the share of searches that end without a visit grows, and it grows fastest for exactly the informational queries that content marketing was built to win.",
      "The uncomfortable implication is that traffic and visibility have come apart. A brand can be more present than ever — quoted in the answer, named in the summary — while its analytics show a decline. Measuring only sessions will read that as failure.",
      "There are two sane responses, and they work together. First, make sure that when an answer is assembled, you are the source it is assembled from, because a citation is the only visibility left in that result. Second, shift measurement toward what still happens: branded search volume, direct arrivals, assisted conversions and enquiry quality.",
      "The wrong response is to withhold the answer to force a click. Systems reward complete answers, and readers who are made to work for one do not convert better — they leave.",
    ],
    supports: ["ai-search-optimisation", "answer-engine-optimisation"],
    seo: {
      title: "What Is Zero-Click Search?",
      description:
        "A zero-click search ends on the results page. Why traffic and visibility have separated, and the two responses that work instead of withholding answers.",
      primaryTopic: "zero-click search",
      secondaryTopics: ["AI overviews", "featured snippets", "search visibility"],
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
        question: "Should we stop publishing informational content?",
        answer:
          "No, but the goal changes. Informational content now earns citation, entity strength and assisted conversions rather than direct sessions. Judge it on those, and keep commercial pages measured on enquiries.",
      },
      {
        question: "Can we opt out of being summarised?",
        answer:
          "Partly, through crawler directives — but opting out generally means opting out of being cited too. For most businesses that trades a visible presence for an invisible one.",
      },
    ],
    related: [
      {
        label: "Why AI Overviews cut your clicks",
        href: "/resources/why-ai-overviews-cut-your-clicks/",
        type: "ARTICLE",
      },
      {
        label: "Get found in AI search",
        href: "/use-cases/get-found-in-ai-search/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-is-a-featured-snippet",
    type: "glossary",
    topic: "Search",
    title: "Featured Snippet",
    answer:
      "A featured snippet is a short extract from a page that a search engine promotes above the ordinary results to answer a query directly — as a paragraph, a list or a table — with a link back to the source.",
    body: [
      "A snippet is selected, not submitted. The system finds a passage that answers the query cleanly and lifts it. That makes the unit of optimisation a passage rather than a page: the paragraph immediately under a question-shaped heading, written so it makes sense with no surrounding context.",
      "Format follows the question. A 'what is' question tends to take a paragraph of roughly 40 to 60 words. A 'how to' question tends to take an ordered list. A comparison tends to take a table. Matching the shape the query invites matters more than word count.",
      "Winning one is not automatically good. If the snippet fully answers the question, it can reduce clicks to the page that earned it — the zero-click trade-off. Snippets are most valuable for queries where the complete answer is genuinely longer than the extract, so the reader has a reason to continue.",
      "The same passage discipline feeds AI answers. Content written to be lifted cleanly is content a model can quote, which is why answer-shaped writing pays twice.",
    ],
    supports: ["answer-engine-optimisation", "seo"],
    seo: {
      title: "What Is a Featured Snippet?",
      description:
        "A featured snippet is a promoted extract answering a query directly. How passages are selected, which formats match which questions, and the click trade-off.",
      primaryTopic: "featured snippet",
      secondaryTopics: ["position zero", "AEO", "direct answers"],
      intent: "informational",
    },
    audience: ["A4"],
    phase: "P1",
    cta: {
      label: "Read about Answer Engine Optimisation",
      href: "/services/answer-engine-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How do we get a featured snippet?",
        answer:
          "Answer the question directly in the first passage after a heading that matches how it is asked, in a complete sentence that stands alone. Match the format the question invites — paragraph, list or table. You cannot submit for one; you can only make the passage easy to lift.",
      },
      {
        question: "Do featured snippets reduce traffic?",
        answer:
          "Sometimes. If the extract fully answers the question, many readers stop there. They are worth pursuing where the full answer is genuinely longer than the snippet can contain.",
      },
    ],
    related: [
      {
        label: "Answer Engine Optimisation",
        href: "/services/answer-engine-optimisation/",
        type: "SERVICE",
      },
      {
        label: "Zero-click search",
        href: "/resources/what-is-zero-click-search/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-crawl-budget",
    type: "glossary",
    topic: "Technical SEO",
    title: "Crawl Budget",
    answer:
      "Crawl budget is the number of URLs a search engine is willing and able to fetch from a site in a given period. It is set by how much crawling the site can tolerate and how much the engine considers worthwhile.",
    body: [
      "Two forces set it. Crawl capacity is what your server can serve without degrading — a slow or error-prone site gets crawled less to avoid harming it. Crawl demand is how much the engine wants your pages, based on how often they change and how valuable they appear.",
      "For most sites it is not a real constraint. A few hundred pages that respond quickly will be crawled thoroughly. It becomes a genuine issue at scale, or where a site generates large numbers of near-identical URLs — faceted filters, session parameters, endless pagination, calendar pages that continue forever.",
      "When it does bite, the symptom is quiet: new pages take a long time to appear, and updates take a long time to register. Crawl statistics showing effort spent on parameter URLs rather than real content are the usual confirmation.",
      "The fix is almost always removing waste rather than requesting more. Stop generating low-value URLs, resolve redirect chains, return correct status codes, and keep the pages you care about reachable in few clicks from a page that is crawled often.",
    ],
    supports: ["technical-seo"],
    seo: {
      title: "What Is Crawl Budget?",
      description:
        "Crawl budget is how many URLs a search engine will fetch from your site. What sets it, when it actually matters, and why the fix is removing waste.",
      primaryTopic: "crawl budget",
      secondaryTopics: ["crawling", "indexing", "technical SEO"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Technical SEO",
      href: "/services/technical-seo/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Does our small site need to worry about crawl budget?",
        answer:
          "Almost certainly not. A site of a few hundred healthy pages is crawled comfortably. Crawl budget becomes a real constraint at large scale, or where filters and parameters generate far more URLs than there is content.",
      },
      {
        question: "Can we increase our crawl budget?",
        answer:
          "Not directly. You can make the site faster and more reliable, which raises capacity, and remove low-value URLs so the available crawling is spent on pages that matter.",
      },
    ],
    related: [
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
      {
        label: "Index coverage",
        href: "/resources/what-is-index-coverage/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-index-coverage",
    type: "glossary",
    topic: "Technical SEO",
    title: "Index Coverage",
    answer:
      "Index coverage is the state of your URLs in a search engine's index — which are indexed, which were crawled and excluded, and which were never fetched. It is the difference between publishing a page and having it eligible to rank.",
    body: [
      "Publishing is not indexing. A page can exist, return a healthy response and still be absent from the index because the engine crawled it and decided not to keep it. Until a page is indexed it cannot rank for anything, which makes coverage the first thing to check when new content appears to do nothing.",
      "The exclusion reasons are diagnostic. 'Discovered, not indexed' usually means the engine has not judged the page worth fetching yet — often a quality or internal-linking signal. 'Crawled, not indexed' means it looked and declined, which points at thin or duplicative content. 'Alternate page with canonical' means it is being folded into another URL, which is correct behaviour if that was the intent.",
      "The most damaging cases are the accidental ones: a noindex tag left in place after a staging launch, a canonical pointing at the wrong URL across a template, a robots rule blocking a directory that matters. Each silently removes a whole section from eligibility.",
      "Coverage should be monitored as a trend, not read once. A steady drift of pages out of the index is a symptom worth investigating long before traffic reflects it.",
    ],
    supports: ["technical-seo", "seo"],
    seo: {
      title: "What Is Index Coverage?",
      description:
        "Index coverage is which of your URLs a search engine has indexed, excluded or never fetched. What each exclusion reason means and which ones are accidents.",
      primaryTopic: "index coverage",
      secondaryTopics: ["indexing", "noindex", "canonical"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Technical SEO",
      href: "/services/technical-seo/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Why is our page not indexed?",
        answer:
          "Common causes are a noindex directive, a canonical pointing elsewhere, a robots rule blocking the path, or the engine judging the page too thin or too similar to an existing one. The exclusion reason reported in search console distinguishes them.",
      },
      {
        question: "How long should indexing take?",
        answer:
          "For an established site with healthy internal linking, days rather than weeks is typical. Consistently slow indexing of new pages usually points at crawl or quality signals rather than at the individual page.",
      },
    ],
    related: [
      {
        label: "Crawl budget",
        href: "/resources/what-is-crawl-budget/",
        type: "GLOSSARY",
      },
      {
        label: "Canonicalisation",
        href: "/resources/what-is-canonicalisation/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-canonicalisation",
    type: "glossary",
    topic: "Technical SEO",
    title: "Canonicalisation",
    answer:
      "Canonicalisation is declaring which URL is the authoritative version of a page when several URLs serve the same or similar content, so search engines consolidate signals onto one address instead of splitting them.",
    body: [
      "Duplicate URLs are normal and mostly accidental. Tracking parameters, filter combinations, uppercase and lowercase paths, with and without a trailing slash, print views — each can serve the same content at a different address. Left undeclared, links and relevance signals divide between them and none of the versions is as strong as the single page should have been.",
      "The canonical link element is a statement of preference, not a command. Search engines treat it as one signal among several, and will ignore it if other evidence disagrees — internal links pointing elsewhere, a sitemap listing a different URL, redirects contradicting the tag.",
      "That is why consistency matters more than the tag itself. The canonical, the internal links, the sitemap entry and any redirects should all name the same URL. When they agree, the declaration is almost always honoured; when they conflict, the engine picks for you.",
      "The expensive mistake is a template-wide canonical pointing at a single URL — often the homepage — which tells the engine an entire section is a duplicate of one page and removes it from eligibility.",
    ],
    supports: ["technical-seo"],
    seo: {
      title: "What Is Canonicalisation?",
      description:
        "Canonicalisation declares the authoritative URL when several serve the same content. Why it is a signal rather than a command, and the template-wide mistake.",
      primaryTopic: "canonicalisation",
      secondaryTopics: ["canonical tag", "duplicate content", "URL structure"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Technical SEO",
      href: "/services/technical-seo/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is duplicate content penalised?",
        answer:
          "There is no penalty for ordinary duplication. The cost is dilution: signals split across several URLs so no single version is as strong as it should be. Canonicalisation consolidates them.",
      },
      {
        question: "Should a page canonical to itself?",
        answer:
          "Yes. A self-referencing canonical on every page is good practice. It removes ambiguity when a URL is reached with parameters appended and costs nothing.",
      },
    ],
    related: [
      {
        label: "Index coverage",
        href: "/resources/what-is-index-coverage/",
        type: "GLOSSARY",
      },
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
    ],
  },
  {
    slug: "what-is-core-web-vitals",
    type: "glossary",
    topic: "Technical SEO",
    title: "Core Web Vitals",
    answer:
      "Core Web Vitals are a small set of measurements Google uses to describe page experience: how quickly the main content appears, how quickly the page responds to input, and how much the layout moves while loading.",
    body: [
      "The three current metrics measure distinct failures. Largest Contentful Paint measures when the main content becomes visible. Interaction to Next Paint measures how quickly the page responds when someone actually interacts with it. Cumulative Layout Shift measures how much content jumps around as things load.",
      "They are graded on field data — what real visitors experienced — not on a laboratory test. This is why a perfect score in a synthetic tool can coexist with a failing assessment: your visitors may be on slower devices and networks than the test machine.",
      "As a ranking input they are modest and situational, most likely to matter between pages of otherwise similar relevance. As a conversion input they are not modest at all. Layout shift that moves a button under a thumb, or a page that ignores a tap for a second, costs enquiries regardless of ranking.",
      "The common causes are unglamorous: images without dimensions, fonts that swap late, third-party scripts blocking the main thread, and content injected above existing content after load.",
    ],
    supports: ["website-performance", "technical-seo"],
    seo: {
      title: "What Are Core Web Vitals?",
      description:
        "Core Web Vitals measure loading, responsiveness and visual stability from real visitor data. What each metric catches and why they matter for conversion.",
      primaryTopic: "core web vitals",
      secondaryTopics: ["LCP", "INP", "CLS", "page speed"],
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
        question: "Do Core Web Vitals affect rankings?",
        answer:
          "They are a ranking input, but a modest one that mainly separates pages of similar relevance. Content and relevance dominate. The stronger commercial argument for fixing them is conversion, not position.",
      },
      {
        question: "Why does our score differ between tools?",
        answer:
          "Laboratory tools simulate one device and connection. The assessment that counts uses field data from real visitors, whose devices and networks are usually slower than the test environment.",
      },
    ],
    related: [
      {
        label: "Website Performance",
        href: "/services/website-performance/",
        type: "SERVICE",
      },
      {
        label: "Improve website conversion",
        href: "/use-cases/improve-website-conversion/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-is-internal-linking",
    type: "glossary",
    topic: "SEO",
    title: "Internal Linking",
    answer:
      "Internal linking is the practice of connecting pages within a site so that both people and crawlers can move between related content, and so that relevance and authority are distributed deliberately rather than by accident.",
    body: [
      "Internal links do three jobs at once. They let a crawler discover pages, they tell it which pages a site considers important, and they describe what a page is about through the words used to link to it. A page nobody links to is a page the site itself is treating as unimportant.",
      "Depth is the usual problem. Pages buried five or six clicks from anywhere well-linked are crawled less often and ranked more weakly, not because of a depth penalty but because the signals never reach them. Flattening that structure is often the cheapest available improvement.",
      "Anchor text is the second lever, and the most abused. Links reading 'click here' describe nothing; links stuffed with the same exact phrase on every occurrence read as manipulation. Descriptive, varied, natural phrasing does the job.",
      "The durable approach is structural rather than manual: hub pages that link to their cluster, cluster pages that link back and sideways to genuine siblings. Relationships declared in content rather than added by hand survive the site growing.",
    ],
    supports: ["seo", "technical-seo"],
    seo: {
      title: "What Is Internal Linking?",
      description:
        "Internal linking connects pages so crawlers can discover them and relevance is distributed deliberately. Depth, anchor text, and the structural approach that scales.",
      primaryTopic: "internal linking",
      secondaryTopics: ["site architecture", "anchor text", "crawl depth"],
      intent: "informational",
    },
    audience: ["A4", "A7"],
    phase: "P1",
    cta: {
      label: "Read about SEO Services",
      href: "/services/seo/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How many internal links should a page have?",
        answer:
          "There is no correct number. Link where a link genuinely helps a reader continue. Pages with almost none are usually the problem; pages padded with links to hit a count add nothing and dilute the ones that mattered.",
      },
      {
        question: "How deep should pages be in the structure?",
        answer:
          "As a rule of thumb, important pages should be reachable within about three clicks of a frequently-crawled page. Deeper is not fatal, but it needs a deliberate reason and stronger linking to compensate.",
      },
    ],
    related: [
      { label: "SEO Services", href: "/services/seo/", type: "SERVICE" },
      {
        label: "Topical authority",
        href: "/resources/what-is-topical-authority/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-topical-authority",
    type: "glossary",
    topic: "SEO",
    title: "Topical Authority",
    answer:
      "Topical authority describes how comprehensively and credibly a site covers a subject area. It is a way of explaining why a site that treats a topic thoroughly tends to rank across it, rather than page by page.",
    body: [
      "It is a model, not a metric. No search engine publishes a topical authority score, and any tool reporting one is describing its own estimate. What the idea captures is real: sites that cover a subject completely, consistently and credibly tend to perform across that subject better than sites with one page on it.",
      "Coverage means the questions a reader actually has, including the ones that do not lead to a sale. A cluster that explains a concept, compares the options, describes the failure modes and covers the decision is more useful — and more citable — than a page that only sells.",
      "Depth without connection does not work. Twenty pages on a subject that never link to each other read as twenty isolated pages. The linking is what makes a cluster legible as coverage of one subject.",
      "The honest limit is that authority follows genuine expertise. Publishing volume on a subject a business does not actually practise produces content that is hard to make specific, easy to contradict, and increasingly easy for both readers and models to recognise as filler.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "What Is Topical Authority?",
      description:
        "Topical authority describes how comprehensively a site covers a subject. Why it is a model rather than a metric, and why clusters need linking to work.",
      primaryTopic: "topical authority",
      secondaryTopics: ["content clusters", "SEO strategy"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: {
      label: "Read about SEO Services",
      href: "/services/seo/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Is topical authority a real ranking factor?",
        answer:
          "Not as a published metric. It is a useful model for a real pattern: comprehensive, well-connected, genuinely expert coverage of a subject tends to perform across that subject. Treat scores from tools as estimates, not measurements.",
      },
      {
        question: "How many pages does a cluster need?",
        answer:
          "As many as the subject genuinely has distinct questions, and no more. Pages created to reach a number are the ones that read as thin and drag the cluster down.",
      },
    ],
    related: [
      {
        label: "Internal linking",
        href: "/resources/what-is-internal-linking/",
        type: "GLOSSARY",
      },
      {
        label: "Increase organic traffic",
        href: "/use-cases/increase-organic-traffic/",
        type: "USE CASE",
      },
    ],
  },
];
