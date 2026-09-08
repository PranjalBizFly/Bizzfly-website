#!/usr/bin/env node
/**
 * BizzFly design system — colour contrast verification
 *
 * Every colour pairing used in the design system is asserted here against
 * WCAG 2.x. This is the source of the ratios quoted in 02-foundations.md and
 * in the comments in styles/tokens.css, and it runs as the first step of
 * `npm run qa`.
 *
 *   node docs/design-system/verify-contrast.mjs
 *
 * Three things are checked:
 *
 *   1. The palette below matches styles/tokens.css. The stylesheet is the
 *      source of truth; this file must not drift from it silently.
 *   2. lib/brand.ts — the mirror used by the OG renderer, the global error
 *      boundary and themeColor, none of which can read CSS variables — holds
 *      the same values.
 *   3. Every pairing meets its minimum, and every forbidden pairing still
 *      fails. The brand has two primaries with opposite constraints, and the
 *      forbidden list is what stops that rule quietly eroding.
 *
 * Exits non-zero on any failure.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const relLum = (hex) => {
  const srgb = hex.replace('#', '').match(/../g).map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
};

const ratio = (a, b) => {
  const [l1, l2] = [relLum(a), relLum(b)];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/* --- The palette, as it must appear in styles/tokens.css ----------------- */
const T = {
  blue300: '#8FB8EC', blue400: '#5C93DE', blue500: '#2C70D1',
  blue600: '#2765BC', blue700: '#2258A6', blue900: '#1A4480',
  green300: '#BEDD6F', green500: '#A9CF46', green700: '#7C9C2E',
  green900: '#5A7220', greenBright: '#40E523',
  deep900: '#171238', deep800: '#2A1ED1', deep700: '#3B30D8',
  deep600: '#5A4DE8', deep400: '#8A7EF5',
  deepAltMuted: '#C3C7E8', deepAltDark: '#211A54',
  ink900: '#0D1420', ink700: '#232E3F', ink500: '#55606E', ink400: '#6E7A8A',
  ink350: '#8B95A3', ink250: '#A9B4C4', ink150: '#DDE3EB', ink050: '#F5F7FA',
  white: '#FFFFFF', surface: '#F5F7FA', sunken: '#EAEEF4',
  /* The tinted light band — a 1.09:1 lift off white, and the surfaces a
     component gets when it sits inside one. */
  tint: '#F1F5FC', tintSunken: '#E4EBF7', tintBorder: '#D7E1F2',
  deepMuted: '#C9D2F5',
  success: '#17734A', warning: '#8A5B00', error: '#B3261E',

  /* Dark theme surfaces. The brand ramp is unchanged; only the grounds are. */
  dkBg: '#0D1420',        // = ink-900
  dkSurface: '#1A2432',   // 1.18:1 lift off the page
  dkMuted: '#202B3A',     // 1.29:1 lift
  dkHeader: '#152030',    // 1.13:1 — the scrolled header bar
};

/* Token name in tokens.css → key above. Only the brand ramp is checked; the
   semantic tokens are aliases of these and cannot drift independently. */
const TOKEN_MAP = {
  '--blue-300': 'blue300', '--blue-400': 'blue400', '--blue-500': 'blue500',
  '--blue-600': 'blue600', '--blue-700': 'blue700', '--blue-900': 'blue900',
  '--green-300': 'green300', '--green-500': 'green500',
  '--green-700': 'green700', '--green-900': 'green900',
  '--green-bright': 'greenBright',
  '--deep-900': 'deep900', '--deep-800': 'deep800',
  '--deep-700': 'deep700', '--deep-600': 'deep600',
  '--deep-400': 'deep400',
  '--ink-900': 'ink900', '--ink-700': 'ink700', '--ink-500': 'ink500',
  '--ink-400': 'ink400', '--ink-350': 'ink350', '--ink-250': 'ink250',
  '--ink-150': 'ink150', '--ink-050': 'ink050',
  '--surface-muted': 'sunken',
  '--surface-tint': 'tint', '--surface-tint-sunken': 'tintSunken',
  '--border-tint': 'tintBorder',
  '--success': 'success', '--warning': 'warning', '--error': 'error',
};

