import type { ReactNode } from "react";

type Level = 1 | 2 | 3 | 4;
type Size = "display-xl" | "display-lg" | "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  /** Semantic level — decoupled from visual size so hierarchy stays correct. */
  level: Level;
  size?: Size;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Heading({ level, size, id, className = "", children }: HeadingProps) {
  const Tag = `h${level}` as const;
  const visual = size ?? (`h${level}` as Size);

  /*
   * The heading text is passed through exactly as it was authored.
   *
   * This used to run every plain-string heading through titleCase(), so that
   * "Four jobs, in the order they actually matter" reached the DOM as "Four
   * Jobs, In The Order They Actually Matter". Since h1/h2/h3 now render in
   * capitals from base.css, that transform changes nothing a reader sees — the
   * two strings are pixel-identical under text-transform — while still being
   * the version a screen reader announces and the version that feeds anything
   * reading heading text off the page. Sentence case is what the copy was
   * written in, so it is what ships.
   */
  return (
    <Tag id={id} className={`t-${visual} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
