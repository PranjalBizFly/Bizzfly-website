/**
 * Page inventory audit.
 *
 *   npm run verify:pages
 *
 * Answers one question deterministically: how many public URLs does this
 * application actually generate, and how many of them are complete?
 *
 * A route template is not a page. A registry entry is not a page. A sitemap
 * line is not a page. A page is a URL the router generates and can render, so
 * this script derives the URL set from the same sources the routes use, then
 * reconciles it against the real build output in `.next/server/app` when one
 * is present.
 *
 * Reports:
 *   - route templates, split static vs dynamic
 *   - content records per kind, published vs draft/review
 *   - the full public URL inventory with per-URL status
 *   - slug and duplicate-URL validation
 *   - sitemap URL count reconciled against the inventory
 *   - orphan pages (generated but reachable from nothing)
 *   - unfinished content markers per URL
 *   - duplicate or missing SEO titles and descriptions
 *
 * Exits non-zero on a structural fault (broken route, duplicate URL, sitemap
 * entry with no page). Incomplete content is reported, not failed — the
 * content model deliberately ships pages with unverified sections marked.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

import { allEntries, publishedEntries, sectionPages } from "../lib/registry.ts";
import { practices } from "../content/practices.ts";
import { services } from "../content/services.ts";
import { industries } from "../content/industries.ts";
import { useCases } from "../content/use-cases.ts";
import { technologies } from "../content/technologies.ts";
import { resources } from "../content/resources.ts";
import { caseStudies, publishedCaseStudies } from "../content/case-studies.ts";
import { allCompanyPages } from "../content/company.ts";
import { primaryNav, footerNav, legalNav } from "../content/navigation.ts";
import { metaForService, serviceGroups } from "../content/service-meta.ts";
import { site } from "../content/site.ts";
import type { ContentStatus } from "../types/content.ts";

const ROOT = process.cwd();
const APP_DIR = join(ROOT, "app");
const BUILD_DIR = join(ROOT, ".next", "server", "app");

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Strings that mean a page is not finished. */
const MARKERS = [
  "[CONTENT_REQUIRED]",
  "[VERIFY_WITH_BIZZFLY]",
  "Lorem ipsum",
  "Coming soon",
  "TBD",
  "lorem ipsum",
];

const errors: string[] = [];
const warnings: string[] = [];
const fail = (message: string) => errors.push(message);
const warn = (message: string) => warnings.push(message);

const published = (status?: ContentStatus) =>
  (status ?? "published") === "published";

/* ==========================================================================
   1. Route templates — scanned from the App Router tree
   ========================================================================== */

interface RouteTemplate {
  /** Route path as the router sees it, e.g. "/services/[slug]/". */
  route: string;
  dynamic: boolean;
  /** page.tsx, route.ts — a route handler is not an HTML page. */
  file: "page" | "route";
}

function scanRoutes(dir: string, segments: string[] = []): RouteTemplate[] {
  const found: RouteTemplate[] = [];
  for (const name of readdirSync(dir).sort()) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      /* Route groups and private folders do not create URL segments. */
      if (name.startsWith("_")) continue;
      const next = name.startsWith("(") ? segments : [...segments, name];
      found.push(...scanRoutes(full, next));
      continue;
    }
    if (name === "page.tsx" || name === "page.ts") {
      const path = segments.length === 0 ? "/" : `/${segments.join("/")}/`;
      found.push({
        route: path,
        dynamic: segments.some((s) => s.startsWith("[")),
        file: "page",
      });
    }
    if (name === "route.ts" || name === "route.tsx") {
      found.push({
        route: `/${segments.join("/")}`,
        dynamic: false,
        file: "route",
      });
    }
  }
  return found;
}

const routeTemplates = scanRoutes(APP_DIR);
const pageTemplates = routeTemplates.filter((r) => r.file === "page");
const staticTemplates = pageTemplates.filter((r) => !r.dynamic);
const dynamicTemplates = pageTemplates.filter((r) => r.dynamic);

/* ==========================================================================
   2. Public URL inventory
   ========================================================================== */

type PageSource = "static route" | "generateStaticParams";

