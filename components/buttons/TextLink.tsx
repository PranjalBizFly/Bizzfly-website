import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface TextLinkProps {
  href: string;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

/** Low-friction CTA for tiers T0/T1. Not every link becomes a button. */
export function TextLink({
  href,
  withArrow = true,
  className = "",
  children,
}: TextLinkProps) {
  return (
    <Link href={href} className={`${styles.textLink} ${className}`.trim()}>
      {children}
      {withArrow ? (
        <span className={styles.arrow} aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}
