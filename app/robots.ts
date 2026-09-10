import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Ported from the existing bizzfly.com robots.txt, which was one of the few
 * genuinely well-configured things on the old site: it explicitly allows the
 * AI crawlers whose visibility BizzFly sells.
 * See docs/architecture/07-existing-site-audit.md.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "DuckAssistBot",
  "meta-externalagent",
];

const SEARCH_CRAWLERS = ["Googlebot", "Bingbot", "DuckDuckBot"];

/*
 * A named user-agent group replaces the "*" group outright rather than adding
 * to it, so every group has to repeat the exclusions. Without this the
 * wildcard disallow below was ignored by precisely the crawlers it matters
 * for — Googlebot and the AI agents each matched their own group and were
 * free to walk internal search URLs.
 */
const DISALLOW = ["/search/", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal search results must not be indexed.
        disallow: DISALLOW,
      },
      ...SEARCH_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
