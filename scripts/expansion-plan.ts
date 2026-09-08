#!/usr/bin/env node
/**
 * Expansion plan and uniqueness gate.
 *
 *   npm run plan:expansion
 *
 * The 124 pages proposed to take the site from 176 to 300, checked against
 * what already exists BEFORE any of them is written. Running the check first
 * is the whole point: a slug or keyword collision found here costs a line
 * edit, and the same collision found after authoring costs a rewrite.
 *
 * A proposal is rejected if its slug already exists, its primary keyword is
 * already claimed by a published page, or another proposal claims either.
 *
 * Writes page-expansion-matrix.json.
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { resources } from "@/content/resources";
import { services } from "@/content/services";
import { practices } from "@/content/practices";
import { industries } from "@/content/industries";
import { useCases } from "@/content/use-cases";
import { technologies } from "@/content/technologies";
import { allCompanyPages } from "@/content/company";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

interface Proposal {
  url: string;
  title: string;
  pageType: string;
  primaryIntent: "informational" | "commercial" | "transactional" | "navigational";
  targetAudience: string;
  businessProblem: string;
  primaryKeyword: string;
  contentAngle: string;
}

const p = (
  url: string,
  title: string,
  pageType: string,
  primaryIntent: Proposal["primaryIntent"],
  targetAudience: string,
  businessProblem: string,
  primaryKeyword: string,
  contentAngle: string,
): Proposal => ({
  url,
  title,
  pageType,
  primaryIntent,
  targetAudience,
  businessProblem,
  primaryKeyword,
  contentAngle,
});

/* ==========================================================================
   SERVICES — 20
   Only where the buying intent genuinely differs from an existing service.
   "SEO Audit" is a fixed-scope diagnostic; "SEO" is an ongoing programme.
   Those are different purchases, so they are different pages.
   ========================================================================== */
const serviceProposals: Proposal[] = [
  p("/services/seo-audit/", "SEO Audit", "service", "commercial", "A3 marketing lead", "Performance is flat and nobody can say why", "seo audit", "Fixed-scope diagnostic, not a retainer"),
  p("/services/on-page-seo/", "On-Page SEO", "service", "commercial", "A4 marketing manager", "Pages are indexed but do not rank for their topic", "on-page seo", "Page-level relevance, distinct from technical health"),
  p("/services/local-seo/", "Local SEO", "service", "commercial", "A1 owner", "Business is invisible in map and location results", "local seo services", "Multi-location and service-area visibility as a programme"),
  p("/services/enterprise-seo/", "Enterprise SEO", "service", "commercial", "A3 marketing lead", "Large site where change requires many stakeholders", "enterprise seo", "Governance and scale, not tactics"),
  p("/services/ecommerce-seo/", "E-commerce SEO", "service", "commercial", "A3 marketing lead", "Catalogue competes with itself and with marketplaces", "ecommerce seo", "Faceted navigation, category depth, product duplication"),
  p("/services/seo-migration/", "SEO Migration", "service", "commercial", "A7 technical lead", "A replatform or domain change risks existing visibility", "seo migration", "Protecting visibility through a planned change"),
  p("/services/content-strategy/", "SEO Content Strategy", "service", "commercial", "A3 marketing lead", "Content is published without a plan and earns nothing", "seo content strategy", "Coverage planned against buyer questions"),
  p("/services/digital-pr/", "Digital PR & Link Earning", "service", "commercial", "A3 marketing lead", "No credible external references to the site", "digital pr", "Earned references, and why shortcuts carry penalty risk"),
  p("/services/structured-data/", "Structured Data Implementation", "service", "commercial", "A7 technical lead", "Machines cannot resolve what the site's pages are", "structured data implementation", "One entity, referenced not repeated"),
  p("/services/site-architecture/", "Site Architecture", "service", "commercial", "A4 marketing manager", "Important pages are buried and rarely crawled", "website information architecture", "Structure that decides what gets found"),
  p("/services/ai-readiness-assessment/", "AI Readiness Assessment", "service", "commercial", "A2 executive", "Board pressure to use AI with no defined task", "ai readiness assessment", "Task and data feasibility before any build"),
  p("/services/ai-document-processing/", "AI Document Processing", "service", "commercial", "A6 operations", "Documents arrive in many formats and are read by hand", "ai document processing", "Extraction with a human check and an escalation path"),
  p("/services/api-development/", "API Development", "service", "commercial", "A7 technical lead", "Systems cannot be connected because nothing is exposed", "api development", "Contracts built to be depended on"),
  p("/services/crm-implementation/", "CRM Implementation", "service", "commercial", "A5 sales lead", "Pipeline lives in spreadsheets and individual inboxes", "crm implementation", "Adoption and data model, not licence selection"),
  p("/services/marketing-automation/", "Marketing Automation", "service", "commercial", "A3 marketing lead", "Follow-up is manual and inconsistent", "marketing automation", "Sequences tied to real buying behaviour"),
  p("/services/customer-portals/", "Customer Portals", "service", "commercial", "A2 executive", "Customers phone for information that already exists", "customer portal development", "Self-service that removes inbound load"),
  p("/services/reporting-dashboards/", "Reporting Dashboards", "service", "commercial", "A8 finance", "Numbers are assembled by hand and disagree", "reporting dashboards", "One definition per metric, then automation"),
  p("/services/cloud-migration/", "Cloud Migration", "service", "commercial", "A7 technical lead", "Infrastructure constrains release and recovery", "cloud migration services", "Sequenced move against a measured bottleneck"),
  p("/services/website-maintenance/", "Website Maintenance & Support", "service", "commercial", "A1 owner", "Nobody owns updates, backups or security patching", "website maintenance services", "Ownership after launch, priced honestly"),
  p("/services/accessibility-audit/", "Accessibility Audit", "service", "commercial", "A7 technical lead", "The site excludes users and carries legal exposure", "website accessibility audit", "WCAG conformance assessed against real assistive technology"),
];

