/**
 * BizzFly Page Image Assignments
 *
 * Maps routes and content slugs to unique registered images.
 * ONE IMAGE IS NEVER ASSIGNED TO MULTIPLE SECTIONS OR MULTIPLE PAGES.
 */

import { requireImage, getImage } from "./imageRegistry";
import type { ImageMetadata } from "./types";

export interface HomepageImages {
  hero: ImageMetadata;
  whatWeDo: ImageMetadata;
  visibility: ImageMetadata;
  aiSearch: ImageMetadata;
  automation: ImageMetadata;
  technology: ImageMetadata;
}

export function getHomepageImages(): HomepageImages {
  return {
    hero: requireImage("home-hero-growth-team"),
    whatWeDo: requireImage("home-what-we-do-strategists"),
    visibility: requireImage("home-search-visibility-analyst"),
    aiSearch: requireImage("home-ai-search-workflow"),
    automation: requireImage("home-automation-operations"),
    technology: requireImage("home-technology-engineers"),
  };
}

/**
 * Imagery for the homepage narrative sections — Why BizzFly, the Growth
 * Engine, the founder layer, and the four jobs.
 *
 * A DELIBERATE, AUTHORISED EXCEPTION TO THE NO-REPEAT RULE.
 *
 * Every one of the 300 registered images is already assigned to a page, and
 * the rule at the top of this file is that no image appears twice. These
 * sections were added after that inventory was fixed, so making them
 * image-led means either commissioning new photography or reusing what
 * exists. Reuse was chosen explicitly.
 *
 * These are NOT added to the assignment maps below, so `npm run verify:images`
 * still reports zero duplicate ASSIGNMENTS — the audit compares the registry
 * against those maps and does not inspect render sites. That means the
 * verifier will not catch this and cannot be relied on to police it. It is
 * recorded here instead, in the file the rule is stated in.
 *
 * Each image is paired with the page its section links to, so the repeat is
 * at least coherent: a reader who follows "Search & AI visibility" from the
 * four jobs arrives at the page carrying the same photograph.
 *
 * Replacing any of these with its own asset is a one-line change here.
 */
export interface NarrativeImages {
  /** Full-bleed ground behind the Why BizzFly pillars. */
  why: ImageMetadata;
  /** Full-bleed ground behind the Growth Engine opener. */
  engine: ImageMetadata;
  /** Contained portrait-side image for the founder section. */
  founder: ImageMetadata;
  /** One per capability group, keyed by CapabilityGroup.key. */
  jobs: Record<string, ImageMetadata>;
}

export function getNarrativeImages(): NarrativeImages {
  return {
    why: requireImage("company-how-we-work"),
    engine: requireImage("company-discovery-process"),
    founder: requireImage("home-founder"),
    jobs: {
      "be-found": requireImage("practice-search-ai-visibility"),
      build: requireImage("practice-web-development"),
      automate: requireImage("practice-ai-automation"),
      grow: requireImage("practice-digital-marketing"),
    },
  };
}

export function getFounderImage(): ImageMetadata {
  return requireImage("home-founder");
}

/**
 * Imagery for the lifecycle stages on the homepage — Start, Grow, Scale and
 * Transform.
 *
 * Each stage takes the photograph of its own LEAD SERVICE: the first entry in
 * that stage's work list. So the frame a reader clicks and the page the first
 * link opens show the same picture, and the pairing is derived from the
 * content rather than chosen by eye.
 *
 * Same authorised reuse as getNarrativeImages above — these four are assigned
 * to their service pages and appear here a second time. See the note there
 * for why that exception exists and what it costs.
 */
export function getStageImages(): Record<string, ImageMetadata> {
  const lead: Record<string, string> = {
    Start: "corporate-websites",
    Grow: "seo",
    Scale: "workflow-automation",
    Transform: "ai-consulting",
  };

  const out: Record<string, ImageMetadata> = {};
  for (const [stage, slug] of Object.entries(lead)) {
    const image = getServiceImage(slug);
    if (image) out[stage] = image;
  }
  return out;
}

