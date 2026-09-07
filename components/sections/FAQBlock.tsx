import type { Faq } from "@/types/content";
import styles from "./Sections.module.css";

interface FAQBlockProps {
  faqs: Faq[];
  /** First item open so the answer is in the DOM for extraction. */
  openFirst?: boolean;
}

/**
 * S-04 Accordion Set, using native <details> — keyboard accessible with
 * no JavaScript. Answers are rendered in the DOM regardless of open state.
 */
export function FAQBlock({ faqs, openFirst = true }: FAQBlockProps) {
  return (
    <div className={styles.faqList}>
      {faqs.map((faq, index) => (
        <details
          key={faq.question}
          className={styles.faqItem}
          open={openFirst && index === 0}
        >
          <summary className={styles.faqQuestion}>
            {faq.question}
            <span className={styles.faqMarker} aria-hidden="true">
              &#8250;
            </span>
          </summary>
          <div className={styles.faqAnswer}>
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
