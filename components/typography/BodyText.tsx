import type { ReactNode } from "react";

type Size = "lg" | "base" | "sm";

interface BodyTextProps {
  size?: Size;
  muted?: boolean;
  className?: string;
  children: ReactNode;
}

const sizeClass: Record<Size, string> = {
  lg: "t-body-lg",
  base: "t-body",
  sm: "t-body-sm",
};

export function BodyText({
  size = "base",
  muted = false,
  className = "",
  children,
}: BodyTextProps) {
  return (
    <p className={`${sizeClass[size]} ${muted ? "t-muted" : ""} ${className}`.trim()}>
      {children}
    </p>
  );
}
