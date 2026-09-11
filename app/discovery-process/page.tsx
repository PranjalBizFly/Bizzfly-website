import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SplitHero } from "@/components/hero";
import {
  ConversionBand,
  EditorialBlock,
  RelatedContent,
  SectionHeader,
  VisualStoryBlock,
} from "@/components/sections";
import { HorizontalStory } from "@/components/motion";
import { CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { getCompanyImage } from "@/content/images";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  {
    title: "Discovery Process",
    description:
      "Two weeks to establish which constraint is actually binding, four layers examined in order, and a written diagnosis you keep either way.",
    primaryTopic: "discovery process",
    secondaryTopics: ["diagnosis", "engagement process"],
    intent: "commercial",
  },
  "/discovery-process/",
  { kind: "company" },
);

const cta = {
  label: "Start with a diagnostic",
  href: "/contact/",
  tier: "T3" as const,
  note: "Thirty minutes on the problem, not a pitch.",
};

/*
 * The four layers, in the order discovery examines them.
 *
 * This is the page's own sentence — "whether you can be found, whether what
 * people find is credible, whether it converts, and whether the operation
 * behind it can absorb more demand" — given the structure it was already
 * describing. The wording of each clause is unchanged; only its presentation
 * is, because a numbered sequence is what makes "the order matters" legible
 * at a glance rather than a claim buried mid-paragraph.
 */
const layers = [
  {
    index: 1,
    title: "Found",
    description: "Whether you can be found at all: in ranked results, and in the answers AI systems generate.",
    duration: "Layer one",
  },
  {
    index: 2,
    title: "Credible",
    description: "Whether what people find is credible once they reach it.",
    duration: "Layer two",
  },
  {
    index: 3,
    title: "Converts",
    description: "Whether that credibility turns into an enquiry rather than a visit that ends.",
    duration: "Layer three",
  },
  {
    index: 4,
    title: "Capacity",
    description: "Whether the operation behind it can absorb more demand once the first three are working.",
    duration: "Layer four",
  },
];

/*
 * What the hero's aside carries.
 *
 * It used to name the four layers, which the horizontal track in section 02
 * names again and explains — so the aside previewed a sequence the reader
 * was about to travel properly. These are discovery's commercial shape
 * instead: how long, what lands, and what happens to it if the engagement
 * stops. Each is one of the page's own sentences, and none of them is in
 * the four layers.
 */
const shapeFacts = [
  "Roughly two weeks end to end",
  "Produces a written diagnosis",
  "Yours whether or not the engagement continues",
];

const relatedLinks = [
  { label: "Our Approach", href: "/our-approach/", type: "COMPANY" as const },
  { label: "How We Work", href: "/how-we-work/", type: "COMPANY" as const },
  { label: "Engagement Models", href: "/engagement-models/", type: "COMPANY" as const },
  {
    label: "Digital Growth Audit Checklist",
    href: "/resources/digital-growth-audit-checklist/",
    type: "CHECKLIST" as const,
  },
];

export default function DiscoveryProcessPage() {
  const companyVisual = getCompanyImage("discovery-process");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Discovery Process",
          description:
            "Two weeks to establish which constraint is actually binding, four layers examined in order, and a written diagnosis you keep either way.",
          url: `${site.url}/discovery-process/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      {/*
        The four layers open the page as a specification beside the
        statement, so the sequence this methodology is built on is visible
        before the argument for it. The frame stays where it is: it belongs
        to the deliverable section, and it is also the homepage's growth
        engine image, which rules it out of a hero here.
      */}
      <SplitHero
        eyebrow="Methodology"
        title="Discovery Process"
        lead="Discovery establishes which constraint is actually binding before anything is proposed. It runs for roughly two weeks, produces a written diagnosis, and the findings are yours whether or not the engagement continues."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Discovery Process" }]}
        asideHeading="The shape of it"
        asideItems={shapeFacts}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/* 01 — the argument, set as one editorial statement rather than a column of prose. */}
      <Section spacing="lg" width="content">
        <EditorialBlock
          eyebrow="Why it exists"
          title="The purpose of discovery is to be able to say what is wrong with confidence"
          lead="That sounds obvious, and it is the step most commonly skipped: proposals are frequently written from a briefing call, which means the plan reflects what the client already believed rather than what the evidence shows."
        />
      </Section>

      {/* 02 — the sequence itself, on a tinted band so it reads as the centre of the page. */}
      <Section background="tint" spacing="lg" id="layers">
        <SectionHeader
          eyebrow="What we examine"
          title="Four layers, in order"
          lead="The order matters, because a constraint at an earlier layer makes work at a later one worthless."
        />
        {/*
          Read along an axis rather than down a spine.

          The page's whole claim is in its heading — "Four layers, in order" —
          and that each layer is worthless if an earlier one is constrained.
          A horizontal track makes the reader travel the order to see it,
          which is the one thing this section has to communicate, and it
          gives this page a composition neither the practice pages (a drawn
          ProcessBlock spine) nor Our Approach (a held PinnedStory rail) use.

          Native horizontal scroll, never scroll-jacked: swipe, trackpad,
          shift-wheel, arrow keys and the two buttons all move the same
          scrollLeft, and the page's own scrollbar keeps meaning what it
          always meant. Below the tablet breakpoint the axis is simply
          vertical — the same four layers, stacked.
        */}
        <HorizontalStory
          label="The four layers discovery examines"
          slides={layers.map((layer) => ({
            id: `layer-${layer.index}`,
            marker: layer.duration,
            title: layer.title,
            body: layer.description,
          }))}
        />
      </Section>

      {/* 03 — the deliverable, set against the frame so the page changes shape here. */}
      <Section spacing="lg" width="content">
        {companyVisual ? (
          <VisualStoryBlock
            image={companyVisual}
            variant="B"
            eyebrow="What you get"
            title="A written diagnosis"
            lead="What the binding constraint appears to be, what evidence supports that, what we would do about it, and what we would not do. It includes the things we think are fine, which is usually the part clients find most useful."
            caption={companyVisual.caption}
          />
        ) : (
          <EditorialBlock
            eyebrow="What you get"
            title="A written diagnosis"
            lead="What the binding constraint appears to be, what evidence supports that, what we would do about it, and what we would not do. It includes the things we think are fine, which is usually the part clients find most useful."
          />
        )}
      </Section>

      {/* 04 — the commercial boundary, closing the argument the hero opened. */}
      <Section background="surface" spacing="lg" width="content">
        <EditorialBlock
          eyebrow="How it is scoped"
          title="Discovery is deliberately separable"
          lead="It is scoped and priced on its own so that continuing is a decision made with the findings in hand rather than a commitment made before them. If the conclusion is that you do not need us, that is a legitimate result and we will say so."
          actions={<CtaBlock cta={cta} />}
        />
      </Section>

      <Section spacing="sm" width="content">
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      {/*
        The page has just explained a method. What it cannot tell a reader is
        which of the four layers is binding for them, and that is precisely
        what the first conversation is for.
      */}
      <ConversionBand
        title="Which of the four layers is binding for you?"
        lead="That is the question discovery exists to answer, and the first thirty minutes usually narrows it to one. Describe what is not working and we will tell you where we would start — and whether a diagnostic is worth buying at all."
        cta={cta}
      />
    </>
  );
}
