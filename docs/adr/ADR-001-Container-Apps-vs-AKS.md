# ADR-001: Use Azure Container Apps instead of AKS

## Status
Accepted

## Context
The School Management System is intended for:
- a GitHub portfolio demonstration,
- a test-bed Azure subscription,
- contributor-only Azure access,
- low operational overhead,
- rapid deployment using Terraform.

The solution consists of a small number of containerized workloads:
- web,
- API,
- worker.

A runtime platform decision was required between:
- Azure Container Apps,
- Azure Kubernetes Service (AKS).

## Decision
Azure Container Apps (ACA) will be used as the runtime platform.

## Alternatives Considered

### AKS
**Pros**
- full Kubernetes control
- advanced orchestration
- service mesh / operators / Helm support

**Cons**
- significantly higher complexity
- greater operational burden
- less suitable for contributor-only demo environments
- overkill for current workload size

## Rationale
Azure Container Apps provides:
- lower operational complexity,
- built-in ingress and revisions,
- easier deployment,
- better fit for demo and portfolio objectives.

## Consequences

### Positive
- faster implementation
- lower ops burden
- easier troubleshooting
- better fit for constrained Azure access

### Negative
- less flexibility than AKS
- fewer advanced Kubernetes capabilities