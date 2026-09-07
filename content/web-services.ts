/**
 * Website performance and redesign services.
 * Both are named capabilities on the live site (Website Maintenance and
 * Support, Website Design and Development).
 */

import type { Service } from "@/types/content";

export const webServices: Service[] = [
  {
    slug: "website-performance",
    practice: "web-development",
    title: "Website Performance",
    answer:
      "Website performance work makes a slow site fast. It matters commercially because visitors leave before a slow page finishes loading, and it matters technically because speed is a ranking factor and a crawl constraint.",
    seo: {
      title: "Website Performance & Core Web Vitals",
      description:
        "Diagnose and fix a slow website — render-blocking assets, oversized media, and the theme code causing most Core Web Vitals failures.",
      primaryTopic: "website performance",
      secondaryTopics: ["Core Web Vitals", "page speed", "LCP"],
      intent: "commercial",
    },
    audience: ["A3", "A7"],
    phase: "P1",
    whoFor: [
      "Sites failing Core Web Vitals in Search Console",
      "Businesses losing mobile visitors before the page renders",
      "Teams told to fix speed with no diagnosis of the cause",
    ],
    included: [
      "Render-path analysis and real-user measurement",
      "Render-blocking CSS and JavaScript remediation",
      "Image and font optimisation with correct sizing",
      "Third-party script audit, because these are usually the largest cost",
      "Performance budget so the gains do not silently regress",
    ],
    timeline: "2–5 weeks depending on how much is theme or plugin code.",
    outOfScope: [
      "Chasing a perfect score at the expense of function",
      "Removing tracking the business genuinely needs",
    ],
    cta: { label: "Get a performance audit", href: "/contact/", tier: "T3" },
    faqs: [
      {
        question: "Why is our site slow when the hosting is fast?",
        answer:
          "Hosting is rarely the constraint. On the sites we audit, most of the delay comes from render-blocking theme CSS, unoptimised images and third-party scripts loading before the content. Those are fixable without moving host.",
      },
    ],
    related: [
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
      { label: "Website redesign", href: "/services/website-redesign/", type: "SERVICE" },
    ],
  },
  {
    slug: "website-redesign",
    practice: "web-development",
    title: "Website Redesign",
    answer:
      "A redesign replaces an outdated site without losing what the old one had earned. The risk is not the design — it is the migration, where rankings and traffic are most often lost through avoidable technical mistakes.",
    seo: {
      title: "Website Redesign & Replatform",
      description:
        "Replace an outdated website without losing rankings or traffic — redirect mapping, content migration and staged cutover.",
      primaryTopic: "website redesign",
      secondaryTopics: ["replatform", "site migration"],
      intent: "commercial",
    },
    audience: ["A2", "A3"],
    phase: "P1",
    whoFor: [
      "Businesses whose site no longer reflects what they do",
      "Companies moving off a theme they have outgrown",
      "Teams who lost traffic in a previous redesign and do not want to repeat it",
    ],
    included: [
      "Audit of what currently performs, so it is preserved rather than discarded",
      "Information architecture and content mapping",
      "Design and build on a maintainable foundation",
      "Complete redirect map with single-hop rules and no chains",
      "Staged cutover with rollback capability and post-launch monitoring",
    ],
    timeline: "10–16 weeks depending on page count and content readiness.",
    outOfScope: [
      "Launching without a redirect map, which is how most redesigns lose traffic",
    ],
    cta: { label: "Discuss your project", href: "/contact/", tier: "T4" },
    faqs: [
      {
        question: "Will a redesign hurt our search rankings?",
        answer:
          "It can, and usually does when the migration is treated as an afterthought. Losses come from missing redirects, changed URL structures with no mapping, and content quietly dropped. Planned properly, a redesign should improve search performance rather than cost it.",
      },
    ],
    related: [
      { label: "Website performance", href: "/services/website-performance/", type: "SERVICE" },
      { label: "Corporate websites", href: "/services/corporate-websites/", type: "SERVICE" },
    ],
  },
];
