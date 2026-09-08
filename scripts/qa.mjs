#!/usr/bin/env node
/**
 * Full production QA.
 *
 *   npm run qa
 *
 * Builds the site, starts the production server, runs every check against the
 * real output, then tears down. One command, so a regression cannot be missed
 * by forgetting to run one of the individual validators.
 *
 * Every step is invoked through the current Node binary against a resolved
 * script path. Node 24 refuses to spawn .cmd shims without a shell (EINVAL),
 * and spawning through a shell with arguments is deprecated (DEP0190), so
 * going straight to the JavaScript entry point avoids both.
 *
 * Sequence:
 *   1. contrast tokens        — design system colour contract
 *   2. brand compliance       — palette, typefaces, logo rules, token use
 *   3. content registry       — slugs, relationships, publication status
 *   4. typecheck              — TypeScript
 *   5. lint                   — ESLint
 *   6. production build       — must succeed
 *   7. internal links         — every href resolves to a generated route
 *   8. SEO                    — H1, canonical, metadata uniqueness, JSON-LD
 *   9. page inventory         — URL count reconciled against the build output
 *  10. responsive             — one page per composition × 12 viewports in real Chrome
 *  11. section rhythm         — page height, whitespace ratio, repeated shapes
 */

import { spawn, spawnSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.QA_PORT ?? 3000);
const BASE = `http://localhost:${PORT}`;
const NODE = process.execPath;

const NEXT_BIN = "node_modules/next/dist/bin/next";
const TSC_BIN = "node_modules/typescript/bin/tsc";
const ESLINT_BIN = "node_modules/eslint/bin/eslint.js";

const results = [];

function run(label, args, options = {}) {
  process.stdout.write(`\n▶ ${label}\n`);
  const result = spawnSync(NODE, args, { stdio: "inherit", ...options });
  const ok = result.status === 0;
  if (!ok && result.error) console.error(`  ${result.error.message}`);
  results.push({ label, ok });
  return ok;
}

const steps = [
  ["Contrast tokens", ["docs/design-system/verify-contrast.mjs"]],
  ["Brand compliance", ["scripts/verify-brand.mjs"]],
  [
    "Content registry",
    [
      "--experimental-strip-types",
      "--no-warnings",
      "--import",
      "./scripts/alias-hooks.mjs",
      "scripts/verify-content.ts",
    ],
  ],
  [
    "Image system (zero duplicates, valid paths, alt text)",
    [
      "--experimental-strip-types",
      "--no-warnings",
      "--import",
      "./scripts/alias-hooks.mjs",
      "scripts/verify-image-usage.mjs",
    ],
  ],
  ["TypeScript", [TSC_BIN, "--noEmit"]],
  ["ESLint", [ESLINT_BIN, "."]],
  ["Production build", [NEXT_BIN, "build"]],
  ["Internal links", ["scripts/verify-links.mjs"]],
  ["SEO", ["scripts/verify-seo.mjs"]],
  [
    "Page inventory",
    [
      "--experimental-strip-types",
      "--no-warnings",
      "--import",
      "./scripts/alias-hooks.mjs",
      "scripts/verify-pages.ts",
    ],
  ],
];

for (const [label, args] of steps) {
  const ok = run(label, args);
  if (!ok && label === "Production build") {
    console.error("\nBuild failed — stopping.\n");
    process.exit(1);
  }
}

/* --- Server-backed checks ------------------------------------------------ */

/*
 * Refuse to run if something is already on the port.
 *
 * Without this the failure is silent and deeply misleading: `next start`
 * cannot bind, but the readiness probe below still gets a 200 from whatever
 * is already listening, so the audit runs against a stale build. Because the
 * fresh build has replaced .next, that stale server serves HTML pointing at
 * CSS files that no longer exist — every page measures as unstyled and the
 * audit reports dozens of phantom overflow and target-size failures.
 */
const portInUse = await fetch(BASE, { redirect: "manual" }).then(
  () => true,
  () => false,
);
if (portInUse) {
  console.error(
    `\nSomething is already listening on ${PORT}.\n` +
      `Stop it first — otherwise the audit silently measures that server ` +
      `instead of this build. Set QA_PORT to use a different port.\n`,
  );
  process.exit(1);
}

process.stdout.write(`\n▶ Starting production server on ${PORT}\n`);
const server = spawn(NODE, [NEXT_BIN, "start", "-p", String(PORT)], {
  stdio: "ignore",
});

let up = false;
for (let attempt = 0; attempt < 40; attempt += 1) {
  await sleep(500);
  try {
    const res = await fetch(BASE, { redirect: "manual" });
    if (res.status < 500) {
      up = true;
      break;
    }
  } catch {
    /* not listening yet */
  }
}

if (!up) {
  console.error("\nServer did not start; skipping server-backed checks.\n");
  results.push({ label: "Responsive", ok: false });
} else {
  run("Responsive (every composition × 12 viewports)", ["scripts/verify-responsive.mjs"], {
    env: { ...process.env, QA_BASE: BASE },
  });
  run("Section rhythm", ["scripts/verify-rhythm.mjs"], {
    env: { ...process.env, QA_BASE: BASE },
  });
}

server.kill();
if (process.platform === "win32" && server.pid) {
  /* next start spawns children; make sure the port is released. */
  spawnSync("taskkill", ["/F", "/T", "/PID", String(server.pid)], {
    stdio: "ignore",
  });
}

/* --- Summary ------------------------------------------------------------- */
console.log(`\n${"═".repeat(60)}`);
console.log("QA SUMMARY");
console.log("═".repeat(60));
for (const { label, ok } of results) {
  console.log(`  ${ok ? "✓" : "✗"}  ${label}`);
}
console.log("═".repeat(60));

const failed = results.filter((r) => !r.ok);
if (failed.length > 0) {
  console.error(`\n${failed.length} check(s) failed.\n`);
  process.exit(1);
}
console.log("\nAll checks passed.\n");
