/**
 * Navigation, derived from content data rather than hardcoded JSX.
 * Adding pages in later prompts must not require touching the Header.
 */

import type {
  PrimaryNavItem,
  NavigationItem,
  NavigationColumn,
} from "@/types/content";
import { practices } from "./practices";
import { services } from "./services";
import { industries } from "./industries";
import { useCases } from "./use-cases";
import { technologies } from "./technologies";
import { resources } from "./resources";

/** The one persistent conversion action on the site. */
export const primaryCta = { label: "Let's Talk", href: "/contact/" };

/**
 * How many entries a mega-menu's numbered column carries.
 *
 * The panel scrolls, so a longer list would not break the layout — it would
 * just stop being navigation. Ten is roughly where a numbered column is still
 * scanned rather than skimmed past. The complete set lives on each hub page,
 * which is also what the sitemap and search index read.
 */
const MENU_PRIMARY_LIMIT = 10;

const serviceLink = (slug: string): NavigationItem | null => {
  const service = services.find((s) => s.slug === slug);
  return service
    ? { label: service.title, href: `/services/${service.slug}/` }
    : null;
};

/**
 * The three groups the Services menu is organised by.
 *
 * This is the positioning made navigable: visibility, then the technology
 * that supports it, then growth. Every entry resolves to a page that exists —
 * some are practice hubs, some are individual services — and every label is
 * that page's own title, so the menu never promises something the
 * destination does not call itself.
 */
const serviceGroups = (): NavigationColumn[] => {
  const bySlug = (slug: string) => services.find((s) => s.slug === slug);
  const practiceBySlug = (slug: string) => practices.find((p) => p.slug === slug);

  const service = (slug: string): NavigationItem | null => {
    const found = bySlug(slug);
    return found ? { label: found.title, href: `/services/${found.slug}/` } : null;
  };
  const practice = (slug: string): NavigationItem | null => {
    const found = practiceBySlug(slug);
    return found ? { label: found.title, href: `/services/${found.slug}/` } : null;
  };
  const keep = (items: (NavigationItem | null)[]) =>
    items.filter((i): i is NavigationItem => i !== null);

  return [
    {
      heading: "Digital Growth",
      headingHref: "/services/search-ai-visibility/",
      items: keep([
        service("seo"),
        service("answer-engine-optimisation"),
        service("generative-engine-optimisation"),
        service("ai-optimisation"),
        service("search-experience-optimisation"),
        service("google-business-profile"),
      ]),
    },
    {
      heading: "Technology",
      headingHref: "/services/software-development/",
      items: keep([
        practice("web-development"),
        service("custom-software"),
        service("web-applications"),
        service("workflow-automation"),
        service("systems-integration"),
        practice("ai-automation"),
      ]),
    },
    {
      heading: "Growth",
      headingHref: "/services/digital-marketing/",
      items: keep([
        practice("digital-marketing"),
        service("conversion-rate-optimization"),
        service("performance-marketing"),
        service("digital-strategy"),
        practice("data-analytics"),
      ]),
    },
  ].filter((group) => group.items.length > 0);
};

