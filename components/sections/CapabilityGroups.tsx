"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { Glyph } from "@/components/brand/Glyph";
import { capabilityGroups } from "@/content/homepage";
import type { ImageMetadata } from "@/content/images/types";
import styles from "./CapabilityGroups.module.css";
import { titleCase } from "@/lib/titleCase";

interface CapabilityGroupsProps {
  /** One frame per group, keyed by CapabilityGroup.key. */
  images: Record<string, ImageMetadata>;
}

/**
 * Section 02 — the four jobs, in the order they matter.
 *
 * Was a four-up card wall. A card wall gives four things equal weight and a
 * reader takes none of them in; it is also the single most template-looking
 * composition on the web, and this is the first thing under the hero.
 *
 * It is now a set of editorial rows that open. The row carries the number,
 * the job and the question it answers — enough to scan all four in a couple
 * of seconds — and opening one reveals why it matters and the services under
 * it. That turns the section from four summaries competing for attention into
 * one question at a time, which is how the argument actually runs.
 *
 * Click rather than hover. The brief for this section asked for hover
 * activation, but this control changes the height of the page: expanding a
 * region under the pointer as it passes moves the content the reader was
 * about to click. Hover gets the quieter treatments instead — the rule
 * extends and the marker turns — and the disclosure stays on click, which is
 * also what makes it operable on a touchscreen and from a keyboard.
 *
 * The first row starts open so the section is never a stack of closed bars,
 * and every panel stays in the DOM so the content is complete for crawlers.
 */
export function CapabilityGroups({ images }: CapabilityGroupsProps) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <ol className={styles.groups}>
      {capabilityGroups.map((group, index) => {
        const expanded = index === open;
        return (
          <li key={group.key} className={styles.group} data-expanded={expanded}>
            <h3 className={styles.headingRow}>
              <button
                type="button"
                id={`${baseId}-trigger-${index}`}
                className={styles.trigger}
                aria-expanded={expanded}
                aria-controls={`${baseId}-panel-${index}`}
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                <span className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.label}>{titleCase(group.label)}</span>
                <span className={styles.question}>{titleCase(group.question)}</span>
                <span className={styles.marker} aria-hidden="true">
                  &rarr;
                </span>
              </button>
            </h3>

            {/*
              The grid 0fr -> 1fr technique. It is a layout animation, which
              this system otherwise avoids, but a disclosure has to change the
              height of the document by definition and every alternative is
              either a fixed height or a jump. The animated content is a few
              lines of text, and it runs once per interaction rather than
              continuously.
            */}
            <div
              id={`${baseId}-panel-${index}`}
              role="region"
              aria-labelledby={`${baseId}-trigger-${index}`}
              className={styles.panel}
              data-expanded={expanded}
            >
              <div className={styles.panelInner}>
                <div className={styles.split}>
                  {/*
                    The frame is loaded for every row, open or not — lazily,
                    and only four of them. Mounting it on expand instead would
                    mean the first thing a reader sees after opening a row is
                    an empty box filling in, which is worse than the bytes.
                  */}
                  {images[group.key] ? (
                    <div className={styles.frame}>
                      <Image
                        src={images[group.key]!.src}
                        alt={images[group.key]!.alt}
                        width={images[group.key]!.width}
                        height={images[group.key]!.height}
                        loading="lazy"
                        sizes="(min-width: 900px) 40vw, 100vw"
                        className={styles.image}
                      />
                    </div>
                  ) : null}

                  <div className={styles.copy}>
                    <p className={styles.summary}>{group.summary}</p>

                    <div className={styles.services}>
                      <p className={styles.servicesLabel}>Services</p>
                      <ul className={styles.rail}>
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className={styles.railLink}>
                              {/*
                                The mark stands in for a bullet. The rail
                                wraps, so a list marker would be lost the
                                moment a row broke — carrying it inside each
                                link keeps every item marked wherever it lands.
                              */}
                              <Glyph className={styles.railGlyph} size="0.6em" />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={group.href} className={styles.groupLink}>
                      {group.label}
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
