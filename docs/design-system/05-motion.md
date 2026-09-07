# 05 — Motion System

## N. Motion System

### The governing rule

Per principle P7: **motion clarifies, it never performs.** Every animation must
answer one of three questions — *where did this come from?*, *what changed?*, or
*what is related to what?* Motion that answers none of these is removed.

The second constraint is the INP budget (< 200ms). Motion that runs on the main
thread during interaction is a measured performance cost, not a stylistic choice.

### Animatable properties

**Only `transform` and `opacity`.** These are compositor-driven and do not trigger
layout or paint.

| Never animate | Why | Do instead |
|---|---|---|
| `height` / `width` | Layout thrash on every frame | Transform scale, or `grid-template-rows: 0fr → 1fr` |
| `top` / `left` / `margin` | Layout | `translate` |
| `box-shadow` | Paint on every frame | Cross-fade two stacked pseudo-elements |
| `filter: blur()` | GPU-expensive at scale | Opacity |
| `background-position` | Paint | Transform a child |

`will-change` is applied **only** on interaction start and removed on completion.
Applied permanently it costs memory on every element that has it.

### Duration scale

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 100ms | Colour change, focus ring |
| `--dur-fast` | 160ms | Hover, underline draw, small movement |
| `--dur-base` | 240ms | Dropdown open, accordion, tab change |
| `--dur-slow` | 360ms | Mega-menu, modal, mobile nav |
| `--dur-reveal` | 480ms | Scroll reveal |

**Nothing exceeds 480ms.** Above that, motion becomes something the user waits for.

### Easing

| Token | Curve | Use |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default. Fast start, soft settle |
| `--ease-decelerate` | `cubic-bezier(0, 0, 0, 1)` | Entrances — arrives and settles |
| `--ease-accelerate` | `cubic-bezier(0.3, 0, 1, 1)` | Exits — leaves decisively |
| `--ease-inout` | `cubic-bezier(0.65, 0, 0.35, 1)` | State toggles that return |

**No spring, bounce, elastic or overshoot anywhere.** Bounce is the single clearest
signal of a consumer template on an enterprise site.

---

## Scroll reveals

### Mechanism

`IntersectionObserver` only. **No scroll event listeners**, no scroll-linked
animation frames, no library.

```
threshold: 0.15          — 15% visible
rootMargin: 0px 0px -8% 0px   — fires slightly before centre
observer disconnects after first reveal (one-shot, never re-animates)
```

Reveals are **CSS transitions triggered by a class**, not JS-driven animation. The
observer's only job is adding `data-revealed="true"`. This keeps the whole system at
roughly 1 KB of JavaScript.

### The six reveal effects

| Effect | Transform | Duration | Use |
|---|---|---|---|
| **Fade + rise** | `translateY(24px) → 0`, opacity 0→1 | 480ms | Default for all content blocks |
| **Line draw** | `scaleX(0) → 1`, origin left | 360ms | Section rules, timeline connectors |
| **Image reveal** | Container `clip-path` inset 0→100%, image `scale(1.06) → 1` | 640ms | Editorial images only |
| **Horizontal enter** | `translateX(±16px) → 0` | 480ms | Alternating narrative rows (S-07) |
| **Metric count** | Number counts to value | 900ms | **Verified metrics only.** Never on invented figures |
| **Text stagger** | Per-line `translateY(0.4em) → 0` in overflow-hidden rows | 480ms + stagger | Hero statements only, max 3 lines |

### Non-negotiable rules

1. **Content is visible by default in the HTML.** Reveal styles apply only when JS has
   confirmed observer support and the element is registered. A JS failure must never
   leave the page blank — this is a hard requirement given the AI-crawler dependency
   (architecture doc 06). **Crawlers that don't execute JS see fully rendered content.**
2. **Nothing above the fold animates on load.** The hero renders immediately. Animating
   the LCP element delays LCP by definition.
3. **One-shot.** Elements never re-animate on scroll-back.
4. **Maximum 6 revealing elements per viewport.** Beyond that it reads as noise.
5. **Never reveal an element that shifts layout.** Space is reserved before reveal, so
   CLS stays 0.

---

## Stagger system

### Primitives

Two components, per the brief's requirement:

```
<StaggerGroup
  delay={0}          // ms before the first child
  step={70}          // ms between children  (--stagger-step)
  duration={480}     // per-child duration
  direction="up"     // up | down | left | right | none
  threshold={0.15}   // IntersectionObserver threshold
  max={6}            // children beyond this share the last delay
>
  <StaggerItem />
  <StaggerItem />
</StaggerGroup>
```

Implemented as a CSS custom property (`--stagger-index`) set on each child, with the
delay computed in CSS:

```css
.stagger-item {
  transition-delay: calc(min(var(--stagger-index), var(--stagger-max)) * var(--stagger-step));
}
```

