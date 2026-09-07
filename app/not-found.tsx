import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Heading, BodyText, Eyebrow } from "@/components/typography";
import { Button, ButtonGroup, TextLink } from "@/components/buttons";
import { RelatedContent } from "@/components/sections";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section spacing="xl" width="content">
      <Eyebrow>Error 404</Eyebrow>
      <Heading level={1} size="h1">
        That page does not exist
      </Heading>
      <BodyText size="lg" muted className={styles.lead}>
        The link may be outdated, or the page may have moved. Here is where most
        people are trying to get to.
      </BodyText>

      <div className={styles.actions}>
        <ButtonGroup>
          <Button href="/" withArrow>
            Back to home
          </Button>
          <TextLink href="/search/">Search the site</TextLink>
        </ButtonGroup>
      </div>

      <div className={styles.related}>
        <RelatedContent
          items={[
            {
              label: "Services",
              href: "/services/",
              type: "SECTION",
              description: "What we do, across six practices",
            },
            {
              label: "Industries",
              href: "/industries/",
              type: "SECTION",
              description: "Sector-specific problems and approaches",
            },
            {
              label: "Use cases",
              href: "/use-cases/",
              type: "SECTION",
              description: "Start from the problem you have",
            },
          ]}
        />
      </div>
    </Section>
  );
}
