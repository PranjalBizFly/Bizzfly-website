# 05 — Page Types & Content Model

## 9. Page Type Architecture

Fourteen page types. **Each has a genuinely different information hierarchy** — the
brief's prohibition on one template repeated 200 times is enforced by making the
section order, the proof mechanism and the CTA tier differ per type.

Notation: sections listed in render order. `*` = required, `~` = conditional.

---

### PT-01 · Landing (Home) — 1 page

`*Positioning statement` → `*Three-axis entry (Services / Industries / Use Cases)` →
`*What we do` (6 practices) → `~Proof strip` → `*The AI-search point of view` →
`*How we work` (3 steps) → `~Featured case study` → `*Insights teaser` →
`*Conversion block` (two tiers)

**Distinct because:** it is the only page that must serve all nine audiences
simultaneously, so it routes rather than sells. No single service gets more than one
sixth of the page.

---

### PT-02 · Practice Hub — 6 pages

`*H1 + one-sentence definition` → `*Who this is for` → `*Sub-service grid` →
`*How this practice works` → `~Proof` → `*Related industries` →
`*Related use cases` → `*FAQs (3+)` → `*CTA (medium tier)`

**Distinct because:** its job is routing *within* a practice. The sub-service grid
appears above the fold; a visitor here has already chosen a category and needs to
narrow, not to be re-sold.

---

### PT-03 · Service — 99 pages

`*H1` → `*Answer block` (what this is, ≤60 words, extractable) →
`*Who this is for / when you need it` → `*What's included` (deliverables) →
`*How we approach it` (method, not slogans) → `*What changes` (outcomes, honestly
framed) → `*Timeline & what to expect` → `~Technology used` → `~Proof` →
`*Related services` → `*FAQs (4+)` → `*CTA (medium or high tier)`

**Distinct because:** the *Answer block* is first and the hero is minimal. This is a
deliberate AEO decision — the definition must be the first substantive text in the
DOM so it can be extracted as a direct answer. Marketing heroes push the answer below
1,000px and out of extraction range.

---

### PT-04 · Industry — 14 pages

`*H1` → `*What we see in this sector` (evidence of fluency, sector vocabulary) →
`*Four sector problems` → `*How we help` (services mapped to those problems) →
`*Relevant use cases` → `~Sector technology & compliance notes` →
`~Case studies in this sector` → `*Sector FAQs` → `*CTA (high tier)`

**Distinct because:** it opens with *their* reality before any BizzFly capability.
The first screen has to prove sector knowledge or the visitor leaves. Services appear
only after the problems are named.

---

### PT-05 · Industry Crossover — 12 pages

`*H1` → `*The specific problem` → `*Why the generic approach fails here` →
`*What we do differently` → `~Proof` → `*Parent industry link` →
`*Parent service link` → `*FAQs` → `*CTA`

**Distinct because:** the second section — *why the generic approach fails here* — is
the page's entire reason to exist. If it cannot be written honestly, the page is
deleted and folded into its parent.

---

### PT-06 · Use Case — 25 pages

`*H1 (buyer's goal)` → `*Does this sound familiar?` (symptoms) →
`*Why this happens` (diagnosis) → `*How we solve it` (approach) →
`*What good looks like` (target state) → `*How long it takes` →
`*Services involved` → `~Proof` → `*Related use cases` → `*CTA (medium tier)`

**Distinct because:** it is diagnostic in shape — symptoms before solution. The
visitor arrives with a problem, not a category, and must recognise themselves in the
first section.

---

### PT-07 · Case Study — 14 pages

Full model in section 11 below.

**Distinct because:** it is narrative and chronological, with metrics as evidence
rather than headline. It is the only page type where BizzFly is not the subject.

---

### PT-08 · Technology — 13 pages

`*H1` → `*What this covers` → `*What we use and why` → `*When we don't use it` →
`*How we make the decision` → `~Standards & practices` → `*Related services` →
`*CTA (technical discovery)`

