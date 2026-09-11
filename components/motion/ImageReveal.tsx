"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "./useReveal";
import styles from "./ImageReveal.module.css";

/**
 * How the frame opens.
 *
 * "wipe" variants uncover the image from one edge; "mask" opens it from the
 * centre band outward; "scale" does not clip at all and is the quiet option
 * for an image that sits next to text doing its own reveal.
 */
export type ImageRevealVariant =
  | "wipe-up"
  | "wipe-down"
  | "wipe-left"
  | "wipe-right"
  | "mask"
  | "scale";

interface ImageRevealProps {
  variant?: ImageRevealVariant;
  /** Milliseconds before the frame starts to open. */
  delay?: number;
  /**
   * Corner radius for a standalone frame. Leave unset when the frame is
   * being given an existing class that already owns its radius — passing one
   * then would win on specificity and flatten the corners.
   */
  radius?: "none" | "md" | "lg" | "xl";
  className?: string;
  /** The image, passed through untouched — usually a next/image. */
  children: ReactNode;
}

/**
 * Opens a frame over an image as it arrives.
 *
 * The clip is on the frame and the counter-scale is on the image inside it,
 * which is what makes the effect read as a camera revealing something rather
 * than a picture fading in: the image is already at rest by the time the
 * frame has finished opening, so the last thing the eye settles on is a
 * static photograph.
 *
 * Both halves are composited properties — `clip-path` and `transform` — so
 * nothing here triggers layout, and the image's own box never changes size.
 * That matters more than the effect does: these frames sit in editorial
 * columns where a reflow would push the paragraph the reader is on.
 *
 * NOT for a hero image. Above the fold the image is the LCP element, and
 * clipping it hides the very pixels the metric is waiting to see. Heroes run
 * a scale-only load animation instead, which is why CinematicHero does its
 * own thing rather than calling this.
 */
export function ImageReveal({
  variant = "wipe-up",
  delay = 0,
  radius,
  className = "",
  children,
}: ImageRevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.frame} ${className}`.trim()}
      data-variant={variant}
      data-radius={radius}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {/*
        Three boxes, and the split between the outer two is load-bearing.

        The observed element must never be the clipped one. An element whose
        own clip-path reduces it to zero area is reported as NOT intersecting
        by IntersectionObserver — verified in Chrome — so a frame that closed
        itself would never be told it had arrived, and the image would stay
        hidden for the life of the page. That is the one failure this whole
        motion system is built to avoid, and it is silent: the image simply
        is not there.

        So .frame is observed and never clipped, .clip does the wiping, and
        .inner carries the counter-scale.
      */}
      <div className={styles.clip}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
}
