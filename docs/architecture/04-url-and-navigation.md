# 04 — URL Architecture & Navigation

## 7. URL Architecture

### Rules

1. **Lowercase, hyphenated, ASCII.** No underscores, no camelCase, no percent
   encoding.
2. **Trailing slash on every URL.** The current site already does this; keeping it
   avoids an unnecessary migration variable. Enforced by a 301 from the non-slash
   form.
3. **Maximum depth: 4 segments.** `/services/search-ai-visibility/seo/technical-seo/`
   is the deepest pattern used. Anything requiring a fifth segment is an
   architecture error, not a URL problem.
4. **The URL describes the thing, not the marketing.** `/services/search-ai-visibility/seo/local-seo/`,
   never `/services/dominate-local-search/`.
5. **No dates in URLs.** Blog posts sit at `/insights/blog/<slug>/`. Dated URLs make
   evergreen content look stale and block updating in place.
6. **No parameters in canonical URLs.** Facets, filters and sorts are query
   parameters that `rel=canonical` back to the clean parent.
7. **Slug is stable.** A slug is never edited for keyword reasons after publish.
   Retitling a page does not change its URL.
8. **No stop-word stuffing.** `/insights/guides/seo-guide/`, not
   `/insights/guides/the-complete-ultimate-guide-to-seo-in-2026/`.
9. **Year references live in content, never in slugs.** Content is updated in place
   with a visible `dateModified`.

### Namespace map

| Pattern | Contains |
|---|---|
| `/services/<practice>/` | Six practice hubs |
| `/services/<practice>/<service>/` | Service pages |
| `/services/search-ai-visibility/<cluster>/<service>/` | The only 4-level branch — SEO and AI Search clusters |
| `/industries/<sector>/` | Sector pages |
| `/industries/<sector>/<crossover>/` | Sector × capability pages |
| `/use-cases/<outcome>/` | Business problem pages |
| `/work/` · `/work/<slug>/` | Case studies |
| `/technology/<topic>/` | Stack and standards |
| `/insights/<type>/` · `/insights/<type>/<slug>/` | Blog, guides, glossary, FAQs, reports, tools |
| `/insights/topics/<topic>/` | Cluster hubs |
| `/about/<page>/` · `/careers/<page>/` | Company |
| `/locations/<city>/` · `/locations/<city>/<service-city>/` | Locations |
| `/compare/<a>-vs-<b>/` | Comparisons |
| Root-level | `/`, `/contact/`, `/process/`, `/engagement-models/`, conversion pages, legal |

**Conversion pages sit at root** (`/free-seo-audit/`, `/ai-visibility-assessment/`)
because they are campaign destinations that appear in ads, email and offline
material. Short URLs matter there; taxonomy does not.

### Canonical strategy

| Situation | Rule |
|---|---|
| Every page | Self-referencing absolute canonical, always |
| Faceted listing (`/work/by-industry/?sector=x`) | Canonical to `/work/by-industry/` |
| Paginated listing (`?page=2`) | Self-canonical on each page, plus `rel=prev/next`; page 2+ is `index,follow` |
| Tracking parameters (`utm_`, `gclid`, `fbclid`) | Canonical to clean URL; already disallowed in `robots.txt` |
| Legacy `/service/<slug>/` CPT URLs | 301 to the new equivalent — see document 07 redirect map |
| `http://` and `www.` | 301 to `https://bizzfly.com` (non-www), single hop |
| Trailing-slash variants | 301 to slashed form, single hop |

**No cross-domain or cross-page canonicals to "similar" pages.** If two pages are
similar enough to want a shared canonical, one of them should not exist.

### Redirect policy

- Every legacy URL gets a **single-hop 301** to its closest equivalent. No chains.
  No blanket redirect to the homepage — a legacy URL with no equivalent returns a
  useful 410 or redirects to the nearest *parent hub*, not to `/`.
- The redirect map (document 07) is implemented at the edge, tested before cutover,
  and retained for a minimum of 12 months.
- Redirects are verified post-launch with a crawl comparing pre- and post-migration
  URL inventories.

---

## 8. Navigation System

### Design principles

1. **Six primary items maximum.** Beyond six, scan time rises and click-through
   flattens.
2. **Every mega-menu column is a real page**, not a label. If a heading is not
   clickable, users assume the section does not exist.
3. **The menu shows depth without demanding it.** Three levels visible; the fourth
   lives on the page.
4. **Every mega-menu panel carries one piece of proof and one CTA.** A menu is a
   page in its own right.
5. **Mobile is not a collapsed desktop menu.** It is a separate, shallower
   information design.

### Header structure

```
┌────────────────────────────────────────────────────────────────────────┐
│  [BizzFly]   Services  Industries  Use Cases  Work  Insights  Company  │
│                                              [🔍]  [Book a consultation]│
└────────────────────────────────────────────────────────────────────────┘
```

- **Logo** → `/`
- **Six primary items**, each opening a mega-menu panel on hover (desktop) and
  click/focus (keyboard and touch)
