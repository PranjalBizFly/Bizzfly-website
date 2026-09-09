"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/testimonials";
import styles from "./TestimonialCarousel.module.css";

/**
 * Client testimonials.
 *
 * Built, wired and unpopulated. `content/testimonials.ts` is deliberately an
 * empty array — the four quotes on the old site have no verifiable source and
 * no written client approval, and this site publishes a promise that it
 * carries "no testimonials nobody wrote". Copying them across would make that
 * sentence false, which costs more than an absent section.
 *
 * This component therefore renders NOTHING while the array is empty, and the
 * homepage section around it does the same check. Adding the first approved
 * quote is the only step needed to turn the section on.
 *
 * One quote at a time, at size, rather than a grid of cards: three testimonial
 * cards side by side is a shape readers have learned to skip, and it implies a
 * volume of proof that a handful of quotes does not have.
 */
export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; active: boolean }>({ x: 0, active: false });

  const count = testimonials.length;

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  // Arrow keys move between quotes when the carousel has focus within it.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  /*
   * Pointer drag. Pointer events rather than touch events, so a mouse, a pen
   * and a finger all take the same path, and the threshold is deliberately
   * generous — a carousel that advances on a 10px twitch fights the reader
   * who is trying to scroll the page.
   */
  useEffect(() => {
    const node = trackRef.current;
    if (!node || count === 0) return;

    const onDown = (event: PointerEvent) => {
      drag.current = { x: event.clientX, active: true };
    };
    const onUp = (event: PointerEvent) => {
      if (!drag.current.active) return;
      const delta = event.clientX - drag.current.x;
      drag.current.active = false;
      if (Math.abs(delta) < 48) return;
      go(delta < 0 ? index + 1 : index - 1);
    };

    node.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      node.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [go, index, count]);

  if (count === 0) return null;

  /* Indexed access is unchecked under this tsconfig, and `index` is only ever
     set through `go`, which wraps — so this is a type guard rather than a
     real branch. */
  const current = testimonials[index];
  if (!current) return null;

  return (
    <div
      className={styles.wrapper}
      onKeyDown={onKeyDown}
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className={styles.track} ref={trackRef}>
        <figure className={styles.quote} key={index}>
          <blockquote className={styles.text}>{current.quote}</blockquote>

          <figcaption className={styles.attribution}>
            <span className={styles.name}>{current.name}</span>
            <span className={styles.meta}>
              {current.role}, {current.company}
            </span>
            <span className={styles.context}>{current.context}</span>
            {current.href ? (
              <Link href={current.href} className={styles.caseLink}>
                Read the case study
                <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : null}
          </figcaption>
        </figure>
      </div>

      {count > 1 ? (
        <div className={styles.controls}>
          <p className={styles.counter} aria-live="polite">
            <span className={styles.counterCurrent}>{index + 1}</span>
            <span aria-hidden="true"> / </span>
            <span>{count}</span>
          </p>

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.button}
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
