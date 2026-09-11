import type { ReactNode } from "react";
import { titleCase } from "@/lib/titleCase";

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
   * Headings are title-cased here rather than in the 1,100+ authored strings
   * that feed them, so the rule lives in one place and new copy inherits it.
   *
   * Only a plain string is transformed. Where a caller passes an element —
   * a TextReveal splitting the heading into letters, say — the string is
   * inside that component and is cased there instead; reaching into a child's
   * props from here would be guesswork about what the element is.
   */
  const content = typeof children === "string" ? titleCase(children) : children;

  return (
    <Tag id={id} className={`t-${visual} ${className}`.trim()}>
      {content}
    </Tag>
  );
}
