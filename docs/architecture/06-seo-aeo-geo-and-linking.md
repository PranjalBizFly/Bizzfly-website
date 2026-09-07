# 06 — SEO / AEO / GEO Architecture, Internal Linking & Conversion

## 15. Search, Answer & Generative Engine Architecture

### The premise

Traditional SEO optimises for a ranked list of links. AEO optimises for extraction —
being *the* answer. GEO optimises for citation — being *a source* inside a
synthesised response. They share foundations (crawlability, structure, authority) but
diverge in what they reward.

A page architected only for ranking will not be cited. A page architected for
citation ranks anyway, because the same qualities — a clear answer, a defensible
claim, clean structure, an unambiguous entity — serve both. **The architecture below
optimises for citation and treats ranking as the by-product.**

### Search intent classification

Every page carries one intent classification, which determines its structure, its
CTA tier and its schema.

| Intent | Page types | Content shape | CTA tier |
|---|---|---|---|
| Informational | Glossary, Blog, Guide | Answer-first, teaching | Low / none |
| Commercial investigation | Service, Comparison, Technology, Use Case | Evidence, criteria, trade-offs | Medium |
| Transactional | Conversion, Location Service, Pricing | Friction removal | High |
| Navigational | Home, Hubs, Listings, Company | Routing | Mixed |

Mismatched intent is the most common cause of a page that ranks and converts
nothing. A service page written as a blog post gets traffic and no enquiries.

### Per-page-type requirements

Every page type defines the following before a word is written. Implemented as CMS
fields, validated at publish.

| Requirement | Rule |
|---|---|
| **Search intent** | One of the four above |
| **Primary topic** | One entity per page, no exceptions |
| **Secondary topics** | 2–5, semantically related, not synonyms |
| **Title** | Pattern per page type (below), 50–60 chars, unique sitewide |
| **Meta description** | 140–158 chars, describes value, contains the primary topic naturally |
| **H1** | Exactly one, contains the primary topic, matches the page's promise |
| **Heading hierarchy** | H1 → H2 → H3, never skipping a level, headings are questions or statements a user would recognise |
| **Answer block** | First substantive text, ≤60 words, extractable |
| **FAQs** | Minimum per page type; each answer self-contained in ≤50 words before elaboration |
| **Schema** | Per page type (below) |
| **Internal links** | 3+ curated related, 2+ contextual in body, 1 breadcrumb chain |
| **Related entities** | Explicitly named in `sameAs` / `about` / `mentions` |

### Title patterns

| Page type | Pattern |
|---|---|
| Service | `<Service> Services \| BizzFly` |
| Practice hub | `<Practice> \| BizzFly` |
| Industry | `<Sector> Digital & Technology Solutions \| BizzFly` |
| Use case | `<Buyer's goal> \| BizzFly` |
| Case study | `<Outcome> — <Sector> Case Study \| BizzFly` |
| Guide | `<Topic>: A Complete Guide \| BizzFly` |
| Glossary | `What Is <Term>? Definition & Examples \| BizzFly` |
| Comparison | `<A> vs <B>: How to Choose \| BizzFly` |
| Location | `<Service> in <City> \| BizzFly` |

Brand suffix on all. No year tokens, no ALL CAPS, no emoji, no "Best" or "#1."

### Schema strategy

Sitewide, on every page:

- `Organization` — with `@id` anchored at `https://bizzfly.com/#organization`,
  `sameAs` to every verified social and business profile, `address`, `telephone`,
  `email`, `founder`, `logo`
- `WebSite` — with `SearchAction` (already present on the live site — keep)
- `BreadcrumbList` — currently homepage-only; extend to every page
- `WebPage` with `about`, `mentions`, `dateModified`

Per page type:

