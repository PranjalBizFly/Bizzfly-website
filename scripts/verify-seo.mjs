#!/usr/bin/env node
/**
 * SEO validation against the built output.
 *
 * Runs on the real HTML that ships, not on the source, so it catches problems
 * a source-level check would miss — a template that drops an H1, a metadata
 * generator that collides on two routes, malformed JSON-LD.
 *
 *   npm run verify:seo   (requires a build first)
 *
 * Checks per page:
 *   - exactly one <h1>
 *   - heading hierarchy never skips a level
 *   - a self-referencing canonical
 *   - a title and a meta description, both non-empty
 *   - title and description unique across indexable pages
 *   - description within a sensible length
 *   - every JSON-LD block parses and declares @context and @type
 *   - Organization @id referenced by page-level schema (entity graph intact)
 *   - no placeholder markers in shipped HTML
 *   - noindex pages excluded from the sitemap
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const BUILD_DIR = join(process.cwd(), ".next", "server", "app");

if (!existsSync(BUILD_DIR)) {
  console.error("\nNo build output found. Run `npm run build` first.\n");
  process.exit(1);
}

const MARKERS = ["[CONTENT_REQUIRED]", "[VERIFY_WITH_BIZZFLY]", "lorem ipsum"];

/** Demo remnants from the previous WordPress theme that must never ship. */
const DEMO_REMNANTS = [
  "Logistic Company",
  "New York, USA",
  "1,500+ reviews",
  "4.9/5",
  "0 + years",
  "digitak",
  "hello-world",
  "Dynamic Data Ecosystem",
  "Intelligent Conversion Hub",
];

const errors = [];
const warnings = [];

function collectPages(dir, pages = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectPages(full, pages);
      continue;
    }
    if (!entry.endsWith(".html")) continue;
    const rel = relative(BUILD_DIR, full).split(sep).join("/");
    const route = rel.replace(/\.html$/, "");
    pages.push({
      route: route === "index" ? "/" : `/${route}/`,
      html: readFileSync(full, "utf8"),
    });
  }
  return pages;
}

const pages = collectPages(BUILD_DIR).filter(
  // Build artefact, not a routable URL — Next serves it at any unmatched path.
  ({ route }) => route !== "/_not-found/",
);

const titles = new Map();
const descriptions = new Map();

const attr = (html, re) => html.match(re)?.[1]?.trim();

for (const { route, html } of pages) {
  const isNoindex = /<meta name="robots"[^>]*content="[^"]*noindex/.test(html);

  /* --- Headings ------------------------------------------------------- */
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count === 0) errors.push(`${route} has no <h1>`);
  if (h1Count > 1) errors.push(`${route} has ${h1Count} <h1> elements`);

  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] - levels[i - 1] > 1) {
      errors.push(
        `${route} skips a heading level (h${levels[i - 1]} → h${levels[i]})`,
      );
      break;
    }
  }

  /* --- Canonical ------------------------------------------------------- */
  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical) {
    errors.push(`${route} has no canonical link`);
  } else {
    const path = canonical.replace(/^https?:\/\/[^/]+/, "");
    if (path !== route) {
      errors.push(`${route} canonical points at ${path} (should be self)`);
    }
  }

  /* --- Title and description ------------------------------------------- */
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  const description = attr(html, /<meta name="description" content="([^"]*)"/);

  if (!title) errors.push(`${route} has no <title>`);
  if (!description) errors.push(`${route} has no meta description`);

  if (title && !isNoindex) {
    const existing = titles.get(title);
    if (existing) errors.push(`Duplicate title on ${existing} and ${route}`);
    else titles.set(title, route);
  }

  if (description && !isNoindex) {
    const existing = descriptions.get(description);
    if (existing) {
      errors.push(`Duplicate meta description on ${existing} and ${route}`);
    } else {
      descriptions.set(description, route);
    }
    if (description.length > 175) {
      warnings.push(`${route} description is ${description.length} chars`);
    }
  }

  /* --- Open Graph ------------------------------------------------------- */
  if (!isNoindex) {
    if (!/<meta property="og:title"/.test(html)) {
      warnings.push(`${route} has no og:title`);
    }
    if (!/<meta property="og:image"/.test(html)) {
      warnings.push(`${route} has no og:image`);
    }
  }

  /* --- JSON-LD ---------------------------------------------------------- */
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ];

  if (blocks.length === 0) {
    warnings.push(`${route} has no structured data`);
  }

  let referencesOrganization = false;
  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      errors.push(`${route} has JSON-LD that does not parse`);
      continue;
    }
    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    for (const node of nodes) {
      if (!node["@context"]) {
        errors.push(`${route} has JSON-LD without @context`);
      }
      if (!node["@type"]) {
        errors.push(`${route} has JSON-LD without @type`);
      }
    }
    if (raw.includes("#organization")) referencesOrganization = true;
  }

  if (blocks.length > 0 && !referencesOrganization) {
    warnings.push(`${route} structured data does not reference the Organization entity`);
  }

  /* --- Placeholder markers and demo remnants --------------------------- */
  for (const marker of MARKERS) {
    if (html.toLowerCase().includes(marker.toLowerCase()) && !isNoindex) {
      errors.push(`${route} ships with "${marker}" in indexable HTML`);
    }
  }
  for (const remnant of DEMO_REMNANTS) {
    if (html.toLowerCase().includes(remnant.toLowerCase())) {
      errors.push(`${route} contains demo remnant "${remnant}"`);
    }
  }
}

/* --- Sitemap integrity --------------------------------------------------- */
const routes = new Set(pages.map((p) => p.route));
const noindexRoutes = new Set(
  pages
    .filter(({ html }) =>
      /<meta name="robots"[^>]*content="[^"]*noindex/.test(html),
    )
    .map((p) => p.route),
);

const sitemapFile = join(BUILD_DIR, "sitemap.xml.body");
if (existsSync(sitemapFile)) {
  const xml = readFileSync(sitemapFile, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, ""),
  );

  const seen = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) errors.push(`Sitemap lists ${loc} more than once`);
    seen.add(loc);
    if (!routes.has(loc)) {
      errors.push(`Sitemap lists ${loc}, which is not a generated route`);
    }
    if (noindexRoutes.has(loc)) {
      errors.push(`Sitemap lists ${loc}, which is noindex`);
    }
  }
  console.log(`Sitemap entries     : ${locs.length}`);
} else {
  warnings.push("Sitemap body not found in build output; skipped sitemap checks");
}

/* --- Report -------------------------------------------------------------- */
console.log(`\nSEO validation\n${"─".repeat(66)}`);
console.log(`Pages checked       : ${pages.length}`);
console.log(`Unique titles       : ${titles.size}`);
console.log(`Unique descriptions : ${descriptions.size}`);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const message of warnings) console.log(`  ! ${message}`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} error(s):`);
  for (const message of errors) console.error(`  ✗ ${message}`);
  console.error("");
  process.exit(1);
}

console.log(`${"─".repeat(66)}`);
console.log("\nAll SEO checks passed.\n");
