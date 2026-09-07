import type { ReactNode } from "react";

interface EyebrowProps {
  className?: string;
  children: ReactNode;
}

/** Monospaced section label. The "systems" half of the brand personality. */
export function Eyebrow({ className = "", children }: EyebrowProps) {
  return <p className={`t-eyebrow ${className}`.trim()}>{children}</p>;
}
