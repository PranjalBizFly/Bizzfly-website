import Link from "next/link";
import { anchorId } from "@/lib/slug";
import styles from "./Directory.module.css";

export interface DirectoryGroup {
  heading: string;
  headingHref?: string;
  /**
   * Anchor target, so the mega menu and the hub's own context navigation can
   * link to a group rather than only to the top of the page. Defaults to the
   * heading; set it explicitly when the heading carries a count, which would
   * otherwise bake "-24" into the URL and break it on the next publish.
   */
  id?: string;
  items: { label: string; href: string; note?: string }[];
}

interface DirectoryProps {
  groups: DirectoryGroup[];
  /** Adds a numeric index before each group heading. */
  numbered?: boolean;
  className?: string;
}

/**
 * S-19 Directory — the complete set, densely.
 *
 * Every hub on this site has to list everything it owns, because a page that
 * is not linked from its own index is an orphan no matter how good it is.
 * The editorial list used for that does not survive the content volume: at
 * 26 industries it measured 7,848px in one section, and at 146 resources the
 * resources page reached 34,354px. Nobody scrolls that; the completeness
 * stops being a service to the reader and becomes a wall.
 *
 * So the pattern splits. An editorial list carries a small chosen set with
 * room to explain each one, and this carries the rest — grouped, in columns,
 * one line per entry. Same links, roughly a fifth of the height, and it
 * reads as a directory rather than as an argument that ran on too long.
 *
 * Deliberately not a card: no border box, no padding, no shadow. The group
 * heading and the column rule do the structural work.
 */
export function Directory({ groups, numbered = false, className = "" }: DirectoryProps) {
  return (
    <div className={`${styles.directory} ${className}`.trim()}>
      {groups.map((group, index) => (
        <section
          key={group.heading}
          id={group.id ?? anchorId(group.heading)}
          className={styles.group}
        >
          <h3 className={styles.heading}>
            {numbered ? (
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            {group.headingHref ? (
              <Link href={group.headingHref} className={styles.headingLink}>
                {group.heading}
              </Link>
            ) : (
              group.heading
            )}
          </h3>

          <ul className={styles.items}>
            {group.items.map((item) => (
              <li key={item.href} className={styles.item}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
                {item.note ? <span className={styles.note}>{item.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
