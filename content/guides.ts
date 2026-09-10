/**
 * Long-form guides.
 *
 * Longer than the glossary, more explanatory than the checklists. Each one
 * teaches a mechanism rather than describing a service, on the basis that a
 * reader who understands the mechanism makes a better decision — including,
 * sometimes, the decision not to buy anything.
 */

import type { Resource } from "@/types/content";

export const guides: Resource[] = [
  {
    slug: "how-ai-search-works",
    type: "guide",
    topic: "AI Search",
    title: "How AI Search Works",
    answer:
      "AI search answers a question in three stages: it interprets what was asked, retrieves material it considers relevant and trustworthy, then composes an answer from that material and attributes some of it. Each stage is a different opportunity to be included or excluded.",
    readingTime: "6 min",
    body: [
      "Interpretation comes first. The system rewrites the question into something it can search for, often several sub-queries at once. A question like 'who can help us get found on AI' becomes queries about AI search optimisation, agencies and services. This is why matching a single phrase matters far less than covering the concept the question is really about.",
      "Retrieval follows, and this is where most businesses are eliminated without knowing it. The system searches an index for passages that answer the sub-queries. If your content is not in the index, is not reachable, or exists only after JavaScript runs, you are not a candidate. Nothing later in the process can recover from that.",
      "Selection then narrows the candidates. Among passages that could answer, the system prefers ones that answer completely and unambiguously, from sources it can identify and has reason to trust. A passage that only makes sense in the context of the surrounding page is weaker here than one written to stand alone.",
      "Composition assembles the answer and decides attribution. A model reads the selected passages and writes something new, naming some sources. Attribution favours material that is specific and clearly owned — which is why entity clarity matters: a system that cannot tell who published a claim has little reason to credit anyone for it.",
      "The practical consequence is that AI visibility work is mostly unglamorous. Be reachable and renderable. Be identifiable as a specific organisation. Write answers that survive being lifted out of context. Nobody can guarantee inclusion, because retrieval is not controllable — but each of those removes a reason to be excluded.",
      "It also changes measurement. There is no rank position to report. The available evidence is whether you appear for a fixed set of buyer questions when they are asked repeatedly over time, alongside branded search volume, direct arrivals and the quality of enquiries that mention having found you through an assistant.",
    ],
    supports: ["ai-search-optimisation", "generative-engine-optimisation"],
    seo: {
      title: "How AI Search Works",
      description:
        "Interpretation, retrieval, selection and composition — the four stages of an AI answer, and where businesses are eliminated without knowing it.",
      primaryTopic: "how AI search works",
      secondaryTopics: ["AI overviews", "GEO", "retrieval"],
      intent: "informational",
    },
    audience: ["A3", "A4", "A2"],
    phase: "P1",
    cta: {
      label: "Read about AI Search Optimisation",
      href: "/services/ai-search-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Why does an AI assistant not mention our business?",
        answer:
          "Most often because you were never a retrieval candidate — content not indexed, not reachable, or rendered only in the browser. The next most common reason is that the answer exists on your site but not in a form that can be lifted out of context.",
      },
      {
        question: "Can we pay to appear in AI answers?",
        answer:
          "Not in the organic answer itself. Some surfaces carry advertising alongside, but citation within a generated answer is not purchasable, and any supplier offering it is describing something else.",
      },
    ],
    related: [
      {
        label: "Generative Engine Optimisation",
        href: "/services/generative-engine-optimisation/",
        type: "SERVICE",
      },
      {
        label: "AI Search Readiness Checklist",
        href: "/resources/ai-search-readiness-checklist/",
        type: "CHECKLIST",
      },
    ],
  },
  {
    slug: "how-to-prepare-content-for-ai-search",
    type: "guide",
    topic: "AI Search",
    title: "How to Prepare Content for AI Search",
    answer:
      "Write so that any single passage can be lifted out and still make sense. State the answer before the argument, use headings that match how questions are asked, keep claims specific, and make the publisher unambiguous.",
    readingTime: "5 min",
    body: [
      "The unit that matters is the passage, not the page. A system selecting material for an answer takes a section, not your whole article. Every section therefore has to be self-contained: readable with no knowledge of what came before it, with pronouns resolved and the subject named rather than implied.",
      "Answer first, then explain. Marketing writing conventionally builds toward a conclusion; extraction rewards the opposite. Put the direct answer in the first sentence or two after the heading, then use the rest of the section to qualify, evidence and expand. A reader who stops early still has the answer; a system that lifts the opening still has something complete.",
      "Match headings to real questions. 'Pricing model' is a label; 'How much does technical SEO cost?' is the question someone actually asks. Question-shaped headings with direct answers underneath are what allow a passage to be matched to a query in the first place.",
      "Be specific, because specificity is what makes a source worth citing. Vague claims about being trusted or leading are not attributable — there is nothing in them to quote. A concrete statement about how something works, what it costs, or when it fails is the kind of material a model can use and credit.",
      "Do not fabricate to sound authoritative. Invented statistics are increasingly easy to check, and a claim contradicted by better sources damages the credibility of everything around it. Where a figure is needed and not available, say what is known and what is not.",
      "Finally, make the publisher unambiguous. Consistent organisation details, structured data referencing one canonical entity, and author or organisation attribution that agrees across the site. Attribution requires the system to know who it is crediting.",
    ],
    supports: ["answer-engine-optimisation", "generative-engine-optimisation"],
    seo: {
      title: "How to Prepare Content for AI Search",
      description:
        "Write passages that survive being lifted out of context: answer first, question-shaped headings, specific claims, unambiguous publisher.",
      primaryTopic: "content for AI search",
      secondaryTopics: ["AEO", "GEO", "content structure"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: {
      label: "Read about Answer Engine Optimisation",
      href: "/services/answer-engine-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Does content length matter for AI search?",
        answer:
          "Less than structure. A long page of vague prose is weaker than a shorter one where each section answers a specific question completely. Length that adds distinct answers helps; length added to hit a word count does not.",
      },
      {
        question: "Should we add an FAQ section to every page?",
        answer:
          "Only where the questions are real and the answers are not already covered. FAQ blocks added mechanically repeat the page in a different shape, which adds nothing for a reader or a retrieval system.",
      },
    ],
    related: [
      {
        label: "How AI Search Works",
        href: "/resources/how-ai-search-works/",
        type: "GUIDE",
      },
      {
        label: "Featured Snippet",
        href: "/resources/what-is-a-featured-snippet/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "how-to-build-search-visibility",
    type: "guide",
    topic: "SEO",
    title: "How to Build Search Visibility",
    answer:
      "Search visibility is built in a fixed order: make the site reachable and renderable, cover the questions your buyers actually ask, earn credibility from outside the site, then compound by keeping it current. Skipping the first stage wastes everything after it.",
    readingTime: "7 min",
    body: [
      "Foundation comes first because everything else depends on it. Pages must be reachable, return healthy responses, render their content server-side and resolve to one canonical address. This stage produces no exciting reporting, and it is where most under-performing sites are actually stuck.",
      "Then coverage. Identify the questions your buyers ask across their decision — not just the transactional ones — and check which have a page that genuinely answers them. Gaps are usually at the explanatory and comparative stages, because those do not feel like sales pages and so never get commissioned.",
      "Coverage means depth on subjects you genuinely practise. A cluster that explains a concept, compares the options, describes the failure modes and covers the decision is far stronger than a single page that sells. Those pages then need to link to each other, or they read as isolated documents rather than as coverage of a subject.",
      "Credibility is the part that cannot be built entirely from inside. References from places your buyers already trust — industry publications, partners, communities, genuine coverage — signal that the site is worth ranking. This is slow, it resists shortcuts, and the shortcuts that exist carry penalty risk disproportionate to their benefit.",
      "Then compounding. Search visibility decays: competitors publish, systems change, content ages into inaccuracy. A quarterly pass that updates what has changed, consolidates pages competing with each other, and removes what no longer earns its place is worth more than the same effort spent on new pages.",
      "Expect the timeline to be honest rather than convenient. Technical improvements can register within weeks. Content and credibility work usually takes months to show commercially, and any supplier compressing that is describing a hope rather than a plan.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "How to Build Search Visibility",
      description:
        "Foundation, coverage, credibility, compounding — in that order. Why skipping the unglamorous first stage wastes everything after it.",
      primaryTopic: "building search visibility",
      secondaryTopics: ["SEO strategy", "content clusters"],
      intent: "informational",
    },
    audience: ["A3", "A1"],
    phase: "P1",
    cta: { label: "Read about SEO Services", href: "/services/seo/", tier: "T1" },
    faqs: [
      {
        question: "How long does it take to build search visibility?",
        answer:
          "Technical improvements can register in weeks. Content and credibility usually take several months to show commercially. Timelines shorter than that describe a hope rather than a plan.",
      },
      {
        question: "Is publishing more content the answer?",
        answer:
          "Only if the foundation is sound and the gaps are genuine. Publishing over a site that cannot be crawled or rendered adds pages nobody will see, and volume without depth dilutes the pages that were working.",
      },
    ],
    related: [
      {
        label: "Topical Authority",
        href: "/resources/what-is-topical-authority/",
        type: "GLOSSARY",
      },
      {
        label: "Increase organic traffic",
        href: "/use-cases/increase-organic-traffic/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "how-to-measure-search-visibility",
    type: "guide",
    topic: "Analytics",
    title: "How to Measure Search Visibility",
    answer:
      "Measure visibility on four layers: whether pages are indexed, whether they appear for the queries that matter, whether appearance produces visits, and whether visits produce enquiries. Reporting only the last one hides where a problem actually is.",
    readingTime: "6 min",
    body: [
      "Start with eligibility. Index coverage tells you which pages can rank at all. A content programme producing pages that never get indexed looks like a content problem in traffic reporting and is actually a technical one — a distinction that costs many teams a quarter.",
      "Then appearance. Impressions and average position for the queries that describe your business tell you whether you are competing, independently of whether anyone clicked. This layer is where AI answers change things: presence in a generated answer produces no impression and no click, so it has to be sampled deliberately rather than read from a dashboard.",
      "Then arrival. Clicks and sessions, segmented by page type and query intent. Aggregate traffic is close to useless here: a rise driven by informational pages and a rise driven by commercial pages mean entirely different things, and averaging them conceals both.",
      "Then outcome. Enquiries, qualified enquiries and, where the data exists, revenue. This is the layer executives care about and the noisiest one, because it is affected by everything from seasonality to how quickly sales responds. It should be read as a trend, never as a monthly verdict.",
      "Add the signals that survive zero-click. Branded search volume shows whether more people are looking for you by name. Direct arrivals show the same from another angle. Both rise when a brand is being encountered in answers that never produce a click, which is exactly the visibility conventional reporting misses.",
      "Finally, choose a reporting cadence that matches the mechanism. Weekly numbers on a channel that moves over quarters generate reaction to noise, and the most common casualty is work that was about to start paying.",
    ],
    supports: ["analytics-implementation", "seo"],
    seo: {
      title: "How to Measure Search Visibility",
      description:
        "Measure eligibility, appearance, arrival and outcome separately. Why aggregate traffic conceals the problem and which signals survive zero-click.",
      primaryTopic: "measuring search visibility",
      secondaryTopics: ["SEO reporting", "analytics", "KPIs"],
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
        question: "What is the single best SEO metric?",
        answer:
          "There is not one. Qualified enquiries is the outcome that matters, but it is too noisy and too lagging to diagnose with. You need the eligibility and appearance layers to know where a problem actually sits.",
      },
      {
        question: "How do we measure AI search visibility?",
        answer:
          "By sampling. Ask a fixed set of buyer questions across the assistants your market uses, repeat on a schedule, and record whether you are cited. Corroborate with branded search and direct arrivals.",
      },
    ],
    related: [
      {
        label: "Zero-Click Search",
        href: "/resources/what-is-zero-click-search/",
        type: "GLOSSARY",
      },
      {
        label: "Marketing Attribution",
        href: "/resources/what-is-marketing-attribution/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "how-search-intent-works",
    type: "guide",
    topic: "Search",
    title: "How Search Intent Works",
    answer:
      "Search intent determines which kind of page can rank for a query. Search engines infer it from behaviour, then serve the page type that satisfied previous searchers — which is why the results page is better evidence of intent than the keyword.",
    readingTime: "5 min",
    body: [
      "Intent is inferred, not declared. Search engines observe which results people choose and which satisfy them, and gradually settle on a page type for each query. That accumulated judgement is what a results page shows you, which makes it far better evidence than any assumption drawn from the words.",
      "This explains a common frustration. A business publishes a service page targeting a keyword that sounds commercial, and it never ranks — because the results page is entirely explanatory content. The engine has already concluded that people asking that question want to understand something, not to buy.",
      "Intent also shifts along a buying journey, and a single query rarely covers it. Someone may begin by asking what a thing is, then how to choose between options, then what it costs, then who provides it locally. Those are four different pages, and trying to serve them all from one produces a page that satisfies none.",
      "Mixed-intent queries exist and are worth reading carefully. When a results page shows a mixture of guides and product pages, the engine is hedging, and either page type can win. Those are usually the most winnable queries for a business with genuine expertise.",
      "Intent should also decide how a page is judged. An explanatory page measured on direct enquiries will look like a failure and get deleted, taking the assisted conversions and AI citations it was quietly producing with it.",
      "The practical method is unchanged and cheap: before writing, search the query, read what ranks, and write the page type the results demand. Most wasted content is written without that ten-minute step.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "How Search Intent Works",
      description:
        "Intent is inferred from behaviour, which is why the results page is the best evidence. How intent shifts along a journey and why it decides measurement.",
      primaryTopic: "how search intent works",
      secondaryTopics: ["search intent", "keyword research", "content strategy"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: { label: "Read about SEO Services", href: "/services/seo/", tier: "T1" },
    faqs: [
      {
        question: "Why does our service page not rank for its main keyword?",
        answer:
          "Often because the query's intent is informational. If the results page is full of guides, a service page will not win it. The route in is to answer the question, then link to the service.",
      },
      {
        question: "Can intent change over time?",
        answer:
          "Yes. As a market matures or a term becomes commercial, the page types that rank shift with it. Re-checking the results page for important queries once or twice a year catches those changes.",
      },
    ],
    related: [
      {
        label: "Search Intent",
        href: "/resources/what-is-search-intent/",
        type: "GLOSSARY",
      },
      {
        label: "How to Run a Content Audit",
        href: "/resources/how-to-run-a-content-audit/",
        type: "GUIDE",
      },
    ],
  },
  {
    slug: "how-to-run-a-content-audit",
    type: "guide",
    topic: "SEO",
    title: "How to Run a Content Audit",
    answer:
      "A content audit sorts every page into keep, improve, consolidate or remove, judged on whether the page earns visibility, serves a distinct intent, and is still accurate. Most sites finish an honest audit with fewer pages and better performance.",
    readingTime: "6 min",
    body: [
      "Begin with a complete inventory, not a sample. Every indexable URL, with its impressions, clicks, conversions, last update and internal links pointing to it. The pages nobody remembers publishing are exactly the ones an audit exists to find.",
      "Judge each page on three questions. Does it earn anything — visibility, enquiries, citations, links? Does it serve an intent no other page serves? Is it still true? A page failing all three is a candidate for removal; a page failing only the third needs updating rather than deleting.",
      "Consolidation is usually the highest-value action and the least popular. Several thin pages competing for the same intent split their signals and none ranks well. Merging them into one substantial page, then redirecting the others to it, concentrates what was divided. Expect internal resistance from whoever commissioned the originals.",
      "Removal is legitimate and should be deliberate. Pages that are inaccurate, duplicated or serve no intent cost crawl effort and dilute the site's apparent focus. Redirect them where a genuine equivalent exists; return a clean 410 where nothing does. Redirecting everything to the homepage is the common mistake.",
      "Update what is close. Many pages underperform because they are stale rather than weak: an outdated example, a changed process, a missing answer people now expect. Refreshing a page that already has some visibility usually returns more than writing a new one from nothing.",
      "Finish by fixing the internal links. An audit that consolidates and removes pages without repointing the links that referenced them leaves broken paths and orphaned survivors — which undoes much of the benefit.",
    ],
    supports: ["seo", "digital-strategy"],
    seo: {
      title: "How to Run a Content Audit",
      description:
        "Sort every page into keep, improve, consolidate or remove. Why consolidation is the highest-value action and why link repair finishes the job.",
      primaryTopic: "content audit",
      secondaryTopics: ["content strategy", "pruning", "consolidation"],
      intent: "informational",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    cta: { label: "Talk through an audit", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "Does deleting pages hurt SEO?",
        answer:
          "Removing pages that earn nothing and serve no intent generally helps, provided links are repointed and genuine equivalents are redirected. Harm comes from deleting pages that were quietly performing, which is what the inventory step prevents.",
      },
      {
        question: "How often should we audit content?",
        answer:
          "Annually for most sites, or after a migration or major strategy change. More frequent full audits usually consume effort that would be better spent acting on the last one.",
      },
    ],
    related: [
      {
        label: "How Search Intent Works",
        href: "/resources/how-search-intent-works/",
        type: "GUIDE",
      },
      {
        label: "Internal Linking",
        href: "/resources/what-is-internal-linking/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "how-to-build-an-automation-roadmap",
    type: "guide",
    topic: "Automation",
    title: "How to Build an Automation Roadmap",
    answer:
      "Build a roadmap by inventorying repeated work, scoring each item on volume, stability and system access, then sequencing so the first project is small enough to finish and instructive enough to change the plan.",
    readingTime: "6 min",
    body: [
      "Inventory the work as it is actually done, which is rarely how it is documented. Sit with the people doing it and record each repeated task, its frequency, roughly how long it takes, which systems it touches and where it stalls. The gap between the documented process and the real one is usually where the opportunity is.",
      "Score each candidate on three axes. Volume, because frequency times time saved is the return. Stability, because a process still changing shape will invalidate the build. Access, because a task spanning systems with proper APIs is a fraction of the cost of one requiring screens to be driven.",
      "Sequence for learning, not just for value. The first project should be small enough to complete in weeks, valuable enough that people notice, and instructive enough to correct the assumptions in the rest of the plan. Starting with the largest opportunity means discovering wrong assumptions at maximum cost.",
      "Simplify before automating, every time. Mapping a process almost always reveals steps that exist for reasons that no longer apply — an approval for a risk that has gone, a re-entry that exists because two systems were never connected. Removing a step returns more than automating it and costs less.",
      "Decide the exception policy up front. Every automated process meets input it cannot handle. Whether it stops, routes to a person with full context, or proceeds with a flagged default is a business decision, and making it during design is far cheaper than discovering the behaviour in production.",
      "Plan for ownership from the start. Automations break when systems change, credentials rotate and vendors update. A roadmap without a named owner and a maintenance allowance produces a portfolio of automations that quietly stop working.",
    ],
    supports: ["workflow-automation", "systems-integration"],
    seo: {
      title: "How to Build an Automation Roadmap",
      description:
        "Inventory real work, score on volume, stability and access, sequence for learning. Why simplification comes first and exceptions are decided up front.",
      primaryTopic: "automation roadmap",
      secondaryTopics: ["process automation", "operations"],
      intent: "informational",
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
        question: "Should the first automation be the biggest opportunity?",
        answer:
          "Usually not. The first should be small enough to finish quickly and instructive enough to correct the plan. Starting with the largest means discovering wrong assumptions at the highest cost.",
      },
      {
        question: "Who should own an automation roadmap?",
        answer:
          "Someone in operations who understands the processes and can approve changes to them, supported technically. Ownership placed purely in IT tends to produce automations that encode a process nobody wanted to keep.",
      },
    ],
    related: [
      {
        label: "Automation Readiness Checklist",
        href: "/resources/automation-readiness-checklist/",
        type: "CHECKLIST",
      },
      {
        label: "Improve operational efficiency",
        href: "/use-cases/improve-operational-efficiency/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "how-to-structure-a-website-for-search",
    type: "guide",
    topic: "SEO",
    title: "How to Structure a Website for Search",
    answer:
      "Structure a site so that every important page is reachable in a few clicks, each page owns one intent, and related pages link to each other. Structure decides what gets crawled, what gets understood and what gets found.",
    readingTime: "6 min",
    body: [
      "Start from the questions rather than the org chart. Site structures that mirror internal departments make sense to employees and confuse buyers, who arrive with a problem rather than a knowledge of how you are organised. The top-level sections should match the ways people actually approach the subject.",
      "Give each page one job. A page that tries to serve an explanatory question and a commercial one usually ranks for neither, because the content required for each pulls in opposite directions. Splitting them and linking is almost always stronger than combining them.",
      "Keep depth shallow for anything important. A page six clicks from the homepage is crawled less and ranked more weakly, not because depth is penalised but because signals thin out along the path. Hub pages that link to their whole cluster are the cheapest fix available.",
      "Make relationships explicit through linking. A hub that links to its cluster, cluster pages that link back and sideways to genuine siblings, and contextual links inside the prose where they help a reader continue. This is what makes a group of pages legible as coverage of one subject rather than as isolated documents.",
      "Design URLs to survive. Short, descriptive, lowercase, hyphenated, and free of dates or organisational structure that will change. Every URL change costs a redirect and a little of the signal that URL had accumulated, so the cheapest URL is one that never has to change.",
      "Finally, structure for editing as well as for search. If adding a page in the right place requires a developer, pages will end up in the wrong place. A structure the content team can maintain is the one that stays correct.",
    ],
    supports: ["seo", "corporate-websites"],
    seo: {
      title: "How to Structure a Website for Search",
      description:
        "Structure around buyer questions, one intent per page, shallow depth, explicit linking and durable URLs — and make it maintainable by editors.",
      primaryTopic: "website structure for SEO",
      secondaryTopics: ["site architecture", "information architecture"],
      intent: "informational",
    },
    audience: ["A4", "A7"],
    phase: "P1",
    cta: {
      label: "Read about Corporate Websites",
      href: "/services/corporate-websites/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How deep should a website be?",
        answer:
          "Important pages should be reachable within about three clicks of a frequently-crawled page. Deeper is workable with strong internal linking, but it needs a deliberate reason rather than being an accident of growth.",
      },
      {
        question: "Should URLs include dates or categories?",
        answer:
          "Avoid dates, which make content look stale and break when it is updated. Categories are fine if they are stable, but any element likely to be reorganised becomes a future redirect.",
      },
    ],
    related: [
      {
        label: "Internal Linking",
        href: "/resources/what-is-internal-linking/",
        type: "GLOSSARY",
      },
      {
        label: "How to Build Search Visibility",
        href: "/resources/how-to-build-search-visibility/",
        type: "GUIDE",
      },
    ],
  },
];
