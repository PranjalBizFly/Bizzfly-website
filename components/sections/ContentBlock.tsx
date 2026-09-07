import type { ReactNode } from "react";
import styles from "./Sections.module.css";

interface ContentBlockProps {
  children: ReactNode;
  className?: string;
}

/** Measure-enforced prose. Required for any run over 120 words. */
export function ContentBlock({ children, className = "" }: ContentBlockProps) {
  return (
    <div className={`${styles.contentBlock} prose ${className}`.trim()}>
      {children}
    </div>
  );
}
