import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageMetadata } from "@/content/images/types";
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
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      {title ? <HeadingTag className={styles.title}>{title}</HeadingTag> : null}
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
      <div className={`${styles.wrapper} ${styles.variantA} ${className ?? ""}`}>
        {imageElement}
        {textContent}
      </div>
    );
  }

  if (variant === "C") {
    return (
      <div className={`${styles.wrapper} ${styles.variantC} ${className ?? ""}`}>
        {imageElement}
        {textContent}
      </div>
    );
  }

  if (variant === "D") {
    return (
      <div className={`${styles.wrapper} ${styles.variantD} ${className ?? ""}`}>
        {imageElement}
        {textContent}
      </div>
    );
  }

  if (variant === "E") {
    return (
      <div className={`${styles.wrapper} ${styles.variantE} ${className ?? ""}`}>
        {imageElement}
      </div>
    );
  }

  // Default: Variant B (split)
  return (
    <div
      className={`${styles.wrapper} ${styles.variantB} ${
        reverse ? styles.variantBReverse : ""
      } ${className ?? ""}`}
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
    </div>
  );
}
