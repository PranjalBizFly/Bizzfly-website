"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { titleCase } from "@/lib/titleCase";
import styles from "./PinnedStory.module.css";
import { Button } from "@/components/buttons";

export interface StoryChapter {
  /** Stable id — used for the scroll target and the aria wiring. */
  id: string;
  /** Short stage marker: "01", "Problem", "Week 1". */
  marker?: string;
  title: string;
  /** One or more paragraphs. Passed as strings so nothing can smuggle markup in. */
  body: string[];
  /**
   * Where this chapter continues, when it is a stage that has a page of
   * its own. Optional: a chapter that is purely part of the argument has no
   * destination, and rendering an empty affordance under it would suggest
   * there is more to read when there is not.
   */
  link?: { label: string; href: string };
  /**
   * What the sticky column shows while this chapter is the one being read.
   * Optional: a chapter with no visual holds whichever one preceded it,
   * which is usually what a narrative wants rather than an empty panel.
   */
  visual?: ReactNode;
}

interface PinnedStoryProps {
  /** Names the sequence for assistive technology. Required — this is a region. */
  label: string;
  chapters: StoryChapter[];
  /**
   * Content held at the top of the sticky column, above the stage rail.
   *
   * For a sequence whose anchor is not a photograph — a person's name and
   * role, a standing definition — this is what stays on screen while the
   * chapters move past it. Optional: most callers hold a visual or nothing
   * at all, and passing none leaves the column exactly as it was.
   */
  aside?: ReactNode;
  /** Which side the held visual sits on. Alternate it between sections. */
  side?: "left" | "right";
  className?: string;
}

/**
 * A held visual beside chapters that scroll past it.
 *
 * The pinning is `position: sticky`, not JavaScript. Nothing here measures
 * scroll position, recalculates offsets or fights the browser for control of
 * the scrollbar — the column simply sticks, the reader scrolls at whatever
 * speed they like, and the page can still be paged with space bar, searched
 * with find-in-page, and jumped through with a screen reader. Scroll
 * hijacking buys a slightly tighter effect at the cost of all of that, and
 * it is not a trade worth making on a site whose job is explaining things.
 *
 * The only JavaScript is a single IntersectionObserver watching a thin band
 * across the middle of the viewport. Whichever chapter is crossing that band
 * is the active one, which drives three things: the visual being held, the
 * marker highlighted on the rail, and the chapter's own emphasis. It runs
 * once per crossing rather than once per frame.
 *
 * Every word of every chapter is in the DOM and legible at all times. The
 * active state changes emphasis, never presence — a reader who never
 * triggers an observer, or who lands mid-section from a deep link, reads the
 * same page as everyone else.
 */
export function PinnedStory({
  label,
  chapters,
  side = "left",
  aside,
  className = "",
}: PinnedStoryProps) {
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = chapterRefs.current.filter((n): n is HTMLElement => n !== null);
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    /*
     * A band roughly a fifth of the viewport tall, sitting just above centre.
     * Reading happens slightly above the middle of a screen rather than at
     * it, so a band centred exactly would switch the visual a beat after the
     * reader had already moved on to the next chapter.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.chapterIndex);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [chapters.length]);

  /*
   * Clicking a marker moves the reader to that chapter. `scrollIntoView`
   * rather than a hash link so the URL is not rewritten — these are stages
   * in one argument, not destinations, and leaving a #chapter-3 in the
   * address bar makes a shared link open halfway through the story.
   *
   * `behavior: smooth` is honoured or ignored by the browser according to
   * the reader's own motion setting, which is the correct authority for it.
   */
  const goTo = useCallback((index: number) => {
    chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  /** The visual to hold: this chapter's, or the last one that had one. */
  const heldVisualIndex = (() => {
    for (let i = active; i >= 0; i -= 1) {
      if (chapters[i]?.visual) return i;
    }
    return -1;
  })();

  /*
   * A story with no visuals is still a story.
   *
   * Several sequences on this site are told entirely in words — an engagement
   * running week by week has stages, not photographs, and this site does not
   * invent imagery to fill a column. With no visuals the held column is just
   * the stage rail, which is the navigation half of the pattern and the half
   * that carries the reading position. Rendering the empty picture frame
   * anyway would put a large blank panel beside the text.
   */
  const hasVisuals = chapters.some((chapter) => chapter.visual);

  /*
   * An aside is a reason to keep the held column even with no imagery. The
   * data attribute below drives the mobile rule that would otherwise remove
   * it, so a caller that anchors on type rather than a photograph still gets
   * a sticky column on a phone.
   */
  const hasAside = Boolean(aside);

  return (
    <section
      className={`${styles.story} ${className}`.trim()}
      data-side={side}
      data-visuals={hasVisuals ? "true" : "false"}
      data-aside={hasAside ? "true" : "false"}
      aria-label={label}
    >
      <div className={styles.sticky}>
        {aside ? <div className={styles.aside}>{aside}</div> : null}
        <div className={styles.visualStack} hidden={!hasVisuals}>
          {chapters.map((chapter, index) =>
            chapter.visual ? (
              <div
                key={chapter.id}
                className={styles.visual}
                data-held={index === heldVisualIndex ? "true" : undefined}
                /*
                 * The held visual illustrates the chapter being read, which
                 * is already on screen in full. Announcing the other frames
                 * would read out a stack of images for one passage of text.
                 */
                aria-hidden="true"
              >
                {chapter.visual}
              </div>
            ) : null,
          )}
        </div>

        {chapters.length > 1 ? (
          <ol className={styles.rail} aria-label={`${label} — jump to a stage`}>
            {chapters.map((chapter, index) => (
              <li key={chapter.id}>
                <button
                  type="button"
                  className={styles.railStep}
                  data-active={index === active ? "true" : undefined}
                  aria-current={index === active ? "step" : undefined}
                  onClick={() => goTo(index)}
                >
                  <span className={styles.railMarker} aria-hidden="true">
                    {chapter.marker ?? String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.railLabel}>{titleCase(chapter.title)}</span>
                </button>
              </li>
            ))}
          </ol>
        ) : null}
      </div>

      <div className={styles.chapters}>
        {chapters.map((chapter, index) => (
          <article
            key={chapter.id}
            id={chapter.id}
            ref={(node) => {
              chapterRefs.current[index] = node;
            }}
            data-chapter-index={index}
            data-active={index === active ? "true" : undefined}
            className={styles.chapter}
            style={{ "--chapter-index": index } as CSSProperties}
          >
            {chapter.marker ? (
              <span className={styles.marker}>{chapter.marker}</span>
            ) : null}
            <h3 className={styles.chapterTitle}>{chapter.title}</h3>
            {chapter.body.map((paragraph) => (
              <p key={paragraph} className={styles.chapterBody}>
                {paragraph}
              </p>
            ))}
            {/*
              The chapter's own destination, when it has one. A real anchor
              rather than a handler on the article: these are pages, so they
              must be openable in a new tab, copyable, and reachable from the
              keyboard in the ordinary way.
            */}
            {chapter.link ? (
              <Button
                href={chapter.link.href}
                variant="secondary"
                size="sm"
                withArrow
              >
                {chapter.link.label}
              </Button>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