| Page type | Schema |
|---|---|
| Service | `Service` + `Offer` + `FAQPage` + `BreadcrumbList` |
| Practice hub | `Service` + `ItemList` (children) + `FAQPage` |
| Industry | `Service` (audience-scoped) + `FAQPage` |
| Use case | `WebPage` + `FAQPage` + `HowTo` where genuinely stepwise |
| Case study | `Article` + `Review`/`ClaimReview` where metrics are attested |
| Guide | `Article` + `HowTo` (where applicable) + `FAQPage` + `TableOfContents` |
| Blog | `BlogPosting` + `Person` (author) |
| Glossary | **`DefinedTerm`** + `DefinedTermSet` + `FAQPage` |
| Comparison | `Article` + `FAQPage` + `ItemList` |
| Location | **`LocalBusiness`** + `PostalAddress` + `GeoCoordinates` + `OpeningHours` |
| Careers | `JobPosting` |
| Contact | `ContactPage` + `ContactPoint` |
| Listing | `CollectionPage` + `ItemList` |

**Entity anchoring.** Every schema block references the central `Organization`
`@id`. This is the single highest-leverage technical action for AI visibility: it
converts 328 disconnected pages into one machine-readable entity graph with BizzFly
at the centre. Without it, an AI system reading a BizzFly page cannot reliably
connect it to the BizzFly entity, and citation goes to a competitor whose graph is
coherent.

### AEO requirements

Answer engines extract. Extraction rewards structure.

1. **Answer first.** The first substantive text after the H1 answers the page's
   implicit question in 40–60 words, in complete sentences that stand alone out of
   context. No pronoun references to the heading.
2. **Headings as questions.** Where a section answers a real query, the H2 is that
   query.
3. **Self-contained FAQ answers.** Each answer makes sense pasted into a chat window
   with no surrounding page.
4. **Definitions before elaboration.** Glossary and concept sections lead with the
   definition.
5. **Tables for comparable data.** Extractable; prose comparisons are not.
6. **No answer below 1,000px.** A hero that pushes the answer off the first screen
   also pushes it out of the extraction window on many pages.
7. **One claim per paragraph.** Multi-claim paragraphs are extracted incorrectly or
   not at all.

### GEO requirements

Generative engines cite sources they can attribute, verify and reuse.

1. **Attributable claims.** Specific, checkable statements with sources. Vague
   claims are unusable as citations.
2. **Original data.** The two `[CONTENT REQUIRED]` reports exist for this reason —
   original research is the single most citable asset type.
3. **Author identity.** Real named authors with credentials and `Person` schema,
   linked to the organisation. Anonymous content is discounted.
4. **Freshness signals.** Visible `dateModified`, honestly maintained.
5. **Entity clarity.** Consistent naming across the site and every external profile
   — one spelling, one address, one phone number. *(The live site currently fails
   this; see document 07.)*
6. **Consistent off-site presence.** Business profiles, directories and social
   accounts must agree with the site. Contradiction across sources reduces
   confidence and therefore citation.
7. **Crawlability for AI agents.** The current `robots.txt` explicitly allows
   GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot and others. **This
   is already correct and must be carried over unchanged.**
8. **`llms.txt`.** Publish at the root — a structured index of what BizzFly is, what
   it does, and which pages authoritatively answer which questions. Emerging
   convention, low cost, no downside.
9. **Server-rendered HTML.** Most AI crawlers execute little or no JavaScript.
   Content that requires JS to render is invisible to them. This constraint drives
   the technical stack decision in document 08.

### Local search architecture

- `LocalBusiness` schema on `/locations/pune/` and its four service pages
- NAP identical everywhere: site, footer, schema, Google Business Profile,
  directories. **One phone number, one address, one email.**
- Genuine local content — not the national page with the city name swapped in
- Google Business Profile as an owned, optimised property (already a listed service)

### Measurement

| Layer | Tracked |
|---|---|
| Traditional | Rankings, impressions, CTR, organic sessions, assisted conversions |
| Answer | Featured snippet and AI Overview presence for target queries |
| Generative | Brand citation frequency in ChatGPT, Perplexity, Gemini for a fixed prompt set |
| Entity | Knowledge panel presence, `sameAs` coverage, NAP consistency score |
| Commercial | Enquiries by source, by CTA tier, by page |

The generative layer needs a **fixed, versioned prompt set** — the same 50 buyer
questions run monthly, results logged. Without a fixed set the measurement is noise.
BizzFly should run this on itself first; it is also the methodology behind the
AI Visibility Assessment service.

### Sitemap strategy

