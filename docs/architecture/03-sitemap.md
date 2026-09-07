# 03 — Complete Sitemap

**328 pages.** The full attribute set for every page — page name, URL, page type,
parent section, target audience, user intent, primary topic, primary CTA, related
pages, build phase and source status — lives in
[`sitemap.csv`](sitemap.csv), which is the build manifest Prompt 4 reads. This
document is the human-readable view and the rationale.

## Validation status

Machine-checked against `sitemap.csv`:

- 328 unique URLs, **0 duplicates**
- **0 broken related-page references**
- **0 structural orphans** — every page has an existing parent path
- Every row has a page type, a user intent, a primary CTA and a build phase

## Composition

| By build phase | Pages | | By source status | Pages |
|---|---|---|---|---|
| **P1 — Launch** | 134 | | New content | 259 |
| **P2 — Depth** | 132 | | Rewrite of existing page | 40 |
| **P3 — Long tail** | 62 | | Reusable as-is | 1 |
| | | | `[CONTENT REQUIRED]` | 25 |
| | | | `[VERIFY WITH BIZZFLY]` | 3 |

| By page type | Count | | By page type | Count |
|---|---|---|---|---|
| Service | 99 | | Comparison | 8 |
| Use Case | 25 | | Topic Hub | 6 |
| Glossary Term | 22 | | Practice Hub | 6 |
| Blog | 21 | | FAQ | 6 |
| Industry | 14 | | Tool | 4 |
| Company | 14 | | Location Service | 4 |
| Case Study | 14 | | Location | 4 |
| Technology | 13 | | Legal | 4 |
| Listing | 12 | | Utility | 3 |
| Industry Crossover | 12 | | Whitepaper | 2 |
| Hub | 11 | | Report | 2 |
| Guide | 10 | | Landing | 1 |
| Conversion | 10 | | Contact | 1 |

## Phasing — why 328 pages does not mean 328 pages at launch

Publishing 328 pages at once would guarantee thin content, which is the exact
failure mode the brief prohibits. The manifest therefore assigns every page a phase:

- **P1 (134 pages) — Launch.** Everything a buyer needs to evaluate BizzFly, plus
  the AI-search content that is the strategic bet. Ships together.
- **P2 (132 pages) — Depth.** Sub-services, second-tier industries, remaining
  glossary and FAQ coverage. Rolls out over roughly two quarters after launch.
- **P3 (62 pages) — Long tail.** Speculative demand, tools, secondary comparisons,
  and every location outside Pune. Built only when demand or evidence justifies it.

**Nothing in P2 or P3 ships until its content meets the depth standard in document
01.** A phase is a queue, not a deadline.

---

## The three-axis discovery model

Every commercial page is reachable through three independent paths that converge on
the same proof and conversion layer:

```
                    ┌──────────────┐
   how we work →    │   SERVICES   │  6 practices, 99 service pages
                    └──────┬───────┘
                           │
   who we serve →   ┌──────┴───────┐
                    │  INDUSTRIES  │  14 sectors, 12 crossover pages
                    └──────┬───────┘
                           │
   why hire us →    ┌──────┴───────┐
                    │  USE CASES   │  25 business problems
                    └──────┬───────┘
                           │
              ┌────────────┴────────────┐
              │   WORK  ·  TECHNOLOGY   │   proof layer
              └────────────┬────────────┘
                           │
              ┌────────────┴────────────┐
              │  CONVERSION (6 tiers)   │
              └─────────────────────────┘
```

A visitor never has to guess which axis is "the right one." All three are complete,
and each cross-links to the other two.

---

## A. Core (1 page)

| Page | URL | Notes |
|---|---|---|
| Home | `/` | Rewrite. Must route to all three axes above the fold, not sell one service |

---

## B. Services — 106 pages

The hub plus six practices. Full detail in `sitemap.csv`.

### B0 — `/services/` (hub)

### B1 — Search & AI Visibility (33 pages) · `/services/search-ai-visibility/`

The strategic centre of the site.

