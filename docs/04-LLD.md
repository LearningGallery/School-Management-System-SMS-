# Low-Level Design (LLD)

## Purpose

This document describes the technical implementation details of the School Management System.

It is intended for:
- developers,
- DevOps engineers,
- reviewers,
- maintainers.

---

## Component Breakdown

## 1. Web Application (`sms-web`)
### Technology
- Next.js
- TypeScript
- Tailwind CSS

### Responsibilities
- login page
- dashboard rendering
- module UI
- browser-side API calls
- token storage in local storage

### Runtime
- Azure Container Apps
- Port 3000

---

## 2. API Application (`sms-api`)
### Technology
- .NET 8 Web API
- Entity Framework Core
- SQL Server provider
- JWT authentication

### Responsibilities
- login and token generation
- business logic
- CRUD APIs
- role-based authorization
- SQL access
- Blob storage integration
- health endpoint

### Runtime
- Azure Container Apps
- Port 8080

---

## 3. Worker Application (`sms-worker`)
### Technology
- .NET Worker Service

### Responsibilities
- current: heartbeat / background scaffold
- future:
  - scheduled jobs
  - reminders
  - notifications
  - report generation
  - document processing

### Runtime
- Azure Container Apps

---

## 4. Database
### Service
- Azure SQL Database

### Stores
- users
- students
- teachers
- classrooms
- attendance sessions
- attendance records
- grades
- fee payments
- announcements

---

## 5. Storage
### Service
- Azure Blob Storage

### Stores
- uploaded documents
- future profile images
- future generated reports

---

## 6. Monitoring
### Services
- Application Insights
- Log Analytics Workspace

### Usage
- request telemetry
- error tracking
- application logs
- operational diagnostics

---

## 7. Delivery & Runtime
### Services
- Azure Container Registry
- Azure Container Apps
- Azure Front Door

---

## LLD Diagram – Runtime View

```mermaid
flowchart TB
    classDef user fill:#e3f2fd,stroke:#1e88e5,color:#0d47a1,stroke-width:2px;
    classDef dev fill:#fff8e1,stroke:#f9a825,color:#e65100,stroke-width:2px;
    classDef edge fill:#fff3e0,stroke:#fb8c00,color:#e65100,stroke-width:2px;
    classDef app fill:#e8f5e9,stroke:#43a047,color:#1b5e20,stroke-width:2px;
    classDef data fill:#f3e5f5,stroke:#8e24aa,color:#4a148c,stroke-width:2px;
    classDef monitor fill:#fce4ec,stroke:#d81b60,color:#880e4f,stroke-width:2px;
    classDef registry fill:#ede7f6,stroke:#5e35b1,color:#311b92,stroke-width:2px;
    classDef iac fill:#e0f7fa,stroke:#00838f,color:#004d40,stroke-width:2px;

    DEV["👨‍💻 Developer"]:::dev
    GIT["📘 GitHub Repository"]:::dev
    CICD["⚙️ GitHub Actions / CI-CD"]:::dev
    TF["🏗️ Terraform IaC"]:::iac
    ACR[("📁 Azure Container Registry")]:::registry

    U["💻 User Browser"]:::user
    FD["🌐 Azure Front Door<br/>Standard"]:::edge

    WEB["🟩 sms-web<br/>Next.js Frontend"]:::app
    API["🟩 sms-api<br/>.NET 8 API"]:::app
    WRK["🟩 sms-worker<br/>.NET Worker"]:::app

    SQL[("🗄️ Azure SQL Database<br/>smsdb")]:::data
    BLOB[("📦 Azure Blob Storage<br/>documents")]:::data
    APPI[("📊 App Insights<br/>+ Log Analytics")]:::monitor

    DEV --> GIT
    GIT --> CICD
    CICD --> TF
    CICD --> ACR

    TF --> FD
    TF --> WEB
    TF --> API
    TF --> WRK
    TF --> SQL
    TF --> BLOB
    TF --> APPI
    TF --> ACR

    ACR --> WEB
    ACR --> API
    ACR --> WRK

    U --> FD
    FD --> WEB
    FD --> API

    API --> SQL
    API --> BLOB
    API --> APPI

    WRK --> SQL
    WRK --> BLOB
```

---

## Runtime Configuration

### API Environment Variables
- `ConnectionStrings__DefaultConnection`
- `JwtSettings__Secret`
- `JwtSettings__Issuer`
- `JwtSettings__Audience`
- `JwtSettings__ExpiryMinutes`
- `BlobStorage__ConnectionString`
- `BlobStorage__ContainerName`

### Web Environment Variables
- `NEXT_PUBLIC_API_URL`

---

## Technical Notes

### Authentication
- API validates credentials and issues JWT
- frontend stores token in local storage
- subsequent API calls include bearer token

### Schema Initialization
The current demo implementation may use `EnsureCreated()` for simplified schema creation.

### Delete Behavior
Relationships are configured with restricted delete behavior to avoid SQL multiple cascade path issues.

---

## LLD Risks / Trade-offs
- custom JWT instead of enterprise SSO
- worker is currently underutilized
- startup DB initialization is demo-oriented
- no private networking in current version
