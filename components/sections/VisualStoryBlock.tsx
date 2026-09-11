import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageMetadata } from "@/content/images/types";
import { ImageReveal, Reveal, ScrollScale } from "@/components/motion";
import type { ImageRevealVariant } from "@/components/motion";
import styles from "./VisualStoryBlock.module.css";
import { titleCase } from "@/lib/titleCase";

/**
 * How each composition opens its frame.
 *
 * Deliberately not one reveal repeated five times. The wipe travels the way
 * the composition reads: A leads with the picture and uncovers upward into
 * the text below it; B and D sit beside their text and open towards it; C is
 * a full-bleed band, which is too wide for a directional wipe to finish
 * cleanly, so it opens from the centre instead; E carries a badge over the
 * lower corner and uncovers upward so the badge is the last thing to land.
 */
const revealFor: Record<
  NonNullable<VisualStoryBlockProps["variant"]>,
  ImageRevealVariant
> = {
  A: "wipe-up",
  B: "wipe-right",
  C: "mask",
  D: "scale",
  E: "wipe-up",
};

export interface VisualStoryBlockProps {
  image: ImageMetadata;
  variant?: "A" | "B" | "C" | "D" | "E";
  reverse?: boolean;
  eyebrow?: string;
  title?: string;
  titleLevel?: 2 | 3 | 4;
  lead?: ReactNode;
  children?: ReactNode;
  priority?: boolean;
  badgeText?: string;
  caption?: string;
  className?: string;
}

/**
 * VisualStoryBlock — Renders rich, responsive, topic-specific imagery
 * across diverse editorial compositions (variants A–E) per design principle P5.
 */
export function VisualStoryBlock({
  image,
  variant = "B",
  reverse = false,
  eyebrow,
  title,
  titleLevel = 2,
  lead,
  children,
  priority = false,
  badgeText,
  caption,
  className,
}: VisualStoryBlockProps) {
  const hasText = Boolean(eyebrow || title || lead || children);
  const displayCaption = caption ?? image.caption;
  const HeadingTag = titleLevel === 3 ? "h3" : titleLevel === 4 ? "h4" : "h2";

  const picture = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={
        variant === "C"
          ? "(min-width: 1280px) 1200px, 100vw"
          : "(min-width: 1024px) 55vw, 100vw"
      }
    />
  );

  /*
   * The frame IS the reveal, rather than a reveal nested inside it. Wrapping
   * would put two more boxes between the frame's aspect-ratio and the image's
   * `height: 100%`, which breaks the crop; this way the clip lands on the
   * element that already defines the shape.
   *
   * A priority image is never clipped. It is the LCP candidate on whatever
   * page marked it priority, and a clip-path hides exactly the pixels the
   * metric is waiting to see.
   */
  const frame = priority ? (
    <div className={styles.imageFrame}>{picture}</div>
  ) : (
    <ImageReveal
      variant={
        /* B opens towards its text, so a reversed layout wipes the other way. */
        variant === "B" && reverse ? "wipe-left" : revealFor[variant]
      }
      className={styles.imageFrame}
    >
      {/*
        Variant C is the only full-bleed band here, and the only one wide
        enough that a slow crop change reads as depth rather than as the
        image failing to settle.
      */}
      {variant === "C" ? <ScrollScale mode="in">{picture}</ScrollScale> : picture}
    </ImageReveal>
  );

  const imageElement = (
    <figure className={styles.figure}>
      {frame}
      {variant === "E" && (badgeText || displayCaption) ? (
        <div className={styles.badge}>
          <p className={styles.badgeText}>{badgeText || displayCaption}</p>
        </div>
      ) : null}
      {displayCaption && variant !== "E" ? (
        <figcaption className={styles.caption}>{displayCaption}</figcaption>
      ) : null}
    </figure>
  );

  const textContent = hasText ? (
    <div className={
      variant === "A"
        ? styles.variantAContent
        : variant === "C"
          ? styles.variantCContent
          : variant === "D"
            ? styles.variantDContent
            : styles.variantBContent
    }>
      {/*
        The eyebrow and the title are one unit.
        Variant C lays this content out as a two-column grid — label column,
        reading column — and an eyebrow, a title and a lead are three
        children. The grid placed them one per cell, which put the title in
        the reading column and pushed the lead back under the eyebrow, so the
        section read as three fragments rather than as a heading and its
        paragraph. Grouping them makes the child count match the columns, and
        costs the other variants nothing: they are flex columns either way.
      */}
      {eyebrow || title ? (
        <div className={styles.titleGroup}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          {title ? (
            <HeadingTag className={styles.title}>{titleCase(title)}</HeadingTag>
          ) : null}
        </div>
      ) : null}
      {lead ? (
        typeof lead === "string" ? (
          <p className={styles.lead}>{lead}</p>
        ) : (
          lead
        )
      ) : null}
      {children}
    </div>
  ) : null;

  if (variant === "A") {
    return (
      <Reveal className={`${styles.wrapper} ${styles.variantA} ${className ?? ""}`}>
        {imageElement}
        {textContent}
      </Reveal>
    );
  }

  if (variant === "C") {
    return (
      <Reveal className={`${styles.wrapper} ${styles.variantC} ${className ?? ""}`}>
        {imageElement}
        {textContent}
      </Reveal>
    );
  }

  if (variant === "D") {
    return (
      <Reveal className={`${styles.wrapper} ${styles.variantD} ${className ?? ""}`}>
        {imageElement}
        {textContent}
      </Reveal>
    );
  }

  if (variant === "E") {
    return (
      <Reveal className={`${styles.wrapper} ${styles.variantE} ${className ?? ""}`}>
        {imageElement}
      </Reveal>
    );
  }

  // Default: Variant B (split). With nothing beside it, the split would strand
  // the figure in the 5fr track, so an image-only block collapses to one column.
  return (
    <Reveal
      className={`${styles.wrapper} ${styles.variantB} ${
        hasText && reverse ? styles.variantBReverse : ""
      } ${hasText ? "" : styles.solo} ${className ?? ""}`}
    >
      {reverse ? (
        <>
          {imageElement}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageElement}
        </>
      )}
    </Reveal>
  );
}
