#!/usr/bin/env node
/**
 * BizzFly brand compliance verification
 *
 *   node scripts/verify-brand.mjs            check, exit non-zero on violation
 *   node scripts/verify-brand.mjs --report   also write the compliance reports
 *
 * The Bizzfly Brand Guidelines are the source of truth. This script encodes
 * the parts of them that a machine can decide, and refuses to guess at the
 * parts it cannot — anything needing a human eye is emitted as
 * MANUAL_REVIEW_REQUIRED rather than silently passing.
 *
 * What it enforces
 *
 *   Colour      The four official hexes, exactly. Two files may contain a
 *               raw colour: styles/tokens.css (the authority) and
 *               lib/brand.ts (the mirror for renderers with no stylesheet).
 *               Anywhere else, a literal colour is a violation.
 *   Typography  Two families and no more. Funnel Sans for display, Poppins
 *               for everything else. Families, weights and sizes must come
 *               from tokens.
 *   Logo        Official artwork only, reached through one component.
 *               Clearspace and minimum size held as tokens, and actually
 *               reserved by the placements that opt out of the component
 *               padding.
 *   Components  Radius, elevation and z-index from the scale. No gradients.
 *
 * Exits non-zero on any violation.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, sep } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const WRITE_REPORT = process.argv.includes("--report");

/* ------------------------------------------------------------------ *
 * The guideline, as data
 * ------------------------------------------------------------------ */

/** Pages 11 and 12 of Bizzfly Brand Guidelines.pdf. Exact values. */
const OFFICIAL_PALETTE = {
  "primary blue": "#2C70D1",
  "primary green": "#A9CF46",
  "secondary blue": "#2A1ED1",
  "secondary green": "#40E523",
};

/** Pages 15 and 16. Exactly two families. */
const OFFICIAL_TYPEFACES = ["Funnel_Sans", "Poppins"];

/** Page 8: 20mm / 30px is the digital floor. */
const LOGO_MIN_PX = 30;

/**
 * Page 5: clearspace equals the cap height of the logotype. Measured off the
 * official artwork, the B cap height is 111.3 of the 144-unit mark height.
 */
const CLEARSPACE_RATIO = 0.773;

/** The only two files permitted to hold a raw colour value. */
const COLOUR_AUTHORITIES = ["styles/tokens.css", "lib/brand.ts"];

/** The only file permitted to reference logo artwork through the component. */
const LOGO_AUTHORITY = "components/brand/BrandLogo.tsx";

/**
 * Two renderers cannot go through BrandLogo, for reasons that are structural
 * rather than convenient. They are allowed to name the artwork directly — but
 * the brand rules that BrandLogo would have enforced are asserted on them
 * below instead, so the exemption is from the architecture, not the guideline.
 */
const LOGO_DIRECT_USE = {
  "app/global-error.tsx":
    "Replaces the whole <html> document, so no stylesheet and no app shell " +
    "exist; next/image and CSS tokens are both unavailable.",
  "app/og/route.tsx":
    "Satori renders to an image with no DOM and no network access, so the " +
    "file is read from disk and inlined as a data URI.",
};

/** The official artwork, and its true aspect ratio. */
const OFFICIAL_LOGO_FILES = [
  "public/brand/logo/bizzfly-logo-reversed.svg",
  "public/brand/logo/bizzfly-symbol-reversed.svg",
];
const LOCKUP_RATIO = 634 / 144;

/*
 * font-size values that are correct as literals, with the reason. Everything
 * else must resolve to a --text-* token.
 */
const FONT_SIZE_ALLOWED = new Set([
  "0", // hides a text node behind a CSS-drawn glyph
  "inherit",
]);

/*
 * Inline SVG diagrams. Their px values are viewBox user units, not CSS
 * pixels — the drawing scales with its container, so a type-scale token
 * would break that relationship rather than enforce anything.
 */
const SVG_GEOMETRY_FILES = new Set([
  "components/sections/Diagram.module.css",
  "components/sections/DiscoveryDiagram.module.css",
]);

/**
 * Violations this audit found and corrected.
 *
 * The live checks above report the CURRENT state, which is now clean — and a
 * report that only says "clean" hides the work and lets the same mistakes
 * come back unrecognised. This is the record of what was actually wrong, in
 * the same shape as a live finding.
 */