/* ==========================================================================
   INDUSTRIES — 14
   ========================================================================== */
const industryProposals: Proposal[] = [
  p("/industries/technology/", "Technology", "industry", "commercial", "A2 executive", "Technical depth is invisible to buyers", "technology company marketing", "Selling capability that is hard to differentiate"),
  p("/industries/automotive/", "Automotive", "industry", "commercial", "A1 owner", "Local discovery and enquiry handling decide sales", "automotive digital marketing", "Local visibility plus enquiry response speed"),
  p("/industries/construction/", "Construction", "industry", "commercial", "A1 owner", "Project enquiries arrive unqualified and late", "construction digital marketing", "Qualification before quotation"),
  p("/industries/legal-services/", "Legal Services", "industry", "commercial", "A2 executive", "Regulated content and high-consideration buyers", "legal sector digital marketing", "Credibility within advertising constraints"),
  p("/industries/accounting/", "Accounting & Advisory", "industry", "commercial", "A1 owner", "Commodity perception and manual client onboarding", "accounting firm marketing", "Differentiation plus onboarding automation"),
  p("/industries/recruitment/", "Recruitment & Staffing", "industry", "commercial", "A3 marketing lead", "Two audiences, one website, neither served", "recruitment agency marketing", "Dual-audience architecture"),
  p("/industries/travel/", "Travel & Tourism", "industry", "commercial", "A3 marketing lead", "Aggregators intercept demand before the brand", "travel digital marketing", "Direct booking against intermediaries"),
  p("/industries/nonprofit/", "Non-Profit & Social Impact", "industry", "commercial", "A2 executive", "Limited budget and a split donor/beneficiary audience", "nonprofit digital strategy", "Constrained budgets and dual audiences"),
  p("/industries/media/", "Media & Publishing", "industry", "commercial", "A3 marketing lead", "Zero-click search removes the traffic model", "media publishing seo", "Publishing economics under AI answers"),
  p("/industries/energy/", "Energy & Utilities", "industry", "commercial", "A6 operations", "Long sales cycles and heavy compliance content", "energy sector digital", "Technical credibility and process load"),
  p("/industries/agriculture/", "Agriculture & Agritech", "industry", "commercial", "A6 operations", "Seasonal demand and disconnected field systems", "agritech digital transformation", "Seasonality and field data capture"),
  p("/industries/b2b-services/", "B2B Services", "industry", "commercial", "A2 executive", "Referral dependence with no inbound pipeline", "b2b services marketing", "Building inbound alongside referral"),
  p("/industries/d2c-brands/", "D2C Brands", "industry", "commercial", "A3 marketing lead", "Paid acquisition cost rising faster than margin", "d2c brand growth", "Owned demand against rising paid costs"),
  p("/industries/smes/", "Small & Medium Enterprises", "industry", "commercial", "A1 owner", "No dedicated marketing or technical resource", "sme digital growth", "What to do with no dedicated team"),
];