interface PageRecord {
  url: string;
  category: string;
  type: string;
  source: PageSource;
  /** The dynamic template that produced it, where there is one. */
  template: string;
  status: ContentStatus;
  /** Unfinished-content markers found in the record or the route source. */
  markers: string[];
  title?: string;
  description?: string;
  indexable: boolean;
}

const pages: PageRecord[] = [];

/**
 * Static routes.
 *
 * `/search/` is a real page but is disallowed in robots and excluded from the
 * sitemap, so it is tracked as non-indexable rather than as an omission.
 */
const STATIC_PAGE_META: Record<string, { category: string; type: string; indexable: boolean }> = {
  "/": { category: "Other", type: "Homepage", indexable: true },
  "/services/": { category: "Services", type: "Section index", indexable: true },
  "/industries/": { category: "Industries", type: "Section index", indexable: true },
  "/use-cases/": { category: "Use Cases", type: "Section index", indexable: true },
  "/technologies/": { category: "Technologies", type: "Section index", indexable: true },
  "/case-studies/": { category: "Case Studies", type: "Section index", indexable: true },
  "/resources/": { category: "Resources", type: "Section index", indexable: true },
  "/company/": { category: "Company", type: "Section index", indexable: true },
  "/contact/": { category: "Other", type: "Conversion", indexable: true },
  "/search/": { category: "Other", type: "Utility", indexable: false },
  "/about-us/": { category: "Company", type: "Company page", indexable: true },
  "/our-approach/": { category: "Company", type: "Company page", indexable: true },
  "/how-we-work/": { category: "Company", type: "Company page", indexable: true },
  "/discovery-process/": { category: "Company", type: "Company page", indexable: true },
  "/engagement-models/": { category: "Company", type: "Company page", indexable: true },
  "/careers/": { category: "Company", type: "Company page", indexable: true },
  "/media/": { category: "Company", type: "Company page", indexable: true },
  "/vendor/": { category: "Company", type: "Company page", indexable: true },
  "/press-kit/": { category: "Company", type: "Company page", indexable: true },
  "/blogs/": { category: "Resources", type: "Section index", indexable: true },
};

/** Markers present in a route's own source file, for static pages. */
function markersInFile(path: string): string[] {
  if (!existsSync(path)) return [];
  const source = readFileSync(path, "utf8");
  return MARKERS.filter((marker) => source.includes(marker));
}

for (const template of staticTemplates) {
  const meta = STATIC_PAGE_META[template.route];
  if (!meta) {
    fail(
      `Static route ${template.route} has no inventory entry — add it to STATIC_PAGE_META`,
    );
    continue;
  }
  const dir =
    template.route === "/"
      ? APP_DIR
      : join(APP_DIR, ...template.route.split("/").filter(Boolean));
  pages.push({
    url: template.route,
    category: meta.category,
    type: meta.type,
    source: "static route",
    template: template.route,
    status: "published",
    markers: markersInFile(join(dir, "page.tsx")),
    indexable: meta.indexable,
    title: undefined,
    description: undefined,
  });
}

/**
 * Dynamic routes.
 *
 * Each entry mirrors the `generateStaticParams` of the route it names. If a
 * route's parameter source changes, the assertion block below fails rather
 * than letting this audit silently under- or over-count.
 */
interface DynamicSource {
  template: string;
  category: string;
  type: string;
  /** The records the route turns into params. */
  records: {
    slug: string;
    title: string;
    status?: ContentStatus;
    seo: { description: string; title: string; noindex?: boolean };
  }[];
  /** Records the route excludes from params, with the reason. */
  excluded: { slug: string; reason: string }[];
}

const practiceRecords = practices.map((p) => ({
  slug: p.slug,
  title: p.title,
  status: p.status,
  seo: p.seo,
}));

