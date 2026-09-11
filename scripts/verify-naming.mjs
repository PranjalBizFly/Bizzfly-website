#!/usr/bin/env node
/**
 * Naming consistency audit — does every page get called one thing?
 *
 *   npm run verify:naming
 *
 * A page has three names a visitor can meet at once: the URL, the name in the
 * breadcrumb / H1 / nav (all of which read `title`), and the label on whatever
 * link brought them there. When those disagree — "Home / Services / Websites &
 * Digital Experience" sitting above /services/web-development/ — the visitor is
 * told the page is two different things, and so is a search engine reading the
 * BreadcrumbList schema against the canonical URL.
 *
 * Two checks:
 *   1. slug vs title, for every routed entity in the content layer
 *   2. hand-written link labels vs the title of the page they open
 *
 * Both are deliberately forgiving. "&" against "and", a hyphen inside a word, a
 * plural, a stop word, a CTA's lead-in verb and a URL shorter than the name are
 * all spellings of one name, not conflicts. What gets reported is a URL or a
 * label carrying a significant word the page itself never uses.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, sep } from "node:path";

import { practices } from "@/content/practices";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { useCases } from "@/content/use-cases";
import { technologies } from "@/content/technologies";
import { resources } from "@/content/resources";
import { allCompanyPages } from "@/content/company";
import { caseStudies } from "@/content/case-studies";

const COLLECTIONS = [
  ["practice", "/services", practices],
  ["service", "/services", services],
  ["industry", "/industries", industries],
  ["use-case", "/use-cases", useCases],
  ["technology", "/technologies", technologies],
  ["resource", "/resources", resources],
  ["company", "/company", allCompanyPages],
  ["case-study", "/case-studies", caseStudies],
];

/**
 * URLs allowed to disagree with their page name, each for a stated reason.
 * Listed rather than pattern-matched, so adding one stays a deliberate act.
 */
const ACCEPTED = new Set([
  "/company/faq/", // FAQ is the universal short form.
  "/industries/smes/", // SMEs is how the sector refers to itself.
  "/resources/why-ai-overviews-cut-your-clicks/", // Tense only.
  "/resources/automation-business-case-guide/", // "-guide" names the format
  "/resources/ai-governance-guide/", // rather than the subject, and keeps
  "/resources/website-brief-guide/", // these four resource URLs short.
  "/resources/software-requirements-guide/",
  // Both of these 301 to their top-level equivalent (/about-us/, /our-approach/),
  // so no visitor ever sees the name against the URL.
  "/company/about/",
  "/company/approach/",
  // "Hallucination (AI)" — the URL's "ai" is in the name, inside the gloss
  // that stripGloss removes before comparing.
  "/resources/what-is-hallucination-in-ai/",
]);

/**
 * The glossary answers the question people type, so its URLs carry a "what is"
 * the H1 deliberately drops — /resources/what-is-schema-markup/ is headed
 * "Schema Markup". The URL saying more than the name is the point there.
 */
const GLOSSARY_PREFIX = /^what-is-(?:an?-)?/;

/** A trailing "(AEO)" glosses the name rather than forming part of it. */
const stripGloss = (title) => title.replace(/\s*\([^)]*\)\s*$/, "").trim();

const STOP = new Set([
  "and", "the", "a", "an", "of", "for", "to", "in", "on", "your", "our", "with",
  "is", "what", "how", "why", "are", "be", "vs", "or",
]);

/** Lead-in words a CTA wraps a page name in, on top of the ordinary stop words. */
const CTA_STOP = new Set([
  ...STOP,
  "read", "see", "explore", "view", "learn", "discover", "about", "more",
  "us", "we", "here", "all", "browse", "compare", "get", "page",
]);

/** Crude singular, so "websites" and "website" compare equal. */
const stem = (w) =>
  w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w;

/**
 * The significant words a string carries, as a set.
 *
 * In a slug a hyphen separates words; in a title it can do either — "On-Page
 * SEO" is two words, "E-commerce" is one — so the caller picks a reading and
 * the comparison below tries both.
 */
function terms(value, { hyphenJoins = false, stop = STOP } = {}) {
  return new Set(
    value
      .toLowerCase()
      .replace(/([a-z0-9])-(?=[a-z0-9])/g, hyphenJoins ? "$1" : "$1 ")
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((w) => w && !stop.has(w))
      .map(stem),
  );
}

const minus = (a, b) => [...a].filter((w) => !b.has(w));

/** Scores both hyphen readings of the title and judges on the kinder one. */
function compare(left, title, stop = STOP) {
  const l = terms(left, { stop });
  return [false, true]
    .map((hyphenJoins) => {
      const t = terms(title, { hyphenJoins, stop });
      const leftOnly = minus(l, t);
      const titleOnly = minus(t, l);
      return { leftOnly, titleOnly, distance: leftOnly.length + titleOnly.length };
    })
    .sort((a, b) => a.distance - b.distance)[0];
}

