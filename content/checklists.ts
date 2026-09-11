/**
 * Checklists.
 *
 * Each is a working list someone can actually run, ordered so that the checks
 * which invalidate later work come first. They describe what to verify and
 * why it matters — not a list of services to buy.
 */

import type { Resource } from "@/types/content";

export const checklists: Resource[] = [
  {
    slug: "technical-seo-checklist",
    type: "checklist",
    topic: "Technical SEO",
    title: "Technical SEO Checklist",
    answer:
      "A technical SEO check confirms four things in order: that search engines can reach your pages, that they render with content present, that duplicates are resolved to one address, and that the structure describes what each page is.",
    body: [
      "Start with access, because everything else is wasted if this fails. Confirm the robots file does not block directories that matter, that important pages return a 200 rather than a redirect chain, that the sitemap lists only canonical, indexable URLs, and that no staging noindex survived launch. A single stale directive here can remove an entire section from eligibility.",
      "Then check rendering. Fetch a page as a crawler would and confirm the main content is present in the initial HTML rather than appearing only after JavaScript executes. This is the check most often skipped and the one most likely to explain why a modern site underperforms with AI crawlers specifically.",
      "Next resolve duplication. Every page should declare a self-referencing canonical, and the canonical, the internal links and the sitemap entry should all name the same URL. Check that parameters, trailing slashes and case variations do not serve the same content at different addresses without a declared preference.",
      "Finally check structure and health. One H1 per page, a heading order that does not skip levels, structured data that validates and describes content actually on the page, image dimensions set to prevent layout shift, and Core Web Vitals assessed on field data rather than a laboratory score.",
    ],
    supports: ["technical-seo", "seo"],
    seo: {
      title: "Technical SEO Checklist",
      description:
        "Check access, rendering, canonicalisation and structure: in that order. The rendering check most teams skip and why it explains AI crawler problems.",
      primaryTopic: "technical SEO checklist",
      secondaryTopics: ["SEO audit", "crawlability", "indexing"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Technical SEO",
      href: "/services/technical-seo/",
      tier: "T1",
    },
    faqs: [
      {
        question: "What order should technical SEO checks run in?",
        answer:
          "Access first, then rendering, then duplication, then structure. Each stage can invalidate the next: there is no value in checking headings on a page a crawler cannot reach or render.",
      },
      {
        question: "How often should this be run?",
        answer:
          "Fully once or twice a year, and after any launch, migration or platform change. Access and indexing should be monitored continuously, because those failures are silent and expensive.",
      },
    ],
    related: [
      { label: "Technical SEO", href: "/services/technical-seo/", type: "SERVICE" },
      {
        label: "Index Coverage",
        href: "/resources/what-is-index-coverage/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "ai-search-readiness-checklist",
    type: "checklist",
    topic: "AI Search",
    title: "AI Search Readiness Checklist",
    answer:
      "AI search readiness comes down to three questions: can the systems reach and read your pages, can they tell unambiguously who you are, and does your content state answers in a form that can be lifted and attributed.",
    body: [
      "Access first. Confirm your robots policy does not block AI crawlers you want to be read by, and that content is present in server-rendered HTML. Many AI crawlers execute little or no JavaScript, so a browser-rendered site can be effectively invisible to them while performing acceptably in conventional search.",
      "Then identity. One canonical organisation record with a stable identifier, referenced rather than repeated across templates. The same name, address and contact details everywhere they appear, including external profiles. Contradictory details are the most common reason a system cannot resolve a smaller business confidently.",
      "Then answer shape. On pages that answer questions, the answer should appear before the argument, in complete sentences that survive being lifted out of context. Headings should match how questions are actually asked. A passage that only makes sense with the surrounding page cannot be extracted or quoted.",
      "Finally, measurement. Decide before you start how you will judge this, because sessions will not show it. Branded search volume, direct arrivals, appearance in answers for your priority questions and enquiry quality are the available evidence.",
    ],
    supports: ["ai-search-optimisation", "generative-engine-optimisation"],
    seo: {
      title: "AI Search Readiness Checklist",
      description:
        "Access, identity, answer shape and measurement. The four checks that decide whether AI systems can read, resolve and cite your business.",
      primaryTopic: "AI search readiness",
      secondaryTopics: ["GEO", "AEO", "AI visibility"],
      intent: "informational",
    },
    audience: ["A3", "A4", "A7"],
    phase: "P1",
    cta: {
      label: "Read about AI Search Optimisation",
      href: "/services/ai-search-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Should we allow AI crawlers?",
        answer:
          "If you want to be cited in AI answers, yes: blocking them generally removes you from consideration entirely. It is a genuine trade between control and presence, and it should be a deliberate decision rather than a default.",
      },
      {
        question: "How do we know if we are being cited?",
        answer:
          "Test a fixed set of buyer questions across the assistants your market uses, repeat it on a schedule, and record which sources are named. It is sampling rather than measurement, but it is the evidence that exists.",
      },
    ],
    related: [
      {
        label: "Get found in AI search",
        href: "/use-cases/get-found-in-ai-search/",
        type: "USE CASE",
      },
      {
        label: "How AI Search Works",
        href: "/resources/how-ai-search-works/",
        type: "GUIDE",
      },
    ],
  },
  {
    slug: "website-launch-checklist",
    type: "checklist",
    topic: "Web",
    title: "Website Launch Checklist",
    answer:
      "A launch check confirms that nothing which worked before has been lost: URLs resolve or redirect, content depth is preserved, tracking still fires, and the site is crawlable, accessible and fast on real devices.",
    body: [
      "Before launch, verify continuity. Every existing URL should have a decided destination: kept, redirected once to the closest equivalent, or deliberately retired. Check for chains and loops, and confirm that pages which earned search visibility have kept their content rather than being trimmed to fit a new template.",
      "Verify the machine view. Fetch key templates as a crawler and confirm the main content is in the HTML, there is exactly one H1, structured data validates, canonicals are self-referencing, and no staging noindex or robots block survived. This is the single highest-value pre-launch pass.",
      "Verify measurement, because it is invisible when broken. Analytics loading on every template, conversion events firing on the real form rather than a test one, Search Console verified for the live property, and the previous data still available for comparison.",
      "Then check the human view on real devices: forms submitting and producing a genuine confirmation, keyboard navigation reaching every control with a visible focus state, contrast holding on the templates that changed, and performance measured on a mid-range phone rather than a desktop.",
    ],
    supports: ["corporate-websites", "website-redesign"],
    seo: {
      title: "Website Launch Checklist",
      description:
        "Confirm URL continuity, the crawler's view, measurement and the human experience before launch. The pre-launch pass with the highest value.",
      primaryTopic: "website launch checklist",
      secondaryTopics: ["site migration", "go live"],
      intent: "informational",
    },
    audience: ["A7", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Corporate Websites",
      href: "/services/corporate-websites/",
      tier: "T1",
    },
    faqs: [
      {
        question: "What is most often missed at launch?",
        answer:
          "A staging noindex left in place, and analytics or conversion tracking that was never re-verified on the live site. Both are silent: the site looks correct while being invisible or unmeasurable.",
      },
      {
        question: "How long should we monitor after launch?",
        answer:
          "Closely for two weeks, then weekly for a quarter. Indexing and ranking effects lag the change, so a problem introduced at launch often becomes visible well after everyone has moved on.",
      },
    ],
    related: [
      {
        label: "How to Plan a Website Redesign",
        href: "/resources/how-to-plan-a-website-redesign/",
        type: "DECISION",
      },
      {
        label: "Why Your Website Redesign Lost Traffic",
        href: "/resources/why-your-website-redesign-lost-traffic/",
        type: "ARTICLE",
      },
    ],
  },
  {
    slug: "local-seo-checklist",
    type: "checklist",
    topic: "Local SEO",
    title: "Local SEO Checklist",
    answer:
      "Local visibility depends on three things being consistent and complete: an accurate business profile, identical name, address and phone details everywhere they appear, and pages that genuinely serve the places you operate in.",
    body: [
      "Start with the business profile. Correct primary category, accurate opening hours including exceptions, a complete and specific service list, real photographs, and a description that says what the business does rather than listing keywords. An incomplete profile is the most common and most fixable local problem.",
      "Then consistency. The same business name, address format and phone number on your site, your profile and every directory that lists you. Variations look trivial to a person and read as competing facts to a machine trying to resolve one business.",
      "Then the site itself. A location page with a genuine address, embedded map and local contact details; structured data describing the organisation and its location; and internal links that make the location reachable rather than buried in a footer.",
      "Reviews and questions matter and must be earned rather than manufactured. Ask real customers, respond to what they write, and answer the questions people actually post. Fabricated or incentivised reviews are a policy violation and a reputational risk that outlives any short-term gain.",
    ],
    supports: ["google-business-profile", "seo"],
    seo: {
      title: "Local SEO Checklist",
      description:
        "Profile completeness, detail consistency, genuine location pages and earned reviews. The four checks that decide local visibility.",
      primaryTopic: "local SEO checklist",
      secondaryTopics: ["Google Business Profile", "local search", "NAP"],
      intent: "informational",
    },
    audience: ["A1", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Google Business Profile",
      href: "/services/google-business-profile/",
      tier: "T1",
    },
    faqs: [
      {
        question: "Do we need a page for every city we serve?",
        answer:
          "Only where you have a genuine presence or a substantively different offer. Near-identical pages differing by place name are doorway pages: they are a policy violation and they rarely rank for long.",
      },
      {
        question: "How much do reviews matter?",
        answer:
          "They influence both local ranking and the decision a reader makes after finding you. They have to be earned from real customers: fabricated or incentivised reviews are a policy violation with lasting reputational cost.",
      },
    ],
    related: [
      {
        label: "Google Business Profile",
        href: "/services/google-business-profile/",
        type: "SERVICE",
      },
      {
        label: "Rank in local search",
        href: "/use-cases/rank-in-local-search/",
        type: "USE CASE",
      },
    ],
  },
  {
    slug: "website-conversion-checklist",
    type: "checklist",
    topic: "Conversion",
    title: "Website Conversion Checklist",
    answer:
      "Most conversion problems are clarity problems. Check that a visitor can tell what you do, who it is for and what happens next within seconds, then that the form asks only for what you genuinely need.",
    body: [
      "Start above the fold, and be strict. Within a few seconds a visitor should be able to say what the business does, whether it is for someone like them, and what the next step is. Pages that open with a claim rather than an offer fail this repeatedly, and no amount of button testing compensates.",
      "Check the action itself. One primary action per page, phrased as what the visitor gets rather than what the business wants, visible without scrolling on a phone, and repeated at the point where a reader has finished being convinced rather than only at the top.",
      "Then the form. Every field should be one you genuinely act on. Fields collected because they might be useful cost completions measurably. Ask what happens to the enquiry, tell the visitor, and make the confirmation state a real one: a fake success message is worse than an honest failure.",
      "Then friction and trust. Test on a mid-range phone: tap targets big enough, no layout shift moving a button under a thumb, no interstitial covering the content. Where proof is offered it must be real and attributable; invented logos and unsourced statistics reduce trust in everything around them.",
    ],
    supports: ["conversion-rate-optimisation", "ui-ux-design"],
    seo: {
      title: "Website Conversion Checklist",
      description:
        "Most conversion problems are clarity problems. Check the opening seconds, the primary action, the form, and friction on a real phone.",
      primaryTopic: "website conversion checklist",
      secondaryTopics: ["CRO", "landing pages", "forms"],
      intent: "informational",
    },
    audience: ["A3", "A4"],
    phase: "P1",
    cta: {
      label: "Read about Conversion Rate Optimisation",
      href: "/services/conversion-rate-optimisation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "How many form fields is too many?",
        answer:
          "Any field you do not act on. The test is not a number but whether someone uses the answer. Fields collected in case they are useful reliably cost completions.",
      },
      {
        question: "Should we A/B test everything?",
        answer:
          "Only where traffic supports it. Below a few hundred conversions a month, tests rarely reach significance and teams read noise as insight. At that volume, fixing clarity problems beats testing them.",
      },
    ],
    related: [
      {
        label: "Improve website conversion",
        href: "/use-cases/improve-website-conversion/",
        type: "USE CASE",
      },
      {
        label: "Core Web Vitals",
        href: "/resources/what-is-core-web-vitals/",
        type: "GLOSSARY",
      },
    ],
  },
  {
    slug: "digital-growth-audit-checklist",
    type: "checklist",
    topic: "Digital Growth",
    title: "Digital Growth Audit Checklist",
    answer:
      "A growth audit examines four layers in sequence: whether you can be found, whether what people find is credible, whether it converts, and whether the operation behind it can absorb the demand.",
    body: [
      "Visibility first. Which queries and questions your buyers actually use, whether you appear for them in conventional search and in AI answers, and whether the pages that should own those topics exist, are indexed and are reachable.",
      "Then credibility. What a visitor concludes in the first ten seconds, whether the offer is specific enough to be believable, and whether any proof shown is real and attributable. Unsourced statistics and invented logos actively reduce trust.",
      "Then conversion. Whether the primary action is obvious and appropriate for the stage the visitor is at, whether the form is proportionate, and whether enquiries are actually received, routed and answered quickly enough to matter.",
      "Then capacity, which is the layer most audits skip. Growth that breaks fulfilment is not growth. Check what happens to response time, delivery quality and support load if enquiries doubled, because if the answer is unacceptable, the constraint is operational rather than marketing.",
    ],
    supports: ["digital-strategy", "conversion-rate-optimisation"],
    seo: {
      title: "Digital Growth Audit Checklist",
      description:
        "Audit visibility, credibility, conversion and capacity in sequence. The operational layer most audits skip and why it decides whether growth helps.",
      primaryTopic: "digital growth audit",
      secondaryTopics: ["marketing audit", "growth strategy"],
      intent: "informational",
    },
    audience: ["A1", "A2", "A3"],
    phase: "P1",
    cta: { label: "Talk through an audit", href: "/contact/", tier: "T1" },
    faqs: [
      {
        question: "Where do most growth audits go wrong?",
        answer:
          "They stop at marketing. If enquiries already arrive faster than they can be answered well, more visibility makes the customer experience worse rather than better, and the real constraint is operational.",
      },
      {
        question: "How long does an audit take?",
        answer:
          "A focused audit across these four layers is typically two to three weeks. Longer engagements usually reflect scope creep rather than depth, and the recommendations get stale before they are implemented.",
      },
    ],
    related: [
      {
        label: "Digital Strategy",
        href: "/services/digital-strategy/",
        type: "SERVICE",
      },
      { label: "Our Approach", href: "/our-approach/", type: "COMPANY" },
    ],
  },
  {
    slug: "automation-readiness-checklist",
    type: "checklist",
    topic: "Automation",
    title: "Automation Readiness Checklist",
    answer:
      "A process is ready to automate when it is stable, documented, high enough in volume to repay the work, and its systems can be reached programmatically. If any of those is missing, fix it before building anything.",
    body: [
      "Check stability first. If the process changed in the last quarter or is being redesigned now, automation will freeze a version you are about to replace and make further change harder. Wait until the shape has settled.",
      "Check that it is understood. Someone should be able to describe every step, every decision point and every exception. Where two people describe the process differently, that disagreement is the real first problem: automation will simply encode one version and break for the other.",
      "Check the volume and the arithmetic. Frequency times time saved, against build cost plus ongoing maintenance. Be honest about maintenance: an integration is not finished when it ships, and a process automated at the interface layer needs watching indefinitely.",
      "Check access. Do the systems involved offer APIs or webhooks, or would this mean driving screens? Screen-driven automation is legitimate as a deliberate bridge and expensive as a permanent architecture. Confirm too who owns credentials and what happens when they rotate.",
    ],
    supports: ["workflow-automation", "systems-integration"],
    seo: {
      title: "Automation Readiness Checklist",
      description:
        "Stability, shared understanding, volume arithmetic and system access. The four checks that decide whether a process should be automated yet.",
      primaryTopic: "automation readiness",
      secondaryTopics: ["process automation", "integration"],
      intent: "informational",
    },
    audience: ["A6", "A7"],
    phase: "P1",
    cta: {
      label: "Read about Workflow Automation",
      href: "/services/workflow-automation/",
      tier: "T1",
    },
    faqs: [
      {
        question: "What if two people describe the process differently?",
        answer:
          "Stop and resolve it. That disagreement is the actual problem: automating one version encodes it as correct and the process will break for everyone following the other.",
      },
      {
        question: "Do we need APIs to automate something?",
        answer:
          "Not strictly (screens can be driven), but without them the automation is fragile and needs permanent maintenance. Treat that route as a deliberate bridge with an owner, not as the destination.",
      },
    ],
    related: [
      {
        label: "When Should You Automate a Process?",
        href: "/resources/when-should-you-automate-a-process/",
        type: "DECISION",
      },
      {
        label: "Automation Platforms",
        href: "/technologies/automation-platforms/",
        type: "TECHNOLOGY",
      },
    ],
  },
];
