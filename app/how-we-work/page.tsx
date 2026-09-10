import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { EditorialHero } from "@/components/hero";
import {
  ConversionBand,
  EditorialBlock,
  NumberedList,
  RelatedContent,
  SectionHeader,
  VisualStoryBlock,
} from "@/components/sections";
import { CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { getCompanyImage } from "@/content/images";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "How We Work",
    description:
      "Our engagement process: diagnosis before proposal, boundaries stated in writing, and reporting against commercial measures rather than activity.",
    primaryTopic: "how BizzFly works",
    secondaryTopics: ["engagement process", "ways of working"],
    intent: "commercial",
  },
  "/how-we-work/",
  { kind: "company" },
);

const cta = {
  label: "Book a consultation",
  href: "/contact/",
  tier: "T4" as const,
  note: "Thirty minutes on the problem, not a pitch.",
};

/*
 * Three principles, each linking to the page that carries it in full.
 *
 * The page already made exactly these three commitments, one per paragraph.
 * Numbering them and giving each a destination turns a column of prose into
 * something a reader can scan and act on — and makes the page a hub for the
 * three it was already describing rather than a dead end. The descriptions
 * are the page's own sentences.
 */
const principles = [
  {
    index: "01",
    title: "Diagnosis before proposal",
    description:
      "We work in the other order. Diagnosis first, scoped proposal second. That means our first deliverable is usually a document telling you what is broken — including the parts we are not the right people to fix.",
    href: "/discovery-process/",
  },
  {
    index: "02",
    title: "Boundaries stated in writing",
    description:
      "Every proposal says what is out of scope as explicitly as what is in it. Naming the boundary early removes the most common source of disappointment in an engagement, and it is the fastest way to tell whether a supplier actually understands the work.",
    href: "/engagement-models/",
  },
  {
    index: "03",
    title: "Reporting against commercial measures",
    description:
      "We report against agreed commercial measures — enquiries, response times, hours removed — rather than against activity. A monthly report full of impressions and rankings that avoids the commercial question is a way of not being accountable.",
    href: "/our-approach/",
  },
];

const relatedLinks = [
  { label: "About Us", href: "/about-us/", type: "COMPANY" as const },
  { label: "Our Approach", href: "/our-approach/", type: "COMPANY" as const },
  { label: "Discovery Process", href: "/discovery-process/", type: "COMPANY" as const },
  {
    label: "Our Engineering Standards",
    href: "/technologies/engineering-standards/",
    type: "TECHNOLOGY" as const,
  },
  { label: "Contact", href: "/contact/", type: "CONTACT" as const },
];

export default function HowWeWorkPage() {
  const companyVisual = getCompanyImage("how-we-work");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How We Work",
          description:
            "Our engagement process: diagnosis before proposal, boundaries stated in writing, and reporting against commercial measures rather than activity.",
          url: `${site.url}/how-we-work/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      <EditorialHero
        eyebrow="Company"
        title="How We Work"
        lead="Every engagement starts with diagnosis, not a proposal. We spend the first two weeks establishing what is actually wrong, because fixing the wrong constraint is the expensive mistake — and you keep those findings whether or not you continue with us."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How We Work" }]}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/*
        01 — the failure mode first, on the dark ground. The page's argument
        only lands once the pattern it is refusing has been named, and stating
        it against the inverse surface gives the page somewhere to turn.
      */}
      <Section background="inverse" spacing="lg" width="content">
        <EditorialBlock
          eyebrow="01 / The pattern we avoid"
          title="Most agency relationships fail in the same predictable way"
          lead="A proposal is written before anyone understands the problem, the work is delivered against that proposal, and six months later the commercial result has not moved because the original diagnosis was wrong."
        />
      </Section>

      {/* 02 — the three commitments, numbered and each leading somewhere. */}
      <Section spacing="lg" id="principles">
        <SectionHeader
          eyebrow="02 / What we do instead"
          title="Three commitments, in the order they apply"
          lead="Each one exists because of a specific way engagements go wrong, and each is written into the proposal rather than left as intent."
        />
        <NumberedList items={principles} />
      </Section>

      {/* 03 — the frame, so the page changes shape before it closes. */}
      {companyVisual ? (
        <Section background="surface" spacing="lg" width="content">
          <VisualStoryBlock
            image={companyVisual}
            variant="D"
            eyebrow="03 / In practice"
            title="You keep the findings either way"
            lead="Discovery is scoped and priced on its own, so continuing is a decision made with the diagnosis in hand rather than a commitment made before it."
            caption={companyVisual.caption}
          />
        </Section>
      ) : null}

      <Section spacing="md" width="content">
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      <ConversionBand cta={cta} />
    </>
  );
}
