import { Section } from "@/components/layout/Section";
import { Heading, BodyText } from "@/components/typography";
import { CtaBlock } from "@/components/buttons";
import type { Cta } from "@/types/content";
import styles from "./Sections.module.css";

interface ConversionBandProps {
  title?: string;
  lead?: string;
  cta?: Cta;
}

const defaultCta: Cta = {
  label: "Book a consultation",
  href: "/contact/",
  tier: "T4",
  note: "30 minutes. We will tell you where the gaps are.",
};

/**
 * S-17 Conversion Band. Appears on every page except conversion pages
 * themselves. CTA is tier-matched to the page.
 */
export function ConversionBand({
  title = "Tell us what you are trying to solve",
  lead = "Describe the problem in your own words. If we are not the right people for it, we will say so.",
  cta = defaultCta,
}: ConversionBandProps) {
  return (
    <Section background="inverse" spacing="lg">
      <div className={styles.conversion}>
        <div>
          <Heading level={2} size="h2" className={styles.conversionTitle}>
            {title}
          </Heading>
          <BodyText size="lg" className={styles.conversionLead}>
            {lead}
          </BodyText>
        </div>
        <div>
          <CtaBlock cta={cta} size="lg" />
        </div>
      </div>
    </Section>
  );
}
