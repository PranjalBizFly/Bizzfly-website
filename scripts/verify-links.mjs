#!/usr/bin/env node
/**
 * Internal link verification.
 *
 * Every internal href in the content model must resolve to a route the app
 * actually generates. Catches the most common regression on a content-driven
 * site: a link written before the page exists.
 *
 * Runs against the built output, so it validates what actually ships.
 *   node scripts/verify-links.mjs
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const BUILD_DIR = join(process.cwd(), ".next", "server", "app");

if (!existsSync(BUILD_DIR)) {
  console.error(
    "\nNo build output found. Run `npm run build` before verifying links.\n",
  );
  process.exit(1);
}

/** Collect every prerendered route from the build output. */
function collectRoutes(dir, routes = new Set()) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectRoutes(full, routes);
      continue;
    }
    if (!entry.endsWith(".html")) continue;

    const rel = relative(BUILD_DIR, full).split(sep).join("/");
    const route = rel.replace(/\.html$/, "");
    routes.add(route === "index" ? "/" : `/${route}/`);
  }
  return routes;
}

const routes = collectRoutes(BUILD_DIR);

/** Pull internal hrefs out of the rendered HTML. */
function collectLinks(dir, links = new Map()) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectLinks(full, links);
      continue;
    }
    if (!entry.endsWith(".html")) continue;

    const source = relative(BUILD_DIR, full).split(sep).join("/");
    const html = readFileSync(full, "utf8");

    for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      const href = match[1];
      // Static assets and Next internals are not routes.
      if (href.startsWith("/_next") || /\.[a-z0-9]{2,5}$/i.test(href)) continue;
      if (!links.has(href)) links.set(href, new Set());
      links.get(href).add(source);
    }
  }
  return links;
}

const links = collectLinks(BUILD_DIR);
const broken = [];

for (const [href, sources] of links) {
  if (routes.has(href)) continue;
  // A dynamic route not prerendered is still valid if its segment exists.
  broken.push({ href, sources: [...sources] });
}

console.log(`\nInternal link check\n${"─".repeat(66)}`);
console.log(`Routes generated : ${routes.size}`);
console.log(`Unique links     : ${links.size}`);

if (broken.length > 0) {
  console.error(`\n${broken.length} broken internal link(s):\n`);
  for (const { href, sources } of broken) {
    console.error(`  ✗ ${href}`);
    console.error(`      linked from: ${sources.slice(0, 4).join(", ")}`);
  }
  console.error("");
  process.exit(1);
}

console.log(`${"─".repeat(66)}`);
console.log(`\nAll ${links.size} internal links resolve.\n`);
