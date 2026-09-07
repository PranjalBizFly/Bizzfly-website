"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { MegaMenuPanel, NavigationFeature } from "@/types/content";
import { Container } from "@/components/layout/Container";
import styles from "./Header.module.css";

interface MegaMenuProps {
  id: string;
  label: string;
  panel: MegaMenuPanel;
  onClose: () => void;
}

function Feature({ feature }: { feature: NavigationFeature }) {
  return (
    <Link href={feature.href} className={styles.feature}>
      <span className={styles.featureKind}>{feature.kind}</span>
      <span className={styles.featureTitle}>{feature.title}</span>
      <span className={styles.featureDescription}>{feature.description}</span>
      <span className={styles.featureCta}>
        {feature.ctaLabel}
        <span aria-hidden="true">&rarr;</span>
      </span>
    </Link>
  );
}

export function MegaMenu({ id, label, panel, onClose }: MegaMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  /* Focus leaving the panel closes it — keyboard parity with mouse-out. */
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && !node.contains(next) && !node.parentElement?.contains(next)) {
        onClose();
      }
    };

    node.addEventListener("focusout", onFocusOut);
    return () => node.removeEventListener("focusout", onFocusOut);
  }, [onClose]);

  /*
    Arrow keys move within the panel, Home/End jump to the ends.
    Tab still works normally, so the menu never traps a keyboard user —
    it just makes a long list faster to move through.
  */
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;

    const node = ref.current;
    if (!node) return;

    const items = Array.from(
      node.querySelectorAll<HTMLAnchorElement>("a[href]"),
    ).filter((el) => el.offsetParent !== null);
    if (items.length === 0) return;

    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    event.preventDefault();

    let next = current;
    if (event.key === "ArrowDown") next = current < 0 ? 0 : (current + 1) % items.length;
    if (event.key === "ArrowUp")
      next = current < 0 ? items.length - 1 : (current - 1 + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;

    items[next]?.focus();
  };

  return (
    <div id={id} ref={ref} className={styles.panel} onKeyDown={onKeyDown}>
      <Container>
        {/*
          The column count drives the grid. A panel with three groups and no
          feature card (Services) lays them out as four editorial columns;
          everything else keeps the three-region layout with the groups
          stacked beside a feature.
        */}
        <nav
          className={styles.panelGrid}
          data-columns={panel.columns?.length ?? 0}
          data-feature={panel.feature ? "true" : "false"}
          aria-label={`${label} menu`}
        >
          <ul className={styles.primaryList}>
            {panel.primary.map((item) => (
              <li key={item.href} className={styles.primaryItem}>
                <Link href={item.href} className={styles.primaryLink}>
                  {item.index ? (
                    <span className={styles.primaryIndex}>{item.index}</span>
                  ) : (
                    <span />
                  )}
                  <span>
                    <span className={styles.primaryTitle}>{item.label}</span>
                    {item.description ? (
                      <span className={styles.primaryDescription}>
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                  <span className={styles.primaryArrow} aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {panel.columns?.length ? (
            <div className={styles.columns}>
              {panel.columns.map((column) => (
                <div key={column.heading} className={styles.column}>
                  {/* A heading that is not clickable reads as a dead label. */}
                  <p className={styles.columnHeading}>
                    {column.headingHref ? (
                      <Link href={column.headingHref}>{column.heading}</Link>
                    ) : (
                      column.heading
                    )}
                  </p>
                  <ul className={styles.linkList}>
                    {column.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={styles.plainLink}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}

          {panel.feature || panel.secondaryFeature ? (
            <div>
              {panel.feature ? <Feature feature={panel.feature} /> : null}
              {panel.secondaryFeature ? (
                <Feature feature={panel.secondaryFeature} />
              ) : null}
            </div>
          ) : null}
        </nav>

        <div className={styles.panelFooter}>
          <Link href={panel.footerLink.href} className={styles.featureCta}>
            {panel.footerLink.label}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
