# Third Party Integration Standards

## Objective
Integrate external services without compromising security, performance, UX or maintainability.

## Common Integrations
Potential services include:
- Payment gateway
- Google Maps
- Authentication provider
- Email provider
- SMS provider
- WhatsApp provider
- Analytics
- CRM
- Calendar
- Cloud storage
- CAPTCHA

## Integration Rules
For each integration document:
- Purpose
- Provider
- Credentials
- Environment variables
- API endpoints
- Webhooks
- Data exchanged
- Failure behavior
- Rate limits
- Cost considerations

## Security
Never expose secret keys in frontend code. Validate webhook signatures where supported.

## Reliability
Handle:
- Timeouts
- Provider outages
- Invalid responses
- Duplicate callbacks
- Retry behavior

## Privacy
Only send necessary user data to third parties and follow applicable consent requirements.
