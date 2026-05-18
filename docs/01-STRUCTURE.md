# Project Structure

## Overview

This document explains how the repository is organized and how the major folders and files relate to one another.

The repository is structured to separate:
- infrastructure,
- application code,
- scripts,
- documentation,
- CI/CD configuration.

---

## Repository Layout

```text
School-Management-System-SMS/
├── README.md
├── docs/
├── infra/
├── apps/
│   ├── api/
│   ├── web/
│   └── worker/
├── scripts/
└── .github/
```

---

## Root-Level Files and Folders

### `README.md`
Provides the main project summary, quick links, and entry point into the documentation.

### `docs/`
Contains all project documentation, including:
- design documents,
- deployment guides,
- operational runbooks,
- troubleshooting,
- ADRs.

### `infra/`
Contains Terraform code used to provision Azure resources.

### `apps/`
Contains application source code:
- backend API,
- frontend web app,
- background worker.

### `scripts/`
Contains helper scripts for bootstrapping and deployment.

### `.github/`
Contains GitHub Actions workflow definitions.

---

## Infrastructure Folder

The `infra/` folder contains all Terraform code required to provision the platform.

### Root Terraform Files
- `main.tf` – orchestrates module usage
- `variables.tf` – input variables
- `outputs.tf` – exported outputs
- `provider.tf` – provider configuration
- `versions.tf` – Terraform and provider version constraints
- `terraform.tfvars` – environment-specific values

### Modules
Each module is self-contained and reusable.

Typical modules:
- resource group
- log analytics
- ACR
- SQL
- storage
- container apps environment
- container app
- front door

---

## Applications Folder

## `apps/api`
Contains the .NET 8 backend API.

### Responsibilities
- authentication
- authorization
- business logic
- database access
- storage integration
- health checks

### Internal Layers
- `Sms.Api` – controllers and startup
- `Sms.Application` – services and DTOs
- `Sms.Domain` – entities and domain models
- `Sms.Infrastructure` – DbContext and persistence logic

---

## `apps/web`
Contains the Next.js frontend.

### Responsibilities
- login page
- dashboard UI
- page navigation
- API integration
- role-based user experience

### Key Files
- `package.json`
- `next.config.js`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `Dockerfile`

---

## `apps/worker`
Contains the .NET worker service.

### Responsibilities
- optional background processing scaffold
- future async/scheduled jobs
- heartbeat/logging for current MVP

---

## Scripts Folder

The `scripts/` folder contains helper scripts for:
- Terraform backend bootstrap
- application deployment automation

These scripts are meant to reduce manual operational steps.

---

## Documentation Folder

The `docs/` folder is structured to support:
- business understanding,
- architecture review,
- deployment execution,
- operational support,
- governance and decision tracking.

---

## Design Principles Reflected in the Structure

1. **Separation of concerns**  
   Infrastructure, application code, and documentation are separated.

2. **Modularity**  
   Terraform modules and application layers are reusable and independently understandable.

3. **Maintainability**  
   The layout supports easy navigation and future extension.

4. **Portfolio readiness**  
   The structure is intentionally organized to communicate engineering maturity.