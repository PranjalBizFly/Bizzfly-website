"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./LayerTabs.module.css";

export interface LayerFact {
  label: string;
  value: string;
}

export interface LayerTabItem {
  /** Rail heading. Short — a code, a stage number, a model name. */
  code: string;
  /** Rail sub-label. One or two words. */
  surface: string;
  /** Panel heading. */
  name: string;
  /** Small kicker above the heading. Usually the question the item answers. */
  question?: string;
  description: string;
  /** Shown in the raised box beside the prose. */
  facts?: LayerFact[];
  href?: string;
  linkLabel?: string;
}

interface LayerTabsProps {
  items: LayerTabItem[];
  /** Names the rail for assistive technology. */
  label: string;
}

/**
 * The rail-and-panel comparison.
 *
 * A horizontal rail of options above one panel, with arrow-key roving focus
 * and the selected tab marked by a rule that wipes in from the left. It is
 * the interaction the homepage already uses for the visibility layers; this
 * is that component with its content lifted out, so a subpage comparing
 * engagement models or the layers discovery examines gets the same
 * behaviour rather than a second pattern invented for it.
 *
 * Every panel is rendered in the DOM regardless of selection, so the content
 * is complete for crawlers and for a visitor with JavaScript disabled — the
 * panels are hidden with the `hidden` attribute, not unmounted.
 */
export function LayerTabs({ items, label }: LayerTabsProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  const move = (from: number, delta: number) => {
    const next = (from + delta + items.length) % items.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div
      className={styles.wrapper}
      style={{ "--rail-count": items.length } as CSSProperties}
    >
      <div className={styles.rail} role="tablist" aria-label={label}>
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.code}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              data-selected={selected}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  move(index, 1);
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  move(index, -1);
                }
              }}
            >
              <span className={styles.tabCode}>{item.code}</span>
              <span className={styles.tabSurface}>{item.surface}</span>
            </button>
          );
        })}
      </div>

      {items.map((item, index) => (
        <div
          key={item.code}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          className={styles.panel}
          hidden={index !== active}
        >
          {item.question ? (
            <p className={styles.panelQuestion}>{item.question}</p>
          ) : null}
          <h3 className={styles.panelName}>{item.name}</h3>
          <p className={styles.panelDescription}>{item.description}</p>

          {item.facts?.length ? (
            <dl className={styles.fact}>
              {item.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className={styles.factLabel}>{fact.label}</dt>
                  <dd className={styles.factValue}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {item.href ? (
            <Link href={item.href} className={styles.panelLink}>
              {item.linkLabel ?? item.name}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : null}
        </div>
      ))}
    </div>
  );
}
