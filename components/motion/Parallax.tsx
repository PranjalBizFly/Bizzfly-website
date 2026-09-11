import type { CSSProperties, ElementType, ReactNode } from "react";
import styles from "./Parallax.module.css";

type Depth = "sm" | "md";

interface ParallaxProps {
  /**
   * How far the layer travels across its pass through the viewport. "sm" is
   * for anything sitting next to text; "md" is for a large standalone
   * composition. There is no "lg" — past this the page stops reading as
   * layered and starts reading as loose.
   */
  depth?: Depth;
  /** Inverts the direction, so two layers can separate as they pass. */
  invert?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * A layer that drifts slightly against the scroll.
 *
 * No JavaScript, no scroll listener and no hook: this is a CSS scroll-driven
 * animation on a `view()` timeline, which the browser runs on the compositor
 * off the main thread. That is the whole reason to do parallax this way — the
 * usual implementation reads scrollTop on every frame and writes a transform
 * back, which is precisely the pattern that makes a page feel heavy on a
 * mid-range phone.
 *
 * It stays a server component for the same reason, so a hero can layer its
 * imagery without crossing the client boundary.
 *
 * Support is a progressive enhancement. Where `view()` timelines do not
 * exist the element renders with no transform at all, which is the correct
 * fallback: parallax is depth, not information, and nothing is lost without
 * it. Reduced motion is handled at the media query rather than the token,
 * because the animation should not be declared at all in that case.
 */
export function Parallax({
  depth = "sm",
  invert = false,
  as: Tag = "div",
  className = "",
  children,
}: ParallaxProps) {
  return (
    <Tag
      className={`${styles.layer} ${className}`.trim()}
      data-depth={depth}
      data-invert={invert ? "true" : undefined}
    >
      {children}
    </Tag>
  );
}

interface ScrollScaleProps {
  /**
   * "in" settles an oversized image down to rest as it enters — the calmer
   * option, and the right one for an editorial image.
   * "through" runs the scale across the whole pass, so a large visual keeps
   * moving for as long as it is on screen.
   */
  mode?: "in" | "through";
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * A visual whose crop changes slightly as the page moves past it.
 *
 * Same mechanism and same trade-offs as Parallax — a composited scale on a
 * `view()` timeline, no JavaScript, no client boundary. Worth using only on
 * a large image that has room to change without the change looking like a
 * mistake; on a small thumbnail the effect reads as the image failing to
 * load at a stable size.
 */
export function ScrollScale({
  mode = "in",
  as: Tag = "div",
  className = "",
  children,
}: ScrollScaleProps) {
  return (
    <Tag className={`${styles.scale} ${className}`.trim()} data-mode={mode}>
      {children}
    </Tag>
  );
}

/**
 * Sets the parallax distance for one subtree.
 *
 * Occasionally a composition needs a layer between the two depths, or needs
 * the same depth expressed against a different image size. Passing a number
 * of pixels here is clearer at the call site than adding a third named depth
 * that only one section ever uses.
 */
export function parallaxDepth(pixels: number): CSSProperties {
  return { "--parallax-shift": `${pixels}px` } as CSSProperties;
}
