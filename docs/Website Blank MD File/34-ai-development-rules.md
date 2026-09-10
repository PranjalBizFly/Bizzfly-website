# AI Development Rules

## Objective

Control AI coding agents so they make deliberate, safe and maintainable changes.

## Required Workflow

`Inspect → Understand → Plan → Implement → Test → Review → Report`

## Before Coding

The AI must:

[ ] Inspect existing code  
[ ] Identify technology stack  
[ ] Identify existing components  
[ ] Identify existing features  
[ ] Read relevant MD rules  
[ ] Identify dependencies  
[ ] Identify affected files  

## DO NOT

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

## Prefer

- Reusable components
- Existing utilities
- Existing design tokens
- Existing API patterns
- Existing validation
- Existing authentication
- Existing integrations

## Testing

After implementation:

[ ] Test selected feature  
[ ] Test affected existing functionality  
[ ] Test responsive behavior  
[ ] Check security  
[ ] Check SEO impact  
[ ] Check performance impact  

## Reporting

Report:

- Files changed
- Features implemented
- Dependencies added
- Tests completed
- Configuration required
- Known limitations

If an instruction conflicts with security, legal requirements or approved business rules, identify the conflict instead of silently guessing.