/**
 * BizzFly content model.
 *
 * Entities with relationships, not pages — so one verified proof point can
 * appear on its service, industry, use case and case study without being
 * copied. See docs/architecture/05-page-types-and-content-model.md.
 */

/* ==========================================================================
   Shared primitives
   ========================================================================== */

/** Marks content that is not yet verified. Never invent business proof. */
export const CONTENT_REQUIRED = "[CONTENT_REQUIRED]" as const;
export const VERIFY_WITH_BIZZFLY = "[VERIFY_WITH_BIZZFLY]" as const;

export type Placeholder = typeof CONTENT_REQUIRED | typeof VERIFY_WITH_BIZZFLY;

/** Audience groups A1–A9 from docs/architecture/02. */
export type AudienceId =
  | "A1" // Founder / Owner (SME)
  | "A2" // CEO / MD (mid-market)
  | "A3" // CMO / Marketing Head
  | "A4" // Marketing Manager / Specialist
  | "A5" // Sales Head
  | "A6" // Operations / Process Owner
  | "A7" // CTO / IT Lead
  | "A8" // Procurement / Finance
  | "A9"; // Candidate / Partner

/** CTA tiers T0–T5 from docs/architecture/06. Tier drives button variant. */
export type CtaTier = "T0" | "T1" | "T2" | "T3" | "T4" | "T5";

export type SearchIntent =
  | "informational"
  | "commercial"
  | "transactional"
  | "navigational";

export type BuildPhase = "P1" | "P2" | "P3";

/**
 * Publication status. Only "published" reaches a public route, so depth
 * pages can exist in the content model without being exposed unfinished.
 */
export type ContentStatus = "draft" | "review" | "published";

/**
 * Page composition variants.
 * The content decides which composition a page uses, so pages differ
 * structurally without needing a bespoke component each.
 */
export type ServiceLayout =
  | "editorial"
  | "capability-led"
  | "process-led"
  | "technology-led";

export type IndustryLayout = "challenge-led" | "opportunity-led" | "journey-led";

export type UseCaseLayout = "problem-solution" | "workflow-led" | "outcome-led";

export type TechnologyLayout = "ecosystem-led" | "architecture-led" | "capability-led";

/** Diagram shown on a page, chosen by subject rather than decoration. */
export type DiagramKind =
  | "search-surfaces"
  | "experience-flow"
  | "system-architecture"
  | "process-transformation"
  | "ai-workflow"
  | "content-structure"
  | "none";

/** Explicit cross-dimension relationships, resolved by lib/relationships.ts. */
export interface EntityRelationships {
  relatedServices?: string[];
  relatedIndustries?: string[];
  relatedUseCases?: string[];
  relatedTechnologies?: string[];
  relatedResources?: string[];
}

export interface Cta {
  label: string;
  href: string;
  tier: CtaTier;
  /** Optional supporting line, e.g. "30 minutes. No deck." */
  note?: string;
}

export interface SeoData {
  title: string;
  description: string;
  canonical?: string;
  /** One primary topic per page — no exceptions. */
  primaryTopic: string;
  secondaryTopics?: string[];
  intent: SearchIntent;
  noindex?: boolean;
  ogImage?: string;
}

export interface Faq {
  question: string;
  /** Self-contained: must make sense pasted into a chat window. */
  answer: string;
}

/**
 * A verified metric. Renders only when every field is present —
 * see docs/design-system/08 anti-template rule 20.
 */
export interface Proof {
  metric: string;
  value: string;
  /** Measurement window, e.g. "6 months to Aug 2026". */
  timeframe: string;
  /** Where the number came from. */
  source: string;
  verifiedOn: string;
  approvedForPublication: boolean;
}

export interface ProcessStep {
  index: number;
  title: string;
  description: string;
  duration?: string;
}

export interface RelatedLink {
  label: string;
  href: string;
  /** Rendered as a mono type tag. */
  type?: string;
  description?: string;
}

/* ==========================================================================
   Core entities
   ========================================================================== */

interface BaseEntity extends EntityRelationships {
  slug: string;
  title: string;
  /** Defaults to "published" when omitted. Draft and review never render. */
  status?: ContentStatus;
  /** Short mono label above the H1. */
  eyebrow?: string;
  /** ≤60 words, extractable. First substantive text on the page. */
  answer: string;
  seo: SeoData;
  audience: AudienceId[];
  phase: BuildPhase;
  cta: Cta;
  faqs?: Faq[];
  /** Manually curated links. Computed relationships are merged in on render. */
  related?: RelatedLink[];
  updated?: string;
}

export type PracticeId =
  | "search-ai-visibility"
  | "digital-marketing"
  | "web-development"
  | "software-development"
  | "ai-automation"
  | "data-analytics";

export interface Practice extends BaseEntity {
  id: PracticeId;
  /** Short definition used in the mega menu. */
  menuDescription: string;
  index: string;
  services: string[];
  process?: ProcessStep[];
}

export interface Service extends BaseEntity {
  practice: PracticeId;
  /** Parent service slug for nested clusters (e.g. SEO → technical-seo). */
  parent?: string;
  /** Directory grouping on /services/, independent of practice. */
  group?: ServiceGroupId;
  /** Composition variant. Defaults to "editorial". */
  layout?: ServiceLayout;
  diagram?: DiagramKind;
  whoFor: string[];
  included: string[];
  /** The business problem, stated before any capability. */
  problems?: string[];
  /** What the service is designed to improve. Qualitative, never invented. */
  outcomes?: string[];
  approach?: ProcessStep[];
  timeline?: string;
  outOfScope?: string[];
  technologies?: string[];
  proof?: Proof[];
}

