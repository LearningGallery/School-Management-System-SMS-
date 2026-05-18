# ADR-003: Use Azure Front Door Standard instead of Premium

## Status
Accepted

## Context
The project requires:
- a secure public entry point,
- HTTPS routing,
- path-based traffic distribution,
- cost-conscious deployment.

## Decision
Use Azure Front Door Standard.

## Alternatives Considered

### Azure Front Door Premium
**Pros**
- more advanced enterprise security capabilities
- additional origin and private connectivity features

**Cons**
- higher cost
- unnecessary for current demo requirements

## Rationale
Front Door Standard provides sufficient routing and secure entry capabilities for this project while keeping cost and complexity lower.

## Consequences

### Positive
- lower cost
- simpler implementation
- enough for current requirements

### Negative
- fewer advanced enterprise features than Premium