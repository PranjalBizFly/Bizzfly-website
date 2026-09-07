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
  return (
    <Tag id={id} className={`t-${visual} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