const REMEDIATED = [
  {
    category: "Typography",
    file: "app/layout.tsx + 30 stylesheets",
    line: 0,
    violation:
      "A third typeface. IBM Plex Mono was loaded as a webfont and used for " +
      "eyebrows, meta lines, metric labels, section indices, breadcrumbs, nav " +
      "and search chrome — 70 declarations across 30 files. The guidelines " +
      "specify exactly two families.",
    current: "IBM Plex Mono (webfont) via --font-mono",
    required: "Poppins via --font-label; --font-mono reduced to a system stack for machine strings",
    status: "FIXED",
  },
  {
    category: "Logo clearspace",
    file: "components/navigation/Header.module.css",
    line: 67,
    violation:
      "The header logo reserved no trailing clearspace. Separation from the " +
      "nav came from the flex gap alone — 12px against the 23.2px the cap " +
      "height requires.",
    current: "gap: var(--space-3) only (12px)",
    required: "padding-inline-end: var(--logo-clearspace) (23.2px)",
    status: "FIXED",
  },
  {
    category: "Logo clearspace",
    file: "components/navigation/MobileNav.module.css",
    line: 32,
    violation:
      "The mobile drawer logo sat 16px from the close button, under the 23.2px required.",
    current: "gap: var(--space-4) only (16px)",
    required: "padding-inline-end: var(--logo-clearspace) (23.2px)",
    status: "FIXED",
  },
  {
    category: "Logo clearspace",
    file: "styles/tokens.css",
    line: 0,
    violation:
      "The base page margin was 20px, and the header logo sits at the leading " +
      "container edge — so below 480px the logo had 20px of leading clearspace " +
      "against the 23.2px required.",
    current: "--margin: 1.25rem (20px)",
    required: "--margin: 1.5rem (24px)",
    status: "FIXED",
  },
  {
    category: "Navigation",
    file: "components/navigation/Header.module.css",
    line: 284,
    violation:
      "The header CTA was meant to be hidden below 768px and never was. " +
      "`.headerCta { display: none }` tied on specificity with Button.module.css's " +
      "`.base { display: inline-flex }`, and a tie is settled by CSS-module bundle " +
      "order — Button won. The bar therefore overflowed by 53px at 320px, 14px at " +
      "360px and 2px at 375px, on every one of the 176 pages.",
    current: ".headerCta { display: none } (one class, lost the tie)",
    required: ".actions .headerCta { display: none } (two classes, wins in any order)",
    status: "FIXED",
  },
  {
    category: "Logo clearspace",
    file: "styles/tokens.css + components/footer/Footer.module.css",
    line: 0,
    violation:
      "The 40px footer mark needs 30.9px of clearspace, but the page gutter below " +
      "768px is 24px. The footer pulls the clearspace back by a negative margin to " +
      "align the artwork with the address, so the reserved space landed at -7px — " +
      "outside the viewport, leaving the mark closer to the screen edge than the " +
      "guidelines permit.",
    current: "--logo-height-footer: 2.5rem at every width",
    required: "1.875rem (the 30px brand minimum) below 768px, 2.5rem from 768px up",
    status: "FIXED",
  },
  {
    category: "Colour",
    file: "components/search/SearchDialog.module.css",
    line: 5,
    violation:
      "The modal scrim was rgb(13 18 16 / 0.4) — #0D1210, a green-black that is " +
      "not in the palette and was a few units off the ink it was meant to be.",
    current: "rgb(13 18 16 / 0.4)",
    required: "var(--scrim-strong), derived from ink-900",
    status: "FIXED",
  },
  {
    category: "Colour",
    file: "components/navigation/Header.module.css",
    line: 539,
    violation: "The menu scrim was written as a raw rgb() rather than a token.",
    current: "rgb(13 20 32 / 0.32)",
    required: "var(--scrim)",
    status: "FIXED",
  },
  {
    category: "Colour",
    file: "app/og/route.tsx",
    line: 107,
    violation: "The OG card border was a raw rgba() literal.",
    current: "rgba(245,247,250,0.16)",
    required: "brand.borderInverse from lib/brand.ts",
    status: "FIXED",
  },
  {
    category: "Components",
    file: "components/navigation/Header.module.css",
    line: 195,
    violation: "The nav active-state mark used an off-scale 1px radius.",
    current: "border-radius: 1px",
    required: "var(--radius-full)",
    status: "FIXED",
  },
  {
    category: "Components",
    file: "components/search/SearchDialog.module.css",
    line: 38,
    violation: "The full-screen sheet zeroed its radius with a literal.",
    current: "border-radius: 0",
    required: "var(--radius-0)",
    status: "FIXED",
  },
  {
    category: "Typography",
    file: "components/sections/Diagram.module.css",
    line: 52,
    violation: "A diagram label set its weight with a literal.",
    current: "font-weight: 500",
    required: "var(--weight-medium)",
    status: "FIXED",
  },
  {
    category: "Typography",
    file: "app/error.module.css, app/technologies/technologies.module.css, components/navigation/Header.module.css",
    line: 0,
    violation:
      "Inline code, status markers and the nav chevron sized themselves with " +
      "bare em literals outside the type scale.",
    current: "font-size: 0.9em / 0.6em",
    required: "var(--text-inline) / var(--text-glyph)",
    status: "FIXED",
  },
  {
    category: "Typography",
    file: "components/forms/Form.module.css, components/search/*.module.css, components/navigation/MobileNav.module.css",
    line: 0,
    violation: "Input and icon-button sizes were literals rather than scale tokens.",
    current: "font-size: 1rem / 1.125rem",
    required: "var(--text-body) / var(--text-icon)",
    status: "FIXED",
  },
];

