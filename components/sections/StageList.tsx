"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { businessStages } from "@/content/homepage";
import type { ImageMetadata } from "@/content/images/types";
import { StaggerItem } from "@/components/motion";
import styles from "./StageList.module.css";

interface StageListProps {
  /** One frame per stage, keyed by BusinessStage.stage. */
  images: Record<string, ImageMetadata>;
}

/**
 * Section 09 — by business situation, not by package.
 *
 * No pricing, no tiers, no "most popular" badge — these are situations, and a
 * business moves between them rather than buying one.
 *
 * Each stage is a two-state card: a square photograph at rest, and the stage's
 * own detail in the SAME space while the pointer is on it. Nothing is clicked,
 * nothing expands, nothing opens.
 *
 * THE HOVER IS CSS, NOT STATE. `.stack:hover` drives the swap in the
 * stylesheet, so it responds on the frame the pointer arrives, works before
 * this component has hydrated, and costs no render. React holds one thing
 * only: which card a TOUCH user has tapped, because a finger cannot hover.
 * That flag is read exclusively inside `@media (hover: none)`, so on a mouse
 * it can never latch a card open — the pointer alone decides.
 *
 * NO LAYOUT JUMP, BY CONSTRUCTION. Both faces occupy the same grid cell
 * (`grid-area: 1/1`) and both stay in the layout at all times; only their
 * visibility changes. The cell is therefore always as tall as the taller
 * face, whichever face is showing, so the swap cannot move anything — which
 * matters far more on hover than it did on click, since a card that resized
 * under the pointer would move itself out from under it and flicker.
 *
 * `visibility` rather than `inert` does the hiding. Hover lives in CSS and
 * cannot set an attribute, and visibility already takes the hidden face out
 * of both the focus order and the accessibility tree — so the two faces can
 * never both be reachable, without JavaScript having to know anything.
 *
 * KEYBOARD. The card itself is the tab stop, and `:focus-within` reveals the
 * same content as `:hover`. Tabbing in shows the detail, tabbing on through
 * the service links keeps it shown, tabbing out returns the photograph. There
 * is no control to press because there is nothing to press on a mouse either.
 */
export function StageList({ images }: StageListProps) {
  /** Touch only. On a pointer that can hover this is never read. */
  const [tapped, setTapped] = useState<string | null>(null);

  return (
    <ol className={styles.list}>
      {businessStages.map((stage, index) => {
        const image = images[stage.stage];

        const toggleOnTouch = () => {
          if (window.matchMedia("(hover: hover)").matches) return;
          setTapped((current) => (current === stage.stage ? null : stage.stage));
        };

        return (
          <StaggerItem
            as="li"
            key={stage.stage}
            index={index}
            className={styles.item}
          >
            <div
              className={styles.stack}
              data-open={tapped === stage.stage}
              role="group"
              aria-label={stage.stage}
              tabIndex={0}
              onClick={toggleOnTouch}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                if (event.target !== event.currentTarget) return;
                event.preventDefault();
                toggleOnTouch();
              }}
            >
              {/* --- The image face ------------------------------------- */}
              <div className={styles.imageFace}>
                {image ? (
                  <span className={styles.imageFrame}>
                    <Image
                      src={image.src}
                      alt=""
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 88vw"
                      className={styles.image}
                    />
                  </span>
                ) : null}

                <span className={styles.imageLabel}>
                  <span className={styles.imageIndex}>{stage.index}</span>
                  <span className={styles.imageStage}>{stage.stage}</span>
                </span>
              </div>

              {/* --- The content face ----------------------------------- */}
              <div className={styles.contentFace}>
                <div className={styles.head}>
                  <span className={styles.index}>{stage.index}</span>
                  <h3 className={styles.stage}>{stage.stage}</h3>
                  <p className={styles.situation}>{stage.situation}</p>
                </div>

                <p className={styles.focus}>{stage.focus}</p>

                <ul className={styles.work}>
                  {stage.work.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={styles.workLink}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </ol>
  );
}