/** lib/brand.ts key → key above. */
const BRAND_MIRROR = {
  ink: 'ink900', inkLight: 'ink050', inkMuted: 'ink250',
  blue: 'blue500', green: 'green500', deepBlue: 'deep800', white: 'white',
};

/** [description, foreground, background, minimum ratio] */
const ASSERTIONS = [
  // --- Body and heading text on light -------------------------------------
  ['body text on white',               T.ink900, T.white,   4.5],
  ['body text on surface',             T.ink900, T.surface, 4.5],
  ['body text on sunken',              T.ink900, T.sunken,  4.5],
  ['secondary heading on white',       T.ink700, T.white,   4.5],
  ['muted text on white',              T.ink500, T.white,   4.5],
  ['muted text on surface',            T.ink500, T.surface, 4.5],
  ['muted text on sunken',             T.ink500, T.sunken,  4.5],

  // --- Links. Blue leads on light -----------------------------------------
  ['link (blue-700) on white',         T.blue700, T.white,   4.5],
  ['link (blue-700) on surface',       T.blue700, T.surface, 4.5],
  ['link (blue-700) on sunken',        T.blue700, T.sunken,  4.5],
  ['link hover (blue-900) on white',   T.blue900, T.white,   4.5],
  ['deep electric blue on white',      T.deep800, T.white,   4.5],
  ['accent-text green-900 on white',   T.green900, T.white,   4.5],
  ['accent-text green-900 on surface', T.green900, T.surface, 4.5],

  // --- Non-text UI (WCAG 1.4.11, 3:1) -------------------------------------
  ['icon/graphic ink-400 on white',    T.ink400,  T.white, 3],
  ['input border ink-350 on white',    T.ink350,  T.white, 3],
  ['accent-edge blue-500 on white',    T.blue500, T.white, 3],
  ['accent-edge blue-500 on surface',  T.blue500, T.surface, 3],
  ['green-700 rule on white',          T.green700, T.white, 3],
  ['focus ring on white',              T.ink900,  T.white, 3],
  ['focus ring on surface',            T.ink900,  T.surface, 3],

  // --- Buttons ------------------------------------------------------------
  ['PRIMARY: white on blue-500',       T.white, T.blue500, 4.5],
  ['PRIMARY hover: white on blue-600', T.white, T.blue600, 4.5],
  ['PRIMARY active: white on blue-700', T.white, T.blue700, 4.5],
  ['GREEN fill: ink on green-500',     T.ink900, T.green500, 4.5],
  ['SECONDARY: ink on white',          T.ink900, T.white,   4.5],
  ['SECONDARY hover: ink050 on ink900', T.ink050, T.ink900, 4.5],
  ['DANGER: error on white',           T.error,  T.white, 4.5],
  // ::selection paints green with ink text.
  ['selection: ink on green-500',      T.ink900, T.green500, 4.5],

  // --- Inverse context (bg ink-900). Green leads here ---------------------
  ['inverse body text',                T.ink050,  T.ink900, 4.5],
  ['inverse muted text',               T.ink250,  T.ink900, 4.5],
  ['inverse link (blue-400)',          T.blue400, T.ink900, 4.5],
  ['inverse link hover (blue-300)',    T.blue300, T.ink900, 4.5],
  ['inverse accent (green-500)',       T.green500, T.ink900, 4.5],
  ['inverse accent hover (green-300)', T.green300, T.ink900, 4.5],
  ['inverse focus ring',               T.green500, T.ink900, 3],
  ['inverse text on ink-700 surface',  T.ink050,  T.ink700, 4.5],
  // The header is an inverse surface carrying the primary button.
  ['header CTA fill vs header ground', T.blue500, T.ink900, 3],

  // --- Tinted light context (bg --surface-tint) ---------------------------
  // The light alternative to a dark band. Every light role has to survive
  // the move intact, or a component would need to know it is on the tint.
  ['tint: body text',                  T.ink900,  T.tint, 4.5],
  ['tint: secondary heading',          T.ink700,  T.tint, 4.5],
  ['tint: muted text',                 T.ink500,  T.tint, 4.5],
  ['tint: link (blue-700)',            T.blue700, T.tint, 4.5],
  ['tint: link hover (blue-900)',      T.blue900, T.tint, 4.5],
  ['tint: brand purple text',          T.deep800, T.tint, 4.5],
  ['tint: accent-edge blue-500 rule',  T.blue500, T.tint, 3],
  ['tint: border-strong ink-400',      T.ink400,  T.tint, 3],
  ['tint: focus ring',                 T.ink900,  T.tint, 3],
  ['tint: CTA fill vs ground',         T.blue500, T.tint, 3],
  // A card inside the band lifts to white; text has to hold on both.
  ['tint: body text on raised card',   T.ink900,  T.white, 4.5],
  ['tint: muted on raised card',       T.ink500,  T.white, 4.5],
  ['tint: body text on sunken',        T.ink900,  T.tintSunken, 4.5],
  ['tint: muted text on sunken',       T.ink500,  T.tintSunken, 4.5],
  ['tint: link on sunken',             T.blue700, T.tintSunken, 4.5],

  // --- Inverse-alt context (bg deep-800) ----------------------------------
  // The deep ground is --deep-900, a near-black indigo. The brand purple is
  // an accent inside it, never the field itself.
  ['deep: body text',                  T.white,        T.deep900, 4.5],
  ['deep: muted text',                 T.deepAltMuted, T.deep900, 4.5],
  ['deep: link (blue-400)',            T.blue400,      T.deep900, 4.5],
  ['deep: link hover (blue-300)',      T.blue300,      T.deep900, 4.5],
  ['deep: accent (green-500)',         T.green500,     T.deep900, 4.5],
  ['deep: purple text (deep-400)',     T.deep400,      T.deep900, 4.5],
  ['deep: purple rule (deep-600)',     T.deep600,      T.deep900, 3],
  ['deep: focus ring',                 T.green500,     T.deep900, 3],
  ['deep: CTA fill vs ground',         T.blue500,      T.deep900, 3],
  // Lifted variant used inside the dark theme so the band stays a band.
  ['deep(dark theme): body text',      T.white,        T.deepAltDark, 4.5],
  ['deep(dark theme): muted text',     T.deepAltMuted, T.deepAltDark, 4.5],
  ['deep(dark theme): accent green',   T.green500,     T.deepAltDark, 4.5],
  // The brand purple remains text-safe where it actually belongs: on light.
  ['brand purple on white',            T.deep800,      T.white,   4.5],

  // --- Dark theme ---------------------------------------------------------
  // A designed theme, not an inversion: the ramp is identical, the grounds
  // change, and green takes the accent from blue for the same reason it does
  // in an inverse section.
  ['dark: body text on page',          T.ink050,  T.dkBg,      4.5],
  ['dark: body text on surface',       T.ink050,  T.dkSurface, 4.5],
  ['dark: body text on surface-muted', T.ink050,  T.dkMuted,   4.5],
  ['dark: muted text on page',         T.ink250,  T.dkBg,      4.5],
  ['dark: muted text on surface',      T.ink250,  T.dkSurface, 4.5],
  ['dark: muted text on surface-muted', T.ink250, T.dkMuted,   4.5],
  ['dark: link blue-400 on page',      T.blue400, T.dkBg,      4.5],
  ['dark: link blue-400 on surface',   T.blue400, T.dkSurface, 4.5],
  ['dark: link blue-400 on sunken',    T.blue400, T.dkMuted,   4.5],
  ['dark: link hover blue-300',        T.blue300, T.dkSurface, 4.5],
  ['dark: accent green on page',       T.green500, T.dkBg,     4.5],
  ['dark: accent green on surface',    T.green500, T.dkSurface, 4.5],
  ['dark: focus ring on surface',      T.green500, T.dkSurface, 3],
  // The primary button keeps its blue fill on every dark ground.
  ['dark: blue-500 fill vs page',      T.blue500, T.dkBg,      3],
  ['dark: blue-500 fill vs surface',   T.blue500, T.dkSurface, 3],

  // --- Header bar (dark in BOTH themes — the lockup is reversed) ----------
  ['header: nav text, light theme',    T.ink050,  T.ink900,    4.5],
  ['header: nav text, dark theme',     T.ink050,  T.dkHeader,  4.5],
  ['header: muted, dark theme',        T.ink250,  T.dkHeader,  4.5],
  ['header: active mark, light theme', T.green500, T.ink900,   3],
  ['header: active mark, dark theme',  T.green500, T.dkHeader, 3],
  ['header: CTA fill, dark theme',     T.blue500, T.dkHeader,  3],

  // --- Status -------------------------------------------------------------
  ['success on white',                 T.success, T.white, 4.5],
  ['warning on white',                 T.warning, T.white, 4.5],
  ['error on white',                   T.error,   T.white, 4.5],
  ['success on surface',               T.success, T.surface, 4.5],
  ['warning on surface',               T.warning, T.surface, 4.5],
  ['error on surface',                 T.error,   T.surface, 4.5],

  // --- Data visualisation. Each series member against its own ground ------
  ['viz-1 ink-900 on white',           T.ink900,  T.white, 3],
  ['viz-2 blue-500 on white',          T.blue500, T.white, 3],
  ['viz-3 deep-800 on white',          T.deep800, T.white, 3],
  ['viz-4 green-900 on white',         T.green900, T.white, 3],
  ['viz-5 green-700 on white',         T.green700, T.white, 3],
  ['viz-6 ink-350 on white',           T.ink350,  T.white, 3],
  ['viz-1 green-500 on ink',           T.green500, T.ink900, 3],
  ['viz-2 blue-400 on ink',            T.blue400, T.ink900, 3],
  ['viz-4 green-300 on ink',           T.green300, T.ink900, 3],
  ['viz-5 blue-300 on ink',            T.blue300, T.ink900, 3],
];

