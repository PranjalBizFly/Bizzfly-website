import type { NextConfig } from "next";
import legacyRedirects from "./lib/redirects.generated.json";

/**
 * Content Security Policy.
 *
 * `unsafe-inline` is required for both scripts and styles: the App Router
 * inlines the RSC payload and critical CSS without nonces. Adding nonces
 * needs middleware on every request, which would force dynamic rendering and
 * give up the static generation this site depends on — a worse trade for a
 * content site with no third-party scripts.
 *
 * What this policy does buy, and it is not nothing: no external script may
 * load, nothing may be framed, no plugin content may run, no form may post
 * off-origin, and all requests are upgraded to HTTPS. Those cover the
 * realistic injection routes for a site of this shape.
 *
 * If a third-party tag is added later (analytics, chat), extend the relevant
 * directive explicitly rather than relaxing the policy wholesale.
 */
const isDev = process.env.NODE_ENV !== "production";

/*
 * `next dev` cannot run under the production policy, and the failure is
 * silent in a way that costs hours: React Refresh compiles its runtime with
 * `new Function`, so the very first module of main-app.js throws
 *
 *   EvalError: Evaluating a string as JavaScript violates the following
 *   Content Security Policy directive ... 'unsafe-eval' is not an allowed
 *   source of script
 *
 * That exception aborts the client entry before hydration, which leaves the
 * whole site rendered but inert — every nav dropdown, the theme toggle and
 * the search dialog look right and do nothing, with no clue in the UI. HMR
 * also needs its websocket, which `connect-src 'self'` does not cover.
 *
 * Both relaxations are development-only and are never emitted by a
 * production build; `next build` keeps the strict policy exactly as it was.
 */
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const connectSrc = isDev
  ? "connect-src 'self' ws: wss:"
  : "connect-src 'self'";

const contentSecurityPolicy = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  connectSrc,
  "form-action 'self'",
  "frame-ancestors 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Security headers.
 */
const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /*
   * A production build and a running `next dev` share .next by default, and
   * they overwrite each other's output: the build replaces the dev server's
   * chunks, after which dev serves 500s for its own CSS until it is
   * restarted, and dev then rewrites the build the QA server is trying to
   * serve. `npm run qa` already refuses to run when the port is busy; this is
   * the same guard for the output directory.
   *
   *   NEXT_DIST_DIR=.next-qa npm run build && NEXT_DIST_DIR=.next-qa npm start
   *
   * Unset, everything behaves exactly as before.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    formats: ["image/avif", "image/webp"],
    // Sizes the design system actually uses, so no oversized variants build.
    deviceSizes: [640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Trailing slashes match the URL architecture in docs/architecture/04.
  trailingSlash: true,

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        /* Generated OG images are immutable per title. */
        source: "/og",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, immutable",
          },
        ],
      },
    ];
  },

  /**
   * Legacy redirects are generated from docs/architecture/redirects.csv — the
   * audited map of the previous WordPress site — by scripts, not written by
   * hand. Every destination is a route that exists, single hop, no chains.
   */
  async redirects() {
    // statusCode 301 rather than "permanent: true", which emits 308.
    // The audited redirect map specifies 301, the conventional status for a
    // migration, and the one every SEO tool reports on.
    return legacyRedirects.map((rule) => ({
      source: rule.source,
      destination: rule.destination,
      statusCode: 301 as const,
    }));
  },
};

export default nextConfig;
