"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./HorizontalStory.module.css";
import { titleCase } from "@/lib/titleCase";

export interface StorySlide {
  id: string;
  /** Stage marker: "01", "Discovery", "Week 1". */
  marker: string;
  title: string;
  body: string;
  /** Optional supporting visual, rendered above the text inside the panel. */
  visual?: ReactNode;
}

interface HorizontalStoryProps {
  /** Names the scroll region. Required — this is a region with its own axis. */
  label: string;
  slides: StorySlide[];
  className?: string;
}

/**
 * A sequence read sideways.
 *
 * Distinct from CardTrack, which is a drifting row of cards for browsing a
 * set. This is a fixed narrative: numbered stages in an order that matters,
 * where moving along the axis IS the point being made — a timeline, an
 * ecosystem read outward from its centre, a decision followed to its end.
 *
 * NOT scroll-jacked. The common version of this pattern pins the section and
 * converts vertical scroll into horizontal movement, which takes the page's
 * scrollbar away from the reader for several screens, breaks find-in-page,
 * strands anyone using space bar to page, and makes the browser's own scroll
 * restoration land in the wrong place. This is a native horizontal scroll
 * container instead: swipe, trackpad, shift-wheel, arrow keys, the two
 * buttons and tabbing to a panel all move the same `scrollLeft`, and the
 * vertical scrollbar continues to mean what it has always meant.
 *
 * Below the desktop breakpoint the axis is simply vertical. Not a squeezed
 * version of the horizontal layout — the same stages, stacked, which is what
 * a sequence should be on a tall narrow screen. Nothing overflows sideways.
 */
export function HorizontalStory({ label, slides, className = "" }: HorizontalStoryProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  /*
   * Whether there is actually anything to scroll.
   *
   * A short sequence on a wide screen fits entirely in the strip, and then
   * the controls are decoration: a "next" button that moves nothing, and a
   * progress rail showing progress through something the reader can already
   * see all of. Measured rather than assumed from a breakpoint, because it
   * depends on how many stages the caller passed as much as on the viewport.
   */
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return;

    const measure = () => {
      // One pixel of tolerance: sub-pixel layout rounding is not overflow.
      setOverflows(viewport.scrollWidth > viewport.clientWidth + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [slides.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const nodes = slideRefs.current.filter((n): n is HTMLElement => n !== null);
    if (!viewport || !nodes.length || typeof IntersectionObserver === "undefined") return;

    /*
     * Observed against the track itself, not the viewport, so the active
     * stage reflects what is centred in the strip rather than what happens
     * to be on screen vertically. Threshold at 0.6 so a panel has to be
     * mostly in view before it takes over — at a lower value the marker
     * flickers between two stages through the whole of a slow swipe.
     */
    /*
     * The active stage is the LEADING visible panel, not the last one the
     * observer happened to report.
     *
     * Two or three panels are in view at once here, and each callback
     * delivers them in whatever order the browser batched them. Taking each
     * entry as it came made the rightmost visible panel active, so "next"
     * computed from an index that was already at the end of the strip and
     * jumped straight there instead of advancing one — measured as a 636px
     * move on a 636px track.
     *
     * So visibility is held as a set and the active index is the smallest
     * member: the stage the reader has arrived at, which is the one the
     * marker and the progress rail should be describing.
     */
    const visible = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.slideIndex);
          if (Number.isNaN(index)) continue;
          if (entry.isIntersecting) visible.add(index);
          else visible.delete(index);
        }
        if (visible.size) setActive(Math.min(...visible));
      },
      { root: viewport, threshold: 0.6 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [slides.length]);

  const goTo = useCallback((index: number) => {
    const target = slideRefs.current[index];
    const viewport = viewportRef.current;
    if (!target || !viewport) return;

    /*
     * Scrolls the strip, never the page. `scrollIntoView` here would also
     * scroll the document vertically to bring the section into view, which
     * yanks the page whenever someone steps through the stages from a
     * position they had chosen themselves.
     *
     * Measured from the two boxes rather than from `offsetLeft`. A slide's
     * offsetLeft is relative to whatever its offsetParent happens to be —
     * here the track, not the scroll container — so subtracting the
     * viewport's own page offset mixed two coordinate spaces and produced a
     * scroll that overshot to the end of the strip on the first press. The
     * difference between the two client rects is the exact distance the
     * strip has to travel, whatever either element is positioned against.
     */
    const delta =
      target.getBoundingClientRect().left - viewport.getBoundingClientRect().left;
    viewport.scrollTo({ left: viewport.scrollLeft + delta, behavior: "smooth" });
  }, []);

  const step = useCallback(
    (delta: number) => goTo(Math.max(0, Math.min(slides.length - 1, active + delta))),
    [active, goTo, slides.length],
  );

  return (
    <div className={`${styles.story} ${className}`.trim()}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        /*
         * A scrollable region needs to be reachable and operable from the
         * keyboard. The role and label make it a landmark worth stopping at;
         * the tabindex is what lets the arrow keys reach the scroll container
         * at all in Firefox and Safari.
         */
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <ol className={styles.track}>
          {slides.map((slide, index) => (
            <li
              key={slide.id}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              data-slide-index={index}
              data-active={index === active ? "true" : undefined}
              className={styles.slide}
            >
              {slide.visual ? (
                <div className={styles.visual} aria-hidden="true">
                  {slide.visual}
                </div>
              ) : null}
              <span className={styles.marker}>{slide.marker}</span>
              <h3 className={styles.title}>{titleCase(slide.title)}</h3>
              <p className={styles.body}>{slide.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/*
        Controls sit below the strip, and exist only when the strip actually
        scrolls. That is two separate conditions: the axis is vertical below
        the tablet breakpoint (handled in CSS), and even on a wide screen a
        short sequence may fit entirely, in which case stepping through it
        would move nothing.
      */}
      <div className={styles.controls} hidden={!overflows}>
        <ol className={styles.progress} aria-hidden="true">
          {slides.map((slide, index) => (
            <li
              key={slide.id}
              className={styles.tick}
              data-state={
                index === active ? "active" : index < active ? "passed" : undefined
              }
            />
          ))}
        </ol>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={() => step(-1)}
            disabled={active === 0}
            aria-label={`${label}: previous stage`}
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => step(1)}
            disabled={active === slides.length - 1}
            aria-label={`${label}: next stage`}
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
