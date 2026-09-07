"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { visibilityLayers } from "@/content/homepage";
import styles from "./VisibilitySpectrum.module.css";

/**
 * Section 03 — the discoverability spectrum.
 *
 * An interactive relationship between SEO, AEO, GEO, AIO and SXO. Each layer
 * describes a genuinely different retrieval mechanism, which is the honest
 * reason they are five disciplines rather than five names for one thing.
 *
 * Every panel is rendered in the DOM regardless of selection, so the content
 * is complete for crawlers and for a visitor with JavaScript disabled.
 */
export function VisibilitySpectrum() {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.rail}
        role="tablist"
        aria-label="Search and AI visibility layers"
      >
        {visibilityLayers.map((layer, index) => {
          const selected = index === active;
          return (
            <button
              key={layer.code}
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
                  const next = (index + 1) % visibilityLayers.length;
                  setActive(next);
                  document.getElementById(`${baseId}-tab-${next}`)?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const prev =
                    (index - 1 + visibilityLayers.length) % visibilityLayers.length;
                  setActive(prev);
                  document.getElementById(`${baseId}-tab-${prev}`)?.focus();
                }
              }}
            >
              <span className={styles.tabCode}>{layer.code}</span>
              <span className={styles.tabSurface}>{layer.surface}</span>
            </button>
          );
        })}
      </div>

      {visibilityLayers.map((layer, index) => (
        <div
          key={layer.code}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          className={styles.panel}
          hidden={index !== active}
        >
          <p className={styles.panelQuestion}>{layer.question}</p>
          <h3 className={styles.panelName}>{layer.name}</h3>
          <p className={styles.panelDescription}>{layer.description}</p>

          <dl className={styles.mechanism}>
            <dt className={styles.mechanismLabel}>How it is won</dt>
            <dd className={styles.mechanismValue}>{layer.mechanism}</dd>
          </dl>

          <Link href={layer.href} className={styles.panelLink}>
            {layer.name}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
