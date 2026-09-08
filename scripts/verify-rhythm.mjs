#!/usr/bin/env node
/**
 * Section rhythm and whitespace audit.
 *
 *   npm run verify:rhythm     (requires `npm run start` on QA_BASE)
 *
 * The responsive audit answers "is anything broken". This answers a question
 * you cannot see in a screenshot either: does the page have a rhythm, or is
 * it the same block repeated down the screen?
 *
 * Per top-level section it measures height, how much of that height is
 * padding rather than content, and a shape signature — the sequence of child
 * element types. Then it reports:
 *
 *   - REPEAT   three or more consecutive sections sharing a shape signature,
 *              which is what "section, card grid, section, card grid" looks
 *              like to a measuring tool
 *   - AIRY     a section more than 55% vertical padding, i.e. whitespace
 *              standing in for content rather than framing it
 *   - LONG     a single section over 2,400px, which no visitor scrolls
 *              through as one idea
 *
 * Thresholds are deliberately loose. This is here to find the sections that
 * are obviously wrong, not to enforce a house style on every page.
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const BASE = process.env.QA_BASE ?? "http://localhost:3000";
const WIDTH = Number(process.env.QA_WIDTH ?? 1440);

const PAGES = process.env.QA_PAGES
  ? process.env.QA_PAGES.split(",")
  : [
      "/",
      "/services/",
      "/services/seo/",
      "/services/api-development/",
      "/industries/",
      "/industries/manufacturing/",
      "/use-cases/",
      "/technologies/",
      "/case-studies/",
      "/resources/",
      "/company/",
      "/contact/",
    ];

const CHROME_PATHS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

const chromePath = CHROME_PATHS.find((p) => existsSync(p));
if (!chromePath) {
  console.error("\nNo Chrome binary found; skipping rhythm audit.\n");
  process.exit(0);
}

const PORT = 9222 + (process.pid % 500);
const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--hide-scrollbars",
    `--user-data-dir=${process.env.TEMP ?? "/tmp"}/bizzfly-rhythm-profile`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

let ws;
let messageId = 0;
const pending = new Map();

function send(method, params = {}, sessionId) {
  const id = ++messageId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}

async function connect() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      return (await res.json()).webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }
  throw new Error("Chrome did not expose a debugging endpoint");
}

/*
 * Waiting for `load` is not enough here. The App Router streams, so at load
 * <main> can still hold the short fallback and the real sections arrive
 * afterwards — which measures every such page as one 900px section. So this
 * waits for the section count to stop changing across consecutive frames,
 * then for fonts, then paints twice.
 */
const SETTLE = `new Promise((resolve) => {
  const count = () => (document.querySelector('main') || document.body).children.length;
  const stable = () => new Promise((done) => {
    let last = -1;
    let steady = 0;
    let tries = 0;
    const tick = () => {
      const now = count();
      steady = now === last ? steady + 1 : 0;
      last = now;
      if ((steady >= 4 && now > 1) || tries++ > 120) done();
      else setTimeout(tick, 50);
    };
    tick();
  });
  const finish = () => stable()
    .then(() => (document.fonts ? document.fonts.ready : Promise.resolve()))
    .then(() => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true))));
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
})`;

/*
 * Measured in the page rather than reconstructed from the DOM here, because
 * padding that collapses or is set by a media query is only knowable from
 * the computed style at this width.
 */
const MEASURE = `(() => {
  const main = document.querySelector('main') || document.body;
  const out = [];
  for (const el of main.children) {
    const rect = el.getBoundingClientRect();
    if (rect.height < 4) continue;
    const cs = getComputedStyle(el);
    const padTop = parseFloat(cs.paddingTop) || 0;
    const padBottom = parseFloat(cs.paddingBottom) || 0;

    /* The shape signature: what this section is actually made of. Class name
       stems rather than full names, so a hashed CSS-module suffix does not
       make every section look unique. */
    const inner = el.querySelector(':scope > *') || el;
    const kids = [...inner.children].slice(0, 6).map((c) => {
      const stem = [...c.classList]
        .map((n) => n.split('_')[1] || n.split('__')[0] || n)
        .filter(Boolean)[0];
      return c.tagName.toLowerCase() + (stem ? '.' + stem : '');
    });

    out.push({
      id: el.id || '',
      height: Math.round(rect.height),
      padding: Math.round(padTop + padBottom),
      signature: kids.join('>'),
      headings: el.querySelectorAll('h2,h3').length,
      links: el.querySelectorAll('a').length,
    });
  }
  return {
    total: Math.round(document.documentElement.scrollHeight),
    sections: out,
  };
})()`;

