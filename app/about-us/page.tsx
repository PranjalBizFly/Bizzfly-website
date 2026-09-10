import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  EditorialBlock,
  ConversionBand,
  RelatedContent,
  VisualStoryBlock,
} from "@/components/sections";
import { Heading, BodyText } from "@/components/typography";
import { CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { getCompanyImage } from "@/content/images";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import styles from "./about-us.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "About Us",
    description:
      "BizzFly is a Pune-based digital growth and technology company working across search visibility, websites, software and business automation.",
    primaryTopic: "About BizzFly",
    secondaryTopics: ["company", "digital growth agency Pune"],
    intent: "navigational",
  },
  "/about-us/",
  { kind: "company" },
);

const cta = {
  label: "Book a consultation",
  href: "/contact/",
  tier: "T4" as const,
  note: "Thirty minutes on the problem, not a pitch.",
};

const relatedLinks = [
  { label: "Our Approach", href: "/our-approach/", type: "COMPANY" as const },
  { label: "How We Work", href: "/how-we-work/", type: "COMPANY" as const },
  { label: "Discovery Process", href: "/discovery-process/", type: "COMPANY" as const },
  { label: "Services", href: "/services/", type: "SECTION" as const },
  { label: "Contact", href: "/contact/", type: "CONTACT" as const },
];

export default function AboutUsPage() {
  const companyVisual = getCompanyImage("about");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Us",
          description:
            "BizzFly is a Pune-based digital growth and technology company working across search visibility, websites, software and business automation.",
          url: `${site.url}/about-us/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      <EditorialHero
        eyebrow="Company"
        title="About Us"
        lead="BizzFly is a Pune-based digital growth and technology company. We make businesses discoverable across search and AI platforms, then build the websites, software and automation that turn that discovery into revenue."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/*
        01 — the problem first, on the dark ground. The page's whole argument
        is that two things are usually solved separately and therefore badly,
        so naming that is what everything after it answers.
      */}
      <Section background="inverse" spacing="lg" width="content">
        <EditorialBlock
          eyebrow="01 / The problem"
          title="The same underlying problem in a different costume"
          lead="Most companies we work with are hard to find, and the systems behind them were not built for the volume they now need to handle. Those two things are usually treated as separate disciplines by separate suppliers, which is why neither gets solved properly."
        />
      </Section>

      {/* 02 — the answer, set against the frame so the page changes shape. */}
      {companyVisual ? (
        <Section spacing="lg" width="content">
          <VisualStoryBlock
            image={companyVisual}
            variant="C"
            priority
            eyebrow="02 / What we do about it"
            title="We work across both"
            lead="The same team that finds the crawl problem capping your visibility can fix the template causing it. The same engagement that improves your search presence can build the automation that answers the enquiries it produces."
            caption={companyVisual.caption}
          />
        </Section>
      ) : null}

      {/*
        03 — the argument for why the combination matters now. This is the
        most distinctive claim on the page, so it gets a section rather than
        a fourth paragraph in a column.
      */}
      <Section background="tint" spacing="lg" width="content">
        <EditorialBlock
          eyebrow="03 / Why now"
          title="Engineering problems wearing a marketing hat"
          lead="Discovery is moving from a list of links to a generated answer, and the qualities that earn a citation from an AI system — a clear entity, structured content, machine-readable data, server-rendered pages — are engineering problems, not campaign work."
        />
      </Section>

      <Section background="surface" spacing="lg">
        <SectionHeader
          split
          eyebrow="04 / What we optimise for"
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

      {/* 05 — the plain facts, as evidence rather than a closing paragraph. */}
      <Section spacing="lg" width="content">
        <EditorialBlock
          eyebrow="05 / The company"
          title={`Founded by ${site.founder}, operating from Pune`}
          lead="We work with mid-market businesses across manufacturing, real estate, education and professional services."
          evidence={[
            `Founder — ${site.founder}`,
            "Base — Pune, Maharashtra, India",
            "Clients — mid-market businesses",
            "Sectors — manufacturing, real estate, education, professional services",
          ]}
        />
      </Section>

      <Section background="surface" spacing="md">
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      <ConversionBand cta={cta} />
    </>
  );
}
