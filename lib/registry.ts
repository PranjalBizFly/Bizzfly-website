/**
 * Central content registry.
 *
 * One place that knows about every content entity on the site. Search, the
 * sitemap, related content, internal linking and content validation all read
 * from here, so nothing is duplicated and nothing drifts out of sync.
 *
 * Publication status is applied here rather than in each route, so a draft
 * entity cannot reach a public URL by being forgotten in one place.
 */

import type { ContentStatus } from "@/types/content";
import { practices } from "@/content/practices";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { useCases } from "@/content/use-cases";
import { technologies } from "@/content/technologies";
import { resources } from "@/content/resources";
import { caseStudies } from "@/content/case-studies";
import { allCompanyPages } from "@/content/company";

export type RegistryKind =
  | "practice"
  | "service"
  | "industry"
  | "use-case"
  | "technology"
  | "case-study"
  | "resource"
  | "company"
  | "conversion";

export interface RegistryEntry {
  id: string;
  kind: RegistryKind;
  slug: string;
  title: string;
  href: string;
  /** Display label used by search and related content. */
  category: string;
  description: string;
  /** Short extractable answer, where the entity has one. */
  answer?: string;
  keywords: string[];
  status: ContentStatus;
  /** Search ranking weight. Conversion and services rank highest. */
  boost: number;
  /** Excluded from the XML sitemap (noindex, or utility). */
  noindex?: boolean;
  updated?: string;
}

const BOOST: Record<RegistryKind, number> = {
  conversion: 100,
  practice: 90,
  service: 85,
  industry: 70,
  "use-case": 70,
  "case-study": 65,
  technology: 55,
  resource: 40,
  company: 30,
};

/**
 * The publication gate.
 *
 * Exported so every dynamic route filters its `generateStaticParams` through
 * the same rule the registry uses. A route that enumerates its own content
 * array directly would otherwise prerender a draft entity into a public URL,
 * which is exactly what the registry exists to prevent.
 */
export const isPublished = (entity: { status?: ContentStatus }): boolean =>
  (entity.status ?? "published") === "published";

/**
 * Every entity, including unpublished ones.
 * Public consumers should use `publishedEntries`.
 */
