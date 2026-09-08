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
  "conversion-rate-optimization": "service-conversion-rate-optimization",
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

/** Map of company subpages to image IDs. */
export const companyImageAssignments: Record<string, string> = {
  "about": "company-about",
  "how-we-work": "company-how-we-work",
  "approach": "company-approach",
  "careers": "company-careers",
  "discovery-process": "company-discovery-process",
  "working-with-us": "company-working-with-us",
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

/** Map of featured resource slugs to image IDs. */
export const resourceImageAssignments: Record<string, string> = {
  "why-ai-overviews-cut-your-clicks": "resource-ai-overviews-clicks",
  "why-your-website-redesign-lost-traffic": "resource-redesign-traffic-loss",
  "when-to-replatform-a-website": "resource-when-to-replatform",
  "when-to-invest-in-analytics": "resource-invest-in-analytics",
  "when-to-outsource-development": "resource-outsource-development",
  "how-to-audit-an-enterprise-website": "resource-guide-seo-audit",
  "technical-seo-checklist": "resource-checklist-technical-seo",
  "seo-vs-aeo-comparison": "resource-comparison-framework",
  "build-vs-buy-software-decision": "resource-decision-tree",
  "glossary": "resource-glossary-knowledge",
};

export function getResourceImage(slug: string): ImageMetadata | undefined {
  const imageId = resourceImageAssignments[slug];
  return imageId ? getImage(imageId) : undefined;
}
