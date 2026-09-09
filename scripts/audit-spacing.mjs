#!/usr/bin/env node
/**
 * Spacing audit.
 *
 *   npm run audit:spacing        (requires `npm run start` on QA_BASE)
 *
 * verify-rhythm answers "does this page have a shape". This answers a
 * narrower, more mechanical question: where is the vertical space actually
 * going, and how much of it is doing no work.
 *
 * For every top-level section on a page it measures the box, the vertical
 * padding, and the union of its children's boxes. The difference between the
 * two is space nothing occupies. It then measures the real gap between one
 * section's last painted pixel and the next section's first — which is what a
 * visitor experiences as "a hole between these two blocks", and which no
 * single padding value reveals because it is the sum of two.
 *
 * Reported per width, because a spacing scale that reads as generous at 1440
 * is frequently absurd at 390 and the two need separate judgement.
 *
 *   DEAD    section is more than HOLLOW_PCT vertical padding
 *   GAP     more than GAP_LIMIT px between two sections' content
 *   TALL    a section taller than SECTION_LIMIT px
 */

import { spawn } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const BASE = process.env.QA_BASE ?? "http://localhost:3000";
const WIDTHS = (process.env.QA_WIDTHS ?? "390,1440").split(",").map(Number);

const PAGES = process.env.QA_PAGES
  ? process.env.QA_PAGES.split(",")
  : [
      "/",
      "/services/",
      "/services/seo/",
      "/services/search-ai-visibility/",
      "/industries/",
      "/industries/manufacturing/",
      "/use-cases/",
      "/use-cases/generate-more-leads/",
      "/technologies/",
      "/technologies/ai-stack/",
      "/resources/",
      "/resources/what-is-generative-engine-optimisation/",
      "/case-studies/",
      "/company/",
      "/company/about/",
      "/company/terms/",
      "/contact/",
      "/search/",
      "/does-not-exist/",
    ];

/** Above this share of a section's height being padding, it is mostly air. */
const HOLLOW_PCT = 52;
/** Gap between two sections' content that a visitor reads as a hole. */
const GAP_LIMIT = { 390: 130, 1440: 240 };
/** A single section no visitor scrolls through as one idea. */
const SECTION_LIMIT = { 390: 2600, 1440: 2200 };

const CHROME_PATHS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];
const chromePath = CHROME_PATHS.find((p) => existsSync(p));
if (!chromePath) {
  console.error("\nNo Chrome binary found; skipping spacing audit.\n");
  process.exit(0);
}

const PORT = 9400 + (process.pid % 300);
const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-prefers-reduced-motion",
    "--user-data-dir=" + (process.env.TEMP ?? "/tmp") + "/bizzfly-spacing-profile",
    "about:blank",
  ],
  { stdio: "ignore" },
);

let ws;
let messageId = 0;
const pending = new Map();
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = ++messageId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });

/** Runs in the page. Returns every top-level section with its space budget. */
const MEASURE = `(() => {
  const roots = [...document.querySelectorAll("body > div > main > *, body > div > footer, body > div > header")];
  const rows = [];
  for (const el of roots) {
    const r = el.getBoundingClientRect();
    if (r.height < 1) continue;
    const cs = getComputedStyle(el);
    const padTop = parseFloat(cs.paddingTop) || 0;
    const padBottom = parseFloat(cs.paddingBottom) || 0;

    // The union of everything actually painted inside this section.
    let top = Infinity, bottom = -Infinity;
    const walk = (node) => {
      for (const child of node.children) {
        const cr = child.getBoundingClientRect();
        const ccs = getComputedStyle(child);
        const paints =
          cr.height > 0 &&
          ccs.visibility !== "hidden" &&
          ccs.display !== "none" &&
          (child.textContent.trim().length > 0 || child.querySelector("img,svg,input,button,picture,video"));
        if (paints) { top = Math.min(top, cr.top); bottom = Math.max(bottom, cr.bottom); }
        if (child.children.length) walk(child);
      }
    };
    walk(el);

    const contentTop = top === Infinity ? r.top : top;
    const contentBottom = bottom === -Infinity ? r.bottom : bottom;
    rows.push({
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      cls: (el.className || "").toString().split(" ")[0] || null,
      height: Math.round(r.height),
      padTop: Math.round(padTop),
      padBottom: Math.round(padBottom),
      absTop: Math.round(r.top + window.scrollY),
      absBottom: Math.round(r.bottom + window.scrollY),
      contentTop: Math.round(contentTop + window.scrollY),
      contentBottom: Math.round(contentBottom + window.scrollY),
    });
  }
  return { rows, pageHeight: document.documentElement.scrollHeight };
})()`;

