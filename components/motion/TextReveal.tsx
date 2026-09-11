"use client";

import type { CSSProperties, ElementType } from "react";
import { SplitText } from "./SplitText";
import { titleCase } from "@/lib/titleCase";
import { useReveal } from "./useReveal";

interface TextRevealProps {
  text: string;
  /** Words for a statement, chars for a short label. See SplitText. */
  by?: "word" | "char";
  /** The element the heading actually is — h2, p, span. */
  as?: ElementType;
  /** Milliseconds before the first piece moves. */
  offset?: number;
  className?: string;
}

/**
 * A statement that assembles itself as it arrives.
 *
 * The hero equivalent runs off a CSS load animation and needs no JavaScript
 * at all; this is the version for statements further down a page, where
 * there is something to wait for. It reuses the same observer as every other
 * reveal — one data attribute flip, no scroll listener — and the same split
 * markup, so the two read identically.
 *
 * Reserve it for the sentence a section is built around. Applied to every
 * heading it stops being emphasis and becomes a house style, and a reader
 * scrolling a long page would watch the same trick fire a dozen times.
 */
export function TextReveal({
  text,
  by = "char",
  as: Tag = "span",
  offset = 0,
  className = "",
}: TextRevealProps) {
  const ref = useReveal<HTMLElement>(true, "kinetic");

  return (
    <Tag
      ref={ref}
      className={className}
      style={offset ? ({ "--kinetic-offset": `${offset}ms` } as CSSProperties) : undefined}
    >
      {/* Headings are title-cased at the point the string enters the
          heading — see lib/titleCase. */}
      <SplitText text={titleCase(text)} by={by} />
    </Tag>
  );
}
