import Link from "next/link";
import { Reveal } from "@/components/motion";
import { publishedEntries } from "@/lib/registry";
import { SECTION_HUB } from "@/lib/search";
import styles from "./ExploreNext.module.css";
import { titleCase } from "@/lib/titleCase";
import { Button } from "@/components/buttons";

interface ExploreNextProps {
  /** The page this is rendered on, so it can find its own neighbours. */
  href: string;
  /** Overrides the label on the way back to the section index. */
  allLabel?: string;
}

/**
 * Explore next — the way out of a leaf page that is not the CTA.
 *
 * Every detail page on this site ended the same way: related content, then a
 * conversion band. Both are answers to "what else is relevant" and "will you
 * buy". Neither answers "I have finished reading this one, what is the next
 * one" — the question a reader working through a section actually has, and
 * the reason they otherwise go back to the hub and start scanning again.
 *
 * The order is the registry's own, so it matches the order the hub lists them
 * in and the order search groups them by. Ends of a section are handled by
 * wrapping rather than by hiding a slot: an empty half reads as a bug, and a
 * reader at the last industry still wants a next industry.
 */
export function ExploreNext({ href, allLabel }: ExploreNextProps) {
  const current = publishedEntries.find((entry) => entry.href === href);
  if (!current) return null;

  /*
   * Siblings by display category, not by registry kind. A glossary entry and
   * a guide are both kind "resource", but they are shown as different
   * sections everywhere else on the site — walking one into the other would
   * send a reader from a definition to a 2,000-word framework and call it
   * the next page.
   */
  const siblings = publishedEntries.filter(
    (entry) => entry.category === current.category,
  );
  const index = siblings.findIndex((entry) => entry.href === href);

  /* Fewer than three and "previous / next" is just the same two links twice. */
  if (index === -1 || siblings.length < 3) return null;

  const previous = siblings[(index - 1 + siblings.length) % siblings.length]!;
  const next = siblings[(index + 1) % siblings.length]!;
  const section = current.category;
  const hub = SECTION_HUB[section] ?? "/search/";

  return (
    <Reveal as="nav" className={styles.wrap} aria-label={`More in ${section}`}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>Explore Next</p>
        <Button href={hub} variant="secondary" size="sm" withArrow>
          {allLabel ?? `All ${siblings.length} ${section.toLowerCase()}`}
        </Button>
      </div>

      <div className={styles.pair}>
        <Link href={previous.href} className={styles.card} data-direction="previous">
          <span className={styles.direction}>
            <span aria-hidden="true">&larr;</span> Previous
          </span>
          <span className={styles.title}>{titleCase(previous.title)}</span>
          <span className={styles.description}>{previous.description}</span>
        </Link>

        <Link href={next.href} className={styles.card} data-direction="next">
          <span className={styles.direction}>
            Next <span aria-hidden="true">&rarr;</span>
          </span>
          <span className={styles.title}>{titleCase(next.title)}</span>
          <span className={styles.description}>{next.description}</span>
        </Link>
      </div>
    </Reveal>
  );
}
