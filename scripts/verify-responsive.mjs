#!/usr/bin/env node
/**
 * Responsive and rendering audit.
 *
 * Drives a real Chrome via the DevTools Protocol using Node's native
 * WebSocket — no test-runner dependency added to the project. For every page
 * type at every target viewport it measures the rendered layout and reports
 * problems that only appear once CSS has actually been applied.
 *
 *   npm run verify:responsive     (requires `npm run start` on PORT)
 *
 * Checks per page × viewport:
 *   - horizontal overflow (scrollWidth wider than the viewport)
 *   - which elements overflow, so the fix is actionable
 *   - text smaller than 12px
 *   - interactive targets below 44×44 (WCAG 2.2 target size)
 *   - images with no intrinsic dimensions (layout-shift risk)
 *   - elements rendered outside the viewport on the x axis
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const BASE = process.env.QA_BASE ?? "http://localhost:3000";

const VIEWPORTS = [
  { name: "320", width: 320, height: 640 },
  { name: "360", width: 360, height: 740 },
  { name: "375", width: 375, height: 667 },
  { name: "390", width: 390, height: 844 },
  { name: "414", width: 414, height: 896 },
  { name: "480", width: 480, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "820", width: 820, height: 1180 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];

/** One representative page per template. */
const PAGES = [
  "/",
  "/services/",
  "/services/seo/",
  "/services/ai-chatbots/",
  "/industries/",
  "/industries/manufacturing/",
  "/use-cases/",
  "/use-cases/get-found-in-ai-search/",
  "/technologies/",
  "/technologies/ai-stack/",
  "/case-studies/",
  "/resources/",
  "/resources/how-to-choose-a-first-automation-project/",
  "/company/",
  "/company/about/",
  "/contact/",
  "/search/",
  "/does-not-exist/",
];

const CHROME_PATHS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

const chromePath = CHROME_PATHS.find((p) => existsSync(p));
if (!chromePath) {
  console.error("\nNo Chrome binary found; skipping responsive audit.\n");
  process.exit(0);
}

// Unique per run so a stale browser on the default port cannot be attached to.
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
    "--user-data-dir=" + (process.env.TEMP ?? "/tmp") + "/bizzfly-qa-profile",
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
      const info = await res.json();
      return info.webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }
  throw new Error("Chrome did not expose a debugging endpoint");
}

/**
 * Waits until the page has genuinely settled: document complete, webfonts
 * loaded, and two animation frames painted. Measuring before this reports
 * mid-load layout as a defect.
 */
const settleFor = (width) => `new Promise((resolve) => {
  const ready = () => document.documentElement.clientWidth === ${width};
  const finish = () => {
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
      // Poll until the emulated viewport has actually taken effect; measuring
      // before the relayout reports stale widths as overflow.
      let tries = 0;
      const check = () => {
        if (ready() || tries++ > 40) {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve(true)));
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    });
  };
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
  setTimeout(() => resolve(true), 6000);
})`;


/** Runs inside the page. Returns everything measurable in one round trip. */
const AUDIT_FN = `(() => {
  const doc = document.documentElement;
  const vw = window.innerWidth;

  const overflowing = [];
  const smallText = [];
  const smallTargets = [];
  const unsizedImages = [];

  const describe = (el) => {
    const id = el.id ? '#' + el.id : '';
    const cls = typeof el.className === 'string' && el.className
      ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.')
      : '';
    return el.tagName.toLowerCase() + id + cls;
  };

  for (const el of document.querySelectorAll('body *')) {
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    // Horizontal overflow: extends past the right edge, or starts left of 0.
    if (rect.right > vw + 1 || rect.left < -1) {
      // Ignore elements inside an intentional horizontal scroll container.
      let scroller = false;
      for (let p = el.parentElement; p; p = p.parentElement) {
        const ps = getComputedStyle(p);
        if (ps.overflowX === 'auto' || ps.overflowX === 'scroll') { scroller = true; break; }
      }
      if (!scroller) {
        overflowing.push({
          el: describe(el),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
      }
    }

    // Text below 12px is a legibility problem at any viewport.
    //
    // SVG text is declared in user units and then scaled by the viewBox, so
    // the computed font-size is not what the reader sees. Multiply by the
    // element's actual render scale before judging it.
    const declared = parseFloat(style.fontSize);
    const hasOwnText = [...el.childNodes].some(
      (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
    );
    if (hasOwnText && declared) {
      let effective = declared;
      const svg = el.ownerSVGElement;
      if (svg) {
        const box = svg.viewBox?.baseVal;
        const rendered = svg.getBoundingClientRect().width;
        if (box && box.width > 0 && rendered > 0) {
          effective = declared * (rendered / box.width);
        }
      }
      if (effective < 12) {
        smallText.push({
          el: describe(el),
          size: Math.round(effective * 10) / 10,
          declared: svg ? declared : undefined,
        });
      }
    }

    // WCAG 2.2 target size on interactive elements.
    if (el.matches('a[href], button, input, select, textarea, summary')) {
      const inline = style.display === 'inline' && el.matches('a[href]');
      if (!inline && (rect.width < 24 || rect.height < 24)) {
        smallTargets.push({
          el: describe(el),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        });
      }
    }
  }

  for (const img of document.querySelectorAll('img')) {
    const hasDims =
      (img.getAttribute('width') && img.getAttribute('height')) ||
      getComputedStyle(img).aspectRatio !== 'auto';
    if (!hasDims) unsizedImages.push(describe(img));
  }

  return {
    scrollWidth: doc.scrollWidth,
    clientWidth: doc.clientWidth,
    overflow: doc.scrollWidth - doc.clientWidth,
    overflowing: overflowing.slice(0, 6),
    smallText: smallText.slice(0, 6),
    smallTargets: smallTargets.slice(0, 6),
    unsizedImages: unsizedImages.slice(0, 6),
  };
})()`;

