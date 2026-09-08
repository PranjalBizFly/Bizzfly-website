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
export function ThemeToggle({
  className,
  showLabel = false,
}: {
  className?: string;
  /** Prints the current theme beside the icon. Used where the row has room. */
  showLabel?: boolean;
}) {
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
      className={[styles.toggle, showLabel && styles.withLabel, className]
        .filter(Boolean)
        .join(" ")}
      aria-label={label}
      title={label}
      /*
        Dark is the "on" state of the control, which is what a screen reader
        announces alongside the action in the label. Left off entirely until
        the theme resolves on mount, because the server cannot know it and
        aria-pressed="false" would be an assertion rather than an absence.
      */
      aria-pressed={theme === null ? undefined : theme === "dark"}
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

      {/*
        The icon alone tells you which way the control will move, not which
        state you are in. Where the row has the width for it — the drawer —
        the state is named outright. aria-hidden because aria-label already
        carries the whole control to a screen reader; announcing "Dark" a
        second time would only add noise.

        Only ever rendered inside the drawer, which cannot open before
        hydration, so `theme` is always resolved by the time this is on
        screen and the neutral fallback is never actually seen.
      */}
      {showLabel ? (
        <span className={styles.label} aria-hidden="true">
          {theme === null ? "Theme" : theme === "dark" ? "Dark" : "Light"}
        </span>
      ) : null}
    </button>
  );
}
