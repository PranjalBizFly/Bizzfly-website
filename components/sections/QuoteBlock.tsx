import styles from "./Sections.module.css";

interface QuoteBlockProps {
  quote: string;
  attribution?: string;
}

/**
 * S-10 Pull Quote. No quotation-mark graphic, no avatar.
 * Only renders with a real, attributed quote — never placeholder testimonials.
 */
export function QuoteBlock({ quote, attribution }: QuoteBlockProps) {
  return (
    <figure className={styles.quote}>
      <blockquote>
        <p className={`t-quote ${styles.quoteText}`}>{quote}</p>
      </blockquote>
      {attribution ? (
        <figcaption className={styles.quoteAttribution}>{attribution}</figcaption>
      ) : null}
    </figure>
  );
}