**SEO cluster (15)** — hub + Technical, On-Page, Off-Page & Digital PR, Local,
Enterprise, E-commerce, International, SaaS, Audits, Consulting, Content Strategy,
Keyword & Query Strategy, Migration Support, Site Architecture.

**AI Search cluster (14)** — hub + AEO, GEO, AIO, Google AI Overviews, ChatGPT
Visibility, Perplexity Visibility, Gemini Visibility, Entity Optimisation,
Structured Data & Schema, AI Crawlability, AI Visibility Audit, AI-Ready Content
Strategy, Voice Search.

**Cross-discipline (3)** — SXO, Google Business Profile Optimisation, Search
Analytics & Reporting.

> **Why 14 AI-search pages is not keyword-splitting.** AEO, GEO and AIO are not
> synonyms. AEO targets extractive answers (snippets, direct answers). GEO targets
> generative citation in synthesised responses. AIO covers asset structuring for AI
> discovery generally. The platform pages (ChatGPT, Perplexity, Gemini, AI
> Overviews) differ in retrieval mechanism, citation behaviour and what an
> optimisation programme actually changes — a buyer asking "how do I show up in
> Perplexity" is not served by a page about Google. Each page must earn its place by
> explaining a *different mechanism*; any page that cannot is merged. This is the
> single hardest quality test in the build, and it is enforced at review in Prompt 4.

### B2 — Digital Marketing & Growth (15) · `/services/digital-marketing/`

Hub + Digital Strategy, Performance Marketing, Paid Search, Paid Social, Content
Marketing, Social Media Marketing, Email & Lifecycle, CRO, Marketing Analytics,
Growth Strategy, Brand & Positioning, Digital PR, Lead Generation, E-commerce
Marketing.

### B3 — Websites & Digital Experience (16) · `/services/web-development/`

Hub + Web Design, Corporate Websites, Business Portals, E-commerce Websites,
Landing Pages, CMS Development, Headless CMS, WordPress Development, Custom Web
Applications, UI/UX Design, Design Systems, Maintenance & Support, Performance &
Core Web Vitals, Redesign & Replatform, Accessibility Compliance.

### B4 — Software & Product Engineering (15) · `/services/software-development/`

Hub + Custom Software, SaaS Product Development, Web Applications, Mobile Apps, API
Development & Integration, Product Design, MVP Development, Cloud & DevOps, QA &
Testing, Legacy Modernisation, Systems Integration, CRM Development, Customer
Portals, Booking & Scheduling Platforms.

### B5 — AI & Automation (17) · `/services/ai-automation/`

Hub + AI Consulting, AI Strategy & Roadmap, AI Agents, AI Chatbots, AI Voice Agents,
Customer Support Automation, Sales Automation, Marketing Operations Automation,
Workflow Automation, Process Digitisation, Document & Data Processing, Knowledge
Assistants, AI Integration, Intelligent Automation, LLM Application Development, AI
Transformation.

> This practice merges the current site's separate *AI Powered Solutions* and
> *Business Automation* services, which both claimed "Workflow Automation" as a
> capability. Organised by the problem being solved (support, sales, marketing ops,
> back office, knowledge) rather than by technology name, per brief section 09.

### B6 — Data & Business Intelligence (9) · `/services/data-analytics/`

Hub + Business Intelligence, Data Strategy, Dashboards & Reporting, Data
Engineering, Marketing Data Warehouse, Predictive Analytics, Data Integration,
Analytics Implementation.

---

## C. Industries — 27 pages

**14 sector pages** (`/industries/<sector>/`): Healthcare · Education & EdTech ·
Real Estate · Manufacturing · E-commerce & Retail · SaaS & Technology · Financial
Services · Hospitality & Travel · Professional Services · Logistics & Supply Chain ·
Automotive · Construction & Infrastructure · Media & Publishing · Startups & SMEs.

Four of these — real estate, education, manufacturing and consulting — correspond to
sectors already represented in testimonials on the live site, so they lead the P1
build.

**12 crossover pages** for combinations with genuine standalone search demand and a
distinct buying conversation. A crossover exists only where the sector materially
changes the service. `SEO for Real Estate` qualifies (portal dependency, RERA
listings, project-level pages). `SEO for Automotive` does not, and is a section on
the automotive page instead.

