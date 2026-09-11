"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Cascade } from "@/components/motion";
import styles from "./StickyIndex.module.css";
import { titleCase } from "@/lib/titleCase";

export interface StickyIndexLink {
  label: string;
  href: string;
}

export interface StickyIndexItem {
  title: string;
  href: string;
  description: string;
  /** Optional provenance row, e.g. "Applied in — Corporate Websites, UI/UX". */
  metaLabel?: string;
  metaLinks?: StickyIndexLink[];
}

export interface StickyIndexGroup {
  id: string;
  label: string;
  /** One line on what the group is for. Sits under the label in the rail. */
  role: string;
  items: StickyIndexItem[];
}

interface StickyIndexProps {
  groups: StickyIndexGroup[];
  /** Names the rail for assistive technology, e.g. "Jump to a capability". */
  label: string;
  className?: string;
}

/**
 * S-24 Sticky Index — a grouped set read as a rail plus a column.
 *
 * WHY THIS EXISTS.
 *
 * The hub pages that list a taxonomy were rendering it as a three-column
 * grid: group label in column one, items flowing through two and three. That
 * layout is governed by its largest group and paid for by its smallest. On
 * the technologies hub the "AI" group holds a single entry, so the row it
 * sits in ran two thirds empty — roughly 400px of nothing beside one card —
 * and the same shape repeated down the page for every short group. The
 * reader met a wall of uniform grey text with no way to see the structure
 * they were being promised, and the page said "organised by what it enables"
 * while showing no organisation at all.
 *
 * Splitting it into a sticky rail and a single content column fixes both
 * ends. The rail cannot run empty because it is pinned and always carries
 * the full set of groups; the content column cannot run ragged because it is
 * one column, so a group of one and a group of four are equally well shaped.
 *
 * WHY SCROLL-SPY RATHER THAN A STATIC LIST.
 *
 * The rail is the reader's position as well as their index. Marking the
 * group currently under the reader turns a jump list into a sense of where
 * the page is, which is the thing a long taxonomy page normally denies. The
 * observer only flips a string in state — the highlight itself is CSS — and
 * it is one observer for the whole page rather than one per group.
 *
 * TOUCH.
 *
 * Below 1024px there is no room for a rail beside the content and no hover
 * to lean on, so it becomes a horizontally scrollable row of chips pinned
 * under the header. Same links, same active state, reachable with a thumb.
 * Nothing here depends on hover at any width: the active state is driven by
 * scroll position and every target is a real link.
 */
export function StickyIndex({ groups, label, className = "" }: StickyIndexProps) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const railRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = groups
      .map((group) => document.getElementById(group.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) return;

    /*
     * `rootMargin` pulls the observation band up to a strip just under the
     * sticky header. Without it the topmost *intersecting* section wins even
     * when it is a sliver leaving the screen, and the rail lags a full group
     * behind the reader. With it, "active" means "crossing the reading line",
     * which is what a reader would say if asked where they are.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [groups]);

  /*
   * Keep the active chip in view on the mobile rail.
   *
   * This sets `scrollLeft` on the rail rather than calling `scrollIntoView`
   * on the chip, and the difference is not stylistic. `scrollIntoView`
   * scrolls EVERY scrollable ancestor until the element is visible, the
   * document included — so on a 390px viewport, marking a chip that sat off
   * the right edge of the strip scrolled the whole page sideways and left
   * every line of body text clipped. Moving the one container that should
   * move cannot do that.
   *
   * Above 1024px the rail is a static column with nothing to scroll, so the
   * overflow check below also serves as the "not on desktop" test.
   */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (rail.scrollWidth <= rail.clientWidth) return;

    const chip = rail.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!chip) return;

    /* Centre the chip in the strip where there is room to; clamp at the ends. */
    const target = chip.offsetLeft - (rail.clientWidth - chip.offsetWidth) / 2;
    const left = Math.max(0, Math.min(target, rail.scrollWidth - rail.clientWidth));

    if (typeof rail.scrollTo === "function") {
      rail.scrollTo({ left, behavior: "smooth" });
    } else {
      rail.scrollLeft = left;
    }
  }, [active]);

  if (groups.length === 0) return null;

  return (
    <div className={`${styles.wrap} ${className}`.trim()}>
      <nav className={styles.rail} aria-label={label}>
        <p className={styles.railLabel}>{label}</p>
        <ul className={styles.railList} ref={railRef}>
          {groups.map((group, index) => {
            const current = group.id === active;
            return (
              <li key={group.id}>
                <Link
                  href={`#${group.id}`}
                  data-chip={group.id}
                  data-current={current ? "true" : undefined}
                  aria-current={current ? "true" : undefined}
                  className={styles.railLink}
                >
                  <span className={styles.railIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/*
                    Label and count only. The group's role line lives in the
                    column header, and expanding it here as well put the same
                    sentence on screen twice whenever the rail's active group
                    was the one being read — which is every time.
                  */}
                  <span className={styles.railName}>{group.label}</span>
                  <span className={styles.railCount} aria-hidden="true">
                    {group.items.length}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.column}>
        {groups.map((group, index) => (
          <section key={group.id} id={group.id} className={styles.group}>
            <header className={styles.groupHead}>
              <span className={styles.groupIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.groupLabel}>{titleCase(group.label)}</h3>
              <p className={styles.groupRole}>{group.role}</p>
            </header>

            <Cascade as="ul" className={styles.items}>
              {group.items.map((item) => (
                <li key={item.href} className={styles.item}>
                  <h4 className={styles.itemTitle}>
                    {/*
                      The link covers the card through a stretched pseudo
                      element, so the whole row is a target on a phone while
                      the accessible name stays the title alone.
                    */}
                    <Link href={item.href} className={styles.itemLink}>
                      {titleCase(item.title)}
                    </Link>
                  </h4>
                  <p className={styles.itemDescription}>{item.description}</p>

                  {item.metaLinks?.length ? (
                    <p className={styles.itemMeta}>
                      {item.metaLabel ? (
                        <span className={styles.itemMetaLabel}>{item.metaLabel}</span>
                      ) : null}
                      {item.metaLinks.map((link, linkIndex) => (
                        <span key={link.href}>
                          <Link href={link.href} className={styles.itemMetaLink}>
                            {link.label}
                          </Link>
                          {linkIndex < item.metaLinks!.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  ) : null}
                </li>
              ))}
            </Cascade>
          </section>
        ))}
      </div>
    </div>
  );
}
