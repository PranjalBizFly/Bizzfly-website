import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageMetadata } from "@/content/images/types";
import { Reveal } from "@/components/motion";
import styles from "./VisualStoryBlock.module.css";

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

  const imageElement = (
    <figure className={styles.figure}>
      <div className={styles.imageFrame}>
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
        {variant === "E" && (badgeText || displayCaption) ? (
          <div className={styles.badge}>
            <p className={styles.badgeText}>{badgeText || displayCaption}</p>
          </div>
        ) : null}
      </div>
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
          {title ? <HeadingTag className={styles.title}>{title}</HeadingTag> : null}
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
