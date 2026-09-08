import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Custom crafted metadata mappings for specific resources
const CUSTOM_OVERRIDES = {
  // Articles
  "what-the-first-90-days-of-seo-look-like": {
    query: "search optimization roadmap calendar planning meeting",
    alt: "SEO consultants mapping out a 90-day crawl technical audit and content optimization sprint roadmap",
    caption: "The first 90 days of SEO focus on crawl accessibility, entity foundations, and resolving technical debt.",
    type: "human",
  },
  "how-to-choose-a-first-automation-project": {
    query: "business process automation whiteboard brainstorming",
    alt: "Operations leads assessing high-impact, low-complexity manual processes on a priority matrix board",
    caption: "Select initial automation initiatives where friction is high and system integration risk is low.",
    type: "business",
  },
  // Guides
  "how-ai-search-works": {
    query: "vector search embeddings neural network retrieval",
    alt: "Engineers examining semantic embeddings and vector space similarity clusters on high-resolution displays",
    caption: "AI search engines retrieve passages based on vector semantic proximity rather than simple keyword matches.",
    type: "technology",
  },
  "how-to-prepare-content-for-ai-search": {
    query: "structured data schema writing documentation team",
    alt: "Content strategists structuring factual schema hierarchies and clear direct answer blocks for LLM extraction",
    caption: "Optimizing content for answer engines requires direct definitions, verified facts, and strict semantic markup.",
    type: "editorial",
  },
  "how-to-build-search-visibility": {
    query: "digital growth organic search strategy team",
    alt: "Growth team reviewing multi-channel search discoverability frameworks and topical authority clusters",
    caption: "Sustainable visibility combines clean technical architecture with compounding topical depth.",
    type: "human",
  },
  "how-to-measure-search-visibility": {
    query: "search visibility analytics metrics chart laptop",
    alt: "Search analyst reviewing impression share, average position trends, and share of voice metrics",
    caption: "True search visibility tracks answer engine citations and organic market share, not just single keyword ranks.",
    type: "editorial",
  },
  "how-search-intent-works": {
    query: "user experience search journey mapping customer",
    alt: "Product researchers mapping informational, commercial, and transactional user search journeys",
    caption: "Aligning page architecture directly with search intent prevents bounce rates and maximizes qualified engagement.",
    type: "human",
  },
  "how-to-run-a-content-audit": {
    query: "content audit spreadsheet data analytics review",
    alt: "Editorial strategists auditing content inventory matrices, page traffic decays, and update priorities",
    caption: "Systematic content audits identify decaying assets, keyword cannibalisation, and high-value consolidation targets.",
    type: "editorial",
  },
  "how-to-build-an-automation-roadmap": {
    query: "digital roadmap automation strategy timeline planning",
    alt: "Enterprise architects laying out multi-quarter automation milestones and system integration dependencies",
    caption: "A phased automation roadmap sequences quick operational wins ahead of complex core system migrations.",
    type: "business",
  },
  "how-to-structure-a-website-for-search": {
    query: "website information architecture tree wireframe diagram",
    alt: "Information architects mapping hierarchical URL taxonomy and internal linking silo structures on glass board",
    caption: "Hierarchical site architecture distributes PageRank and clarifies topical context for search crawlers.",
    type: "editorial",
  },
  "seo-reporting-framework": {
    query: "executive reporting business intelligence presentation",
    alt: "Analytics consultant presenting executive search performance trends and revenue attribution figures",
    caption: "Executive SEO reporting ties organic visibility directly to qualified pipeline and customer acquisition costs.",
    type: "business",
  },
  "enterprise-seo-framework": {
    query: "enterprise digital governance scale technology meeting",
    alt: "Cross-functional enterprise teams collaborating on large-scale web governance and indexing frameworks",
    caption: "Enterprise SEO balances automation, scalable templates, and rigorous release validation across millions of URLs.",
    type: "business",
  },
  "content-planning-framework": {
    query: "editorial calendar content planning strategy meeting",
    alt: "Editorial directors developing quarterly content topic clusters and research-backed publishing schedules",
    caption: "Strategic content planning establishes topical authority before expanding into adjacent search domains.",
    type: "human",
  },
  "technical-seo-migration-guide": {
    query: "server migration technical redirects terminal code",
    alt: "DevOps and SEO engineers monitoring 301 redirect map executions and DNS cutover latency in terminal",
    caption: "Flawless site migrations require strict 1-to-1 redirect mapping, staging validation, and continuous log auditing.",
    type: "technology",
  },
  "ai-visibility-measurement-guide": {
    query: "artificial intelligence model citation benchmarking analysis",
    alt: "Data scientists benchmarking generative AI citation frequencies across major LLM search interfaces",
    caption: "Tracking generative search visibility measures answer engine brand mentions and knowledge graph citations.",
    type: "technology",
  },
  "automation-business-case-guide": {
    query: "business financial return on investment modeling spreadsheet",
    alt: "Operations directors calculating labor hour savings and return on investment for workflow automation proposals",
    caption: "A compelling automation business case quantifies error reduction, cycle time compression, and labor redeployment.",
    type: "business",
  },
  "ai-governance-guide": {
    query: "data governance ethical artificial intelligence compliance",
    alt: "Technology leadership team reviewing generative AI usage policies and data confidentiality safeguards",
    caption: "Pragmatic AI governance sets guardrails for data privacy, model hallucination review, and intellectual property.",
    type: "human",
  },
  "website-brief-guide": {
    query: "project brief website specifications design document",
    alt: "Product manager detailing website technical requirements, user personas, and conversion objectives in brief",
    caption: "A comprehensive website brief aligns business objectives, technical constraints, and measurable success criteria.",
    type: "editorial",
  },
  "software-requirements-guide": {
    query: "software requirements specification user stories engineering",
    alt: "Systems analyst writing detailed functional specifications, acceptance criteria, and edge case rules",
    caption: "Clear software requirements prevent scope creep and align developers on domain rules and edge cases.",
    type: "editorial",
  },
  "data-quality-framework": {
    query: "data quality validation database cleaning monitoring",
    alt: "Data engineers reviewing automated validation test results and data pipeline completeness metrics",
    caption: "Data quality frameworks enforce schema validation, deduplication, and automated anomaly alerting.",
    type: "technology",
  },
  "conversion-research-guide": {
    query: "conversion rate optimization heatmaps user session analysis",
    alt: "UX researchers evaluating session recording heatmaps and checkout funnel abandonment analytics",
    caption: "Rigorous conversion research identifies qualitative user friction points before formulating A/B test hypotheses.",
    type: "human",
  },
  "first-90-days-automation": {
    query: "operational transformation sprint milestone team collaboration",
    alt: "Operations team celebrating initial milestone deployment of automated order processing workflow",
    caption: "The first 90 days of automation establish quick operational wins and build organizational confidence.",
    type: "business",
  },

  // Comparisons
  "seo-vs-paid-search": {
    query: "search marketing comparison paid organic ads dashboard",
    alt: "Marketing directors comparing customer acquisition cost between paid search ads and organic organic search channels",
    caption: "Paid search delivers immediate demand capture; organic search builds compounding equity and long-term defensibility.",
    type: "business",
  },
  "aeo-vs-geo": {
    query: "generative ai answer engine optimization comparison visual",
    alt: "Search engineers comparing answer engine direct response extraction with generative engine content synthesis",
    caption: "AEO targets direct answers in query boxes; GEO optimizes for multi-source generative synthesis across LLMs.",
    type: "technology",
  },
  "traditional-search-vs-ai-search": {
    query: "search engine results page vs ai chatbot conversation",
    alt: "Researchers comparing ten blue links search results against conversational generative answer summaries",
    caption: "Traditional search prioritizes page ranking algorithms; AI search synthesizes multi-document entities directly.",
    type: "editorial",
  },
  "website-redesign-vs-rebuild": {
    query: "website redesign vs full rebuild code wireframe comparison",
    alt: "Designers and architects debating frontend UI reskinning versus complete underlying technology replatforming",
    caption: "Redesigns refresh presentation layers; architectural rebuilds replace obsolete backends and technical debt.",
    type: "editorial",
  },
  "automation-vs-manual-operations": {
    query: "automated robotic process vs manual paper processing",
    alt: "Operations managers comparing manual repetitive data entry workflows with automated API pipelines",
    caption: "Manual workflows create bottlenecks and human error; automated pipelines deliver real-time operational scale.",
    type: "business",
  },
  "ai-automation-vs-rule-based-automation": {
    query: "machine learning ai vs deterministic rule based logic workflow",
    alt: "Technical leads comparing deterministic if-then logic workflows with probabilistic machine learning models",
    caption: "Rule-based systems excel at strict structured logic; AI automation handles unstructured text and probabilistic decisions.",
    type: "technology",
  },
  "in-house-seo-vs-agency-seo": {
    query: "internal marketing team vs specialized external agency meeting",
    alt: "Marketing leadership discussing internal team bandwidth compared to specialized external agency execution",
    caption: "In-house teams offer deep institutional context; specialized agencies provide multi-industry perspective and rapid bandwidth.",
    type: "human",
  },
  "headless-vs-traditional-cms": {
    query: "decoupled headless api architecture vs monolithic cms diagram",
    alt: "Web architects comparing decoupled headless CMS APIs with monolithic CMS template rendering engines",
    caption: "Monolithic CMS bundles presentation and data; headless architecture decouples content APIs for multi-platform delivery.",
    type: "technology",
  },
  "seo-audit-vs-seo-strategy": {
    query: "technical audit checklist vs long term strategic roadmap",
    alt: "Strategists reviewing a diagnostic technical SEO audit report before shaping long-term organic growth roadmap",
    caption: "An audit identifies current technical deficiencies; a strategy sequences investments to capture future market share.",
    type: "editorial",
  },
  "local-seo-vs-national-seo": {
    query: "local business map search vs national organic rankings",
    alt: "Local marketing specialists analyzing regional map pack rankings versus national organic search visibility",
    caption: "Local SEO centers on proximity, citations, and Google Business Profiles; national SEO demands deep topical authority.",
    type: "business",
  },
  "in-house-vs-outsourced-development": {
    query: "software engineering team in office vs remote offshore development",
    alt: "Engineering directors weighing long-term in-house payroll against dedicated external engineering teams",
    caption: "In-house development preserves proprietary knowledge; external engineering partners accelerate delivery timelines.",
    type: "human",
  },
  "no-code-vs-custom-development": {
    query: "visual drag and drop builder vs full stack custom code editor",
    alt: "Software developers comparing rapid visual application builders with maintainable custom codebase architecture",
    caption: "No-code platforms enable rapid prototyping; custom development provides unconstrained scalability and proprietary IP.",
    type: "technology",
  },
  "chatbot-vs-ai-agent": {
    query: "conversational chatbot dialogue vs autonomous ai agent tool execution",
    alt: "AI engineers comparing script-based conversational chatbots with autonomous goal-directed AI agents executing actions",
    caption: "Chatbots answer conversational queries; AI agents execute multi-step business workflows across external APIs.",
    type: "technology",
  },
  "rag-vs-fine-tuning": {
    query: "vector retrieval augmented generation vs neural weights fine tuning",
    alt: "Machine learning engineers evaluating context retrieval latency versus domain-adapted model weights fine-tuning",
    caption: "RAG grounds responses in dynamic enterprise documents; fine-tuning instills domain vocabulary and tone of voice.",
    type: "technology",
  },
  "data-warehouse-vs-spreadsheets": {
    query: "enterprise cloud data warehouse vs desktop financial spreadsheet",
    alt: "Data analysts contrasting scalable cloud data warehouse SQL queries with fragile desktop spreadsheets",
    caption: "Spreadsheets suffer from version fragmentation and scale limits; cloud warehouses enforce governed single-source truth.",
    type: "technology",
  },
  "native-vs-web-apps": {
    query: "ios android mobile app vs progressive web application mobile screen",
    alt: "Mobile product designers comparing native iOS Swift applications with responsive Progressive Web Applications",
    caption: "Native apps offer hardware-level performance; modern web apps minimize distribution friction and unified maintenance.",
    type: "editorial",
  },
  "organic-vs-paid-social": {
    query: "social media organic community engagement vs sponsored ad campaign",
    alt: "Social media strategists evaluating organic community advocacy metrics alongside paid sponsored advertising campaigns",
    caption: "Paid social scales targeted immediate impressions; organic community content builds long-term brand credibility.",
    type: "human",
  },
  "agency-vs-freelancer": {
    query: "full service digital agency team vs independent freelance consultant",
    alt: "Business founders comparing full-service multi-disciplinary agency capabilities with independent solo contractors",
    caption: "Solo freelancers offer tactical flexibility; established agencies provide cross-disciplinary expertise and continuity.",
    type: "human",
  },

  // Decisions
  "when-do-you-need-an-seo-agency": {
    query: "executive team evaluating agency partnership proposal",
    alt: "Corporate executives evaluating whether to engage an external search optimization partner for growth",
    caption: "Partner with an SEO agency when internal capacity bottlenecks growth or complex migrations require specialized rigor.",
    type: "human",
  },
  "when-should-you-redesign-your-website": {
    query: "website redesign decision audit meeting laptop screen",
    alt: "Marketing directors evaluating website conversion decay and outdated brand positioning in redesign meeting",
    caption: "Redesign when your technical architecture hinders conversion or brand repositioning renders existing content obsolete.",
    type: "business",
  },
  "when-should-you-build-custom-software": {
    query: "custom software engineering whiteboard architecture decision",
    alt: "Technology leaders discussing competitive advantage gained from proprietary internal software platforms",
    caption: "Build custom software when your core business workflow provides distinct competitive differentiation.",
    type: "business",
  },
  "when-should-you-automate-a-process": {
    query: "operational process evaluation flowchart decision",
    alt: "Operations teams evaluating transaction volume and manual error frequency before approving automation workflows",
    caption: "Automate processes that are high-volume, rules-based, and prone to costly manual transcription errors.",
    type: "editorial",
  },
  "when-should-a-business-invest-in-ai": {
    query: "business leaders investing in artificial intelligence feasibility meeting",
    alt: "Executive leadership reviewing clean proprietary datasets and clear business use cases for AI deployment",
    caption: "Invest in AI only after establishing clean data pipelines and specific, high-friction operational workflows.",
    type: "business",
  },
  "how-to-choose-a-digital-growth-partner": {
    query: "choosing digital agency vendor selection interview",
    alt: "Founders interviewing prospective digital growth partners about methodology, transparency, and past results",
    caption: "Evaluate prospective partners on diagnostic rigor, transparent reporting, and domain technical competence.",
    type: "human",
  },
  "how-to-evaluate-seo-services": {
    query: "evaluating seo agency deliverables proposal scrutiny",
    alt: "Marketing executive scrutinizing SEO service deliverables, contractual terms, and technical audit depth",
    caption: "Look past vanity rankings to demand technical roadmaps, transparent work logs, and revenue-aligned KPIs.",
    type: "editorial",
  },
  "how-to-evaluate-a-software-development-partner": {
    query: "software development partner technical assessment interview",
    alt: "CTO conducting technical vetting of software engineering agency code quality, testing standards, and architecture",
    caption: "Vet software partners on automated testing coverage, architectural documentation, and transparent code ownership.",
    type: "human",
  },
  "how-to-plan-a-website-redesign": {
    query: "website redesign project planning scope timeline",
    alt: "Cross-functional team establishing milestone schedules, content inventories, and staging deadlines for website launch",
    caption: "Structure website redesigns around rigorous content audits, URL preservation, and baseline performance metrics.",
    type: "editorial",
  },
  "how-to-plan-a-digital-transformation-project": {
    query: "digital transformation enterprise strategic planning roadmap",
    alt: "Enterprise executives mapping phased digital transformation initiatives across legacy enterprise systems",
    caption: "Successful digital transformations focus on change management and customer workflows before tool selection.",
    type: "business",
  },
  "when-to-hire-an-seo-specialist": {
    query: "interviewing in house seo specialist job candidate",
    alt: "Hiring managers interviewing an experienced in-house SEO technical specialist for internal growth leadership",
    caption: "Hire in-house when organic search is your primary customer acquisition engine and demands daily engineering coordination.",
    type: "human",
  },
  "when-to-build-a-mobile-app": {
    query: "mobile app product strategy smartphone user engagement",
    alt: "Product teams discussing mobile app push notifications, offline utility, and camera hardware integrations",
    caption: "Build a native app only when mobile hardware access, frequent repeat usage, or offline capability is essential.",
    type: "technology",
  },
  "how-to-choose-a-cms": {
    query: "content management system comparison matrix enterprise evaluation",
    alt: "Digital team evaluating CMS authoring workflows, developer ergonomics, and API integration flexibility",
    caption: "Choose a CMS based on editorial workflow needs, publishing velocity, and security governance requirements.",
    type: "editorial",
  },
  "how-to-set-a-digital-budget": {
    query: "digital marketing technology budget allocation spreadsheet",
    alt: "Chief financial officer and marketing head reviewing digital growth budget allocations and expected ROI",
    caption: "Allocate digital budgets based on expected customer lifetime value and capital payback milestones.",
    type: "business",
  },
  "how-to-brief-an-seo-agency": {
    query: "writing seo agency client brief document requirements",
    alt: "Brand manager writing a comprehensive technical SEO brief detailing commercial targets and technical constraints",
    caption: "An effective SEO brief defines historical platform constraints, commercial goals, and developer bandwidth.",
    type: "editorial",
  },
  "how-to-prioritise-digital-work": {
    query: "feature prioritization matrix impact effort board",
    alt: "Product leadership prioritizing digital initiatives on an impact-versus-effort matrix board",
    caption: "Rank digital projects by balancing business impact against technical complexity and implementation lead time.",
    type: "business",
  },

  // Checklists
  "ai-search-readiness-checklist": {
    query: "ai search readiness checklist assessment audit",
    alt: "Search engineers systematically auditing structured entity markup and authoritative citations for AI search",
    caption: "Systematically verify schema clarity, answer-first paragraphs, and factual verification for answer engine pickup.",
    type: "editorial",
  },
  "website-launch-checklist": {
    query: "website launch checklist final staging deployment checks",
    alt: "Developers conducting pre-flight launch verification including SSL certificates, 404 handlers, and analytics tags",
    caption: "Never deploy without verifying canonical URLs, analytics firing, form handling, and indexing directives.",
    type: "technology",
  },
  "local-seo-checklist": {
    query: "local search optimization google business profile audit",
    alt: "Local business marketers auditing Google Business Profile attributes, local directory citations, and reviews",
    caption: "Maintain NAP consistency, complete business categories, and local geo-tagged assets across all directories.",
    type: "business",
  },
  "website-conversion-checklist": {
    query: "website conversion optimization checkout lead form audit",
    alt: "Conversion optimization team reviewing lead capture forms, value propositions, and trust signals on landing page",
    caption: "Audit form field friction, visual hierarchy, mobile click targets, and social proof on high-intent conversion pages.",
    type: "editorial",
  },
  "digital-growth-audit-checklist": {
    query: "digital growth audit comprehensive multi-channel assessment",
    alt: "Growth consultant checking off full-funnel audit items across organic traffic, conversion, and retention systems",
    caption: "A comprehensive digital growth checklist connects traffic acquisition, conversion UX, and customer retention.",
    type: "business",
  },
  "automation-readiness-checklist": {
    query: "automation readiness checklist process mapping verification",
    alt: "Process engineers reviewing API documentation and data formatting readiness before workflow deployment",
    caption: "Verify process documentation, API availability, and error handling paths before automating core workflows.",
    type: "technology",
  },
  "seo-audit-checklist": {
    query: "technical seo audit checklist crawl errors screaming frog",
    alt: "Technical search auditor running automated crawl diagnostics and checking off indexability criteria",
    caption: "Check off status codes, robots directives, canonical tags, and structured data integrity across all key templates.",
    type: "editorial",
  },
  "content-audit-checklist": {
    query: "content audit checklist editorial review criteria",
    alt: "Content manager auditing article freshness, search performance decay, and editorial accuracy standards",
    caption: "Evaluate content freshness, keyword cannibalisation, backlink equity, and factual source verification.",
    type: "editorial",
  },
  "site-migration-checklist": {
    query: "site migration checklist 301 redirects dns cutover",
    alt: "Lead engineers executing a step-by-step site migration checklist during evening domain cutover",
    caption: "Follow strict pre-launch, cutover, and post-launch protocols to safeguard organic rankings during URL migrations.",
    type: "technology",
  },
  "ecommerce-seo-checklist": {
    query: "ecommerce seo checklist product category faceted navigation",
    alt: "E-commerce SEO team verifying canonicalization across faceted navigation filters and product schema",
    caption: "Verify product structured markup, faceted navigation canonicalization, and category page copy depth.",
    type: "business",
  },
  "crm-implementation-checklist": {
    query: "crm implementation checklist pipeline setup data migration",
    alt: "Sales operations lead auditing contact field mappings and automated lead routing rules in CRM setup",
    caption: "Ensure clean field mapping, deduplication workflows, and sales team training before cutting over to a new CRM.",
    type: "technology",
  },
  "integration-readiness-checklist": {
    query: "system integration readiness checklist api webhook authentication",
    alt: "Integration engineers verifying OAuth2 token scopes, webhook retry queues, and rate limits on systems diagram",
    caption: "Audit API rate limits, error alerting, authentication mechanisms, and idempotency keys before production integration.",
    type: "technology",
  },
  "ai-project-checklist": {
    query: "artificial intelligence project feasibility checklist review",
    alt: "Data science leads reviewing model evaluation metrics, dataset licensing, and latency thresholds for AI launch",
    caption: "Audit ground-truth evaluation datasets, latency budgets, and fallback behavior before shipping AI features.",
    type: "technology",
  },
  "accessibility-checklist": {
    query: "web accessibility checklist keyboard navigation contrast audit",
    alt: "Quality assurance engineer verifying keyboard focus states and color contrast ratios against WCAG 2.1 AA",
    caption: "Check color contrast, keyboard tab order, aria-labels, and alt text to guarantee universal access.",
    type: "editorial",
  },
  "analytics-implementation-checklist": {
    query: "analytics implementation checklist google tag manager debug",
    alt: "Web analyst testing event firing triggers and data layer variable consistency in tag management debugger",
    caption: "Verify data layer integrity, event trigger firing, consent mode compliance, and cross-domain tracking.",
    type: "technology",
  },
  "pre-launch-seo-checklist": {
    query: "pre launch seo checklist robots noindex meta check staging",
    alt: "Search specialist verifying that noindex headers are removed and sitemap XML files are accessible on staging",
    caption: "Confirm noindex removal, XML sitemap presence, analytics installation, and 301 redirection maps prior to launch.",
    type: "editorial",
  },
};

