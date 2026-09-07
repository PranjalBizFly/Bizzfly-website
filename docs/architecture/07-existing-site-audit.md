# 07 — Existing Website Audit

**Audited:** 7 September 2026 · `https://bizzfly.com`
**Method:** full sitemap enumeration, page fetches, HTTP header and status inspection,
schema/meta/heading extraction from raw HTML.

**Note on the repository:** `C:\Projects\Bizzfly-website` is an empty git repository —
no commits, no files, remote `PranjalBizFly/Bizzfly-website`. There is no local
codebase to audit or migrate. The live WordPress site is the only source of truth,
and the redesign is a greenfield build plus a content and URL migration.

---

## 18. Existing Website Audit

### Platform

| Property | Finding |
|---|---|
| CMS | WordPress |
| Theme | `digitak` + `digitak-child` (purchased commercial agency theme) |
| SEO plugin | Rank Math |
| Server | LiteSpeed, LiteSpeed Cache active (`X-LiteSpeed-Cache: hit`) |
| Protocol | HTTPS, HTTP/3 available |
| Homepage HTML weight | 296 KB |
| Script tags on homepage | 44 |
| Script tags on service pages | 37–38 |

### URL inventory — 63 indexed URLs

| Sitemap | URLs | Assessment |
|---|---|---|
| `page-sitemap.xml` | 15 | The real site |
| `service-sitemap.xml` | 30 | 6 duplicates of the service pages + **24 thin fragments** |
| `post-sitemap.xml` | 7 | 6 generic articles, 1 default `hello-world`, 1 unslugged `?page_id=28` |
| `project-sitemap.xml` | 11 | **All theme demo content** |
| `category-sitemap.xml` | — | Taxonomy archives |

### Critical findings

#### F1 · Eleven fabricated case studies are live and indexed

All 11 `/project/*` URLs are theme demo content. `/project/smart-digital-growth/`
states **"Client: Logistic Company · Location: New York, USA"** with a March 2026
date, placeholder imagery, and no metrics.

Slugs: `dynamic-data-ecosystem`, `intelligent-conversion-hub`, `next-gen-ecosystem`,
`cloud-marketing-infrastructure`, `fast-conversion-optimization`,
`intelligent-conversion-model`, `agile-digital-expansion`, `scalable-business-growth`,
`ai-driven-marketing`, `data-powered-growth`, `smart-digital-growth`.

**Severity: critical.** These are the pages a serious prospect checks first. A Pune
agency presenting a fictional New York logistics client destroys trust in everything
else on the site. Also a direct violation of the brief's "do not fabricate client
results." **Recommend removal from the live site now, ahead of the redesign** — they
are actively costing enquiries today.

#### F2 · Twenty-four thin fragment pages are indexed as services

Benefit blurbs from the theme's homepage sections were saved as `service` custom
post types and are indexed as standalone URLs:

`higher-visibility` · `qualified-traffic` · `better-conversions` ·
`stronger-authority` · `stronger-presence` · `better-engagement` ·
`higher-conversions` · `scalable-foundation` · `operational-efficiency` ·
`better-control` · `improved-scalability` · `enhanced-productivity` ·
`time-savings` · `reduced-errors` · `faster-operations` · `greater-efficiency` ·
`smarter-decisions` · `improved-efficiency` · `enhanced-visibility` ·
`competitive-advantage` · `sustainable-growth` · `better-performance` ·
`increased-conversions` · `strategic-direction`

`/service/higher-visibility/` contains one sentence of unique content, padded with
five repeated slogans. **Severity: high** — thin content at this ratio (24 of 63
indexed URLs, 38%) is a sitewide quality signal, not an isolated problem.

#### F3 · Conflicting contact details across the site

| Source | Phone | Email |
|---|---|---|
| Homepage, service pages, footer | +91 91 9815 9815 | sales@bizzfly.com |
| `/contact-us/` | +91 91 9815 9815 | **info@** and sales@bizzfly.com |
| `/service/higher-visibility/` (and likely the other 23) | **+91 7098989191** | **rahul@bizzfly.com** |

Two different phone numbers and three different email addresses are published on the
same domain. **Severity: high.** NAP consistency is foundational to local search and
to entity confidence in AI systems — the exact capability BizzFly sells. Fix before
anything else.

#### F4 · Service pages have no H1

Verified in raw HTML: `/services/seo/` and `/about-us/` contain **zero `<h1>`
elements**. The homepage has exactly one. The theme renders page titles as styled
divs. **Severity: high**, and trivially fixable — the pages have well-written
headings that simply are not marked up as headings.

#### F5 · Two parallel URL structures for the same six services

