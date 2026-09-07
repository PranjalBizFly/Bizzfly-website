"use client";

import { Children, isValidElement } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "./useReveal";
import styles from "./Reveal.module.css";

interface StaggerGroupProps {
  /** Milliseconds between children. Defaults to --stagger-step. */
  step?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Assigns a --stagger-index to each child; the delay is computed in CSS and
 * capped at --stagger-max so long lists do not feel slow.
 */
export function StaggerGroup({
  step,
  as: Tag = "div",
  className = "",
  children,
}: StaggerGroupProps) {
  const style = step ? ({ "--stagger-step": `${step}ms` } as CSSProperties) : undefined;

  return (
    <Tag className={className} style={style}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        return <StaggerItem index={index}>{child}</StaggerItem>;
      })}
    </Tag>
  );
}

interface StaggerItemProps {
  index?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function StaggerItem({
  index = 0,
  as: Tag = "div",
  className = "",
  children,
}: StaggerItemProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${styles.staggerItem} ${className}`.trim()}
      style={{ "--stagger-index": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
