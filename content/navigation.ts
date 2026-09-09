/**
 * Navigation, derived from content data rather than hardcoded JSX.
 * Adding pages in later prompts must not require touching the Header.
 */

import type {
  PrimaryNavItem,
  NavigationItem,
  NavigationColumn,
} from "@/types/content";
import { anchorId } from "@/lib/slug";
import { practices } from "./practices";
import { services } from "./services";
import { industries } from "./industries";
import { useCases } from "./use-cases";
import { technologies, technologyGroups } from "./technologies";
import { resources } from "./resources";
import { allCompanyPages } from "./company";
import { methodologyPages } from "./company-methodology";
import { transparencyPages } from "./company-transparency";
import { SECTOR_GROUPS, OUTCOME_GROUPS, LEAD_SECTORS } from "./taxonomy";

/** The one persistent conversion action on the site. */
export const primaryCta = { label: "Let's Talk", href: "/contact/" };

/**
 * How many entries a mega-menu's numbered column carries.
 *
 * The panel scrolls, so a longer list would not break the layout — it would
 * just stop being navigation. Ten was the figure while the numbered list was
 * the whole menu; now that every panel browses by category beside it, the
 * numbered column is an editorial selection rather than an index, and five is
 * both scannable at a glance and short enough that the panel does not
 * outgrow the viewport it opens into. The categories carry the breadth and
 * the hub carries the complete set, which is also what the sitemap and the
 * search index read.
 */
const MENU_PRIMARY_LIMIT = 5;

/**
 * How many entries a category column shows before it defers to its own
 * "all N" link. Four keeps every panel inside a laptop viewport, which is
 * the difference between a menu that is scanned and one that is scrolled.
 */
const MENU_GROUP_LIMIT = 4;

/**
 * A category column, built from the same slug groups the hub pages render.
 *
 * The heading and the "all N" both point at that group's anchor on the hub,
 * so choosing a category in the menu lands on the same category on the page.
 * A menu that invents its own arrangement teaches the visitor one taxonomy
 * and then hands them a different one on arrival.
 */
const groupedColumns = (
  groups: { heading: string; slugs: string[] }[],
  all: { slug: string; title: string }[],
  base: string,
): NavigationColumn[] =>
  groups
    .map((group) => {
      const found = group.slugs
        .map((slug) => all.find((entity) => entity.slug === slug))
        .filter((entity): entity is NonNullable<typeof entity> => Boolean(entity));
      if (found.length === 0) return null;

      const anchor = `${base}#${anchorId(group.heading)}`;
      return {
        heading: group.heading,
        headingHref: anchor,
        items: found.slice(0, MENU_GROUP_LIMIT).map((entity) => ({
          label: entity.title,
          href: `${base}${entity.slug}/`,
        })),
        viewAll:
          found.length > MENU_GROUP_LIMIT
            ? { label: `All ${found.length}`, href: anchor }
            : undefined,
      };
    })
    .filter((column) => column !== null);

/** The six capability groups the technologies hub renders, as menu columns. */
const technologyColumns = (): NavigationColumn[] =>
  technologyGroups
    .map((group) => {
      const items = technologies.filter((t) => t.group === group.id);
      if (items.length === 0) return null;
      const anchor = `/technologies/#${group.id}`;
      return {
        heading: group.label,
        headingHref: anchor,
        items: items.slice(0, MENU_GROUP_LIMIT).map((t) => ({
          label: t.title,
          href: `/technologies/${t.slug}/`,
        })),
        viewAll:
          items.length > MENU_GROUP_LIMIT
            ? { label: `All ${items.length}`, href: anchor }
            : undefined,
      };
    })
    .filter((column) => column !== null);

/**
 * Resources by what each one is FOR, which is the distinction the hub makes
 * and the only one a reader can act on: a guide gives a method, a comparison
 * weighs two options, a decision guide answers whether to act at all.
 */
const RESOURCE_KINDS = [
  { type: "guide", heading: "Guides & frameworks", anchor: "guides" },
  { type: "comparison", heading: "Comparisons", anchor: "comparisons" },
  { type: "decision", heading: "Decision guides", anchor: "decisions" },
  { type: "checklist", heading: "Checklists", anchor: "checklists" },
];

/*
 * Resource titles are long — several wrap to two lines in a menu column —
 * so this cap is one lower than the others. Four kinds at four titles each
 * was the tallest region in any panel.
 */
const RESOURCE_ITEM_LIMIT = 3;

const publishedResources = resources.filter(
  (r) => (r.status ?? "published") === "published",
);

const resourceCount = (type: string) =>
  publishedResources.filter((r) => r.type === type).length;

const resourceColumns = (): NavigationColumn[] =>
  RESOURCE_KINDS.map((kind) => {
    const items = publishedResources.filter((r) => r.type === kind.type);
    if (items.length === 0) return null;
    const anchor = `/resources/#${kind.anchor}`;
    return {
      heading: kind.heading,
      headingHref: anchor,
      items: items.slice(0, RESOURCE_ITEM_LIMIT).map((r) => ({
        label: r.title,
        href: `/resources/${r.slug}/`,
      })),
      viewAll:
        items.length > RESOURCE_ITEM_LIMIT
          ? { label: `All ${items.length}`, href: anchor }
          : undefined,
    };
  }).filter((column) => column !== null);