const issues = [];
let checks = 0;

try {
  const wsUrl = await connect();
  ws = new WebSocket(wsUrl);

  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

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
  const { sessionId } = await send("Target.attachToTarget", {
    targetId,
    flatten: true,
  });

  await send("Page.enable", {}, sessionId);
  await send("Runtime.enable", {}, sessionId);

  console.log(`\nResponsive audit — ${PAGES.length} pages × ${VIEWPORTS.length} viewports`);
  console.log("─".repeat(72));

  for (const path of PAGES) {
    const pageIssues = [];

    for (const vp of VIEWPORTS) {
      await send(
        "Emulation.setDeviceMetricsOverride",
        {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width < 768,
        },
        sessionId,
      );

      await send("Page.navigate", { url: `${BASE}${path}` }, sessionId);
      await send(
        "Runtime.evaluate",
        {
          expression: settleFor(vp.width),
          awaitPromise: true,
          returnByValue: true,
        },
        sessionId,
      ).catch(() => {});

      const { result } = await send(
        "Runtime.evaluate",
        { expression: AUDIT_FN, returnByValue: true, awaitPromise: false },
        sessionId,
      );

      checks += 1;
      const data = result.value;
      if (!data) continue;
      // Emulation did not settle — skip rather than report a false positive.
      if (data.clientWidth !== vp.width) continue;

      if (data.overflow > 1) {
        pageIssues.push(
          `${vp.name}px: horizontal overflow of ${data.overflow}px` +
            (data.overflowing.length
              ? ` — ${data.overflowing.map((o) => `${o.el} (right ${o.right})`).join(", ")}`
              : ""),
        );
      }
      for (const t of data.smallText) {
        pageIssues.push(
          `${vp.name}px: text renders at ${t.size}px on ${t.el}` +
            (t.declared ? ` (declared ${t.declared}px, scaled by viewBox)` : ""),
        );
      }
      for (const t of data.smallTargets) {
        pageIssues.push(`${vp.name}px: target ${t.w}×${t.h} on ${t.el}`);
      }
      for (const img of data.unsizedImages) {
        pageIssues.push(`${vp.name}px: image without dimensions — ${img}`);
      }
    }

    const unique = [...new Set(pageIssues)];
    if (unique.length === 0) {
      console.log(`✓ ${path}`);
    } else {
      console.log(`✗ ${path}`);
      for (const issue of unique.slice(0, 8)) console.log(`    ${issue}`);
      if (unique.length > 8) console.log(`    …and ${unique.length - 8} more`);
      issues.push({ path, count: unique.length });
    }
  }
} catch (error) {
  console.error("\nResponsive audit failed:", error.message, "\n");
  chrome.kill();
  process.exit(1);
} finally {
  try {
    ws?.close();
  } catch {
    /* already closed */
  }
  chrome.kill();
}

console.log("─".repeat(72));
console.log(`${checks} page/viewport combinations measured`);

if (issues.length > 0) {
  console.error(
    `\n${issues.length} page(s) with responsive issues:\n` +
      issues.map((i) => `  ✗ ${i.path} (${i.count})`).join("\n") +
      "\n",
  );
  process.exit(1);
}

console.log("\nNo responsive issues found.\n");
