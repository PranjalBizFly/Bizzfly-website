import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { CinematicHero } from "@/components/hero";
import {
  ChoiceList,
  ConversionBand,
  EditorialBlock,
  LayerTabs,
  NumberedList,
  RelatedContent,
  SectionHeader,
  type LayerTabItem,
} from "@/components/sections";
import { CtaBlock } from "@/components/buttons";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { getPressKitImage } from "@/content/images/imageAssignments";
import { buildMetadata } from "@/lib/seo";
import styles from "./press-kit.module.css";

export const metadata: Metadata = buildMetadata(
  {
    title: "Press Kit",
    description:
      "Official BizzFly brand assets, company boilerplates, spokesperson background, and logo usage guidelines for media and partners.",
    primaryTopic: "BizzFly press kit",
    secondaryTopics: ["brand guidelines", "company boilerplate", "logo assets"],
    intent: "navigational",
  },
  "/press-kit/",
  { kind: "company" },
);

const cta = {
  label: "Download brand assets",
  href: "/icon.svg",
  tier: "T2" as const,
  note: "Official SVG vector mark.",
};

/*
 * The three boilerplates, as a switcher rather than three stacked blocks.
 *
 * An editor arrives needing exactly one of these lengths and copies it. Set
 * one under another they have to scroll past the two they do not want;
 * behind a rail they pick the length first. The text of each is unchanged.
 */
const boilerplates: LayerTabItem[] = [
  {
    code: "25 words",
    surface: "Short",
    name: "25-word overview",
    description:
      "BizzFly is a Pune-based digital growth and technology company that makes businesses discoverable across search and AI platforms, and builds software and automation to turn discovery into revenue.",
    facts: [{ label: "Use for", value: "Listings, event programmes, and speaker bios." }],
  },
  {
    code: "50 words",
    surface: "Standard",
    name: "50-word overview",
    description: `Founded by ${site.founder} in Pune, India, BizzFly helps mid-market businesses solve two interconnected constraints: discoverability in search and AI answer engines, and the web, software, and automation systems required to absorb incoming demand. Every engagement is delivered with diagnosis first, clear boundaries, and commercial accountability.`,
    facts: [{ label: "Use for", value: "Press releases and article standfirsts." }],
  },
  {
    code: "100 words",
    surface: "Full",
    name: "100-word overview",
    description:
      "BizzFly is a digital growth and technology company headquartered in Pune, Maharashtra. The firm bridges two traditionally fragmented disciplines: search discovery (including technical SEO, Answer Engine Optimisation, Generative Engine Optimisation, and Google Business Profiles) and engineering delivery (custom software, web application development, and business process automation). BizzFly works with mid-market businesses across manufacturing, real estate, education, and professional services, operating with a strict verification standard, written scopes, and reporting tied directly to commercial outcomes rather than vanity metrics.",
    facts: [{ label: "Use for", value: "Company profiles and background sections." }],
  },
];

/*
 * The four disciplines, each pointing at the practice that owns it — so the
 * list stops being a description and becomes the way into the site.
 */
const disciplines = [
  {
    index: "01",
    title: "Search & AI Visibility",
    description:
      "SEO, AEO, GEO, Local SEO, and search experience optimisation.",
    href: "/services/search-ai-visibility/",
  },
  {
    index: "02",
    title: "Web & Software Development",
    description:
      "Custom software, corporate web platforms, web applications, and UI/UX design.",
    href: "/services/software-development/",
  },
  {
    index: "03",
    title: "AI & Automation",
    description:
      "Business workflow automation, systems integration, and AI document processing.",
    href: "/services/ai-automation/",
  },
  {
    index: "04",
    title: "Growth & Analytics",
    description:
      "Digital strategy, conversion rate optimisation, and business intelligence.",
    href: "/services/data-analytics/",
  },
];

/*
 * What the hero's aside carries.
 *
 * It used to name the four disciplines, which section 03 lists again in
 * full. An editor opening a press kit is not there for the practice list —
 * they are there to get the name, the description and the assets right, and
 * these are the three things the page exists to settle. Each points at a
 * section below rather than duplicating one.
 */
const kitFacts = [
  "One word, uppercase B, uppercase F",
  "Three approved boilerplate lengths",
  "Logo assets with usage rules",
];

