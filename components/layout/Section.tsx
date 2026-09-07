import type { ReactNode, ElementType } from "react";
import { Container } from "./Container";
import styles from "./Section.module.css";

type Background = "bg" | "surface" | "inverse" | "inverse-alt";
type Spacing = "sm" | "md" | "lg" | "xl";
type Width = "full" | "wide" | "default" | "content" | "text" | "narrow";

interface SectionProps {
  background?: Background;
  spacing?: Spacing;
  width?: Width;
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Sets the inverse token context so children never branch on "am I dark".
 * See styles/tokens.css .is-inverse.
 */
const backgroundClass: Record<Background, string> = {
  bg: "",
  surface: styles.surface ?? "",
  inverse: `${styles.inverse ?? ""} is-inverse`,
  "inverse-alt": `${styles.inverseAlt ?? ""} is-inverse-alt`,
};

const spacingClass: Record<Spacing, string> = {
  sm: styles.sm ?? "",
  md: styles.md ?? "",
  lg: styles.lg ?? "",
  xl: styles.xl ?? "",
};

export function Section({
  background = "bg",
  spacing = "md",
  width = "default",
  as: Tag = "section",
  id,
  className = "",
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`${styles.section} ${spacingClass[spacing]} ${backgroundClass[background]} ${className}`.trim()}
    >
      <Container width={width}>{children}</Container>
    </Tag>
  );
}
