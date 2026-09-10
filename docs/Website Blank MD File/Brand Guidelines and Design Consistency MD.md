# Brand Guidelines and Design Consistency

## Purpose

This document defines the brand consistency rules for the website.

The existing website's brand identity must be preserved throughout development.

Every new page, section, component, popup, form, dashboard, email interface, payment interface and system message must follow the same brand guidelines.

The goal is to make the entire website look like one professionally designed product, even when new features are added later.

---

# 1. Brand Identity

Before making any UI changes, inspect the existing website and identify:

• Brand name

• Logo

• Logo variations

• Brand colors

• Secondary colors

• Accent colors

• Typography

• Button styles

• Border radius

• Shadows

• Icon style

• Illustration style

• Image style

• Spacing system

• Layout system

• Navigation style

• Footer style

• Overall visual style

Create a reusable design system based on the existing website.

Do not create a new visual identity unless explicitly requested.

---

# 2. Brand Consistency Rule

IMPORTANT:

Every new feature must look like it was originally designed as part of the existing website.

This applies to:

• Header

• Footer

• Navigation

• Buttons

• Forms

• Login

• Registration

• Dashboard

• Payment

• Checkout

• Popups

• Modals

• Alerts

• Notifications

• Cookie banner

• Policy pages

• Blog

• Contact forms

• Google Maps

• Error pages

• Loading states

• Empty states

• Mobile interface

• Dark mode

Do not introduce unrelated design styles.

---

# 3. Logo Guidelines

Identify the existing logo and preserve it.

Define:

• Primary logo

• Light background logo

• Dark background logo

• Mobile logo

• Favicon

• App icon where applicable

• Logo dimensions

• Minimum logo size

• Logo spacing

Do not:

• Stretch the logo

• Distort the logo

• Change the logo proportions

• Add unnecessary effects

• Change the logo colors

• Apply random shadows

• Rotate the logo

Use the correct logo variation depending on the background.

---

# 4. Brand Color System

Identify the existing brand color palette.

Create centralized variables for:

• Primary

• Primary Hover

• Primary Active

• Secondary

• Accent

• Background

• Surface

• Card

• Border

• Heading

• Body Text

• Muted Text

• Link

• Success

• Warning

• Error

• Information

Example structure:

```css
:root {
  --brand-primary: ...;
  --brand-primary-hover: ...;
  --brand-secondary: ...;
  --brand-accent: ...;

  --background: ...;
  --surface: ...;
  --card: ...;

  --text-primary: ...;
  --text-secondary: ...;
  --text-muted: ...;

  --border: ...;

  --success: ...;
  --warning: ...;
  --error: ...;
  --info: ...;
}
```

Do not invent colors if an established brand palette already exists.

If colors are unclear, identify the colors from the existing website and document them before implementation.

---

# 5. Color Usage

Use colors consistently.

Primary color should generally be used for:

• Main CTAs

• Important actions

• Brand elements

• Active states

Secondary colors should support the primary brand.

Accent colors should be used selectively.

Do not use too many unrelated colors.

Functional colors such as success, warning and error should remain visually distinct from the primary brand colors.

---

# 6. Dark Mode

If Dark Mode is enabled, create a dedicated dark theme.

Do not simply invert the website colors.

Define:

• Dark background

• Dark surface

• Dark card

• Dark border

• Primary text

• Secondary text

• Muted text

• Brand primary

• Brand accent

• Success

• Warning

• Error

Ensure the brand identity remains recognizable in Dark Mode.

Logo variations must also be checked for Dark Mode.

---

# 7. Typography

Use the typography system defined in the Typography document.

Maintain consistency for:

• Font family

• Font weights

• H1

• H2

• H3

• H4

• Body

• Small text

• Labels

• Buttons

• Navigation

• Forms

• Footer

Do not introduce a different font for individual components.

---

# 8. Spacing System

Create a consistent spacing system.

Use reusable spacing values for:

• Section spacing

• Container padding

• Card padding

• Form spacing

• Button spacing