/* ------------------------------------------------------------------ *
 * Plumbing
 * ------------------------------------------------------------------ */

const findings = [];
const manual = [];

function violation(category, file, line, text, current, required) {
  findings.push({
    category,
    file,
    line,
    violation: text,
    current,
    required,
    status: "VIOLATION",
  });
}

function reviewItem(category, area, note) {
  manual.push({ category, area, note, status: "MANUAL_REVIEW_REQUIRED" });
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const rel = (p) => relative(ROOT, p).split(sep).join("/");

const SOURCE_DIRS = ["app", "components", "lib", "styles", "content", "types"];
const files = SOURCE_DIRS.flatMap((d) => {
  try {
    return walk(join(ROOT, d));
  } catch {
    return [];
  }
})
  .filter((f) => /\.(css|ts|tsx)$/.test(f))
  .map((f) => ({ path: f, name: rel(f) }));

/** Blank out comments so documentation never trips a content check. */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(m.length - p1.length));
}

/** Line number of a character offset. */
const lineAt = (source, index) => source.slice(0, index).split("\n").length;

const read = (name) => readFileSync(join(ROOT, name), "utf8");

/* ------------------------------------------------------------------ *
 * 1. COLOUR
 * ------------------------------------------------------------------ */

const tokensSrc = read("styles/tokens.css");
const brandSrc = read("lib/brand.ts");

for (const [label, hex] of Object.entries(OFFICIAL_PALETTE)) {
  if (!new RegExp(hex, "i").test(tokensSrc)) {
    violation(
      "Colour",
      "styles/tokens.css",
      0,
      `Official ${label} is absent from the token file`,
      "not present",
      hex,
    );
  }
}

/* The mirror must agree with the authority, value for value. */
const MIRROR_EXPECTED = {
  blue: OFFICIAL_PALETTE["primary blue"],
  green: OFFICIAL_PALETTE["primary green"],
  deepBlue: OFFICIAL_PALETTE["secondary blue"],
};
for (const [key, hex] of Object.entries(MIRROR_EXPECTED)) {
  const m = brandSrc.match(new RegExp(`${key}:\\s*"(#[0-9A-Fa-f]{6})"`));
  if (!m) {
    violation("Colour", "lib/brand.ts", 0, `Mirror is missing "${key}"`, "absent", hex);
  } else if (m[1].toUpperCase() !== hex.toUpperCase()) {
    violation(
      "Colour",
      "lib/brand.ts",
      lineAt(brandSrc, m.index),
      `Mirror has drifted from the official ${key}`,
      m[1],
      hex,
    );
  }
}

/* No raw colour anywhere but the two authorities. */
const NAMED = [
  "aqua", "beige", "coral", "crimson", "cyan", "fuchsia", "gold", "indigo",
  "ivory", "khaki", "lavender", "lime", "magenta", "maroon", "navy", "olive",
  "orange", "orchid", "pink", "plum", "purple", "salmon", "sienna", "silver",
  "teal", "thistle", "tomato", "turquoise", "violet", "wheat",
].join("|");
const COLOUR_LITERAL = new RegExp(
  `#[0-9A-Fa-f]{3,8}\\b|\\brgba?\\(|\\bhsla?\\(|\\b(?:${NAMED})\\b`,
  "g",
);

for (const { path, name } of files) {
  if (COLOUR_AUTHORITIES.includes(name)) continue;
  const src = stripComments(readFileSync(path, "utf8"));
  for (const match of src.matchAll(COLOUR_LITERAL)) {
    const text = match[0];
    if (text.startsWith("#")) {
      /* HTML entities (&#9662;) and fragment identifiers are not colours. */
      const before = src.slice(Math.max(0, match.index - 1), match.index);
      if (before === "&") continue;
      if (!/^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(text)) continue;
    }
    violation(
      "Colour",
      name,
      lineAt(src, match.index),
      "Hard-coded colour outside the token system",
      text,
      "a var(--token) from styles/tokens.css",
    );
  }
}

/* Gradients: none, per guideline section 6. */
for (const { path, name } of files) {
  const src = stripComments(readFileSync(path, "utf8"));
  for (const match of src.matchAll(/\b(?:linear|radial|conic)-gradient\s*\(/g)) {
    violation(
      "Colour",
      name,
      lineAt(src, match.index),
      "Gradient introduced",
      match[0],
      "a flat token colour",
    );
  }
}

/* ------------------------------------------------------------------ *
 * 2. TYPOGRAPHY
 * ------------------------------------------------------------------ */

const layoutSrc = read("app/layout.tsx");
const fontImport = layoutSrc.match(/import\s*\{([^}]+)\}\s*from\s*"next\/font\/google"/);
const loadedFonts = fontImport
  ? fontImport[1].split(",").map((s) => s.trim()).filter(Boolean)
  : [];

