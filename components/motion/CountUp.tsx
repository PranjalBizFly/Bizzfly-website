"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CountUp.module.css";

interface CountUpProps {
  /**
   * The figure exactly as it should read when finished — "146", "4.8",
   * "500+", "6 of 6". Whatever is passed is what ends up on screen; this
   * component only animates the run-up to it.
   */
  value: string;
  /** How long the count takes. */
  duration?: number;
  className?: string;
}

/** Leading number, plus whatever sits either side of it. */
const FIGURE = /^(\D*?)(\d+(?:[.,]\d+)?)(.*)$/s;

/**
 * Counts a figure up to its final value as it arrives.
 *
 * The value is rendered in full on the server and stays in the DOM the whole
 * time — the animation only overwrites the digits of an element that already
 * says the right thing. That matters more here than anywhere else in the
 * motion system: these figures are the site's factual claims, and a number
 * that is absent, or stuck at 0, for a reader whose JavaScript failed would
 * be worse than no animation at all.
 *
 * Only the numeric run is animated. "6 of 6" counts the first 6 and leaves
 * the rest alone; "500+" keeps its plus throughout; "4.8" counts in tenths
 * because that is the precision it was written with. Anything with no digits
 * is passed straight through untouched.
 *
 * Runs once, on arrival, and never again. A figure that re-counts every time
 * it scrolls back into view turns a fact into a fidget.
 */
export function CountUp({ value, duration = 900, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  /* Starts as the real value, so SSR and hydration both render the fact. */
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const match = FIGURE.exec(value);
    if (!node || !match) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const [, prefix = "", digits = "", suffix = ""] = match;
    const target = Number(digits.replace(",", "."));
    if (!Number.isFinite(target)) return;

    /* Count in the precision the figure was written with: 4.8 in tenths, 146
       in whole numbers. Deriving it from the string keeps "4.80" honest too. */
    const dot = digits.indexOf(".") === -1 ? digits.indexOf(",") : digits.indexOf(".");
    const places = dot === -1 ? 0 : digits.length - dot - 1;
    const render = (n: number) => `${prefix}${n.toFixed(places)}${suffix}`;

    let frame = 0;
    let start = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);

          const step = (now: number) => {
            if (!start) start = now;
            const t = Math.min(1, (now - start) / duration);
            /* Decelerating, so the figure settles onto its value rather than
               stopping dead on it. */
            const eased = 1 - Math.pow(1 - t, 3);
            setShown(render(target * eased));
            if (t < 1) frame = requestAnimationFrame(step);
            else setShown(value);
          };

          /* Only now is the displayed value allowed to leave the real one. */
          setShown(render(0));
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={`${styles.figure} ${className}`.trim()}>
      {/*
        The animating digits are hidden from assistive technology and the
        settled value is announced instead. Without this a screen reader can
        be read a stream of intermediate numbers, and a live count is not
        information — the fact is the final figure.
      */}
      <span aria-hidden="true">{shown}</span>
      <span className={styles.readable}>{value}</span>
    </span>
  );
}
