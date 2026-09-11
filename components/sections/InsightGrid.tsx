import Image from "next/image";
import Link from "next/link";
import type { ImageMetadata } from "@/content/images/types";
import { StaggerItem } from "@/components/motion";
import styles from "./InsightGrid.module.css";
import { titleCase } from "@/lib/titleCase";

export interface InsightEntry {
  image: ImageMetadata;
  /** ARTICLE, CHECKLIST, DECISION — the kind of thing this is. */
  kind: string;
  title: string;
  excerpt: string;
  href: string;
}

interface InsightGridProps {
  entries: InsightEntry[];
}

/**
 * Insight cards — a cover image, what kind of piece it is, the title and an
 * excerpt.
 *
 * Three across, which is what makes them read as a publication rather than as
 * three more links: the section used to be text-only rows and disappeared
 * against the lists above and below it.
 *
 * The excerpt is clamped in CSS rather than truncated here, so the full text
 * stays in the DOM for search and for anyone reading with styles off.
 */
export function InsightGrid({ entries }: InsightGridProps) {
  return (
    <div className={styles.grid}>
      {entries.map((entry, index) => (
        <StaggerItem
          as="article"
          key={entry.href}
          index={index}
          className={styles.card}
        >
          <div className={styles.frame}>
            <Image
              src={entry.image.src}
              alt={entry.image.alt}
              width={entry.image.width}
              height={entry.image.height}
              loading="lazy"
              sizes="(min-width: 1100px) 380px, (min-width: 720px) 45vw, 100vw"
              className={styles.image}
            />
          </div>

          <p className={styles.kind}>{entry.kind}</p>

          <h3 className={styles.title}>
            {/* Stretched over the card, so the image is part of the target. */}
            <Link href={entry.href} className={styles.titleLink}>
              {titleCase(entry.title)}
            </Link>
          </h3>

          <p className={styles.excerpt}>{entry.excerpt}</p>

          <p className={styles.action}>
            Read more
            <span className={styles.arrow} aria-hidden="true">
              &rarr;
            </span>
          </p>
        </StaggerItem>
      ))}
    </div>
  );
}
