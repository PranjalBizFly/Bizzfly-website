# Master Website Development Rules

## Purpose
This file is the top level instruction set for a reusable website development system.

## Rule Priority
Always follow this order:

1. Existing business requirements
2. User selected features
3. Security
4. Existing approved content and functionality
5. Brand and UI consistency
6. Accessibility
7. SEO and search visibility
8. Performance
9. Maintainability

## Required Process

AUDIT
→ DISCOVERY
→ FEATURE CHECKLIST
→ USER SELECTION
→ DEPENDENCY CHECK
→ IMPLEMENTATION PLAN
→ DEVELOPMENT
→ TESTING
→ SECURITY CHECK
→ SEO CHECK
→ PERFORMANCE CHECK
→ ACCESSIBILITY CHECK
→ REGRESSION TEST
→ DOCUMENTATION
→ FINAL REPORT

## Existing Website Rule
Do not redesign or rewrite the existing website unless explicitly requested.

Preserve:
- Content
- Business information
- Brand identity
- Working functionality
- URLs where possible
- Existing integrations

## Feature Selection
The AI must first generate a checkbox list of available common features. The user selects what is required. Implement only selected features.

## Reusability
Prefer:
- Reusable components
- Shared layouts
- Design tokens
- Shared validation
- Shared API utilities
- Shared error handling
- Shared authentication
- Central configuration

Avoid duplicate implementations.

## Security
Never expose secrets. Never trust client side authorization. Validate server side. Use secure authentication and input handling.

## Quality
Every selected feature must be tested on desktop and mobile and must not break existing functionality.

## Final Report
Return:
- Implemented features
- Already existing features
- Unselected features
- Configuration required
- Tests completed
- Known issues
- Recommended next steps

## Source of Truth
When a conflict exists, do not silently guess. Identify the conflict and request clarification when the decision materially affects business, security, legal compliance or brand identity.