Split XML sitemaps by type, referenced from a sitemap index:
`sitemap-pages.xml` · `sitemap-services.xml` · `sitemap-industries.xml` ·
`sitemap-use-cases.xml` · `sitemap-work.xml` · `sitemap-insights.xml` ·
`sitemap-locations.xml` · `sitemap-images.xml`

Accurate `lastmod` reflecting genuine content change — not a build timestamp, which
teaches crawlers to ignore the field. Only canonical, indexable, 200-status URLs.
Plus the HTML sitemap at `/sitemap/` for users.

### Indexation rules

| Indexed | Not indexed |
|---|---|
| All 328 canonical pages | Faceted and filtered views |
| Paginated listing pages 2+ | Internal search results (`/search/?q=`) |
| | Thank-you and confirmation pages |
| | Gated PDF files |
| | Staging and preview environments |
| | `/404/` |

---

## 16. Internal Linking Strategy

### Link types

Five distinct mechanisms, each with a different job:

| Type | Purpose | Placement |
|---|---|---|
| **Structural** | Hierarchy and crawl paths | Nav, breadcrumbs, footer, hub listings |
| **Contextual** | Semantic relationship | In body prose, descriptive anchor |
| **Curated related** | Guided next step | End-of-content module, 3 links |
| **Cluster** | Topical authority | Topic hub ↔ spokes, spoke ↔ sibling |
| **Conversion** | Route to action | CTA blocks, intent-matched |

### Rules

1. **Every page receives at least four inbound internal links**, from at least two
   different mechanisms. Structural links alone are not sufficient — a page reachable
   only from a listing is functionally orphaned.
2. **Every page emits at least three contextual outbound links.**
3. **Descriptive anchors.** "Technical SEO audit," never "click here" or "learn more"
   as the sole anchor text.
4. **No exact-match anchor repetition.** Vary anchors naturally across the site;
   identical anchor text repeated 40 times is a pattern, not a signal.
5. **Never link to a redirect.** Internal links point at final destinations.
6. **Bidirectional where the relationship is real.** If SEO links to Technical SEO,
   Technical SEO links back to SEO.
7. **Depth ceiling: 3 clicks** from the homepage to any page. Verified by crawl
   before launch.

### Hub-and-spoke pattern

```
                     ┌───────────────────────┐
                     │   /insights/topics/   │
                     │      ai-search/       │  ← topical authority hub
                     └───────────┬───────────┘
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
┌───────────────┐      ┌──────────────────┐      ┌────────────────┐
│  PILLAR GUIDE │◄────►│  SERVICE CLUSTER │◄────►│  GLOSSARY (9)  │
│ AI Search Opt │      │ AI Search + 13   │      │ AEO GEO AIO …  │
└───────┬───────┘      └────────┬─────────┘      └───────┬────────┘
        │                       │                        │
        └───────────┬───────────┴────────────┬───────────┘
                    ▼                        ▼
          ┌──────────────────┐    ┌────────────────────┐
          │  BLOG (5 posts)  │    │ USE CASE + COMPARE │
          └──────────────────┘    └────────────────────┘
                    │                        │
                    └────────────┬───────────┘
                                 ▼
                    ┌────────────────────────────┐
                    │ /ai-visibility-assessment/ │  ← conversion
                    └────────────────────────────┘
```

Six clusters run this pattern. Every path through a cluster ends at the same
conversion page, so authority concentrates and the user always has a next step.

### Cross-axis linking matrix

The mechanism that ties the three discovery axes together:

| From ↓ To → | Service | Industry | Use Case | Case Study | Resource | Conversion |
|---|---|---|---|---|---|---|
| **Service** | siblings + parent | 2–3 relevant | 2–3 solved | all delivering it | 2–3 explaining | 1 tier-matched |
| **Industry** | 4–6 mapped | siblings | 3 sector-common | all in sector | 2 sector insights | 1 high tier |
| **Use Case** | 3–5 involved | 2–3 most common | 2–3 related | all addressing | 1–2 | 1 medium tier |
| **Case Study** | all delivered | its sector | all addressed | 2 similar | — | 1 high tier |
| **Resource** | 2–3 supported | where relevant | where relevant | where relevant | cluster siblings | 1 low tier |
| **Conversion** | — | — | — | — | — | — |

Conversion pages emit no outbound links except the legal footer. Every link on a
conversion page is a way to not convert.

