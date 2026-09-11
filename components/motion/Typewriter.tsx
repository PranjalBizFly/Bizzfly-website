"use client";

import { useEffect, useState } from "react";
import styles from "./Typewriter.module.css";

interface TypewriterProps {
  /** The complete string. Always rendered in full for assistive technology. */
  text: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Milliseconds to wait before the first character. */
  delay?: number;
  className?: string;
}

/**
 * Types a string out one character at a time, with a caret.
 *
 * Used in exactly one place on this site, and the reason is semantic rather
 * than decorative: the string being typed is a buyer's search query, so the
 * typing IS the content. A typewriter on a heading would be an effect; a
 * typewriter on a question someone is entering into a search box is a
 * depiction of the thing the section is describing. That distinction is the
 * whole argument for using it here and against using it anywhere else.
 *
 * ACCESSIBILITY — the full string is never withheld.
 *
 * The animated text is aria-hidden, and a visually hidden copy of the
 * complete string sits beside it. A screen reader gets the whole question
 * immediately and in one piece; it never hears a partial string, and it
 * never hears the same sentence re-announced on every keystroke, which is
 * what a naive implementation does to anyone using one. Find-in-page is a
 * known limitation of the animated copy and the reason the full string is
 * in the DOM rather than built from a counter alone.
 *
 * REDUCED MOTION — the whole effect is skipped, not slowed. The string is
 * painted complete on first render with no caret and no timer, because a
 * caret blinking next to text is exactly the kind of small repeating motion
 * the setting exists to remove.
 */
export function Typewriter({ text, speed = 38, delay = 220, className = "" }: TypewriterProps) {
  /*
   * Start complete, then empty on the client only if motion is allowed.
   *
   * Server-rendered HTML therefore contains the finished string, so the page
   * is correct before hydration and for anyone with JavaScript disabled. The
   * alternative — starting empty — ships an empty element in the HTML and
   * flashes the text in on hydration.
   */
  const [shown, setShown] = useState(text);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(text);
      setTyping(false);
      return;
    }

    setShown("");
    setTyping(true);

    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      index += 1;
      setShown(text.slice(0, index));
      if (index < text.length) {
        timer = setTimeout(tick, speed);
      } else {
        setTyping(false);
      }
    };

    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {/* The complete string, for assistive technology only. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {shown}
        <span className={styles.caret} data-state={typing ? "typing" : "rest"} />
      </span>
    </span>
  );
}
