# ADR-002: Use Custom JWT Authentication instead of Entra ID

## Status
Accepted

## Context
The target Azure subscription does not provide tenant-level identity administration.  
The project still requires a working authentication model for:
- login,
- role-based access,
- protected API endpoints.

## Decision
Use custom JWT-based authentication for the current implementation.

## Alternatives Considered

### Entra ID / External ID
**Pros**
- enterprise SSO
- centralized identity
- production-grade governance

**Cons**
- unavailable in current subscription context
- requires tenant administration
- increases setup complexity for demo environment

## Rationale
Custom JWT authentication provides a practical working solution that can be deployed without additional tenant-level dependencies.

## Consequences

### Positive
- deployable in constrained environments
- easy to demonstrate
- independent of tenant administration

### Negative
- not enterprise SSO
- not ideal for production identity governance