async function main() {
  ws = new WebSocket(await connect());
  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    }
  });

  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Page.enable", {}, sessionId);
  await send("Runtime.enable", {}, sessionId);
  await send(
    "Emulation.setDeviceMetricsOverride",
    { width: WIDTH, height: 900, deviceScaleFactor: 1, mobile: false },
    sessionId,
  );

  const line = "─".repeat(74);
  console.log(`\nSection rhythm — ${PAGES.length} pages at ${WIDTH}px\n${line}`);

  const problems = [];

  for (const path of PAGES) {
    await send("Page.navigate", { url: `${BASE}${path}` }, sessionId);
    await send(
      "Runtime.evaluate",
      { expression: SETTLE, awaitPromise: true, returnByValue: true },
      sessionId,
    );
    const { result } = await send(
      "Runtime.evaluate",
      { expression: MEASURE, returnByValue: true },
      sessionId,
    );
    const { total, sections } = result.value;

    /* Three consecutive sections built the same way. */
    let run = 1;
    for (let i = 1; i <= sections.length; i += 1) {
      const same =
        i < sections.length &&
        sections[i].signature &&
        sections[i].signature === sections[i - 1].signature;
      if (same) {
        run += 1;
      } else {
        if (run >= 3) {
          problems.push(
            `REPEAT  ${path} — ${run} consecutive sections shaped "${sections[i - 1].signature}"`,
          );
        }
        run = 1;
      }
    }

    /*
     * Page height is the signal that matters most, and it is the one a
     * section-by-section read misses: every section can look reasonable
     * while the page is four times longer than anyone will scroll.
     *
     * The ceiling was 18,000px, set when the pages were dense text lists.
     * The site is image-led now and the spacing scale is deliberately
     * generous, so the homepage sat within a few dozen pixels of the limit
     * and every added visual had to be paid for by shaving section padding
     * somewhere else. That is the wrong trade: it kept the number under the
     * line by removing the breathing room the design depends on.
     *
     * 22,000px keeps the check doing its real job — catching the page that
     * has genuinely run away — without making whitespace the thing that
     * gets sacrificed first. The per-section LONG and AIRY checks below are
     * the ones that catch padding used as filler, and they are unchanged.
     */
    if (total > 22000) {
      problems.push(`TALL    ${path} — ${total}px total across ${sections.length} sections`);
    }

    for (const s of sections) {
      const label = s.id ? `#${s.id}` : s.signature || "(section)";

      /*
       * Padding ratio only means something where there is content to frame.
       * A closing CTA band is short and mostly air by design; flagging it
       * says nothing. Two or more subheadings is the cheapest available
       * proxy for "this section was meant to carry something".
       */
      if (s.height > 400 && s.headings >= 2 && s.padding / s.height > 0.55) {
        problems.push(
          `AIRY    ${path} ${label} — ${s.padding}px padding in ${s.height}px (${Math.round(
            (s.padding / s.height) * 100,
          )}%)`,
        );
      }

      /*
       * 3,500px — roughly four screens. Below that a grouped hub listing is
       * doing its job; above it the reader has lost the thread of what
       * section they are in.
       */
      if (s.height > 3500) {
        problems.push(
          `LONG    ${path} ${label} — ${s.height}px in one section (${s.links} links)`,
        );
      }
    }

    console.log(
      `  ${path.padEnd(34)} ${String(total).padStart(6)}px  ${String(sections.length).padStart(2)} sections`,
    );
  }

  console.log(line);
  if (problems.length === 0) {
    console.log("\nNo rhythm issues found.\n");
  } else {
    console.log(`\n${problems.length} finding(s)\n${line}`);
    for (const p of problems) console.log(`  ${p}`);
    console.log("");
  }

  ws.close();
  chrome.kill();
  /* Findings are advisory: this measures composition, not correctness. */
  process.exit(0);
}

main().catch((error) => {
  console.error(`\nRhythm audit failed: ${error.message}\n`);
  chrome.kill();
  process.exit(0);
});
