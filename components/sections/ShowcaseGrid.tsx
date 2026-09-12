import Image from "next/image";
import Link from "next/link";
import type { ImageMetadata } from "@/content/images/types";
import { StaggerItem } from "@/components/motion";
import styles from "./ShowcaseGrid.module.css";
import { titleCase } from "@/lib/titleCase";

export interface ShowcaseEntry {
  image: ImageMetadata;
  /** The discipline the card sits under, set above the title. */
  eyebrow: string;
  title: string;
  lead: string;
  /** Services the card touches. Rendered as a slash-separated rail. */
  tags?: string[];
  href: string;
  linkLabel?: string;
}

interface ShowcaseGridProps {
  entries: ShowcaseEntry[];
  /**
   * The first card runs the full width and carries a larger image. Set false
   * where every entry deserves equal weight.
   */
  feature?: boolean;
}

/**
 * Image-led cards.
 *
 * The photograph is the entry point and the copy sits beneath it, which is
 * the pattern an agency showcase uses: a visitor scanning the page reads the
 * pictures first and the headings second.
 *
 * There is no fabricated proof here. Each card describes a discipline and
 * links to the page that explains it — the same claim the section made as a
 * paragraph, given the weight the layout implies.
 */
export function ShowcaseGrid({ entries, feature = true }: ShowcaseGridProps) {
  return (
    <div className={styles.grid}>
      {entries.map((entry, index) => (
        <StaggerItem
          as="article"
          key={entry.image.id}
          index={index}
          className={`${styles.card} ${feature && index === 0 ? styles.cardFeature : ""}`.trim()}
        >
          <div className={styles.frame}>
            <Image
              src={entry.image.src}
              alt={entry.image.alt}
              width={entry.image.width}
              height={entry.image.height}
              loading="lazy"
              sizes={
                feature && index === 0
                  ? "(min-width: 1100px) 1120px, 100vw"
                  : "(min-width: 1100px) 550px, (min-width: 720px) 50vw, 100vw"
              }
              className={styles.image}
            />
          </div>

          <div className={styles.body}>
            <p className={styles.eyebrow}>{entry.eyebrow}</p>

            <h3 className={styles.title}>
              {/*
                Stretched over the card, so the image is part of the target
                and the link is named by the heading rather than by "read on".
              */}
              <Link href={entry.href} className={styles.titleLink}>
                {titleCase(entry.title)}
              </Link>
            </h3>

            <p className={styles.lead}>{entry.lead}</p>

            {entry.tags?.length ? (
              <ul className={styles.tags}>
                {entry.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {titleCase(tag)}
                  </li>
                ))}
              </ul>
            ) : null}

            {entry.linkLabel ? (
              <p className={styles.action}>
                {titleCase(entry.linkLabel)}
                <span className={styles.arrow} aria-hidden="true">
                  &rarr;
                </span>
              </p>
            ) : null}
          </div>
        </StaggerItem>
      ))}
    </div>
  );
}