- **Search icon** → opens global search overlay
- **Primary CTA** — "Book a consultation" → `/contact/consultation/`. Persistent,
  high contrast, the only button-styled element in the header.
- **Sticky on scroll**, condensed to logo + nav + CTA after 120px
- Every top-level label is itself a link to its hub — hovering opens the panel,
  clicking goes to the hub. Users who never open a mega menu still reach everything.

### Mega menu — Services

The largest panel. Four columns.

| Col 1 — Practices | Col 2 — Popular services | Col 3 — Programmes | Col 4 — Featured |
|---|---|---|---|
| **Search & AI Visibility** ›<br>Get found on Google and in AI answers | SEO Services<br>AI Search Optimisation<br>Technical SEO<br>Local SEO<br>AEO<br>GEO | **AI Visibility Programme**<br>A structured programme to measure and grow presence in AI answers<br>→ Explore | *Guide*<br>**The Guide to AI Search Optimisation**<br>How brands get cited by ChatGPT, Perplexity and AI Overviews<br>→ Read |
| **Digital Marketing & Growth** ›<br>Build and convert demand | Performance Marketing<br>Content Marketing<br>Conversion Optimisation<br>Lead Generation | | |
| **Websites & Digital Experience** ›<br>Sites that are found and convert | Web Design<br>Corporate Websites<br>E-commerce Websites<br>Website Redesign<br>Performance & Core Web Vitals | | **Free SEO Audit**<br>See what's holding your site back<br>→ Request |
| **Software & Product Engineering** ›<br>Build what you can't buy | Custom Software<br>Web Applications<br>Mobile Apps<br>MVP Development | | |
| **AI & Automation** ›<br>Remove manual work | AI Agents<br>AI Chatbots<br>Workflow Automation<br>Support Automation<br>Sales Automation | | |
| **Data & Business Intelligence** ›<br>Decisions from your own data | Business Intelligence<br>Dashboards & Reporting<br>Analytics Implementation | | |

Panel footer: **View all services →** `/services/`

Column 2 shows the highest-demand services per practice, not all of them. The full
set lives on the practice hub. A mega menu listing 99 services is a directory, not
navigation.

### Mega menu — Industries

Three columns of sector links, plus a featured panel.

| Col 1 | Col 2 | Col 3 | Featured |
|---|---|---|---|
| Healthcare<br>Education & EdTech<br>Real Estate<br>Manufacturing<br>E-commerce & Retail | SaaS & Technology<br>Financial Services<br>Hospitality & Travel<br>Professional Services<br>Logistics & Supply Chain | Automotive<br>Construction<br>Media & Publishing<br>Startups & SMEs | *Case study*<br>**[CONTENT REQUIRED]**<br>→ View work by industry |

Footer: **All industries →** · **Work by industry →**

Until real case studies exist, the featured slot shows the *Work by industry*
listing rather than a fabricated card. **No placeholder case study card ships.**

### Mega menu — Use Cases

Grouped by outcome family, in the buyer's language.

| Grow revenue | Run more efficiently | Build & modernise |
|---|---|---|
| Generate more qualified leads | Automate customer support | Launch a digital product |
| Increase organic traffic | Automate sales follow-up | Modernise a legacy system |
| Get found in AI search | Reduce manual work | Centralise business data |
| Improve website conversion | Improve operational efficiency | Improve reporting |
| Rank in local search | Reduce response time | Scale digital operations |
| Lower cost per lead | Scale content production | Improve customer experience |

Footer: **All use cases →** · Featured: **Not sure where to start? Book a
consultation →**

### Mega menu — Work

Compact two-column panel: *Browse* (All work, By industry, By service, Results,
Client stories) and *Featured* (most recent case study, once one exists).

### Mega menu — Insights

| Formats | Topics | Featured |
|---|---|---|
| Blog<br>Guides<br>Reports<br>Whitepapers<br>Glossary<br>FAQs<br>Free tools | SEO<br>AI Search<br>AI & Automation<br>Web Development<br>Digital Marketing<br>Data & Analytics | Latest guide card<br>+ **Subscribe to the newsletter** |

### Mega menu — Company

| About | Careers | Connect |
|---|---|---|
| About BizzFly<br>Our Story<br>Leadership<br>How We Work<br>Why BizzFly<br>Culture | Careers<br>Life at BizzFly<br>Open Roles<br>Internships | Contact<br>Locations<br>Newsroom<br>Partners<br>Trust & Security |

### Mobile navigation

Not a collapsed desktop menu. A drill-down stack.

