# Common Business Website Features

## Objective
Audit the existing website and provide a selectable checklist of common business website features.

## Mandatory Workflow
AUDIT → CHECKBOX FEATURE LIST → USER SELECTION → DEPENDENCY CHECK → IMPLEMENT SELECTED FEATURES ONLY → TEST → FINAL REPORT

## Feature Categories
Offer selectable options for:
- Appearance: light mode, dark mode, system theme, responsive design, sticky header, back to top
- Branding: favicon, app icons, web manifest, logo variants, social sharing metadata
- Navigation: desktop menu, mobile menu, dropdowns, mega menu, search, language and currency selectors
- Footer: company information, contact details, social links, privacy policy, terms, refund, cancellation, cookie, security, disclaimer and sitemap links
- Legal: privacy, terms, refund, cancellation, shipping, return, cookie, security and disclaimer pages
- Authentication: login, logout, registration, forgot password, reset password, verification, OTP, MFA, social login, profile, account deletion, roles and permissions
- Payments: gateway, UPI, cards, net banking, subscriptions, checkout, invoices, payment history, refunds, coupons and tax handling
- Leads: contact, inquiry, quote, callback, appointment, newsletter, WhatsApp, click to call, spam protection and CRM
- Maps: Google Maps, multiple locations, directions, address, business hours and LocalBusiness schema
- Communication: email, SMTP, OTP, SMS, WhatsApp, push notifications and templates
- Analytics: GA4, GTM, Search Console, Clarity, pixels and conversion tracking
- SEO: titles, metadata, sitemap, robots, canonical, schema, Open Graph, internal links and image SEO
- AEO/AIO/GEO: semantic structure, entity signals, structured data and AI search understanding
- Security: HTTPS, headers, CSRF, XSS, injection protection, rate limiting, secure uploads, sessions and audit logs
- Performance: image optimization, caching, CDN, compression, code splitting, fonts and Core Web Vitals
- Errors: 404, 403, 500, maintenance, offline and API/payment error handling
- Forms: validation, uploads, CAPTCHA, success/error messages, storage and CRM integration
- Search: website search, suggestions, filters, pagination and no-results handling
- Admin: users, roles, permissions, content, leads, orders, payments, analytics and audit logs
- Integrations: CRM, ERP, WhatsApp, SMS, email, payment, maps, calendars, storage, webhooks and APIs
- Backup: database, files, retention, restore, monitoring and uptime

## Rules
Mark each item as:
- Already Available
- Not Available
- Needs Improvement

Stop after presenting the checklist. Wait for user selection. Implement only selected features. Never invent credentials, business information, reviews, locations or legal claims.

## Security
Use environment variables for secrets. Never expose API keys in frontend code.