export const allEntries: RegistryEntry[] = [
  /* --- Conversion -------------------------------------------------------- */
  {
    id: "conversion-contact",
    kind: "conversion",
    slug: "contact",
    title: "Contact BizzFly",
    href: "/contact/",
    category: "Contact",
    description:
      "Tell us what you are trying to build, improve or grow. We reply within one business day.",
    keywords: [
      "contact",
      "enquiry",
      "get in touch",
      "consultation",
      "price",
      "pricing",
      "cost",
      "quote",
      "proposal",
      "rates",
      "budget",
      "talk",
    ],
    status: "published",
    boost: BOOST.conversion,
  },

  /* --- Practices --------------------------------------------------------- */
  ...practices.map((p) => ({
    id: `practice-${p.slug}`,
    kind: "practice" as const,
    slug: p.slug,
    title: p.title,
    href: `/services/${p.slug}/`,
    category: "Services",
    description: p.menuDescription,
    answer: p.answer,
    keywords: [p.seo.primaryTopic, ...(p.seo.secondaryTopics ?? [])],
    status: p.status ?? "published",
    boost: BOOST.practice,
  })),

  /* --- Services ---------------------------------------------------------- */
  ...services.map((s) => ({
    id: `service-${s.slug}`,
    kind: "service" as const,
    slug: s.slug,
    title: s.title,
    href: `/services/${s.slug}/`,
    category: "Services",
    description: s.seo.description,
    answer: s.answer,
    keywords: [s.seo.primaryTopic, ...(s.seo.secondaryTopics ?? [])],
    status: s.status ?? "published",
    boost: BOOST.service,
  })),

  /* --- Industries -------------------------------------------------------- */
  ...industries.map((i) => ({
    id: `industry-${i.slug}`,
    kind: "industry" as const,
    slug: i.slug,
    title: i.title,
    href: `/industries/${i.slug}/`,
    category: "Industries",
    description: i.seo.description,
    answer: i.answer,
    keywords: [i.seo.primaryTopic, ...(i.seo.secondaryTopics ?? [])],
    status: i.status ?? "published",
    boost: BOOST.industry,
  })),

  /* --- Use cases --------------------------------------------------------- */
  ...useCases.map((u) => ({
    id: `use-case-${u.slug}`,
    kind: "use-case" as const,
    slug: u.slug,
    title: u.title,
    href: `/use-cases/${u.slug}/`,
    category: "Use Cases",
    description: u.seo.description,
    answer: u.answer,
    keywords: [u.seo.primaryTopic, ...(u.seo.secondaryTopics ?? [])],
    status: u.status ?? "published",
    boost: BOOST["use-case"],
  })),

  /* --- Technologies ------------------------------------------------------ */
  ...technologies.map((t) => ({
    id: `technology-${t.slug}`,
    kind: "technology" as const,
    slug: t.slug,
    title: t.title,
    href: `/technologies/${t.slug}/`,
    category: "Technologies",
    description: t.seo.description,
    answer: t.answer,
    keywords: [t.seo.primaryTopic, ...(t.seo.secondaryTopics ?? []), t.category],
    status: t.status ?? "published",
    boost: BOOST.technology,
  })),

  /* --- Case studies ------------------------------------------------------ */
  ...caseStudies.map((c) => ({
    id: `case-study-${c.slug}`,
    kind: "case-study" as const,
    slug: c.slug,
    title: c.title,
    href: `/case-studies/${c.slug}/`,
    category: "Case Studies",
    description: c.seo.description,
    answer: c.answer,
    keywords: [c.seo.primaryTopic, c.industry],
    /* A case study is only ever public when it is also publishable. */
    status: c.publishable ? (c.status ?? "published") : "draft",
    boost: BOOST["case-study"],
    updated: c.publishedAt,
  })),

  /* --- Resources --------------------------------------------------------- */
  ...resources.map((r) => ({
    id: `resource-${r.slug}`,
    kind: "resource" as const,
    slug: r.slug,
    title: r.title,
    href: `/resources/${r.slug}/`,
    category: r.type === "glossary" ? "Glossary" : "Resources",
    description: r.seo.description,
    answer: r.answer,
    keywords: [r.seo.primaryTopic, ...(r.seo.secondaryTopics ?? []), r.topic],
    status: r.status ?? "published",
    boost: r.type === "glossary" ? BOOST.resource - 10 : BOOST.resource,
    updated: r.publishedOn,
  })),

  /* --- Company ----------------------------------------------------------- */
  ...allCompanyPages
    .filter(
      (c) =>
        ![
          "about",
          "approach",
          "how-we-work",
          "discovery-process",
          "engagement-models",
          "careers",
        ].includes(c.slug),
    )
    .map((c) => ({
      id: `company-${c.slug}`,
      kind: "company" as const,
      slug: c.slug,
      title: c.title,
      href: `/company/${c.slug}/`,
      category: "Company",
      description: c.seo.description,
      answer: c.answer,
      keywords: [c.seo.primaryTopic, ...(c.seo.secondaryTopics ?? [])],
      status: c.status ?? "published",
      boost: BOOST.company,
      noindex: c.seo.noindex,
    })),
];

/** Everything publicly routable. */
export const publishedEntries: RegistryEntry[] = allEntries.filter(isPublished);

/** Everything that belongs in the XML sitemap. */
export const indexableEntries: RegistryEntry[] = publishedEntries.filter(
  (entry) => !entry.noindex,
);

export function entriesByKind(kind: RegistryKind): RegistryEntry[] {
  return publishedEntries.filter((entry) => entry.kind === kind);
}

export function entryByHref(href: string): RegistryEntry | undefined {
  return publishedEntries.find((entry) => entry.href === href);
}

/** Section landing pages, which are routes rather than content entities. */
export const sectionPages = [
  { href: "/", title: "Home", priority: 1 },
  { href: "/services/", title: "Services", priority: 0.9 },
  { href: "/industries/", title: "Industries", priority: 0.9 },
  { href: "/use-cases/", title: "Use Cases", priority: 0.9 },
  { href: "/technologies/", title: "Technologies", priority: 0.7 },
  { href: "/case-studies/", title: "Case Studies", priority: 0.7 },
  { href: "/resources/", title: "Resources", priority: 0.7 },
  { href: "/company/", title: "Company", priority: 0.6 },
  { href: "/contact/", title: "Contact", priority: 0.9 },
  { href: "/about-us/", title: "About Us", priority: 0.8 },
  { href: "/our-approach/", title: "Our Approach", priority: 0.8 },
  { href: "/how-we-work/", title: "How We Work", priority: 0.8 },
  { href: "/discovery-process/", title: "Discovery Process", priority: 0.8 },
  { href: "/engagement-models/", title: "Engagement Models", priority: 0.8 },
  { href: "/careers/", title: "Careers", priority: 0.7 },
  { href: "/media/", title: "Media", priority: 0.7 },
  { href: "/vendor/", title: "Vendor", priority: 0.6 },
  { href: "/press-kit/", title: "Press Kit", priority: 0.6 },
  { href: "/blogs/", title: "Blogs", priority: 0.8 },
];