// Generic generator for glossary items
function getGlossaryMetadata(slug, title, topic) {
  const cleanTerm = title.replace(/^What Is /i, "").trim();
  
  // Topic-tailored queries and captions
  let query = `${cleanTerm.toLowerCase()} technology business`;
  let alt = `Digital technology and search specialists evaluating ${cleanTerm.toLowerCase()} architecture and implementation principles`;
  let caption = `Understanding ${cleanTerm} is essential for engineering robust, search-visible digital platforms.`;
  let type = "editorial";

  if (topic === "AI" || topic === "AI Search") {
    query = `${cleanTerm.toLowerCase()} artificial intelligence machine learning`;
    alt = `AI engineers and research analysts working with ${cleanTerm.toLowerCase()} models and semantic retrieval workflows`;
    caption = `${cleanTerm} underpins modern generative retrieval and intelligent automation architectures.`;
    type = "technology";
  } else if (topic === "SEO" || topic === "Technical SEO") {
    query = `${cleanTerm.toLowerCase()} search engine optimization technical data`;
    alt = `Technical search specialists analyzing ${cleanTerm.toLowerCase()} metrics and search crawler behavior`;
    caption = `Optimizing ${cleanTerm} ensures complete search engine discoverability and sustainable organic rankings.`;
    type = "editorial";
  } else if (topic === "Analytics" || topic === "Data") {
    query = `${cleanTerm.toLowerCase()} data analytics business dashboard`;
    alt = `Data analysts reviewing ${cleanTerm.toLowerCase()} pipelines, metrics dashboards, and performance trends`;
    caption = `Accurate ${cleanTerm} tracking provides transparent visibility into operational performance and user behavior.`;
    type = "business";
  } else if (topic === "Software" || topic === "Web" || topic === "Automation" || topic === "Integration") {
    query = `${cleanTerm.toLowerCase()} software engineering web development system`;
    alt = `Software engineers collaborating on ${cleanTerm.toLowerCase()} architecture, component code, and system standards`;
    caption = `Engineering scalable ${cleanTerm} minimizes technical debt and accelerates deployment velocity.`;
    type = "technology";
  }

  return { query, alt, caption, type };
}

