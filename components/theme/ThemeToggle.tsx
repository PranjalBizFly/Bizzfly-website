"use client";

import { useTheme } from "./useTheme";
import styles from "./ThemeToggle.module.css";

/**
 * Compact theme control.
 *
 * Both icons are always in the DOM and are crossfaded by CSS keyed off
 * html[data-theme]. That is what keeps the control correct on the first
 * paint: the pre-paint script has already set the attribute, so the right
 * icon is showing before React hydrates, and no JavaScript is needed to
 * pick it.
 *
 * The label is the part that cannot be done in CSS, so it stays neutral
 * until the theme resolves on mount — see useTheme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  const label =
    theme === null
      ? "Switch colour theme"
      : theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      className={[styles.toggle, className].filter(Boolean).join(" ")}
      aria-label={label}
      title={label}
    >
      <span className={styles.icons} aria-hidden="true">
        {/* Sun — shown in light mode */}
        <svg
          className={`${styles.icon} ${styles.sun}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4.25" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
        </svg>

        {/* Moon — shown in dark mode */}
        <svg
          className={`${styles.icon} ${styles.moon}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
        </svg>
      </span>
    </button>
  );
}