export const primaryNav: PrimaryNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services/",
    panel: {
      /* Column 1 controls the panel: six practices, numbered. */
      primary: practices.map((p) => ({
        index: p.index,
        label: p.title,
        href: `/services/${p.slug}/`,
        description: p.menuDescription,
      })),
      /*
        Then the three groups above. This panel carries no feature card: four
        editorial columns already fill the width, and a fifth region would
        turn the menu into the card grid it is meant to replace.
      */
      columns: serviceGroups(),
      footerLink: { label: "Explore all services", href: "/services/" },
    },
  },
  {
    label: "Industries",
    href: "/industries/",
    panel: {
      /*
        Capped, not complete. The full set is on /industries/ and in search;
        a menu is for orientation, and a numbered list past about ten items
        stops being read and starts being scrolled. Same reasoning below for
        use cases and technologies.
      */
      primary: industries.slice(0, MENU_PRIMARY_LIMIT).map((i, n) => ({
        index: String(n + 1).padStart(2, "0"),
        label: i.title,
        href: `/industries/${i.slug}/`,
        description: i.problems[0]?.title ?? i.seo.primaryTopic,
      })),
      feature: {
        kind: "WORK",
        title: "How we publish client work",
        description:
          "Verified metrics, named challenges, and written client approval before anything goes live.",
        href: "/case-studies/",
        ctaLabel: "See the standard",
      },
      footerLink: {
        label: `All ${industries.length} industries`,
        href: "/industries/",
      },
    },
  },
  {
    label: "Use Cases",
    href: "/use-cases/",
    panel: {
      primary: useCases.slice(0, MENU_PRIMARY_LIMIT).map((u, n) => ({
        index: String(n + 1).padStart(2, "0"),
        label: u.title,
        href: `/use-cases/${u.slug}/`,
        description: u.symptoms[0] ?? u.seo.primaryTopic,
      })),
      feature: {
        kind: "START HERE",
        title: "Not sure where to start?",
        description:
          "Tell us the problem in your own words. If we are not the right people for it, we will say so.",
        href: "/contact/",
        ctaLabel: "Let's talk",
      },
      footerLink: {
        label: `All ${useCases.length} use cases`,
        href: "/use-cases/",
      },
    },
  },
  {
    label: "Technologies",
    href: "/technologies/",
    panel: {
      primary: technologies.slice(0, MENU_PRIMARY_LIMIT).map((t, n) => ({
        index: String(n + 1).padStart(2, "0"),
        label: t.title,
        href: `/technologies/${t.slug}/`,
        description: t.category,
      })),
      columns: [
        {
          heading: "Build",
          items: [
            serviceLink("custom-software"),
            serviceLink("web-applications"),
            serviceLink("systems-integration"),
          ].filter((i): i is NavigationItem => i !== null),
        },
      ],
      feature: {
        kind: "PRACTICE",
        title: "Our engineering standards",
        description:
          "How we build software your own team can maintain after we leave.",
        href: "/technologies/engineering-standards/",
        ctaLabel: "Read the standards",
      },
      footerLink: {
        label: `All ${technologies.length} technologies`,
        href: "/technologies/",
      },
    },
  },
  {
    label: "Resources",
    href: "/resources/",
    panel: {
      primary: resources.slice(0, 6).map((r, n) => ({
        index: String(n + 1).padStart(2, "0"),
        label: r.title,
        href: `/resources/${r.slug}/`,
        description: r.topic,
      })),
      footerLink: {
        label: `All ${resources.length} resources`,
        href: "/resources/",
      },
    },
  },
  {
    label: "Company",
    href: "/company/",
    panel: {
      primary: [
        {
          index: "01",
          label: "About BizzFly",
          href: "/company/about/",
          description: "Who we are and what we optimise for",
        },
        {
          index: "02",
          label: "Our approach",
          href: "/company/approach/",
          description: "Diagnosis before proposal",
        },
        {
          index: "03",
          label: "How we work",
          href: "/company/how-we-work/",
          description: "Boundaries stated in writing",
        },
        {
          index: "04",
          label: "Careers",
          href: "/company/careers/",
          description: "Work with us",
        },
        {
          index: "05",
          label: "Contact",
          href: "/contact/",
          description: "Talk to us",
        },
      ],
      /*
        Methodology pages are grouped rather than added to the numbered list:
        eleven primary items would overwhelm the panel, and these answer a
        different question — how the work runs, not who we are. Without this
        column they were orphans, reachable only by typing the URL.
      */
      columns: [
        {
          heading: "Methodology",
          headingHref: "/company/approach/",
          items: [
            { label: "Discovery process", href: "/company/discovery-process/" },
            {
              label: "Digital growth methodology",
              href: "/company/digital-growth-methodology/",
            },
            { label: "SEO methodology", href: "/company/seo-methodology/" },
            {
              label: "AI search methodology",
              href: "/company/ai-search-methodology/",
            },
            { label: "Engagement models", href: "/company/engagement-models/" },
          ],
        },
        {
          heading: "How we build",
          headingHref: "/technologies/engineering-standards/",
          items: [
            {
              label: "Website development process",
              href: "/company/website-development-process/",
            },
            {
              label: "Software development process",
              href: "/company/software-development-process/",
            },
            { label: "Automation approach", href: "/company/automation-approach/" },
          ],
        },
      ],
      feature: {
        kind: "WORK",
        title: "How we publish client work",
        description:
          "Verified metrics with sources, named challenges, and written client approval before anything goes live.",
        href: "/case-studies/",
        ctaLabel: "See the standard",
      },
      footerLink: { label: "About BizzFly", href: "/company/about/" },
    },
  },
];

/**
 * Footer navigation. Capped per column so it does not become a link wall —
 * the full set lives on each section hub.
 */
/**
 * A footer column: a few entries, then the way to the rest.
 *
 * The footer renders on all 300 pages, so its length is not a footer
 * decision — it is a site-wide one. Mapping every entity into it put 26
 * industries, 30 use cases and 16 technologies at the foot of every page.
 * Five and a link is enough to show what a section contains; the hub page
 * is what holds the complete list, and it is what the sitemap and the
 * crawler read.
 */
const FOOTER_COLUMN_LIMIT = 5;

const footerColumn = (
  heading: string,
  href: string,
  all: { slug: string; title: string }[],
  base: string,
  allLabel: string,
): { heading: string; href: string; items: NavigationItem[] } => ({
  heading,
  href,
  items: [
    ...all.slice(0, FOOTER_COLUMN_LIMIT).map((entity) => ({
      label: entity.title,
      href: `${base}${entity.slug}/`,
    })),
    { label: `${allLabel} (${all.length})`, href },
  ],
});

export const footerNav = [
  {
    heading: "Services",
    href: "/services/",
    items: [
      ...practices.map((p) => ({
        label: p.title,
        href: `/services/${p.slug}/`,
      })),
      { label: `All services (${services.length})`, href: "/services/" },
    ],
  },
  footerColumn("Industries", "/industries/", industries, "/industries/", "All industries"),
  footerColumn("Use Cases", "/use-cases/", useCases, "/use-cases/", "All use cases"),
  footerColumn(
    "Technologies",
    "/technologies/",
    technologies,
    "/technologies/",
    "All technologies",
  ),
  {
    heading: "Resources",
    href: "/resources/",
    items: [
      ...resources.slice(0, FOOTER_COLUMN_LIMIT).map((r) => ({
        label: r.title,
        href: `/resources/${r.slug}/`,
      })),
      { label: `All resources (${resources.length})`, href: "/resources/" },
    ],
  },
  {
    heading: "Company",
    href: "/company/",
    items: [
      { label: "About BizzFly", href: "/company/about/" },
      { label: "Our approach", href: "/company/approach/" },
      { label: "How we work", href: "/company/how-we-work/" },
      { label: "Discovery process", href: "/company/discovery-process/" },
      { label: "Engagement models", href: "/company/engagement-models/" },
      { label: "Careers", href: "/company/careers/" },
      { label: "Case studies", href: "/case-studies/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];

export const legalNav: NavigationItem[] = [
  { label: "Privacy Policy", href: "/company/privacy-policy/" },
  { label: "Terms & Conditions", href: "/company/terms/" },
  { label: "Search", href: "/search/" },
];