const relatedLinks = [
  { label: "Media", href: "/media/", type: "COMPANY" as const },
  { label: "About Us", href: "/about-us/", type: "COMPANY" as const },
  { label: "Our Approach", href: "/our-approach/", type: "COMPANY" as const },
  { label: "Services", href: "/services/", type: "SECTION" as const },
];

export default function PressKitPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Press Kit",
          description:
            "Official BizzFly brand assets, company boilerplates, spokesperson background, and logo usage guidelines for media and partners.",
          url: `${site.url}/press-kit/`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />

      <CinematicHero
        image={getPressKitImage()}
        composition="bleed-right"
        eyebrow="Company"
        title="BizzFly Press Kit & Brand Assets"
        lead="Official brand assets, company descriptions, leadership profiles, and usage standards for editors, conference organisers, and industry publications."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Press Kit" }]}
        factsHeading="What this kit settles"
        facts={kitFacts.map((fact) => ({ value: "✓", label: fact }))}
        actions={<CtaBlock cta={cta} size="lg" />}
      />

      {/*
        01 — the orthography rule, shown rather than listed. This is the one
        thing on the page a writer must get exactly right, so the correct and
        incorrect forms are set side by side at a size that can be checked at
        a glance instead of read.
      */}
      <Section spacing="lg" width="content" id="brand-name">
        <SectionHeader
          eyebrow="Brand name"
          title="One word, uppercase B, uppercase F"
          lead="The company name is written as BizzFly."
        />
        <div className={styles.orthography}>
          <div className={styles.correct}>
            <p className={styles.orthLabel}>Correct</p>
            <p className={styles.orthValue}>BizzFly</p>
          </div>
          <div className={styles.incorrect}>
            <p className={styles.orthLabel}>Incorrect</p>
            <ul className={styles.orthList}>
              <li>Bizzfly</li>
              <li>BIZZFLY</li>
              <li>Bizz Fly</li>
              <li>Bizz-Fly</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 02 — pick the length you need, then copy it. */}
      <Section background="tint" spacing="lg" id="boilerplates">
        <SectionHeader
          eyebrow="Company boilerplates"
          title="Three approved descriptions"
          lead="Choose the length the piece needs. Each is approved for publication as written."
        />
        <LayerTabs label="Company boilerplate lengths" items={boilerplates} />
      </Section>

      {/* 03 — the disciplines, as the route into the site. */}
      <Section spacing="lg" id="disciplines">
        <SectionHeader
          eyebrow="Core disciplines"
          title="What BizzFly does, in four groups"
          lead="Each links to the practice that owns the work."
        />
        <NumberedList items={disciplines} />
      </Section>

      {/*
        04 — the people and the desk, closing the page.

        A journalist arrives at a press kit to find three things quickly: who
        to name, where they are, and where to write. Those were a heading, a
        lead and a trailing sentence of prose in a content-width column — the
        contact address, the single most-wanted item on the page, set as the
        last clause of the last paragraph. Set as a desk sheet the three are
        countable at a glance. No wording is added that the section did not
        already carry.
      */}
      <Section background="surface" spacing="lg" id="contact">
        <EditorialBlock
          eyebrow="Leadership and media desk"
          title={`${site.founder}, Founder`}
          lead="Operates from Pune, Maharashtra, leading client strategy across search visibility and technical delivery."
        />
        <ChoiceList
          label="Media desk"
          choices={[
            {
              name: site.founder,
              rationale:
                "Founder. Leads client strategy across search visibility and technical delivery.",
            },
            {
              name: `${site.contact.address.city}, ${site.contact.address.region}`,
              rationale: "Where the team operates from.",
            },
            {
              name: site.contact.email,
              href: `mailto:${site.contact.email}`,
              rationale:
                "Asset enquiries, interviews, and high-resolution graphics.",
            },
          ]}
        />
      </Section>

      <Section spacing="sm" width="content">
        <RelatedContent mode="split" heading="Related" items={relatedLinks} />
      </Section>

      {/*
        The reader is an editor on deadline, not a buyer. What they need is a
        fact checked or an asset that is not here, and saying so is more
        useful than asking them what they are trying to solve.
      */}
      <ConversionBand
        title="Need a fact checked, or an asset that is not here?"
        lead="Ask the media desk directly. We will confirm anything on this page in writing, and if you need the logo in a format we have not published we will send it rather than point you at a zip."
        cta={cta}
      />
    </>
  );
}
