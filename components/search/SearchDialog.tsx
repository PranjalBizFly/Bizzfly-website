"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { search, groupResults, popularSearches } from "@/lib/search";
import styles from "./SearchDialog.module.css";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

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

  const results = useMemo(() => search(debounced, { limit: 20 }), [debounced]);
  const groups = useMemo(() => groupResults(results), [results]);
  const flat = useMemo(() => groups.flatMap(([, items]) => items), [groups]);

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

  if (!open) return null;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
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
      } else if (query.trim()) {
        router.push(`/search/?q=${encodeURIComponent(query.trim())}`);
        onClose();
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
            <div className={styles.empty}>
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
            </div>
          ) : flat.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>
                No matches for <strong>{debounced}</strong>.
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
                <p className={styles.emptyHeading}>Browse by</p>
                <div className={styles.chips}>
                  <Link href="/services/" className={styles.chip} onClick={onClose}>
                    Services
                  </Link>
                  <Link href="/industries/" className={styles.chip} onClick={onClose}>
                    Industries
                  </Link>
                  <Link href="/use-cases/" className={styles.chip} onClick={onClose}>
                    Use Cases
                  </Link>
                  <Link href="/resources/" className={styles.chip} onClick={onClose}>
                    Resources
                  </Link>
                </div>
              </div>

              <div className={styles.emptySection}>
                <p className={styles.emptyHeading}>Still stuck?</p>
                <Link href="/contact/" className={styles.chip} onClick={onClose}>
                  Book a consultation &rarr;
                </Link>
              </div>
            </div>
          ) : (
            groups.map(([category, items]) => (
              <div key={category}>
                <p className={styles.groupHeading}>{category}</p>
                {items.map((item) => {
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
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <span>&uarr;&darr; navigate · &crarr; open · esc close</span>
          <span aria-live="polite">
            {hasQuery ? `${flat.length} result${flat.length === 1 ? "" : "s"}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