| Page tree | CPT tree |
|---|---|
| `/services/seo/` | `/service/search-optimization/` |
| `/services/website-design-development/` | `/service/website-design-development/` |
| `/services/custom-software-development/` | `/service/custom-software-development/` |
| `/services/business-automation/` | `/service/business-automation/` |
| `/services/ai-powered-solutions/` | `/service/ai-powered-solutions/` |
| `/services/digital-growth-solutions/` | `/service/digital-growth-solutions/` |

Both sets are in the sitemap. **Severity: medium-high** — near-duplicate content,
split signals, and Google choosing the canonical rather than BizzFly choosing it.

#### F6 · Footer links point at redirects

Footer service links target `/seo/`, `/website-design-development/`,
`/custom-software-development/`, `/business-automation/`, `/ai-powered-solutions/` —
all 301 to `/services/...`. The Privacy Policy link targets
`/blog-2/privacy-policy-2`, which 301s to `/privacy-policy-2/`. **Severity: low-medium.**
The redirects work; the links should simply point at destinations.

#### F7 · Unverified quantitative claims

| Claim | Location | Status |
|---|---|---|
| "4.9/5 based on 1,500+ reviews" | Homepage | **`[VERIFY WITH BIZZFLY]`** — no visible source, platform, or link |
| "10+ years" of experience | Homepage | `[VERIFY WITH BIZZFLY]` |
| "0 +" years of experience | `/about-us/` | **Broken counter** — and contradicts the homepage |

A review score with no linked source is unusable under the proof standard in
document 01, and a visible "0 + years of experience" on the About page is a live
credibility defect.

#### F8 · Blog is off-strategy and contains a default post

Six of seven posts are generic agency filler — WordPress theme features, "9 Essential
WordPress Features Every Digital Marketing Agency Needs," "Beyond Aesthetics: Why
Speed and Core Web Vitals Are Non-Negotiable for Agency Themes." They read as content
written for agencies, not by BizzFly for BizzFly's buyers. `hello-world` — the
WordPress default post — is still live and indexed. **Severity: medium.**

Of the six, only *"SEO-Ready Architecture"* and *"Beyond Aesthetics: Speed and Core
Web Vitals"* touch topics BizzFly actually sells.

#### F9 · Weak slugs and duplicate-artefact URLs

`/privacy-policy-2/` (the `-2` indicates a duplicate was created and the original
never cleaned up) · `/faqs-page/` · `/about-us/` · `/contact-us/` ·
`?page_id=28` in the post sitemap.

#### F10 · Page weight and script count

296 KB of HTML and 44 script tags on the homepage. Typical of a commercial WordPress
theme carrying a page builder plus a slider plus animation libraries. **Severity:
medium** — a direct Core Web Vitals and crawl-efficiency cost on a site whose own
service pages sell Core Web Vitals optimisation.

### What is already right — preserve these

#### ✅ `robots.txt` is genuinely well-configured

Explicitly allows GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-SearchBot,
PerplexityBot, Google-Extended, Googlebot, Bingbot, Applebot, Amazonbot, Bytespider,
CCBot and DuckAssistBot; sensibly disallows `wp-admin`, cache and upgrade
directories, internal search, tracking parameters, author and tag archives; declares
the sitemap.

**This is better than most agency sites and is exactly aligned with the AI-visibility
positioning. Port it to the new stack essentially unchanged**, adding `llms.txt`
alongside.

#### ✅ Homepage schema baseline

`Organization`, `WebSite`, `SearchAction`, `ContactPoint`, `BreadcrumbList`,
`FAQPage`, `Question`/`Answer`, `ImageObject`, `WebPage`, `ListItem` — a solid
foundation. The gap is that service and about pages carry only the sitewide subset
(no `Service`, no `FAQPage`, no `BreadcrumbList`).

#### ✅ Meta titles and descriptions are written and decent

Not defaults. Examples worth keeping as a base:

- Home — *"BizzFly delivers business technology solutions, digital growth,
  automation, software, websites and AI services that help businesses scale faster."*
- SEO — *"Improve rankings, traffic and leads with BizzFly SEO services. We deliver
  technical SEO, content optimization and long-term organic growth."*
- About — *"Learn about BizzFly, a business technology company delivering AI,
  software development, websites, automation and digital growth solutions."*

#### ✅ Canonicals are correct and self-referencing on every page checked.

---

## 19. Content That Can Be Reused

### Reuse verbatim (verified business facts)

