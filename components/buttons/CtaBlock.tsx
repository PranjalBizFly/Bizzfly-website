import type { Cta } from "@/types/content";
import { ConsultationCta, isConsultationCta } from "@/components/consultation";
import { Button } from "./Button";
import { TextLink } from "./TextLink";
import styles from "./Button.module.css";
import { titleCase } from "@/lib/titleCase";

interface CtaBlockProps {
  cta: Cta;
  size?: "lg" | "md";
}

/**
 * Renders a CTA at the variant its tier demands.
 * T0/T1 -> text link. T2/T3 -> secondary. T4/T5 -> primary.
 *
 * A CTA that asks for a consultation opens the booking dialog instead of
 * navigating to the contact page. It is still rendered as a link to that
 * page — see ConsultationCta — so the behaviour is an enhancement rather
 * than a replacement, and nothing about the low-tier text link changes.
 */
export function CtaBlock({ cta, size = "md" }: CtaBlockProps) {
  const isLow = cta.tier === "T0" || cta.tier === "T1";
  const isHigh = cta.tier === "T4" || cta.tier === "T5";

  if (isLow) {
    return <TextLink href={cta.href}>{titleCase(cta.label)}</TextLink>;
  }

  const variant = isHigh ? "primary" : "secondary";

  if (isConsultationCta(cta)) {
    return (
      <div>
        <ConsultationCta
          href={cta.href}
          variant={variant}
          size={size}
          withArrow
          source={cta.label}
        >
          {titleCase(cta.label)}
        </ConsultationCta>
        {cta.note ? <span className={styles.note}>{cta.note}</span> : null}
      </div>
    );
  }

  return (
    <div>
      <Button
        href={cta.href}
        variant={variant}
        size={size}
        withArrow
      >
        {titleCase(cta.label)}
      </Button>
      {cta.note ? <span className={styles.note}>{cta.note}</span> : null}
    </div>
  );
}