**Distinct because:** *When we don't use it* is mandatory. It is what separates a
technology page from a logo wall, and it is the section persona P4 reads first.

---

### PT-09 · Guide — 10 pages

`*H1` → `*Who this guide is for + what you'll learn` → `*Table of contents` →
`*Chapters (5–10)` → `*Key takeaways` → `*Glossary links` →
`*FAQs (6+)` → `~Download` → `*Soft CTA (low tier)`

**Distinct because:** it is long-form with in-page navigation and a sticky ToC, and
it carries a **low-tier CTA only**. A guide that pushes a sales call converts the
reader out of the funnel, not into it.

---

### PT-10 · Blog — 21 pages

`*H1` → `*Author + dates (published / modified)` → `*The point` (one takeaway, up
top) → `*Body` → `*What to do about it` → `*Cluster links` → `*Soft CTA`

**Distinct because:** the takeaway is stated before the argument, not withheld for
the conclusion.

---

### PT-11 · Glossary Term — 22 pages

`*H1 (the term)` → `*Definition (≤40 words, plain, first in DOM)` →
`*In more detail` → `*Why it matters` → `~Example` → `*Related terms` →
`*Where we cover this properly` (guide/service link) → `*No hard CTA`

**Distinct because:** it is the most constrained type on the site — definition
first, no hero, no marketing, `DefinedTerm` schema. It exists to be extracted and
cited.

---

### PT-12 · Comparison — 8 pages

`*H1 (A vs B)` → `*Short answer` (≤60 words) → `*Comparison table` →
`*Choose A if…` → `*Choose B if…` → `*Where each breaks down` →
`*How we'd decide for you` → `*FAQs` → `*Balanced CTA`

**Distinct because:** it must be fair. The "choose B" section is required even when B
is not something BizzFly sells.

---

### PT-13 · Location — 8 pages (4 Location + 4 Location Service)

`*H1` → `*Genuine local context` → `*How we work with businesses here` →
`*Services offered locally` → `~Local proof` → `*Full NAP + map` →
`*Local FAQs` → `*CTA`

**Distinct because:** it carries `LocalBusiness` schema and real NAP data. A location
page without a verifiable local presence is not published — see document 03.

---

### PT-14 · Company / Conversion / Listing / Legal / Utility

- **Company (14):** narrative-led, people and evidence forward.
- **Conversion (10):** single-purpose. One form, minimal navigation, no cross-sell,
  explicit "what happens next" and a response-time commitment.
- **Listing (12):** filter, sort, card grid, pagination, empty state.
- **Legal (4) / Utility (3):** plain, readable, no marketing.

---

## 10. Content Model

Content is modelled as **entities with relationships**, not as pages. This is what
lets one verified case study appear on its service page, its industry page, its use
case page, the Work hub and the mega menu without being copied five times.

### Core entities

```
Service ──┬── belongs_to ──> Practice
          ├── solves ───────> UseCase (many)
          ├── serves ───────> Industry (many)
          ├── uses ─────────> Technology (many)
          ├── evidenced_by ─> CaseStudy (many)
          ├── explained_by ─> Resource (many)
          └── converts_to ──> ConversionPath (one)

Industry ─┬── has ──────────> IndustryProblem (many)
          ├── addressed_by ─> Service (many)
          ├── evidenced_by ─> CaseStudy (many)
          └── discussed_in ─> Resource (many)

UseCase ──┬── symptom_of ───> IndustryProblem (many)
          ├── solved_by ────> Service (many)
          └── evidenced_by ─> CaseStudy (many)

CaseStudy ┬── for ──────────> Client
          ├── in ───────────> Industry (one)
          ├── delivered ────> Service (many)
          ├── achieved ─────> Proof (many)
          └── addressed ────> UseCase (many)

Resource ─┬── type ─────────> guide | blog | report | whitepaper | glossary | faq | tool
          ├── in ───────────> Topic (one primary, many secondary)
          ├── supports ─────> Service (many)
          └── written_by ───> Person

Proof ────┬── metric, value, unit, timeframe
          ├── source, verified_on, verified_by
          └── approved_for_publication (boolean)
```