• Header spacing

• Footer spacing

• Mobile spacing

Avoid random pixel values throughout the project.

Where possible use a consistent scale such as:

4px

8px

12px

16px

24px

32px

48px

64px

80px

96px

Use the existing website's spacing if it already has an established system.

---

# 9. Border Radius

Identify the existing border radius style.

Define consistent values for:

• Buttons

• Inputs

• Cards

• Modals

• Images

• Dropdowns

• Badges

• Containers

Do not mix sharp corners, rounded corners and pill shapes without a design reason.

---

# 10. Shadows

Use a consistent shadow system.

Define:

• Small shadow

• Medium shadow

• Large shadow

• Modal shadow

• Dropdown shadow

Avoid excessive shadows.

Do not add shadows to every component.

Use shadows only where they support hierarchy.

---

# 11. Buttons

All buttons must follow the same design system.

Define:

• Primary button

• Secondary button

• Outline button

• Ghost button

• Destructive button

• Disabled button

• Loading button

Maintain consistent:

• Height

• Padding

• Font

• Font weight

• Border radius

• Icon spacing

• Hover state

• Active state

• Focus state

• Disabled state

New features must reuse the existing button component wherever possible.

---

# 12. Forms

Maintain a consistent form design.

Define:

• Input

• Textarea

• Select

• Checkbox

• Radio button

• Toggle

• File upload

• Search field

• Date picker

• Password field

Maintain consistent:

• Height

• Padding

• Border

• Radius

• Font

• Label

• Placeholder

• Focus state

• Error state

• Success state

---

# 13. Cards

All cards should follow the established design system.

Maintain consistency for:

• Border

• Radius

• Shadow

• Padding

• Heading

• Description

• Image

• Actions

Do not create a new card style for every page.

Use reusable card components.

---

# 14. Icons

Use a consistent icon library or icon style.

Do not mix:

• Different icon families

• Different stroke widths

• Random SVG styles

• Emoji as interface icons

unless explicitly required by the existing design.

Maintain consistent:

• Size

• Stroke

• Alignment

• Color

• Spacing

---

# 15. Images

Maintain a consistent image style.

Check:

• Image aspect ratios

• Border radius

• Cropping

• Quality

• Image treatment

• Overlay

• Background

Do not use visually inconsistent stock images.

Maintain the same visual style across:

• Hero images

• Service images

• Product images

• Blog images

• Team images

• Background images

---

# 16. Illustrations

If illustrations are used, maintain one consistent illustration style.

Do not mix:

• 3D illustrations

• Flat illustrations

• Cartoon illustrations

• Realistic illustrations

• Different AI generated styles

without a deliberate design decision.

---

# 17. Photography Style

If the website uses photography, maintain consistency in:

• Lighting

• Composition

• Background

• Color treatment

• Subject positioning

• Aspect ratio

• Image quality

Images should support the brand's professional identity.

---

# 18. Header Consistency

The header must remain consistent across the website.

Maintain:

• Logo position

• Navigation spacing

• Menu typography

• CTA styling

• Header height

• Background

• Sticky behavior

• Mobile navigation

Do not create different header designs for different pages unless explicitly required.

---

# 19. Footer Consistency

The footer should use the same brand system.

Maintain:

• Logo

• Typography

• Colors

• Link styling

• Social icons

• Policy links

• Contact information

• Copyright

• Spacing

All pages should use the same footer structure unless there is a specific reason otherwise.

---

# 20. Responsive Brand Consistency

Brand consistency must remain intact across:

• Desktop

• Laptop

• Tablet

• Mobile

Do not simply shrink the desktop design.

Adapt layouts while preserving:

• Colors

• Typography

• Logo

• Buttons

• Spacing

• Components

• Visual hierarchy

---

# 21. Component Reusability

Before creating a new UI component:

1. Search for an existing component.
2. Check whether it can be reused.
3. Extend the existing component if appropriate.
4. Create a new component only when necessary.

Avoid duplicate components such as:

ButtonA

ButtonB

