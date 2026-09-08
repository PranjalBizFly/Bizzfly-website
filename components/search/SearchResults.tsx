"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  search,
  groupResults,
  popularSearches,
  searchCategories,
  pageDirectory,
  filterDirectory,
  directoryHubs,
  totalPageCount,
  SECTION_HUB,
} from "@/lib/search";
import styles from "./SearchResults.module.css";

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
            {groupName}
            <Link
              href={SECTION_HUB[groupName] ?? "/"}
              className={styles.groupHubLink}
            >
              All {groupName}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </h2>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
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
          <div>
            <p className={styles.directoryEyebrow}>Every page</p>
            <h2 className={styles.directoryTitle}>
              {hasQuery ? "The directory, filtered" : "Explore all pages"}
            </h2>
            <p className={styles.directoryLead}>
              {hasQuery
                ? `${directoryCount} of ${totalPageCount} pages match “${debounced}” by title, section or topic.`
                : `All ${totalPageCount} published pages, grouped by section. Type above to filter this list.`}
            </p>
          </div>

          <ul className={styles.hubs}>
            {directoryHubs.map((hub) => (
              <li key={hub.href}>
                <Link href={hub.href} className={styles.hubLink}>
                  {hub.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {directoryShown.length === 0 ? (
          <p className={styles.directoryEmpty}>
            Nothing in the directory matches “{debounced}”. Clear the box to see
            all {totalPageCount} pages, or{" "}
            <Link href="/contact/">tell us what you are looking for</Link>.
          </p>
        ) : (
          <div className={styles.directoryGroups}>
            {directoryShown.map((section) => (
              <section
                key={section.category}
                className={styles.directoryGroup}
                id={`all-${section.category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <h3 className={styles.directoryGroupHeading}>
                  <Link href={section.hub}>{section.category}</Link>
                  <span className={styles.directoryGroupCount}>
                    {section.items.length}
                  </span>
                </h3>
                <ul className={styles.directoryList}>
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <Link href={item.href} className={styles.directoryLink}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
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
