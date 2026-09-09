"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StaggerItem } from "@/components/motion";
import styles from "./StatBand.module.css";

export interface Stat {
  /** The figure itself, already formatted. */
  value: string;
  /** What the figure counts. */
  label: string;
  /** One line of context, so the number is not left to speak for itself. */
  note?: string;
  /**
   * Where the figure leads. Optional: a stat with no destination stays a
   * plain block rather than becoming a link to nowhere.
   */
  href?: string;
}

interface StatBandProps {
  stats: Stat[];
}

/**
 * A row of figures at display size, centred on a dark ground.
 *
 * Every number passed in has to be one the site can substantiate — a count of
 * things actually published, not a claim about results. The trust section
 * further down commits to exactly that standard, and a band of unverifiable
 * numbers here would contradict it on the same page.
 *
 * The figures are entry points rather than decoration: each one counts a
 * directory that exists, and clicking it opens that directory. That is why
 * this is a list of links rather than the description list it used to be —
 * `dl` described the right relationship when the numbers were inert, but a
 * link is not a definition, and wrapping one around a `dt`/`dd` pair would be
 * invalid markup for the sake of a semantic that no longer applies.
 *
 * The interaction is deliberately not the one used elsewhere on this page.
 * The cards further up scale an image and slide an arrow; the capability rows
 * grow a rule from the left. Here the whole row shares one hairline and the
 * active segment thickens into the accent, the figure lifts a couple of
 * pixels, and the destination fades in. Nothing scales, nothing bounces.
 */
export function StatBand({ stats }: StatBandProps) {
  const [active, setActive] = useState(-1);

  return (
    <ul className={styles.band}>
      {stats.map((stat, index) => {
        /* Shared by both branches, so the two cannot drift apart. */
        const interaction = {
          className: styles.inner,
          "data-active": index === active,
          /* Dim the rest only while something is genuinely current. */
          "data-dimmed": active !== -1 && index !== active,
          onMouseEnter: () => setActive(index),
          onMouseLeave: () => setActive(-1),
          onFocus: () => setActive(index),
          onBlur: () => setActive(-1),
        };

        const body = (
          <>
            <CountUp value={stat.value} className={styles.value} />

            {/*
              The shared hairline. Each stat draws its own full-width segment
              and the band closes the column gap, so the four read as one
              continuous rule rather than four separate underlines.
            */}
            <span className={styles.rule} aria-hidden="true" />

            <span className={styles.label}>{stat.label}</span>

            {stat.note ? <span className={styles.note}>{stat.note}</span> : null}

            {stat.href ? (
              <span className={styles.explore} aria-hidden="true">
                Explore
                <span className={styles.exploreArrow}>&rarr;</span>
              </span>
            ) : null}
          </>
        );

        return (
          <StaggerItem
            as="li"
            key={stat.label}
            index={index}
            className={styles.stat}
          >
            {/*
              Two branches rather than a polymorphic tag: `href` is required
              on Link and meaningless on a div, and the union that expresses
              that is more machinery than one duplicated wrapper.
            */}
            {stat.href ? (
              <Link href={stat.href} {...interaction}>
                {body}
              </Link>
            ) : (
              <div {...interaction}>{body}</div>
            )}
          </StaggerItem>
        );
      })}
    </ul>
  );
}

/**
 * Counts from zero to the figure, once, when it first reaches the viewport.
 *
 * The final value is what renders on the server, so the number is correct for
 * a crawler, for a reader with no JavaScript, and in the moment before this
 * mounts. The reset to zero only happens if the element is off-screen at the
 * time — otherwise a visitor arriving on the anchor would watch the figure
 * drop to nothing and climb back, which is worse than no animation.
 *
 * Anything that is not a plain integer is left alone: a value like "45+" has
 * no sensible interpolation, and guessing at one would eventually put a wrong
 * number on the page.
 */
function CountUp({
  value,
  className,
}: {
  value: string;
  /* CSS-module classes are typed `string | undefined` under this tsconfig. */
  className?: string;
}) {
  const target = Number(value);
  const animatable = value.trim() !== "" && Number.isFinite(target);

  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || !animatable) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const box = node.getBoundingClientRect();
    const alreadyVisible = box.top < window.innerHeight && box.bottom > 0;
    if (alreadyVisible) return;

    setShown("0");

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const DURATION = 900;

      const step = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        /* easeOutCubic — quick to establish, unhurried to settle. */
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(String(Math.round(eased * target)));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    if (typeof IntersectionObserver === "undefined") {
      setShown(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          run();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [animatable, target, value]);

  return (
    <span ref={ref} className={className}>
      {/*
        The figure is announced once, as its final value. Without this a
        screen reader following the live region would read every intermediate
        number, and the count is decoration — the fact is the total.
      */}
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
