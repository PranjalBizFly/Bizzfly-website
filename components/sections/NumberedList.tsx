import Link from "next/link";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import styles from "./Sections.module.css";

export interface NumberedEntry {
  index: string;
  title: string;
  description: string;
  href: string;
  /** Inline link rail — more information in less space than a card grid. */
  rail?: { label: string; href: string }[];
}

interface NumberedListProps {
  items: NumberedEntry[];
}

/**
 * S-01 Numbered Editorial List.
 * The default for capabilities and services — see design principle P4.
 * Not a card grid.
 */
export function NumberedList({ items }: NumberedListProps) {
  return (
    <StaggerGroup as="ul" className={styles.numbered}>
      {items.map((item, i) => (
        <StaggerItem as="li" key={item.href} index={i} className={styles.numberedItem}>
          <div className={styles.numberedLink}>
            <span className={styles.numberedIndex}>{item.index}</span>
            <Link href={item.href} className={styles.numberedTitle}>
              {item.title}
            </Link>
            <span className={styles.numberedDescription}>{item.description}</span>
            <span className={styles.numberedArrow} aria-hidden="true">
              &rarr;
            </span>
            {item.rail?.length ? (
              <span className={styles.rail}>
                {item.rail.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.railLink}>
                    {link.label}
                  </Link>
                ))}
              </span>
            ) : null}
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
