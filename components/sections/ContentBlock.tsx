import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";
import styles from "./Sections.module.css";

interface ContentBlockProps {
  children: ReactNode;
  className?: string;
}

/**
 * Measure-enforced prose. Required for any run over 120 words.
 *
 * Revealed as one block rather than line by line: this is a single passage of
 * writing, and cascading its paragraphs would animate a reader through a
 * sentence they had already started reading.
 */
export function ContentBlock({ children, className = "" }: ContentBlockProps) {
  return (
    <Reveal className={`${styles.contentBlock} prose ${className}`.trim()}>
      {children}
    </Reveal>
  );
}
