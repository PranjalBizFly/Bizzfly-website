"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Faq } from "@/types/content";
import { Cascade } from "@/components/motion";
import styles from "./FAQBlock.module.css";
import { titleCase } from "@/lib/titleCase";

interface FAQBlockProps {
  faqs: Faq[];
  /** First item open so the answer is in the DOM for extraction. */
  openFirst?: boolean;
  /**
   * Several answers open at once. Buyer FAQs are compared rather than read in
   * order — "how long" and "what does it cost" are one question in two parts —
   * so closing the previous answer to open the next actively gets in the way.
   * Set false for a set where the answers are genuinely alternatives.
   */
  multiple?: boolean;
}

/**
 * S-04 Accordion set.
 *
 * Still native <details>/<summary>. That is not laziness: the element gives
 * correct semantics, keyboard operation, in-page find, and full function with
 * no JavaScript, and every hand-rolled div-and-ARIA accordion is an attempt to
 * get back to where the native element already is.
 *
 * What JavaScript adds here is only the animation. Opening sets the element
 * open immediately and lets CSS grow the panel; closing runs the reverse and
 * defers the actual `open = false` until the transition ends, because a
 * native <details> removes its content from the box the instant it closes and
 * there is otherwise nothing left to animate.
 *
 * Without JavaScript every one of these still opens and closes — it simply
 * does so instantly, which is what the element does on its own.
 */
export function FAQBlock({
  faqs,
  openFirst = true,
  multiple = true,
}: FAQBlockProps) {
  /* Which question is open, when only one may be. -1 is none. */
  const [only, setOnly] = useState(openFirst ? 0 : -1);

  /*
   * The questions arrive in order rather than as a finished block.
   *
   * This set appears on eight page types and was the last section on the site
   * with no arrival at all: a reader scrolling into it met a wall of six
   * closed rows landing at once, immediately after sections that had been
   * introducing themselves one piece at a time.
   *
   * Cascade rather than a Reveal per item — it observes the container once
   * and delays the children in CSS, so this stays one observer instead of six
   * and the markup the accordion depends on is untouched. Nothing here
   * interferes with the open/close animation either: the cascade transitions
   * the <details> element, the accordion transitions the panel inside it.
   */
  return (
    <Cascade className={styles.list}>
      {faqs.map((faq, index) => (
        <FaqItem
          key={faq.question}
          faq={faq}
          defaultOpen={openFirst && index === 0}
          controlled={!multiple}
          isOpen={only === index}
          onOpen={() => setOnly(index)}
          onClose={() => setOnly((current) => (current === index ? -1 : current))}
        />
      ))}
    </Cascade>
  );
}

interface FaqItemProps {
  faq: Faq;
  defaultOpen: boolean;
  controlled: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function FaqItem({
  faq,
  defaultOpen,
  controlled,
  isOpen,
  onOpen,
  onClose,
}: FaqItemProps) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [expanded, setExpanded] = useState(defaultOpen);

  const close = useCallback(
    (el: HTMLDetailsElement, notify = true) => {
      setExpanded(false);
      if (notify) onClose();

      /*
       * Wait for the collapse before letting the element actually close. If
       * the reader has asked for reduced motion the durations are already
       * collapsed to 1ms in tokens.css, so this still resolves immediately
       * rather than needing a separate branch.
       *
       * `once` matters: a reader clicking the summary repeatedly would
       * otherwise stack a listener per click, and each one would fire on the
       * next transition that happened to end.
       */
      const panel = el.querySelector<HTMLElement>(`.${styles.panel}`);
      if (!panel) {
        el.open = false;
        return;
      }
      panel.addEventListener(
        "transitionend",
        () => {
          // Only if nothing has re-opened it in the meantime.
          if (el.dataset.expanded !== "true") el.open = false;
        },
        { once: true },
      );
    },
    [onClose],
  );

  const onSummaryClick = (event: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;

    // Take the toggle over from the element so the close can be animated.
    event.preventDefault();

    if (el.open) {
      close(el);
      return;
    }

    el.open = true;
    // Next frame, so the panel has a starting size to grow from.
    requestAnimationFrame(() => setExpanded(true));
    onOpen();
  };

  /*
   * In single-open mode, another question opening closes this one.
   *
   * In an effect rather than during render: the DOM is the source of truth
   * for `open` here (React cannot animate a rendered `open={...}`), and
   * touching it — or calling setState — while rendering is exactly the kind
   * of side effect that breaks under concurrent rendering.
   *
   * `notify: false`, because the sibling that just opened already owns the
   * shared state; reporting a close from here would immediately clear it.
   */
  useEffect(() => {
    const el = ref.current;
    if (!controlled || !el) return;
    if (expanded && !isOpen && el.open) close(el, false);
  }, [controlled, expanded, isOpen, close]);

  const panelId = `faq-panel-${faq.question.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 32)}`;

  return (
    <details
      ref={ref}
      className={styles.item}
      open={defaultOpen}
      data-expanded={expanded}
    >
      <summary
        className={styles.question}
        onClick={onSummaryClick}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <span className={styles.questionText}>{titleCase(faq.question)}</span>
        <span className={styles.marker} aria-hidden="true">
          &#8250;
        </span>
      </summary>

      <div className={styles.panel} id={panelId} role="region" aria-label={faq.question}>
        <div className={styles.panelInner}>
          <p className={styles.answer}>{faq.answer}</p>
        </div>
      </div>
    </details>
  );
}
