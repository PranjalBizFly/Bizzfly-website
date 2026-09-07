# 04 — Hero System & Section Pattern Library

---

## L. Hero System

Nine hero patterns. **Selection is determined by page intent**, not by preference —
the mapping table below is the rule.

Every hero obeys principle P6: **the answer is visible above 1,000px on a 1366×768
laptop.** Heroes are sized to permit extraction, not to fill a viewport. No hero is
`100vh`.

### H-A · Editorial Statement

**Structure:** eyebrow → large statement (`display-lg`) → supporting paragraph
(`body-lg`, `--container-text`) → two CTAs → hairline rule.
Left-aligned on an 8-of-12 span, offset 1. No image.

**Height:** ~420px desktop, ~340px mobile.
**Use:** practice hubs, About, company pages, Insights hub.
**Why it works:** typography alone carries the weight — the clearest expression of
principle P1.

---

### H-B · Split Contextual

**Structure:** 6/6 asymmetric split — content left (7 cols), visual right (5 cols,
full-bleed to the right edge). Content: eyebrow, `h1`, lead, CTA pair. Visual: a
16:10 image or diagram, cropped, never a stock photo.

**Height:** ~520px desktop; on mobile the visual moves **below** the CTA, at 3:2.
**Use:** industry pages, service pages with a genuine visual, location pages.

---

### H-C · Full-Width Declaration

**Structure:** `display-xl` statement spanning 10 of 12 columns, `--section-lg` above
and below, a single text CTA. Nothing else. Optionally on `--surface-inverse`.

**Use:** homepage, the AI-search narrative opener, `/about/why-bizzfly/`.
**Rule:** at most **one per page**, and no more than four across the whole site.
Overused, this becomes the "big words, no substance" pattern.

---

### H-D · Evidence-Led

**Structure:** `h1` + lead on 7 cols; a horizontal rail of 2–4 **verified** metrics
beneath, each `metric` size with a mono `metric-label` and a **source line**.

**Hard constraint:** renders only when real `Proof` entities exist. With zero
verified metrics the component **falls back to H-A** — it never renders empty slots or
invented figures (principle P8).
**Use:** case studies, `/work/results/`, industry pages once proof exists.

---

### H-E · Problem-Led

**Structure:** the user's problem as the `h1`, phrased as they would say it. Beneath:
a "does this sound familiar?" list of 3–4 symptoms as a mono-indexed list. Then a
single line of reassurance and one CTA.

**Use:** all 25 use case pages, industry crossover pages.
**Why:** the visitor arrives with a problem, not a category. Recognition before
solution — the diagnostic shape from architecture doc 05 (PT-06).

---

### H-F · Technical Brief

**Structure:** `h1` + a definition paragraph on 6 cols; a mono specification block on
5 cols showing concrete facts — stack, standards, constraints, "when we don't use
this". Background `--surface`.

**Use:** the 13 technology pages, engineering standards, AI governance.
**Why:** persona P4 reads this first and leaves in 30 seconds if it reads like a logo
wall.

---

### H-G · Case Study Opener

**Structure:** full-bleed `--surface-inverse` band. Mono meta row (sector · services ·
year) → outcome-first `h1` → client identification at `body-lg` → single verified
headline metric, brand green on the dark band, right-aligned on 4 cols. Breadcrumb sits inside the dark band.

**Use:** the 14 case study pages only.
**Why:** the only page type where BizzFly is not the subject; the dark band signals a
change of voice.

---

### H-H · Industry Context

**Structure:** eyebrow (sector name, mono) → `h1` framing the sector's situation →
lead → a horizontal rail of the four sector problems as text links that anchor down
the page. No image above the fold; the sector's vocabulary does the work.

**Use:** the 14 industry pages.
**Why:** the first screen must prove sector fluency (architecture doc 05, PT-04).

---

### H-I · Conversion Focus

