# 06 — Component Architecture

## O. Component Architecture

### Organising principle

Components are grouped by **what they do**, not by where they appear. A component
named `ServiceHero` is a page fragment pretending to be a component — it cannot be
reused and it encodes a layout decision inside a name.

Three layers, and dependencies only ever point downward:

```
  PAGE TEMPLATES        14, one per page type — composition only, no styling
        ↓
  SECTIONS              22 patterns from doc 04 — layout + composition
        ↓
  PRIMITIVES            typography, buttons, links, media, motion — styling
        ↓
  TOKENS                tokens.css — values
```

**A primitive never imports a section. A section never imports a template.** This is
what stops the "one giant universal page component" the brief prohibits.

### Directory structure

```
src/
├── styles/
│   ├── tokens.css                 ← the contract (doc 02)
│   ├── reset.css
│   ├── typography.css             ← type scale classes
│   └── grid.css                   ← named-line grid
│
├── components/
│   ├── primitives/
│   │   ├── Text/                  Display · Heading · Body · Eyebrow · Meta · Metric · Quote
│   │   ├── Button/                Button · ButtonGroup · IconButton
│   │   ├── Link/                  TextLink · ArrowLink · CoveringLink
│   │   ├── Media/                 Image · Figure · Video · Icon
│   │   ├── Rule/                  Hairline · SectionRule
│   │   └── Tag/                   TypeTag · StatusTag · ContentRequiredTag
│   │
│   ├── layout/
│   │   ├── Container/             full · wide · default · content · text · narrow
│   │   ├── Grid/                  Grid · GridItem (named lines, asymmetric presets)
│   │   ├── Stack/                 vertical rhythm via gap
│   │   ├── Section/               background · spacing · inverse context
│   │   └── Bleed/                 full-bleed breakout inside a container
│   │
│   ├── motion/
│   │   ├── Reveal/                the IntersectionObserver primitive
│   │   ├── StaggerGroup/
│   │   ├── StaggerItem/
│   │   └── useReducedMotion/
│   │
│   ├── navigation/
│   │   ├── Header/                Header · HeaderCondensed
│   │   ├── MegaMenu/              MegaMenu · MegaMenuPanel · PracticeColumn · FeaturedSlot
│   │   ├── MobileNav/             MobileNav · NavLevel · NavRow
│   │   ├── Breadcrumbs/
│   │   ├── SectionNav/            sticky in-page nav + mobile disclosure
│   │   ├── Footer/                Footer · FooterColumn · NapBlock
│   │   └── SkipLink/
│   │
│   ├── search/
│   │   ├── SearchTrigger/         ⌘K affordance
│   │   ├── SearchDialog/
│   │   ├── SearchResult/          title · category · description · URL
│   │   ├── SearchFilters/
│   │   └── SearchEmptyState/
│   │
│   ├── sections/                  ← the 22 patterns, S-01 … S-22
│   │   ├── NumberedList/          S-01
│   │   ├── DefinitionRail/        S-02
│   │   ├── FeatureMatrix/         S-03
│   │   ├── AccordionSet/          S-04
│   │   ├── CardGrid/              S-05  (usage-capped)
│   │   ├── ProcessTimeline/       S-06
│   │   ├── SteppedNarrative/      S-07
│   │   ├── BeforeAfter/           S-08
│   │   ├── StatementEvidence/     S-09
│   │   ├── PullQuote/             S-10
│   │   ├── ProblemConsequence/    S-11
│   │   ├── SidenoteProse/         S-12
│   │   ├── SystemDiagram/         S-13
│   │   ├── EcosystemMap/          S-14
│   │   ├── DataPanel/             S-15
│   │   ├── StatementBand/         S-16
│   │   ├── ConversionBand/        S-17
│   │   ├── RelatedRail/           S-18
│   │   ├── NextSteps/             S-19
│   │   ├── EditorialImage/        S-20
│   │   ├── PersonRow/             S-21
│   │   └── LogoRail/              S-22  (renders only with verified logos)
│   │
│   ├── heroes/                    ← H-A … H-J from doc 04
│   │   ├── HeroEditorial/         H-A
│   │   ├── HeroSplit/             H-B
│   │   ├── HeroDeclaration/       H-C
│   │   ├── HeroEvidence/          H-D  (falls back to H-A without Proof)
│   │   ├── HeroProblem/           H-E
│   │   ├── HeroTechnical/         H-F
│   │   ├── HeroCaseStudy/         H-G
│   │   ├── HeroIndustry/          H-H
│   │   ├── HeroConversion/        H-I
│   │   └── HeroListing/           H-J
│   │
│   ├── content/                   ← entity renderers (architecture doc 05)
│   │   ├── ServiceSummary/
│   │   ├── IndustryProblem/
│   │   ├── ProofPoint/            single source of truth for every metric
│   │   ├── FaqItem/
│   │   ├── ProcessStep/
│   │   ├── CtaBlock/              tier-driven
│   │   ├── TeamMember/
│   │   ├── TechItem/
│   │   └── Prose/                 rich-text renderer, measure-enforced
│   │
│   ├── forms/
│   │   ├── Form/                  submit handling, source + tier capture
│   │   ├── Field/                 label · input · helper · error
│   │   ├── Select/ TextArea/ Checkbox/
│   │   ├── FormSummary/           accessible error summary
│   │   └── ResponseCommitment/
│   │
│   └── states/
│       ├── EmptyState/            designed, never "no results"
│       ├── LoadingSkeleton/       matches final dimensions
│       ├── ErrorState/
│       └── ContentRequired/       visible in preview, never in production
│
└── templates/                     ← 14, one per page type
    ├── HomeTemplate.tsx
    ├── PracticeHubTemplate.tsx
    ├── ServiceTemplate.tsx
    ├── IndustryTemplate.tsx
    ├── IndustryCrossoverTemplate.tsx
    ├── UseCaseTemplate.tsx
    ├── CaseStudyTemplate.tsx
    ├── TechnologyTemplate.tsx
    ├── GuideTemplate.tsx
    ├── ArticleTemplate.tsx
    ├── GlossaryTemplate.tsx
    ├── ComparisonTemplate.tsx
    ├── LocationTemplate.tsx
    ├── ListingTemplate.tsx
    ├── CompanyTemplate.tsx
    ├── ConversionTemplate.tsx
    └── LegalTemplate.tsx
```