Sector-specific problems, use cases, technology fit and case studies are **sections
of the industry page**, not separate URLs — splitting them would create exactly the
thin pages the brief prohibits.

### Excluded industries and why

Government, defence, pharma manufacturing, banking core systems, and telecom were
considered and cut: BizzFly has no verifiable credential, compliance posture or
reference in these, and a sector page without sector proof damages credibility more
than its absence.

---

## D. Use Cases — 25 pages

Problem-first, written in the buyer's own words. Full list in `sitemap.csv`.

| Growth & visibility | Efficiency & automation | Build & modernise |
|---|---|---|
| Generate More Qualified Leads | Automate Customer Support | Launch a Digital Product |
| Increase Organic Traffic | Automate Sales Follow-Up | Modernise a Legacy System |
| Get Found in AI Search | Automate Marketing Operations | Centralise Business Data |
| Improve Website Conversion | Reduce Manual Work | Improve Reporting & Visibility |
| Rank in Local Search | Reduce Manual Data Entry | Improve Customer Experience |
| Recover From a Traffic Drop | Improve Operational Efficiency | Scale Digital Operations |
| Migrate Without Losing Rankings | Reduce Customer Response Time | |
| Improve Website Speed | Scale Content Production | |
| Expand Into New Markets | Build an AI Agent for My Business | |
| Lower Cost Per Lead | | |

---

## E. Work — 19 pages

| Page | Type | Status |
|---|---|---|
| `/work/` | Hub | New |
| `/work/by-industry/` | Listing | New |
| `/work/by-service/` | Listing | New |
| `/work/results/` | Listing | New |
| `/work/client-stories/` | Listing | Rewrite |
| `/work/case-study-01/` … `-14/` | Case Study | **`[CONTENT REQUIRED]`** |

The 14 case study slugs are **placeholders reserving structure, not URLs to
publish**. Final slugs are derived from the real client and outcome once supplied —
see the naming convention in document 01. No case study page goes live with
invented content; the Work hub ships showing only the case studies that exist.

Filtered views (`/work/by-industry/?sector=real-estate`) are faceted query
parameters that canonicalise to the parent listing. They are not separate indexable
pages, which prevents a combinatorial explosion of near-duplicate URLs.

---

## F. Technology — 14 pages

Hub + AI Stack · Web Stack · CMS Platforms · E-commerce Platforms · Cloud &
Infrastructure · Data & Analytics Stack · Automation Platforms · Integrations ·
Mobile Stack · Security & Compliance · Accessibility Standards · Our Engineering
Standards · AI Governance & Responsible Use.

This ecosystem exists almost entirely for persona P4 (CTO) and persona P7
(procurement). It must contain **opinions and trade-offs**, not logo walls. A
technology page that lists tools without saying when *not* to use them fails review.

---

## G. Insights — 85 pages

| Cluster | Pages |
|---|---|
| `/insights/` hub | 1 |
| Blog listing + 21 launch articles | 22 |
| Topics hub + 6 topic hubs | 7 |
| Guides listing + 10 long-form guides | 11 |
| Glossary hub + 22 terms | 23 |
| FAQ hub + 6 topic FAQ pages | 7 |
| Reports listing + 2 `[CONTENT REQUIRED]` | 3 |
| Whitepapers listing + 2 `[CONTENT REQUIRED]` | 3 |
| Tools listing + 4 tools | 5 |
| Webinars `[CONTENT REQUIRED]`, Newsletter | 2 |

**Topic clusters.** Each of the six topic hubs (`/insights/topics/<topic>/`) is the
canonical entry to a cluster and links to every guide, blog post, glossary term, FAQ
page and service page in that topic. This is the hub-and-spoke structure required by
brief section 18, and it is what makes the glossary defensible: a glossary term is
not an isolated 300-word page, it is a node with four or more inbound contextual
links from substantive content.

**Why 22 glossary terms.** Definitional queries are the highest-value AEO surface
that exists — they are the queries AI systems answer by citing a source. Each term
page carries a ≤40-word definition first (extractable), then context, then related
terms, with `DefinedTerm` schema. Terms without a real question behind them were cut.

