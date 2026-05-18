# Security Guide

## Purpose

This document describes the security posture of the School Management System, including:
- current controls,
- known limitations,
- recommended production improvements.

This project is implemented in a **demo/test-bed Azure environment**, so some security decisions intentionally trade enterprise-grade controls for deployability and simplicity.

---

## Security Architecture Summary

The system applies security at multiple layers:

1. **Edge Security**
   - HTTPS entry via Azure Front Door
   - centralized public endpoint

2. **Application Security**
   - JWT-based authentication
   - role-based authorization
   - bcrypt password hashing

3. **Data Security**
   - Azure SQL encrypted transport
   - Azure Storage encrypted by platform defaults

4. **Operational Security**
   - logs and diagnostics through App Insights and Log Analytics

---

## Current Security Controls

## 1. Authentication
The application uses **custom JWT authentication**.

### Flow
1. User submits email and password to `/api/auth/login`
2. API validates credentials
3. API generates JWT token
4. Frontend stores token locally
5. Token is used in `Authorization: Bearer <token>` headers

### Why this was chosen
Entra ID was not available in the target subscription, so custom JWT was selected for demo readiness.

---

## 2. Authorization
Authorization is implemented using role-based access control.

### Current Roles
- SuperAdmin
- Teacher
- Student

### Enforcement
The API uses `[Authorize]` and `[Authorize(Roles = "...")]` attributes to protect endpoints.

---

## 3. Password Security
Passwords are hashed using **bcrypt**.

### Current Notes
- bcrypt is used for stored password hashes
- demo fallback password logic exists for test-bed convenience
- this fallback should be removed for production

---

## 4. Transport Security
The system uses HTTPS for public access.

### Current Controls
- Azure Front Door supports secure public entry
- Container Apps ingress is exposed over HTTPS

---

## 5. Secret Handling
Secrets are currently passed through environment variables.

### Current runtime secrets
- database connection string
- JWT signing secret
- storage connection string

### Current limitation
Secrets are not yet managed through Azure Key Vault.

---

## 6. Database Security
Azure SQL Database is used with encrypted transport.

### Current controls
- encrypted SQL connection string
- SQL authentication
- Azure platform-managed encryption at rest

### Current limitation
- SQL admin username/password is used directly
- no managed identity-based DB auth

---

## 7. Storage Security
Azure Blob Storage is used for document storage.

### Current controls
- platform-managed encryption at rest
- HTTPS transport

### Current limitation
- storage connection string is used directly
- no managed identity-based access yet

---

## 8. CORS
CORS is currently configured permissively for demo purposes.

### Current setting
- `AllowAnyOrigin`
- `AllowAnyMethod`
- `AllowAnyHeader`

### Production recommendation
Restrict CORS to known frontend origins only.

---

## 9. Monitoring and Auditing
Application Insights and Log Analytics collect:
- startup failures
- runtime exceptions
- health signals
- request telemetry

This improves detection and troubleshooting but is not a replacement for a formal SIEM strategy.

---

## Security Limitations in Current Demo

The following are intentionally simplified or missing:
- Entra ID / SSO
- private endpoints
- Key Vault integration
- managed identity for app-to-resource access
- WAF tuning
- IP restrictions
- secure session storage
- rate limiting
- secret rotation automation
- vulnerability scanning in CI/CD
- content security policy headers

---

## Production Hardening Recommendations

## Identity & Access
- replace custom JWT with Entra ID / External ID
- use managed identities for Azure resource access
- remove demo fallback passwords
- add stronger RBAC model (Admin, Parent, Registrar, Finance)

## Secrets
- move secrets to Azure Key Vault
- remove secrets from Terraform outputs where possible
- implement secret rotation

## Network Security
- use private endpoints for SQL and Storage
- restrict public ingress
- use Front Door WAF policies
- add IP restrictions for admin endpoints

## Application Security
- restrict CORS
- add secure headers
- add input validation and anti-abuse controls
- implement rate limiting

## Operational Security
- add alerting for auth anomalies
- add audit logging
- enable dependency scanning and image scanning
- define incident response procedures

---

## Security Responsibilities

| Area | Responsibility |
|------|----------------|
| Code security | Developers |
| Infrastructure security | DevOps / Infra engineers |
| Secrets management | Platform / DevOps |
| Monitoring & incident response | Operations / Support |
| Access governance | Application owner / Admin |

---

## Security Posture Statement
This implementation is suitable for:
- demonstration,
- learning,
- portfolio showcase,
- controlled test-bed deployment.

It is **not yet production hardened** and should be extended before real-world institutional use.