"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { whyPillars } from "@/content/homepage-narrative";
import type { ImageMetadata } from "@/content/images/types";
import { MediaGround } from "./MediaGround";
import styles from "./WhyBizzFly.module.css";

interface WhyBizzFlyProps {
  image: ImageMetadata;
}

/**
 * Why BizzFly — the differentiator section.
 *
 * Composed as a full-bleed photograph with the argument set over it, and the
 * four pillars carried on a translucent panel that sits on the frame. This is
 * the loudest moment on the page and it earns the treatment: it is the only
 * section whose job is "why us rather than anyone else", and the previous
 * version — a rail and a panel on the page ground — read as another content
 * block rather than as a claim.
 *
 * The panel is translucent rather than solid so the photograph stays part of
 * the composition rather than being a border around it. It carries its own
 * backdrop wash on top of the section scrim, because the interactive rail
 * inside it sets 14px text and a single wash tuned for a headline does not
 * hold at that size.
 *
 * Interaction is unchanged: a vertical tablist, arrow keys, activation on
 * hover for pointers, and every panel in the DOM so all four arguments are
 * present for crawlers and without JavaScript.
 */
export function WhyBizzFly({ image }: WhyBizzFlyProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  const move = (next: number) => {
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <MediaGround image={image} id="why" weight="deep">
      <header className={styles.header}>
        <p className={styles.eyebrow}>04 / Why BizzFly</p>
        <h2 className={styles.title}>What actually makes this different</h2>
        <p className={styles.lead}>
          Four claims, each with the mechanism behind it. Two of them are
          things most suppliers structurally cannot offer.
        </p>
      </header>

      <div className={styles.panel}>
        <div
          className={styles.rail}
          role="tablist"
          aria-orientation="vertical"
          aria-label="Why BizzFly"
        >
          {whyPillars.map((pillar, index) => {
            const selected = index === active;
            return (
              <button
                key={pillar.name}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                className={styles.tab}
                data-selected={selected}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                    event.preventDefault();
                    move((index + 1) % whyPillars.length);
                  }
                  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    move((index - 1 + whyPillars.length) % whyPillars.length);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    move(0);
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    move(whyPillars.length - 1);
                  }
                }}
              >
                <span className={styles.tabIndex}>{pillar.index}</span>
                <span className={styles.tabName}>{pillar.name}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.panels}>
          {whyPillars.map((pillar, index) => (
            <div
              key={pillar.name}
              role="tabpanel"
              id={`${baseId}-panel-${index}`}
              aria-labelledby={`${baseId}-tab-${index}`}
              className={styles.detailPanel}
              hidden={index !== active}
            >
              <p className={styles.claim}>{pillar.claim}</p>
              <p className={styles.detail}>{pillar.detail}</p>

              <dl className={styles.mechanism}>
                <dt className={styles.mechanismLabel}>How</dt>
                <dd className={styles.mechanismValue}>{pillar.mechanism}</dd>
              </dl>

              <Link href={pillar.href} className={styles.panelLink}>
                {pillar.linkLabel}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/*
        Kept from the section's previous framing. The pillars link to two
        company pages between them but not to the hub, and dropping this would
        quietly remove an internal link when the composition changed.
      */}
      <p className={styles.footer}>
        <Link href="/company/" className={styles.footerLink}>
          How we operate
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </p>
    </MediaGround>
  );
}
