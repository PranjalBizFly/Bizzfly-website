"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Cascade } from "@/components/motion";
import { anchorId } from "@/lib/slug";
import styles from "./Directory.module.css";
import { titleCase } from "@/lib/titleCase";

export interface DirectoryGroup {
  heading: string;
  headingHref?: string;
  /**
   * Anchor target, so the mega menu and the hub's own context navigation can
   * link to a group rather than only to the top of the page. Defaults to the
   * heading; set it explicitly when the heading carries a count, which would
   * otherwise bake "-24" into the URL and break it on the next publish.
   */
  id?: string;
  items: { label: string; href: string; note?: string }[];
}

interface DirectoryProps {
  groups: DirectoryGroup[];
  /** Adds a numeric index before each group heading. */
  numbered?: boolean;
  /**
   * Adds a live filter above the directory. Worth it past about forty
   * entries, where scanning stops being faster than typing.
   */
  filter?: {
    /** The thing being filtered, plural and lower case: "resources". */
    noun: string;
  };
  className?: string;
}

/**
 * S-19 Directory — the complete set, densely.
 *
 * Every hub on this site has to list everything it owns, because a page that
 * is not linked from its own index is an orphan no matter how good it is.
 * The editorial list used for that does not survive the content volume: at
 * 26 industries it measured 7,848px in one section, and at 146 resources the
 * resources page reached 34,354px. Nobody scrolls that; the completeness
 * stops being a service to the reader and becomes a wall.
 *
 * So the pattern splits. An editorial list carries a small chosen set with
 * room to explain each one, and this carries the rest — grouped, in columns,
 * one line per entry. Same links, roughly a fifth of the height, and it
 * reads as a directory rather than as an argument that ran on too long.
 *
 * Past a certain size even that is a wall — 145 resources is 4,400px of index
 * — so a directory can take a filter. It narrows what is DISPLAYED and never
 * what exists: every entry stays in the DOM, hidden with the `hidden`
 * attribute, so the page a crawler or a reader without JavaScript receives is
 * the complete set exactly as before.
 *
 * Deliberately not a card: no border box, no padding, no shadow. The group
 * heading and the column rule do the structural work.
 *
 * The groups arrive in sequence rather than all at once — one observer on
 * the container, delays by position — which is the same arrival the homepage
 * gives its card walls. It is deliberately the group that cascades and not
 * the individual line: a directory of 146 resources animating row by row
 * would be motion for its own sake, and slow.
 */
export function Directory({
  groups,
  numbered = false,
  filter,
  className = "",
}: DirectoryProps) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const total = useMemo(
    () => groups.reduce((count, group) => count + group.items.length, 0),
    [groups],
  );

  const needle = query.trim().toLowerCase();

  /*
   * Matching is a plain substring over the label, its note and the group it
   * sits in — the group matters because "checklists" is how someone looks for
   * an entry whose own title never says the word.
   */
  const matches = (
    item: DirectoryGroup["items"][number],
    groupHeading: string,
  ) =>
    !needle ||
    item.label.toLowerCase().includes(needle) ||
    (item.note?.toLowerCase().includes(needle) ?? false) ||
    groupHeading.toLowerCase().includes(needle);

  const shown = needle
    ? groups.reduce(
        (count, group) =>
          count + group.items.filter((item) => matches(item, group.heading)).length,
        0,
      )
    : total;

  return (
    <div className={styles.wrapper}>
      {filter ? (
        <div className={styles.controls}>
          <label className={styles.controlLabel} htmlFor={inputId}>
            Filter {filter.noun}
          </label>
          <div className={styles.field}>
            <input
              id={inputId}
              type="search"
              className={styles.input}
              value={query}
              placeholder={`Type to narrow ${total} ${filter.noun}`}
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
            />
            {query ? (
              <button
                type="button"
                className={styles.clear}
                onClick={() => setQuery("")}
              >
                Clear
              </button>
            ) : null}
          </div>

          {/* Announced, so a screen reader hears the set change as it types. */}
          <p className={styles.count} role="status">
            {needle
              ? `${shown} of ${total} ${filter.noun}`
              : `${total} ${filter.noun}`}
          </p>
        </div>
      ) : null}

      <Cascade className={`${styles.directory} ${className}`.trim()}>
        {groups.map((group, index) => {
          const visible = group.items.filter((item) => matches(item, group.heading));
          return (
            <section
              key={group.heading}
              id={group.id ?? anchorId(group.heading)}
              className={styles.group}
              hidden={visible.length === 0}
            >
              <h3 className={styles.heading}>
                {numbered ? (
                  <span className={styles.index} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ) : null}
                {group.headingHref ? (
                  <Link href={group.headingHref} className={styles.headingLink}>
                    {titleCase(group.heading)}
                  </Link>
                ) : (
                  titleCase(group.heading)
                )}
              </h3>

              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li
                    key={item.href}
                    className={styles.item}
                    hidden={!matches(item, group.heading)}
                  >
                    <Link href={item.href} className={styles.link}>
                      {titleCase(item.label)}
                    </Link>
                    {item.note ? <span className={styles.note}>{item.note}</span> : null}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </Cascade>

      {filter && needle && shown === 0 ? (
        <p className={styles.empty}>
          Nothing here matches &ldquo;{query}&rdquo;.{" "}
          <button type="button" className={styles.clear} onClick={() => setQuery("")}>
            Show all {total} {filter.noun}
          </button>
        </p>
      ) : null}
    </div>
  );
}