| Content | Source | Use |
|---|---|---|
| Company name, brand mark | Sitewide | — |
| **Office address:** 2nd Floor, Shri Nivas Towers, Above Baramati Bank, Pune 411043 | `/contact-us/` | `/locations/pune/`, footer, `LocalBusiness` schema |
| **Phone:** +91 91 9815 9815 | Sitewide (majority) | Canonical NAP — retire the second number |
| **Email:** sales@bizzfly.com | Sitewide | Canonical. Decide on info@ — see section 21 |
| **Founder:** Rahul Jadhav | `/about-us/` | `/about/leadership/`, `Organization.founder` schema |
| Positioning line: *"Empowering brands with technology-led growth strategies"* | `/about-us/` | `/about/`, refined |
| Core values: **Be Discoverable · Be Scalable · Be Future-Ready** | `/about-us/` | `/about/`, `/about/culture/` — genuinely good and unusually specific for an agency |
| *"Making Businesses Discoverable in a Digital-First World"* | `/about-us/` H1 | Strong. Anchors the whole positioning |
| Pune market positioning | Homepage H1 | `/locations/pune/` and the four Pune service pages |
| Service dropdown taxonomy | `/contact-us/` form | Enquiry routing in new forms |
| `robots.txt` AI-crawler configuration | `/robots.txt` | Port unchanged |
| Homepage schema block | Homepage | Extend rather than rebuild |
| Meta descriptions (15 pages) | Rank Math | Starting point, refined per new title patterns |

### Reuse with expansion (good skeleton, insufficient depth)

| Content | Where | Action |
|---|---|---|
| Six service definitions and capability lists | `/services/` | Sound taxonomy. Expand each from ~40 words to full service pages |
| AEO / GEO / AIO / SXO one-line definitions | `/services/seo/` | Correct and clear. Expand each into its own page (PT-03) |
| Three-step method: *Search Strategy Framework → Content Optimization System → Performance Tracking Model* | `/services/seo/` | Real structure. Expand into `/process/` with actual detail |
| Four benefit themes: Higher Visibility · Qualified Traffic · Better Conversions · Stronger Authority | `/services/seo/` | Keep as **sections**, not as the 24 standalone URLs |
| Framework names: *Omni-Visibility Framework*, *Integrated Growth Engine* | Homepage | Distinctive and ownable. Currently unexplained — define them properly or drop them |
| Homepage FAQ block | Homepage | Migrate into `/insights/faqs/` and per-page FAQ entities |
| Careers page structure | `/careers/` | Rebuild with real roles |
| Two on-topic blog posts | `/blog/` | Rewrite and expand into the new clusters |

---

## 20. Content That Must Be Rewritten or Removed

### Remove entirely

| Content | Count | Reason |
|---|---|---|
| `/project/*` demo case studies | 11 | Fabricated. F1 |
| `/service/*` benefit fragments | 24 | Thin. F2 |
| `hello-world` post | 1 | WordPress default |
| `?page_id=28` | 1 | Unslugged artefact |
| Duplicate `/service/` tree for the 6 real services | 6 | Duplicate of `/services/`. F5 |
| "0 + years of experience" counter | 1 | Broken and contradictory. F7 |
| Second phone number and rahul@ email in theme fragments | — | NAP conflict. F3 |

**43 of 63 indexed URLs are removed.** That is not a loss — it is removing the 68% of
the current index that is thin, duplicated, or fabricated.

### Rewrite completely

| Content | Reason |
|---|---|
| All six service pages | ~350 words each, no H1, no proof, no FAQs, no depth. Become 6 practice hubs + 99 service pages |
| Homepage | Sells one path; must route three. Unverified claims must go or be sourced |
| `/about-us/` | Founder paragraph is generic ("a growth-focused entrepreneur with a strong understanding of digital ecosystems"). Needs a real story, real dates, real people |
| Four testimonials | Named individuals with generic company descriptors ("Real Estate Firm – Mumbai"). **`[VERIFY WITH BIZZFLY]`** — confirm these are real and get written consent, or remove |
| Four blog posts about agency themes and WordPress features | Off-strategy — written for agencies, not for BizzFly's buyers |
| `/faqs-page/` | Poor slug, shallow. Becomes the FAQ hub + 6 topic FAQ pages |
| `/contact-us/` | Seven-field form, no map, no response commitment, no routing |
| Privacy Policy and Terms | Verify these are bespoke and not theme boilerplate. **`[VERIFY WITH BIZZFLY]`** |

### Rewrite framing, keep the idea

- "Your Ideal Digital Marketing Partner for Business Growth" → too generic; keep the
  intent, use specific language
- "Client feedback that truly matters" / "Real testimonials" → drop the qualifiers;
  labelling testimonials "real" invites the opposite reading
- Numbered section labels ("01/ Story of Bizzfly") → a theme convention, not a brand
  asset

---

## 21. Missing Content & Verification Requirements

### `[CONTENT REQUIRED]` — 25 pages blocked on BizzFly input