### Orphan prevention

Automated, in CI:

1. Crawl the built site.
2. Assert every URL in `sitemap.csv` is reachable from `/` in ≤3 clicks.
3. Assert every URL has ≥4 inbound internal links.
4. Assert zero internal links resolve to a 3xx or 4xx.
5. **Fail the build** on any violation.

This is what prevents the 328-page site from decaying the way the current 15-page
one did.

---

## 17. CTA & Conversion Architecture

### Six tiers

Tier is a property of the *page*, derived from its search intent — never a designer's
choice per layout.

| Tier | Intent | CTA label | Destination | Commitment |
|---|---|---|---|---|
| **T0 — Passive** | Informational | Subscribe · Read the guide | Newsletter, guide | None |
| **T1 — Low** | Informational | Explore the service · Read more | Related page | None |
| **T2 — Medium-low** | Early commercial | View our work · See how we work | Work, Process | None |
| **T3 — Medium** | Commercial | Get a free SEO audit · Request an AI visibility assessment · Request an automation assessment | Diagnostic pages | Email + URL |
| **T4 — High** | Transactional | Book a consultation · Talk to a strategist · Technical discovery call | Booking pages | 30 minutes |
| **T5 — Highest** | Ready to buy | Request a proposal | `/get-a-proposal/` | Full brief |

### Tier assignment by page type

| Page type | Primary | Secondary |
|---|---|---|
| Home | T4 | T2 |
| Practice hub | T3 | T2 |
| Service | T3 | T4 |
| Industry | T4 | T3 |
| Use case | T3 | T4 |
| Case study | T4 | T2 |
| Technology | T4 (technical discovery) | T1 |
| Guide | T0 | T1 |
| Blog | T0 | T1 |
| Glossary | **none** | T1 |
| Comparison | T3 | T4 |
| Location | T4 | T3 |
| Pricing / Engagement | T5 | T4 |
| Careers | Apply | — |

### Rules

1. **Never exceed the tier by more than one.** A glossary page offering "Start a
   project" is noise. Escalating one step (T0 → T1) is natural; three steps is a
   sales pitch to someone who asked what a word means.
2. **Maximum two CTAs per page** — one primary, one secondary. More is fewer.
3. **"Contact Us" is not a CTA.** It names a page, not an action or a benefit. It
   appears in the footer and nowhere else.
4. **Every high-tier CTA states what happens next.** "Book a 30-minute call. We'll
   review your current visibility and tell you where the gaps are. No deck."
5. **Every form states a response commitment.** "We reply within one business day."
   Then that commitment is actually met — an unmet promise on a contact form is worse
   than no promise.
6. **Diagnostics beat demos for T3.** Personas P1, P3 and P7 convert on artefacts,
   not conversations. The three assessment pages exist because of this.

### Conversion paths

| Path | Route | For |
|---|---|---|
| **Diagnostic-led** | Content → T3 assessment → report → consultation | P1, P3 — evidence-first buyers |
| **Direct** | Service → proof → T4 consultation | P2, P6 — decided buyers |
| **Technical** | Technology → standards → T4 discovery call | P4 |
| **Procurement** | Engagement models → pricing → T5 proposal | P7 |
| **Nurture** | Guide → T0 subscribe → sequence → T3 | P5 — champions |
| **Local** | Location page → T4 consultation | P2, walk-in trust |

### Form design

- **Progressive.** Diagnostic forms ask for email plus URL. That is enough to
  deliver value and to start a conversation.
- The current contact form asks for Name, Email, Phone, Service, City, State,
  Message — seven fields. **City and State are removed** (derivable, and friction);
  Phone becomes optional. Service stays: it routes the enquiry.
- Every form: inline validation, visible required markers, accessible labels,
  keyboard operable, one clear submit, and a real confirmation page (not an alert)
  that sets expectations and offers a relevant next read.
- Spam handled by honeypot plus rate limiting, not by a CAPTCHA that costs
  conversions.

### Conversion measurement

Track by **CTA tier and source page**, not just total form fills. The question worth
answering is "which content produces enquiries that become clients," and that
requires the source page and tier on the enquiry record, passed into the CRM at
submit. Without it, the 328-page investment cannot be evaluated and the next
redesign will start from opinion again.
