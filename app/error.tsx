"use client";

import { useEffect } from "react";
import { Section } from "@/components/layout/Section";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { Button, ButtonGroup, TextLink } from "@/components/buttons";
import { site } from "@/content/site";
import styles from "./error.module.css";

/**
 * Route error boundary.
 *
 * Shows a designed state with a real way forward — never a stack trace, and
 * never a blank screen. The error digest is surfaced quietly so a visitor can
 * quote it when they get in touch.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logged for observability. No stack trace is rendered to the visitor.
    console.error(error);
  }, [error]);

  return (
    <Section spacing="xl" width="content">
      <Eyebrow>Something went wrong</Eyebrow>
      <Heading level={1} size="h1" className={styles.title}>
        This page did not load
      </Heading>
      <BodyText size="lg" muted className={styles.lead}>
        The problem is on our side, not yours. Try again — and if it keeps
        happening, tell us and we will fix it.
      </BodyText>

      <div className={styles.actions}>
        <ButtonGroup>
          <Button onClick={reset} withArrow>
            Try again
          </Button>
          <TextLink href="/">Back to home</TextLink>
        </ButtonGroup>
      </div>

      <p className={styles.contact}>
        Still stuck? Email{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        {error.digest ? (
          <>
            {" "}
            and quote reference <code className={styles.digest}>{error.digest}</code>.
          </>
        ) : (
          "."
        )}
      </p>
    </Section>
  );
}