### Composability contract

Every section component accepts the same shape, which is what makes 328 pages
assemblable from a CMS without bespoke code per page:

```ts
interface SectionProps {
  eyebrow?: string;
  heading?: string;
  headingLevel?: 2 | 3;          // semantics decoupled from visual size
  lead?: string;
  background?: 'bg' | 'surface' | 'inverse' | 'inverse-alt';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  container?: 'default' | 'content' | 'text' | 'wide' | 'full';
  reveal?: boolean;
  id?: string;                   // anchor target for section nav
  children: ReactNode;
}
```

Consequences worth stating:

- **`headingLevel` is separate from visual size.** A section rendered as the second
  heading on a page uses `h2` semantically at `--text-h2`; the same section nested
  under another uses `h3` at the same visual size. This is how heading hierarchy stays
  correct across 328 assembled pages (architecture doc 06 requirement).
- **`background` sets the inverse context class**, so children never branch on "am I
  on a dark background" — the token remap in `tokens.css` handles it.
- **`spacing` and `container` are enumerated**, so no page can introduce a one-off
  value.

### Server / client boundary

Given the AI-crawler dependency, the default is **server component**. Client
components are the enumerated exception:

| Client component | Why | Cost |
|---|---|---|
| `MegaMenu` | Hover/keyboard state | ~2 KB |
| `MobileNav` | Focus trap, level state | ~2 KB |
| `SearchDialog` | Command palette, index query | ~8 KB + index, **lazy-loaded on first open** |
| `Reveal` / `StaggerGroup` | IntersectionObserver | ~1 KB |
| `AccordionSet` | Only where `<details>` is insufficient | ~0.5 KB |
| `Form` | Validation and submission | ~4 KB |
| `SectionNav` | Scroll-spy | ~1 KB |

**Everything else renders on the server.** Total interactive JS on a typical service
page: roughly 10 KB — inside the 120 KB budget with substantial headroom.

`SearchDialog` and its index are **never** in the initial bundle; they load on first
`⌘K` or click.

### Naming rules

1. Named for **what it is**, never for where it sits. `StatementBand`, not
   `HomepageSection3`.
2. No page name in a component name. If a component can only be used on one page, it
   is a template fragment, not a component.
3. Section components carry their pattern ID in a comment (`/* S-09 */`) so review
   against doc 04 is mechanical.
4. One component per directory, with its styles, types, tests and stories co-located.

### Component documentation requirement

Every component ships with a Storybook entry showing: default, all variants, **all
five states** (empty, loading, partial, full, error), the reduced-motion variant, and
the inverse-context variant. A component without a documented empty state cannot be
merged — this is the enforcement mechanism for principle P8.