const dynamicSources: DynamicSource[] = [
  {
    template: "/services/[slug]/",
    category: "Services",
    type: "Practice hub / Service",
    records: [
      ...practiceRecords,
      ...services.map((s) => ({
        slug: s.slug,
        title: s.title,
        status: s.status,
        seo: s.seo,
      })),
    ],
    excluded: [],
  },
  {
    template: "/industries/[slug]/",
    category: "Industries",
    type: "Industry",
    records: industries.map((i) => ({
      slug: i.slug,
      title: i.title,
      status: i.status,
      seo: i.seo,
    })),
    excluded: [],
  },
  {
    template: "/use-cases/[slug]/",
    category: "Use Cases",
    type: "Use case",
    records: useCases.map((u) => ({
      slug: u.slug,
      title: u.title,
      status: u.status,
      seo: u.seo,
    })),
    excluded: [],
  },
  {
    template: "/technologies/[slug]/",
    category: "Technologies",
    type: "Technology",
    records: technologies.map((t) => ({
      slug: t.slug,
      title: t.title,
      status: t.status,
      seo: t.seo,
    })),
    excluded: [],
  },
  {
    template: "/case-studies/[slug]/",
    category: "Case Studies",
    type: "Case study",
    records: publishedCaseStudies.map((c) => ({
      slug: c.slug,
      title: c.title,
      status: c.status,
      seo: c.seo,
    })),
    excluded: caseStudies
      .filter((c) => !c.publishable)
      .map((c) => ({ slug: c.slug, reason: "not publishable" })),
  },
  {
    template: "/resources/[slug]/",
    category: "Resources",
    type: "Resource",
    records: resources
      .filter((r) => published(r.status))
      .map((r) => ({ slug: r.slug, title: r.title, status: r.status, seo: r.seo })),
    excluded: resources
      .filter((r) => !published(r.status))
      .map((r) => ({ slug: r.slug, reason: r.status ?? "unknown" })),
  },
  {
    template: "/company/[slug]/",
    category: "Company",
    type: "Company page",
    records: allCompanyPages
      .filter(
        (c) =>
          published(c.status) &&
          ![
            "about",
            "approach",
            "how-we-work",
            "discovery-process",
            "engagement-models",
            "careers",
          ].includes(c.slug),
      )
      .map((c) => ({ slug: c.slug, title: c.title, status: c.status, seo: c.seo })),
    excluded: [
      ...allCompanyPages
        .filter((c) => !published(c.status))
        .map((c) => ({ slug: c.slug, reason: c.status ?? "unknown" })),
      ...allCompanyPages
        .filter((c) =>
          [
            "about",
            "approach",
            "how-we-work",
            "discovery-process",
            "engagement-models",
            "careers",
          ].includes(c.slug),
        )
        .map((c) => ({ slug: c.slug, reason: "relocated to root canonical route" })),
    ],
  },
];

/* Every dynamic template in the app must be modelled above. */
for (const template of dynamicTemplates) {
  if (!dynamicSources.some((s) => s.template === template.route)) {
    fail(
      `Dynamic route ${template.route} is not modelled in this audit — add it to dynamicSources`,
    );
  }
}

/** Full serialised record, so a marker anywhere in the content is caught. */
const rawByHref = new Map<string, string>();
const registerRaw = (href: string, record: unknown) =>
  rawByHref.set(href, JSON.stringify(record));

for (const p of practices) registerRaw(`/services/${p.slug}/`, p);
for (const s of services) registerRaw(`/services/${s.slug}/`, s);
for (const i of industries) registerRaw(`/industries/${i.slug}/`, i);
for (const u of useCases) registerRaw(`/use-cases/${u.slug}/`, u);
for (const t of technologies) registerRaw(`/technologies/${t.slug}/`, t);
for (const r of resources) registerRaw(`/resources/${r.slug}/`, r);
for (const c of allCompanyPages) registerRaw(`/company/${c.slug}/`, c);
registerRaw("/about-us/", allCompanyPages.find((c) => c.slug === "about"));
registerRaw("/our-approach/", allCompanyPages.find((c) => c.slug === "approach"));
registerRaw("/how-we-work/", allCompanyPages.find((c) => c.slug === "how-we-work"));
registerRaw("/discovery-process/", allCompanyPages.find((c) => c.slug === "discovery-process"));
registerRaw("/engagement-models/", allCompanyPages.find((c) => c.slug === "engagement-models"));
registerRaw("/careers/", allCompanyPages.find((c) => c.slug === "careers"));

for (const source of dynamicSources) {
  const prefix = source.template.replace("[slug]/", "");
  for (const record of source.records) {
    const url = `${prefix}${record.slug}/`;
    const raw = rawByHref.get(url) ?? "";
    pages.push({
      url,
      category: source.category,
      type: source.type,
      source: "generateStaticParams",
      template: source.template,
      status: record.status ?? "published",
      markers: MARKERS.filter((marker) => raw.includes(marker)),
      title: record.seo.title,
      description: record.seo.description,
      indexable: !record.seo.noindex,
    });
  }
}

