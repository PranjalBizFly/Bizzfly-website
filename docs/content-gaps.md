# Content gaps blocking inner-page art direction

Measured across the content model, September 2026. Every number here is a
count of authored fields, not an impression of how a page looks.

The short version: the service template is not the reason service pages feel
generated. It already has four layout variants and a rule that breaks up runs
of same-shaped sections. What it does not have is content to compose.

---

## 1. Services — the explainer is missing everywhere

`Service.sections` drives the one section on a service page that makes an
argument rather than listing facts. The template comments call it "the
explanation, before any of the lists" and place it first for that reason.

**It is populated on 0 of 45 services.** Only practices have `sections`, so
the explainer never renders on a service page at all. Every service page is
therefore built entirely from enumerations — problems, scope, outcomes,
boundaries — which is exactly the "specification, not an argument" shape the
template was written to avoid.

This is the single highest-value content gap on the site. Three to four
authored paragraphs per service would give each page its own argument and
would immediately differentiate pages that currently differ only in list
contents.

## 2. Services — the approach steps are missing on 39 of 45

`Service.approach` drives the process band, which is the only non-list,
non-prose composition most services could carry.

| Has approach steps | Count |
|---|---|
| Yes | 6 |
| No | **39** |

The six that have it: `seo`, `seo-audit`, `local-seo`, `seo-migration`,
`ai-readiness-assessment`, `crm-implementation`.

## 3. Services — section counts

How many composed sections each service can actually produce:

| Composed sections | Services |
|---|---|
| 1 | 2 |
| 2 | 1 |
| 3 | 4 |
| 4 | 14 |
| 5 | 18 |
| 6 | 6 |

**The two single-section services are `search-experience-optimisation` and
`digital-strategy`.** Both have `included` and nothing else — no problems, no
outcomes, no approach, no diagram, no boundary. Their pages are a hero, one
list, questions, related links and a call to action. No arrangement of four
elements fixes that; they need authored content.

`enterprise-seo`, called out in the previous audit, has four: problem, scope,
outcomes, boundary. It is missing explainer, approach and diagram.

## 4. Services — two fields are authored but effectively empty

| Field | Populated |
|---|---|
| `technologies` | 1 of 45 (`seo` only) |
| `proof` | 0 of 45 |

Neither can currently support a section. `technologies` would be worth
filling: it is factual, it varies by service, and it would give thin pages a
relationship-shaped band that links out to the technology pages.

## 5. Technologies — diagrams

Nine of sixteen technology pages have no diagram, including six whose layout
is `architecture-led` — a layout that exists to present a mechanism:
`data-platforms`, `crm-platforms`, `mobile-platforms`, `security-and-access`,
`observability`, `payments-and-billing`.

The diagram set is fixed and subject-specific (`system-architecture`,
`process-transformation`, `ai-workflow`, `content-structure`,
`search-surfaces`). **Assigning an existing diagram to a technology it was not
drawn for would assert something about that technology that nobody has
checked**, so none has been assigned. These need either a new diagram authored
per subject or an explicit decision that the page carries none.

Two technologies have no `decisionCriteria`: `automation-platforms` and
`engineering-standards`.

## 6. Use cases — the healthiest of the three

Thirty pages across four layout variants (9 default, 9 problem-solution,
7 workflow-led, 5 outcome-led). Every one has three or more approach steps.
Gaps are narrower: 11 have no diagram, 9 have no `whyItMatters`.

---

## What was changed rather than documented

One thing in this pass was fixable without authoring anything.

The scope section's lead was the same sentence on all 45 service pages —
"Stated plainly, so there is no ambiguity about what you are buying." True,
and identical everywhere, which is what a generated page reads like.

Meanwhile `Service.timeline` is authored on all 45 and is specific and
factual: "2–3 weeks for the audit, then fixes prioritised by impact";
"6–10 weeks for a first production agent on a single process". It renders as
the lead of the approach band — which exists on six pages. On the other 39 it
was written, kept accurate, and shown to nobody.

Scope now takes it on exactly those 39 pages. Nothing is duplicated, because
the condition is "the approach band is absent", and nothing is invented.