/* ==========================================================================
   USE CASES — 14
   ========================================================================== */
const useCaseProposals: Proposal[] = [
  p("/use-cases/reduce-customer-churn/", "Reduce customer churn", "use-case", "commercial", "A2 executive", "Customers leave without warning", "reduce customer churn", "Signals before cancellation"),
  p("/use-cases/shorten-sales-cycle/", "Shorten the sales cycle", "use-case", "commercial", "A5 sales lead", "Deals stall between stages", "shorten sales cycle", "Where deals actually stall"),
  p("/use-cases/qualify-leads-automatically/", "Qualify leads automatically", "use-case", "commercial", "A5 sales lead", "Sales time spent on unqualified enquiries", "automated lead qualification", "Qualification before a human is involved"),
  p("/use-cases/reduce-support-tickets/", "Reduce support tickets", "use-case", "commercial", "A6 operations", "The same questions arrive repeatedly", "reduce support tickets", "Deflection by answering, not blocking"),
  p("/use-cases/speed-up-quoting/", "Speed up quoting", "use-case", "commercial", "A5 sales lead", "Quotes take days and lose deals", "faster quoting process", "Pricing logic and approval bottlenecks"),
  p("/use-cases/improve-data-quality/", "Improve data quality", "use-case", "commercial", "A7 technical lead", "Reports disagree and nobody trusts them", "improve data quality", "Definitions before dashboards"),
  p("/use-cases/consolidate-business-tools/", "Consolidate business tools", "use-case", "commercial", "A2 executive", "Too many overlapping subscriptions", "consolidate business software", "Total cost including the manual bridges"),
  p("/use-cases/onboard-customers-faster/", "Onboard customers faster", "use-case", "commercial", "A6 operations", "Onboarding is manual and inconsistent", "faster customer onboarding", "Document collection and status visibility"),
  p("/use-cases/scale-without-hiring/", "Scale without hiring", "use-case", "commercial", "A2 executive", "Growth always requires headcount", "scale operations without hiring", "Capacity from process, not people"),
  p("/use-cases/recover-lost-traffic/", "Recover lost search traffic", "use-case", "commercial", "A3 marketing lead", "Traffic dropped after a change", "recover lost search traffic", "Diagnosis before remediation"),
  p("/use-cases/enter-a-new-market/", "Enter a new market", "use-case", "commercial", "A2 executive", "No visibility in an unfamiliar segment", "enter a new market digitally", "Demand evidence before spend"),
  p("/use-cases/launch-a-digital-product/", "Launch a digital product", "use-case", "commercial", "A2 executive", "An idea with no route to a first version", "launch a digital product", "Smallest version that tests the risk"),
  p("/use-cases/replace-spreadsheet-processes/", "Replace spreadsheet processes", "use-case", "commercial", "A6 operations", "Critical processes run in fragile spreadsheets", "replace spreadsheets with software", "When a spreadsheet becomes a liability"),
  p("/use-cases/prove-marketing-roi/", "Prove marketing ROI", "use-case", "commercial", "A8 finance", "Spend cannot be tied to revenue", "prove marketing roi", "What can and cannot be attributed"),
];

/* ==========================================================================
   TECHNOLOGIES — 8
   ========================================================================== */
