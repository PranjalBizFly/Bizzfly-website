# Typography, Fonts and Text Consistency

The existing website's typography is part of the approved visual identity.

Do not unnecessarily change the existing fonts, text styling or typography system while implementing new features.

## 1. Existing Font Preservation

First inspect the existing website and identify:

• Primary font family  
• Secondary font family  
• Heading font  
• Body font  
• Button font  
• Navigation font  
• Font weights  
• Font sizes  
• Line heights  
• Letter spacing  
• Text colors  
• Heading colors  
• Link colors  
• Placeholder colors  

If the existing typography is already consistent and professional, preserve it.

Do not replace the existing font without a clear reason.

---

## 2. Font Loading

Use proper font loading practices.

Optimize:

• Font file size  
• Font formats  
• Font loading  
• Font display  
• Number of font weights  
• Unused font variants  

Prefer modern web font formats such as WOFF2 where available.

Do not load unnecessary font weights.

Avoid loading multiple font families unless required by the existing design.

---

## 3. Typography Hierarchy

Maintain a clear typography hierarchy.

Ensure consistent styling for:

• H1  
• H2  
• H3  
• H4  
• H5  
• H6  
• Body text  
• Small text  
• Labels  
• Captions  
• Navigation  
• Buttons  
• Forms  
• Error messages  
• Success messages  
• Footer text  

Heading hierarchy must remain logically structured for both users and search engines.

Do not use font size alone to create semantic headings.

---

## 4. Responsive Typography

Typography must work correctly across:

• Desktop  
• Laptop  
• Tablet  
• Mobile  

Make sure:

• Headings do not overflow  
• Text does not get cut off  
• Buttons remain readable  
• Navigation text fits properly  
• Paragraphs remain readable  
• Forms remain usable  
• Long words and URLs do not break the layout  

Use responsive typography where appropriate.

Do not make mobile text unnecessarily small.

---

## 5. Readability

Maintain comfortable readability.

Check:

• Font size  
• Line height  
• Paragraph width  
• Letter spacing  
• Text contrast  
• Heading spacing  
• Section spacing  

Avoid extremely long text lines.

Avoid excessive letter spacing.

Avoid very tight line heights.

Maintain sufficient contrast between text and background.

---

## 6. Font Weight Consistency

Use a consistent font weight system.

For example:

Regular for body content.

Medium for supporting content.

Semibold for buttons and important labels.

Bold for important headings where appropriate.

Do not randomly use different font weights throughout the website.

Only use font weights that are actually available in the selected font.

---

## 7. Text Color System

Maintain a consistent text color hierarchy.

Define or preserve:

• Primary text color  
• Secondary text color  
• Muted text color  
• Heading color  
• Link color  
• Hover color  
• Button text color  
• Error text color  
• Success text color  
• Warning text color  

Ensure all colors remain readable in both Light Mode and Dark Mode.

---

## 8. Dark Mode Typography

If Dark Mode is selected:

Do not simply invert all colors.

Create a proper dark mode typography system.

Ensure:

• Headings remain readable  
• Body text remains readable  
• Muted text remains visible  
• Links remain distinguishable  
• Form labels remain readable  
• Placeholder text remains visible  
• Footer text remains readable  
• Disabled text remains distinguishable  

Avoid pure white text on pure black backgrounds where it causes excessive visual contrast.

---

## 9. Text and Content Preservation

IMPORTANT:

Do not rewrite existing website content.

Do not change:

• Business descriptions  
• Service descriptions  
• Product descriptions  
• Headlines  
• Taglines  
• Pricing  
• Offers  
• Testimonials  
• Company information  
• Contact information  
• Legal information  

unless explicitly requested by the user.

Typography optimization means changing how existing text is displayed, not changing what the text says.

---

## 10. Text Overflow Protection

Prevent layout problems caused by long text.

Handle:

• Long headings  
• Long buttons  
• Long email addresses  
• URLs  
• Product names  
• Company names  
• User names  
• Error messages  
• Form validation messages  

Use appropriate wrapping, truncation or responsive behavior.

Do not hide important information simply to fix overflow.

---

## 11. Button and Form Typography

Maintain consistent typography for:

• Primary buttons  
• Secondary buttons  
• CTA buttons  
• Form labels  
• Input text  
• Placeholder text  
• Select fields  
• Checkbox labels  
• Radio button labels  
• Validation messages  

Buttons should remain readable and properly aligned on mobile devices.

---

## 12. Accessibility

Typography must meet accessibility requirements where reasonably applicable.

Check:

• Text contrast  
• Focus states  
• Font size  
• Line height  
• Interactive text size  
• Link visibility  
• Keyboard accessibility  

Do not rely only on color to communicate important information.

---

## 13. New Features Must Follow Existing Typography

Whenever implementing a selected feature such as:

• Login  
• Registration  
• Payment  
• Checkout  
• Contact Form  
• Dashboard  
• Popup  
• Modal  
• Cookie Banner  
• Privacy Policy  
• Terms and Conditions  
• Google Maps  
• Footer  
• Mobile Menu  
• Dark Mode  

the new UI must use the existing website's typography system.

Do not introduce a completely different font or design language for new components.

---

## 14. Typography Design Tokens

Where the technology stack supports it, create a centralized typography system using reusable variables or design tokens.

Maintain consistent values for:

• Font family  
• Font sizes  
• Font weights  
• Line heights  
• Letter spacing  
• Heading styles  
• Body styles  
• Button styles  

This ensures future components automatically follow the same typography system.

---

## 15. Final Typography Check

After implementation verify:

[ ] Font family is consistent

[ ] Font loading is optimized

[ ] No unnecessary fonts are loaded

[ ] No unnecessary font weights are loaded

[ ] Heading hierarchy is correct

[ ] Body text is readable

[ ] Mobile typography works correctly

[ ] Dark mode typography works correctly

[ ] Buttons use consistent typography

[ ] Forms use consistent typography

[ ] Footer typography is consistent

[ ] Legal pages use consistent typography

[ ] No text is clipped

[ ] No text causes horizontal scrolling

[ ] Text contrast is acceptable

[ ] New components follow the existing typography system

[ ] Existing website content has not been changed

# FINAL TYPOGRAPHY RULE

Preserve the existing website's typography unless there is a specific technical, accessibility or usability reason to improve it.

Do not change the website's text content.

Optimize how the existing text is displayed, loaded, structured and made responsive.

All newly implemented features must visually match the existing typography and design system.