/**
 * Pairings that MUST fail. The brand has two primaries with opposite
 * constraints — green is unusable as text on light, blue is unusable as text
 * on dark — and these assertions are what keep that rule from eroding one
 * convenient exception at a time.
 */
const FORBIDDEN = [
  ['green-500 as text on white',      T.green500, T.white,   4.5],
  ['green-500 as text on surface',    T.green500, T.surface, 4.5],
  ['bright green as text on white',   T.greenBright, T.white, 4.5],
  ['green-500 as a rule on white',    T.green500, T.white,   3],
  // The tint is a near-white, so it inherits every constraint white has.
  ['green-500 as text on the tint',   T.green500, T.tint,    4.5],
  ['green-500 as a rule on the tint', T.green500, T.tint,    3],
  ['green-700 as a rule on the tint', T.green700, T.tint,    3],
  ['ink-350 as a border on the tint', T.ink350,   T.tint,    3],
  ['blue-500 as body text on ink',    T.blue500, T.ink900,   4.5],
  ['deep-800 as any foreground on ink', T.deep800, T.ink900, 3],
  ['ink-400 as body text',            T.ink400,  T.white,   4.5],
  // #2A1ED1 is a signal, not a ground: it cannot be a foreground on the
  // deep indigo, which is exactly why that section is not filled with it.
  ['brand purple on the deep ground',  T.deep800, T.deep900, 3],
];