---

## H. Company — 16 pages

`/about/` + Our Story · Leadership · How We Work · Culture · Why BizzFly · Partners
`[CONTENT REQUIRED]` · Certifications `[CONTENT REQUIRED]` · Awards
`[CONTENT REQUIRED]` · Trust & Security. Plus `/testimonials/`, `/newsroom/`,
`/careers/` + Life at BizzFly · Open Roles `[CONTENT REQUIRED]` · Internships
`[CONTENT REQUIRED]`.

---

## I. Contact & Conversion — 10 pages

`/contact/` · Book a Consultation · Technical Discovery Call · Request a Proposal ·
Free SEO Audit · AI Visibility Assessment · Automation Assessment · How We Work
(process) · Engagement Models · Pricing & Investment `[CONTENT REQUIRED]`.

Six distinct conversion destinations replace the current single "Contact us,"
matching the CTA tier system in document 06.

---

## J. Locations — 9 pages

| Page | Basis |
|---|---|
| `/locations/` | Hub |
| `/locations/pune/` | **Verified** — 2nd Floor, Shri Nivas Towers, Above Baramati Bank, Pune 411043 |
| `/locations/pune/seo-agency-pune/` | Genuine — the live homepage H1 already positions BizzFly as a Pune agency |
| `/locations/pune/website-development-pune/` | Genuine |
| `/locations/pune/digital-marketing-pune/` | Genuine |
| `/locations/pune/software-development-pune/` | Genuine |
| `/locations/mumbai/` | **`[VERIFY WITH BIZZFLY]`** — do not publish without a real presence |
| `/locations/bengaluru/` | **`[VERIFY WITH BIZZFLY]`** |
| `/locations/delhi-ncr/` | **`[VERIFY WITH BIZZFLY]`** |

Only Pune receives service-level location pages, because only Pune has a verified
address. The three unverified city pages are P3 and stay unbuilt until BizzFly
confirms a genuine office, team or client base there. **The 15 × 20 city-by-service
matrix that would produce 300 easy pages is deliberately not built** — that is the
doorway-page pattern the brief prohibits, and it is what Google's site reputation and
scaled content abuse policies target.

---

## K. Compare — 9 pages

Hub + SEO vs AEO vs GEO · In-House vs Agency · WordPress vs Custom Development ·
Headless vs Traditional CMS · Chatbot vs AI Agent · Shopify vs WooCommerce · Build vs
Buy Software · Freelancer vs Agency vs In-House.

Comparison pages must treat both options fairly and include an explicit "choose the
other one if…" section. A comparison page that always concludes "hire us" converts
worse than one that does not, and cannot be cited by an AI system as a neutral
source.

---

## L. Utility & Legal — 7 pages

`/search/` · `/sitemap/` · `/404/` · `/privacy-policy/` · `/terms/` ·
`/cookie-policy/` · `/accessibility-statement/`.

---

## Pages considered and rejected

Kept out of the manifest deliberately. Recorded so they are not re-proposed later.

| Rejected | Reason |
|---|---|
| City × service matrix for 15 Indian cities (~300 pages) | Doorway pages. No local presence, no local proof, high policy risk |
| One page per technology logo (React, Laravel, AWS…) | Thin. Belongs as sections on the six technology stack pages |
| Separate `/solutions/` tree alongside `/services/` | Users cannot distinguish the two labels — see document 01 |
| Per-industry sub-pages for problems / use cases / tech | Would create ~90 thin fragments. These are sections, not pages |
| `/blog/category/<n>/` archives | Superseded by the six topic hubs, which are editorially curated |
| Individual team member profiles | No verified roster. Leadership page only until `[CONTENT REQUIRED]` is resolved |
| "Our Process" duplicated per service | One `/process/` page, contextualised per practice within the service page |
| Author archive pages | Disallowed in the current `robots.txt`; low value; consolidate into `/about/leadership/` |
| Case studies with placeholder narratives | Prohibited by brief section 13 and by the proof standard in document 01 |
