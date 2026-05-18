# ADR-005: Decompose the application into Web, API, and Worker

## Status
Accepted

## Context
The application contains multiple concerns:
- user interface rendering,
- business logic and data access,
- background processing.

A decision was required between:
- a single monolithic application,
- a decomposed multi-component design.

## Decision
Split the solution into:
- Web (`sms-web`)
- API (`sms-api`)
- Worker (`sms-worker`)

## Alternatives Considered

### Single monolith
**Pros**
- simpler initial structure
- fewer deployable components

**Cons**
- tightly coupled concerns
- less scalable
- less aligned with cloud-native design

### Web + API only
**Pros**
- enough for current MVP
- lower complexity

**Cons**
- no dedicated background processing component
- less extensible for async workloads

## Rationale
The Web/API/Worker split provides:
- better separation of concerns,
- cleaner architecture,
- easier future extensibility,
- stronger enterprise demonstration value.

## Consequences

### Positive
- modular design
- clearer responsibilities
- optional async processing support

### Negative
- more components to deploy
- worker is not yet essential for MVP