"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  searchSections,
  flattenSections,
  popularSearches,
  browseSections,
  totalPageCount,
} from "@/lib/search";
import styles from "./SearchDialog.module.css";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * The pre-query destinations. The section hubs, in the site's own order —
 * the same list the results group into, so the empty panel is a preview of
 * the shape a search will come back in rather than an unrelated shortcut bar.
 */
const startHere = browseSections;

/**
 * How many rows a section shows before it defers to the full results page.
 *
 * Three rather than four so that three sections clear the fold instead of
 * two: the point of grouping is that the reader sees the shape of the whole
 * answer, and a panel showing Services and Industries only looks like an
 * ungrouped list that happens to have a label on it.
 */
const PER_SECTION = 3;

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  /* Debounce at 150ms — results appear after 2 characters. */
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 150);
    return () => clearTimeout(timer);
  }, [query]);

  /*
   * Section-wise rather than one ranked list. With 145 resources against 26
   * industries, a flat top-20 for "seo" was a wall of glossary entries and
   * no industry at all — the index is not evenly sized, so an unallocated
   * list shows the biggest section rather than the best answers.
   */
  const sections = useMemo(
    () => searchSections(debounced, { perSection: PER_SECTION }),
    [debounced],
  );
  const flat = useMemo(() => flattenSections(sections), [sections]);
  const totalMatches = useMemo(
    () => sections.reduce((sum, section) => sum + section.total, 0),
    [sections],
  );

  useEffect(() => setActiveIndex(0), [debounced]);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      setQuery("");
      setDebounced("");
      inputRef.current?.focus();
    }
  }, [open]);

  /* Body scroll lock, focus trap, focus restore. */
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      (triggerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  /*
   * Escape, bound on the document rather than only on the dialog.
   *
   * The handler below fires on the dialog's own onKeyDown, which requires
   * focus to be inside it — and focus is not always there. Clicking a result
   * row and coming back, or any stray click on the backdrop, leaves the
   * activeElement outside the panel, and Escape then did nothing at all: the
   * dialog stayed up with the body still scroll-locked behind it. A modal
   * has to be dismissable from wherever focus happens to be.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  /* Keep the highlighted row in view when the arrow keys walk past the fold. */
  useEffect(() => {
    if (!open) return;
    dialogRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  if (!open) return null;

  const goToAll = () => {
    const q = query.trim();
    router.push(q ? `/search/?q=${encodeURIComponent(q)}` : "/search/");
    onClose();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    /*
     * Focus trap. The dialog declares aria-modal, which tells a screen
     * reader the rest of the page is inert — but that is an announcement,
     * not a behaviour. Without this, Tab walks straight out of the dialog
     * into the page behind it, so the reader is told they are in a modal
     * while their focus is somewhere else entirely.
     */
    if (event.key === "Tab") {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (flat.length ? (i + 1) % flat.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const target = flat[activeIndex];
      if (target) {
        router.push(target.href);
        onClose();
      } else {
        goToAll();
      }
    }
  };

  const hasQuery = debounced.trim().length >= 2;
  let runningIndex = -1;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onKeyDown={onKeyDown}
      >
        <div className={styles.inputRow}>
          <span className={styles.icon} aria-hidden="true">
            &#9906;
          </span>
          <input
            ref={inputRef}
            type="search"
            className={styles.input}
            placeholder="Search services, industries, use cases…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search the site"
            aria-controls="search-results"
            autoComplete="off"
          />
          <button type="button" className={styles.escape} onClick={onClose}>
            ESC
          </button>
        </div>

        <div className={styles.results} id="search-results">
          {!hasQuery ? (
            <div className={styles.start}>
              <p className={styles.startHeading}>Start here</p>
              <ul className={styles.startList}>
                {startHere.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.startLink}
                      onClick={onClose}
                    >
                      <span>{item.label}</span>
                      <span className={styles.startArrow} aria-hidden="true">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className={styles.startHint}>
                Type to search every page on the site. Use &uarr;&darr; to move,
                Enter to open.
              </p>
            </div>
          ) : flat.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>
                No matches for <strong>{debounced}</strong>.
              </p>
              <p className={styles.emptyLead}>
                Try a broader word, or open the directory and scan the sections:
                every published page is listed there.
              </p>

              <div className={styles.emptySection}>
                <p className={styles.emptyHeading}>Popular searches</p>
                <div className={styles.chips}>
                  {popularSearches.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={styles.chip}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.emptySection}>
                <p className={styles.emptyHeading}>Browse by section</p>
                <div className={styles.chips}>
                  {browseSections.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={styles.chip}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.emptySection}>
                <p className={styles.emptyHeading}>Still stuck?</p>
                <Link href="/contact/" className={styles.chip} onClick={onClose}>
                  Tell us what you are looking for &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.sections}>
              {sections.map((section) => (
                <section key={section.category} className={styles.section}>
                  <p className={styles.groupHeading}>
                    <span>{section.category}</span>
                    <span className={styles.groupCount}>{section.total}</span>
                  </p>

                  {section.items.map((item) => {
                    runningIndex += 1;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={styles.result}
                        data-active={runningIndex === activeIndex}
                        onClick={onClose}
                      >
                        <span className={styles.resultTitle}>{item.title}</span>
                        <span className={styles.resultDescription}>
                          {item.description}
                        </span>
                        <span className={styles.resultUrl}>{item.href}</span>
                      </Link>
                    );
                  })}

                  {/*
                    Only when the section is actually holding something back.
                    A "see all" under four of four results is a link that
                    promises more and delivers the same four.
                  */}
                  {section.total > section.items.length ? (
                    <button
                      type="button"
                      className={styles.sectionMore}
                      onClick={goToAll}
                    >
                      {section.total - section.items.length} more in{" "}
                      {section.category}
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  ) : null}
                </section>
              ))}
            </div>
          )}
        </div>

        {/*
          The way out of a capped panel. Every list above is a selection, so
          the directory has to be one keystroke away rather than something
          the visitor has to know exists.
        */}
        <button type="button" className={styles.exploreAll} onClick={goToAll}>
          <span className={styles.exploreAllLabel}>
            {hasQuery && totalMatches > 0
              ? `See all ${totalMatches} result${totalMatches === 1 ? "" : "s"} for “${debounced}”`
              : "Explore all pages"}
          </span>
          <span className={styles.exploreAllMeta}>
            {hasQuery && totalMatches > 0
              ? "Full results"
              : `${totalPageCount} pages`}
            <span aria-hidden="true">&rarr;</span>
          </span>
        </button>

        <div className={styles.footer}>
          <span>&uarr;&darr; navigate · &crarr; open · esc close</span>
          <span aria-live="polite">
            {hasQuery
              ? totalMatches > 0
                ? `${totalMatches} result${totalMatches === 1 ? "" : "s"} in ${sections.length} section${sections.length === 1 ? "" : "s"}`
                : "No results"
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