ButtonC

when they represent the same design pattern.

Create reusable components instead.

---

# 22. Design Tokens

Where supported by the technology stack, centralize design values.

Maintain tokens for:

• Colors

• Typography

• Spacing

• Radius

• Shadows

• Breakpoints

• Button sizes

• Input sizes

• Container widths

Example:

```css
:root {
  --color-primary: ...;
  --color-secondary: ...;

  --font-family-primary: ...;

  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;

  --spacing-xs: ...;
  --spacing-sm: ...;
  --spacing-md: ...;
  --spacing-lg: ...;
  --spacing-xl: ...;
}
```

This allows future features to automatically follow the brand system.

---

# 23. Animation and Motion

Use animation consistently and purposefully.

Maintain consistent:

• Transition speed

• Hover animation

• Modal animation

• Dropdown animation

• Page transition

• Loading animation

Avoid excessive animation.

Do not use animations that negatively affect performance or accessibility.

Respect reduced motion preferences where appropriate.

---

# 24. Hover and Interaction States

Every interactive component should have clear states.

Define:

• Default

• Hover

• Active

• Focus

• Disabled

• Loading

• Error

• Success

Interactive states should remain consistent throughout the website.

---

# 25. Accessibility and Brand

Brand consistency must not compromise accessibility.

Ensure:

• Sufficient color contrast

• Visible focus states

• Readable typography

• Keyboard navigation

• Accessible buttons

• Accessible forms

• Proper labels

• Appropriate semantic HTML

Do not use brand colors in ways that make text difficult to read.

---

# 26. Content Presentation

The content itself must not be unnecessarily changed.

Maintain:

• Existing wording

• Existing business claims

• Existing service descriptions

• Existing pricing

• Existing CTAs

• Existing testimonials

• Existing company information

Brand consistency applies to how content is presented, not changing the content itself.

---

# 27. Third Party Components

If a third party component is introduced for:

• Payment

• Maps

• Authentication

• CAPTCHA

• Analytics

• Chat

• Calendar

• Forms

the component should visually integrate with the existing website wherever customization is supported.

Do not allow third party components to introduce an unrelated visual style unnecessarily.

---

# 28. Brand Compliance Check

Before completing any implementation, verify:

[ ] Correct logo is used

[ ] Correct logo proportions are maintained

[ ] Brand colors are consistent

[ ] Typography is consistent

[ ] Button styles are consistent

[ ] Form styles are consistent

[ ] Card styles are consistent

[ ] Border radius is consistent

[ ] Shadows are consistent

[ ] Icons are consistent

[ ] Images follow the brand style

[ ] Header is consistent

[ ] Footer is consistent

[ ] Dark Mode follows the brand

[ ] Mobile version follows the brand

[ ] New components follow existing design patterns

[ ] No unnecessary colors were introduced

[ ] No unnecessary fonts were introduced

[ ] No duplicate components were created

[ ] Existing content was not changed

[ ] Existing branding was not changed

[ ] Accessibility has been maintained

[ ] Performance has not been negatively affected

---

# 29. Brand Deviation Rule

If a selected feature requires a design decision that is not covered by the existing brand guidelines:

1. Identify the missing design rule.
2. Check existing components for the closest matching pattern.
3. Reuse the closest existing pattern.
4. Do not invent an unrelated design.
5. If the decision materially affects the brand identity, ask the user before making the change.

---

# 30. Final Brand Consistency Principle

The website should feel like one unified brand.

A user should not be able to tell that a feature was added later.

Every new feature must inherit the existing:

• Brand colors

• Typography

• Spacing

• Components

• Icons

• Buttons

• Forms

• Borders

• Radius

• Shadows

• Interaction states

• Responsive behavior

• Visual language

The existing brand identity is the source of truth.

Do not redesign the brand while implementing functionality.

Do not introduce unnecessary visual changes.

Do not modify existing content.

Do not create a new design system when a usable design system already exists.

The final result must look consistent, professional, responsive and intentionally designed across the entire website.