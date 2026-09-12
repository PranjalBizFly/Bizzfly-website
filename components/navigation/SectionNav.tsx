import Link from "next/link";
import { anchorId } from "@/lib/slug";
import styles from "./SectionNav.module.css";
import { titleCase } from "@/lib/titleCase";

export interface SectionNavItem {
  label: string;
  /** Anchor on this page, or a full path to another one. */
  href?: string;
  id?: string;
  count?: number;
}

interface SectionNavProps {
  /** What the row is a list of, e.g. "Jump to a business model". */
  label: string;
  items: SectionNavItem[];
  className?: string;
}

/**
 * Category navigation for a hub page.
 *
 * A hub that lists 26 industries or 145 resources has already made a decision
 * about how they group; this puts that decision at the top of the page
 * instead of leaving the reader to scroll until they find out. It is also the
 * other half of the mega menu's category links — the menu sends people to
 * `/industries/#regulated-and-professional`, and this is what tells them the
 * page is organised that way once they arrive.
 *
 * Anchors are derived from the group headings through the same helper the
 * Directory renders its ids with, so a renamed group moves both ends at once.
 */
export function SectionNav({ label, items, className = "" }: SectionNavProps) {
  if (items.length === 0) return null;

  return (
    <nav className={`${styles.wrap} ${className}`.trim()} aria-label={label}>
      <p className={styles.label}>{titleCase(label)}</p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href ?? `#${item.id ?? anchorId(item.label)}`}
              className={styles.link}
            >
              {titleCase(item.label)}
              {typeof item.count === "number" ? (
                <span className={styles.count}>{item.count}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
