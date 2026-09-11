"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "./useReveal";
import styles from "./PathDraw.module.css";

interface PathDrawProps {
  /**
   * The SVG. Every stroked element inside it must carry `pathLength={1}`,
   * which normalises its length so one dash rule can drive a straight
   * connector and a long curve identically — CSS has no way to measure a
   * path, and hard-coding a dasharray per shape goes stale the moment the
   * geometry is nudged.
   */
  children: ReactNode;
  /** Milliseconds before the first stroke starts. */
  delay?: number;
  /** How long the whole drawing takes. Defaults to the story duration. */
  duration?: number;
  className?: string;
}

/**
 * Draws an SVG as it arrives, rather than presenting it finished.
 *
 * Worth doing only where the drawing carries the meaning: a connector
 * between two steps, a path through a decision, a line linking two systems.
 * The stroke arriving in the direction the diagram is read is what makes the
 * relationship legible — which is also the test for whether to use this at
 * all. A decorative shape drawing itself is an effect, and this component
 * should not be used for one.
 *
 * `stroke-dashoffset` is not a composited property, so this repaints the
 * stroke each frame. That is affordable for a handful of thin paths and is
 * not affordable for a detailed illustration; keep the geometry simple.
 */
export function PathDraw({
  children,
  delay = 0,
  duration,
  className = "",
}: PathDrawProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.draw} ${className}`.trim()}
      style={
        {
          "--draw-delay": `${delay}ms`,
          ...(duration ? { "--draw-duration": `${duration}ms` } : {}),
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
