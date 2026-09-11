# Imagery — findings and commissioning list

Audit of all 320 registered assets, September 2026. Method: every file was
scored in a headless browser for fine texture and horizontal periodicity, the
outliers were then opened and looked at, and the registry's `alt` and `topic`
were compared against what the image actually shows.

Nothing in this document is a guess about an image nobody opened. Where an
asset is listed as confirmed, it was viewed.

---

## 1. Withdrawn from use

These four are no longer assigned to any page. The files remain on disk and in
the registry for reference; nothing renders them. Each section composes
without a frame — `AnchoredStatement` and `VisualStoryBlock` both degrade to a
typographic composition rather than leaving an empty slot.

| Asset | Page | Why |
|---|---|---|
| `company-accessibility-commitment` | `/company/accessibility-commitment/` | Identifiable person wearing a third party's branded lanyard ("SK TECH"), published under alt text calling her a BizzFly accessibility engineer. Neither the likeness release nor the attribution can be evidenced. |
| `company-automation-approach` | `/company/automation-approach/` | Vendor watermark tiled across the whole frame. Generic 3D clipart (Write / Create / Ideas / Code boxes around an "Ai" chip). Alt text describes engineers who do not appear in it. |
| `resource-website-launch-checklist` | `/resources/website-launch-checklist/` | Vendor watermark tiled across the frame. 3D clipboard-and-gears clipart in a pink/purple palette that exists nowhere in the brand. |
| `resource-data-warehouse-vs-spreadsheets` | `/resources/data-warehouse-vs-spreadsheets/` | Vendor watermark tiled across the frame. A 3D cloud icon illustrating an article about spreadsheets. Smallest file in the library at 12KB. |

**The watermark is the hard blocker.** A tiled preview watermark means the
asset was never licensed. Three are confirmed by inspection; the rest of the
under-30KB group below shares their visual family and should be treated as
suspect until each is checked against the licence records.

---

## 2. Suspect: the under-30KB group

Thirty-three assets fall under 30KB at 1200×800. That is far too small for a
photograph and is characteristic of flat 3D clipart — which is what every one
of them opened so far has turned out to be. Three are confirmed watermarked.

**Action:** check each against the licence records before it renders again. If
a licence cannot be produced, withdraw it.

```
resources/resource-what-is-anchor-text            15KB
resources/resource-chatbot-vs-ai-agent            15KB
resources/resource-what-is-domain-authority       16KB
resources/resource-traditional-search-vs-ai-search 17KB
resources/resource-in-house-seo-vs-agency-seo     17KB
technologies/tech-automation-platforms            17KB   (confirmed clipart, no watermark seen)
resources/resource-local-seo-checklist            18KB
use-cases/use-case-increase-organic-traffic       18KB
services/service-content-strategy                 19KB
resources/resource-what-is-robots-txt             20KB
resources/resource-what-is-programmatic-seo       21KB
resources/resource-what-is-a-redirect             21KB
resources/resource-outsource-development          21KB
resources/resource-what-is-schema-markup          21KB
resources/resource-organic-vs-paid-social         21KB
resources/resource-how-to-prioritise-digital-work 22KB
resources/resource-what-is-organic-traffic        23KB
resources/resource-conversion-research-guide      24KB
resources/resource-local-seo-vs-national-seo      24KB
resources/resource-what-is-search-experience-optimisation 25KB
resources/resource-guide-seo-audit                25KB
resources/resource-what-is-keyword-cannibalisation 25KB
resources/resource-pre-launch-seo-checklist       25KB
resources/resource-ai-search-readiness-checklist  27KB
resources/resource-how-to-brief-an-seo-agency     27KB
resources/resource-seo-reporting-framework        27KB
use-cases/use-case-reduce-support-tickets         28KB
resources/resource-what-is-a-digital-growth-engine 28KB
services/service-customer-portals                 28KB
company/company-accessibility-commitment          28KB   (withdrawn — see above)
```

---

## 3. Topic mismatches confirmed by inspection

The image is legitimate but is not about the subject of the page.

| Asset | Shows | Page subject |
|---|---|---|
| `company-about-team` | A laptop displaying an ML confusion matrix, with a prominent HP logo. No people. | The team |
| `resource-what-is-single-sign-on` | A screen of WordPress PHP theme code | Single sign-on |
| `resource-what-is-vector-search` | The human-hand-touching-robot-hand cliché, on magenta | Vector search |
| `resource-what-is-index-coverage` | Pastel 3D rocket, pie charts and an "SEO" search bar | Index coverage |

`company-about-team` is the one worth fixing first: it is the team image on the
company page and it contains neither a team nor BizzFly.

---

## 4. Technical quality

| Asset | Problem |
|---|---|
| `practice-digital-marketing-s2` | Badly out of focus. Sticky notes at a blur radius that makes the subject unreadable. Lowest fine-texture score in the library. |

---

## 5. Alt text is describing images that do not exist

A distinct problem from the images themselves, and an accessibility failure
rather than an aesthetic one. In every withdrawn case the alt text described
people performing work that does not appear anywhere in the frame:

- "BizzFly automation engineers reviewing end-to-end integration workflows" — a
  clipart diagram with no people.
- "Data analysts contrasting scalable cloud data warehouse SQL queries with
  fragile desktop spreadsheets" — a cloud icon.
- "Developers conducting pre-flight launch verification including SSL
  certificates, 404 handlers, and analytics tags" — a clipboard icon.

A screen reader user is currently told a page contains evidence of BizzFly
staff at work. **Every `alt` in the registry should be re-checked against the
asset it describes**, not just the ones withdrawn here. The audit script
`verify:images` checks that alt text exists and is not generic; it cannot check
that it is true.

---

## 6. Needs commissioned photography

No amount of restructuring fixes these — they need a real shoot, or the
sections stay typographic, which is the better of the two bad options and is
what they currently do.

1. **The team.** One honest photograph of the actual team in the actual Pune
   office. Replaces `company-about-team` and is reusable for About, Careers and
   Company. This single asset removes the most credibility risk of anything on
   this list.
2. **Accessibility / delivery work in progress.** For the commitments pages,
   where a stock person in another firm's lanyard currently stands in.
3. **Practice imagery for digital marketing.** `practice-digital-marketing-s2`
   is unusable at its current focus.

Until those exist, the honest position is the one the components already take:
no frame, and the section carries itself on typography and structure.

---

## 7. What was deliberately not done

No image was swapped for a different stock photograph. Replacing a weak generic
asset with another generic asset moves the problem rather than solving it, and
the brief for this site has been consistent that nothing unverifiable gets
published. Sections whose image was withdrawn now compose without one.
