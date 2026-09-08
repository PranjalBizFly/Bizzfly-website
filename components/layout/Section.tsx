import type { ReactNode, ElementType } from "react";
import { Container } from "./Container";
import styles from "./Section.module.css";

type Background = "bg" | "surface" | "tint" | "inverse" | "inverse-alt";
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
 * Sets the token context for the band so children never branch on what they
 * are sitting on. See .is-inverse, .is-inverse-alt and .is-tint in
 * styles/tokens.css.
 */
const backgroundClass: Record<Background, string> = {
  bg: "",
  surface: styles.surface ?? "",
  /*
   * No module class: .is-tint redefines --background, which .section already
   * paints, and the tinted band keeps whatever `spacing` it was given rather
   * than taking the fixed inset the dark bands use. A light band needs the
   * air; a dark one reads tighter without it.
   */
  tint: "is-tint",
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
