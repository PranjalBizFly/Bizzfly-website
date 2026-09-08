/**
 * Glossary — search mechanics.
 *
 * The terms that come up in an SEO conversation and are usually assumed
 * rather than explained. Definition first, then what it means in practice.
 */

import type { Resource } from "@/types/content";

export const seoTermsGlossary: Resource[] = [
  {
    slug: "what-is-eeat",
    type: "glossary",
    topic: "SEO",
    title: "E-E-A-T",
    answer:
      "E-E-A-T stands for experience, expertise, authoritativeness and trust. It is not a score a search engine calculates; it is the framework human quality raters use, which describes the kind of quality the ranking systems are built to approximate.",
    body: [
      "The distinction matters because tools sell E-E-A-T scores and there is nothing to score. Search engines publish rater guidelines describing what good looks like, then build systems intended to identify it automatically. E-E-A-T describes the target, not the mechanism.",
      "Experience was added last and is the most concrete. It asks whether the content shows evidence of having actually done the thing — specific detail, real constraints, failure modes — rather than having summarised other sources. That is also, not coincidentally, what makes content worth citing in an AI answer.",
      "In practice it favours things a business can control: naming who wrote something and why they are credible, being specific enough that claims are checkable, keeping content current, and being consistent about who the organisation is. It penalises anonymous, generic content that could have been written by anyone about anything.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "What Is E-E-A-T?",
      description:
        "Experience, expertise, authoritativeness and trust — a rater framework, not a score. What it actually rewards and why tools cannot measure it.",
      primaryTopic: "E-E-A-T",
      secondaryTopics: ["content quality", "search quality guidelines"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: { label: "Read about SEO Services", href: "/services/seo/", tier: "T1" },
    faqs: [
      {
        question: "Is E-E-A-T a ranking factor?",
        answer:
          "Not a single measurable one. It describes the quality that ranking systems are designed to approximate. Any tool reporting an E-E-A-T score is reporting its own estimate, not a search engine's judgement.",
      },
      {
        question: "How do we improve E-E-A-T?",
        answer:
          "Attribute content to identifiable people with relevant experience, be specific enough that claims can be checked, keep material current, and keep the organisation's identity consistent everywhere it appears.",
      },
    ],
    related: [
      {
        label: "Topical authority",
        href: "/resources/what-is-topical-authority/",
        type: "GLOSSARY",
      },
      {
        label: "Entity optimisation",
        href: "/resources/what-is-entity-optimisation/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-keyword-cannibalisation",
    type: "glossary",
    topic: "SEO",
    title: "Keyword Cannibalisation",
    answer:
      "Keyword cannibalisation is when several pages on one site compete for the same query, splitting relevance signals between them so that none ranks as well as a single consolidated page would.",
    body: [
      "It usually accumulates rather than being introduced. A blog post, a service page and a case study each end up addressing the same question from slightly different angles, and the site ends up asking a search engine to choose between them. The engine chooses, often inconsistently, and frequently not the page you would have picked.",
      "The symptom is instability rather than absence: a query where the ranking URL keeps changing, or where a weaker page outranks the one built for the purpose. Impressions spread thinly across several URLs for one query is the clearest evidence.",
      "The fix is consolidation, not deletion for its own sake. Merge the genuinely overlapping pages into the strongest one, redirect the others to it, and repoint internal links. Where the pages serve genuinely different intents, the answer is to sharpen the difference rather than to merge them.",
    ],
    supports: ["seo"],
    seo: {
      title: "What Is Keyword Cannibalisation?",
      description:
        "Several pages competing for one query split relevance between them. How to spot it in the data and why consolidation beats deletion.",
      primaryTopic: "keyword cannibalisation",
      secondaryTopics: ["content consolidation", "SEO audit"],
      intent: "informational",
    },
    audience: ["A4"],
    phase: "P1",
    cta: { label: "Read about SEO Services", href: "/services/seo/", tier: "T1" },
    faqs: [
      {
        question: "How do we detect cannibalisation?",
        answer:
          "Look for queries where impressions are spread across several URLs, or where the ranking URL for a query changes repeatedly. Both indicate the site is not making a clear choice about which page owns the topic.",
      },
      {
        question: "Should we always merge competing pages?",
        answer:
          "Only where they serve the same intent. If they genuinely serve different stages — an explanation and a service page — the fix is to make the difference clearer, not to combine them.",
      },
    ],
    related: [
      {
        label: "How to run a content audit",
        href: "/resources/how-to-run-a-content-audit/",
        type: "GUIDE",
      },
      {
        label: "Search intent",
        href: "/resources/what-is-search-intent/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-a-content-cluster",
    type: "glossary",
    topic: "SEO",
    title: "Content Cluster",
    answer:
      "A content cluster is a group of pages covering one subject comprehensively, linked to a central hub page and to each other, so the site reads as coverage of a topic rather than as isolated articles.",
    body: [
      "The structure is deliberate. A hub page introduces the subject and links to every page in the cluster; each cluster page covers one distinct question and links back to the hub and sideways to genuine siblings. That linking is what makes the group legible as a single body of work.",
      "Clusters work because they match how subjects are actually researched. Someone rarely has one question; they have a sequence of them. A cluster answers the sequence, which keeps a reader on the site and gives a retrieval system several relevant passages from one identifiable source.",
      "The failure mode is a cluster built to a page count rather than to the questions. Pages created because the plan said twelve are the ones that read as thin, compete with each other, and drag down the pages that were genuinely needed.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "What Is a Content Cluster?",
      description:
        "A hub page plus linked pages covering one subject comprehensively. Why the linking matters and why building to a page count fails.",
      primaryTopic: "content cluster",
      secondaryTopics: ["topic clusters", "content strategy", "internal linking"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: { label: "Read about SEO Services", href: "/services/seo/", tier: "T1" },
    faqs: [
      {
        question: "How big should a content cluster be?",
        answer:
          "As big as the subject has genuinely distinct questions. Clusters sized to a target number produce filler pages that compete with the useful ones and dilute the whole group.",
      },
      {
        question: "Does a cluster need a hub page?",
        answer:
          "It helps considerably. The hub gives the cluster a single strong entry point, distributes internal links to every member, and gives search and AI systems one page that defines what the group covers.",
      },
    ],
    related: [
      {
        label: "Topical authority",
        href: "/resources/what-is-topical-authority/",
        type: "GLOSSARY",
      },
      {
        label: "How to structure a website for search",
        href: "/resources/how-to-structure-a-website-for-search/",
        type: "GUIDE",
      },
    ],
  },
  {
    slug: "what-is-an-xml-sitemap",
    type: "glossary",
    topic: "Technical SEO",
    title: "XML Sitemap",
    answer:
      "An XML sitemap is a file listing the URLs on a site that you want search engines to know about, with optional metadata such as when each was last modified. It aids discovery; it does not guarantee indexing.",
    body: [
      "A sitemap is a hint, not an instruction. Listing a URL tells a search engine the page exists and that you consider it canonical; it does not oblige the engine to crawl or index it. Pages absent from the index despite being in a sitemap are a quality or crawl signal, not a sitemap problem.",
      "It should contain only canonical, indexable, live URLs. Sitemaps listing redirects, noindexed pages, or URLs that canonical elsewhere send contradictory signals and reduce the trust placed in the file. A sitemap that disagrees with the page's own directives is worse than no sitemap.",
      "It matters most where discovery is genuinely hard: large sites, deep pages, weak internal linking, or content that is rarely linked. For a small, well-linked site it is good hygiene rather than a lever, and generating it from the content source keeps it honest automatically.",
    ],
    supports: ["technical-seo"],
    seo: {
      title: "What Is an XML Sitemap?",
      description:
        "A sitemap lists the URLs you want discovered. Why it is a hint rather than an instruction, and why contradictory entries do harm.",
      primaryTopic: "XML sitemap",
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
        question: "Does a sitemap improve rankings?",
        answer:
          "No. It helps pages be discovered, which is a precondition for ranking, but it carries no ranking weight. A page listed in a sitemap and still unindexed has a quality or crawl problem.",
      },
      {
        question: "What should not be in a sitemap?",
        answer:
          "Redirects, noindexed pages, non-canonical URLs, and anything returning an error. Each contradicts the page's own directives and reduces the confidence placed in the whole file.",
      },
    ],
    related: [
      {
        label: "Index coverage",
        href: "/resources/what-is-index-coverage/",
        type: "GLOSSARY",
      },
      {
        label: "Technical SEO checklist",
        href: "/resources/technical-seo-checklist/",
        type: "CHECKLIST",
      },
    ],
  },
  {
    slug: "what-is-robots-txt",
    type: "glossary",
    topic: "Technical SEO",
    title: "robots.txt",
    answer:
      "robots.txt is a file at the root of a site that tells crawlers which paths they may request. It controls crawling, not indexing, and it is a convention that well-behaved crawlers follow voluntarily.",
    body: [
      "The most consequential misunderstanding is that it hides pages. Blocking a path stops compliant crawlers fetching it, but a blocked URL can still appear in results if other pages link to it — the engine knows the URL exists and simply cannot see its content. To keep a page out of an index, allow it to be crawled and use a noindex directive.",
      "It has become more consequential because AI crawlers are identified separately. Deciding which of them may fetch your content is now a strategic choice: blocking them protects content from being used, and generally removes you from being cited in the answers those systems produce.",
      "Because it is a single file with site-wide effect, it is also one of the highest-risk files on a site. A stray disallow left after a migration can remove an entire section from crawling silently, and the damage is usually noticed weeks later in traffic rather than immediately.",
    ],
    supports: ["technical-seo", "ai-search-optimisation"],
    seo: {
      title: "What Is robots.txt?",
      description:
        "robots.txt controls crawling, not indexing. Why blocking does not hide a page, and why AI crawler directives are now a strategic choice.",
      primaryTopic: "robots.txt",
      secondaryTopics: ["crawling", "AI crawlers", "noindex"],
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
        question: "Does robots.txt stop a page appearing in search?",
        answer:
          "No. It stops compliant crawlers fetching the page, but the URL can still be listed if other pages link to it. To keep a page out of an index, let it be crawled and serve a noindex directive.",
      },
      {
        question: "Should we block AI crawlers?",
        answer:
          "It is a genuine trade. Blocking protects content from being used in training or answers, and generally removes the possibility of being cited by those systems. It should be a deliberate decision, not a default.",
      },
    ],
    related: [
      {
        label: "Crawl budget",
        href: "/resources/what-is-crawl-budget/",
        type: "GLOSSARY",
      },
      {
        label: "AI search readiness checklist",
        href: "/resources/ai-search-readiness-checklist/",
        type: "CHECKLIST",
      },
    ],
  },
  {
    slug: "what-is-a-redirect",
    type: "glossary",
    topic: "Technical SEO",
    title: "Redirect",
    answer:
      "A redirect sends a request for one URL to another. A 301 declares the move permanent and passes most ranking signals; a 302 declares it temporary and is intended to leave the original in place.",
    body: [
      "Choosing the wrong status is a common and quiet error. Using a 302 for a permanent move can leave the old URL indexed and the new one weak; using a 301 for a genuinely temporary change makes the change hard to reverse cleanly. The status is a statement of intent and search engines act on it.",
      "The damage in migrations rarely comes from redirecting itself but from redirecting badly. Chains where one URL redirects to a second and then a third lose signal and slow crawling; loops make pages unreachable; and mass redirects to the homepage tell an engine the old pages have no equivalent, which discards their value entirely.",
      "The discipline is straightforward: map every URL to its closest genuine equivalent before a migration, redirect in one hop, keep the redirects in place for at least a year, and return a clean 410 for pages that genuinely have no successor rather than pretending they moved.",
    ],
    supports: ["technical-seo", "website-redesign"],
    seo: {
      title: "What Is a Redirect?",
      description:
        "301 declares a permanent move, 302 a temporary one. Why chains, loops and mass homepage redirects cause most migration damage.",
      primaryTopic: "redirect",
      secondaryTopics: ["301 redirect", "site migration"],
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
        question: "How long should redirects stay in place?",
        answer:
          "At least a year, and longer where external links point at the old URLs. Removing them early discards the value of every link and bookmark that still uses the previous address.",
      },
      {
        question: "Can we redirect old pages to the homepage?",
        answer:
          "You can, and it is usually a mistake. Search engines treat a redirect to an unrelated page as a soft signal that the content is gone, so the value of the old page is discarded rather than transferred.",
      },
    ],
    related: [
      {
        label: "How to plan a website redesign",
        href: "/resources/how-to-plan-a-website-redesign/",
        type: "DECISION",
      },
      {
        label: "Canonicalisation",
        href: "/resources/what-is-canonicalisation/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-local-seo",
    type: "glossary",
    topic: "Local SEO",
    title: "What Is Local SEO?",
    answer:
      "Local SEO is the work of appearing in results for searches with a geographic component — map listings, local packs and location-qualified queries — where proximity, prominence and relevance decide visibility.",
    body: [
      "Local results are ranked differently from ordinary ones. Proximity to the searcher matters, which means no business ranks everywhere and a competitor two streets away has an advantage you cannot buy. Prominence — how well known and well reviewed the business is — and relevance to the query complete the picture.",
      "The business profile usually carries more weight than the website for map results. Category selection, service completeness, hours, photographs and reviews all feed it, and an incomplete profile is the most common and most fixable local problem.",
      "Consistency across the web is the other half. The same business name, address and phone number everywhere they appear, because a system trying to resolve one business from contradictory listings has less confidence in all of them.",
    ],
    supports: ["local-seo", "google-business-profile"],
    seo: {
      title: "What Is Local SEO?",
      description:
        "Local SEO targets geographic searches, where proximity, prominence and relevance decide visibility. Why the profile often outweighs the website.",
      primaryTopic: "what is local seo",
      secondaryTopics: ["local search", "Google Business Profile", "map pack"],
      intent: "informational",
    },
    audience: ["A1", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Google Business Profile Optimisation",
      href: "/services/google-business-profile/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Can we rank locally without a physical address?",
        answer:
          "Service-area businesses can appear in local results without displaying an address, but they must genuinely serve the area. Listing locations you do not operate in is a policy violation and risks the listing entirely.",
      },
      {
        question: "Why do we rank in one area and not another?",
        answer:
          "Proximity is a ranking factor in local results, so visibility falls with distance from your location. That is a structural limit rather than something to be optimised away.",
      },
    ],
    related: [
      {
        label: "Local SEO checklist",
        href: "/resources/local-seo-checklist/",
        type: "CHECKLIST",
      },
      {
        label: "Rank in local search",
        href: "/use-cases/rank-in-local-search/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "what-is-programmatic-seo",
    type: "glossary",
    topic: "SEO",
    title: "Programmatic SEO",
    answer:
      "Programmatic SEO is generating large numbers of pages from structured data using a shared template. It works where each page carries genuinely distinct, useful data, and fails where the only difference is a substituted word.",
    body: [
      "The legitimate version is a database with something real on every row: actual availability, actual specifications, actual prices, actual comparisons. A page per row is useful because each row contains information a reader wants and cannot get elsewhere in that form.",
      "The illegitimate version is the same paragraph with a place name or keyword swapped. These are doorway pages: they violate search engine guidelines, they are increasingly filtered rather than penalised, and at scale they signal to a search engine that the site produces low-value content — which affects the pages you actually care about.",
      "The honest test is whether a page would be worth publishing on its own. If the only reason it exists is that a template could generate it, it will not sustain visibility and it puts the rest of the site at risk. Volume is not the strategy; having something distinct to say at volume is.",
    ],
    supports: ["seo", "technical-seo"],
    seo: {
      title: "What Is Programmatic SEO?",
      description:
        "Generating pages from structured data works when each row carries real information. Why keyword-swapped templates are doorway pages.",
      primaryTopic: "programmatic SEO",
      secondaryTopics: ["scaled content", "doorway pages"],
      intent: "informational",
    },
    audience: ["A4", "A7"],
    phase: "P1",
    cta: { label: "Read about SEO Services", href: "/services/seo/", tier: "T1" },
    faqs: [
      {
        question: "Is programmatic SEO against the guidelines?",
        answer:
          "Generating pages from data is not. Generating near-identical pages that differ only by a substituted keyword or location is — those are doorway pages, and they put the rest of the site's reputation at risk.",
      },
      {
        question: "How do we know if our generated pages are thin?",
        answer:
          "Ask whether each page would be worth publishing individually. If the only distinct content is the value substituted into the template, it is thin regardless of how many words surround it.",
      },
    ],
    related: [
      {
        label: "Topical authority",
        href: "/resources/what-is-topical-authority/",
        type: "GLOSSARY",
      },
      {
        label: "Local SEO",
        href: "/resources/what-is-local-seo/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "what-is-log-file-analysis",
    type: "glossary",
    topic: "Technical SEO",
    title: "Log File Analysis",
    answer:
      "Log file analysis examines a server's own request records to see exactly what crawlers fetched, when, and what response they received — evidence of crawler behaviour rather than an inference from a third-party tool.",
    body: [
      "Logs are the only complete record of what actually happened. Search console reports are sampled and delayed; a crawl tool simulates a crawler rather than observing one. The server log shows every request, including from crawlers that no dashboard reports on.",
      "It answers questions nothing else can. Which pages are crawled often and which are never fetched. How much crawl effort is spent on parameter URLs rather than content. Whether a crawler is receiving errors or redirects that the browser experience conceals. And, increasingly usefully, which AI crawlers are visiting and what they are taking.",
      "It is most valuable on large sites and after migrations, where the gap between what you published and what was fetched is widest. For a small site it is usually unnecessary — the same problems are visible more cheaply in index coverage reporting.",
    ],
    supports: ["technical-seo"],
    seo: {
      title: "What Is Log File Analysis?",
      description:
        "Server logs record what crawlers actually fetched. What they reveal that dashboards cannot, and when the effort is worth it.",
      primaryTopic: "log file analysis",
      secondaryTopics: ["crawl analysis", "technical SEO", "AI crawlers"],
      intent: "informational",
    },
    audience: ["A7"],
    phase: "P1",
    cta: {
      label: "Read about Technical SEO",
      href: "/services/technical-seo/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Do we need log file analysis?",
        answer:
          "Mainly if the site is large, has migrated recently, or shows indexing problems that coverage reports cannot explain. On a small healthy site the same issues surface more cheaply elsewhere.",
      },
      {
        question: "Can logs show AI crawler activity?",
        answer:
          "Yes, and it is one of the few direct ways to see it. Logs record the user agent of every request, so you can see which AI crawlers visit, how often, and what they receive.",
      },
    ],
    related: [
      {
        label: "Crawl budget",
        href: "/resources/what-is-crawl-budget/",
        type: "GLOSSARY",
      },
      {
        label: "Search & Analytics",
        href: "/technologies/search-and-analytics/",
        type: "TECHNOLOGY",
      },
    ],
  },
];
