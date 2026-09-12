import Link from "next/link";
import type { ReactNode } from "react";
import { titleCaseLabel } from "@/lib/titleCase";
import styles from "./Button.module.css";

interface TextLinkProps {
  href: string;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * The trailing CTA, as an outlined button.
 *
 * This was underlined text plus an arrow. It is the same link in the same
 * place — only the presentation changed — and it borrows the button system's
 * own `secondary` variant rather than declaring a second outlined look, so
 * there is one definition of what an outlined control is on this site and it
 * inherits the ground handling, the focus ring and the press feedback for
 * free. `md` rather than `sm`, because these are the standalone end-of-section
 * CTAs and 44px is the target size the rest of the site is held to.
 */
export function TextLink({
  href,
  withArrow = true,
  className = "",
  children,
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={`${styles.base} ${styles.secondary} ${styles.md} ${className}`.trim()}
    >
      {/* Cased here for the same reason as Button — see the note there. */}
      {titleCaseLabel(children)}
      {withArrow ? (
        <span className={styles.arrow} aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}
