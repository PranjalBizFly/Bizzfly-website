import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  ProcessBlock,
  ConversionBand,
  RelatedContent,
} from "@/components/sections";
import { Button, TextLink } from "@/components/buttons";
import { BodyText, Heading } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { publishedCaseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";
import { primaryCta } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./case-studies.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Case studies",
    description:
      "How BizzFly publishes client work — verified metrics with sources, named challenges, and written client approval before anything goes live.",
    primaryTopic: "client case studies",
    secondaryTopics: ["client work", "results", "proof"],
    intent: "commercial",
  },
  "/case-studies/",
);

/** The publishing standard. Stated because there is nothing to show yet. */
const standard = [
  {
    index: 1,
    title: "The client, named or honestly anonymised",
    description:
      "A named client where permitted, otherwise a real description such as a 200-person manufacturer in Pune. Never an invented company.",
  },
  {
    index: 2,
    title: "The problem and the starting position",
    description:
      "What was actually wrong, including the constraints we had to work within.",
  },
  {
    index: 3,
    title: "What we did, in sequence",
    description:
      "The decisions taken and the alternatives rejected, not a list of activities.",
  },
  {
    index: 4,
    title: "What went wrong",
    description:
      "Mandatory. Every real project has a section like this, and its absence is the clearest signal a case study has been invented.",
  },
  {
    index: 5,
    title: "Results with sources",
    description:
      "Every metric carries a before value, an after value, a measurement window and a source. A number without those does not appear.",
  },
];

export default function CaseStudiesPage() {
  const hasPublished = publishedCaseStudies.length > 0;
  const [featured, ...rest] = publishedCaseStudies;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "BizzFly case studies",
          url: `${site.url}/case-studies/`,
          about: { "@id": `${site.url}/#organization` },
        }}
      />

      <EditorialHero
        eyebrow="Work"
        title="Client work, published honestly"
        lead="We publish a case study only when the client has approved it in writing and every number in it has a source and a measurement window. That is a slower way to build a portfolio, and the only one worth trusting."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Case studies" }]}
        actions={
          <Button href={primaryCta.href} withArrow>
            {primaryCta.label}
          </Button>
        }
      />

      {hasPublished && featured ? (
        <>
          {/* Featured: full editorial composition, not a card */}
          <Section spacing="lg">
            <article className={styles.featured}>
              <div className={styles.featuredMeta}>
                <span className={styles.featuredLabel}>Featured</span>
                <span className={styles.featuredSector}>{featured.industry}</span>
              </div>
              <h2 className={styles.featuredTitle}>
                <Link href={`/case-studies/${featured.slug}/`}>
                  {featured.title}
                </Link>
              </h2>
              <p className={styles.featuredAnswer}>{featured.answer}</p>
              <TextLink href={`/case-studies/${featured.slug}/`}>
                Read the full story
              </TextLink>
            </article>
          </Section>

          {rest.length > 0 ? (
            <Section background="surface" spacing="lg">
              <SectionHeader split eyebrow="Directory" title="More client work" />
              <RelatedContent
                mode="list"
                items={rest.map((study) => ({
                  label: study.title,
                  href: `/case-studies/${study.slug}/`,
                  type: study.industry.toUpperCase(),
                  description: study.answer,
                }))}
              />
            </Section>
          ) : null}
        </>
      ) : (
        /*
          Designed proof-pending state. The previous site carried eleven
          fabricated case studies from theme demo content; an honest empty
          section is recoverable, a fabricated one is not.
        */
        <Section spacing="lg">
          <div className={styles.pending}>
            <Heading level={2} size="h3" className={styles.pendingTitle}>
              Our first case studies are in preparation
            </Heading>
            <BodyText className={styles.pendingBody}>
              We are collecting written client approval and verified metrics
              before publishing. Rather than fill this page with placeholder
              work, here is exactly what we will publish when it is ready — and
              what we would expect any agency to show you.
            </BodyText>
            <div className={styles.pendingActions}>
              <Button href="/contact/" withArrow>
                Ask about work in your sector
              </Button>
              <TextLink href="/company/approach/">See how we work</TextLink>
            </div>
          </div>
        </Section>
      )}

      <Section background={hasPublished ? "bg" : "surface"} spacing="lg">
        <SectionHeader
          split
          eyebrow="Our standard"
          title="What goes into a BizzFly case study"
          lead="Every one of these sections is mandatory. A case study with no challenges section reads as fiction to anyone who has run a project."
        />
        <ProcessBlock steps={standard} />
      </Section>

      {/* Sector routing, so an empty portfolio is still a useful page */}
      <Section background="inverse" spacing="lg">
        <SectionHeader
          split
          eyebrow="In the meantime"
          title="See how we approach work in your sector"
          lead="Each industry page names the problems we actually see there and the capabilities that address them."
        />
        <RelatedContent
          mode="list"
          items={industries.map((industry) => ({
            label: industry.title,
            href: `/industries/${industry.slug}/`,
            type: "INDUSTRY",
            description: industry.problems[0]?.title,
          }))}
        />
      </Section>

      <ConversionBand
        title="Want to know whether we have solved your problem before?"
        lead="Ask us directly. We will tell you what we have done in your sector, and where we have not worked before."
      />
    </>
  );
}
