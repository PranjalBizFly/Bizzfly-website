/**
 * Search depth services.
 *
 * These sit beneath /services/seo/ and exist because "SEO" is not one job.
 * A migration, a local programme and an enterprise governance engagement
 * share a discipline and almost nothing else — buyer, scope, timeline and
 * failure mode all differ, which is what makes them separate pages rather
 * than sections of one.
 *
 * Composition varies deliberately: diagnostic work is process-led, coverage
 * work is capability-led, and the judgement-heavy engagements are editorial.
 */

import type { Service } from "@/types/content";

export const searchServices: Service[] = [
  {
    slug: "seo-audit",
    practice: "search-ai-visibility",
    parent: "seo",
    group: "digital-visibility",
    layout: "process-led",
    diagram: "search-surfaces",
    title: "SEO Audit",
    answer:
      "A fixed-scope diagnostic that establishes why a site underperforms in search, ranked by commercial impact. It ends with a prioritised plan you own — whether or not we implement it.",
    seo: {
      title: "SEO Audit",
      description:
        "A fixed-scope diagnostic covering crawlability, indexation, content and authority, ending in a prioritised plan you own.",
      primaryTopic: "seo audit",
      secondaryTopics: ["technical audit", "SEO diagnostic"],
      intent: "commercial",
    },
    audience: ["A3", "A1"],
    phase: "P1",
    problems: [
      "Performance has been flat or falling and nobody can explain why",
      "Several suppliers have given contradictory explanations",
      "Investment is being asked for without evidence of where it should go",
    ],
    outcomes: [
      "A ranked list of constraints, most damaging first",
      "Findings evidenced against your own data rather than a tool score",
      "A plan you can execute in-house, with us, or with someone else",
    ],
    whoFor: [
      "Sites where visibility has declined without an obvious cause",
      "Businesses about to invest in SEO and wanting a baseline first",
      "Teams inheriting a site they did not build",
    ],
    included: [
      "Crawl and indexation analysis against server log evidence where available",
      "Content assessment against the queries that carry commercial intent",
      "Technical health: rendering, speed, structured data, canonical logic",
      "Authority and link profile review, including risk from past activity",
      "Competitive comparison on the queries that matter to your revenue",
      "A prioritised remediation plan with effort and expected impact stated",
    ],
    approach: [
      {
        index: 1,
        title: "Baseline",
        description:
          "Analytics, Search Console and rankings before anything is judged, so findings are anchored to what actually happened rather than tool defaults.",
        duration: "Week 1",
      },
      {
        index: 2,
        title: "Diagnosis",
        description:
          "Crawl, render and content analysis, following the evidence rather than a fixed checklist. Checklists find what they contain; the constraint is often outside them.",
        duration: "Weeks 1–2",
      },
      {
        index: 3,
        title: "Prioritisation",
        description:
          "Findings ranked by commercial impact against implementation cost, because an audit that lists 200 issues without a sequence does not get acted on.",
        duration: "Week 3",
      },
      {
        index: 4,
        title: "Handover",
        description:
          "A working session with the people who will implement it. A document delivered without one is read once and filed.",
        duration: "Week 3",
      },
    ],
    timeline: "Three weeks for most sites; longer where log analysis or a large catalogue is involved.",
    outOfScope: [
      "Implementation — this is a diagnostic, priced and scoped as one",
      "Rank predictions, which no honest audit can provide",
      "A tool export reformatted as a report",
    ],
    cta: {
      label: "Request an SEO audit",
      href: "/contact/",
      tier: "T3",
      note: "Fixed scope and fixed price, agreed before we start.",
    },
    faqs: [
      {
        question: "How is this different from a free audit tool?",
        answer:
          "A tool reports what it can measure and weights everything equally. It cannot tell you which of 200 findings is costing you enquiries, and it cannot see that your real constraint is a template decision rather than a page. The value here is the ranking and the reasoning, not the list.",
      },
      {
        question: "Do we have to use you to implement it?",
        answer:
          "No. The plan is written to be executable by your own team or another supplier, and it is yours. An audit sold as a route into a retainer tends to find problems only the seller can fix.",
      },
      {
        question: "How long before we see results from acting on it?",
        answer:
          "Technical fixes affecting indexation can show within weeks. Content and authority work usually takes three to six months to be readable in the data. The plan states which is which so expectations are set before the work starts.",
      },
    ],
    related: [
      { label: "SEO Audit Checklist", href: "/resources/seo-audit-checklist/", type: "CHECKLIST" },
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
    ],
  },
  {
    slug: "on-page-seo",
    practice: "search-ai-visibility",
    parent: "seo",
    group: "digital-visibility",
    layout: "capability-led",
    diagram: "content-structure",
    title: "On-Page SEO",
    answer:
      "Page-level work that makes each page unambiguously about one thing: titles, headings, internal links, structure and content depth. It is distinct from technical SEO, which governs whether a page can be reached at all.",
    seo: {
      title: "On-Page SEO",
      description:
        "Titles, headings, internal linking, content depth and structure — page-level relevance, distinct from site-level technical health.",
      primaryTopic: "on-page seo",
      secondaryTopics: ["page optimisation", "internal linking"],
      intent: "commercial",
    },
    audience: ["A4", "A3"],
    phase: "P1",
    problems: [
      "Several pages compete for the same query and none of them wins",
      "Pages rank on the edge of visibility and never break through",
      "Content is good but structured so nothing can be extracted from it",
    ],
    outcomes: [
      "One clear subject per page, with the overlaps resolved",
      "Internal links that pass relevance to the pages that should rank",
      "Content that answers before it argues, so it can be quoted",
    ],
    whoFor: [
      "Sites with substantial content that underperforms its quality",
      "Teams that have fixed the technical layer and stalled",
      "Businesses whose own pages compete against each other",
    ],
    included: [
      "Query-to-page mapping, with cannibalisation resolved by consolidation or differentiation",
      "Title and meta description work judged on click-through, not length rules",
      "Heading structure that reflects the argument rather than decorating it",
      "Content depth assessed against what currently ranks, not a word count",
      "Internal linking that concentrates relevance rather than distributing it evenly",
      "Answer-first restructuring so passages survive extraction",
    ],
    timeline: "Four to eight weeks for a core page set, then continuous as content is published.",
    outOfScope: [
      "Keyword density targets, which have not described how ranking works for many years",
      "Rewriting pages that are underperforming for technical rather than editorial reasons",
    ],
    cta: {
      label: "Discuss on-page work",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "Is on-page SEO still relevant with AI search?",
        answer:
          "More so. The systems assembling AI answers need to identify what a page is about and lift a self-contained passage from it. Clear structure and an answer stated plainly are exactly what makes that possible.",
      },
      {
        question: "What is keyword cannibalisation?",
        answer:
          "Two or more of your pages targeting the same query, so search engines have to choose between them and often rank neither well. The fix is either merging them or genuinely differentiating what each covers.",
      },
    ],
    related: [
      { label: "Content Cluster", href: "/resources/what-is-a-content-cluster/", type: "GLOSSARY" },
      { label: "SEO Content Strategy", href: "/services/content-strategy/", type: "SERVICE" },
    ],
  },
  {
    slug: "local-seo",
    practice: "search-ai-visibility",
    parent: "seo",
    group: "digital-visibility",
    layout: "process-led",
    diagram: "search-surfaces",
    title: "Local SEO",
    answer:
      "Visibility in map results and location-qualified searches, for businesses with premises or defined service areas. Proximity, prominence and relevance decide it — and only two of the three can be worked on.",
    seo: {
      title: "Local SEO",
      description:
        "Map pack and location-qualified visibility for multi-location and service-area businesses. Profiles, consistency, reviews and local pages.",
      primaryTopic: "local seo services",
      secondaryTopics: ["map pack", "multi-location SEO"],
      intent: "commercial",
    },
    audience: ["A1", "A3"],
    phase: "P1",
    problems: [
      "Competitors appear in the map pack and you do not",
      "Multiple locations exist but only one is visible",
      "Business information differs across the sites that list you",
    ],
    outcomes: [
      "Each location individually findable rather than one dominating",
      "Consistent business data across the sources that feed local results",
      "A review process that runs without being remembered",
    ],
    whoFor: [
      "Multi-location businesses where some sites perform and others do not",
      "Service-area businesses without a public premises",
      "Organisations whose listings were created ad hoc over years",
    ],
    included: [
      "Business profile setup and optimisation for each location",
      "Citation consistency across the directories that actually feed results",
      "Location pages with genuinely distinct content, not templated duplicates",
      "Review generation process built into your existing workflow",
      "Local structured data and service-area definition",
      "Position tracking from the locations you serve rather than a single point",
    ],
    approach: [
      {
        index: 1,
        title: "Inventory",
        description:
          "Every location, every existing listing and every inconsistency. Duplicate and abandoned profiles are common and they compete with the real ones.",
      },
      {
        index: 2,
        title: "Correct",
        description:
          "Claim, merge and correct profiles, then align citations. Inconsistent data is a direct suppressant, and this alone often moves things.",
      },
      {
        index: 3,
        title: "Differentiate",
        description:
          "Location pages built around what is actually true of each site — team, service mix, area covered. Templated pages with a swapped town name are the standard failure here.",
      },
      {
        index: 4,
        title: "Sustain",
        description:
          "Review cadence, post cadence and monitoring, so a competitor's activity does not quietly overtake the position you earned.",
      },
    ],
    timeline: "Six to twelve weeks to establish; local visibility then requires ongoing activity to hold.",
    outOfScope: [
      "Fake reviews or review gating, both of which risk profile suspension",
      "Listings for locations that do not physically exist",
      "A page per town where you have no presence — that is spam and it is treated as such",
    ],
    cta: {
      label: "Discuss local visibility",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "Why do we rank in one town and not the next?",
        answer:
          "Proximity is a strong factor in local results and you cannot change where you are. What you can change is prominence and relevance — reviews, consistency, and pages that genuinely address the area rather than naming it.",
      },
      {
        question: "How many reviews do we need?",
        answer:
          "Enough to be credible against the businesses you compete with, which varies by category and area. The pattern matters more than the count: steady recent reviews outweigh a batch collected once.",
      },
    ],
    related: [
      { label: "Rank in local search", href: "/use-cases/rank-in-local-search/", type: "USE CASE" },
      { label: "Local SEO vs National SEO", href: "/resources/local-seo-vs-national-seo/", type: "COMPARISON" },
    ],
  },
  {
    slug: "enterprise-seo",
    practice: "search-ai-visibility",
    parent: "seo",
    group: "digital-visibility",
    layout: "editorial",
    diagram: "none",
    title: "Enterprise SEO",
    answer:
      "Search work for organisations where the constraint is not knowing what to do but getting it deployed across teams that do not report to you. The deliverables are standards, governance and evidence.",
    seo: {
      title: "Enterprise SEO",
      description:
        "Governance, standards and template-level work for large sites and multi-team organisations, where deployment is the constraint.",
      primaryTopic: "enterprise seo",
      secondaryTopics: ["SEO governance", "large site SEO"],
      intent: "commercial",
    },
    audience: ["A3", "A2", "A7"],
    phase: "P2",
    problems: [
      "Recommendations are agreed and then never reach a sprint",
      "Different teams publish to different standards on the same domain",
      "The site is large enough that page-by-page work cannot keep up",
    ],
    outcomes: [
      "Standards embedded in the definition of done rather than requested",
      "Template-level fixes that resolve thousands of pages at once",
      "A prioritisation model that survives contact with other teams' roadmaps",
    ],
    whoFor: [
      "Sites large enough that templates matter more than pages",
      "Organisations where marketing, product and engineering have separate roadmaps",
      "Teams whose audit findings keep being deprioritised",
    ],
    included: [
      "Template-level diagnosis, so fixes apply to page classes rather than pages",
      "Written standards for content, markup and rendering",
      "Automated checks that fail a build rather than living in a wiki",
      "Prioritisation framed commercially, for use in cross-team planning",
      "Working sessions with the teams who will implement, not just the sponsor",
      "Reporting that separates eligibility, appearance, arrival and outcome",
    ],
    timeline: "An initial quarter to establish standards and instrumentation; then ongoing governance.",
    outOfScope: [
      "Producing recommendations without access to the teams who would implement them",
      "Content production at volume — that is a content strategy engagement",
    ],
    cta: {
      label: "Discuss an enterprise programme",
      href: "/contact/",
      tier: "T4",
    },
    faqs: [
      {
        question: "At what size does SEO become an enterprise problem?",
        answer:
          "Less about page count than organisational shape. Once more than one team can publish to the domain and none of them owns search, the bottleneck moves from knowledge to coordination — and that is the enterprise problem regardless of size.",
      },
      {
        question: "Why prioritise templates over pages?",
        answer:
          "A template generates a class of pages. Fixing it resolves every page in that class and prevents the next thousand from having the same fault, which page-level work cannot do at any staffing level.",
      },
    ],
    related: [
      { label: "Enterprise SEO Framework", href: "/resources/enterprise-seo-framework/", type: "GUIDE" },
      { label: "Site Architecture", href: "/services/site-architecture/", type: "SERVICE" },
    ],
  },
  {
    slug: "ecommerce-seo",
    practice: "search-ai-visibility",
    parent: "seo",
    group: "digital-visibility",
    layout: "technology-led",
    diagram: "content-structure",
    title: "E-commerce SEO",
    answer:
      "Search work shaped by catalogue mechanics: faceted navigation generating near-infinite URLs, category pages carrying the commercial weight, and product descriptions duplicated from the manufacturer across every competitor.",
    seo: {
      title: "E-commerce SEO",
      description:
        "Faceted navigation control, category page depth, product duplication and out-of-stock handling for catalogue sites.",
      primaryTopic: "ecommerce seo",
      secondaryTopics: ["faceted navigation", "category pages"],
      intent: "commercial",
    },
    audience: ["A3", "A1"],
    phase: "P1",
    problems: [
      "Crawl budget is consumed by filter combinations nobody searches for",
      "Product pages carry the manufacturer's description, identical to every rival",
      "Category pages are thin and the products beneath them cannot rank alone",
    ],
    outcomes: [
      "A crawlable catalogue where the valuable URLs are the ones being indexed",
      "Category pages that can rank for the commercial terms buyers use",
      "Discontinued and out-of-stock products handled without losing accumulated authority",
    ],
    whoFor: [
      "Catalogue sites where indexation counts far exceed real product counts",
      "Retailers competing on products they do not exclusively sell",
      "Stores whose category pages get traffic but not the terms they should",
    ],
    included: [
      "Faceted navigation rules: what is indexable, what is crawlable, what is neither",
      "Category page architecture with content that earns the ranking",
      "Product page differentiation beyond supplied manufacturer copy",
      "Product and offer structured data, kept accurate as stock changes",
      "Out-of-stock, discontinued and variant URL policy",
      "Internal linking that concentrates authority on commercial pages",
    ],
    timeline: "Eight to sixteen weeks depending on catalogue size and platform constraints.",
    outOfScope: [
      "Paid shopping campaign management",
      "Spinning manufacturer copy into near-duplicates, which solves nothing",
    ],
    cta: {
      label: "Discuss catalogue visibility",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "Should filtered pages be indexed?",
        answer:
          "A small number, where the combination matches real demand — a colour or size people actually search for. The rest should be crawlable for navigation but not indexable, because uncontrolled facets can generate more URLs than you have products.",
      },
      {
        question: "What happens to a product page when the product is discontinued?",
        answer:
          "If a genuine replacement exists, redirect to it. If not, keep the page with clear alternatives, or retire it deliberately. Redirecting everything to a category page loses the specificity that made those pages rank.",
      },
    ],
    related: [
      { label: "E-commerce SEO Checklist", href: "/resources/ecommerce-seo-checklist/", type: "CHECKLIST" },
      { label: "E-commerce", href: "/industries/ecommerce/", type: "INDUSTRY" },
    ],
  },
  {
    slug: "seo-migration",
    practice: "search-ai-visibility",
    parent: "seo",
    group: "digital-visibility",
    layout: "process-led",
    diagram: "process-transformation",
    title: "SEO Migration",
    answer:
      "Protecting search visibility through a replatform, redesign, domain change or restructure. The work happens before launch — after it, options narrow to recovery.",
    seo: {
      title: "SEO Migration",
      description:
        "URL mapping, content and rendering parity, phased launch and post-launch monitoring for replatforms, redesigns and domain changes.",
      primaryTopic: "seo migration",
      secondaryTopics: ["site migration", "replatform SEO"],
      intent: "commercial",
    },
    audience: ["A7", "A3"],
    phase: "P1",
    problems: [
      "A replatform is scheduled and nobody owns what happens to search visibility",
      "A previous migration lost traffic that never fully returned",
      "Two sites are merging and no one has decided what happens to the retiring one",
    ],
    outcomes: [
      "Every valuable URL either kept, redirected in one hop, or retired deliberately",
      "Content and rendering parity verified before launch rather than diagnosed after",
      "A monitored launch with a rollback path and a known recovery window",
    ],
    whoFor: [
      "Teams mid-way through a redesign or replatform",
      "Businesses consolidating multiple sites or changing domain",
      "Organisations that lost visibility in a previous migration",
    ],
    included: [
      "Pre-migration inventory of every indexable URL with its traffic, links and rankings",
      "URL mapping to destinations, reviewed page by page for the pages that matter",
      "Content parity checks so ranking pages are not trimmed to fit a template",
      "Rendering parity checks, because a move to client-side rendering loses visibility no redirect can restore",
      "Launch-day verification and staged rollout where the site allows it",
      "Post-launch monitoring across the recovery window, not just the first week",
    ],
    approach: [
      {
        index: 1,
        title: "Inventory",
        description:
          "Captured before the new site exists. Building this afterwards is materially harder and usually incomplete.",
        duration: "Before design freeze",
      },
      {
        index: 2,
        title: "Map",
        description:
          "Each URL to a destination — kept, redirected once, or retired with a clean 410. Chains, loops and blanket homepage redirects cause most migration damage.",
        duration: "During build",
      },
      {
        index: 3,
        title: "Verify",
        description:
          "Parity of content and rendering on staging, against the inventory. This is where a template that trims 700 words gets caught.",
        duration: "Pre-launch",
      },
      {
        index: 4,
        title: "Monitor",
        description:
          "Index coverage, redirect resolution and priority rankings — daily for two weeks, weekly for a quarter, because effects lag the change.",
        duration: "Post-launch",
      },
    ],
    timeline: "Runs alongside the build; typically engaged from design freeze through the first quarter after launch.",
    outOfScope: [
      "Guaranteeing zero fluctuation — a short reprocessing dip is normal",
      "Rescuing a migration launched without a redirect map, which is recovery rather than migration",
    ],
    cta: {
      label: "Discuss a planned migration",
      href: "/contact/",
      tier: "T3",
      note: "Most valuable before the build starts.",
    },
    faqs: [
      {
        question: "When should we involve SEO in a redesign?",
        answer:
          "Before the information architecture is signed off. Involved at that point, most migration risk is designed out; involved at launch, the work is limited to redirects and the damage from template and rendering decisions is already fixed.",
      },
      {
        question: "How long does recovery take if something goes wrong?",
        answer:
          "It depends on the cause. A missing redirect map corrected within days usually recovers in weeks. Lost content depth or a rendering change takes a quarter or more, because the pages have to re-earn their position.",
      },
    ],
    related: [
      { label: "Technical SEO Migration Guide", href: "/resources/technical-seo-migration-guide/", type: "GUIDE" },
      { label: "Site Migration Checklist", href: "/resources/site-migration-checklist/", type: "CHECKLIST" },
    ],
  },
  {
    slug: "content-strategy",
    practice: "search-ai-visibility",
    parent: "seo",
    group: "digital-visibility",
    layout: "editorial",
    diagram: "content-structure",
    title: "SEO Content Strategy",
    answer:
      "Deciding which pages should exist, in what order, based on the questions buyers ask across the whole decision — not on a keyword export sorted by volume.",
    seo: {
      title: "SEO Content Strategy",
      description:
        "Coverage planned against buyer questions and the decision they are making, with format decided by what actually ranks.",
      primaryTopic: "seo content strategy",
      secondaryTopics: ["content planning", "topic clusters"],
      intent: "commercial",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    problems: [
      "Content is published consistently and none of it ranks or converts",
      "The blog covers what is easy to write rather than what buyers ask",
      "Nobody can say which page should exist next, or why",
    ],
    outcomes: [
      "A plan sequenced by proximity to the buying decision",
      "Coverage of the comparison and evaluation questions most sites skip",
      "A maintenance rhythm, so existing pages do not decay while new ones are added",
    ],
    whoFor: [
      "Teams publishing regularly with nothing to show for it",
      "Businesses whose content stops at what they sell",
      "Organisations planning a content investment and wanting it directed",
    ],
    included: [
      "Buyer question mapping across the full decision, not just the purchase moment",
      "Gap analysis against what exists and what currently ranks",
      "Format decisions taken from the results page rather than assumed",
      "Cluster architecture with internal linking planned in advance",
      "A sequenced plan with owners and cadence",
      "A maintenance schedule for content that already earns visibility",
    ],
    timeline: "Four to six weeks for the strategy; execution runs to the plan's cadence.",
    outOfScope: [
      "Volume publishing to a monthly quota",
      "AI-generated content produced without subject expertise behind it",
    ],
    cta: {
      label: "Discuss a content plan",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "How many pages should we publish a month?",
        answer:
          "As many as you can make genuinely useful. A quota fills itself with thin pages that compete with your good ones, and the effort would return more spent updating what already ranks.",
      },
      {
        question: "Does AI-generated content work for SEO?",
        answer:
          "As a drafting aid with real expertise behind the edit, sometimes. Published unedited, it produces pages that read like every other page on the subject — which is precisely what neither ranking systems nor readers reward.",
      },
    ],
    related: [
      { label: "Content Planning Framework", href: "/resources/content-planning-framework/", type: "GUIDE" },
      { label: "How Search Intent Works", href: "/resources/how-search-intent-works/", type: "GUIDE" },
    ],
  },
  {
    slug: "digital-pr",
    practice: "digital-marketing",
    group: "digital-visibility",
    layout: "editorial",
    diagram: "none",
    title: "Digital PR & Link Earning",
    answer:
      "Earning references from publications and sites your market already reads, by giving them something worth covering. It is slower than buying links, and it does not carry the penalty risk that buying them does.",
    seo: {
      title: "Digital PR & Link Earning",
      description:
        "Earned coverage and citations built on genuinely newsworthy material. Why link buying carries risk that outlasts the benefit.",
      primaryTopic: "digital pr",
      secondaryTopics: ["link building", "earned coverage"],
      intent: "commercial",
    },
    audience: ["A3", "A4"],
    phase: "P2",
    problems: [
      "Content is strong but the domain lacks the authority to rank it",
      "Competitors are cited in the publications your buyers read and you are not",
      "A previous link-building supplier left a profile that now looks manipulated",
    ],
    outcomes: [
      "References from sites with genuine audiences in your market",
      "Material worth citing, which continues to earn links after the campaign",
      "A profile that does not need disavowing later",
    ],
    whoFor: [
      "Businesses with subject expertise that has never been packaged for publication",
      "Sites where authority, not content, is the ceiling",
      "Organisations wanting citation presence in AI answers as well as search",
    ],
    included: [
      "Identifying what your organisation genuinely knows that is worth publishing",
      "Original material — data, research, analysis — built to be cited",
      "Targeted outreach to publications your buyers actually read",
      "Digital newsroom structure so coverage is discoverable and attributable",
      "Link profile review, including risk from historic activity",
      "Measurement by referring domains and citation presence, not raw link counts",
    ],
    timeline: "Three to six months before compounding effects are readable in the data.",
    outOfScope: [
      "Paid link placement, private blog networks and link exchanges",
      "Mass outreach to sites with no audience, which produces links nobody follows",
      "Guaranteed placement counts, which is what link selling looks like when described honestly",
    ],
    cta: {
      label: "Discuss earned coverage",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "Can you guarantee a number of links?",
        answer:
          "No, and a guarantee is the clearest sign links are being bought rather than earned. Earned coverage depends on an editor's judgement, which is exactly what gives the link its value.",
      },
      {
        question: "Do links still matter?",
        answer:
          "Yes, though less as a raw count and more as evidence of who is regarded as a credible source. That evidence is also what AI systems draw on when deciding which sources to cite, which has raised its value rather than lowered it.",
      },
    ],
    related: [
      { label: "Backlink", href: "/resources/what-is-a-backlink/", type: "GLOSSARY" },
      { label: "Media & Publishing", href: "/industries/media/", type: "INDUSTRY" },
    ],
  },
  {
    slug: "structured-data",
    practice: "search-ai-visibility",
    parent: "technical-seo",
    group: "digital-visibility",
    layout: "technology-led",
    diagram: "content-structure",
    title: "Structured Data Implementation",
    answer:
      "Marking up what a page is about so machines do not have to infer it. Done properly, entities are defined once and referenced everywhere, rather than repeated inconsistently on every template.",
    seo: {
      title: "Structured Data Implementation",
      description:
        "Schema.org markup as a connected entity graph — defined once, referenced across templates, validated continuously.",
      primaryTopic: "structured data implementation",
      secondaryTopics: ["schema markup", "JSON-LD"],
      intent: "commercial",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    problems: [
      "Markup was added per template and now contradicts itself across the site",
      "Rich results appear inconsistently or have stopped appearing",
      "AI systems describe the business inaccurately or attribute it to someone else",
    ],
    outcomes: [
      "One canonical organisation entity, referenced rather than repeated",
      "Markup that validates and stays valid as content changes",
      "A machine-readable description of the business that matches the human one",
    ],
    whoFor: [
      "Sites with markup accumulated across several redesigns",
      "Businesses that need to be identified unambiguously by AI systems",
      "Teams whose rich results have degraded without explanation",
    ],
    included: [
      "Entity model: organisation, services, locations, people and how they relate",
      "JSON-LD implementation with @id references rather than duplicated blocks",
      "Page-type markup — article, FAQ, product, breadcrumb — applied where it is warranted",
      "Consistency between markup, visible content and external profiles",
      "Automated validation in the build, so invalid markup fails before it ships",
      "Rich result monitoring after deployment",
    ],
    timeline: "Three to six weeks for most sites, depending on template count.",
    outOfScope: [
      "Marking up content that is not visible on the page, which is a guidelines violation",
      "Markup as a substitute for content — it describes a page, it does not improve it",
    ],
    cta: {
      label: "Discuss structured data",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "Does structured data improve rankings?",
        answer:
          "Not directly. It affects how a page is understood and presented — rich results, entity recognition, eligibility for certain features. The visibility gain is real; the mechanism is not a ranking boost.",
      },
      {
        question: "Why does markup need an entity model?",
        answer:
          "Because repeating the organisation block on every template guarantees drift: one page updates, forty do not, and the machine-readable description of your business becomes contradictory. Defining it once and referencing it removes that class of problem.",
      },
    ],
    related: [
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
      { label: "How AI Search Works", href: "/resources/how-ai-search-works/", type: "GUIDE" },
    ],
  },
  {
    slug: "site-architecture",
    practice: "search-ai-visibility",
    parent: "seo",
    group: "digital-visibility",
    layout: "editorial",
    diagram: "content-structure",
    title: "Site Architecture",
    answer:
      "How pages are organised, grouped and linked — which decides what is discoverable, what accumulates authority and whether anyone can find the page that would have answered them.",
    seo: {
      title: "Site Architecture",
      description:
        "Structure, hierarchy, URL design and internal linking. Why architecture decides discoverability before any content is written.",
      primaryTopic: "website information architecture",
      secondaryTopics: ["site structure", "internal linking", "URL design"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P2",
    problems: [
      "The site grew section by section and now reflects the org chart, not the buyer",
      "Valuable pages are four or five clicks from anywhere anyone lands",
      "Nobody can say where a new page should go, so it goes wherever there is room",
    ],
    outcomes: [
      "A hierarchy organised around how buyers think rather than how you are structured",
      "Important pages reachable in few clicks, with authority flowing to them",
      "A rule for where new content belongs, so structure does not decay again",
    ],
    whoFor: [
      "Sites that have grown past the structure they were designed with",
      "Organisations planning a redesign and wanting structure decided before design",
      "Teams with good content that nobody reaches",
    ],
    included: [
      "Current structure mapped against traffic, depth and internal link distribution",
      "Hierarchy design based on buyer tasks and query patterns",
      "URL structure and naming conventions, with migration implications stated",
      "Internal linking model — hubs, clusters and the rules connecting them",
      "Navigation and breadcrumb design that matches the hierarchy rather than fighting it",
      "Governance rules for where new content belongs",
    ],
    timeline: "Four to eight weeks; implementation depends on whether URLs change.",
    outOfScope: [
      "Visual design of navigation, which follows the structure rather than defining it",
      "Restructuring URLs without a migration plan — see SEO Migration",
    ],
    cta: {
      label: "Discuss site structure",
      href: "/contact/",
      tier: "T3",
    },
    faqs: [
      {
        question: "How deep should a site be?",
        answer:
          "Commercially important pages within about three clicks of the homepage. Depth itself is not a penalty, but pages buried deep receive fewer internal links and less crawl attention, which compounds.",
      },
      {
        question: "Should we change URLs to improve structure?",
        answer:
          "Only when the improvement is substantial and the migration is planned properly. URL changes carry real risk, and a better structure implemented through navigation and internal linking often captures most of the benefit without it.",
      },
    ],
    related: [
      { label: "Site Architecture and Enterprise SEO", href: "/services/enterprise-seo/", type: "SERVICE" },
      { label: "Website Redesign", href: "/services/website-redesign/", type: "SERVICE" },
    ],
  },
];