**Structure:** `--container-narrow`. `h1` + one paragraph + the form immediately —
form starts above 700px. Left rail carries three short trust lines (what happens
next, response time, no obligation). **No navigation cross-sell.**

**Use:** the 10 conversion pages.
**Why:** every link on a conversion page is a way not to convert.

---

### H-J · Index / Listing

**Structure:** compact. `h1` + one line + filter row + result count in mono.
~220px tall — a listing page's job is the list.

**Use:** blog, guides, glossary, work listings, careers, search results.

---

### Hero → page type mapping

| Page type | Hero | Fallback |
|---|---|---|
| Home | H-C | — |
| Practice hub (6) | H-A | — |
| Service (99) | H-B with visual, else H-A | H-A |
| Industry (14) | H-H | — |
| Industry crossover (12) | H-E | — |
| Use case (25) | H-E | — |
| Case study (14) | H-G | — |
| Technology (13) | H-F | — |
| Guide (10) | H-A | — |
| Blog (21) | H-A compact | — |
| Glossary (22) | **no hero** — definition first | — |
| Comparison (8) | H-A with the short answer inline | — |
| Location (8) | H-B | H-A |
| Company (14) | H-A | — |
| Conversion (10) | H-I | — |
| Listing (12) | H-J | — |

**Glossary pages have no hero at all.** The definition is the first element after the
`h1`. This is the strictest application of principle P6 and it is deliberate — these
pages exist to be extracted and cited.

---

## M. Section Pattern Library

Twenty-two compositions. The rule that prevents templating:

> **No page may use the same section pattern twice in a row, and no page may use more
> than two card-based patterns in total (principle P4).**

Patterns are grouped by the job they do.

### Explaining a set of things

**S-01 · Numbered Editorial List** — full-width rows, mono index, `h3` name, one-line
definition, inline link rail. Hairline separated. *The default for capabilities,
practices, services.* This replaces the card grid in almost every case.

**S-02 · Definition Rail** — two columns: sticky term list left (4 cols), scrolling
definitions right (7 cols). *For AEO/GEO/AIO distinctions, engagement models.*

**S-03 · Feature Matrix** — real table, sticky header, tabular numerals, row hover.
*For comparisons, platform choices, service inclusions.* Horizontally scrollable in
its own container so the page never scrolls sideways.

**S-04 · Accordion Set** — FAQs and progressive detail. First item open on FAQ pages
(so the answer is in the DOM for extraction); all closed elsewhere. Native
`<details>` where possible.

**S-05 · Card Grid** — *restricted.* Only for parallel, independently navigable items
of equal weight: case study listings, guide listings, open roles. 3-up desktop, 2-up
tablet, 1-up mobile. `--radius-md`, 1px border, **no shadow**, hover extends the rule
and advances the arrow.

---

### Explaining a sequence

**S-06 · Process Timeline** — horizontal on desktop (numbered nodes on a rule),
vertical on mobile. Each step: mono index, `h4`, two lines, duration. *For `/process/`,
service methods, migration plans.*

**S-07 · Stepped Narrative** — alternating 5/7 and 7/5 rows, one step per row, mono
index in the narrow column. *For case study execution, transformation stories.*

**S-08 · Before / After** — two-column comparison with a shared row structure so the
change is legible line by line. *For redesigns, automation outcomes.* Never a
draggable image slider.

---

### Making an argument

**S-09 · Statement + Evidence** — `h2`-scale statement on 7 cols; supporting evidence
as a mono-annotated list on 4 cols, offset. *The core editorial section.*

**S-10 · Pull Quote** — `quote` type, `--container-content`, attributed with role and
company. Rules above and below, no quotation-mark graphic, no avatar.

**S-11 · Problem → Consequence → Approach** — three stacked full-width bands with
increasing indent, each a single strong paragraph. *For use case and industry pages.*

**S-12 · Sidenote Prose** — `--container-text` main column with margin notes in
`--text-meta` on the outer 3 cols at `lg`+; notes become inline callouts below `md`.
*For guides and long-form.*

