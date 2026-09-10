import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CinematicHero, EditorialHero } from "@/components/hero";
import {
  SectionHeader,
  ProcessBlock,
  ContentBlock,
  ConversionBand,
  RelatedContent,
  FAQBlock,
} from "@/components/sections";
import { CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { getCompanyImage } from "@/content/images";
import { serviceLink } from "@/lib/relationships";
import type { RelatedLink } from "@/types/content";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata(
  {
    title: "Our Approach",
    description:
      "Diagnosis before proposal, boundaries stated in writing, and reporting against commercial measures rather than activity.",
    primaryTopic: "how BizzFly approaches projects",
    secondaryTopics: ["methodology", "engagement process"],
    intent: "commercial",
  },
  "/our-approach/",
  { kind: "company" },
);

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

const faqs = [
  {
    question: "What happens in the first two weeks?",
    answer:
      "We audit the current position — technical health, visibility, conversion, and where the process actually loses time. The output is a document telling you what is broken, including the parts we are not the right people to fix. You keep it either way.",
  },
  {
    question: "Do you work on retainer or by project?",
    answer:
      "Both, depending on the work. Search and automation programmes suit a retainer because they compound; a website build or a software project suits a defined scope. We will tell you which fits rather than defaulting to whichever is more profitable for us.",
  },
  {
    question: "What if the diagnosis says we do not need you?",
    answer:
      "Then that is what the document says. It has happened, and it is a better outcome than six months of work against the wrong constraint.",
  },
];

const cta = {
  label: "Let's talk",
  href: "/contact/",
  tier: "T4" as const,
  note: "Thirty minutes on the problem, not a pitch.",
};

const relatedServices = ["seo", "custom-software", "workflow-automation"]
  .map(serviceLink)
  .filter((l): l is RelatedLink => l !== null);

const relatedLinks = [
  { label: "About Us", href: "/about-us/", type: "COMPANY" as const },
  { label: "How We Work", href: "/how-we-work/", type: "COMPANY" as const },
  {
    label: "Our Engineering Standards",
    href: "/technologies/engineering-standards/",
    type: "TECHNOLOGY" as const,
  },
  { label: "Services", href: "/services/", type: "SECTION" as const },
];

export default function OurApproachPage() {
  const companyVisual = getCompanyImage("approach");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Our Approach",
          description:
            "Diagnosis before proposal, boundaries stated in writing, and reporting against commercial measures rather than activity.",
          url: `${site.url}/our-approach/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
      <JsonLd data={faqSchema(faqs)} />

      {/*
        The engagement photograph opens the page instead of sitting in a band
        of its own halfway down it. It was doing nothing there — a picture
        with no argument beside it — and this page had no opening composition
        at all, which is what made it read as a document rather than as part
        of the same site as the homepage. The fact cards carry the three
        commitments the page already makes further down; none of them is a
        number this site cannot evidence.
      */}
      {companyVisual ? (
        <CinematicHero
          image={companyVisual}
          composition="inset"
          eyebrow="Company"
          title="Our Approach"
          lead="Every engagement starts with diagnosis rather than a proposal. We spend the first two weeks establishing which constraint is actually binding, because fixing the wrong one is the expensive mistake — and you keep those findings whether or not you continue with us."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Approach" }]}
          factsHeading="What that means in practice"
          facts={[
            { label: "Week 0", value: "Thirty minutes on the problem, not a pitch" },
            { label: "Weeks 1–2", value: "Diagnosis you keep either way" },
            { label: "Day one", value: "Intellectual property is yours" },
          ]}
          actions={<CtaBlock cta={cta} size="lg" />}
        />
      ) : (
        <EditorialHero
          eyebrow="Company"
          title="Our Approach"
          lead="Every engagement starts with diagnosis rather than a proposal. We spend the first two weeks establishing which constraint is actually binding, because fixing the wrong one is the expensive mistake — and you keep those findings whether or not you continue with us."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Approach" }]}
          actions={<CtaBlock cta={cta} size="lg" />}
        />
      )}

      {/*
        01 — the argument, as a section rather than as a column of text
        floating in the middle of the page. The claim is the heading and the
        reasoning sits beside it, which is the shape every argument on the
        homepage takes.
      */}
      <Section background="tint" spacing="lg">
        <SectionHeader
          split
          eyebrow="01 / Why this order"
          title="Most agency relationships fail the same way"
          lead="A proposal is written before anyone understands the problem, work is delivered against that proposal, and six months later the commercial result has not moved because the original diagnosis was wrong. The work was done competently; it was simply the wrong work."
        />
        <ContentBlock>
          <p>
            We run it in the other order. Diagnosis first, scoped proposal second. That means our
            first deliverable is usually a document telling you what is broken — including the
            parts we are not the right people to fix.
          </p>
        </ContentBlock>
      </Section>

      {/* 02 — the engagement itself, drawn as the path it is. */}
      <Section spacing="lg">
        <SectionHeader
          split
          eyebrow="02 / Process"
          title="How an engagement runs"
          lead="Five stages. The first two are the ones most suppliers skip, and the reason most engagements miss."
        />
        <ProcessBlock steps={engagement} label="How an engagement runs" />
      </Section>

      {relatedServices.length > 0 ? (
        <Section background="surface" spacing="lg">
          <SectionHeader
            split
            eyebrow="03 / Applied"
            title="The same method across every practice"
            lead="The order does not change with the discipline. What changes is what the diagnosis is looking at."
          />
          <RelatedContent mode="list" items={relatedServices} />
        </Section>
      ) : null}

      <Section spacing="lg">
        <SectionHeader split eyebrow="04 / Questions" title="Common Questions" />
        <FAQBlock faqs={faqs} />
      </Section>

      <Section background="surface" spacing="md">
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      <ConversionBand cta={cta} />
    </>
  );
}