let failed = 0;

/* --- 1. The palette must match styles/tokens.css ------------------------- */
console.log('\nToken source agreement\n' + '─'.repeat(66));
const tokensCss = readFileSync(join(ROOT, 'styles', 'tokens.css'), 'utf8');
for (const [token, key] of Object.entries(TOKEN_MAP)) {
  const match = tokensCss.match(
    new RegExp(`${token}\\s*:\\s*(#[0-9A-Fa-f]{6})`)
  );
  const found = match?.[1]?.toUpperCase();
  const want = T[key].toUpperCase();
  const ok = found === want;
  if (!ok) failed++;
  console.log(
    `${ok ? '✓' : '✗'} ${token.padEnd(20)} ${(found ?? 'NOT FOUND').padEnd(9)}` +
      `${ok ? '' : ` expected ${want}`}`
  );
}

/* --- 1b. The dark theme block must hold the values asserted below -------- */
console.log('\nDark theme block\n' + '─'.repeat(66));
const darkBlock =
  tokensCss.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
if (!darkBlock) {
  console.error('✗ :root[data-theme="dark"] block not found in tokens.css');
  failed++;
}
for (const [token, key] of Object.entries({
  '--surface': 'dkSurface',
  '--surface-muted': 'dkMuted',
  '--header-background': 'dkHeader',
})) {
  const match = darkBlock.match(new RegExp(`${token}\\s*:\\s*(#[0-9A-Fa-f]{6})`));
  const found = match?.[1]?.toUpperCase();
  const want = T[key].toUpperCase();
  const ok = found === want;
  if (!ok) failed++;
  console.log(
    `${ok ? '✓' : '✗'} dark ${token.padEnd(20)} ${(found ?? 'NOT FOUND').padEnd(9)}` +
      `${ok ? '' : ` expected ${want}`}`,
  );
}

