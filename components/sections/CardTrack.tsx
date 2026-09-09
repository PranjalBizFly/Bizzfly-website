"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ImageMetadata } from "@/content/images/types";
import styles from "./CardTrack.module.css";

export interface CardTrackEntry {
  /** Zero-padded position, e.g. "01". */
  index: string;
  title: string;
  description: string;
  href: string;
  image: ImageMetadata;
}

interface CardTrackProps {
  entries: CardTrackEntry[];
  /** Names the scroll region for assistive technology. */
  label: string;
  /** The wording on each card's call to action. */
  action?: string;
  /** Pixels per second. Slow enough that a card can be read as it passes. */
  speed?: number;
  /**
   * Drift on its own.
   *
   * On for a long set where the motion IS the discovery. Off for a short set,
   * or one whose cards want reading rather than watching — there the track is
   * still draggable, swipeable and keyed, it simply waits to be moved. A
   * six-card row that loops forever is motion for its own sake.
   */
  autoplay?: boolean;
}

/** How long manual movement suppresses the drift before it picks up again. */
const RESUME_DELAY = 2500;

/**
 * A horizontal track of image-led cards that drifts continuously.
 *
 * WHY A SCROLL CONTAINER RATHER THAN A CSS MARQUEE.
 *
 * The obvious way to move a strip forever is a CSS transform animation, and
 * this project already has one — see components/motion/Marquee. It is cheaper
 * than this: composited, zero JavaScript, nothing on the main thread. It is
 * also un-draggable. A transformed track has no scroll position, so a finger
 * on a phone or a trackpad swipe does nothing to it, and the brief asks for
 * automatic drift AND manual drag AND touch swipe on the same element.
 *
 * A native scroll container is the only mechanism that gives all three from
 * one source of truth: the drift advances `scrollLeft`, and a drag, a swipe,
 * a shift-wheel, the arrow keys and the two buttons move the same number.
 * Nothing has to be reconciled because there is nothing to reconcile.
 *
 * The cost is a rAF loop, and it is kept honest: it does one addition per
 * frame, it does not run while the section is off-screen, and it does not run
 * at all for a reader who has asked for reduced motion.
 *
 * THE SEAMLESS LOOP.
 *
 * The set is rendered twice. When the drift passes the halfway point,
 * `scrollLeft` drops back by exactly half the scroll width — and because the
 * second half is identical to the first, the pixels under the viewport do not
 * change. There is no transition to see, so there is no reset to notice.
 *
 * The clone is `aria-hidden` and `inert`: the twenty-six links are announced
 * and focusable once, not twice.
 *
 * NO SCROLL SNAPPING. Snap points fight a continuous drift and would drag the
 * track card-to-card, which is the stepped motion the brief rules out.
 */
