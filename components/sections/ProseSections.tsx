import type { ContentSection } from "@/types/content";
import { Section } from "@/components/layout/Section";
import { Reveal, TextReveal } from "@/components/motion";
import styles from "./ProseSections.module.css";

interface ProseSectionsProps {
  sections: ContentSection[];
  /**
   * Alternating grounds are set by the caller, because only the page knows
   * what sits above and below this run.
   */
  background?: "bg" | "surface" | "tint";
}

/**
 * The explanatory body of a page.
 *
 * Every other block on an entity page renders a list — problems, scope,
 * process steps. Lists state facts; they cannot carry an argument, which is
 * why pages built only from them read as specifications rather than as
 * something written for a reader.
 *
 * Each section keeps its own H2 so the page has a real outline for both a
 * reader skimming and an extractor looking for the passage that answers a
 * question. The measure is held to a reading column even though the section
 * around it is wider — long prose set to 1,280px is not read, it is scanned.
 */
export function ProseSections({ sections, background = "bg" }: ProseSectionsProps) {
  if (sections.length === 0) return null;

  return (
    <Section background={background} spacing="lg" width="content">
      <div className={styles.stack}>
        {sections.map((section, index) => (
          <Reveal key={section.heading} as="section" delay={index === 0 ? 0 : 60}>
            <h2 className={styles.heading}>
              <TextReveal text={section.heading} />
            </h2>

            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            {section.points?.length ? (
              <ul className={styles.points}>
                {section.points.map((point) => (
                  <li key={point} className={styles.point}>
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