/* ── 1. URL vs page name ──────────────────────────────────────────────── */

/*
 * Two directions, and they are not equally bad.
 *
 * A name carrying words its URL does not is what a visitor actually trips
 * over: "Home / Services / Websites & Digital Experience" over
 * /services/web-development/ reads as two names for one page. That is an
 * error.
 *
 * A URL carrying words the name does not is usually a deliberate search
 * phrasing — the glossary's "what-is-" prefix, a "-guide" suffix — and is
 * reported separately as something to look at, not something to fix.
 */
const nameSaysMore = [];
const urlSaysMore = [];
let checked = 0;

for (const [kind, base, items] of COLLECTIONS) {
  for (const item of items) {
    checked += 1;
    const url = `${base}/${item.slug}/`;
    if (ACCEPTED.has(url)) continue;

    const slug = item.slug.replace(GLOSSARY_PREFIX, "");
    const { leftOnly: slugOnly, titleOnly } = compare(slug, stripGloss(item.title));
    const row = { kind, url, title: item.title, slugOnly, titleOnly };

    if (titleOnly.length) nameSaysMore.push(row);
    else if (slugOnly.length) urlSaysMore.push(row);
  }
}

/* ── 2. Link label vs the name of the page it opens ───────────────────── */

const titleByUrl = new Map();
for (const [, base, items] of COLLECTIONS) {
  for (const i of items) titleByUrl.set(`${base}/${i.slug}/`, i.title);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(name)) out.push(full);
  }
  return out;
}

/*
 * `label` and `href` as immediate neighbours in one object literal.
 *
 * Adjacency is what keeps the pairing honest: a card carrying its own `href`
 * above a list of items would otherwise hand that URL to the first item's
 * label and report a mismatch that does not exist.
 */
const PAIRS = [
  /label:\s*"([^"]+)",\s*href:\s*"(\/[^"]*)"/g,
  /href:\s*"(\/[^"]*)",\s*label:\s*"([^"]+)"/g,
];

const labelFindings = [];
const seen = new Set();

for (const file of [...walk("content"), ...walk("app"), ...walk("components")]) {
  const src = readFileSync(file, "utf8");
  for (const [index, re] of PAIRS.entries()) {
    for (const m of src.matchAll(re)) {
      const label = index === 0 ? m[1] : m[2];
      const href = index === 0 ? m[2] : m[1];
      const title = titleByUrl.get(href);
      if (!title || label === title) continue;

      const { leftOnly } = compare(label, title, CTA_STOP);
      if (leftOnly.length === 0) continue;

      const key = `${href}|${label}`;
      if (seen.has(key)) continue;
      seen.add(key);

      labelFindings.push({
        file: file.split(sep).join("/"),
        href,
        label,
        title,
        labelOnly: leftOnly,
      });
    }
  }
}

/* ── Report ───────────────────────────────────────────────────────────── */

const rule = "-".repeat(66);
console.log(`\nNaming consistency\n${rule}`);
console.log(`Routed pages checked    : ${checked}`);
console.log(`Allowed exceptions      : ${ACCEPTED.size}`);
console.log(`Name says more than URL : ${nameSaysMore.length}`);
console.log(`URL says more than name : ${urlSaysMore.length}`);
console.log(`Link label vs page name : ${labelFindings.length}`);
console.log(rule);

if (nameSaysMore.length) {
  console.log(`\n${nameSaysMore.length} page(s) whose name says more than their URL:\n`);
  for (const f of nameSaysMore) {
    console.log(`  [${f.kind}] ${f.url}`);
    console.log(`      page name   : ${f.title}`);
    console.log(`      only in name: ${f.titleOnly.join(", ")}`);
    if (f.slugOnly.length) console.log(`      only in url : ${f.slugOnly.join(", ")}`);
  }
}

if (urlSaysMore.length) {
  console.log(`\n${urlSaysMore.length} page(s) whose URL says more than their name (review, not error):\n`);
  for (const f of urlSaysMore) {
    console.log(`  [${f.kind}] ${f.url}`);
    console.log(`      page name  : ${f.title}`);
    console.log(`      only in url: ${f.slugOnly.join(", ")}`);
  }
}

if (labelFindings.length) {
  console.log(`\n${labelFindings.length} link label(s) naming their target differently:\n`);
  for (const f of labelFindings) {
    console.log(`  ${f.href}`);
    console.log(`      link says   : ${f.label}`);
    console.log(`      page says   : ${f.title}`);
    console.log(`      only in link: ${f.labelOnly.join(", ")}`);
    console.log(`      in          : ${f.file}`);
  }
}

console.log(
  nameSaysMore.length || labelFindings.length
    ? ""
    : "\nEvery page is called the same thing by its URL, its name and its links.\n",
);
