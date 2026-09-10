# SEO URL Structure and URL Architecture

## Objective

Create clean, logical, scalable and search engine friendly URL structures for the entire website.

URLs must be designed for both users and search engines while preserving existing URLs whenever possible.

## 1. URL Audit

Audit:
- Existing URLs
- URL patterns
- Duplicate URLs
- Query parameters
- Trailing slash behavior
- HTTP and HTTPS versions
- www and non www versions
- Redirects
- Canonical URLs
- Broken URLs
- Orphan URLs
- Sitemap URLs
- Internal links

Do not change URLs simply for cosmetic reasons.

## 2. URL Principles

URLs should generally be:
- Short
- Descriptive
- Human readable
- Relevant
- Consistent
- Stable
- Lowercase
- Hyphen separated

Example:

`/services/web-development/`

Avoid:

`/page?id=12345`

Avoid:

`/WebDevelopmentPage123`

## 3. Naming Rules

Use lowercase URLs and hyphens between words.

Do not use keyword stuffing or unnecessarily long keyword rich URLs.

## 4. URL Hierarchy

Use a logical structure.

Example:

`/services/`

`/services/web-development/`

`/services/web-development/ecommerce-development/`

`/products/`

`/products/product-name/`

`/blog/`

`/blog/article-name/`

Do not create unnecessarily deep URLs.

## 5. Existing URL Preservation

Before changing an existing URL, check:
- Indexing
- Traffic
- Internal links
- External references
- Analytics history
- Sitemap
- Canonical
- Backlinks where data is available

Preserve valuable existing URLs whenever possible.

## 6. 301 Redirects

If an existing URL must change, create a permanent 301 redirect from the old URL to the closest relevant new URL.

Do not redirect every old URL to the homepage.

Avoid redirect chains and loops.

## 7. Canonical URLs

Every indexable page should have the correct canonical URL.

Canonical URLs should use:
- HTTPS
- Preferred hostname
- Preferred trailing slash convention
- Correct page URL

## 8. Trailing Slash

Choose one convention, such as:

`/services/`

or:

`/services`

Do not allow both versions to behave as separate indexable URLs.

## 9. HTTPS and Hostname

Use HTTPS in production.

Choose either www or non www as the preferred hostname and redirect the alternative.

Keep canonical URLs consistent.

## 10. Query Parameters

Audit parameters such as:

`?id=`

`?page=`

`?sort=`

`?filter=`

`?utm_source=`

Determine whether each parameter creates unique content, duplicate content, filtering, pagination or tracking.

Do not automatically block every parameter.

Tracking parameters must not create duplicate canonical URLs.

## 11. Pagination

Use a stable, crawlable pagination structure where required.

Ensure pagination links are discoverable and do not create unnecessary duplicate content.

## 12. Filters and Search URLs

For ecommerce, directories and large websites, carefully control:
- Filters
- Sorting
- Faceted navigation
- Search result URLs

Prevent uncontrolled combinations from becoming indexable.

## 13. Blog URLs

Use a stable structure such as:

`/blog/article-name/`

Avoid frequent URL changes.

## 14. Service URLs

Use clear service URLs such as:

`/services/seo/`

`/services/web-development/`

Do not create separate pages for every keyword variation when the underlying service is the same.

## 15. Product URLs

Use stable product slugs.

Avoid unnecessary:
- Product IDs
- Prices
- Dates
- Session values
- Tracking parameters

## 16. Location URLs

Only create location URLs for genuine business locations or genuinely served areas.

Example:

`/locations/pune/`

Never create fake location pages or mass generated duplicate location pages.

## 17. Date Based URLs

Avoid dates for evergreen business content unless there is a genuine content reason.

Prefer:

`/services/seo/`

over:

`/2026/08/seo-services/`

## 18. Case and Special Characters

Use lowercase URLs.

Avoid unnecessary special characters and spaces.

Do not allow `/Services/` and `/services/` to become separate pages.

## 19. International URLs

For multilingual websites, define one consistent localization strategy and correctly implement:
- hreflang
- Canonicals
- Localized metadata
- Language URLs

## 20. Sitemap Consistency

Every URL in the XML sitemap should:
- Be canonical
- Return HTTP 200
- Be indexable
- Be the preferred URL
- Not redirect
- Not return an error

## 21. Internal Links

Internal links should point directly to the preferred canonical URL.

Check:
- Navigation
- Footer
- Breadcrumbs
- CTAs
- Related content
- Blog links
- Service links
- Product links

## 22. Breadcrumbs

Breadcrumbs must reflect the actual website hierarchy and link directly to preferred URLs.

Where applicable implement BreadcrumbList structured data.

## 23. Deleted URLs

For deleted pages:
1. Use a 301 when a highly relevant replacement exists.
2. Otherwise return an appropriate 404 or 410 where suitable.
3. Remove the deleted URL from internal links and sitemap.

Do not redirect every deleted page to the homepage.

## 24. URL and SEO Alignment

Keep these signals aligned:

URL → Page Title → H1 → Main Topic → Content → Internal Links → Schema

The URL must accurately describe the actual page.

## 25. URL Security

Never place the following in URLs:
- Passwords
- API keys
- Access tokens
- Session secrets
- Payment secrets
- Unnecessary personal information

## 26. Analytics Parameters

Tracking parameters may be used for analytics, but should not create duplicate indexable pages.

Keep clean canonical URLs and clean sitemap URLs.

## 27. URL Governance

Maintain a URL inventory containing:
- Current URL
- Page name
- Page type
- Primary topic
- Canonical URL
- Indexability
- Redirect status
- Previous URL
- New URL
- Last updated date

## 28. URL Change Protection

Before deploying URL changes:
- Record existing URLs
- Generate redirect mappings
- Test redirects
- Test canonicals
- Test sitemap
- Test internal links
- Check analytics
- Monitor search visibility after deployment

Never make bulk URL changes without a redirect and validation plan.

## 29. Final Validation Checklist

[ ] HTTPS is used

[ ] Preferred hostname is consistent

[ ] URLs are lowercase

[ ] Words use hyphens

[ ] URLs are descriptive

[ ] URLs are not unnecessarily long

[ ] Keywords are used naturally

[ ] No keyword stuffing exists

[ ] Valuable existing URLs are preserved

[ ] Changed URLs have 301 redirects

[ ] No redirect chains exist

[ ] No redirect loops exist

[ ] Canonicals are correct

[ ] Sitemap contains canonical URLs

[ ] Internal links use preferred URLs

[ ] Breadcrumbs use preferred URLs

[ ] Query parameters are handled correctly

[ ] Pagination is handled correctly

[ ] Filters do not create uncontrolled indexable URLs

[ ] Deleted URLs are handled correctly

[ ] No sensitive information exists in URLs

[ ] Structured data uses correct URLs

[ ] Open Graph URLs are correct

[ ] URL changes have been tested

# Final Rule

URL structure is part of the website's long term SEO architecture.

Do not change URLs merely to make them look different.

Every URL change must consider SEO, redirects, internal links, canonicals, sitemap, analytics and existing search visibility before deployment.