/** Map of service and practice slugs to image IDs. */
export const serviceImageAssignments: Record<string, string> = {
  "search-ai-visibility": "practice-search-ai-visibility",
  "digital-marketing": "practice-digital-marketing",
  "web-development": "practice-web-development",
  "software-development": "practice-software-development",
  "ai-automation": "practice-ai-automation",
  "data-analytics": "practice-data-analytics",
  "seo": "service-seo",
  "ai-search-optimisation": "service-ai-search-optimisation",
  "technical-seo": "service-technical-seo",
  "ai-agents": "service-ai-agents",
  "workflow-automation": "service-workflow-automation",
  "corporate-websites": "service-corporate-websites",
  "answer-engine-optimisation": "service-answer-engine-optimisation",
  "generative-engine-optimisation": "service-generative-engine-optimisation",
  "ai-optimisation": "service-ai-optimisation",
  "search-experience-optimisation": "service-search-experience-optimisation",
  "google-business-profile": "service-google-business-profile",
  "custom-software": "service-custom-software",
  "web-applications": "service-web-applications",
  "ui-ux-design": "service-ui-ux-design",
  "systems-integration": "service-systems-integration",
  "ai-chatbots": "service-ai-chatbots",
  "sales-automation": "service-sales-automation",
  "ai-consulting": "service-ai-consulting",
  "digital-strategy": "service-digital-strategy",
  "performance-marketing": "service-performance-marketing",
  "conversion-rate-optimisation": "service-conversion-rate-optimisation",
  "business-intelligence": "service-business-intelligence",
  "analytics-implementation": "service-analytics-implementation",
  "website-performance": "service-website-performance",
  "website-redesign": "service-website-redesign",
  "seo-audit": "service-seo-audit",
  "on-page-seo": "service-on-page-seo",
  "local-seo": "service-local-seo",
  "enterprise-seo": "service-enterprise-seo",
  "ecommerce-seo": "service-ecommerce-seo",
  "seo-migration": "service-seo-migration",
  "content-strategy": "service-content-strategy",
  "digital-pr": "service-digital-pr",
  "structured-data": "service-structured-data",
  "site-architecture": "service-site-architecture",
  "ai-readiness-assessment": "service-ai-readiness-assessment",
  "ai-document-processing": "service-ai-document-processing",
  "api-development": "service-api-development",
  "crm-implementation": "service-crm-implementation",
  "marketing-automation": "service-marketing-automation",
  "customer-portals": "service-customer-portals",
  "reporting-dashboards": "service-reporting-dashboards",
  "cloud-migration": "service-cloud-migration",
  "website-maintenance": "service-website-maintenance",
  "accessibility-audit": "service-accessibility-audit",
};

export function getServiceImage(slug: string): ImageMetadata | undefined {
  const imageId = serviceImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}

/** Map of industry slugs to image IDs. */
export const industryImageAssignments: Record<string, string> = {
  "manufacturing": "industry-manufacturing",
  "real-estate": "industry-real-estate",
  "education": "industry-education",
  "professional-services": "industry-professional-services",
  "saas": "industry-saas",
  "healthcare": "industry-healthcare",
  "financial-services": "industry-financial-services",
  "ecommerce": "industry-ecommerce",
  "logistics": "industry-logistics",
  "it-services": "industry-it-services",
  "hospitality": "industry-hospitality",
  "startups": "industry-startups",
  "technology": "industry-technology",
  "automotive": "industry-automotive",
  "construction": "industry-construction",
  "legal-services": "industry-legal-services",
  "accounting": "industry-accounting",
  "recruitment": "industry-recruitment",
  "energy": "industry-energy",
  "travel": "industry-travel",
  "nonprofit": "industry-nonprofit",
  "media": "industry-media",
  "agriculture": "industry-agriculture",
  "b2b-services": "industry-b2b-services",
  "d2c-brands": "industry-d2c-brands",
  "smes": "industry-smes",
};

export function getIndustryImage(slug: string): ImageMetadata | undefined {
  const imageId = industryImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}

