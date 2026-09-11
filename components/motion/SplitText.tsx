import type { CSSProperties, ElementType } from "react";
import styles from "./Kinetic.module.css";

type SplitBy = "word" | "char";

interface SplitTextProps {
  /** The text to split. A plain string, so nothing can be split mid-element. */
  text: string;
  /**
   * Words is almost always right. Chars is for short labels only — an eyebrow,
   * a two-word statement — because a character stagger on a sentence arrives
   * long after the reader has finished reading it.
   */
  by?: SplitBy;
  /**
   * "load" runs the stagger off a CSS keyframe as soon as the element
   * exists — correct above the fold, where there is nothing to wait for.
   * "driven" leaves the pieces inert for an ancestor to trigger, which is
   * what TextReveal does with an observer further down a page.
   */
  mode?: "load" | "driven";
  /** Milliseconds before the first piece moves. */
  offset?: number;
  /**
   * How each piece arrives.
   *
   * "rise" — fade upward into place. The house style, and what every heading
   * on the site uses.
   * "type" — appear in place, left to right, behind a caret that stops when
   * the line is finished. Only for a short keyword line or a label; a typed
   * sentence is slower to read than a written one, and a typed heading is
   * slower to paint.
   */
  effect?: "rise" | "type";
  as?: ElementType;
  className?: string;
}

/**
 * Splits a string into individually animatable pieces.
 *
 * No hooks and no "use client", deliberately: the heroes that use this are
 * server components rendering the LCP element, and pulling them across the
 * client boundary to animate a headline would cost far more than the
 * animation is worth. Everything here is markup plus two custom properties;
 * the motion itself lives in Kinetic.module.css and in whichever module
 * decides when to run it.
 *
 * The text stays real text. Each piece is a text node inside a span, with
 * ordinary spaces between the words, so selection, find-in-page, translation
 * and anything reading the DOM see the sentence exactly as written — which
 * matters on this site, where headings are the part an extractor quotes. The
 * spans are not hidden from assistive technology for the same reason: a
 * screen reader reads the concatenated text, and hiding the pieces behind an
 * aria-label would leave the visible text and the announced text as two
 * things that have to be kept in sync by hand.
 */
export function SplitText({
  text,
  by = "word",
  mode = "driven",
  offset,
  effect = "rise",
  as: Tag = "span",
  className = "",
}: SplitTextProps) {
  /*
   * Split on whitespace either way, keeping the gaps.
   *
   * Whitespace is emitted as its own plain run rather than as an animatable
   * piece, so a line break falls between two words exactly where it would in
   * plain text, and only real content takes a stagger index.
   */
  const runs = text.split(/(\s+)/);

  /* Counts across the whole string, so a char stagger keeps accelerating
     through a heading rather than restarting at each word. */
  let index = -1;

  const piece = (content: string, key: string) => {
    index += 1;
    return (
      <span
        key={key}
        className={styles.piece}
        style={{ "--piece-index": index } as CSSProperties}
      >
        <span className={styles.pieceInner}>{content}</span>
      </span>
    );
  };

  /* How many animatable pieces this will produce — the caret reads it to
     know when the line is finished. Whitespace never counts. */
  const pieceCount =
    by === "word"
      ? runs.filter((run) => run && !/^\s+$/.test(run)).length
      : Array.from(text.replace(/\s+/g, "")).length;

  return (
    <Tag
      className={`${styles.split} ${className}`.trim()}
      data-split={by}
      data-effect={effect === "type" ? "type" : undefined}
      /*
       * Carried here rather than asked of the caller, so a heading can stay
       * a plain <Heading> and does not need to grow a data-attribute
       * passthrough just to animate its own words.
       */
      data-kinetic={mode === "load" ? "load" : undefined}
      /*
       * --piece-count lets the caret know when the line finishes without the
       * caller having to count characters, so the caret retires on its own
       * however long the text is.
       */
      style={
        {
          ...(offset ? { "--kinetic-offset": `${offset}ms` } : {}),
          ...(effect === "type" ? { "--piece-count": pieceCount } : {}),
        } as CSSProperties
      }
    >
      {runs.map((run, key) => {
        if (run === "") return null;
        if (/^\s+$/.test(run)) return <span key={key}>{run}</span>;
        if (by === "word") return piece(run, String(key));

        /*
         * Characters animate individually, but the WORD is the unbreakable
         * unit.
         *
         * Each animatable piece has to be inline-block to carry its own clip
         * box, and a line of inline-block characters may be broken between
         * any two of them — so splitting a heading straight into characters
         * lets "Development" wrap as "Develo / pment". Wrapping each word in
         * its own nowrap box keeps line breaking where the language puts it,
         * at the spaces, while the letters inside still move one at a time.
         */
        return (
          <span key={key} className={styles.word}>
            {Array.from(run).map((character, position) =>
              piece(character, `${key}-${position}`),
            )}
          </span>
        );
      })}
    </Tag>
  );
}

/**
 * How many pieces a string will produce.
 *
 * Callers use it to size a following delay — a lead that should start after
 * its headline has finished, for instance — without splitting the string
 * twice or hard-coding a guess that goes stale when the copy changes.
 */
export function countPieces(text: string, by: SplitBy = "word"): number {
  return by === "word" ? text.trim().split(/\s+/).length : Array.from(text).length;
}