/**
 * One recent resource per kind rather than the first six in the array, which
 * would show six glossary entries and imply the section is a dictionary.
 */
const featuredResources = () =>
  [
    ...RESOURCE_KINDS.map(
      (kind) => publishedResources.find((r) => r.type === kind.type) ?? null,
    ),
    publishedResources.find((r) => r.type === "article") ?? null,
    publishedResources.find((r) => r.type === "glossary") ?? null,
  ]
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .slice(0, MENU_PRIMARY_LIMIT);

/**
 * Methodology and commitment pages, from the same two sets the company hub
 * groups them by. Before this they were reachable from the menu only through
 * a hand-maintained list that had already fallen behind the content.
 */
const companyColumns = (): NavigationColumn[] =>
  [
    {
      heading: "Methodology",
      anchor: "/company/#how-we-work",
      pages: methodologyPages,
    },
    {
      heading: "What we commit to",
      anchor: "/company/#what-we-commit-to",
      pages: transparencyPages,
    },
  ]
    .map((group) => {
      if (group.pages.length === 0) return null;
      return {
        heading: group.heading,
        headingHref: group.anchor,
        items: group.pages.slice(0, MENU_GROUP_LIMIT).map((page) => ({
          label: page.title,
          href: `/company/${page.slug}/`,
        })),
        viewAll:
          group.pages.length > MENU_GROUP_LIMIT
            ? { label: `All ${group.pages.length}`, href: group.anchor }
            : undefined,
      };
    })
    .filter((column) => column !== null);

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

  return ([
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
  ]).filter((group) => group.items.length > 0);
};

