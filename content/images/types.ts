/**
 * BizzFly Centralized Image System — Type Definitions
 *
 * Every image asset is modeled with structured metadata to guarantee
 * semantic relevance, accessibility, responsive dimensions, and zero duplication.
 */

export type ImageType =
  | "human"
  | "business"
  | "technology"
  | "process"
  | "editorial";

export type ImageCategory =
  | "digital-growth"
  | "automation"
  | "technology"
  | "services"
  | "industries"
  | "use-cases"
  | "company"
  | "resources"
  | "case-studies";

export type ImageUsage =
  | "hero"
  | "editorial"
  | "section"
  | "feature"
  | "showcase"
  | "consultation";

export type ImageAspectRatio = "16:9" | "4:3" | "3:2" | "1:1";

export interface ImageMetadata {
  /** Unique ID across the entire system. Never reused. */
  id: string;
  /** Relative web path, e.g. "/images/services/seo-strategy-team.webp" */
  src: string;
  /** Descriptive, topic-specific alt text. Non-keyword-stuffed. */
  alt: string;
  /** Primary topic of the visual */
  topic: string;
  /** High-level category */
  category: ImageCategory;
  /** Visual nature: human, business, tech, etc. */
  type: ImageType;
  /** Standard aspect ratio */
  aspectRatio: ImageAspectRatio;
  /** Intrinsic width in pixels */
  width: number;
  /** Intrinsic height in pixels */
  height: number;
  /** Optional editorial caption */
  caption?: string;
  /** Primary usage intent */
  usage: ImageUsage;
}

export interface PageImageAssignment {
  primary?: ImageMetadata;
  secondary?: ImageMetadata;
  tertiary?: ImageMetadata;
}
