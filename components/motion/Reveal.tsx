"use client";

import type { ElementType, ReactNode } from "react";
import type { CSSProperties } from "react";
import { useReveal } from "./useReveal";
import styles from "./Reveal.module.css";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  direction?: Direction;
  delay?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

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
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${className}`.trim()}
      style={{ ...offsets[direction], "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Convenience wrappers over the same primitive — no extra JS. */
export function FadeIn({ children, ...rest }: Omit<RevealProps, "direction">) {
  return (
    <Reveal direction="none" {...rest}>
      {children}
    </Reveal>
  );
}

export function SlideIn({ children, ...rest }: RevealProps) {
  return <Reveal {...rest}>{children}</Reveal>;
}