export type ServiceGroupId =
  | "digital-visibility"
  | "digital-experience"
  | "systems-software"
  | "automation"
  | "ai"
  | "growth";

export interface IndustryProblem {
  title: string;
  description: string;
  /** Service slugs that address this problem. */
  addressedBy: string[];
}

export interface Industry extends BaseEntity {
  layout?: IndustryLayout;
  diagram?: DiagramKind;
  /** The digital opportunity for this sector, stated plainly. */
  opportunity?: string;
  /** Sector context in the sector's own vocabulary — proves fluency. */
  context: string;
  problems: IndustryProblem[];
  useCases: string[];
  services: string[];
  complianceNotes?: string;
  proof?: Proof[];
}

export interface UseCase extends BaseEntity {
  layout?: UseCaseLayout;
  diagram?: DiagramKind;
  /** Why solving this matters commercially. */
  whyItMatters?: string;
  /** How the problem shows up day to day. Symptoms before solution. */
  symptoms: string[];
  rootCauses: string[];
  approach: ProcessStep[];
  targetState: string;
  realisticTimeline: string;
  services: string[];
  industries?: string[];
  proof?: Proof[];
}

export interface Technology extends BaseEntity {
  category: string;
  /** Directory grouping on /technologies/. */
  group?: TechnologyGroupId;
  layout?: TechnologyLayout;
  diagram?: DiagramKind;
  /** Why this matters to the business, not to an engineer. */
  whyItMatters?: string;
  /** What we use and why. */
  choices: { name: string; rationale: string }[];
  /** Mandatory — what separates this from a logo wall. */
  whenNotToUse: string[];
  decisionCriteria?: string[];
  services?: string[];
}

export type TechnologyGroupId =
  | "ai"
  | "automation"
  | "web"
  | "software"
  | "search-data"
  | "practice";

export type CaseStudyLayout = "narrative" | "outcome-led" | "build-led";

export interface CaseStudy extends BaseEntity {
  layout?: CaseStudyLayout;
  /** Named, or honestly anonymised. Never invented. */
  client: string | Placeholder;
  industry: string;
  /** Only where the client has approved it being published. */
  location?: string;
  summary?: string;
  technologies?: string[];
  implementation?: string;
  publishedAt?: string;
  servicesDelivered: string[];
  context: string | Placeholder;
  challenge: string | Placeholder;
  objectives: string[];
  strategy: string | Placeholder;
  execution: ProcessStep[];
  /** Mandatory. A case study with no challenges reads as fiction. */
  challenges: string | Placeholder;
  results: Proof[];
  lessons: string | Placeholder;
  quote?: { text: string; attribution: string };
  year?: string;
  /** Gate: false until every field above is verified. */
  publishable: boolean;
}

export type ResourceType =
  | "guide"
  | "article"
  | "glossary"
  /** Balanced two-option analysis. Never a disguised pitch for one side. */
  | "comparison"
  /** "When should you…" — helps a reader decide, including to do nothing. */
  | "decision"
  | "checklist"
  | "faq"
  | "report"
  | "whitepaper"
  | "tool";

export interface Resource extends BaseEntity {
  type: ResourceType;
  topic: string;
  author?: string;
  publishedOn?: string;
  readingTime?: string;
  /** Service slugs this resource supports. */
  supports?: string[];
  body?: string[];
}

export interface CompanyPage extends BaseEntity {
  section: "about" | "careers" | "legal" | "contact";
  body?: string[];
}

/* ==========================================================================
   Navigation
   ========================================================================== */

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavigationColumn {
  heading: string;
  headingHref?: string;
  items: NavigationItem[];
  /**
   * The way out of the group and into the whole of it. A panel-level
   * "explore all" answers "where is the rest of this menu"; this answers
   * "where is the rest of THIS category", which is a different question and
   * the one a grouped menu creates by grouping.
   */
  viewAll?: NavigationItem;
  /** Count or qualifier shown beside the heading, e.g. "26 sectors". */
  meta?: string;
}

export interface NavigationFeature {
  /** Mono tag, e.g. "GUIDE". */
  kind: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export interface MegaMenuPanel {
  /**
   * One sentence saying what this section of the site is for. A grouped
   * menu is a table of contents, and a table of contents with no title
   * makes the reader infer the subject from the entries.
   */
  lead?: string;
  /** Label over the numbered column, e.g. "Start here". */
  primaryHeading?: string;
  /** Numbered practice/primary list — the control column. */
  primary: (NavigationItem & { index?: string })[];
  /** Label over the grouped region, e.g. "Browse by outcome". */
  columnsHeading?: string;
  columns?: NavigationColumn[];
  feature?: NavigationFeature;
  secondaryFeature?: NavigationFeature;
  footerLink: NavigationItem;
}

export interface PrimaryNavItem {
  label: string;
  href: string;
  panel?: MegaMenuPanel;
}

/* ==========================================================================
   Search index
   ========================================================================== */

export interface SearchDocument {
  id: string;
  title: string;
  /** Display category, e.g. "Services". */
  category: string;
  description: string;
  href: string;
  /** Ranking weight — Conversion/Service highest, Blog/Glossary lowest. */
  boost: number;
  keywords?: string[];
}
