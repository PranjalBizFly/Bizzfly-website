# Audit Logs

## Objective

Maintain a reliable record of important security and business actions.

## Events

Where appropriate log:

[ ] Login  
[ ] Logout  
[ ] Failed login  
[ ] Create  
[ ] Update  
[ ] Delete  
[ ] Payment  
[ ] Refund  
[ ] Permission changes  
[ ] User changes  
[ ] Settings changes  
[ ] Data export  
[ ] Important approvals  

## Log Fields

Where appropriate:

- User
- Action
- Timestamp
- Affected resource
- Record identifier
- Result
- IP address where justified

## Privacy

Never log:

- Passwords
- API keys
- Access tokens
- Sensitive information unnecessarily

## Access

Audit logs must be protected from unauthorized modification or deletion.

## Retention

Define retention based on business, security and legal requirements.

## Monitoring

Use audit logs to investigate suspicious activity and important operational changes.