import type { ContentSection } from "@/types/content";
import { Section } from "@/components/layout/Section";
import { getPracticeSectionImage } from "@/content/images";
import { readParagraphs, readsAsSequence } from "@/lib/prose";
import { AnchoredStatement } from "./AnchoredStatement";
import { ClaimCriteria } from "./ClaimCriteria";

interface PracticeNarrativeProps {
  /** The practice's slug, used to resolve each section's own frame. */
  slug: string;
  /** The authored sections, in order. */
  sections: readonly ContentSection[];
}

/**
 * The explanatory body of a practice page.
 *
 * This replaces a run of `ProseSections`, which rendered every section the
 * same way — an H2, two or three paragraphs, and where the section had them a
 * bulleted list underneath. On a practice page that is three or four
 * identical blocks and up to 570 words in one column, with the enumerated
 * points stranded below prose that had already moved past them.
 *
 * Two compositions, chosen per section by what the section is rather than
 * alternated for effect:
 *
 *   - A section whose paragraphs are numbered by their own author — "The most
 *     common failure is sequencing", "The second is entity ambiguity", "The
 *     third is measuring only what is easy" — is a set of criteria and reads
 *     as one. Its heading and frame take the split, and the criteria sit
 *     beneath at reading width. `readsAsSequence` detects it.
 *
 *   - Everything else is a statement with its supporting detail: the frame
 *     and the section's own points on one side, the argument on the other.
 *
 * The frame alternates sides and the ground alternates behind it, so no two
 * adjacent sections share a composition or a background. Each section has its
 * own photograph — none is the practice's hero image reused, and none appears
 * anywhere else on the site.
 *
 * Nothing is rewritten. Headings are the authored headings, paragraphs are
 * verbatim and points are the authored points. See lib/prose for the single
 * transformation: the opening paragraph's first sentence is marked so it can
 * carry the emphasis, inside the same paragraph it was written in.
 */
export function PracticeNarrative({ slug, sections }: PracticeNarrativeProps) {
  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section, i) => {
        const image = getPracticeSectionImage(slug, i + 1);
        const ground = i % 2 === 0 ? "bg" : "surface";
        const reverse = i % 2 === 1;

        /*
         * The frame's floating label: what the picture shows, taken from the
         * registry. This slot is where a template invites a fabricated
         * statistic, and BizzFly has none verified for publication — see
         * content/site.ts `unverified`.
         */
        const note = image?.topic;

        const isCriteria =
          !section.points?.length && readsAsSequence(readParagraphs(section.body));

        if (isCriteria) {
          return (
            <Section key={section.heading} background={ground} spacing="lg">
              <AnchoredStatement
                title={section.heading}
                image={image}
                note={note}
                reverse={reverse}
              >
                <ClaimCriteria
                  paragraphs={section.body}
                  label={section.heading}
                  columns={1}
                />
              </AnchoredStatement>
            </Section>
          );
        }

        return (
          <Section key={section.heading} background={ground} spacing="lg">
            <AnchoredStatement
              title={section.heading}
              paragraphs={section.body}
              points={section.points}
              image={image}
              note={note}
              reverse={reverse}
            />
          </Section>
        );
      })}
    </>
  );
}
