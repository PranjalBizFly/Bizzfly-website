# Website Security Standards

## Objective
Treat security as a mandatory engineering requirement for every production website.

## Authentication
Use:
- Secure password hashing
- Session security
- Secure cookies
- Password reset protection
- Email or OTP verification where required
- Optional MFA
- Login rate limiting
- Account lockout or progressive delay

## Authorization
Implement server side authorization for:
- Roles
- Permissions
- Admin functions
- Private resources
- API endpoints

Never rely on frontend checks alone.

## Application Security
Protect against:
- XSS
- CSRF
- SQL injection
- Command injection
- SSRF where applicable
- Path traversal
- Insecure file uploads
- Broken access control
- Credential exposure

## Secrets
Never hardcode secrets. Use environment variables or a secure secret manager.

## Security Headers
Evaluate:
- HTTPS
- HSTS
- Content Security Policy
- Referrer Policy
- Permissions Policy
- X Content Type Options

## Logging
Log security relevant events without storing passwords, tokens or unnecessary personal data.

## Rules
Fail safely. Do not expose stack traces or sensitive server errors to users. Keep dependencies updated and remove unused packages.