### Reusable content blocks

| Block | Defined once in | Rendered on |
|---|---|---|
| `ServiceSummary` | Service entity | Practice hub, mega menu, related grids, search results |
| `IndustryProblem` | Industry entity | Industry page, crossover pages, matching use cases |
| `ProofPoint` | Proof entity | Case study, service, industry, home — **never retyped** |
| `FAQItem` | FAQ entity, tagged by topic | Service, industry, use case, FAQ hub, guides |
| `ProcessStep` | Process entity per practice | Practice hub, service pages, `/process/` |
| `CTABlock` | Conversion entity, per tier | Every page, selected by tier rule |
| `TeamMember` | Person entity | Leadership, author bylines, case study credits |
| `TechItem` | Technology entity | Technology pages, service "technology used" |

**The single-source rule:** a fact exists in exactly one entity. A metric edited in
the Proof entity updates everywhere it appears. Nothing is copy-pasted between pages
— that is how the current site ended up with two different phone numbers.

### Required metadata on every page

`title` · `meta_description` · `canonical` · `page_type` · `parent_section` ·
`primary_audience[]` · `user_intent` · `primary_topic` · `secondary_topics[]` ·
`primary_cta` · `cta_tier` · `related_pages[]` · `schema_types[]` · `phase` ·
`author` · `date_published` · `date_modified` · `review_due` · `content_owner`

`review_due` and `content_owner` are governance fields: every page has a named owner
and a review date. Without them a 328-page site decays into the current situation
within 18 months.

---

## 11. Case Study Model

The most important content model on the site, and the one most at risk of being
faked. **No case study is published until every required field is filled with
verified data.**

### Structure

| # | Section | Required | Notes |
|---|---|---|---|
| 1 | **Client** | ✱ | Named, or anonymised as "a Pune-based manufacturer of X." Never invented |
| 2 | **Business problem** | ✱ | In the client's words where possible |
| 3 | **Context** | ✱ | Size, market, starting position, constraints |
| 4 | **Objective** | ✱ | What success was defined as *before* work began |
| 5 | **Strategy** | ✱ | The decision made and the alternatives rejected |
| 6 | **Execution** | ✱ | What was actually done, in sequence |
| 7 | **Technology** | ○ | Only where relevant |
| 8 | **Challenges** | ✱ | **Mandatory.** What went wrong or proved harder |
| 9 | **Solution** | ✱ | How the challenges were resolved |
| 10 | **Results** | ✱ | Verified metrics with timeframes |
| 11 | **Metrics table** | ✱ | Before / after / window / source |
| 12 | **What we learned** | ✱ | Honest reflection |
| 13 | **Client quote** | ○ | Attributed and approved in writing |
| 14 | **Related solutions** | ✱ | Links to services, industry, use cases |
| 15 | **CTA** | ✱ | High tier |

**Section 8 is mandatory and non-negotiable.** A case study with no challenges reads
as fiction to any experienced buyer, and it is the fastest way to lose persona P6.

### Metrics table format

| Metric | Before | After | Window | Source |
|---|---|---|---|---|
| *[CONTENT REQUIRED]* | | | | |

Every row must satisfy the four-part proof standard in document 01. A metric without
a source and a window does not go in the table.

### Anonymisation ladder

Where a client will not be named, degrade in this order — never invent to fill a gap:

1. Named client, named people, full metrics *(strongest)*
2. Named client, no individuals, full metrics
3. Sector + size + city, full metrics — *"a 200-person manufacturer in Pune"*
4. Sector only, relative metrics — *"a healthcare provider; enquiry response time
   fell by more than half"*
5. No case study published *(weakest — and correct, if 1–4 are unavailable)*

### Current status

All 14 case study slots are `[CONTENT REQUIRED]`. The 11 `project/*` pages on the
live site are theme demo content and supply nothing. See Risk R1 in document 08.

