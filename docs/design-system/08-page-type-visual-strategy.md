# 08 — Page-Type Visual Strategy & Anti-Template Rules

---

## S. Page-Type Visual Strategy

The silhouette test (principle P3): **screenshot any two page types, remove the text.
They must be distinguishable.** Below is how each type earns its own rhythm.

### Home — editorial, strategic, three-way routing

**Hero:** H-C Full-Width Declaration.
**Rhythm:** the widest range on the site — declaration, then dense routing, then a
dark narrative band, then evidence.
**Sequence:** H-C → S-01 (six practices, numbered) → S-14 (three-axis ecosystem map) →
S-16 dark band (the AI-search point of view) → S-13 (how AI search works) → S-09
(statement + evidence) → S-15 proof *or* S-19 process links → S-18 insights rail →
S-17 conversion.
**Signature:** the only page using `display-xl`, and the only one that routes three
ways above 900px. Two background changes minimum.
**Density:** medium. It routes; it does not explain.

---

### Practice hub (6) — routing within a discipline

**Hero:** H-A Editorial Statement.
**Signature:** the sub-service grid is **above the fold** — a visitor here has already
chosen a category and needs to narrow, not be re-sold.
**Sequence:** H-A → S-01 (sub-services, numbered rows) → S-06 (how this practice
works) → S-02 (definition rail where terms need distinguishing) → S-18 (related
industries) → S-18 (related use cases) → S-04 FAQs → S-17.
**Density:** high. Six of these carry 99 child pages.

---

### Service (99) — consulting document

**Hero:** H-B if a genuine visual exists, else H-A.
**Signature:** the **answer block is the first section**, not the hero. Mono
annotation throughout — timelines, scope boundaries, what's included.
**Sequence:** hero → S-09 answer → S-01 what's included → S-06 process → S-12
approach detail → S-03 in-scope/out-of-scope matrix → S-15 proof *(conditional)* →
S-04 FAQs → S-19 → S-17.
**Density:** high, text-dominant.
**Anti-pattern guard:** with 99 of these, the temptation is one template. Variation
comes from which of S-01/S-02/S-03/S-08 fits the specific service — a technical
service uses S-03 and mono blocks; a strategic service uses S-09 and S-12.

---

### Industry (14) — sector-fluent, problem-forward

**Hero:** H-H Industry Context.
**Signature:** **no BizzFly capability appears above the sector problems.** The
problem rail in the hero anchors down the page.
**Sequence:** H-H → S-11 (problem → consequence → approach, ×4 sector problems) →
S-01 (services mapped to those problems) → S-18 (sector use cases) → S-13 (sector
technology/compliance where relevant) → S-05 case studies *(conditional)* → S-04
sector FAQs → S-17.
**Density:** high.
**Anti-pattern guard (brief §32):** "SEO for Healthcare" with "Healthcare" swapped for
"Finance" is a review failure. Each industry supplies its own four `IndustryProblem`
entities in the sector's own vocabulary — dealer networks and RFQ cycles for
manufacturing, admissions funnels for education, portal dependency for real estate.

---

### Industry crossover (12) — narrow and sharp

**Hero:** H-E Problem-Led.
**Signature:** shorter than an industry page. The second section — *why the generic
approach fails here* — is the page's reason to exist.
**Sequence:** H-E → S-09 (the specific problem) → S-08 (generic vs sector-specific
approach) → S-01 (what we do differently) → parent links → S-04 → S-17.

---

### Use case (25) — diagnostic

**Hero:** H-E Problem-Led.
**Signature:** symptoms before solution. **No BizzFly service is named above "How we
solve it"** (architecture doc 05).
**Sequence:** H-E → S-11 (why this happens) → S-06 (how we solve it) → S-09 (what
good looks like) → S-06 timeline → S-01 (services involved) → S-18 related use cases
→ S-17.
**Density:** medium. Written for a reader who does not yet know the vocabulary.

---

### Case study (14) — long-form business journalism

**Hero:** H-G, on a dark band.
**Signature:** the only narrative page type. Alternating S-07 rows create a reading
rhythm no other page has. Sticky metric panel while prose scrolls.
**Sequence:** H-G dark → S-09 context → S-11 challenge → S-07 ×N (strategy,
execution, challenges) → S-15 results (verified) → S-10 client quote *(if approved)*
→ S-09 lessons → S-18 related → S-17.
**Density:** medium, generous measure — `--container-text` for prose.
**Hard gate:** renders only with verified `Proof` data. No fabricated metrics, no
placeholder narrative (principle P8, architecture doc 05).

---

### Technology (13) — engineering brief

