# Universal Payment Gateway Circuit Breaker Skeleton

## Objective

Create a reusable, production-ready Circuit Breaker architecture for any website or web application that communicates with payment gateways or other external dependencies.

The solution must be usable with:
- Static websites
- Dynamic websites
- Ecommerce platforms
- SaaS applications
- Subscription platforms
- Booking systems
- Marketplace applications
- API based applications
- Mobile or frontend clients through a backend API
- Any application that depends on a payment gateway, external API, webhook provider, database, messaging service, authentication provider, or third party service

This is a skeleton and implementation specification. Do not assume a specific payment gateway, programming language, framework, database, hosting provider, or cloud provider.

## Core Problem

Prevent a slow or unavailable dependency from causing request accumulation, thread exhaustion, connection exhaustion, timeout storms, cascading failures, duplicate payments, inconsistent order states, or complete application failure.

The Circuit Breaker must support:
1. Closed
2. Open
3. Half-Open

The implementation must fail fast when a dependency is unhealthy and recover automatically when the dependency becomes healthy.

## 1. Architecture

Implement the following logical flow:

Client
→ Application
→ Payment/Dependency Service Layer
→ Circuit Breaker
→ Timeout Policy
→ Retry Policy
→ Payment Gateway / External Dependency

For asynchronous operations:

Application
→ Job/Queue
→ Worker
→ Circuit Breaker
→ External Dependency

Never place uncontrolled retries directly around payment execution.

## 2. Configuration

All Circuit Breaker values must be configurable.

Required configuration:

- failure threshold
- failure rate threshold
- minimum request volume
- rolling window
- open state duration
- half-open test request count
- success threshold for recovery
- timeout duration
- retry count
- retry backoff
- maximum backoff
- jitter
- excluded errors
- fallback behavior
- logging level
- alert threshold

Do not hardcode these values.

## 3. Closed State

Normal requests pass through the Circuit Breaker.

Track:

- successful calls
- failed calls
- timeouts
- connection errors
- gateway errors
- HTTP status categories
- latency
- dependency availability

Calculate health using configurable thresholds.

When the configured failure condition is reached:

Closed → Open

Do not treat every business error as a technical dependency failure.

## 4. Open State

Immediately reject new dependency calls.

Return a controlled failure response.

Example:

Payment service is temporarily unavailable. Please try again later.

Do not keep the user request waiting for the failed dependency.

The application must release resources quickly.

For payment flows, never blindly report a payment as failed merely because the circuit is open. The transaction status must be determined safely.

## 5. Half-Open State

After the configured recovery interval:

Open → Half-Open

Allow only a small controlled number of test calls.

If tests succeed:

Half-Open → Closed

If tests fail:

Half-Open → Open

Prevent a traffic spike from hitting the recovering dependency.

## 6. Payment Specific Safety

Circuit Breaker must not create duplicate payments.

Every payment operation must use an idempotency key.

Store and track:

- payment request ID
- order ID
- idempotency key
- gateway transaction ID
- payment status
- request timestamp
- response timestamp
- retry count
- failure reason

Possible payment states:

- CREATED
- INITIATED
- PENDING
- SUCCESS
- FAILED
- UNKNOWN
- REFUNDED
- CANCELLED

UNKNOWN must be supported because a timeout does not prove that the gateway did not process the payment.

Never retry a payment blindly after an uncertain timeout.

First reconcile transaction status through a safe status API, webhook, or payment reconciliation mechanism.

## 7. Timeout Policy

Every external dependency call must have a bounded timeout.

Support separate timeout settings for:

- connection timeout
- request timeout
- response timeout
- webhook processing timeout

Timeouts must feed into Circuit Breaker health metrics where appropriate.

## 8. Retry Policy

Retries must be selective.

Retry only transient technical failures where the operation is safe to retry.

Use:

- exponential backoff
- maximum retry limit
- jitter
- retry budget

Never retry indefinitely.

Do not automatically retry non retryable errors.

Payment execution retries must require idempotency and transaction state validation.