const technologyProposals: Proposal[] = [
  p("/technologies/data-platforms/", "Data Platforms", "technology", "informational", "A7 technical lead", "Reporting needs data from several systems", "data platform architecture", "Warehouse, definitions and ownership"),
  p("/technologies/crm-platforms/", "CRM Platforms", "technology", "informational", "A5 sales lead", "Pipeline data is fragmented", "crm platforms", "How CRM choice constrains process"),
  p("/technologies/mobile-platforms/", "Mobile Platforms", "technology", "informational", "A7 technical lead", "Deciding between web, native and hybrid", "mobile app platforms", "The three routes and their real costs"),
  p("/technologies/security-and-access/", "Security & Access", "technology", "informational", "A7 technical lead", "Who can reach what, and how it is proven", "application security practices", "Access, secrets and dependency hygiene"),
  p("/technologies/testing-and-quality/", "Testing & Quality", "technology", "informational", "A7 technical lead", "Releases are risky and manual", "software testing practices", "What is automated and what is not"),
  p("/technologies/observability/", "Observability", "technology", "informational", "A7 technical lead", "Incidents take hours to diagnose", "application observability", "Logs, metrics and alerting as design"),
  p("/technologies/payments-and-billing/", "Payments & Billing", "technology", "informational", "A7 technical lead", "Billing logic is spread across systems", "payments integration", "Where billing complexity actually lives"),
  p("/technologies/accessibility-standards/", "Accessibility Standards", "technology", "informational", "A7 technical lead", "Accessibility is treated as a late audit", "wcag accessibility standards", "Conformance built in, not retrofitted"),
];

/* ==========================================================================
   COMPANY — 8
   ========================================================================== */
const companyProposals: Proposal[] = [
  p("/company/how-we-price/", "How we price", "company", "commercial", "A8 finance", "Unclear what an engagement costs and why", "agency pricing model", "Pricing shapes and what drives them"),
  p("/company/how-we-report/", "How we report", "company", "commercial", "A3 marketing lead", "Reports show activity rather than outcomes", "agency reporting", "Reporting a bad month honestly"),
  p("/company/what-we-do-not-do/", "What we do not do", "company", "commercial", "A2 executive", "Suppliers claim to do everything", "agency scope boundaries", "Stated limits, and why they exist"),
  p("/company/content-standards/", "Content standards", "company", "informational", "A3 marketing lead", "No way to judge whether claims are trustworthy", "content standards", "Why no fabricated proof appears here"),
  p("/company/accessibility-commitment/", "Accessibility commitment", "company", "informational", "A7 technical lead", "Accessibility claims are usually unverifiable", "accessibility commitment", "What is tested and what is not"),
  p("/company/data-and-privacy-approach/", "Data and privacy approach", "company", "informational", "A8 finance", "Unclear what data a supplier will hold", "data privacy approach", "Data minimisation as a design default"),
  p("/company/working-with-us/", "Working with us", "company", "commercial", "A2 executive", "Unclear what the client has to do", "working with an agency", "What we need from you"),
  p("/company/faq/", "Frequently asked questions", "company", "informational", "A1 owner", "Common pre-sales questions unanswered", "bizzfly faq", "The questions asked before a first call"),
];

/* ==========================================================================
   RESOURCES — 60
   ========================================================================== */
const R = (slug: string, title: string, kind: string, keyword: string, angle: string, audience = "A4 marketing manager", intent: Proposal["primaryIntent"] = "informational") =>
  p(`/resources/${slug}/`, title, `resource:${kind}`, intent, audience, angle, keyword, angle);