| Content | Pages | Blocks |
|---|---|---|
| **Verified case studies** | 14 | Journeys J1, J4, J7; personas P2, P6, P7. **The single largest blocker** |
| Pricing and engagement model detail | 1 | Journey J8, persona P7 |
| Open roles | 2 | Journey J9 |
| Partners and alliances | 1 | Persona P7 credibility |
| Certifications | 1 | Persona P7, P8 |
| Awards and recognition | 1 | Optional — omit the page if there are none |
| Original research reports | 2 | GEO citation strategy |
| Whitepapers | 2 | Persona P4 |
| Webinars and events | 1 | Optional |

### `[VERIFY WITH BIZZFLY]` — questions that must be answered before build

**Business facts**
1. Founding year, and what "10+ years of experience" refers to — the company, or the
   founder's career?
2. Current team size and composition (engineers, marketers, designers)?
3. Legal entity name and registration for contracts and `Organization` schema?
4. Is `info@bizzfly.com` monitored, or is `sales@` the only address? One canonical
   address is needed.
5. Confirm `+91 91 9815 9815` is the only public number. Retire `+91 7098989191`?

**Proof and claims**
6. **What is the source of "4.9/5 based on 1,500+ reviews"?** Which platform, which
   URL? If it cannot be sourced and linked, it is removed.
7. Are the four homepage testimonials (Nakul Kumar Yadav, Sneha Iyer, Arvind
   Wadgaonkar, Shamali Patel) real clients, and is there written consent to publish
   name, role and company descriptor?
8. Which clients can be named in case studies? Which will allow anonymised sector
   attribution?
9. Are there any certifications, platform partnerships (Google Partner, Meta,
   Shopify, AWS…) currently held?

**Commercial**
10. Minimum engagement size and typical project ranges — needed for
    `/engagement-models/pricing/`. A range with context beats "contact us."
11. Which engagement models are actually offered — retainer, project, dedicated team,
    advisory?
12. Standard contract terms: notice period, IP ownership, payment schedule?

**Presence**
13. Is there a genuine presence — office, staff, or client base — in Mumbai,
    Bengaluru, or Delhi NCR? The testimonials reference all three cities. If it is
    only remote client work, the location pages are not built.
14. Which markets outside India, if any? Determines `hreflang` strategy.

**Operational**
15. Who owns content publishing after launch, and who is the named reviewer for the
    `content_owner` and `review_due` governance fields?
16. Where do enquiries currently go? Is there a CRM to integrate with?
17. Are the Privacy Policy and Terms bespoke, or theme boilerplate needing legal
    review?

**Decision needed:** whether to remove the 11 fabricated `/project/*` pages and the
24 thin `/service/*` fragments from the live site **immediately**, ahead of the
redesign, rather than waiting for launch. Recommended — they are causing damage now.

---

## Redirect map

Full machine-readable map in [`redirects.csv`](redirects.csv). Summary:

| Legacy pattern | Destination | Count |
|---|---|---|
| `/services/seo/` | `/services/search-ai-visibility/seo/` | 1 |
| `/services/website-design-development/` | `/services/web-development/` | 1 |
| `/services/custom-software-development/` | `/services/software-development/` | 1 |
| `/services/business-automation/` | `/services/ai-automation/` | 1 |
| `/services/ai-powered-solutions/` | `/services/ai-automation/` | 1 |
| `/services/digital-growth-solutions/` | `/services/digital-marketing/` | 1 |
| `/service/search-optimization/` | `/services/search-ai-visibility/` | 1 |
| `/service/<5 real services>/` | matching new practice | 5 |
| `/service/<24 fragments>/` | nearest real service page | 24 |
| `/project/<11 demo>/` | `/work/` | 11 |
| `/about-us/`, `/contact-us/`, `/careers/`, `/blog/` | `/about/`, `/contact/`, `/careers/`, `/insights/blog/` | 4 |
| `/faqs-page/` | `/insights/faqs/` | 1 |
| `/privacy-policy-2/`, `/terms-and-conditions/` | `/privacy-policy/`, `/terms/` | 2 |
| `hello-world`, `?page_id=28` | **410 Gone** | 2 |
| 6 blog posts | new slugs, or `/insights/blog/` | 6 |

**Rules:** single hop, no chains, no blanket redirect to `/`. The 24 fragments
redirect to the *nearest genuinely relevant service page*, not to the homepage —
`higher-visibility` → `/services/search-ai-visibility/seo/`, `reduced-errors` →
`/services/ai-automation/workflow-automation/`, and so on. Two artefact URLs return
**410 Gone** rather than a redirect, because there is no equivalent and 410 removes
them from the index faster.
