import Link from "next/link";
import { Cascade } from "@/components/motion";
import type { RelatedLink } from "@/types/content";
import type { ResolvedRelationships } from "@/lib/relationships";
import styles from "./Sections.module.css";
import related from "./RelatedContent.module.css";
import { titleCase } from "@/lib/titleCase";

/**
 * Presentation modes.
 * Not every relationship should be a card — the mode is chosen per page so
 * related sections do not become the same block repeated site-wide.
 */
export type RelatedMode =
  | "editorial" // three columns with type tag and description
  | "list" // numbered rows, denser
  | "inline" // comma-separated text links inside prose
  | "compact" // horizontal chips
  | "map" // grouped by dimension, the relationship view
  | "split"; // heading left, links right

/*
 * A NOTE ON THE BAND THIS SITS IN.
 *
 * In "split" mode this renders a short heading and two to four links — about
 * 90 to 145px of content. Every call site used to place it in a `spacing="md"`
 * Section, which adds 129px of vertical padding, so the band measured 211 to
 * 342px with between 38% and 61% of its height being air. Across fourteen
 * pages it was the lowest content density on the site: 14.8 at its worst,
 * against 50 to 90 for an ordinary editorial band.
 *
 * The call sites now pass `spacing="sm"`. The whitespace that remains is the
 * separation this band genuinely needs from the conversion band beneath it;
 * what went was the part that was only there because `md` is the default
 * reach for a section.
 *
 * It is recorded here rather than at each call site because the cause is the
 * component's size, not any one page's layout.
 */
interface RelatedContentProps {
  items: RelatedLink[];
  mode?: RelatedMode;
  heading?: string;
}

export function RelatedContent({
  items,
  mode = "editorial",
  heading,
}: RelatedContentProps) {
  if (items.length === 0) return null;

  if (mode === "inline") {
    return (
      <p className={related.inline}>
        {heading ? <span className={related.inlineLabel}>{heading} </span> : null}
        {items.map((item, index) => (
          <span key={item.href}>
            <Link href={item.href} className={related.inlineLink}>
              {item.label}
            </Link>
            {index < items.length - 1 ? <span aria-hidden="true">, </span> : null}
          </span>
        ))}
      </p>
    );
  }

  if (mode === "compact") {
    return (
      <div className={related.compact}>
        {heading ? <p className={related.compactLabel}>{heading}</p> : null}
        <ul className={related.chips}>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={related.chip}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (mode === "list") {
    return (
      <Cascade as="ul" className={related.rows}>
        {items.map((item, index) => (
          <li key={item.href} className={related.row}>
            <Link href={item.href} className={related.rowLink}>
              <span className={related.rowIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={related.rowBody}>
                <span className={related.rowTitle}>{item.label}</span>
                {item.description ? (
                  <span className={related.rowDescription}>{item.description}</span>
                ) : null}
              </span>
              {item.type ? (
                <span className={related.rowType}>{item.type}</span>
              ) : null}
              <span className={related.rowArrow} aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </Cascade>
    );
  }

  if (mode === "split") {
    return (
      <div className={related.split}>
        {heading ? (
          <h2 className={related.splitHeading}>{titleCase(heading)}</h2>
        ) : null}
        <Cascade as="ul" className={related.splitList}>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={related.splitLink}>
                {item.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              {item.description ? (
                <span className={related.splitDescription}>{item.description}</span>
              ) : null}
            </li>
          ))}
        </Cascade>
      </div>
    );
  }

  /* Default: editorial three-column */
  return (
    <Cascade className={styles.related}>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={styles.relatedItem}>
          {item.type ? <span className={styles.relatedType}>{item.type}</span> : null}
          <span className={styles.relatedTitle}>
            {item.label}
            <span className={styles.relatedArrow} aria-hidden="true">
              &rarr;
            </span>
          </span>
          {item.description ? (
            <span className={styles.relatedDescription}>{item.description}</span>
          ) : null}
        </Link>
      ))}
    </Cascade>
  );
}

/* ========================================================================== */

interface RelationshipMapProps {
  relationships: ResolvedRelationships;
  /** Dimensions to show, in order. Omitted dimensions are skipped. */
  show?: ("services" | "industries" | "useCases" | "technologies" | "resources")[];
}

const GROUP_LABEL = {
  services: "Related services",
  industries: "Relevant industries",
  useCases: "Related use cases",
  technologies: "Technologies involved",
  resources: "Further reading",
} as const;

/**
 * The relationship map — the cross-linking engine made visible.
 * Groups every dimension into one scannable block so a visitor can move
 * sideways across the architecture rather than only up and down it.
 */
export function RelationshipMap({
  relationships,
  show = ["services", "industries", "useCases", "technologies"],
}: RelationshipMapProps) {
  const groups = show
    .map((key) => ({ key, label: GROUP_LABEL[key], items: relationships[key] }))
    .filter((group) => group.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <Cascade className={related.map} data-groups={groups.length}>
      {groups.map((group) => (
        <section key={group.key} className={related.mapGroup}>
          <h3 className={related.mapHeading}>{titleCase(group.label)}</h3>
          <ul className={related.mapList}>
            {group.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={related.mapLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Cascade>
  );
}
