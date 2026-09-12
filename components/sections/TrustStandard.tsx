import Link from "next/link";
import { trustCommitments } from "@/content/homepage";
import { Glyph } from "@/components/brand/Glyph";
import { StaggerItem } from "@/components/motion";
import styles from "./TrustStandard.module.css";

/**
 * Section 13 — trust.
 *
 * BizzFly has no client-approved case studies published yet. Rather than
 * fabricate logos, ratings or metrics — the previous site carried eleven
 * fabricated case studies from theme demo content — this section states the
 * publishing standard, which is itself a credible trust signal and is true.
 *
 * When verified proof exists, this section is replaced by it.
 *
 * Composed as three panels on a staggered baseline rather than a level row.
 * Three equal boxes side by side is the single most template-looking
 * arrangement available and it gives three different commitments identical
 * weight; offsetting them and alternating the fill makes the eye move through
 * them in order, which is the order they are written in. The offsets are
 * desktop-only — on a phone the column already sequences them.
 */
export function TrustStandard() {
  return (
    <div className={styles.wrapper}>
      <ol className={styles.list}>
        {trustCommitments.map((commitment, index) => (
          <StaggerItem
            as="li"
            key={commitment.index}
            index={index}
            className={styles.item}
          >
            {/*
              The index is set large and low-contrast behind the title — an
              editorial folio rather than a badge. It is aria-hidden because
              the list is already ordered: a screen reader announces the
              position itself, and reading "zero one" first is noise.
            */}
            <span className={styles.index} aria-hidden="true">
              {commitment.index}
            </span>

            <Glyph className={styles.glyph} size="0.85rem" />

            <h3 className={styles.title}>{commitment.title}</h3>
            <p className={styles.body}>{commitment.body}</p>
          </StaggerItem>
        ))}
      </ol>

      <p className={styles.note}>
        We would rather show you nothing than show you something invented. Ask
        us directly about work in your sector and we will tell you what we have
        done, and where we have not worked before.{" "}
        <Link href="/case-studies/" className={styles.noteLink}>
          How We Publish Client Work
        </Link>
      </p>
    </div>
  );
}