**The stagger cap matters.** A 12-item list at 70ms would take 840ms to finish; capping
at 6 keeps the last item under 420ms. Long staggers make a page feel slow, not
refined.

### Canonical hero sequence

```
0ms    Eyebrow          fade
70ms   Heading          fade + rise
140ms  Lead paragraph   fade + rise
210ms  CTA pair         fade + rise
280ms  Visual / rule    image reveal or line draw
```

Total 760ms. Applied to below-fold heroes only; the homepage hero renders immediately
and is exempt (rule 2).

---

## Hover interactions

Restrained by design. **Nothing scales, nothing lifts, nothing changes colour
dramatically.**

| Element | Interaction | Duration |
|---|---|---|
| Text link | Underline 1px→2px, colour → `--text-link-alt` | 160ms |
| Nav item | Underline draws left→right | 180ms |
| Standalone link | Arrow advances 4px | 160ms |
| Primary button | Fill darkens 6%, arrow advances 3px | 160ms |
| Secondary button | Background fills to `--ink-900`, text inverts | 160ms |
| Editorial row (S-01) | Hairline extends to full width, arrow advances | 240ms |
| Card (S-05) | Border → `--border-strong`, image scales `1 → 1.03` **inside a fixed-size container** | 240ms |
| Image (editorial) | Scale `1 → 1.02` within an overflow-hidden frame | 320ms |
| Table row | Background → `--surface` | 100ms |
| Accordion | Chevron rotates 90°, panel via `grid-template-rows` | 240ms |

**Explicitly banned:** button scaling, card lift with growing shadow, 3D tilt, colour
flashing, glow, magnetic cursors, custom cursors, and any hover that moves an element
out from under the pointer.

**Touch:** every hover affordance has a non-hover equivalent. Hover is never the only
route to information. Hover styles are wrapped in `@media (hover: hover)` so touch
devices do not get sticky states.

---

## Page transitions

**None.** No fade-out on navigate, no shared-element transitions, no route animation.

Rationale: on a 328-page site optimised for search entry, most sessions are 1–3 pages.
A 300ms transition on every navigation is a 300ms tax on the most common action, it
delays LCP, and it costs orientation. Instant navigation *is* the premium experience.

What is used instead:
- `<link rel="prefetch">` on viewport-visible internal links so navigation feels
  instant
- A 2px `--accent-edge` progress bar at the top for navigations exceeding 300ms
- Scroll restoration on back-navigation
- View Transitions API considered **only** for same-template listing filters (e.g.
  Work by industry), where the shared context genuinely helps, and always behind
  `@supports` with a static fallback

---

## Scroll-based interaction

Permitted only where it carries meaning (brief §25).

| Approved | Where |
|---|---|
| Sticky section sub-nav with active state | Guides, long service pages, case studies |
| Sticky term list in the Definition Rail (S-02) | AI search explainer, engagement models |
| Progress indicator on long-form | Guides over 2,000 words |
| Timeline node activation | Process (S-06), case study execution (S-07) |
| Sticky metric panel while related prose scrolls | Case studies with verified data |

**Banned:** scroll-jacking, horizontal scroll-hijack sections, pinned full-screen
sequences, scroll-driven video scrubbing, parallax on any element, and any pattern
where the scrollbar position stops matching the page position.

Where `animation-timeline: view()` is used for progress indicators, it is behind
`@supports` with a static fallback — never a JS scroll listener.

---

## Reduced motion

`prefers-reduced-motion: reduce` is honoured at the **token** level (see
`tokens.css`), so every component inherits compliance without individually
implementing it:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-fast: 1ms; --dur-base: 1ms; --dur-slow: 1ms; --dur-reveal: 1ms;
    --reveal-distance: 0px;
    --stagger-step: 0ms;
  }
}
```

Additionally:

| Motion | Reduced-motion behaviour |
|---|---|
| Scroll reveals | Content simply present. Opacity may still transition (opacity is vestibular-safe); **transforms are zeroed** |
| Metric count-up | Final value rendered immediately |
| Mobile nav slide | Cross-fade instead |
| Image reveal | Static image |
| Marquees | Static, or paused with a play control |
| Auto-advancing anything | Does not exist on this site |

**The reduced-motion experience is equally usable and loses no information.** That is
a launch gate, not a preference.

---

## Motion performance rules

1. **Total animation JavaScript ≤ 3 KB.** The reveal observer and stagger index
   assignment. Nothing else.
2. **No animation library.** Framer Motion, GSAP and Lottie are all disallowed for
   this system — every effect specified here is CSS. Loading 40 KB+ to fade an element
   in violates both the JS budget and principle P10.
3. **Composite-only.** Any animation that triggers layout or paint is a defect.
4. Concurrent animating elements capped at 6 per viewport.
5. Animation is **paused** when the tab is hidden.
6. Motion is verified in a Performance profile at 4× CPU throttling before merge — if
   frames drop, the effect is removed, not tuned.