```
Level 0                Level 1                     Level 2
┌──────────────┐      ┌───────────────────┐      ┌──────────────────────┐
│ ✕      🔍    │      │ ‹ Services        │      │ ‹ Search & AI        │
├──────────────┤      ├───────────────────┤      ├──────────────────────┤
│ Services   › │      │ All Services      │      │ Search & AI overview │
│ Industries › │      │ ─────────────     │      │ ─────────────        │
│ Use Cases  › │      │ Search & AI     › │      │ SEO Services       › │
│ Work       › │      │ Digital Mktg    › │      │ AI Search          › │
│ Insights   › │      │ Websites        › │      │ SXO                  │
│ Company    › │      │ Software        › │      │ Google Business Prof │
├──────────────┤      │ AI & Automation › │      │ Search Analytics     │
│ Search       │      │ Data & BI       › │      └──────────────────────┘
│ Contact      │      └───────────────────┘
├──────────────┤
│ [Book a      │
│  consultation]│
└──────────────┘
```

Rules:
- One level visible at a time; a persistent back affordance labelled with the parent
- Every level begins with a link to its own hub page ("All Services", "Search & AI
  overview") — the parent is always reachable, never a dead label
- CTA pinned to the bottom of the panel, always visible
- Panel is a focus trap; `Esc` closes; body scroll locked
- Opens in under 150ms; no layout shift

### Footer architecture

Five columns plus a base bar.

| Services | Explore | Company | Resources | Get started |
|---|---|---|---|---|
| Search & AI Visibility | Industries | About BizzFly | Blog | Book a consultation |
| Digital Marketing | Use Cases | Our Story | Guides | Free SEO audit |
| Websites | Work | Leadership | Glossary | AI visibility assessment |
| Software Engineering | Technology | Careers | FAQs | Request a proposal |
| AI & Automation | Compare | Newsroom | Reports | **Newsletter signup** |
| Data & BI | Locations | Contact | Free tools | |
| *All services →* | | Trust & Security | | |

**Base bar:** © BizzFly · Privacy Policy · Terms & Conditions · Cookie Policy ·
Accessibility Statement · Sitemap · Social links

**NAP block (also in footer, marked up with `Organization` + `PostalAddress` schema):**

> BizzFly
> 2nd Floor, Shri Nivas Towers, Above Baramati Bank, Pune 411043
> +91 91 9815 9815 · sales@bizzfly.com

The footer is the site's structural safety net: it guarantees every top-level
section is one click from every page, which is what keeps a 328-page site inside
three clicks end to end.

> **Fix required at build:** the current footer links to `/seo/`,
> `/website-design-development/` and similar root-level URLs that 301 to
> `/services/...`. Every internal link must point at the final destination. Internal
> links to redirects waste crawl budget and add latency for no benefit.

### Breadcrumbs

On every page except `/` and root-level conversion pages.

`Home › Services › Search & AI Visibility › SEO Services › Technical SEO`

Rendered visually and marked up with `BreadcrumbList` schema. The last item is plain
text, not a link.

---

## 17 (part). Global Search Experience

### What is indexed

Services, industries, use cases, case studies, technology, guides, blog posts,
glossary terms, FAQ entries, locations, comparison pages, and open roles. Legal and
utility pages are excluded.

Each indexed record carries: title, URL, page type, parent section, summary,
audience tags, topic tags, and a boost weight.

### Ranking

Boost order: **Conversion & Service pages > Industry & Use Case > Case Study >
Guide > Blog & Glossary**. A user searching "seo" wants the SEO service page first,
not a blog post that mentions SEO 40 times.

### Interface

- Opens as a full-width overlay from the header icon; `/` keyboard shortcut on
  desktop
- Results grouped by page type with a type label on each result
- Filters: page type · practice · industry
- Instant results after 2 characters, debounced 150ms
- Keyboard: `↑↓` navigate, `Enter` open, `Esc` close

### Empty state

Never a bare "No results found." Show:

1. "No matches for *<query>*."
2. **Popular searches** — SEO, AI search, website redesign, automation, pricing
3. **Browse by** — Services · Industries · Use Cases · Insights
4. **Still stuck?** → Book a consultation

### Typo and synonym handling

- Fuzzy matching, edit distance 1 for terms of 5+ characters
- A curated synonym map, because users do not search in our taxonomy:
  `AEO` ↔ `answer engine optimisation` ↔ `featured snippets` ·
  `GEO` ↔ `generative engine optimisation` ↔ `AI citations` ·
  `website` ↔ `web design` ↔ `web development` ·
  `chatbot` ↔ `AI agent` ↔ `virtual assistant` ·
  `price` ↔ `pricing` ↔ `cost` ↔ `rates` ↔ `charges` ·
  `automation` ↔ `automate` ↔ `workflow`
- **`price` and `cost` must return `/engagement-models/pricing/` first.** It is one
  of the most common site-search queries on any agency site and the most common
  cause of an abandoned session.

### Related results

Every result set ends with "Related sections" derived from the topic tags of the top
three results — turning a failed search into navigation rather than an exit.

### Implementation

Client-side index (Pagefind or FlexSearch) generated at build time. 328 pages is far
below the threshold where a hosted search service earns its cost, and a build-time
index has no runtime dependency, no per-query cost, and works offline in preview.
Revisit only if the site passes ~1,500 pages or needs personalised ranking.