async function main() {
  const { resources } = await import("../content/resources.ts");

  const existingAssignedResourceSlugs = new Set([
    "why-ai-overviews-cut-your-clicks",
    "why-your-website-redesign-lost-traffic",
    "when-to-replatform-a-website",
    "when-to-invest-in-analytics",
    "when-to-outsource-development",
    "technical-seo-checklist",
    "how-to-audit-your-own-website",
    "seo-vs-aeo",
    "custom-software-vs-off-the-shelf",
    "what-is-generative-engine-optimisation",
  ]);

  const missingResources = resources.filter((r) => !existingAssignedResourceSlugs.has(r.slug));
  console.log(`Processing ${missingResources.length} missing resources...`);

  const catalogItems = missingResources.map((res) => {
    const override = CUSTOM_OVERRIDES[res.slug];
    const glossaryFallback = getGlossaryMetadata(res.slug, res.title, res.topic);

    const query = override?.query || glossaryFallback.query;
    const alt = override?.alt || glossaryFallback.alt;
    const caption = override?.caption || glossaryFallback.caption;
    const type = override?.type || glossaryFallback.type;

    return {
      slug: res.slug,
      id: `resource-${res.slug}`,
      subDir: "resources",
      filename: `resource-${res.slug}.webp`,
      query,
      alt,
      topic: res.title,
      category: "resources",
      type,
      aspectRatio: "3:2",
      width: 1200,
      height: 800,
      usage: "editorial",
      caption,
    };
  });

  const fileContent = `// Auto-generated 135 missing resource catalog definitions
export const MISSING_RESOURCE_ITEMS = ${JSON.stringify(catalogItems, null, 2)};
`;

  writeFileSync(join(ROOT, "scripts", "missing-resource-catalog.mjs"), fileContent);
  console.log(`✓ Successfully generated scripts/missing-resource-catalog.mjs with ${catalogItems.length} items.`);
}

main().catch(console.error);
