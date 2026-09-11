"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  search,
  groupResults,
  popularSearches,
  searchCategories,
  pageDirectory,
  filterDirectory,
  totalPageCount,
  SECTION_HUB,
} from "@/lib/search";
import { Chevron } from "@/components/navigation/Chevron";
import styles from "./SearchResults.module.css";
import { titleCase } from "@/lib/titleCase";

/**
 * Full-page search, and the site's page directory.
 *
 * Two states of one page rather than two pages. With a query it is the
 * complete result set for that query, sharing the index, ranking and synonym
 * map with the command palette so the two never disagree. With no query it is
 * the directory: every published page, grouped by section, filterable in
 * place. That is the destination "Explore all pages" needs, and building it
 * as a second route would have meant a second list to keep true.
 *
 * Category facets are derived from what is actually in the index — there are
 * no filters that do nothing.
 */
export function SearchResults() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";

  const [query, setQuery] = useState(initial);
  const [debounced, setDebounced] = useState(initial);
  const [category, setCategory] = useState<string | null>(null);
  /*
   * Which sections are folded shut. A set of names rather than a flag per
   * section, so "collapse all" is one assignment and a section that appears
   * or disappears under a filter does not need its own state cleaned up.
   */
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 150);
    return () => clearTimeout(timer);
  }, [query]);

  /* Keep the URL shareable without adding a history entry per keystroke. */
  useEffect(() => {
    const next = debounced.trim();
    const current = params.get("q") ?? "";
    if (next === current) return;
    router.replace(next ? `/search/?q=${encodeURIComponent(next)}` : "/search/", {
      scroll: false,
    });
  }, [debounced, params, router]);

  const allResults = useMemo(() => search(debounced, { limit: 400 }), [debounced]);

  /* Counts come from the unfiltered result set, so a facet never lies. */
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const result of allResults) {
      map.set(result.category, (map.get(result.category) ?? 0) + 1);
    }
    return map;
  }, [allResults]);

  const results = useMemo(
    () => (category ? allResults.filter((r) => r.category === category) : allResults),
    [allResults, category],
  );

  const groups = useMemo(() => groupResults(results), [results]);
  const hasQuery = debounced.trim().length >= 2;

  /*
   * The directory is the whole registry, so it is built once and filtered in
   * memory. Rebuilding 291 entries on every keystroke is work the browser
   * does not need to repeat.
   */
  const directory = useMemo(() => pageDirectory(), []);
  const directoryFiltered = useMemo(
    () => filterDirectory(directory, debounced),
    [directory, debounced],
  );
  const directoryShown = useMemo(
    () =>
      category
        ? directoryFiltered.filter((section) => section.category === category)
        : directoryFiltered,
    [directoryFiltered, category],
  );
  const directoryCount = useMemo(
    () => directoryShown.reduce((sum, section) => sum + section.items.length, 0),
    [directoryShown],
  );

  const availableFacets = searchCategories.filter((c) => (counts.get(c) ?? 0) > 0);
  const directoryFacets = directory.map((section) => section.category);

  /* Counts on the pills come from the filtered set, so a pill never offers
     a section the current filter has already emptied. */
  const directoryTotals = useMemo(
    () => ({
      all: directoryFiltered.reduce((sum, s) => sum + s.items.length, 0),
    }),
    [directoryFiltered],
  );

  const allCollapsed =
    directoryShown.length > 0 &&
    directoryShown.every((section) => collapsed.has(section.category));

  return (
    <div className={styles.wrapper}>
      <label htmlFor="site-search" className="sr-only">
        Search the site
      </label>
      <input
        id="site-search"
        type="search"
        className={styles.input}
        placeholder="Search services, industries, use cases…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        autoComplete="off"
      />

      {hasQuery && availableFacets.length > 1 ? (
        <div className={styles.facets} role="group" aria-label="Filter by section">
          <button
            type="button"
            className={styles.facet}
            data-active={category === null}
            onClick={() => setCategory(null)}
          >
            All <span className={styles.facetCount}>{allResults.length}</span>
          </button>
          {availableFacets.map((name) => (
            <button
              key={name}
              type="button"
              className={styles.facet}
              data-active={category === name}
              onClick={() => setCategory(category === name ? null : name)}
            >
              {name} <span className={styles.facetCount}>{counts.get(name)}</span>
            </button>
          ))}
        </div>
      ) : null}

      {hasQuery ? (
        <p className={styles.count} aria-live="polite">
          {`${results.length} result${results.length === 1 ? "" : "s"} for “${debounced}”${
            category ? ` in ${category}` : ""
          }`}
        </p>
      ) : null}

      {hasQuery && results.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>
            No matches for <strong>{debounced}</strong>.
          </p>

          <p className={styles.emptyHeading}>Popular searches</p>
          <ul className={styles.chips}>
            {popularSearches.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.chip}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className={styles.emptyHeading}>Still stuck?</p>
          <Link href="/contact/" className={styles.chip}>
            Tell us what you are looking for &rarr;
          </Link>
        </div>
      ) : null}

      {groups.map(([groupName, items]) => (
        <section key={groupName} className={styles.group}>
          <h2 className={styles.groupHeading}>
            {titleCase(groupName)}
            <Link
              href={SECTION_HUB[groupName] ?? "/"}
              className={styles.groupHubLink}
            >
              All {groupName}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </h2>
          <ul className={styles.list}>
            {items.map((item, index) => (
              /*
               * The index drives a mount animation, not an observed reveal.
               *
               * These rows re-render on every keystroke, and an
               * IntersectionObserver reveal is the wrong tool for that twice
               * over: useReveal deliberately skips anything already on
               * screen, so it would never fire here — and if it did, it would
               * hide results the reader is part-way through reading.
               *
               * A CSS mount animation keyed by item id gives the right
               * behaviour for free: a newly matched row animates in, a row
               * that was already in the results when the query changed stays
               * exactly where it is. Capped at twelve so a long result set
               * does not keep arriving after the reader has started reading.
               */
              <li
                key={item.id}
                className={styles.item}
                style={{ "--result-index": Math.min(index, 12) } as CSSProperties}
              >
                <Link href={item.href} className={styles.link}>
                  <span className={styles.title}>{item.title}</span>
                  <span className={styles.description}>{item.description}</span>
                  <span className={styles.url}>{item.href}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/*
        The directory. It stays on the page under a query as well — the same
        filter narrows it — because a person who searched and found nothing
        useful is exactly the person who needs to see the whole list, and
        making them clear the box first is a step for no reason.
      */}
      <section className={styles.directory} id="all-pages">
        <div className={styles.directoryHead}>
          <p className={styles.directoryEyebrow}>Every page</p>
          <h2 className={styles.directoryTitle}>
            {hasQuery ? "The Directory, Filtered" : "Explore All Pages"}
          </h2>
          <p className={styles.directoryLead}>
            {hasQuery
              ? `${directoryCount} of ${totalPageCount} pages match “${debounced}” by title, section or topic.`
              : `Every published page, grouped by section. Type above to filter this list, or pick a section below.`}
          </p>
        </div>

        {/*
          The control bar. Count, section pills and one collapse toggle — a
          directory of 299 entries needs a way to see its own shape without
          scrolling through it, and collapsing to headings is that way.
        */}
        <div className={styles.bar}>
          <p className={styles.barCount}>
            <span className={styles.barCountNumber}>{directoryCount}</span> pages
          </p>
          <button
            type="button"
            className={styles.barToggle}
            onClick={() =>
              setCollapsed(
                allCollapsed
                  ? new Set<string>()
                  : new Set(directoryShown.map((s) => s.category)),
              )
            }
          >
            {allCollapsed ? "Expand all" : "Collapse all"}
          </button>
        </div>

        <div className={styles.pills} role="group" aria-label="Filter by section">
          <button
            type="button"
            className={styles.pill}
            data-active={category === null}
            onClick={() => setCategory(null)}
          >
            All
            <span className={styles.pillCount}>{directoryTotals.all}</span>
          </button>
          {directory.map((section) => (
            <button
              key={section.category}
              type="button"
              className={styles.pill}
              data-active={category === section.category}
              onClick={() =>
                setCategory(category === section.category ? null : section.category)
              }
            >
              {section.category}
              <span className={styles.pillCount}>{section.items.length}</span>
            </button>
          ))}
        </div>

        {directoryShown.length === 0 ? (
          <p className={styles.directoryEmpty}>
            Nothing in the directory matches “{debounced}”. Clear the box to see
            all {totalPageCount} pages, or{" "}
            <Link href="/contact/">tell us what you are looking for</Link>.
          </p>
        ) : (
          directoryShown.map((section) => {
            const isCollapsed = collapsed.has(section.category);
            const panelId = `all-${section.category
              .toLowerCase()
              .replace(/\s+/g, "-")}-list`;

            return (
              <section
                key={section.category}
                className={styles.block}
                id={`all-${section.category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className={styles.blockHead}>
                  <h3 className={styles.blockTitle}>
                    <Link href={section.hub}>{titleCase(section.category)}</Link>
                  </h3>
                  <button
                    type="button"
                    className={styles.blockToggle}
                    aria-expanded={!isCollapsed}
                    aria-controls={panelId}
                    onClick={() =>
                      setCollapsed((current) => {
                        const next = new Set(current);
                        if (next.has(section.category)) next.delete(section.category);
                        else next.add(section.category);
                        return next;
                      })
                    }
                  >
                    {section.items.length} page
                    {section.items.length === 1 ? "" : "s"}
                    <Chevron open={!isCollapsed} />
                  </button>
                </div>

                <ul className={styles.blockList} id={panelId} hidden={isCollapsed}>
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <Link href={item.href} className={styles.directoryLink}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })
        )}
      </section>

      {/* Named for the screen reader, but only where it is not already shown. */}
      {!hasQuery ? (
        <p className="sr-only">
          Sections available: {directoryFacets.join(", ")}.
        </p>
      ) : null}
    </div>
  );
}