pages.sort((a, b) => a.url.localeCompare(b.url));

/* ==========================================================================
   3. Slug and URL validation
   ========================================================================== */

for (const entry of allEntries) {
  if (!entry.slug) fail(`Empty slug on ${entry.id}`);
  else if (!SLUG_PATTERN.test(entry.slug))
    fail(`Invalid slug "${entry.slug}" on ${entry.id}`);
  if (entry.slug !== entry.slug.toLowerCase())
    fail(`Slug "${entry.slug}" on ${entry.id} is not lowercase`);
}

const urlCounts = new Map<string, number>();
for (const page of pages) urlCounts.set(page.url, (urlCounts.get(page.url) ?? 0) + 1);
const duplicateUrls = [...urlCounts].filter(([, count]) => count > 1);
for (const [url, count] of duplicateUrls)
  fail(`Duplicate public URL ${url} generated ${count} times`);

/* Every URL carries a trailing slash, matching next.config trailingSlash. */
for (const page of pages) {
  if (page.url !== "/" && !page.url.endsWith("/"))
    fail(`URL ${page.url} is missing its trailing slash`);
}

/* Case collisions — two slugs differing only in case would collide on a
   case-insensitive host even though both pass the lowercase check. */
const lowered = new Map<string, string>();
for (const page of pages) {
  const key = page.url.toLowerCase();
  const existing = lowered.get(key);
  if (existing && existing !== page.url)
    fail(`Case-conflicting URLs: ${existing} and ${page.url}`);
  lowered.set(key, page.url);
}

/* ==========================================================================
   4. Reconcile against the real build output
   ========================================================================== */

function builtPages(): string[] | null {
  if (!existsSync(BUILD_DIR)) return null;
  const found: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith(".html")) {
        const rel = relative(BUILD_DIR, full).split(sep).join("/");
        const path = rel.replace(/\.html$/, "");
        if (path === "_not-found") continue;
        found.push(path === "index" ? "/" : `/${path}/`);
      }
    }
  };
  walk(BUILD_DIR);
  return found.sort();
}

const built = builtPages();
const expectedUrls = new Set(pages.map((p) => p.url));

if (built) {
  for (const url of built) {
    if (!expectedUrls.has(url))
      fail(`Build produced ${url}, which this audit did not expect`);
  }
  for (const url of expectedUrls) {
    if (!built.includes(url))
      fail(`Expected ${url} was not produced by the build`);
  }
}

/* ==========================================================================
   5. Sitemap reconciliation
   ========================================================================== */

const indexable = publishedEntries.filter((e) => !e.noindex);
const sitemapUrls = [
  ...sectionPages.map((p) => p.href),
  ...indexable
    .filter((e) => !sectionPages.some((p) => p.href === e.href))
    .map((e) => e.href),
];

const sitemapSet = new Set(sitemapUrls);
if (sitemapSet.size !== sitemapUrls.length)
  fail(`Sitemap contains ${sitemapUrls.length - sitemapSet.size} duplicate URL(s)`);

for (const url of sitemapUrls) {
  if (!expectedUrls.has(url))
    fail(`Sitemap lists ${url}, which no route generates`);
}

const indexablePages = pages.filter((p) => p.indexable);
const missingFromSitemap = indexablePages
  .map((p) => p.url)
  .filter((url) => !sitemapSet.has(url));

/* ==========================================================================
   6. Discoverability
   ========================================================================== */

const discoverable = new Set<string>(["/"]);
const reach = (href?: string) => {
  if (!href || href.startsWith("http") || href.startsWith("#")) return;
  const path = href.split("?")[0]?.split("#")[0];
  if (path) discoverable.add(path);
};

/* Header, mega menu, footer, legal bar. */
for (const item of primaryNav) {
  reach(item.href);
  for (const column of item.panel?.columns ?? []) {
    reach(column.headingHref);
    for (const link of column.items) reach(link.href);
  }
  reach(item.panel?.feature?.href);
  reach(item.panel?.secondaryFeature?.href);
  reach(item.panel?.footerLink.href);
}
for (const group of footerNav) {
  reach(group.href);
  for (const item of group.items) reach(item.href);
}
for (const item of legalNav) reach(item.href);

