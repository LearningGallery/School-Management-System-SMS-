# ADR-004: Use Azure SQL Database instead of PostgreSQL

## Status
Accepted

## Context
The backend is built on .NET 8 and Entity Framework Core and models a strongly relational domain.

## Decision
Use Azure SQL Database as the primary relational datastore.

## Alternatives Considered

### PostgreSQL
**Pros**
- open-source ecosystem
- strong relational capabilities

**Cons**
- less aligned with current stack preference
- not necessary for this project’s primary goals

## Rationale
Azure SQL Database integrates well with:
- EF Core,
- SQL Server tooling,
- enterprise-style relational modeling.

## Consequences

### Positive
- straightforward integration
- familiar enterprise relational platform
- strong Azure-native support

### Negative
- less open-source portability than PostgreSQL