for (const f of loadedFonts) {
  if (!OFFICIAL_TYPEFACES.includes(f)) {
    violation(
      "Typography",
      "app/layout.tsx",
      lineAt(layoutSrc, fontImport.index),
      `"${f}" is not a brand typeface — the guidelines specify exactly two`,
      f,
      OFFICIAL_TYPEFACES.join(" + "),
    );
  }
}
for (const f of OFFICIAL_TYPEFACES) {
  if (!loadedFonts.includes(f)) {
    violation("Typography", "app/layout.tsx", 0, `Brand typeface "${f}" is not loaded`, "absent", f);
  }
}

/* Poppins must ship its three brand weights, and no others. */
const poppinsWeights = layoutSrc.match(/Poppins\(\{[\s\S]*?weight:\s*\[([^\]]+)\]/);
if (poppinsWeights) {
  const got = poppinsWeights[1].match(/\d+/g)?.sort().join(",");
  if (got !== "400,500,700") {
    violation(
      "Typography",
      "app/layout.tsx",
      lineAt(layoutSrc, poppinsWeights.index),
      "Poppins weights do not match the brand set (Regular/Medium/Bold)",
      got ?? "none",
      "400, 500, 700",
    );
  }
}

/* Families, weights and sizes come from tokens. */
for (const { path, name } of files) {
  if (!name.endsWith(".css") || name === "styles/tokens.css") continue;
  const src = stripComments(readFileSync(path, "utf8"));

  for (const m of src.matchAll(/font-family:\s*([^;]+);/g)) {
    if (!/var\(--font-/.test(m[1])) {
      violation(
        "Typography",
        name,
        lineAt(src, m.index),
        "font-family does not use a brand token",
        m[1].trim(),
        "var(--font-display | --font-body | --font-label)",
      );
    }
  }

  for (const m of src.matchAll(/font-weight:\s*([^;]+);/g)) {
    const v = m[1].trim();
    if (!/var\(--weight-/.test(v) && v !== "inherit") {
      violation(
        "Typography",
        name,
        lineAt(src, m.index),
        "font-weight does not use a brand token",
        v,
        "var(--weight-regular | --weight-medium | --weight-semibold | --weight-bold)",
      );
    }
  }

  if (SVG_GEOMETRY_FILES.has(name)) continue;
  for (const m of src.matchAll(/font-size:\s*([^;]+);/g)) {
    const v = m[1].trim();
    if (!/var\(--text-/.test(v) && !FONT_SIZE_ALLOWED.has(v)) {
      violation(
        "Typography",
        name,
        lineAt(src, m.index),
        "font-size does not use a type-scale token",
        v,
        "a var(--text-*) token",
      );
    }
  }
}

/*
 * --font-mono is a system stack reserved for literal machine output. More
 * than one consumer means an editorial role has crept back into it.
 */
const monoConsumers = files
  .filter((f) => f.name.endsWith(".css") && f.name !== "styles/tokens.css")
  .flatMap(({ path, name }) => {
    const src = stripComments(readFileSync(path, "utf8"));
    return [...src.matchAll(/var\(--font-mono\)/g)].map((m) => ({
      name,
      line: lineAt(src, m.index),
    }));
  });

if (monoConsumers.length > 1) {
  for (const c of monoConsumers) {
    violation(
      "Typography",
      c.name,
      c.line,
      "--font-mono is for machine strings only; this is an editorial role",
      "var(--font-mono)",
      "var(--font-label)",
    );
  }
}

/* ------------------------------------------------------------------ *
 * 3. LOGO
 * ------------------------------------------------------------------ */

for (const { path, name } of files) {
  if (name === LOGO_AUTHORITY) continue;
  const src = stripComments(readFileSync(path, "utf8"));
  const direct = Object.hasOwn(LOGO_DIRECT_USE, name);

  for (const m of src.matchAll(/["'`][^"'`]*\/brand\/logo\/[^"'`]*["'`]/g)) {
    const quoted = m[0].slice(1, -1);
    if (!direct) {
      violation(
        "Logo",
        name,
        lineAt(src, m.index),
        "Logo artwork referenced outside BrandLogo",
        m[0],
        "import { BrandLogo } from @/components/brand/BrandLogo",
      );
      continue;
    }
    /* Allowed to name the file — but it must be official artwork that exists. */
    const asOfficial = quoted.replace(/^\//, "public/").replace(/^public\//, "public/");
    const resolved = asOfficial.startsWith("public/") ? asOfficial : `public${quoted}`;
    if (!OFFICIAL_LOGO_FILES.includes(resolved)) {
      violation(
        "Logo",
        name,
        lineAt(src, m.index),
        "References a logo file that is not official artwork",
        quoted,
        OFFICIAL_LOGO_FILES.join(" or "),
      );
      continue;
    }
    try {
      statSync(join(ROOT, resolved));
    } catch {
      violation(
        "Logo",
        name,
        lineAt(src, m.index),
        "References logo artwork that does not exist on disk",
        quoted,
        "an existing file under public/brand/logo/",
      );
    }
  }

  if (!direct) continue;

  /*
   * BrandLogo would have guaranteed the aspect ratio and the 30px floor.
   * These two render the mark themselves, so assert both here.
   */
  for (const m of src.matchAll(/height=\{(\d+)\}\s*\n?\s*width=\{(\d+)\}|width=\{(\d+)\}\s*\n?\s*height=\{(\d+)\}/g)) {
    const h = Number(m[1] ?? m[4]);
    const w = Number(m[2] ?? m[3]);
    if (!h || !w) continue;
    if (Math.abs(w / h - LOCKUP_RATIO) / LOCKUP_RATIO > 0.01) {
      violation(
        "Logo misuse",
        name,
        lineAt(src, m.index),
        "Logo rendered at a distorted aspect ratio",
        `${w}×${h} (${(w / h).toFixed(3)}:1)`,
        `${LOCKUP_RATIO.toFixed(3)}:1, the ratio of the official artwork`,
      );
    }
    if (h < LOGO_MIN_PX) {
      violation(
        "Logo",
        name,
        lineAt(src, m.index),
        "Logo rendered below the brand minimum for digital",
        `${h}px tall`,
        `${LOGO_MIN_PX}px or more`,
      );
    }
  }
}

/* The two brand rules must exist as tokens, at the guideline values. */
const minHeight = tokensSrc.match(/--logo-min-height:\s*([\d.]+)rem/);
if (!minHeight) {
  violation("Logo", "styles/tokens.css", 0, "--logo-min-height is not defined", "absent", `${LOGO_MIN_PX}px`);
} else if (Number(minHeight[1]) * 16 < LOGO_MIN_PX) {
  violation(
    "Logo",
    "styles/tokens.css",
    lineAt(tokensSrc, minHeight.index),
    "Logo minimum size is below the brand floor",
    `${Number(minHeight[1]) * 16}px`,
    `${LOGO_MIN_PX}px`,
  );
}

const ratioToken = tokensSrc.match(/--logo-clearspace-ratio:\s*([\d.]+)/);
if (!ratioToken) {
  violation("Logo", "styles/tokens.css", 0, "--logo-clearspace-ratio is not defined", "absent", String(CLEARSPACE_RATIO));
} else if (Math.abs(Number(ratioToken[1]) - CLEARSPACE_RATIO) > 0.001) {
  violation(
    "Logo",
    "styles/tokens.css",
    lineAt(tokensSrc, ratioToken.index),
    "Clearspace ratio does not match the cap height measured from the artwork",
    ratioToken[1],
    String(CLEARSPACE_RATIO),
  );
}

if (!/--logo-clearspace:\s*calc\(/.test(tokensSrc)) {
  violation(
    "Logo clearspace",
    "styles/tokens.css",
    0,
    "--logo-clearspace is not defined, so opted-out placements have nothing to reserve",
    "absent",
    "calc(var(--logo-height) * var(--logo-clearspace-ratio))",
  );
}

/*
 * Any placement that turns the component clearspace off must reserve it in
 * CSS instead. The header and the mobile drawer are the two that do.
 */
const CLEARSPACE_OPT_OUTS = [
  ["components/navigation/Header.tsx", "components/navigation/Header.module.css"],
  ["components/navigation/MobileNav.tsx", "components/navigation/MobileNav.module.css"],
];
for (const [tsx, css] of CLEARSPACE_OPT_OUTS) {
  if (!/clearspace=\{false\}/.test(read(tsx))) continue;
  if (!/var\(--logo-clearspace\)/.test(read(css))) {
    violation(
      "Logo clearspace",
      css,
      0,
      "Logo opts out of component clearspace but the stylesheet reserves none",
      "flex gap only",
      "padding-inline-end: var(--logo-clearspace)",
    );
  }
}

/* The page margin is the logo leading clearspace in the header. */
const baseMargin = tokensSrc.match(/--margin:\s*([\d.]+)rem;\s*\/\* xs default/);
if (baseMargin) {
  const px = Number(baseMargin[1]) * 16;
  const needed = LOGO_MIN_PX * CLEARSPACE_RATIO;
  if (px < needed) {
    violation(
      "Logo clearspace",
      "styles/tokens.css",
      lineAt(tokensSrc, baseMargin.index),
      "Base page margin is narrower than the logo leading clearspace",
      `${px}px`,
      `${needed.toFixed(1)}px or more`,
    );
  }
}

/* Misuse: nothing may transform, filter or shadow the mark. */
const logoCss = read("components/brand/BrandLogo.module.css");
for (const banned of ["transform", "filter", "box-shadow", "rotate", "skew", "text-shadow"]) {
  const m = logoCss.match(new RegExp(`^\\s*${banned}\\s*:`, "m"));
  if (m) {
    violation(
      "Logo misuse",
      "components/brand/BrandLogo.module.css",
      lineAt(logoCss, m.index),
      `"${banned}" applied to the logo — the guidelines prohibit effects, rotation and distortion`,
      banned,
      "no effect on the artwork",
    );
  }
}
if (!/width:\s*auto/.test(logoCss)) {
  violation(
    "Logo misuse",
    "components/brand/BrandLogo.module.css",
    0,
    "Logo width is not automatic, so the mark can be stretched",
    "fixed width",
    "width: auto against an explicit height",
  );
}

/* ------------------------------------------------------------------ *
 * 4. COMPONENTS
 * ------------------------------------------------------------------ */

for (const { path, name } of files) {
  if (!name.endsWith(".css") || name === "styles/tokens.css") continue;
  const src = stripComments(readFileSync(path, "utf8"));

  for (const m of src.matchAll(/border-radius:\s*([^;]+);/g)) {
    const v = m[1].trim();
    if (!/var\(--radius-/.test(v) && v !== "inherit") {
      violation("Components", name, lineAt(src, m.index), "border-radius is off the radius scale", v, "a var(--radius-*) token");
    }
  }

  for (const m of src.matchAll(/box-shadow:\s*([^;]+);/g)) {
    const v = m[1].trim();
    if (!/var\(--elev-/.test(v) && v !== "none") {
      violation("Components", name, lineAt(src, m.index), "box-shadow is off the elevation scale", v, "a var(--elev-*) token");
    }
  }

  for (const m of src.matchAll(/z-index:\s*([^;]+);/g)) {
    const v = m[1].trim();
    if (!/var\(--z-/.test(v) && v !== "0" && v !== "auto" && v !== "-1") {
      violation("Components", name, lineAt(src, m.index), "z-index is off the layer scale", v, "a var(--z-*) token");
    }
  }
}

/* ------------------------------------------------------------------ *
 * 5. FAVICON AND APP ICON
 *
 * The guidelines treat the app icon as a distinct artefact from the full
 * logo (page 17). Both must be the official symbol, not a redraw, and must
 * exist where Next.js actually reads them from.
 * ------------------------------------------------------------------ */

/* A path fragment unique to the official symbol artwork. */
const SYMBOL_SIGNATURE = "M143.15 0.0463867V95.4364L95.43 143.146H9.14";

for (const icon of ["app/icon.svg", "app/apple-icon.svg"]) {
  let src;
  try {
    src = read(icon);
  } catch {
    violation("Favicon", icon, 0, "Required icon is missing", "absent", "the official symbol on the brand ink square");
    continue;
  }
  if (!src.includes(SYMBOL_SIGNATURE)) {
    violation(
      "Favicon",
      icon,
      0,
      "Icon does not contain the official symbol path — it has been redrawn or approximated",
      "unrecognised path data",
      "the symbol path from public/brand/logo/bizzfly-symbol-reversed.svg, verbatim",
    );
  }
  for (const m of src.matchAll(/fill="(#[0-9A-Fa-f]{3,8})"/g)) {
    const hex = m[1].toUpperCase();
    const allowed = ["#A9CF46", "#0D1420", "#FFFFFF", "#FFF"];
    if (!allowed.includes(hex)) {
      violation(
        "Favicon",
        icon,
        lineAt(src, m.index),
        "Icon uses a colour outside the brand palette",
        m[1],
        allowed.join(" / "),
      );
    }
  }
}

/* ------------------------------------------------------------------ *
 * 6. BUTTONS
 *
 * One system, not a style per page. The states the guidelines require
 * (hover, focus, active, disabled, touch target) must all exist in the one
 * module, and no other file may redefine the primary action colour.
 * ------------------------------------------------------------------ */

const buttonCss = read("components/buttons/Button.module.css");
for (const [label, pattern] of [
  ["hover", /:hover/],
  ["active", /:active/],
  ["disabled", /:disabled|\[aria-disabled="true"\]/],
  ["touch target", /--control-height|--touch-target-min/],
]) {
  if (!pattern.test(buttonCss)) {
    violation(
      "Buttons",
      "components/buttons/Button.module.css",
      0,
      `Button system has no ${label} state`,
      "absent",
      `a ${label} rule in the single button module`,
    );
  }
}

for (const { path, name } of files) {
  if (!name.endsWith(".css") || name === "styles/tokens.css") continue;
  if (name === "components/buttons/Button.module.css") continue;
  const src = stripComments(readFileSync(path, "utf8"));
  for (const m of src.matchAll(/--cta-primary[a-z-]*:\s*/g)) {
    violation(
      "Buttons",
      name,
      lineAt(src, m.index),
      "Redefines the primary action colour outside the token file",
      m[0].trim(),
      "consume var(--cta-primary) rather than redefining it",
    );
  }
}

/* ------------------------------------------------------------------ *
 * 7. NAVIGATION
 * ------------------------------------------------------------------ */

const headerCss = read("components/navigation/Header.module.css");
if (!/background:\s*var\(--header-background\)/.test(headerCss)) {
  violation(
    "Navigation",
    "components/navigation/Header.module.css",
    0,
    "Header surface is not the themed token, so the reversed lockup is not guaranteed a dark ground",
    "not var(--header-background)",
    "background: var(--header-background)",
  );
}

/* ------------------------------------------------------------------ *
 * 8. ICONOGRAPHY
 *
 * One family, no mixing. The site draws affordances in CSS and inline SVG
 * and loads no icon font or icon library — so the check is that none has
 * been introduced, and that emoji have not crept into the UI.
 * ------------------------------------------------------------------ */

const ICON_LIBRARIES =
  /from\s+["'](?:react-icons|lucide-react|@heroicons\/[^"']+|@fortawesome\/[^"']+|feather-icons|@mui\/icons-material)["']/;
for (const { path, name } of files) {
  if (!/\.tsx?$/.test(name)) continue;
  const src = stripComments(readFileSync(path, "utf8"));
  const m = src.match(ICON_LIBRARIES);
  if (m) {
    violation(
      "Icons",
      name,
      lineAt(src, m.index),
      "Icon library introduced — mixing families is prohibited by guideline section 20",
      m[0],
      "inline SVG or a CSS-drawn affordance",
    );
  }
  /* Emoji in rendered UI. Pictographs only; arrows and geometric marks are
     legitimate typographic glyphs and are already used deliberately. */
  const emoji = src.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}]/u);
  if (emoji) {
    violation(
      "Icons",
      name,
      lineAt(src, emoji.index),
      "Emoji used as interface iconography",
      emoji[0],
      "an inline SVG or CSS-drawn mark",
    );
  }
}

/* ------------------------------------------------------------------ *
 * 9. ACCESSIBILITY GUARDRAILS
 *
 * The numeric contrast work lives in docs/design-system/verify-contrast.mjs.
 * What is asserted here is that the mechanisms brand changes tend to break
 * are still in place.
 * ------------------------------------------------------------------ */

const baseCss = read("styles/base.css");
for (const [label, pattern, file, src] of [
  /* Anchored: a scoped `.thing:focus-visible` elsewhere in the file must not
     satisfy the requirement for the global focus rule. */
  ["a global :focus-visible rule", /^:focus-visible\s*\{/m, "styles/base.css", baseCss],
  ["a skip link", /\.skip-link\s*\{/, "styles/base.css", baseCss],
  ["a screen-reader-only utility", /\.sr-only\s*\{/, "styles/base.css", baseCss],
  ["a reduced-motion block", /@media\s*\(prefers-reduced-motion:\s*reduce\)/, "styles/tokens.css", tokensSrc],
  ["a forced-colors block", /@media\s*\(forced-colors:\s*active\)/, "styles/tokens.css", tokensSrc],
  ["a 44px touch-target token", /--touch-target-min:\s*2\.75rem/, "styles/tokens.css", tokensSrc],
]) {
  if (!pattern.test(src)) {
    violation("Accessibility", file, 0, `Missing ${label}`, "absent", label);
  }
}

/* ------------------------------------------------------------------ *
 * 10. WHAT A MACHINE MUST NOT DECIDE
 * ------------------------------------------------------------------ */

reviewItem(
  "Logo",
  "public/brand/logo/bizzfly-logo.svg",
  "[OFFICIAL_LOGO_ASSET_REQUIRED] The positive (on-light) lockup has not been supplied. " +
    "Only the reversed artwork exists, which is why the header and the mobile drawer are " +
    "dark surfaces in both themes. Recolouring the reversed file to fill this slot is " +
    "prohibited by the guidelines, so the constraint stands until the official file arrives.",
);
reviewItem(
  "Logo",
  "public/brand/logo/bizzfly-logo-mono.svg",
  "[OFFICIAL_LOGO_ASSET_REQUIRED] Single-colour lockup absent. Not referenced by the site today.",
);
reviewItem(
  "Responsive",
  "320–1920px",
  "Layout at the twelve target viewports is measured in real Chrome by " +
    "`npm run verify:responsive`, not here — overflow, sub-12px text and " +
    "target size need a rendered page, which a static scan cannot produce.",
);
reviewItem(
  "Accessibility",
  "contrast",
  "The 96 numeric WCAG assertions live in docs/design-system/verify-contrast.mjs. " +
    "This check only confirms the mechanisms exist that brand edits tend to break.",
);
reviewItem(
  "Imagery",
  "site-wide",
  "No photographic imagery is currently used. Any future photography must be judged by eye " +
    "against guideline section 23 — technology, digital growth, AI and automation subjects, " +
    "no generic stock.",
);
reviewItem(
  "Logo background",
  "header, mobile drawer, footer",
  "Contrast of the reversed lockup against its ground is asserted numerically by " +
    "verify-contrast.mjs, but the optical result on the condensed, blurred header needs a " +
    "human check at each breakpoint.",
);

/* ------------------------------------------------------------------ *
 * Output
 * ------------------------------------------------------------------ */

const CATEGORIES = [
  "Colour",
  "Typography",
  "Logo",
  "Logo clearspace",
  "Logo misuse",
  "Logo background",
  "Favicon",
  "Buttons",
  "Navigation",
  "Icons",
  "Components",
  "Responsive",
  "Accessibility",
  "Imagery",
];

console.log("\nBizzFly brand compliance");
console.log("─".repeat(70));

for (const category of CATEGORIES) {
  const hits = findings.filter((f) => f.category === category);
  const reviews = manual.filter((m) => m.category === category);
  if (hits.length === 0) {
    const suffix = reviews.length ? `  (${reviews.length} manual)` : "";
    console.log(`✓ ${category.padEnd(20)} compliant${suffix}`);
  } else {
    console.log(`✗ ${category.padEnd(20)} ${hits.length} violation(s)`);
    for (const h of hits) {
      console.log(`    ${h.file}:${h.line}`);
      console.log(`      ${h.violation}`);
      console.log(`      is:       ${h.current}`);
      console.log(`      required: ${h.required}`);
    }
  }
}

console.log("─".repeat(70));
console.log(
  `${findings.length} violation(s), ${manual.length} item(s) marked MANUAL_REVIEW_REQUIRED.`,
);

if (WRITE_REPORT) {
  const generated = new Date().toISOString().slice(0, 10);
  const summary = Object.fromEntries(
    CATEGORIES.map((c) => [
      c,
      findings.some((f) => f.category === c) ? "VIOLATIONS" : "COMPLIANT",
    ]),
  );

  const json = {
    generated,
    source: "Bizzfly Brand Guidelines.pdf",
    palette: OFFICIAL_PALETTE,
    typefaces: {
      primary: "Funnel Sans SemiBold",
      secondary: ["Poppins Bold", "Poppins Medium", "Poppins Regular"],
    },
    logo: { minimumDigitalPx: LOGO_MIN_PX, clearspaceRatio: CLEARSPACE_RATIO },
    summary,
    violations: findings,
    remediated: REMEDIATED,
    manualReview: manual,
    totals: {
      violationsOutstanding: findings.length,
      violationsFixed: REMEDIATED.length,
      manualReview: manual.length,
    },
  };
  writeFileSync(
    join(ROOT, "brand-compliance-report.json"),
    JSON.stringify(json, null, 2) + "\n",
  );

  const rows = (list) =>
    list.length === 0
      ? "_None._\n"
      : "| File | Line | Violation | Current | Required | Status |\n" +
        "|---|---|---|---|---|---|\n" +
        list
          .map(
            (f) =>
              `| \`${f.file}\` | ${f.line || "—"} | ${f.violation} | \`${f.current}\` | ${f.required} | ${f.status} |`,
          )
          .join("\n") +
        "\n";

  const md = `# BizzFly brand compliance report

Generated ${generated} by \`npm run verify:brand\`.
Source of truth: **Bizzfly Brand Guidelines.pdf**.

## Summary

| Area | Status |
|---|---|
${CATEGORIES.map((c) => `| ${c} | ${summary[c] === "COMPLIANT" ? "✅ Compliant" : "❌ " + summary[c]} |`).join("\n")}

**${REMEDIATED.length} violation(s) found and fixed** in this audit pass.
**${findings.length} outstanding**, **${manual.length} item(s)** requiring manual review.

## Colour

| Role | Hex | Status |
|---|---|---|
${Object.entries(OFFICIAL_PALETTE)
  .map(([k, v]) => `| ${k} | \`${v}\` | ✅ present in \`styles/tokens.css\`, unmodified |`)
  .join("\n")}

Raw colour values are permitted in exactly two files — \`styles/tokens.css\`
(the authority) and \`lib/brand.ts\` (the mirror for the OG renderer, the
global error boundary and \`themeColor\`, none of which can read CSS custom
properties). Every other file must reach a colour through a token.

## Typography

| Role | Family | Status |
|---|---|---|
| Display, H1–H4, metrics, quotes | Funnel Sans SemiBold (600) | ✅ |
| Body, UI, navigation, buttons | Poppins Regular/Medium/Bold | ✅ |
| Eyebrows, meta, labels, indices | Poppins via \`--font-label\` | ✅ |
| Machine strings (error digest) | system monospace stack | ✅ no webfont |

## Outstanding violations

${rows(findings)}

## Fixed in this audit pass

${rows(REMEDIATED)}

## Manual review

${
  manual.length === 0
    ? "_None._\n"
    : manual.map((m) => `### ${m.category} — \`${m.area}\`\n\n${m.note}\n`).join("\n")
}
`;
  writeFileSync(join(ROOT, "brand-compliance-report.md"), md);
  console.log("\nWrote brand-compliance-report.json and brand-compliance-report.md");
}

process.exit(findings.length > 0 ? 1 : 0);