/* Section index listings, mirroring what each index page enumerates. */
for (const service of services) {
  /* Grouped by metaForService, which falls back to "growth" — every service
     therefore lands in a rendered group. */
  const group = metaForService(service.slug).group;
  if (serviceGroups.some((g) => g.id === group))
    reach(`/services/${service.slug}/`);
  else warn(`Service ${service.slug} has group "${group}" with no directory column`);
}
for (const practice of practices) reach(`/services/${practice.slug}/`);
for (const industry of industries) reach(`/industries/${industry.slug}/`);
for (const useCase of useCases) reach(`/use-cases/${useCase.slug}/`);
for (const technology of technologies) {
  /* /technologies/ renders six capability groups and drops anything else. */
  const grouped = ["ai", "automation", "web", "software", "search-data", "practice"];
  if (technology.group && grouped.includes(technology.group))
    reach(`/technologies/${technology.slug}/`);
  else
    warn(
      `Technology ${technology.slug} has group "${technology.group ?? "none"}" and is not listed on /technologies/`,
    );
}
for (const resource of resources) {
  if (published(resource.status)) reach(`/resources/${resource.slug}/`);
}
for (const page of allCompanyPages) {
  /* /company/ lists about + extra pages; legal reaches via the footer bar. */
  if (
    page.section !== "legal" &&
    published(page.status) &&
    ![
      "about",
      "approach",
      "how-we-work",
      "discovery-process",
      "engagement-models",
      "careers",
    ].includes(page.slug)
  )
    reach(`/company/${page.slug}/`);
}
for (const study of publishedCaseStudies) reach(`/case-studies/${study.slug}/`);

/* Curated related links across every entity. */
const withRelated = [
  ...services,
  ...practices,
  ...industries,
  ...useCases,
  ...technologies,
  ...resources,
  ...allCompanyPages,
  ...caseStudies,
];
for (const entity of withRelated) {
  for (const link of entity.related ?? []) reach(link.href);
  reach(entity.cta?.href);
}

const orphans = pages
  .map((p) => p.url)
  .filter((url) => !discoverable.has(url));

/* A link in navigation or content that no route generates is a 404. */
const brokenLinks = [...discoverable].filter((href) => !expectedUrls.has(href));

/* ==========================================================================
   7. SEO metadata uniqueness
   ========================================================================== */

const titleCounts = new Map<string, string[]>();
const descriptionCounts = new Map<string, string[]>();
for (const page of pages) {
  if (page.title) {
    titleCounts.set(page.title, [...(titleCounts.get(page.title) ?? []), page.url]);
  }
  if (page.description) {
    descriptionCounts.set(page.description, [
      ...(descriptionCounts.get(page.description) ?? []),
      page.url,
    ]);
  }
}
const duplicateTitles = [...titleCounts].filter(([, urls]) => urls.length > 1);
const duplicateDescriptions = [...descriptionCounts].filter(
  ([, urls]) => urls.length > 1,
);

const missingMetadata = pages.filter(
  (p) => p.source === "generateStaticParams" && (!p.title || !p.description),
);

/* ==========================================================================
   8. Report
   ========================================================================== */

const rule = "─".repeat(74);
const heading = (text: string) => `\n${text}\n${rule}`;

const complete = pages.filter((p) => p.markers.length === 0);
const incomplete = pages.filter((p) => p.markers.length > 0);

const draftRecords = allEntries.filter((e) => !published(e.status));

console.log(heading("BizzFly page inventory"));
console.log(`Site                  : ${site.url}`);
console.log(`Route templates       : ${pageTemplates.length}` +
  ` (${staticTemplates.length} static, ${dynamicTemplates.length} dynamic)`);