/* --- 2. lib/brand.ts must mirror the same values ------------------------- */
console.log('\nlib/brand.ts mirrors the tokens\n' + '─'.repeat(66));
const brandTs = readFileSync(join(ROOT, 'lib', 'brand.ts'), 'utf8');
for (const [prop, key] of Object.entries(BRAND_MIRROR)) {
  const match = brandTs.match(new RegExp(`${prop}\\s*:\\s*"(#[0-9A-Fa-f]{6})"`));
  const found = match?.[1]?.toUpperCase();
  const want = T[key].toUpperCase();
  const ok = found === want;
  if (!ok) failed++;
  console.log(
    `${ok ? '✓' : '✗'} brand.${prop.padEnd(13)} ${(found ?? 'NOT FOUND').padEnd(9)}` +
      `${ok ? '' : ` expected ${want}`}`
  );
}

/* --- 3. Contrast ---------------------------------------------------------- */
console.log('\nContrast assertions\n' + '─'.repeat(66));
for (const [name, fg, bg, min] of ASSERTIONS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? '✓' : '✗'} ${name.padEnd(38)} ${r.toFixed(2).padStart(6)}  (min ${min})`
  );
}

console.log('\nForbidden pairings — these MUST fail\n' + '─'.repeat(66));
for (const [name, fg, bg, min] of FORBIDDEN) {
  const r = ratio(fg, bg);
  const correctlyFails = r < min;
  if (!correctlyFails) failed++;
  console.log(
    `${correctlyFails ? '✓' : '✗'} ${name.padEnd(38)} ${r.toFixed(2).padStart(6)}  (must be < ${min})`
  );
}

console.log('─'.repeat(66));
if (failed) {
  console.error(`\n${failed} assertion(s) failed.\n`);
  process.exit(1);
}
console.log(
  `\nAll ${ASSERTIONS.length + FORBIDDEN.length} contrast assertions passed, ` +
    `palette verified against tokens.css and lib/brand.ts.\n`
);