const SETTLE = (width) => `new Promise((resolve) => {
  const finish = () => (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    let tries = 0;
    const check = () => {
      if (document.documentElement.clientWidth === ${width} || tries++ > 40) {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(1)));
      } else setTimeout(check, 50);
    };
    check();
  });
  if (document.readyState === "complete") finish();
  else window.addEventListener("load", finish, { once: true });
  setTimeout(() => resolve(1), 8000);
})`;

let url;
for (let i = 0; i < 40; i += 1) {
  try {
    url = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl;
    break;
  } catch {
    await sleep(250);
  }
}
if (!url) {
  console.error("Chrome did not expose a debugging endpoint");
  process.exit(1);
}

ws = new WebSocket(url);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
ws.addEventListener("message", (event) => {
  const m = JSON.parse(event.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    if (m.error) reject(new Error(JSON.stringify(m.error)));
    else resolve(m.result);
  }
});

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId);

const findings = [];
const summary = [];

for (const width of WIDTHS) {
  await send("Emulation.setDeviceMetricsOverride", {
    width, height: 900, deviceScaleFactor: 1, mobile: width < 768,
  }, sessionId);

  for (const path of PAGES) {
    await send("Page.navigate", { url: `${BASE}${path}` }, sessionId);
    await send("Runtime.evaluate", { expression: SETTLE(width), awaitPromise: true }, sessionId);
    const { result } = await send("Runtime.evaluate", {
      expression: MEASURE, returnByValue: true,
    }, sessionId);

    const { rows, pageHeight } = result.value;
    let dead = 0, gaps = 0, tall = 0, wasted = 0;

    for (const row of rows) {
      const pad = row.padTop + row.padBottom;
      const pct = row.height > 0 ? Math.round((pad / row.height) * 100) : 0;
      if (pct > HOLLOW_PCT && row.height > 200) {
        dead += 1;
        findings.push({ width, path, kind: "DEAD", label: row.id ?? row.cls, detail: `${pct}% padding in ${row.height}px` });
      }
      if (row.height > SECTION_LIMIT[width]) {
        tall += 1;
        findings.push({ width, path, kind: "TALL", label: row.id ?? row.cls, detail: `${row.height}px` });
      }
    }

    for (let i = 1; i < rows.length; i += 1) {
      const gap = rows[i].contentTop - rows[i - 1].contentBottom;
      wasted += Math.max(0, gap);
      if (gap > GAP_LIMIT[width]) {
        gaps += 1;
        findings.push({
          width, path, kind: "GAP",
          label: `${rows[i - 1].id ?? rows[i - 1].cls} → ${rows[i].id ?? rows[i].cls}`,
          detail: `${Math.round(gap)}px`,
        });
      }
    }

    summary.push({ width, path, pageHeight, sections: rows.length, dead, gaps, tall, wasted: Math.round(wasted) });
  }
}

chrome.kill();

/* --- Report -------------------------------------------------------------- */

const pad = (s, n) => String(s).padEnd(n);
console.log("\nSpacing audit");
console.log("─".repeat(92));

for (const width of WIDTHS) {
  const set = summary.filter((s) => s.width === width);
  const totalWasted = set.reduce((a, s) => a + s.wasted, 0);
  const totalHeight = set.reduce((a, s) => a + s.pageHeight, 0);
  console.log(`\n${width}px — ${set.length} pages, ${totalHeight}px total, ${totalWasted}px in inter-section gaps (${Math.round((totalWasted / totalHeight) * 100)}%)`);
  console.log(pad("page", 48), pad("height", 8), pad("gaps", 6), pad("dead", 6), "tall");
  for (const s of set) {
    console.log(pad(s.path, 48), pad(s.pageHeight, 8), pad(s.gaps, 6), pad(s.dead, 6), s.tall);
  }
}

console.log(`\n${findings.length} finding(s)`);
console.log("─".repeat(92));
for (const f of findings.slice(0, 40)) {
  console.log(pad(f.width, 6), pad(f.kind, 6), pad(f.path, 42), pad(f.label ?? "", 22), f.detail);
}
if (findings.length > 40) console.log(`… and ${findings.length - 40} more`);

writeFileSync("spacing-report.json", JSON.stringify({ generated: new Date().toISOString(), summary, findings }, null, 2));
console.log("\nWritten: spacing-report.json\n");