**Hero:** H-F Technical Brief.
**Signature:** **the mono-dominant page type.** Specification blocks, decision
criteria, explicit "when we don't use this."
**Sequence:** H-F → S-09 what this covers → S-03 (what we use and why) → S-09 (when
we don't use it) → S-06 (how we decide) → S-13 architecture diagram → S-19 → S-17
(technical discovery).
**Density:** very high, lowest imagery on the site.
**Why:** persona P4 reads this first. A logo wall loses them in 30 seconds.

---

### Guide (10) — publication

**Hero:** H-A with a table of contents.
**Signature:** sticky section nav, reading progress, margin notes (S-12), glossary
links inline. `--container-text` throughout.
**Sequence:** H-A + TOC → chaptered S-12 prose → S-13 diagrams → S-03 where
comparative → S-04 FAQs (6+) → download → **low-tier CTA only**.
**Density:** highest word count, lowest visual density.
**Gate:** a guide pushing a sales call converts the reader out of the funnel.

---

### Blog (21) — article

**Hero:** H-A compact, with author and both dates.
**Signature:** the takeaway is stated **before** the argument.
**Sequence:** compact hero → the point → S-12 body → S-09 what to do about it → S-18
cluster links → soft CTA.

---

### Glossary (22) — definition object

**Hero:** **none.**
**Signature:** the most constrained page type on the site. `h1`, then a ≤40-word
definition as the first element in the DOM, then context, then related terms.
`DefinedTerm` schema. **No CTA.**
**Why:** these exist to be extracted and cited. Every element between the heading and
the definition reduces the chance of that.

---

### Comparison (8) — decision aid

**Hero:** H-A with the short answer inline (≤60 words).
**Signature:** genuinely symmetric layout — the one legitimate use of a 6/6 split.
**Sequence:** hero + short answer → S-03 comparison matrix → S-09 "choose A if" →
S-09 "choose B if" → S-08 where each breaks down → S-09 how we'd decide → S-04 →
balanced CTA.
**Gate:** the "choose B" section is required even when B is not something BizzFly
sells. A comparison that always concludes "hire us" cannot be cited as neutral.

---

### Location (8) — local proof

**Hero:** H-B with a real photograph of the actual location.
**Signature:** genuine local content, full NAP, map, `LocalBusiness` schema.
**Gate:** only Pune has a verified address. The other three cities do not render until
verification (architecture doc 07).

---

### Company (14) — narrative and people

**Hero:** H-A.
**Signature:** the only pages using S-21 Person Rows and real photography of real
people. Warmer, lower density.
**Sequence:** H-A → S-09 story → S-07 stepped history *(where verified)* → S-21
leadership → S-09 values (Be Discoverable · Be Scalable · Be Future-Ready) → S-18 →
S-17.

---

### Conversion (10) — single purpose

**Hero:** H-I Conversion Focus.
**Signature:** `--container-narrow`, form above 700px, **no navigation cross-sell, no
related rail, no S-18**. The only outbound links are the legal footer.
**Density:** deliberately lowest on the site.

---

### Listing (12) — the list is the page

**Hero:** H-J, ~220px.
**Signature:** filters, result count in mono, S-05 card grid (one of the few
legitimate uses), pagination, designed empty state.

---

### Legal (4) / Utility (3) — plain

`--container-text`, no hero, no marketing, clear heading structure, last-updated date.
Readability is the entire brief.

---

### Density map

| Density | Page types |
|---|---|
| Very high | Technology |
| High | Service, Practice hub, Industry, Comparison |
| Medium | Home, Use case, Case study, Crossover, Blog |
| Medium-low | Company, Location, Listing |
| Low | Guide *(word-dense, visually sparse)*, Glossary, Conversion, Legal |

---

## T. Anti-Template Rules

Twenty-four rules. Each maps to a specific failure the brief identified. **A design
violating any of these is rejected at review, not negotiated.**

### Structure

1. **No page may use the same section pattern twice consecutively.**
2. **Maximum two card grids per page**, never consecutive.
3. **No page is** hero → cards → cards → cards → CTA. This shape is banned outright.
4. **No symmetric 6/6 split** except on comparison pages and genuine two-item
   comparisons.
5. **Every page type has its own hero pattern** from the mapping table in doc 04.
6. **Section count 6–14.** Fewer is thin; more is two pages.
7. **No more than two consecutive sections share a background.**
8. **Every page ends** with related links, then a tier-matched conversion band.

### Visual

9. **Nothing has a border radius above 8px.**
10. **No shadow on a static element.** Elevation exists only for genuinely floating UI.
11. **Exactly one gradient is permitted** sitewide — the white→surface section
    transition. No mesh, no brand gradients, no gradient text, no gradient buttons, no radial
    glows.
12. **No floating shapes, blobs, orbs, particles or decorative geometry.**
13. **No glassmorphism, no backdrop blur** (also a measurable performance cost).
14. **No 3D, no isometric illustration, no tilt.**
15. **`--green-500` never appears as text or an icon on a light background** (1.79:1) —
    and never more than twice in one viewport.
16. **No circular numbered badges.** Numbering is mono type on a baseline.
17. **No icon in a coloured circle.** Icons sit inline at text scale.
18. **No decorative rules or dividers in brand colour.** Rules are `--border`.

### Content integrity

19. **No fabricated content of any kind** — no placeholder logos, invented metrics,
    lorem testimonials, fake dashboards, or stand-in client names. Components that
    have no real data **do not render**.
20. **Every metric displays its source and measurement window**, or it does not
    display.
21. **No stock photography.** No handshakes, no generic offices, no diverse-team-at-a-
    whiteboard, no AI-generated people. If no real image exists, the section is
    typographic.
22. **Every image must add information.** If removing it costs the reader nothing, it
    goes.

### Interaction

23. **Nothing scales, lifts, bounces or glows on hover.** Colour, underline and arrow
    movement only.
24. **No page transitions, no scroll-jacking, no parallax, no pinned full-screen
    sequences.**

### The review test

After every page type, two questions from brief §42:

> **Does this look like a premium custom-built enterprise website?**
> **Could this be mistaken for a purchased WordPress template?**

If the second answer is yes, it is redesigned — not adjusted. The most common cause
will be reaching for a card grid where an editorial structure was needed (principle
P4), and the fix is almost always S-01, S-09 or S-11.
