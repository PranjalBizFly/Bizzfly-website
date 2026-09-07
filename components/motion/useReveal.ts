"use client";

import { useEffect, useRef } from "react";

/**
 * One-shot IntersectionObserver reveal.
 *
 * The observer's only job is flipping a data attribute — the animation itself
 * is a CSS transition. Total cost is roughly 1 KB, and no scroll listener
 * ever runs.
 */
export function useReveal<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.reveal = "visible";
      return;
    }

    // Only hide the element once we know we can reveal it again.
    node.dataset.reveal = "pending";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "visible";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  return ref;
}