**Intake process:** for each engagement BizzFly wants published, the client success
owner completes a case study intake form covering fields 1–13, obtains written
publication approval, and records each metric in the Proof entity. Prompt 4 builds
the template; it cannot build the content.

---

## 12. Resource Architecture

### Model

Every resource has: a **type**, one **primary topic**, secondary topics, a **funnel
stage**, an **author**, and links to the services it supports.

| Type | Count | Funnel stage | CTA tier |
|---|---|---|---|
| Guide | 10 | Awareness → Consideration | Low |
| Blog | 21 | Awareness | Low |
| Glossary term | 22 | Awareness | None |
| FAQ page | 6 | Consideration → Decision | Medium |
| Report | 2 | Consideration | Medium (gated) |
| Whitepaper | 2 | Consideration | Medium (gated) |
| Tool | 4 | Consideration | Medium |

### Topic clusters (hub and spoke)

Six clusters. Each hub links to every spoke; every spoke links back to its hub and
laterally to two or three siblings.

```
/insights/topics/ai-search/                    ← cluster hub
├── Guide: AI Search Optimisation Guide        ← pillar
├── Guide: AEO Guide
├── Guide: GEO Guide
├── Service: AI Search Optimisation + 13 children
├── Glossary: AEO · GEO · AIO · AI Overviews · entity · knowledge graph ·
│             schema markup · llms.txt · featured snippet
├── FAQ: AI Search FAQs
├── Comparison: SEO vs AEO vs GEO
├── Use case: Get found in AI search
└── Blog: 5 articles
```

The other five clusters — SEO, AI & Automation, Web Development, Digital Marketing,
Data & Analytics — follow the same shape.

### Gating policy

- Guides, blog posts, glossary and FAQs: **never gated.** They exist to be found and
  cited; a form in front of them defeats the entire AI-visibility strategy.
- Reports and whitepapers: email only, one field, and the content is still crawlable
  as an HTML summary with the PDF behind the form.
- Tools: no gate to run, optional email to save or receive results.

---

## 13. Industry Architecture

### Model

Each industry is composed of, not written as prose:

```
Industry
├── sector_context          — what is actually happening in this sector
├── problems[4]             — IndustryProblem entities, sector-specific
├── service_mapping[]       — problem → service, explicit pairing
├── use_cases[3]            — filtered UseCase entities
├── technology_notes        — platforms, integrations, compliance
├── case_studies[]          — filtered CaseStudy entities
├── faqs[]                  — filtered FAQItem entities tagged to sector
└── crossovers[]            — child pages where the sector changes the service
```

Because problems and mappings are entities, the industry page assembles from
structured data rather than being hand-written prose, and the same
`IndustryProblem` powers the matching use case page.

### Inclusion criteria

An industry is published only if **all four** hold:

1. BizzFly can name a credible capability for the sector's problems.
2. Someone at BizzFly can write four sector-specific problems without research
   guesswork.
3. There is a plausible buyer with budget in that sector.
4. There is either existing proof, or a realistic path to it within 12 months.

Fourteen sectors pass. The excluded list and reasoning are in document 03.

---

## 14. Use Case Architecture

### Model

```
UseCase
├── goal                    — the buyer's words, verb-first
├── symptoms[]              — how the problem shows up day to day
├── root_causes[]           — why it happens
├── approach[]              — how BizzFly addresses it
├── target_state            — what "solved" looks like
├── realistic_timeline      — honest, with the slow parts named
├── services[]              — Service entities involved
├── industries[]            — where this is most common
└── proof[]                 — Proof entities, when available
```

### The problem-first rule

A use case page may not name a BizzFly service **above the "How we solve it"
section**. Everything before that is the buyer's world. This is the structural
enforcement of the brief's "problem first, technology second."

### Relationship to services

Many-to-many, deliberately. *Generate more qualified leads* connects to SEO,
Performance Marketing, CRO, Lead Generation and Sales Automation — which is the
point. The use case is the buyer's frame; the services are ours. Forcing a
one-to-one mapping would just recreate the service list under different names.