const resourceProposals: Proposal[] = [
  /* Frameworks and playbooks — 12 */
  R("seo-reporting-framework", "SEO Reporting Framework", "guide", "seo reporting framework", "Four measurement layers reported separately"),
  R("enterprise-seo-framework", "Enterprise SEO Framework", "guide", "enterprise seo framework", "Governance for sites nobody fully controls"),
  R("content-planning-framework", "Content Planning Framework", "guide", "content planning framework", "Planning coverage against buyer questions"),
  R("technical-seo-migration-guide", "Technical SEO Migration Guide", "guide", "seo migration guide", "URL mapping and parity as delivery requirements"),
  R("ai-visibility-measurement-guide", "AI Visibility Measurement Guide", "guide", "measure ai visibility", "Sampling AI answers when there is no rank"),
  R("automation-business-case-guide", "Building the Business Case for Automation", "guide", "automation business case", "Arithmetic that survives finance review", "A8 finance"),
  R("ai-governance-guide", "AI Governance for Small Teams", "guide", "ai governance", "Boundaries without a compliance department", "A2 executive"),
  R("website-brief-guide", "How to Write a Website Brief", "guide", "website brief", "Stating outcomes rather than features", "A3 marketing lead"),
  R("software-requirements-guide", "How to Write Software Requirements", "guide", "software requirements", "Describing behaviour, not screens", "A7 technical lead"),
  R("data-quality-framework", "Data Quality Framework", "guide", "data quality framework", "Definitions, ownership, then tooling", "A7 technical lead"),
  R("conversion-research-guide", "Conversion Research Guide", "guide", "conversion research", "Evidence before testing", "A3 marketing lead"),
  R("first-90-days-automation", "The First 90 Days of Automation", "guide", "automation first 90 days", "A realistic sequence for a first project", "A6 operations"),

  /* Checklists — 10 */
  R("seo-audit-checklist", "SEO Audit Checklist", "checklist", "seo audit checklist", "The full audit sequence in order"),
  R("content-audit-checklist", "Content Audit Checklist", "checklist", "content audit checklist", "Keep, improve, consolidate, remove"),
  R("site-migration-checklist", "Site Migration Checklist", "checklist", "site migration checklist", "Everything decided before design starts"),
  R("ecommerce-seo-checklist", "E-commerce SEO Checklist", "checklist", "ecommerce seo checklist", "Facets, variants, stock and speed"),
  R("crm-implementation-checklist", "CRM Implementation Checklist", "checklist", "crm implementation checklist", "Data model and adoption first", "A5 sales lead"),
  R("integration-readiness-checklist", "Integration Readiness Checklist", "checklist", "integration readiness", "What to confirm before connecting systems", "A7 technical lead"),
  R("ai-project-checklist", "AI Project Readiness Checklist", "checklist", "ai project checklist", "Task, data, boundary, owner", "A2 executive"),
  R("accessibility-checklist", "Website Accessibility Checklist", "checklist", "accessibility checklist", "What to test and with what", "A7 technical lead"),
  R("analytics-implementation-checklist", "Analytics Implementation Checklist", "checklist", "analytics implementation checklist", "Events that map to decisions"),
  R("pre-launch-seo-checklist", "Pre-Launch SEO Checklist", "checklist", "pre-launch seo checklist", "The crawler's view before go-live"),

  /* Comparisons — 10 */
  R("seo-audit-vs-seo-strategy", "SEO Audit vs SEO Strategy", "comparison", "seo audit vs strategy", "Diagnosis against a plan", "A3 marketing lead", "commercial"),
  R("local-seo-vs-national-seo", "Local SEO vs National SEO", "comparison", "local vs national seo", "Proximity changes what is winnable", "A1 owner", "commercial"),
  R("in-house-vs-outsourced-development", "In-House vs Outsourced Development", "comparison", "in-house vs outsourced development", "Context against capacity", "A2 executive", "commercial"),
  R("no-code-vs-custom-development", "No-Code vs Custom Development", "comparison", "no-code vs custom development", "Where no-code stops scaling", "A2 executive", "commercial"),
  R("chatbot-vs-ai-agent", "Chatbot vs AI Agent", "comparison", "chatbot vs ai agent", "Answering against acting", "A6 operations", "commercial"),
  R("rag-vs-fine-tuning", "RAG vs Fine-Tuning", "comparison", "rag vs fine-tuning", "Facts against form", "A7 technical lead"),
  R("data-warehouse-vs-spreadsheets", "Data Warehouse vs Spreadsheets", "comparison", "data warehouse vs spreadsheets", "When spreadsheets stop being enough", "A8 finance", "commercial"),
  R("native-vs-web-apps", "Native Apps vs Web Apps", "comparison", "native vs web app", "Distribution and capability trade-offs", "A7 technical lead", "commercial"),
  R("organic-vs-paid-social", "Organic vs Paid Social", "comparison", "organic vs paid social", "Reach you own against reach you rent", "A3 marketing lead", "commercial"),
  R("agency-vs-freelancer", "Agency vs Freelancer", "comparison", "agency vs freelancer", "Breadth against cost and continuity", "A1 owner", "commercial"),

  /* Decision pages — 10 */
  R("when-to-hire-an-seo-specialist", "When to Hire an In-House SEO Specialist", "decision", "hire in-house seo", "Volume and ownership thresholds", "A3 marketing lead", "commercial"),
  R("when-to-replatform-a-website", "When to Replatform a Website", "decision", "when to replatform", "Platform constraint against preference", "A7 technical lead", "commercial"),
  R("when-to-build-a-mobile-app", "When to Build a Mobile App", "decision", "when to build a mobile app", "What an app does that a site cannot", "A2 executive", "commercial"),
  R("when-to-invest-in-analytics", "When to Invest in Analytics", "decision", "when to invest in analytics", "Decisions that need the data first", "A8 finance", "commercial"),
  R("when-to-outsource-development", "When to Outsource Development", "decision", "when to outsource development", "Capacity, capability and continuity", "A2 executive", "commercial"),
  R("how-to-choose-a-cms", "How to Choose a CMS", "decision", "how to choose a cms", "Who edits, and how often", "A4 marketing manager", "commercial"),
  R("how-to-set-a-digital-budget", "How to Set a Digital Budget", "decision", "digital marketing budget", "Allocating against constraint, not channel", "A8 finance", "commercial"),
  R("how-to-brief-an-seo-agency", "How to Brief an SEO Agency", "decision", "brief an seo agency", "What to bring to a first conversation", "A3 marketing lead", "commercial"),
  R("how-to-audit-your-own-website", "How to Audit Your Own Website", "decision", "audit your own website", "What you can check without a tool", "A1 owner"),
  R("how-to-prioritise-digital-work", "How to Prioritise Digital Work", "decision", "prioritise digital work", "Sequencing by binding constraint", "A2 executive", "commercial"),

  /* Glossary — 18 */
  R("what-is-organic-traffic", "Organic Traffic", "glossary", "organic traffic", "What it counts and what it hides"),
  R("what-is-bounce-rate", "Bounce Rate", "glossary", "bounce rate", "Why it is widely misread"),
  R("what-is-domain-authority", "Domain Authority", "glossary", "domain authority", "A vendor metric, not a search engine one"),
  R("what-is-anchor-text", "Anchor Text", "glossary", "anchor text", "Description, and where it becomes manipulation"),
  R("what-is-a-backlink", "Backlink", "glossary", "backlink", "Why the source matters more than the count"),
  R("what-is-page-speed", "Page Speed", "glossary", "page speed", "Lab scores against field experience"),
  R("what-is-a-conversion-funnel", "Conversion Funnel", "glossary", "conversion funnel", "Where the model helps and misleads"),
  R("what-is-lead-scoring", "Lead Scoring", "glossary", "lead scoring", "Encoding a judgement you can defend", "A5 sales lead"),
  R("what-is-a-customer-data-platform", "Customer Data Platform", "glossary", "customer data platform", "What it is and when it is premature", "A3 marketing lead"),
  R("what-is-etl", "ETL", "glossary", "etl", "Moving data, and where it breaks", "A7 technical lead"),
  R("what-is-a-data-pipeline", "Data Pipeline", "glossary", "data pipeline", "Scheduling, failure and backfill", "A7 technical lead"),
  R("what-is-single-sign-on", "Single Sign-On", "glossary", "single sign-on", "One identity, and its blast radius", "A7 technical lead"),
  R("what-is-a-design-system", "Design System", "glossary", "design system", "Components plus the decisions behind them"),
  R("what-is-progressive-enhancement", "Progressive Enhancement", "glossary", "progressive enhancement", "Working before JavaScript arrives", "A7 technical lead"),
  R("what-is-a-service-level-agreement", "Service Level Agreement", "glossary", "service level agreement", "What an SLA actually commits to", "A8 finance"),
  R("what-is-total-cost-of-ownership", "Total Cost of Ownership", "glossary", "total cost of ownership", "The decade, not the build", "A8 finance"),
  R("what-is-a-minimum-viable-product", "Minimum Viable Product", "glossary", "minimum viable product", "The riskiest assumption, tested", "A2 executive"),
  R("what-is-workflow-orchestration", "Workflow Orchestration", "glossary", "workflow orchestration", "Coordinating steps that can fail", "A6 operations"),
];