---

### Showing structure

**S-13 · System Diagram** — inline SVG showing a real mechanism (the entity graph,
an automation flow, a search pipeline). Mono labels, `--viz-*` palette, **legible
without interaction** (brief §26). Progressive enhancement adds hover detail only.

**S-14 · Ecosystem Map** — the three-axis discovery model, or a practice's
relationships. Static SVG, responsive via `viewBox`, mobile version simplified to a
vertical list — not a pinch-zoom canvas.

**S-15 · Data Panel** — 2–4 verified metrics on `--surface-inverse`, `metric` type in
`--accent-text`, mono labels, **source line mandatory**. Renders only with real `Proof` data.

---

### Directing attention

**S-16 · Full-Bleed Statement Band** — `--surface-inverse` or `--surface-inverse-alt`,
one `h2`-scale sentence, one CTA. `--section-xl` padding. *Punctuation between major
page movements.* Maximum two per page.

**S-17 · Conversion Band** — pre-footer. Heading, one line, primary + secondary CTA
matched to the page's tier. Appears on every page except conversion pages themselves.

**S-18 · Related Rail** — horizontally scrolling on mobile, 3-up grid at `lg`. Powers
the cross-axis linking matrix from architecture doc 06. Mono type-label on each item.

**S-19 · Contextual Next Steps** — three text links with one-line explanations, under
a rule. *The default end-of-page module for content pages* — lighter than a card grid
and more useful.

---

### Media and people

**S-20 · Editorial Image** — full-bleed or `--container-content`, with a mono caption
and, where relevant, a source. Fixed aspect ratio to reserve space (CLS). *Only when
the image adds information.*

**S-21 · Person Row** — photograph, name, role, one line, link. Rows not cards.
*Leadership, authors, case study credits.*

**S-22 · Logo Rail** — **verified clients and platform partners only.** Greyscale, no
hover colour change, no marquee animation. Renders only with real, permitted logos;
otherwise the section does not exist. No placeholder logos, ever.

---

### Composition rules

1. **Alternate density.** A dense section (S-03, S-09) is followed by a lighter one
   (S-10, S-16). Three dense sections in a row is unreadable.
2. **Alternate alignment.** Consecutive sections must not share the same asymmetry.
3. **Background rhythm** — no more than two consecutive sections on the same
   background. Sequence: `bg → surface → bg → inverse → bg`.
4. **Maximum two card grids per page**, never consecutive (P4).
5. **Maximum two full-bleed statement bands per page.**
6. **Every page ends** with S-19 or S-18, then S-17.
7. **Section count:** 6–10 for service pages, 8–12 for industry and use case pages,
   10–14 for the homepage. Below six, the page is thin; above fourteen, it is two
   pages.

### Worked example — a service page silhouette

`H-B hero` → S-09 answer block → S-01 what's included → S-06 process → S-12 approach
detail → S-03 what's in and out of scope → S-15 proof *(or omitted)* → S-04 FAQs →
S-19 related → S-17 conversion.

Nine sections, no two consecutive patterns alike, **one** card grid (none, in fact),
three background changes. Compare with the current site's 350-word service page.

### The AI-search educational pattern

Brief §34 requires AEO/GEO/AIO to be explained, not asserted. Specified as a fixed
composition used on `/services/search-ai-visibility/ai-search/` and the AI Search
guide:

**S-13 System Diagram** showing query → retrieval → synthesis → citation, with the
intervention points marked in `--accent-edge` → **S-02 Definition Rail** distinguishing SEO / AEO
/ GEO / AIO with a sticky term list → **S-08 Before/After** showing a page that gets
cited beside one that does not → **S-03 Feature Matrix** mapping each discipline to
what it changes → **S-04 FAQs**.

This is educational UX: mechanism first, vocabulary second, service third. It is also
the most citable content shape on the site, which is the point.
