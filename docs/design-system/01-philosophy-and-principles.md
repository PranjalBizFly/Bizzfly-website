# 01 — Design Philosophy, Personality & Principles

## A. Design Philosophy

### The finding that shapes everything

The BizzFly brand specifies two primaries — **`#2C70D1`** BizzFly Blue and
**`#A9CF46`** BizzFly Green — and the logo is drawn in green and white. The current
website is built almost entirely in **`#1863dc`**: the Digitak theme's default blue.
It is close enough to the brand blue to look deliberate, which is exactly the problem
— it was never chosen, and the WordPress preset palette was never touched.

That is the whole problem in one detail: the current site is a *theme wearing a
logo*. Nothing about its visual language was decided; it was inherited.

The new design system starts from the opposite premise. **Every value in it is a
decision with a reason**, and the brand mark — not a theme default — is the anchor.

### The philosophy: content-first, evidence-led

HCLTech does not feel enterprise because of gradients or animation. It feels
enterprise because of four things, and those are what we extract:

1. **Content carries the page, not containers.** Structure comes from typography,
   rules, alignment and space — not from wrapping everything in a box with a shadow.
2. **Density is a feature.** Serious buyers want more information, arranged so it can
   be scanned. Sparse pages read as "we have nothing to say."
3. **Hierarchy is unmistakable.** At a glance you know what matters most, second,
   third. Nothing competes.
4. **Restraint signals confidence.** One accent colour used sparingly reads as more
   expensive than six colours used everywhere.

BizzFly's interpretation adds a fifth, specific to its positioning:

5. **The design must demonstrate the product.** BizzFly sells discoverability,
   structure, speed and machine-readability. A site that is slow, unstructured or
   JavaScript-dependent disproves the pitch before a word is read. **Performance and
   semantic structure are brand attributes here, not engineering chores.**

### The organising idea: Editorial Systems

BizzFly's visual language sits at the intersection of two references:

- **Editorial** — the discipline of a serious publication. Strong typographic scale,
  generous measure control, rules and grids instead of boxes, images that inform.
- **Systems** — the language of technical work. Monospaced labels, numbered
  sequences, precise data, diagrams that show real mechanisms.

Editorial gives credibility and readability. Systems gives the technical authority
that separates BizzFly from a marketing agency. Neither alone is enough: pure
editorial reads as a magazine, pure systems reads as developer documentation.

**In practice:** a service page reads like a well-set consulting document with
monospaced technical annotation. A case study reads like long-form business
journalism. A technology page reads like an engineering brief. All three are
recognisably the same brand because they share type, colour, spacing and motion — but
none of them look like the same template.

---

## B. BizzFly Design Personality

### The two primaries decide the palette

The brand's two primaries have opposite limitations, and measuring them is what
dictates the system:

- **Green `#A9CF46`** is 1.79:1 on white — never text on light — but **10.28:1 on
  near-black**.
- **Blue `#2C70D1`** is 4.83:1 on white — legible as text and as a fill — but only
  3.82:1 on ink.

Neither works everywhere, so neither is asked to:

> **Blue leads on light. Green leads on dark. Deep ink is the environment.**

The accent appears where BizzFly wants the eye to go — the primary action, the key
metric, the thing being made discoverable. Nowhere else. This is a system that loses
all its
power if it is used for decoration, and gains enormous power if it is used for
meaning.

It also happens to be strategically apt: BizzFly's positioning is *"Making businesses
discoverable."* A visual system where one colour marks the thing you are meant to
find is the positioning, expressed as design.

### Personality attributes, and how each is expressed

| Attribute | Expressed as | Explicitly not |
|---|---|---|
| **Intelligent** | Information density, real diagrams, comparison tables | Icons with three-word captions |
| **Modern** | Fluid type, variable fonts, restrained motion | Gradients, glass, blobs |
| **Confident** | Large type, generous space, few colours | Loud colour, big shadows, exclamation |
| **Technical** | Monospace labels, numbered sequences, precise data | Fake dashboards, circuit-board imagery |
| **Human** | Real photography, named authors, plain language | Stock handshakes, 3D characters |
| **Premium** | Tight tracking, deliberate measure, alignment discipline | Heavy shadows, excessive rounding |
| **Trustworthy** | Visible sources, dates, honest empty states | Unattributed numbers, fake logos |
| **Editorial** | Rules, grids, pull quotes, sidenotes | Card grids |
| **Enterprise-ready** | Deep navigation, breadcrumbs, structured content | Single-page-scroll narrative |
| **Conversion-focused** | One primary action per screen, tier-matched | "Contact Us" on every section |

### What BizzFly must never look like

Checked against the brief's prohibitions, with the specific defence:

| Risk | Defence in this system |
|---|---|
| Cheap SEO agency | No stock imagery, no ranking-graph clichés, no green upward arrows |
| Generic digital agency | Card grids are restricted by rule (§10 of the section library) |
| AI startup landing page | No gradient meshes, no dark-purple glow, no floating orbs |
| WordPress template | Distinctive display face, asymmetric grids, verified custom tokens |
| SaaS dashboard | No fake product UI, no fabricated charts |
| Portfolio-only agency | Content depth over image galleries |
| Excessive gradients | Gradients allowed in exactly one place — see the colour doc |
| AI-generated website | No illustration set of identical isometric people |