console.log(`Route handlers        : ${routeTemplates.filter((r) => r.file === "route").length} (not HTML pages)`);
console.log(`Content records       : ${allEntries.length}`);
console.log(`Published records     : ${publishedEntries.length}`);
console.log(`Draft / review        : ${draftRecords.length}`);
console.log(`Actual public URLs    : ${pages.length}`);
console.log(`Fully complete        : ${complete.length}`);
console.log(`Incomplete (markers)  : ${incomplete.length}`);
console.log(`Broken pages          : ${errors.length === 0 ? 0 : "see errors"}`);
console.log(`Orphan pages          : ${orphans.length}`);
console.log(`Sitemap URLs          : ${sitemapUrls.length}`);
console.log(`Built HTML pages      : ${built ? built.length : "no build output — run npm run build"}`);

console.log(heading("Pages by category"));
const categories = [...new Set(pages.map((p) => p.category))].sort();
const pad = (value: string | number, width: number) => String(value).padEnd(width);
console.log(
  `${pad("Category", 16)}${pad("Pages", 8)}${pad("Complete", 10)}${pad("Incomplete", 12)}${pad("Indexable", 10)}`,
);
for (const category of categories) {
  const inCategory = pages.filter((p) => p.category === category);
  console.log(
    pad(category, 16) +
      pad(inCategory.length, 8) +
      pad(inCategory.filter((p) => p.markers.length === 0).length, 10) +
      pad(inCategory.filter((p) => p.markers.length > 0).length, 12) +
      pad(inCategory.filter((p) => p.indexable).length, 10),
  );
}
console.log(
  pad("TOTAL", 16) +
    pad(pages.length, 8) +
    pad(complete.length, 10) +
    pad(incomplete.length, 12) +
    pad(pages.filter((p) => p.indexable).length, 10),
);

console.log(heading("Dynamic route generation"));
for (const source of dynamicSources) {
  console.log(
    `${pad(source.template, 26)} ${String(source.records.length).padStart(3)} page(s)` +
      (source.excluded.length > 0
        ? `   ${source.excluded.length} excluded (${source.excluded
            .map((e) => `${e.slug}: ${e.reason}`)
            .join(", ")})`
        : ""),
  );
}

if (process.argv.includes("--inventory")) {
  console.log(heading("Full page inventory"));
  console.log(
    `${pad("#", 5)}${pad("URL", 52)}${pad("Type", 22)}${pad("Source", 22)}${pad("Content", 12)}`,
  );
  pages.forEach((page, index) => {
    console.log(
      pad(index + 1, 5) +
        pad(page.url, 52) +
        pad(page.type, 22) +
        pad(page.source, 22) +
        pad(page.markers.length === 0 ? "complete" : page.markers.join(" "), 12),
    );
  });
}

if (incomplete.length > 0) {
  console.log(heading("Pages with unfinished-content markers"));
  for (const page of incomplete)
    console.log(`  ${pad(page.url, 46)} ${page.markers.join(", ")}`);
}

if (orphans.length > 0) {
  console.log(heading("Orphan pages (generated, linked from nothing)"));
  for (const url of orphans) console.log(`  ${url}`);
}

if (brokenLinks.length > 0) {
  console.log(heading("Internal links with no matching route"));
  for (const href of brokenLinks) console.log(`  ${href}`);
}

if (missingFromSitemap.length > 0) {
  console.log(heading("Indexable pages missing from the sitemap"));
  for (const url of missingFromSitemap) console.log(`  ${url}`);
}

if (duplicateTitles.length > 0 || duplicateDescriptions.length > 0) {
  console.log(heading("Duplicate SEO metadata"));
  for (const [title, urls] of duplicateTitles)
    console.log(`  title "${title}" on ${urls.join(", ")}`);
  for (const [description, urls] of duplicateDescriptions)
    console.log(`  description "${description.slice(0, 48)}…" on ${urls.join(", ")}`);
}

if (missingMetadata.length > 0) {
  console.log(heading("Pages missing SEO title or description"));
  for (const page of missingMetadata) console.log(`  ${page.url}`);
}

if (warnings.length > 0) {
  console.log(heading(`${warnings.length} warning(s)`));
  for (const message of warnings) console.log(`  ! ${message}`);
}

if (errors.length > 0) {
  console.error(heading(`${errors.length} error(s)`));
  for (const message of errors) console.error(`  ✗ ${message}`);
  console.error("");
  process.exit(1);
}

console.log(`\n${rule}`);
console.log(
  `${pages.length} public URLs generated, ${complete.length} content-complete.\n`,
);
