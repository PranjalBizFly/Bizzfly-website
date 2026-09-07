"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  search,
  groupResults,
  popularSearches,
  browseSections,
  searchCategories,
} from "@/lib/search";
import styles from "./SearchResults.module.css";

/**
 * Full-page search. Shares the index, ranking and synonym map with the
 * command palette, so results are consistent between the two.
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

  const allResults = useMemo(() => search(debounced, { limit: 60 }), [debounced]);

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

  const availableFacets = searchCategories.filter((c) => (counts.get(c) ?? 0) > 0);

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

      <p className={styles.count} aria-live="polite">
        {hasQuery
          ? `${results.length} result${results.length === 1 ? "" : "s"} for “${debounced}”${
              category ? ` in ${category}` : ""
            }`
          : "Type at least two characters."}
      </p>

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

          <p className={styles.emptyHeading}>Browse by section</p>
          <ul className={styles.chips}>
            {browseSections.map((item) => (
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

      {!hasQuery ? (
        <div className={styles.empty}>
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

          <p className={styles.emptyHeading}>Browse by section</p>
          <ul className={styles.chips}>
            {browseSections.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.chip}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {groups.map(([groupName, items]) => (
        <section key={groupName} className={styles.group}>
          <h2 className={styles.groupHeading}>{groupName}</h2>
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
    </div>
  );
}
