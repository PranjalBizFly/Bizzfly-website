"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import type { PrimaryNavItem } from "@/types/content";
import { Button } from "@/components/buttons";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Chevron } from "./Chevron";
import styles from "./MobileNav.module.css";

interface MobileNavProps {
  nav: PrimaryNavItem[];
  cta: { label: string; href: string };
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

/**
 * Accordion navigation.
 *
 * One level of nesting, expanded in place. A drill-down stack hid the rest
 * of the menu behind every tap; accordions keep the whole structure on
 * screen, which is what makes a seven-item menu scannable on a phone.
 *
 * Only one section is open at a time — with six expandable sections, several
 * open at once turns the drawer into a very long scroll.
 */
export function MobileNav({ nav, cta, open, onClose, onOpenSearch }: MobileNavProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      setExpanded(null);
    }
  }, [open]);

  /* Lock body scroll, trap focus, restore focus on close. */
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const node = overlayRef.current;
    const focusables = () =>
      node
        ? Array.from(
            node.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((el) => el.offsetParent !== null)
        : [];

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      (triggerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      id="mobile-nav"
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      {/*
        This strip is the same bar the header shows, down to the token it
        draws its surface from, so the drawer opens on a continuation of the
        header rather than a differently coloured slab.
      */}
      <div className={styles.top}>
        <Link
          href="/"
          className={styles.brand}
          onClick={onClose}
          aria-label="BizzFly — home"
        >
          <BrandLogo alt="" clearspace={false} />
        </Link>
        <button
          type="button"
          className={styles.iconButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          <span aria-hidden="true">&#10005;</span>
        </button>
      </div>

      <div className={styles.scroll}>
        <div className={styles.utility}>
          <button
            type="button"
            className={styles.utilityButton}
            onClick={onOpenSearch}
          >
            Search
            <span className={styles.chevron} aria-hidden="true">
              &#9906;
            </span>
          </button>
        </div>

        <ul className={styles.list}>
          {nav.map((item, index) => {
            const panelId = `mobile-panel-${index}`;
            const isOpen = expanded === index;

            if (!item.panel) {
              return (
                <li key={item.label} className={styles.row}>
                  <Link
                    href={item.href}
                    className={styles.rowLink}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.label} className={styles.row}>
                <button
                  type="button"
                  className={styles.rowLink}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setExpanded(isOpen ? null : index)}
                >
                  {item.label}
                  {/*
                    The same down/up chevron the header bar uses, driven by
                    the same React state. It replaces a plus/minus drawn from
                    two pseudo-element bars: a plus reads as "add", and it
                    gave the drawer a different disclosure language from the
                    bar directly above it.
                  */}
                  <Chevron open={isOpen} className={styles.accordionIcon} />
                </button>

                {/*
                  Kept in the DOM and collapsed with grid-template-rows, which
                  animates without measuring anything. The collapsed state
                  uses visibility: hidden rather than the hidden attribute:
                  both take the contents out of the tab order and the
                  accessibility tree, but display: none would cancel the
                  transition on the way closed.
                */}
                <div
                  id={panelId}
                  className={styles.accordionPanel}
                  data-open={isOpen}
                >
                  <div className={styles.accordionInner}>
                    {item.panel.lead ? (
                      <p className={styles.subLead}>{item.panel.lead}</p>
                    ) : null}

                    {item.panel.primaryHeading ? (
                      <p className={styles.subHeading}>
                        {item.panel.primaryHeading}
                      </p>
                    ) : null}

                    <ul className={styles.subList}>
                      {item.panel.primary.map((entry) => (
                        <li key={entry.href}>
                          <Link
                            href={entry.href}
                            className={styles.subLink}
                            onClick={onClose}
                          >
                            {entry.label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/*
                      The drawer carries the same categories the desktop panel
                      does. Without them a phone visitor got six entries out of
                      twenty-six and no way to see the rest except the hub —
                      which is a different, worse menu on the smaller screen.
                    */}
                    {item.panel.columns?.map((column) => (
                      <div key={column.heading} className={styles.subGroup}>
                        <p className={styles.subHeading}>
                          {column.headingHref ? (
                            <Link
                              href={column.headingHref}
                              className={styles.subHeadingLink}
                              onClick={onClose}
                            >
                              {column.heading}
                            </Link>
                          ) : (
                            column.heading
                          )}
                          {column.meta ? (
                            <span className={styles.subMeta}>{column.meta}</span>
                          ) : null}
                        </p>

                        <ul className={styles.subList}>
                          {column.items.map((entry) => (
                            <li key={entry.href}>
                              <Link
                                href={entry.href}
                                className={styles.subLink}
                                onClick={onClose}
                              >
                                {entry.label}
                              </Link>
                            </li>
                          ))}
                          {column.viewAll ? (
                            <li>
                              <Link
                                href={column.viewAll.href}
                                className={styles.subViewAll}
                                onClick={onClose}
                              >
                                {column.viewAll.label}
                                <span aria-hidden="true">&rarr;</span>
                              </Link>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    ))}

                    <Link
                      href={item.panel.footerLink.href}
                      className={styles.overviewLink}
                      onClick={onClose}
                    >
                      {item.panel.footerLink.label}
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}

          <li className={styles.row}>
            <Link href="/contact/" className={styles.rowLink} onClick={onClose}>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerActions}>
          <Button href={cta.href} size="lg" withArrow>
            {cta.label}
          </Button>
          {/* The header hides its toggle below md, so this is the only way
              to change theme on a phone. It must not be omitted. Labelled
              here because the row has the width the header bar does not. */}
          <ThemeToggle className={styles.footerToggle} showLabel />
        </div>
        <p className={styles.contact}>
          <a href={site.contact.phoneHref}>{site.contact.phone}</a>
          {" · "}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </p>
      </div>
    </div>
  );
}
