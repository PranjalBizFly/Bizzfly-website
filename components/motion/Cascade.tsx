"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "./useReveal";
import styles from "./Reveal.module.css";

type CascadeProps = {
  /** The element to render. `ul`, `ol` and `dl` keep their semantics. */
  as?: ElementType;
  /** Milliseconds between children. Defaults to --stagger-step. */
  step?: number;
  className?: string;
  children: ReactNode;
} & /** Anything else the rendered element needs — id, aria-label, role. */
  Record<string, unknown>;

/**
 * A staggered reveal for a list or grid, done in CSS.
 *
 * StaggerGroup solves the same problem by wrapping every child in its own
 * observed element. That is the right tool when the children are separate
 * compositions, but it is the wrong one for a list: it puts a div between a
 * `ul` and its `li`s, which is invalid markup and drops the list semantics
 * screen readers announce, and it registers one IntersectionObserver per
 * item — twenty-six on the industries directory alone.
 *
 * This observes the container once and cascades the children with
 * `nth-child` delays. The DOM is untouched, so a `ul` stays a `ul`.
 *
 * Children are visible by default and only hidden once JS has marked the
 * container pending, so a failed script or a crawler that runs none sees the
 * full list. Elements already on screen when the observer registers skip
 * straight to visible rather than blinking out — see useReveal.
 */
export function Cascade({
  as: Tag = "div",
  step,
  className = "",
  children,
  ...rest
}: CascadeProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`${styles.cascade} ${className}`.trim()}
      style={step ? ({ "--stagger-step": `${step}ms` } as CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
