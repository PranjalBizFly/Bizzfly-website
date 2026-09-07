import type { Cta } from "@/types/content";
import { Button } from "./Button";
import { TextLink } from "./TextLink";
import styles from "./Button.module.css";

interface CtaBlockProps {
  cta: Cta;
  size?: "lg" | "md";
}

/**
 * Renders a CTA at the variant its tier demands.
 * T0/T1 -> text link. T2/T3 -> secondary. T4/T5 -> primary.
 */
export function CtaBlock({ cta, size = "md" }: CtaBlockProps) {
  const isLow = cta.tier === "T0" || cta.tier === "T1";
  const isHigh = cta.tier === "T4" || cta.tier === "T5";

  if (isLow) {
    return <TextLink href={cta.href}>{cta.label}</TextLink>;
  }

  return (
    <div>
      <Button
        href={cta.href}
        variant={isHigh ? "primary" : "secondary"}
        size={size}
        withArrow
      >
        {cta.label}
      </Button>
      {cta.note ? <span className={styles.note}>{cta.note}</span> : null}
    </div>
  );
}
