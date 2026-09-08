"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BackToTop.module.css";

const SHOW_AFTER_PX = 500;

/**
 * Floating scroll-to-top control.
 *
 * Hidden at the top of the page and revealed once there is enough scrolled
 * distance for it to be worth offering. It stays mounted and animates with
 * opacity and transform only — mounting and unmounting it on scroll would
 * cost layout work on a scroll handler, which is the one place that matters.
 *
 * `inert` is what keeps the hidden state honest: a control faded to zero is
 * still focusable, so a keyboard user would otherwise tab into an invisible
 * button at the top of every page.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    /*
      Release focus before scrolling, or the scroll does not finish.

      Clicking focuses this button. The smooth scroll then carries the page
      up past SHOW_AFTER_PX, `visible` flips to false, and React marks the
      still-focused button `inert` — at which point the browser has to move
      focus out of an inert subtree, and that focus change cancels the
      in-flight smooth scroll. The page stopped around 410px every time:
      close enough to look deliberate, so the control appeared to work while
      never actually reaching the top. Under prefers-reduced-motion the jump
      is instant and lands before any of that, which is why it only ever
      failed with animation on.

      Blurring first puts focus on <body>, so nothing has to be moved
      mid-scroll — and body is where a keyboard user wants to resume from
      after being sent to the top anyway.
    */
    buttonRef.current?.blur();

    /* Honour the OS setting rather than forcing a long animated scroll. */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toTop}
      className={styles.button}
      data-visible={visible}
      /* Not reachable, not announced, while it is invisible. */
      inert={!visible}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={styles.icon}
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
