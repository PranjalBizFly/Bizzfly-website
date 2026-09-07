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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal search results must not be indexed.
        disallow: ["/search/", "/api/"],
      },
      ...SEARCH_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
