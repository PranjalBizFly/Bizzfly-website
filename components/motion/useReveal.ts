"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * `useLayoutEffect` warns when it runs during server rendering, so fall back
 * to `useEffect` there. On the client we want the layout variant: it runs
 * before the browser paints the hydrated tree, which is what keeps the
 * pending state from ever being visible.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * One-shot IntersectionObserver reveal.
 *
 * The observer's only job is flipping a data attribute — the animation itself
 * is a CSS transition. Total cost is roughly 1 KB, and no scroll listener
 * ever runs.
 *
 * Content renders visible by default (no attribute), so a JS failure or a
 * non-executing crawler always sees the full page. The consequence is that
 * anything already on screen has been painted by the time this runs, so
 * moving it into the hidden `pending` state would blink it out and fade it
 * back in — a visible flash on exactly the elements the visitor is looking
 * at, images most obviously. Elements already in the viewport therefore go
 * straight to `visible` and are never animated; only what is still off
 * screen gets the pending state and the reveal.
 */
export function useReveal<T extends HTMLElement>(
  enabled = true,
  /**
   * Which data attribute carries the state. Defaults to `data-reveal`, which
   * the transform-and-fade CSS reads. Kinetic type uses `data-kinetic`
   * instead so a heading can sit inside an already-revealed block and still
   * run its own word stagger, rather than the two states fighting over one
   * attribute.
   */
  attribute: "reveal" | "kinetic" = "reveal",
) {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset[attribute] = "visible";
      return;
    }

    /*
     * Already painted on screen: adopt the final state without a transition.
     * `visible` resolves to opacity 1 / translate3d(0,0,0), which is what the
     * element is already rendering, so nothing moves.
     */
    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const onScreen =
      rect.bottom > 0 &&
      rect.top < viewportHeight &&
      rect.right > 0 &&
      rect.left < viewportWidth;

    if (onScreen) {
      node.dataset[attribute] = "visible";
      return;
    }

    // Only hide the element once we know we can reveal it again.
    node.dataset[attribute] = "pending";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset[attribute] = "visible";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, attribute]);

  return ref;
}