## 9. Fallback Strategy

Every dependency must define a fallback.

Examples:

Payment:
- show controlled unavailable state
- preserve cart/order
- allow safe retry
- reconcile pending transaction

Product API:
- cached data

Analytics:
- queue event for later processing

Notification:
- queue message

Search:
- cached results or graceful empty state

Authentication:
- fail safely and securely

Do not expose internal stack traces or dependency details to users.

## 10. Cascading Failure Protection

Implement:

- bounded timeouts
- Circuit Breaker
- bulkheads
- connection limits
- concurrency limits
- rate limits
- queue based processing where appropriate
- retry budgets
- backpressure

The system must prevent one dependency from consuming all available application resources.

## 11. Bulkhead Isolation

Separate critical resources for:

- payment operations
- general API requests
- background jobs
- webhook processing
- administrative operations

A payment dependency failure must not exhaust resources required by unrelated application functionality.

## 12. Webhook Safety

Payment webhooks must be:

- authenticated
- validated
- idempotent
- deduplicated
- persisted before processing where required
- safely retried
- monitored

Webhook processing must not depend on the browser remaining open.

Repeated webhook delivery must not create duplicate orders, payments, refunds, or fulfillment actions.

## 13. Order and Payment Consistency

Design explicit state transitions.

Example:

Order CREATED
→ PAYMENT_INITIATED
→ PAYMENT_PENDING
→ PAYMENT_SUCCESS
→ ORDER_CONFIRMED

Failure path:

PAYMENT_INITIATED
→ PAYMENT_UNKNOWN
→ RECONCILIATION
→ PAYMENT_SUCCESS or PAYMENT_FAILED

Do not assume timeout equals payment failure.

## 14. Observability

Record:

- Circuit state
- dependency name
- request count
- success count
- failure count
- timeout count
- rejected request count
- latency
- retry count
- fallback count
- half-open test results

Provide dashboards and alerts for:

- circuit opened
- repeated circuit openings
- elevated latency
- elevated timeout rate
- payment failures
- payment UNKNOWN states
- webhook failures
- reconciliation backlog

## 15. Logging

Use structured logs.

Every relevant request should contain correlation information such as:

- request ID
- correlation ID
- order ID
- payment ID
- dependency
- circuit state
- outcome
- latency

Never log:

- card numbers
- CVV
- passwords
- access tokens
- secret API keys
- sensitive authentication data

## 16. Security

The implementation must support:

- secret management
- HTTPS
- signature validation
- webhook authentication
- least privilege
- secure logging
- PCI aware payment architecture
- environment separation
- production credential isolation

Do not expose gateway credentials in frontend code.

Payment gateway secret keys must remain server side.

## 17. Frontend Behavior

Frontend must handle:

- immediate circuit open response
- timeout
- pending payment
- unknown payment status
- duplicate submission prevention
- loading state
- retry option
- safe recovery

Disable repeated payment submission while a transaction is being processed.

Do not create duplicate payment requests from browser retries.

## 18. API Response Contract

Use a consistent error structure.

Example fields:

- success
- code
- message
- retryable
- transaction_status
- request_id
- retry_after

Do not expose internal Circuit Breaker implementation details.

## 19. Static Website Support

For a static website, the Circuit Breaker must exist in the backend or API layer that the static frontend calls.

Never attempt to store payment gateway secrets in static frontend JavaScript.

Frontend:
→ Backend Payment API
→ Circuit Breaker
→ Gateway

## 20. Dynamic Website Support

For server rendered applications:

Frontend
→ Application Server
→ Payment Service Layer
→ Circuit Breaker
→ Gateway

Keep Circuit Breaker logic in a reusable service layer.

## 21. Ecommerce Support

Protect:

- checkout
- payment authorization
- payment capture
- refunds
- order creation
- inventory reservation
- payment confirmation
- webhook processing

Prevent duplicate orders and duplicate payments.

## 22. SaaS Support

Protect:

- subscription creation
- subscription renewal
- recurring billing
- invoices
- refunds
- payment method updates
- usage based billing
- webhook processing

Separate billing failures from unrelated SaaS application functionality.

## 23. Generic Dependency Support

The same Circuit Breaker architecture must be reusable for:

- payment gateways
- email providers
- SMS providers
- WhatsApp providers
- shipping APIs
- tax APIs
- CRM APIs
- AI APIs
- cloud storage
- search services
- authentication providers
- analytics providers
- database dependent services
- any external API

Create a generic dependency interface rather than a payment only implementation.

## 24. Dependency Configuration Model

Each dependency should have configurable:

- name
- endpoint
- timeout
- failure thresholds
- retry policy
- fallback
- health check
- authentication
- monitoring
- alerting
- circuit state

Example:

Dependency: PAYMENT_GATEWAY

Circuit:
Closed → Open → Half-Open

## 25. Health Checks

Where supported, implement dependency health checks.

Do not rely only on health checks.

Real request outcomes, latency, timeout rate, and error rate must also influence dependency health.

## 26. Distributed Systems

For multiple application instances, define how Circuit Breaker state is handled.

Support either:

- instance local circuit state
- shared distributed state

Choose based on architecture.

Avoid introducing a shared state dependency that itself becomes a single point of failure.

## 27. Graceful Degradation

The application should continue operating where possible.

If payment is unavailable:

Users should still be able to:

- browse
- search
- manage their account
- review cart/order information
- save information
- receive status updates

Only payment dependent operations should be blocked.

## 28. Recovery

Recovery must be automatic.

When the dependency becomes healthy:

Half-Open
→ Closed

Gradually restore traffic where appropriate.

Do not immediately flood a recovering dependency with full traffic.

## 29. Testing

Create tests for:

- normal success
- single failure
- repeated failures
- slow dependency
- timeout
- connection failure
- HTTP 5xx
- HTTP 4xx
- gateway unavailable
- circuit opening
- fail fast
- half-open recovery
- half-open failure
- retry exhaustion
- duplicate payment request
- payment timeout
- payment UNKNOWN state
- webhook duplication
- webhook delay
- reconciliation
- application restart
- multiple application instances
- high traffic
- concurrent requests

Include load and failure testing.

## 30. Acceptance Criteria

The implementation is complete only when:

1. A dependency failure cannot block requests indefinitely.
2. Circuit Breaker automatically opens after configured failure conditions.
3. Open state fails fast.
4. Half-Open state tests recovery safely.
5. Recovery automatically closes the circuit.
6. Payment operations are idempotent.
7. Unknown payment states are safely reconciled.
8. Duplicate payments are prevented.
9. Webhooks are idempotent.
10. Retries are bounded.
11. Timeouts are bounded.
12. Bulkhead isolation exists where required.
13. Critical dependency failures do not take down unrelated application features.
14. Secrets never reach the frontend.
15. Monitoring and alerts expose circuit health.
16. Configuration is externalized.
17. The architecture works across static, dynamic, ecommerce, and SaaS projects.
18. The same architecture can protect non payment dependencies.

## 31. Implementation Deliverables

Generate:

- architecture diagram
- request flow
- state transition diagram
- configuration model
- dependency interface
- Circuit Breaker service
- timeout policy
- retry policy
- fallback policy
- payment idempotency strategy
- payment state machine
- webhook strategy
- reconciliation strategy
- logging strategy
- monitoring strategy
- alerting strategy
- security checklist
- test strategy
- failure scenarios
- deployment considerations
- environment configuration template
- developer documentation

## 32. Important Rule

Do not treat Circuit Breaker as a replacement for:

- timeout
- retry control
- idempotency
- queueing
- bulkheads
- rate limiting
- reconciliation
- monitoring

Use these mechanisms together where required.

Final principle:

Fail Fast.
Protect Resources.
Prevent Cascading Failures.
Retry Safely.
Recover Automatically.
Never Duplicate a Payment.
Reconcile Uncertain Transactions.