export function CardTrack({
  entries,
  label,
  action = "Explore",
  speed = 42,
  autoplay = true,
}: CardTrackProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /*
   * Reasons the drift is currently held. Refs rather than state: they are read
   * inside the animation frame and must not re-render the tree to take effect.
   */
  const hovering = useRef(false);
  const focused = useRef(false);
  const visible = useRef(false);
  const manualUntil = useRef(0);

  const readEdges = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const max = vp.scrollWidth - vp.clientWidth;
    setAtStart(vp.scrollLeft <= 1);
    setAtEnd(vp.scrollLeft >= max - 1);
  }, []);

  /* --- The drift ---------------------------------------------------------- */
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    if (!autoplay) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const io =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (rows) => {
              for (const row of rows) visible.current = row.isIntersecting;
            },
            { threshold: 0.15 },
          );
    io?.observe(vp);
    if (!io) visible.current = true;

    let frame = 0;
    let last = performance.now();
    /* Sub-pixel remainder, so a slow speed still advances every frame. */
    let carry = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 100);
      last = now;

      const running =
        visible.current &&
        !hovering.current &&
        !focused.current &&
        now > manualUntil.current;

      if (running) {
        carry += (speed * elapsed) / 1000;
        const step = Math.floor(carry);
        if (step >= 1) {
          carry -= step;
          vp.scrollLeft += step;

          /*
           * The wrap. Half the scroll width is exactly one copy of the set,
           * so subtracting it lands on the identical frame one set earlier.
           */
          const half = vp.scrollWidth / 2;
          if (half > 0 && vp.scrollLeft >= half) vp.scrollLeft -= half;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, [speed, autoplay]);

  /* --- Edge state and manual interaction ---------------------------------- */
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    readEdges();

    /* Any gesture that moves the track by hand holds the drift briefly. */
    const hold = () => {
      manualUntil.current = performance.now() + RESUME_DELAY;
    };

    const onEnter = () => {
      hovering.current = true;
    };
    const onLeave = () => {
      hovering.current = false;
    };
    const onFocusIn = () => {
      focused.current = true;
    };
    const onFocusOut = () => {
      focused.current = false;
    };

    vp.addEventListener("scroll", readEdges, { passive: true });
    vp.addEventListener("mouseenter", onEnter);
    vp.addEventListener("mouseleave", onLeave);
    vp.addEventListener("focusin", onFocusIn);
    vp.addEventListener("focusout", onFocusOut);
    vp.addEventListener("pointerdown", hold, { passive: true });
    vp.addEventListener("touchstart", hold, { passive: true });
    vp.addEventListener("wheel", hold, { passive: true });
    window.addEventListener("resize", readEdges);

    return () => {
      vp.removeEventListener("scroll", readEdges);
      vp.removeEventListener("mouseenter", onEnter);
      vp.removeEventListener("mouseleave", onLeave);
      vp.removeEventListener("focusin", onFocusIn);
      vp.removeEventListener("focusout", onFocusOut);
      vp.removeEventListener("pointerdown", hold);
      vp.removeEventListener("touchstart", hold);
      vp.removeEventListener("wheel", hold);
      window.removeEventListener("resize", readEdges);
    };
  }, [readEdges]);

  const move = (direction: 1 | -1) => {
    const vp = viewportRef.current;
    if (!vp) return;
    manualUntil.current = performance.now() + RESUME_DELAY;

    /*
     * The gap lives on the item as a trailing margin, not as a container
     * gap — see the note in the stylesheet — so a step is the card plus its
     * own margin rather than the card plus a container value.
     */
    const card = vp.querySelector<HTMLElement>("[data-card]");
    const trailing = card
      ? Number.parseFloat(getComputedStyle(card).marginInlineEnd) || 0
      : 0;
    const step = card
      ? card.getBoundingClientRect().width + trailing
      : vp.clientWidth * 0.8;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    vp.scrollBy({ left: direction * step, behavior: reduced ? "auto" : "smooth" });
  };

  const cards = (clone: boolean) =>
    entries.map((entry) => (
      <li key={`${clone ? "clone" : "set"}-${entry.href}`} className={styles.item} data-card>
        <Link href={entry.href} className={styles.card} tabIndex={clone ? -1 : undefined}>
          <div className={styles.frame}>
            <Image
              src={entry.image.src}
              alt={clone ? "" : entry.image.alt}
              width={entry.image.width}
              height={entry.image.height}
              loading="lazy"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 78vw"
              className={styles.image}
            />
          </div>

          <div className={styles.body}>
            <span className={styles.index}>{entry.index}</span>
            <h3 className={styles.title}>{entry.title}</h3>
            <p className={styles.description}>{entry.description}</p>

            <span className={styles.action}>
              {action}
              <span className={styles.arrow} aria-hidden="true">
                &rarr;
              </span>
            </span>
          </div>
        </Link>
      </li>
    ));

  return (
    <div className={styles.wrapper}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <ul className={styles.track}>{cards(false)}</ul>
        {/*
          The second copy exists only so the wrap has somewhere identical to
          land, so it is rendered only when there is a wrap. Without autoplay
          the track simply ends, and a duplicate set would be dead weight in
          the DOM and a second copy of every link.

          When it is there it is hidden from assistive technology and taken
          out of the focus order, so the set is announced once.
        */}
        {autoplay ? (
          <ul className={styles.track} aria-hidden="true" inert>
            {cards(true)}
          </ul>
        ) : null}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          onClick={() => move(-1)}
          disabled={atStart}
          aria-label="Previous"
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => move(1)}
          disabled={atEnd}
          aria-label="Next"
        >
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
