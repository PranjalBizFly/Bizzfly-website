import { Section } from "@/components/layout/Section";
import { Heading, BodyText } from "@/components/typography";
import { CtaBlock } from "@/components/buttons";
import { Magnetic, TextReveal } from "@/components/motion";
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
  /*
   * md, not lg. The band's content is a heading, a lead and a button —
   * about 182px at desktop — and lg spacing wrapped that in 272px of
   * padding, so 60% of the band was air. lg is sized for sections that
   * carry content; this one is a punctuation mark, and it appears on
   * nearly every page, so the difference is ~96px × 300 pages of scroll
   * that was not doing any work.
   */
  return (
    <Section background="inverse" spacing="md">
      <div className={styles.conversion}>
        <div>
          <Heading level={2} size="h2" className={styles.conversionTitle}>
            {/* Letter by letter, the same treatment every section-opening
                heading on the site carries. See SectionHeader. */}
            <TextReveal text={title} />
          </Heading>
          <BodyText size="lg" className={styles.conversionLead}>
            {lead}
          </BodyText>
        </div>
        <div>
          {/*
            The only magnetic element on a page, and the reason the effect
            still reads as deliberate: this is the last thing the page asks
            for, it sits alone in a dark band with nothing competing for the
            pointer, and there is no list of siblings for it to look like one
            of. It leans about eight pixels and never changes size, so the
            target stays exactly where it was aimed. Pointer-capability gated
            and reduced-motion gated inside the component — on a touch device
            no listener is attached at all.
          */}
          <Magnetic strength={8} padding={24}>
            <CtaBlock cta={cta} size="lg" />
          </Magnetic>
        </div>
      </div>
    </Section>
  );
}
