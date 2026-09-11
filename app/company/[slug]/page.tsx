import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { ExploreNext } from "@/components/navigation";
import { EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  ProcessBlock,
  ConversionBand,
  RelatedContent,
  FAQBlock,
  EmptyState,
  AnchoredStatement,
  ClaimCriteria,
} from "@/components/sections";
import { ReadingProgress } from "@/components/motion";
import { Heading, BodyText } from "@/components/typography";
import { CtaBlock, Button, TextLink } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { allCompanyPages, getCompanyPage } from "@/content/company";
import { getCompanyImage } from "@/content/images";
import { isPublished } from "@/lib/registry";
import { readParagraphs, readsAsSequence } from "@/lib/prose";
import { serviceLink } from "@/lib/relationships";
import type { RelatedLink } from "@/types/content";
import { expandFaqs } from "@/lib/faqs";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";
import styles from "./company-page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const RELOCATED_COMPANY_SLUGS = new Set([
  "about",
  "approach",
  "how-we-work",
  "discovery-process",
  "engagement-models",
  "careers",
]);

/** Unknown slugs 404 at the routing layer — see /services/[slug]. */
export const dynamicParams = false;

export function generateStaticParams() {
  return allCompanyPages
    .filter((page) => isPublished(page) && !RELOCATED_COMPANY_SLUGS.has(page.slug))
    .map((page) => ({ slug: page.slug }));
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
      "Regular checkpoints against agreed commercial measures: enquiries, response times, hours removed. Not activity reports.",
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
  if (!page || !isPublished(page) || RELOCATED_COMPANY_SLUGS.has(slug)) notFound();

  /* Authored FAQs topped up from the page's own content — see lib/faqs.ts. */
  const faqs = expandFaqs(page, "company");

  const isLegal = page.section === "legal";
  const isCareers = page.section === "careers";

  const relatedServices = (page.relatedServices ?? [])
    .map(serviceLink)
    .filter((l): l is RelatedLink => l !== null);

  const companyVisual = getCompanyImage(slug);

  /*
   * Whether the body numbers itself. Two of these pages do — the criteria
   * composition suits those and the statement composition suits the rest.
   */
  const bodyReadsAsSequence = readsAsSequence(readParagraphs(page.body ?? []));

  /*
   * A reading indicator, on the same terms the resource template uses: only
   * where the page is long enough for a reader to lose their place in it.
   *
   * Several of these are the longest single columns of prose on the site —
   * the policies, the transparency pages — and they were the only long-form
   * template without one. Below the threshold the bar is not rendered at all
   * rather than sitting at a permanent 100%, which is what a progress
   * indicator on a two-screen page amounts to.
   *
   * The bar itself is a CSS scroll-driven animation: no listener, no JS, and
   * it is hidden outright under reduced motion. See ReadingProgress.
   */
  const showProgress = readParagraphs(page.body ?? []).length >= 5;

  return (
    <>
      {showProgress ? <ReadingProgress /> : null}
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
      <JsonLd data={faqSchema(faqs)} />

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

      {/*
        The frame and the argument are one composition.

        This was two sections, then three. First a banner photograph in a band
        of its own and a column of prose in a band under it — neither
        supporting the other. Then the frame took the opening paragraph as a
        lead and the remaining three or four ran on as plain paragraphs in a
        reading column below, which left the photograph illustrating one
        sentence and the rest of the page back to "heading, paragraph,
        paragraph, paragraph".

        AnchoredStatement takes the whole argument: the frame on one side at
        the same weight as the writing, the opening claim carrying the
        emphasis it was written with, and the rest of the paragraphs beneath
        it. Where the paragraphs are numbered by their own author — "The
        first…", "The second…" — the criteria composition is used instead,
        the same rule the practice pages follow.
      */}
      {page.body?.length ? (
        bodyReadsAsSequence ? (
          <Section spacing="lg">
            <ClaimCriteria paragraphs={page.body} label={page.title} claimLevel={2} />
          </Section>
        ) : (
          <Section spacing="lg">
            <AnchoredStatement
              paragraphs={page.body}
              image={companyVisual}
              note={companyVisual?.topic}
            />
          </Section>
        )
      ) : null}

      {/* Approach: process-led composition */}
      {slug === "approach" ? (
        <>
          <Section spacing="lg">
            <SectionHeader
              split
              eyebrow="Process"
              title="How an engagement runs"
              lead="Five stages. The first two are the ones most suppliers skip, and the reason most engagements miss."
            />
            <ProcessBlock steps={engagement} label="How an engagement runs" />
          </Section>

          {relatedServices.length > 0 ? (
            <Section background="surface" spacing="md">
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
        <Section spacing="lg">
          <EmptyState
            title="No current openings"
            body="We are not hiring for a specific role at the moment. We would still rather hear from someone good than miss them because the timing did not line up. Tell us what you want to work on and we will keep it on file."
            actions={
              <div className={styles.actions}>
                <Button href="/contact/" withArrow>
                  Introduce yourself
                </Button>
                <TextLink href="/our-approach/">How we work</TextLink>
              </div>
            }
          />
        </Section>
      ) : null}

      {/* About: verified values only */}
      {slug === "about" ? (
        <Section background="tint" spacing="lg">
          <SectionHeader
            split
            eyebrow="What we optimise for"
            title="Three things we hold engagements to"
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

      {faqs.length ? (
        <Section spacing="lg">
          <SectionHeader split eyebrow="Frequently Asked Questions" title="Frequently Asked Questions" />
          <FAQBlock faqs={faqs} />
        </Section>
      ) : null}

      {page.related?.length ? (
        <Section background="surface" spacing="sm">
          <RelatedContent mode="split" heading="Related" items={page.related} />
        </Section>
      ) : null}

      {/*
        Legal pages are excluded: nobody reading the privacy policy wants to
        be walked to the terms as "next", and the pair would read as content
        rather than as the boilerplate it is.
      */}
      {!isLegal ? (
        <Section spacing="md">
          <ExploreNext href={`/company/${slug}/`} />
        </Section>
      ) : null}

      {/*
        Company pages explain how we operate. The useful next step is not
        "what are you trying to solve" but a chance to test whether the way
        of working described above actually holds up in conversation.
      */}
      {!isLegal ? (
        <ConversionBand
          title="Test whether this holds up in practice"
          lead="Everything above is how we say we work. Thirty minutes on a real problem is the fastest way to find out whether it is also how we behave — and it costs you nothing to check."
          cta={page.cta}
        />
      ) : null}
    </>
  );
}
