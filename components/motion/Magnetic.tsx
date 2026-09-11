"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./Magnetic.module.css";

interface MagneticProps {
  /**
   * How far the element may be pulled, in pixels. Small on purpose: past
   * about 10px a button stops feeling responsive and starts feeling like it
   * is dodging the cursor, which makes it measurably harder to click.
   */
  strength?: number;
  /** Widens the area that counts as "near" beyond the element's own box. */
  padding?: number;
  className?: string;
  children: ReactNode;
}

/**
 * An element that leans very slightly towards the pointer.
 *
 * Used on one or two things per page at most — the CTA that closes a page,
 * a single large visual — and never on a list of them. The effect works
 * because it is rare; a page where every card leans at the cursor reads as a
 * demo of a technique.
 *
 * Three things keep it honest:
 *
 * Pointer capability, not screen width, decides whether it runs at all.
 * `(hover: hover) and (pointer: fine)` is the only reliable way to ask
 * "is there a cursor here" — a tablet with a keyboard case reports a wide
 * viewport and has no pointer to follow, and a touch laptop reports both.
 *
 * The listener is on the element, not the window, and it only writes two
 * custom properties. There is no layout read in the handler: the box is
 * measured once per pointer entry, not once per move, so the whole
 * interaction is a compositor transform.
 *
 * It moves the element and nothing else — no scale, no rotation, no shadow.
 * The button stays exactly the size and shape it was, so the hit target the
 * reader aimed at is the hit target that is there when they click.
 */
export function Magnetic({
  strength = 8,
  padding = 0,
  className = "",
  children,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /*
     * Both gates are read here rather than left to CSS, so that on a touch
     * device no listener is attached at all. A media query would still leave
     * the handler running and writing properties nothing reads.
     */
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || stillness.matches) return;

    let box: DOMRect | null = null;
    let frame = 0;

    const measure = () => {
      box = node.getBoundingClientRect();
    };

    const move = (event: PointerEvent) => {
      if (!box) return;
      // Coalesced into a frame: pointermove can fire faster than the display.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!box) return;
        const dx = (event.clientX - (box.left + box.width / 2)) / (box.width / 2 + padding);
        const dy = (event.clientY - (box.top + box.height / 2)) / (box.height / 2 + padding);
        // Clamped, so a pointer entering at a corner cannot overshoot.
        const clamp = (v: number) => Math.max(-1, Math.min(1, v));
        node.style.setProperty("--magnet-x", `${clamp(dx) * strength}px`);
        node.style.setProperty("--magnet-y", `${clamp(dy) * strength}px`);
      });
    };

    const release = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      box = null;
      node.style.setProperty("--magnet-x", "0px");
      node.style.setProperty("--magnet-y", "0px");
    };

    node.addEventListener("pointerenter", measure);
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", release);
    /* A pointer released outside the element never fires pointerleave. */
    node.addEventListener("pointercancel", release);

    return () => {
      node.removeEventListener("pointerenter", measure);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", release);
      node.removeEventListener("pointercancel", release);
      release();
    };
  }, [strength, padding]);

  return (
    <span ref={ref} className={`${styles.magnet} ${className}`.trim()}>
      {children}
    </span>
  );
}
