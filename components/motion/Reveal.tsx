"use client";

import type { ElementType, ReactNode } from "react";
import type { CSSProperties } from "react";
import { useReveal } from "./useReveal";
import styles from "./Reveal.module.css";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  direction?: Direction;
  delay?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & /**
 * Anything else the rendered element needs — an id, an aria-label, a role.
 * Without this the wrapper could only ever be a plain div, which forces an
 * extra element around every landmark that wants to animate. Intersected
 * rather than declared as an index signature, which would widen `children`
 * to unknown for every caller.
 */ Record<string, unknown>;

const offsets: Record<Direction, CSSProperties> = {
  up: { "--reveal-y": "var(--reveal-distance)" } as CSSProperties,
  down: { "--reveal-y": "calc(var(--reveal-distance) * -1)" } as CSSProperties,
  left: { "--reveal-x": "var(--reveal-distance)", "--reveal-y": "0px" } as CSSProperties,
  right: {
    "--reveal-x": "calc(var(--reveal-distance) * -1)",
    "--reveal-y": "0px",
  } as CSSProperties,
  none: { "--reveal-y": "0px" } as CSSProperties,
};

export function Reveal({
  direction = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${className}`.trim()}
      style={{ ...offsets[direction], "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Convenience wrappers over the same primitive — no extra JS. */
export function FadeIn({ children, ...rest }: RevealProps) {
  return (
    <Reveal {...rest} direction="none">
      {children}
    </Reveal>
  );
}

export function SlideIn({ children, ...rest }: RevealProps) {
  return <Reveal {...rest}>{children}</Reveal>;
}
