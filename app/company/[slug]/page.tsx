import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  ProcessBlock,
  ContentBlock,
  ConversionBand,
  RelatedContent,
  FAQBlock,
  EmptyState,
} from "@/components/sections";
import { Heading, BodyText } from "@/components/typography";
import { CtaBlock, Button, TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { allCompanyPages, getCompanyPage } from "@/content/company";
import { isPublished } from "@/lib/registry";
import { serviceLink } from "@/lib/relationships";
import type { RelatedLink } from "@/types/content";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./company-page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Unknown slugs 404 at the routing layer — see /services/[slug]. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allCompanyPages.filter(isPublished).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCompanyPage(slug);
  if (!page) return {};
  return buildMetadata(page.seo, `/company/${slug}/`, { kind: "company" });
}

/** The engagement sequence, shown on the approach page. */
const engagement = [
  {
    index: 1,
    title: "First conversation",
    description:
      "Thirty minutes on the problem, not a pitch. If we are not the right people for it, we say so and point you elsewhere.",
    duration: "Week 0",
  },
  {
    index: 2,
    title: "Diagnosis",
    description:
      "We establish what is actually wrong before proposing work. You keep the findings whether or not you continue.",
    duration: "Weeks 1–2",
  },
  {
    index: 3,
    title: "Scoped proposal",
    description:
      "What we will do, what we will not do, what it costs and how long it takes. Boundaries stated in writing.",
    duration: "Week 2",
  },
  {
    index: 4,
    title: "Delivery",
    description:
      "Regular checkpoints against agreed commercial measures — enquiries, response times, hours removed. Not activity reports.",
    duration: "Weeks 3–12",
  },
  {
    index: 5,
    title: "Handover",
    description:
      "Documentation and training so your team can run what we built. Intellectual property is yours from day one.",
    duration: "On completion",
  },
];

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getCompanyPage(slug);
  if (!page || !isPublished(page)) notFound();

  const isLegal = page.section === "legal";
  const isCareers = page.section === "careers";

  const relatedServices = (page.relatedServices ?? [])
    .map(serviceLink)
    .filter((l): l is RelatedLink => l !== null);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": isLegal ? "WebPage" : "AboutPage",
          name: page.title,
          description: page.seo.description,
          url: `${site.url}/company/${slug}/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
      <JsonLd data={faqSchema(page.faqs ?? [])} />

      <EditorialHero
        eyebrow={page.eyebrow ?? "Company"}
        title={page.title}
        lead={page.answer}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company/" },
          { label: page.title },
        ]}
        actions={isLegal ? undefined : <CtaBlock cta={page.cta} size="lg" />}
      />

      {page.body?.length ? (
        <Section spacing="lg" width="text">
          <ContentBlock>
            {page.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </ContentBlock>
        </Section>
      ) : null}

      {/* Approach: process-led composition */}
      {slug === "approach" ? (
        <>
          <Section background="surface" spacing="lg">
            <SectionHeader
              split
              eyebrow="Process"
              title="How an engagement runs"
              lead="Five stages. The first two are the ones most suppliers skip, and the reason most engagements miss."
            />
            <ProcessBlock steps={engagement} />
          </Section>

          {relatedServices.length > 0 ? (
            <Section spacing="md">
              <SectionHeader
                eyebrow="Applied"
                title="The same method across every practice"
                level={2}
              />
              <RelatedContent mode="list" items={relatedServices} />
            </Section>
          ) : null}
        </>
      ) : null}

      {/* Careers: opportunity-led, with an honest no-openings state */}
      {isCareers ? (
        <Section background="surface" spacing="lg">
          <EmptyState
            title="No current openings"
            body="We are not hiring for a specific role at the moment. We would still rather hear from someone good than miss them because the timing did not line up — tell us what you want to work on and we will keep it on file."
            actions={
              <div className={styles.actions}>
                <Button href="/contact/" withArrow>
                  Introduce yourself
                </Button>
                <TextLink href="/company/approach/">How we work</TextLink>
              </div>
            }
          />
        </Section>
      ) : null}

      {/* About: verified values only */}
      {slug === "about" ? (
        <Section background="surface" spacing="lg">
          <SectionHeader
            split
            eyebrow="What we optimise for"
            title="Three things we hold every engagement against"
          />
          <div className={styles.values}>
            {site.values.map((value, index) => (
              <div key={value.title} className={styles.value}>
                <span className={styles.valueIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Heading level={3} size="h3">
                  {value.title}
                </Heading>
                <BodyText muted className={styles.valueBody}>
                  {value.description}
                </BodyText>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {page.faqs?.length ? (
        <Section spacing="lg">
          <SectionHeader split eyebrow="Questions" title="Common questions" />
          <FAQBlock faqs={page.faqs} />
        </Section>
      ) : null}

      {page.related?.length ? (
        <Section background="surface" spacing="md">
          <RelatedContent mode="split" heading="Related" items={page.related} />
        </Section>
      ) : null}

      {!isLegal ? <ConversionBand cta={page.cta} /> : null}
    </>
  );
}
