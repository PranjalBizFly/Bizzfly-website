import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { HomeHero } from "@/components/hero";
import {
  SectionHeader,
  NumberedList,
  CapabilityGroups,
  VisibilitySpectrum,
  ProblemList,
  StageList,
  JourneyList,
  TrustStandard,
  RelatedContent,
  ConversionBand,
  type NumberedEntry,
} from "@/components/sections";
import { TextLink } from "@/components/buttons";
import { BodyText } from "@/components/typography";
import { JsonLd } from "@/components/JsonLd";
import { industries } from "@/content/industries";
import { technologies } from "@/content/technologies";
import { resources } from "@/content/resources";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Digital Growth, AI & Automation",
  description:
    "BizzFly makes businesses visible across search and AI platforms, then builds the websites, software and automation that turn that visibility into revenue.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "BizzFly — Digital Growth, AI & Automation",
    description:
      "Get found across search and AI answers. Build the digital experience behind it. Automate the work that follows.",
    images: [
      {
        url: "/og/?title=Get%20found.%20Build%20well.%20Automate%20the%20rest.&kind=BizzFly",
        width: 1200,
        height: 630,
        alt: "BizzFly — digital growth, AI, automation and technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BizzFly — Digital Growth, AI & Automation",
    description:
      "Get found across search and AI answers. Build the digital experience behind it. Automate the work that follows.",
    images: [
      "/og/?title=Get%20found.%20Build%20well.%20Automate%20the%20rest.&kind=BizzFly",
    ],
  },
};

const industryEntries: NumberedEntry[] = industries.map((industry, index) => ({
  index: String(index + 1).padStart(2, "0"),
  title: industry.title,
  description: industry.problems[0]?.description ?? industry.answer,
  href: `/industries/${industry.slug}/`,
  rail: industry.problems.slice(0, 3).map((problem) => ({
    label: problem.title,
    href: `/industries/${industry.slug}/`,
  })),
}));

export default function HomePage() {
  return (
    <>
      {/* Homepage is the entity anchor; WebPage ties it to the Organization. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${site.url}/#webpage`,
          url: site.url,
          name: `${site.name} — Digital Growth, AI & Automation`,
          description: site.description,
          isPartOf: { "@id": `${site.url}/#website` },
          about: { "@id": `${site.url}/#organization` },
        }}
      />

      {/* 01 — Hero. Text LCP, no entrance animation, meaningful diagram. */}
      <HomeHero />

      {/* 02 — What BizzFly does, grouped by the job to be done */}
      <Section spacing="lg" id="what-we-do">
        <SectionHeader
          split
          eyebrow="What we do"
          title="Four jobs, in the order they actually matter"
          lead="Visibility with nothing behind it wastes budget. A good website nobody finds wastes more. We work across all four because in practice they are one problem."
        />
        <CapabilityGroups />
      </Section>

      {/*
        03 — Signature section: the discoverability spectrum.
        This is the AI and search narrative, which is the one subject that
        earns a heavier ground. It sits on the deep indigo context, where
        the brand purple does the rules and green carries the accents.
      */}
      <Section background="inverse-alt" spacing="lg" id="visibility">
        <SectionHeader
          split
          eyebrow="Discoverability"
          title="SEO was one surface. Now there are five."
          lead="These are not five names for the same work. Each layer describes a different retrieval mechanism, and a business can be strong on one and invisible on the next."
        />
        <VisibilitySpectrum />
      </Section>

      {/* 04 — The visitor's problems, in their words */}
      <Section spacing="lg" id="problems">
        <SectionHeader
          split
          eyebrow="Sound familiar?"
          title="Your customers do not discover businesses the way they used to"
          lead="Most engagements start with one of these sentences. Each links to how we would approach it."
        />
        <ProblemList />
      </Section>

      {/* 05 — By business situation. No pricing, no packages. */}
      <Section background="surface" spacing="lg" id="stages">
        <SectionHeader
          split
          eyebrow="Where you are"
          title="The right work depends on the constraint you actually have"
          lead="Businesses move between these. The mistake is buying the work that suits the stage you wish you were at."
        />
        <StageList />
      </Section>

      {/* 06 — Industries */}
      <Section spacing="lg" id="industries">
        <SectionHeader
          split
          eyebrow="Industries"
          title="Context matters more than templates"
          lead="A manufacturer and an education group have almost nothing in common except that both are hard to find. We publish a sector page only where we can name that sector's real problems in its own vocabulary."
        />
        <NumberedList items={industryEntries} />
        <div className={styles.sectionFooter}>
          <TextLink href="/industries/">All industries</TextLink>
        </div>
      </Section>

      {/*
        07 — Technology. Typography carries this section, not a background:
        it used to be 2,157px of saturated brand purple, which read as a
        template rather than an engineering practice.
      */}
      <Section background="bg" spacing="lg" id="technology">
        <SectionHeader
          split
          eyebrow="Technology"
          title="We are not a marketing agency with a developer attached"
          lead="The same team that finds the crawl problem capping your visibility can fix the template causing it. Every technology page states what we use, why, and when we would tell you to use something else."
        />
        <NumberedList
          items={technologies.map((technology, index) => ({
            index: String(index + 1).padStart(2, "0"),
            title: technology.title,
            description: technology.answer,
            href: `/technologies/${technology.slug}/`,
          }))}
        />
        <div className={styles.sectionFooter}>
          <TextLink href="/technologies/">All technologies</TextLink>
        </div>
      </Section>

      {/* 08 — Routing by intent */}
      <Section spacing="lg" id="journeys">
        <SectionHeader
          split
          eyebrow="Start here"
          title="What are you trying to do?"
          lead="Pick the sentence closest to your situation."
        />
        <JourneyList />
      </Section>

      {/* 09 — Trust. No invented proof; the standard is stated instead. */}
      <Section background="surface" spacing="lg" id="trust">
        <SectionHeader
          split
          eyebrow="Proof"
          title="What we will show you, and what we will not"
          lead="We have no client-approved case studies published yet. Rather than fill this space with logos and numbers we cannot evidence, here is the standard we hold ourselves to."
        />
        <TrustStandard />
      </Section>

      {/* 10 — Insights */}
      <Section spacing="lg" id="insights">
        <SectionHeader
          split
          eyebrow="Insights"
          title="What we have worked out, written down"
          lead="Nothing here is gated. If content is worth reading, putting a form in front of it just means fewer people read it."
        />
        <RelatedContent
          items={resources.slice(0, 3).map((resource) => ({
            label: resource.title,
            href: `/resources/${resource.slug}/`,
            type: resource.type === "glossary" ? "GLOSSARY" : "ARTICLE",
            description: resource.answer,
          }))}
        />
        <div className={styles.sectionFooter}>
          <TextLink href="/resources/">All resources</TextLink>
        </div>
      </Section>

      {/* 11 — Closing CTA */}
      <ConversionBand
        title="Ready to build what comes next?"
        lead="Tell us what you are trying to solve, in your own words. If we are not the right people for it, we will say so and point you somewhere better."
        cta={{
          label: "Let's Talk",
          href: "/contact/",
          tier: "T4",
          note: "30 minutes. We reply within one business day.",
        }}
      />

      <Section spacing="sm" width="content">
        <BodyText size="sm" muted className={styles.closingNote}>
          Prefer to look around first?{" "}
          <Link href="/services/" className={styles.inlineLink}>
            Explore what we do
          </Link>{" "}
          or{" "}
          <Link href="/use-cases/" className={styles.inlineLink}>
            start from the problem you have
          </Link>
          .
        </BodyText>
      </Section>
    </>
  );
}