const proposals: Proposal[] = [
  ...serviceProposals,
  ...industryProposals,
  ...useCaseProposals,
  ...technologyProposals,
  ...companyProposals,
  ...resourceProposals,
];

/* --- Uniqueness gate ------------------------------------------------------ */

const existingUrls = new Set<string>([
  ...services.map((s) => `/services/${s.slug}/`),
  ...practices.map((s) => `/services/${s.slug}/`),
  ...industries.map((s) => `/industries/${s.slug}/`),
  ...useCases.map((s) => `/use-cases/${s.slug}/`),
  ...technologies.map((s) => `/technologies/${s.slug}/`),
  ...allCompanyPages.map((s) => `/company/${s.slug}/`),
  ...resources.map((s) => `/resources/${s.slug}/`),
]);

const existingKeywords = new Map<string, string>();
const claim = (kw: string | undefined, url: string) => {
  if (kw) existingKeywords.set(kw.trim().toLowerCase(), url);
};
for (const s of services) claim(s.seo?.primaryTopic, `/services/${s.slug}/`);
for (const s of practices) claim(s.seo?.primaryTopic, `/services/${s.slug}/`);
for (const s of industries) claim(s.seo?.primaryTopic, `/industries/${s.slug}/`);
for (const s of useCases) claim(s.seo?.primaryTopic, `/use-cases/${s.slug}/`);
for (const s of technologies) claim(s.seo?.primaryTopic, `/technologies/${s.slug}/`);
for (const s of allCompanyPages) claim(s.seo?.primaryTopic, `/company/${s.slug}/`);
for (const s of resources) claim(s.seo?.primaryTopic, `/resources/${s.slug}/`);

