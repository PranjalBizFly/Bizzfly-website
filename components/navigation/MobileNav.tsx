"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import type { PrimaryNavItem } from "@/types/content";
import { Button } from "@/components/buttons";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Chevron } from "./Chevron";
import { HomeIcon, SearchIcon } from "./NavIcons";
import styles from "./MobileNav.module.css";
import { titleCase } from "@/lib/titleCase";

interface MobileNavProps {
  nav: PrimaryNavItem[];
  cta: { label: string; href: string };
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

/**
 * Accordion navigation, presented as a card over a scrim.
 *
 * One level of nesting, expanded in place. A drill-down stack hid the rest
 * of the menu behind every tap; accordions keep the whole structure on
 * screen, which is what makes a seven-item menu scannable on a phone.
 *
 * Only one section is open at a time — with six expandable sections, several
 * open at once turns the drawer into a very long scroll.
 *
 * The drawer is a CARD, not a full-bleed sheet. Collapsed, the menu is around
 * 500px of content; painting it across a 900px viewport left the bottom third
 * as empty background below the last row, which read as a page that had failed
 * to load rather than as a menu. Sized to its content and inset from the
 * edges, it stays a menu: the page shows around it, so the drawer reads as
 * something laid OVER the page — and a tap on that margin dismisses it.
 */
export function MobileNav({ nav, cta, open, onClose, onOpenSearch }: MobileNavProps) {
  /*
   * Home is the first entry in primaryNav, and the drawer now offers it twice
   * over — as a quick action and as the logo in the bar above. Three routes to
   * the same page is not three times as useful, and the row was the one item
   * in the list that named a page rather than a section of the site.
   */
  const sections = nav.filter((item) => item.href !== "/");

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
        Dismiss on a tap outside the card. Deliberately a div and not a
        button: a focusable scrim would be the first stop in the focus trap
        and would announce as an unlabelled control. Escape and the close
        button are the keyboard routes out, which is what a dialog owes.
      */}
      <div className={styles.scrim} onClick={onClose} aria-hidden="true" />

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
          aria-label="BizzFly, home"
        >
          <BrandLogo alt="" clearspace={false} />
        </Link>

        <div className={styles.topActions}>
          {/* The header hides its toggle below md, so this is the only way to
              change theme on a phone. It must not be omitted. It sits in the
              bar rather than in the card because that is where a theme
              control sits on every other viewport, and because it is what
              lets the card's footer be a single row. */}
          <ThemeToggle />
          <button
            type="button"
            className={styles.iconButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            <span aria-hidden="true">&#10005;</span>
          </button>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.scroll}>
          <p className={styles.eyebrow}>Navigation</p>

          {/*
            The two destinations that are not sections of the site, paired as
            a utility row. Search used to be a full-width row on the same
            divider rhythm as Services and Company, so it read as another
            section of the site rather than as a tool.
          */}
          <div className={styles.quickRow}>
            <button
              type="button"
              className={styles.quickButton}
              onClick={onOpenSearch}
            >
              <SearchIcon className={styles.quickIcon} />
              Search
            </button>
            <Link href="/" className={styles.quickButton} onClick={onClose}>
              <HomeIcon className={styles.quickIcon} />
              Home
            </Link>
          </div>

          <ul className={styles.list}>
            {sections.map((item, index) => {
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
                      {titleCase(item.label)}
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
                    {titleCase(item.label)}
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

                      {/*
                        The same categories the desktop panel carries, and only
                        those. The drawer used to lead with the panel's `primary`
                        shortlist above them, which on Services and Company
                        listed the very entries the first category then repeated.
                      */}
                      {item.panel.columns.map((column) => (
                        <div key={column.heading} className={styles.subGroup}>
                          <p className={styles.subHeading}>
                            {column.headingHref ? (
                              <Link
                                href={column.headingHref}
                                className={styles.subHeadingLink}
                                onClick={onClose}
                              >
                                {titleCase(column.heading)}
                              </Link>
                            ) : (
                              column.heading
                            )}
                          </p>

                          <ul className={styles.subList}>
                            {column.items.map((entry) => (
                              <li key={entry.href}>
                                <Link
                                  href={entry.href}
                                  className={styles.subLink}
                                  onClick={onClose}
                                >
                                  {titleCase(entry.label)}
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
                                  {titleCase(column.viewAll.label)}
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
                        {titleCase(item.panel.footerLink.label)}
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

        {/*
          Pinned inside the card, so the CTA is on screen whatever the list
          above it is doing. Contact and the CTA share one row: they were
          three stacked blocks — CTA, theme toggle, contact line — which on a
          360px phone cost 150px of footer under a menu already short of room.
        */}
        <div className={styles.footer}>
          <p className={styles.contact}>
            <a href={site.contact.phoneHref}>{site.contact.phone}</a>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
          <Button
            href={cta.href}
            size="sm"
            withArrow
            className={styles.footerCta}
          >
            {titleCase(cta.label)}
          </Button>
        </div>
      </div>
    </div>
  );
}