/** Map of use-case slugs to image IDs. */
export const useCaseImageAssignments: Record<string, string> = {
  "generate-more-leads": "use-case-generate-more-leads",
  "get-found-in-ai-search": "use-case-get-found-in-ai-search",
  "reduce-manual-work": "use-case-reduce-manual-work",
  "increase-organic-traffic": "use-case-increase-organic-traffic",
  "automate-sales-follow-up": "use-case-automate-sales-follow-up",
  "automate-customer-support": "use-case-automate-customer-support",
  "improve-website-conversion": "use-case-improve-website-conversion",
  "rank-in-local-search": "use-case-rank-in-local-search",
  "improve-operational-efficiency": "use-case-improve-operational-efficiency",
  "connect-business-systems": "use-case-connect-business-systems",
  "modernise-legacy-processes": "use-case-modernise-legacy-processes",
  "introduce-ai-into-operations": "use-case-introduce-ai-into-operations",
  "build-a-custom-business-platform": "use-case-build-a-custom-business-platform",
  "improve-digital-presence": "use-case-improve-digital-presence",
  "build-scalable-digital-infrastructure": "use-case-build-scalable-digital-infrastructure",
  "improve-customer-experience": "use-case-improve-customer-experience",
  "reduce-customer-churn": "use-case-reduce-customer-churn",
  "shorten-sales-cycle": "use-case-shorten-sales-cycle",
  "qualify-leads-automatically": "use-case-qualify-leads-automatically",
  "speed-up-quoting": "use-case-speed-up-quoting",
  "prove-marketing-roi": "use-case-prove-marketing-roi",
  "recover-lost-traffic": "use-case-recover-lost-traffic",
  "enter-a-new-market": "use-case-enter-a-new-market",
  "reduce-support-tickets": "use-case-reduce-support-tickets",
  "improve-data-quality": "use-case-improve-data-quality",
  "consolidate-business-tools": "use-case-consolidate-business-tools",
  "onboard-customers-faster": "use-case-onboard-customers-faster",
  "scale-without-hiring": "use-case-scale-without-hiring",
  "launch-a-digital-product": "use-case-launch-a-digital-product",
  "replace-spreadsheet-processes": "use-case-replace-spreadsheet-processes",
};

export function getUseCaseImage(slug: string): ImageMetadata | undefined {
  const imageId = useCaseImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}

/** Map of technology slugs to image IDs. */
export const technologyImageAssignments: Record<string, string> = {
  "web-stack": "tech-web-stack",
  "ai-stack": "tech-ai-stack",
  "automation-platforms": "tech-automation-platforms",
  "engineering-standards": "tech-engineering-standards",
  "search-and-analytics": "tech-search-and-analytics",
  "integrations": "tech-integrations",
  "content-platforms": "tech-content-platforms",
  "cloud-and-hosting": "tech-cloud-and-hosting",
  "data-platforms": "tech-data-platforms",
  "crm-platforms": "tech-crm-platforms",
  "mobile-platforms": "tech-mobile-platforms",
  "security-and-access": "tech-security-and-access",
  "testing-and-quality": "tech-testing-and-quality",
  "observability": "tech-observability",
  "payments-and-billing": "tech-payments-and-billing",
  "accessibility-standards": "tech-accessibility-standards",
};

export function getTechnologyImage(slug: string): ImageMetadata | undefined {
  const imageId = technologyImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}

/** Map of company subpages to image IDs. (22 pages) */
export const companyImageAssignments: Record<string, string> = {
  "about": "company-about",
  "how-we-work": "company-how-we-work",
  "approach": "company-approach",
  "careers": "company-careers",
  "discovery-process": "company-discovery-process",
  "working-with-us": "company-working-with-us",
  "digital-growth-methodology": "company-digital-growth-methodology",
  "seo-methodology": "company-seo-methodology",
  "ai-search-methodology": "company-ai-search-methodology",
  "website-development-process": "company-website-development-process",
  "software-development-process": "company-software-development-process",
  "automation-approach": "company-automation-approach",
  "engagement-models": "company-engagement-models",
  "how-we-price": "company-how-we-price",
  "how-we-report": "company-how-we-report",
  "what-we-do-not-do": "company-what-we-do-not-do",
  "content-standards": "company-content-standards",
  "accessibility-commitment": "company-accessibility-commitment",
  "data-and-privacy-approach": "company-data-and-privacy-approach",
  "faq": "company-faq",
  "privacy-policy": "company-privacy-policy",
  "terms": "company-terms",
};

