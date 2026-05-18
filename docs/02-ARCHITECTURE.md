# Architecture Overview

## Purpose

This document provides an end-to-end architecture overview of the School Management System.

It explains:
- the major Azure services used,
- how requests flow through the system,
- how application components are deployed,
- how infrastructure and runtime are connected.

---

## Solution Summary

The School Management System is implemented as a containerized, cloud-native application on Azure.

The architecture consists of:
- a public entry point through Azure Front Door,
- a web frontend hosted on Azure Container Apps,
- a backend API hosted on Azure Container Apps,
- an optional worker hosted on Azure Container Apps,
- Azure SQL Database for relational data,
- Azure Blob Storage for document storage,
- Application Insights and Log Analytics for monitoring,
- Azure Container Registry for image storage.

---

## Runtime Architecture

### User Access
Users access the platform from a web browser.

### Edge Routing
Azure Front Door receives incoming requests and routes them to:
- the frontend application, or
- the backend API.

### Application Runtime
Azure Container Apps hosts:
- the web application,
- the API,
- the worker.

### Data Services
The API and worker connect to:
- Azure SQL Database,
- Azure Blob Storage.

### Monitoring
Application Insights and Log Analytics collect runtime diagnostics.

---

## Architecture Principles

### 1. Cloud-native first
Managed Azure services are preferred over self-managed infrastructure.

### 2. Separation of concerns
The application is decomposed into:
- web,
- API,
- worker.

### 3. Low operational overhead
Azure Container Apps is used instead of AKS to reduce complexity.

### 4. Demo-friendly deployment
The architecture avoids dependencies on services that require privileged tenant access.

---

## Core Azure Services Used

| Service | Role |
|---------|------|
| Azure Front Door Standard | Public entry point and routing |
| Azure Container Apps | Application runtime |
| Azure Container Registry | Image storage |
| Azure SQL Database | Relational database |
| Azure Blob Storage | Object/document storage |
| Application Insights | Application monitoring |
| Log Analytics | Log aggregation |
| Terraform | Infrastructure provisioning |

---

## Request Flow Summary

### Login Flow
1. User opens the web application.
2. Front Door routes request to the web frontend.
3. User submits credentials.
4. Frontend calls `/api/auth/login`.
5. Front Door routes API request to backend.
6. API validates user against SQL Database.
7. API returns JWT token.
8. Frontend stores token and redirects to dashboard.

### Data Access Flow
- Web never connects directly to database.
- All business operations go through the API.
- API is the primary gateway to SQL and Blob Storage.

### Background Processing Flow
- Worker can perform scheduled or asynchronous tasks.
- Current MVP uses worker mainly as a scaffold.

---

## Architecture Benefits

- easy to deploy,
- easy to explain,
- aligned with Azure-native patterns,
- suitable for constrained Azure environments,
- extensible toward more advanced enterprise designs.

---

## Architecture Trade-offs

- custom JWT instead of enterprise SSO,
- no private networking in current version,
- worker is optional in current MVP,
- current startup DB initialization is demo-oriented.

---

## Related Documents
- [High-Level Design](./03-HLD.md)
- [Low-Level Design](./04-LLD.md)
- [Security Guide](./06-SECURITY.md)
- [ADRs](./adr/)