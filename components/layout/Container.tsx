import type { ReactNode, ElementType } from "react";

type ContainerWidth = "full" | "wide" | "default" | "content" | "text" | "narrow";

interface ContainerProps {
  width?: ContainerWidth;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function Container({
  width = "default",
  as: Tag = "div",
  className = "",
  children,
}: ContainerProps) {
  return (
    <Tag className={`container container--${width} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
