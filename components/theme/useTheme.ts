"use client";

import { useCallback, useEffect, useState } from "react";
import { THEME_EVENT, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/**
 * Reads and sets the application theme.
 *
 * Returns `null` until mounted, deliberately. The server cannot know which
 * theme the visitor stored, so the first client render must match the
 * server's — anything else is a hydration mismatch. Callers render a
 * theme-neutral label while it is null; the icons themselves are switched in
 * CSS off the data-theme attribute, so the control still *looks* correct on
 * the very first paint even before this resolves.
 *
 * State is shared between instances (the header toggle and the one in the
 * mobile drawer) through a window event rather than a context provider —
 * there is no tree to provide through, since the source of truth is an
 * attribute on <html>.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    const read = () =>
      setThemeState(
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light",
      );

    read();
    window.addEventListener(THEME_EVENT, read);
    return () => window.removeEventListener(THEME_EVENT, read);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Storage is unavailable in some privacy modes. The theme still
         applies for this page view; it just will not be remembered. */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggle = useCallback(() => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    setTheme(current === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggle };
}