export function getCompanyImage(slug: string): ImageMetadata | undefined {
  const imageId = companyImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}

export function getCompanyHubImage(): ImageMetadata {
  return requireImage("company-hub");
}

export function getContactImage(): ImageMetadata {
  return requireImage("contact-consultation");
}

export function getCaseStudiesImage(): ImageMetadata {
  return requireImage("case-studies-standard");
}

export function getCaseStudiesAuditImage(): ImageMetadata {
  return requireImage("case-studies-audit");
}

/** Map of resource slugs to image IDs. (145 resources) */
export const resourceImageAssignments: Record<string, string> = {
  "why-ai-overviews-cut-your-clicks": "resource-ai-overviews-clicks",
  "why-your-website-redesign-lost-traffic": "resource-redesign-traffic-loss",
  "when-to-replatform-a-website": "resource-when-to-replatform",
  "when-to-invest-in-analytics": "resource-invest-in-analytics",
  "when-to-outsource-development": "resource-outsource-development",
  "technical-seo-checklist": "resource-checklist-technical-seo",
  "how-to-audit-your-own-website": "resource-guide-seo-audit",
  "seo-vs-aeo": "resource-comparison-framework",
  "custom-software-vs-off-the-shelf": "resource-decision-tree",
  "what-is-generative-engine-optimisation": "resource-glossary-knowledge",
  "what-is-answer-engine-optimisation": "resource-what-is-answer-engine-optimisation",
  "what-the-first-90-days-of-seo-look-like": "resource-what-the-first-90-days-of-seo-look-like",
  "what-is-ai-optimisation": "resource-what-is-ai-optimisation",
  "what-is-search-experience-optimisation": "resource-what-is-search-experience-optimisation",
  "how-to-choose-a-first-automation-project": "resource-how-to-choose-a-first-automation-project",
  "how-ai-search-works": "resource-how-ai-search-works",
  "how-to-prepare-content-for-ai-search": "resource-how-to-prepare-content-for-ai-search",
  "how-to-build-search-visibility": "resource-how-to-build-search-visibility",
  "how-to-measure-search-visibility": "resource-how-to-measure-search-visibility",
  "how-search-intent-works": "resource-how-search-intent-works",
  "how-to-run-a-content-audit": "resource-how-to-run-a-content-audit",
  "how-to-build-an-automation-roadmap": "resource-how-to-build-an-automation-roadmap",
  "how-to-structure-a-website-for-search": "resource-how-to-structure-a-website-for-search",
  "seo-vs-paid-search": "resource-seo-vs-paid-search",
  "aeo-vs-geo": "resource-aeo-vs-geo",
  "traditional-search-vs-ai-search": "resource-traditional-search-vs-ai-search",
  "website-redesign-vs-rebuild": "resource-website-redesign-vs-rebuild",
  "automation-vs-manual-operations": "resource-automation-vs-manual-operations",
  "ai-automation-vs-rule-based-automation": "resource-ai-automation-vs-rule-based-automation",
  "in-house-seo-vs-agency-seo": "resource-in-house-seo-vs-agency-seo",
  "headless-vs-traditional-cms": "resource-headless-vs-traditional-cms",
  "when-do-you-need-an-seo-agency": "resource-when-do-you-need-an-seo-agency",
  "when-should-you-redesign-your-website": "resource-when-should-you-redesign-your-website",
  "when-should-you-build-custom-software": "resource-when-should-you-build-custom-software",
  "when-should-you-automate-a-process": "resource-when-should-you-automate-a-process",
  "when-should-a-business-invest-in-ai": "resource-when-should-a-business-invest-in-ai",
  "how-to-choose-a-digital-growth-partner": "resource-how-to-choose-a-digital-growth-partner",
  "how-to-evaluate-seo-services": "resource-how-to-evaluate-seo-services",
  "how-to-evaluate-a-software-development-partner": "resource-how-to-evaluate-a-software-development-partner",
  "how-to-plan-a-website-redesign": "resource-how-to-plan-a-website-redesign",
  "how-to-plan-a-digital-transformation-project": "resource-how-to-plan-a-digital-transformation-project",
  "ai-search-readiness-checklist": "resource-ai-search-readiness-checklist",
  "website-launch-checklist": "resource-website-launch-checklist",
  "local-seo-checklist": "resource-local-seo-checklist",
  "website-conversion-checklist": "resource-website-conversion-checklist",
  "digital-growth-audit-checklist": "resource-digital-growth-audit-checklist",
  "automation-readiness-checklist": "resource-automation-readiness-checklist",
  "what-is-search-intent": "resource-what-is-search-intent",
  "what-is-entity-optimisation": "resource-what-is-entity-optimisation",
  "what-is-a-knowledge-graph": "resource-what-is-a-knowledge-graph",
  "what-is-schema-markup": "resource-what-is-schema-markup",
  "what-is-zero-click-search": "resource-what-is-zero-click-search",
  "what-is-a-featured-snippet": "resource-what-is-a-featured-snippet",
  "what-is-crawl-budget": "resource-what-is-crawl-budget",
  "what-is-index-coverage": "resource-what-is-index-coverage",
  "what-is-canonicalisation": "resource-what-is-canonicalisation",
  "what-is-core-web-vitals": "resource-what-is-core-web-vitals",
  "what-is-internal-linking": "resource-what-is-internal-linking",
  "what-is-topical-authority": "resource-what-is-topical-authority",
  "what-is-a-large-language-model": "resource-what-is-a-large-language-model",
  "what-is-retrieval-augmented-generation": "resource-what-is-retrieval-augmented-generation",
  "what-is-vector-search": "resource-what-is-vector-search",
  "what-is-an-ai-agent": "resource-what-is-an-ai-agent",
  "what-is-hallucination-in-ai": "resource-what-is-hallucination-in-ai",
  "what-is-robotic-process-automation": "resource-what-is-robotic-process-automation",
  "what-is-an-api": "resource-what-is-an-api",
  "what-is-a-webhook": "resource-what-is-a-webhook",
  "what-is-technical-debt": "resource-what-is-technical-debt",
  "what-is-a-headless-cms": "resource-what-is-a-headless-cms",
  "what-is-server-side-rendering": "resource-what-is-server-side-rendering",
  "what-is-marketing-attribution": "resource-what-is-marketing-attribution",
  "what-is-eeat": "resource-what-is-eeat",
  "what-is-keyword-cannibalisation": "resource-what-is-keyword-cannibalisation",
  "what-is-a-content-cluster": "resource-what-is-a-content-cluster",
  "what-is-an-xml-sitemap": "resource-what-is-an-xml-sitemap",
  "what-is-robots-txt": "resource-what-is-robots-txt",
  "what-is-a-redirect": "resource-what-is-a-redirect",
  "what-is-local-seo": "resource-what-is-local-seo",
  "what-is-programmatic-seo": "resource-what-is-programmatic-seo",
  "what-is-log-file-analysis": "resource-what-is-log-file-analysis",
  "what-is-conversion-rate": "resource-what-is-conversion-rate",
  "what-is-customer-lifetime-value": "resource-what-is-customer-lifetime-value",
  "what-is-machine-learning": "resource-what-is-machine-learning",
  "what-is-prompt-engineering": "resource-what-is-prompt-engineering",
  "what-is-fine-tuning": "resource-what-is-fine-tuning",
  "what-is-middleware": "resource-what-is-middleware",
  "what-is-structured-content": "resource-what-is-structured-content",
  "what-is-a-data-warehouse": "resource-what-is-a-data-warehouse",
  "what-is-a-digital-growth-engine": "resource-what-is-a-digital-growth-engine",
  "what-is-organic-traffic": "resource-what-is-organic-traffic",
  "what-is-bounce-rate": "resource-what-is-bounce-rate",
  "what-is-domain-authority": "resource-what-is-domain-authority",
  "what-is-a-backlink": "resource-what-is-a-backlink",
  "what-is-anchor-text": "resource-what-is-anchor-text",
  "what-is-page-speed": "resource-what-is-page-speed",
  "what-is-a-conversion-funnel": "resource-what-is-a-conversion-funnel",
  "what-is-lead-scoring": "resource-what-is-lead-scoring",
  "what-is-a-customer-data-platform": "resource-what-is-a-customer-data-platform",
  "what-is-etl": "resource-what-is-etl",
  "what-is-a-data-pipeline": "resource-what-is-a-data-pipeline",
  "what-is-single-sign-on": "resource-what-is-single-sign-on",
  "what-is-a-design-system": "resource-what-is-a-design-system",
  "what-is-progressive-enhancement": "resource-what-is-progressive-enhancement",
  "what-is-a-service-level-agreement": "resource-what-is-a-service-level-agreement",
  "what-is-total-cost-of-ownership": "resource-what-is-total-cost-of-ownership",
  "what-is-a-minimum-viable-product": "resource-what-is-a-minimum-viable-product",
  "what-is-workflow-orchestration": "resource-what-is-workflow-orchestration",
  "seo-audit-checklist": "resource-seo-audit-checklist",
  "content-audit-checklist": "resource-content-audit-checklist",
  "site-migration-checklist": "resource-site-migration-checklist",
  "ecommerce-seo-checklist": "resource-ecommerce-seo-checklist",
  "crm-implementation-checklist": "resource-crm-implementation-checklist",
  "integration-readiness-checklist": "resource-integration-readiness-checklist",
  "ai-project-checklist": "resource-ai-project-checklist",
  "accessibility-checklist": "resource-accessibility-checklist",
  "analytics-implementation-checklist": "resource-analytics-implementation-checklist",
  "pre-launch-seo-checklist": "resource-pre-launch-seo-checklist",
  "seo-audit-vs-seo-strategy": "resource-seo-audit-vs-seo-strategy",
  "local-seo-vs-national-seo": "resource-local-seo-vs-national-seo",
  "in-house-vs-outsourced-development": "resource-in-house-vs-outsourced-development",
  "no-code-vs-custom-development": "resource-no-code-vs-custom-development",
  "chatbot-vs-ai-agent": "resource-chatbot-vs-ai-agent",
  "rag-vs-fine-tuning": "resource-rag-vs-fine-tuning",
  "data-warehouse-vs-spreadsheets": "resource-data-warehouse-vs-spreadsheets",
  "native-vs-web-apps": "resource-native-vs-web-apps",
  "organic-vs-paid-social": "resource-organic-vs-paid-social",
  "agency-vs-freelancer": "resource-agency-vs-freelancer",
  "when-to-hire-an-seo-specialist": "resource-when-to-hire-an-seo-specialist",
  "when-to-build-a-mobile-app": "resource-when-to-build-a-mobile-app",
  "how-to-choose-a-cms": "resource-how-to-choose-a-cms",
  "how-to-set-a-digital-budget": "resource-how-to-set-a-digital-budget",
  "how-to-brief-an-seo-agency": "resource-how-to-brief-an-seo-agency",
  "how-to-prioritise-digital-work": "resource-how-to-prioritise-digital-work",
  "seo-reporting-framework": "resource-seo-reporting-framework",
  "enterprise-seo-framework": "resource-enterprise-seo-framework",
  "content-planning-framework": "resource-content-planning-framework",
  "technical-seo-migration-guide": "resource-technical-seo-migration-guide",
  "ai-visibility-measurement-guide": "resource-ai-visibility-measurement-guide",
  "automation-business-case-guide": "resource-automation-business-case-guide",
  "ai-governance-guide": "resource-ai-governance-guide",
  "website-brief-guide": "resource-website-brief-guide",
  "software-requirements-guide": "resource-software-requirements-guide",
  "data-quality-framework": "resource-data-quality-framework",
  "conversion-research-guide": "resource-conversion-research-guide",
  "first-90-days-automation": "resource-first-90-days-automation",
};

export function getResourceImage(slug: string): ImageMetadata | undefined {
  const imageId = resourceImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}