/*
 * A proposal whose URL exists is either implemented or colliding, and the
 * keyword tells them apart. If the page now living at that URL claims this
 * proposal's primary keyword, this proposal is what was built; if it claims
 * a different one, two pages want the same address and that is a real
 * collision.
 *
 * Without that distinction the gate stops working the moment the plan is
 * executed — every proposal would report as a duplicate of itself, and the
 * check that guards against genuine cannibalisation would have to be
 * switched off exactly when there is most content for it to guard.
 */
const problems: string[] = [];
const seenUrl = new Set<string>();
const seenKeyword = new Map<string, string>();
const built = new Set<string>();

for (const prop of proposals) {
  const kw = prop.primaryKeyword.trim().toLowerCase();
  const keywordOwner = existingKeywords.get(kw);
  const implemented = existingUrls.has(prop.url) && keywordOwner === prop.url;
  if (implemented) built.add(prop.url);

  if (existingUrls.has(prop.url) && !implemented) {
    problems.push(`URL already exists and targets something else: ${prop.url}`);
  }
  if (seenUrl.has(prop.url)) problems.push(`duplicate URL within the plan: ${prop.url}`);
  seenUrl.add(prop.url);

  if (keywordOwner && keywordOwner !== prop.url) {
    problems.push(`keyword "${kw}" already targeted by ${keywordOwner} (proposed ${prop.url})`);
  }
  const planOwner = seenKeyword.get(kw);
  if (planOwner) problems.push(`keyword "${kw}" claimed twice in the plan: ${planOwner} and ${prop.url}`);
  seenKeyword.set(kw, prop.url);
}

const byType = proposals.reduce<Record<string, number>>((acc, p2) => {
  const key = p2.pageType.split(":")[0] ?? p2.pageType;
  acc[key] = (acc[key] ?? 0) + 1;
  return acc;
}, {});

writeFileSync(
  join(ROOT, "page-expansion-matrix.json"),
  `${JSON.stringify(
    {
      generated: new Date().toISOString().slice(0, 10),
      existingPublishedPages: existingUrls.size,
      proposedPages: proposals.length,
      implementedPages: built.size,
      byType,
      proposals: proposals.map((x, i) => ({
        id: `new-${String(i + 1).padStart(3, "0")}`,
        ...x,
        status: built.has(x.url) ? "published" : "planned",
      })),
    },
    null,
    2,
  )}\n`,
);

const line = "─".repeat(74);
console.log(`\nExpansion plan\n${line}`);
console.log(`Existing content URLs : ${existingUrls.size}`);
console.log(`Proposed new pages    : ${proposals.length}`);
console.log(`Implemented           : ${built.size}`);
for (const [k, v] of Object.entries(byType).sort()) {
  console.log(`  ${k.padEnd(14)} ${String(v).padStart(4)}`);
}

if (problems.length) {
  console.error(`\n${problems.length} collision(s)\n${line}`);
  for (const x of problems) console.error(`  ✗ ${x}`);
  console.error("");
  process.exit(1);
}
console.log(`\n${line}\nNo collisions. page-expansion-matrix.json written.\n`);
