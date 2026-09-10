# Additional Website Development Standards

## Purpose

This document covers the remaining engineering standards that should be applied to a professional, reusable business website development framework.

The AI must read this document together with the project's existing website development MD files.

---

# 1. Browser and Device Compatibility

Test the website across:

- Chrome
- Edge
- Firefox
- Safari
- Android Chrome
- iOS Safari
- Desktop
- Laptop
- Tablet
- Mobile
- Small and large screen sizes

Verify:

- Responsive layouts
- No horizontal scrolling
- Navigation
- Forms
- Buttons
- Images
- Tables
- Modals
- Dropdowns
- Touch interactions
- Keyboard interactions
- Dark mode
- Typography

Do not assume that desktop Chrome represents all users.

---

# 2. Forms and Validation

For every form, provide appropriate:

- Labels
- Required field handling
- Email validation
- Phone validation
- Password validation
- File type validation
- File size validation
- Date validation
- Inline errors
- Success messages
- Loading states
- Duplicate submission protection

Important validation must happen on the server.

Protect forms against:

- Spam
- XSS
- Injection
- CSRF where applicable
- Malicious uploads

Where selected, support:

- Email notification
- CRM integration
- Database storage
- WhatsApp
- SMS
- Analytics
- CAPTCHA

---

# 3. Search and Discovery

For websites requiring search, support where appropriate:

- Global search
- Search suggestions
- Search results
- Filters
- Sorting
- Categories
- Pagination
- No result states
- Typo handling

Search must be accessible and keyboard friendly.

Do not allow uncontrolled search result URLs to become indexable.

Track useful search behavior where analytics is enabled, such as:

- Search terms
- No result searches
- Filter usage
- Result clicks

Respect applicable privacy requirements.

---

# 4. Notification System

Where required, support:

- Toast notifications
- In app notifications
- Email
- SMS
- WhatsApp
- Push notifications
- Admin alerts

Support states such as:

- Read
- Unread
- Success
- Warning
- Error
- Information

Where applicable provide notification preferences.

Handle:

- Provider failures
- Retries
- Duplicate delivery
- Delivery status
- Rate limits

Do not expose unnecessary sensitive information in notifications.

---

# 5. Roles, Permissions and Access Control

Define only the roles required by the project.

Typical roles may include:

- Super Admin
- Admin
- Manager
- Staff
- Customer

Permissions may include:

- Create
- Read
- Update
- Delete
- Export
- Approve
- Publish
- Manage settings

Authorization must be enforced server side.

Never trust role or permission values supplied by the frontend.

Where required, restrict access by:

- Organization
- Company
- Department
- Location
- Ownership

Important permission changes should be recorded in audit logs.

---

# 6. Data Import and Export

Where required support:

- CSV import
- Excel import
- CSV export
- Excel export
- PDF export
- Bulk upload
- Bulk update

Import should provide:

- File validation
- Preview
- Column mapping
- Duplicate detection
- Error reporting
- Safe rollback or transaction handling

Export must respect user permissions.

Validate uploaded files and protect against malicious files.

For large datasets, use streaming or background processing where appropriate.

---

# 7. Audit Logs

Record important business and security actions where applicable:

- Login
- Logout
- Failed login
- Create
- Update
- Delete
- Payment
- Refund
- Permission changes
- User changes
- Settings changes
- Data exports
- Important approvals

Where appropriate record:

- User
- Action
- Timestamp
- Affected resource
- Record identifier
- Result
- IP address where justified

Never log:

- Passwords
- API keys
- Access tokens
- Sensitive information unnecessarily

Protect audit logs from unauthorized modification.

Define an appropriate retention period.

---

# 8. Search Engine and Platform Verification

Where applicable configure:

- Google Search Console
- Bing Webmaster Tools
- Google Analytics
- Google Tag Manager
- Google Business Profile
- Google Merchant Center

Supported verification methods may include:

- DNS verification
- HTML meta tag
- Verification file
- Platform integration

Use production domain verification carefully.

Document the verification method and ownership details for future maintenance.

---

# 9. Structured Data and Schema

Implement Schema.org structured data only where it accurately represents the website.

Possible types include:

- Organization
- LocalBusiness
- WebSite
- WebPage
- Service
- Product
- Article
- BreadcrumbList
- FAQPage when genuine
- Person
- Event
- Review when legitimately supported

Schema must match visible content.

Never create:

- Fake reviews
- Fake ratings
- Fake FAQs
- Fake prices
- Fake locations
- False certifications

Prefer valid JSON LD where appropriate.

Avoid duplicate or conflicting schema.

Validate structured data after implementation.

---

# 10. Website Migration

When rebuilding, redesigning, replatforming or replacing an existing website, first record:

- Existing URLs
- Titles
- Meta descriptions
- Canonicals
- Sitemap
- Analytics
- Important pages
- Redirects
- Structured data
- Images
- Internal links

Create an explicit mapping:

Old URL → New URL → Redirect Status

Preserve where possible:

- Existing content
- Search visibility
- Important URLs
- Analytics
- Tracking
- Forms
- Integrations
- Business functionality

Before launch test:

- Redirects
- Canonicals
- Sitemap
- Robots.txt
- Forms
- Analytics
- Mobile
- Performance
- Structured data
- Authentication

Monitor traffic, indexing, errors and conversions after migration.

Do not immediately destroy the old environment before migration validation is complete.

---

# 11. AI Development Rules

The AI coding agent must follow:

Inspect → Understand → Plan → Implement → Test → Review → Report

Before coding:

1. Inspect the existing code.
2. Identify the technology stack.
3. Identify existing components.
4. Identify existing features.
5. Read the relevant MD rules.
6. Identify dependencies.
7. Identify affected files.

DO NOT:

- Rewrite unrelated content
- Delete working functionality
- Change the technology stack without approval
- Install unnecessary packages
- Duplicate existing components
- Expose secrets
- Invent credentials
- Invent business information
- Make unrequested design changes
- Change URLs without SEO migration handling

Prefer:

- Reusable components
- Existing utilities
- Existing design tokens
- Existing API patterns
- Existing validation
- Existing authentication
- Existing integrations

After implementation:

- Test the selected feature
- Test affected existing functionality
- Check responsive behavior
- Check security
- Check SEO impact
- Check performance impact

Report:

- Files changed
- Features implemented
- Dependencies added
- Tests completed
- Configuration required
- Known limitations

If an instruction conflicts with security, legal requirements or approved business rules, identify the conflict instead of silently guessing.

---

# 12. Website Launch Checklist

## Infrastructure

[ ] Domain configured

[ ] DNS verified

[ ] HTTPS active

[ ] SSL valid

[ ] Production environment configured

[ ] Environment variables configured

[ ] Database ready

[ ] Backup configured

[ ] Monitoring configured

## Website

[ ] Homepage works

[ ] Navigation works

[ ] Mobile menu works

[ ] Footer works

[ ] Favicon works

[ ] 404 page works

[ ] Error handling works

[ ] Forms work

[ ] Login works where applicable

[ ] Logout works

[ ] Password reset works

[ ] Payments work where applicable

[ ] Emails work

[ ] WhatsApp works where applicable

[ ] Google Maps works where applicable

## SEO

[ ] Titles checked

[ ] Meta descriptions checked

[ ] H1 hierarchy checked

[ ] Canonicals checked

[ ] Sitemap works

[ ] Robots.txt works

[ ] Redirects tested

[ ] Internal links checked

[ ] Schema validated

[ ] Open Graph checked

[ ] SEO URLs checked

[ ] No accidental noindex exists

## Analytics

[ ] GA4 configured

[ ] GTM configured where required

[ ] Search Console verified

[ ] Conversion events tested

[ ] No duplicate tracking exists

## Security

[ ] HTTPS enforced

[ ] Security headers checked

[ ] Authentication tested

[ ] Authorization tested

[ ] Rate limiting checked

[ ] File upload security checked

[ ] Secrets protected

[ ] Production errors do not expose sensitive details

## Performance

[ ] Mobile performance checked

[ ] Desktop performance checked

[ ] Images optimized

[ ] Fonts optimized

[ ] Core Web Vitals checked

[ ] No unnecessary scripts loaded

## Accessibility

[ ] Keyboard navigation tested

[ ] Focus states visible

[ ] Forms have labels

[ ] Images have appropriate ALT text

[ ] Contrast checked

[ ] Reduced motion considered

## Legal and Privacy

[ ] Privacy Policy available

[ ] Terms available

[ ] Refund Policy available where required

[ ] Cookie Policy available where required

[ ] Consent behavior checked

[ ] Legal content reviewed for the actual business

## Browser Testing

[ ] Chrome

[ ] Edge

[ ] Firefox

[ ] Safari

[ ] Android

[ ] iOS

## Final

[ ] Backup verified

[ ] Rollback plan ready

[ ] Stakeholder approval received

[ ] Documentation updated

[ ] Launch monitoring enabled

# Final Principle

A website is not production ready merely because the pages look correct.

It should also be:

- Secure
- Accessible
- Responsive
- Search friendly
- Fast
- Testable
- Maintainable
- Recoverable
- Measurable
- Properly documented

All selected features must be implemented without unnecessarily changing approved business content, branding, URLs or existing working functionality.