export const primaryNav: PrimaryNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services/",
    panel: {
      lead: "Five search surfaces, the software underneath them, and the growth work that compounds both. Most engagements span at least two.",
      primaryHeading: "Practices",
      /* Column 1 controls the panel: six practices, numbered. */
      primary: practices.map((p) => ({
        index: p.index,
        label: p.title,
        href: `/services/${p.slug}/`,
        description: p.menuDescription,
      })),
      columnsHeading: "Browse by capability",
      /*
        Then the three groups above, and a card — the same three regions every
        other panel carries. Services used to be the exception, laid out as
        four bare link columns, which is why it read as a directory beside the
        other menus rather than as one of them.
      */
      columns: serviceGroups(),
      feature: {
        kind: "START HERE",
        title: "How an engagement starts",
        description:
          "Almost always a fixed-scope diagnostic rather than a retainer, so both sides can judge the work before committing further.",
        href: "/company/how-we-work/",
        ctaLabel: "See how we work",
      },
      footerLink: {
        label: `Explore all ${services.length} services`,
        href: "/services/",
      },
    },
  },
  {
    label: "Industries",
    href: "/industries/",
    panel: {
      lead: "We publish a sector page only where we can name that sector's real problems in its own vocabulary.",
      primaryHeading: "Covered in full",
      /*
        Capped, not complete. The full set is on /industries/ and in search;
        a menu is for orientation, and a numbered list past about ten items
        stops being read and starts being scrolled. The grouped columns
        beside it are what make the remaining sectors reachable in one hop
        rather than through a hub page.
      */
      primary: LEAD_SECTORS.slice(0, MENU_PRIMARY_LIMIT).map((slug, n) => {
        const industry = industries.find((i) => i.slug === slug);
        return industry
          ? {
              index: String(n + 1).padStart(2, "0"),
              label: industry.title,
              href: `/industries/${industry.slug}/`,
              description:
                industry.problems[0]?.title ?? industry.seo.primaryTopic,
            }
          : null;
      }).filter((i): i is NonNullable<typeof i> => i !== null),
      columnsHeading: "Browse by business model",
      columns: groupedColumns(SECTOR_GROUPS, industries, "/industries/"),
      feature: {
        kind: "WORK",
        title: "How we publish client work",
        description:
          "Verified metrics, named challenges, and written client approval before anything goes live.",
        href: "/case-studies/",
        ctaLabel: "See the standard",
      },
      footerLink: {
        label: `Explore all ${industries.length} industries`,
        href: "/industries/",
      },
    },
  },
  {
    label: "Use Cases",
    href: "/use-cases/",
    panel: {
      lead: "Start from the problem in your own words rather than from our service names. Each one links to the work that addresses it.",
      primaryHeading: "Most asked for",
      primary: useCases.slice(0, MENU_PRIMARY_LIMIT).map((u, n) => ({
        index: String(n + 1).padStart(2, "0"),
        label: u.title,
        href: `/use-cases/${u.slug}/`,
        description: u.symptoms[0] ?? u.seo.primaryTopic,
      })),
      columnsHeading: "Browse by outcome",
      columns: groupedColumns(OUTCOME_GROUPS, useCases, "/use-cases/"),
      feature: {
        kind: "START HERE",
        title: "Not sure where to start?",
        description:
          "Tell us the problem in your own words. If we are not the right people for it, we will say so.",
        href: "/contact/",
        ctaLabel: "Let's talk",
      },
      footerLink: {
        label: `Explore all ${useCases.length} use cases`,
        href: "/use-cases/",
      },
    },
  },
  {
    label: "Technologies",
    href: "/technologies/",
    panel: {
      lead: "Every page states what we use, why we chose it, and the cases where we would tell you to use something else.",
      primaryHeading: "The stack",
      primary: technologies.slice(0, MENU_PRIMARY_LIMIT).map((t, n) => ({
        index: String(n + 1).padStart(2, "0"),
        label: t.title,
        href: `/technologies/${t.slug}/`,
        description: t.category,
      })),
      columnsHeading: "Browse by capability",
      /*
        The same six groups the hub renders, linking into the hub's own
        anchors. A menu that invents its own taxonomy teaches the visitor one
        arrangement and then hands them a different one on arrival.
      */
      columns: technologyColumns(),
      feature: {
        kind: "PRACTICE",
        title: "Our engineering standards",
        description:
          "How we build software your own team can maintain after we leave.",
        href: "/technologies/engineering-standards/",
        ctaLabel: "Read the standards",
      },
      footerLink: {
        label: `Explore all ${technologies.length} technologies`,
        href: "/technologies/",
      },
    },
  },
  {
    label: "Resources",
    href: "/resources/",
    panel: {
      lead: "A guide gives you a method, a comparison weighs two options, a decision guide helps you work out whether to act at all.",
      primaryHeading: "Latest",
      primary: featuredResources().map((r, n) => ({
        index: String(n + 1).padStart(2, "0"),
        label: r.title,
        href: `/resources/${r.slug}/`,
        description: r.topic,
      })),
      columnsHeading: "Browse by kind",
      columns: resourceColumns(),
      feature: {
        kind: "GLOSSARY",
        title: `${resourceCount("glossary")} terms, defined plainly`,
        description:
          "SEO, AI search, automation and analytics vocabulary, each defined in 40 words or fewer before anything else.",
        href: "/resources/#glossary",
        ctaLabel: "Open the glossary",
      },
      footerLink: {
        label: `Explore all ${resources.length} resources`,
        href: "/resources/",
      },
    },
  },
  {
    label: "Company",
    href: "/company/",
    panel: {
      lead: "Who we are, how the work actually runs, and what we will and will not claim.",
      primaryHeading: "The company",
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
      columnsHeading: "How the work runs",
      /*
        Methodology and commitment pages are grouped rather than added to the
        numbered list: eleven primary items would overwhelm the panel, and
        these answer different questions — how the work runs, and what we
        will not claim, rather than who we are. Without these columns they
        were orphans, reachable only by typing the URL.
      */
      columns: companyColumns(),
      feature: {
        kind: "WORK",
        title: "How we publish client work",
        description:
          "Verified metrics with sources, named challenges, and written client approval before anything goes live.",
        href: "/case-studies/",
        ctaLabel: "See the standard",
      },
      footerLink: {
        label: `Explore all ${allCompanyPages.length} company pages`,
        href: "/company/",
      },
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
 * industries, 30 use cases and 16 technologies at the foot of every page,
 * which is the link wall this cap exists to prevent. The hub page is what
 * holds the complete list, and it is what the sitemap and the crawler read.
 *
 * Nine rather than five, since the directory went to six columns.
 *
 * Five left four of the six tracks ending less than half way down a block
 * the brand column carries to the bottom, so the middle of the footer was
 * empty space rather than a directory. Nine and a link fills the tracks to
 * roughly even depth and still shows a fraction of each section: it is 9 of
 * 26, 30, 16 and 145, not all of them.
 */
const FOOTER_COLUMN_LIMIT = 9;

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

/* ==========================================================================
   The value ticker
   --------------------------------------------------------------------------
   The strip above the header. Six short statements of position, cycling.

   Every line here is a restatement of something the site already publishes
   and commits to elsewhere — the homepage tagline, the diagnosis-first
   engagement model on /company/how-we-work/, the reporting standard on
   /company/how-we-report/, the five discoverability surfaces, and the
   registered office. NOTHING in this list is a metric, a result, a client
   count or a duration, because a ticker is the easiest place on a site for
   an unverifiable claim to slip in unnoticed and the hardest place for a
   reader to check one.

   Kept to six: the band loops, and a longer list means a visitor waits
   through statements they have already read before the loop closes.
   ========================================================================== */
export const valuePropositions: string[] = [
  "Get found. Build well. Automate the rest.",
  "Search results, AI answers and maps — one programme",
  "Diagnosis before proposal",
  "The team that finds the problem is the team that fixes it",
  "Reported against enquiries, not impressions",
  "Digital growth, AI and automation — Pune, India",
];