### The one-sentence test

Every screen must survive this: **"Would a CEO evaluating a ₹40-lakh digital
transformation take this company seriously?"** If a section would look at home on a
₹15,000 template, it is redesigned.

---

## C. Design Principles

Twelve principles. Each is testable — a reviewer can hold a design against it and get
a yes or no, not an opinion.

---

### P1 — Structure comes from type and space, not from boxes

The default way to separate two ideas is a heading, a rule, and space. A bordered
container is a deliberate exception requiring justification.

**Test:** remove every border, background fill and shadow from the page. Is the
hierarchy still clear? If not, the layout is doing no work and the containers are
hiding it.

---

### P2 — One accent, used for meaning only

The accent — `--accent-edge`, which resolves to blue on light surfaces and green on
dark ones — marks the primary action, the single most important metric on a screen,
and active navigation state. It is never a background wash, never a decorative line,
never applied to more than one element per viewport.

**Test:** count accent-coloured elements visible on any screen. More than two means
the system is being diluted.

---

### P3 — Every page type has its own rhythm

Section order, hero pattern, density and dominant composition differ per page type.
Fourteen page types, fourteen visual behaviours — sharing tokens, not layouts.

**Test:** screenshot a service page, an industry page and a use case page, remove the
text. They must be distinguishable by silhouette alone.

---

### P4 — Cards are a last resort

Cards are correct for one thing: a set of genuinely parallel, independently navigable
items of similar weight (a listing of case studies, a set of guides). For anything
else — capabilities, benefits, process steps, features — use an editorial structure.

**Hard rule:** no page may contain more than **two** card grids, and never two
consecutively.

**Test:** if the items differ in importance, or are read in sequence, or are being
explained rather than chosen between, cards are the wrong container.

---

### P5 — Density over decoration

When a section feels empty, the answer is more substance, not a bigger illustration.
Enterprise buyers read. Give them something to read.

**Test:** would removing every image on the page reduce the information it conveys? If
not, the images are decoration.

---

### P6 — The answer comes before the argument

Structural consequence of the AEO requirements in architecture doc 06: the first
substantive text on every page answers the page's implicit question, in under 60
words, above 1,000px. Heroes are sized to permit this, not to fill a viewport.

**Test:** on a 1366×768 laptop, is the answer visible without scrolling?

---

### P7 — Motion clarifies; it never performs

Motion is permitted to show relationship, sequence or state change. It is not
permitted to attract attention to itself. Nothing animates that would not be missed
if it appeared instantly.

**Test:** with `prefers-reduced-motion: reduce`, is the experience equally usable and
equally comprehensible? It must be.

---

### P8 — Never fabricate to fill a layout

No placeholder logo walls, no illustrative metrics, no lorem testimonials, no invented
client names. Components are designed to be **honest when empty** — a states
requirement, not an afterthought.

**Test:** every component has a specified empty state that is dignified and useful.

---

### P9 — Accessible by construction, not by audit

Contrast, focus, semantics, keyboard order and touch targets are properties of the
tokens and components, so they cannot be omitted downstream. Every colour pairing in
this system has been computed and verified before being written down.

**Test:** can the page be operated to completion with a keyboard alone, with visible
focus at every step?

---

### P10 — Performance is a design constraint, stated up front

The budget from architecture doc 08 (LCP < 2.0s, INP < 200ms, CLS < 0.1, JS < 120 KB)
is an input to design decisions, not a cleanup task. A composition that cannot be
built within it is redesigned, not excused.

**Test:** what does this section cost in KB and main-thread time? If unknown, it is
not designed yet.

---

### P11 — The user always knows where they are

Breadcrumbs, active navigation state, section context in sticky elements, and a
sensible page title. On a 328-page site, orientation is a primary feature.

**Test:** land on any page mid-site with no history. Can you name the section you are
in and the level above it?

---

### P12 — Mobile is designed, not derived

Mobile compositions are authored independently: different spacing rhythm, different
hero crops, different navigation model, different section order where it helps.
Nothing is a scaled-down desktop.

**Test:** does any mobile screen contain an element that exists only because the
desktop layout needed it?

---

## Applying the principles: worked example

**Brief:** the six capability areas on the Services hub.

**The template answer** (rejected): a 3×2 grid of cards, each with an icon in a
circle, a heading, two lines of copy and "Learn more →".

Fails P1 (structure from boxes), P4 (cards not last resort), P5 (decoration over
density), and P3 (identical to what every agency does).

**The system answer:** a full-width numbered editorial list. Each practice occupies a
full row: a monospaced index (`01`–`06`), the practice name at H3 in the display face,
a one-line definition at body-large, and a horizontal rail of its four most-requested
services as text links. Rows separated by hairline rules, not borders. On hover the
row's rule extends and the arrow advances; the row does not lift or scale.

This is denser, more scannable, more useful — six practices *and* twenty-four service
links in less vertical space than six cards — and it cannot be mistaken for a
template.

Mobile: the rails become two-line wrapped link groups; index numbers move above the
practice name; rules remain.
