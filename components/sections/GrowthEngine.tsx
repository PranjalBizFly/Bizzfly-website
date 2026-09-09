"use client";

import Link from "next/link";
import { useState } from "react";
import { growthStages } from "@/content/homepage-narrative";
import { useReveal } from "@/components/motion";
import type { ImageMetadata } from "@/content/images/types";
import { MediaGround } from "./MediaGround";
import styles from "./GrowthEngine.module.css";

/**
 * The BizzFly Growth Engine — four stages, in the order they have to be
 * solved.
 *
 * The page already argues this in prose ("Visibility with nothing behind it
 * wastes budget. A good website nobody finds wastes more."). This is that
 * argument drawn, which is the one place on the homepage where a diagram
 * earns its place: the claim IS a sequence, and a sequence is faster to read
 * as one.
 *
 * Drawn in CSS rather than with a charting library. The whole thing is a grid
 * with a rule running through it — a library would ship kilobytes to produce
 * four boxes and a line, and would not inherit the theme.
 *
 * Every stage renders its full content at all times, so the section is
 * complete for crawlers and without JavaScript. Activation changes emphasis
 * only: the current stage lifts to full contrast and the others recede. That
 * is an opacity hierarchy, not a disclosure — nothing is hidden behind an
 * interaction.
 */
export function GrowthEngine({ image }: { image: ImageMetadata }) {
  const [active, setActive] = useState(0);
  const ref = useReveal<HTMLOListElement>();

  /*
   * `deep` rather than the standard scrim: the stages set body-size text over
   * the frame, not just a headline, and the lighter wash does not hold it.
   */
  return (
    <MediaGround image={image} id="growth-engine" weight="deep">
      <header className={styles.header}>
        <p className={styles.eyebrow}>08 / The BizzFly growth engine</p>
        <h2 className={styles.title}>
          Four stages, and the order they have to be fixed in
        </h2>
        <p className={styles.lead}>
          Each depends on the one before it. Work on a later stage sits idle
          until the earlier one holds.
        </p>
      </header>

      <ol className={styles.track} ref={ref}>
      {growthStages.map((stage, index) => {
        const isActive = index === active;
        return (
          <li
            key={stage.key}
            className={styles.stage}
            data-active={isActive}
            style={{ "--stage-index": index } as React.CSSProperties}
          >
            {/*
              A button wraps the head so the stage is operable by keyboard and
              announced as pressed. The links inside the stage stay separately
              reachable — this control changes emphasis, it does not navigate.
            */}
            <button
              type="button"
              className={styles.head}
              aria-pressed={isActive}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className={styles.node} aria-hidden="true" />
              <span className={styles.index}>{stage.index}</span>
              <span className={styles.name}>{stage.name}</span>
            </button>

            <p className={styles.outcome}>{stage.outcome}</p>

            <ul className={styles.disciplines}>
              {stage.disciplines.map((discipline) => (
                <li key={discipline} className={styles.discipline}>
                  {discipline}
                </li>
              ))}
            </ul>

            <p className={styles.constraint}>{stage.constraint}</p>

            <ul className={styles.items}>
              {stage.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.itemLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
      </ol>

      <p className={styles.footer}>
        <Link href="/use-cases/" className={styles.footerLink}>
          Start from the problem you have
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </p>
    </MediaGround>
  );
}
