# Known Issues

## Purpose

This document lists the current known limitations and caveats of the School Management System implementation.

---

## Current Known Issues

### 1. Demo-Oriented Authentication
The project uses custom JWT authentication instead of Entra ID.

**Impact:**  
Suitable for demo/test-bed use, but not enterprise SSO.

---

### 2. Demo Fallback Password Logic
The API currently includes fallback password checks for demo users.

**Impact:**  
Useful for test-bed validation, but should be removed in production.

---

### 3. Database Initialization Is Demo-Oriented
The current startup process may rely on simplified schema initialization logic.

**Impact:**  
Good for demo setup, but not ideal for production-grade migration management.

---

### 4. Worker Is Optional in MVP
The worker exists mainly as a background processing scaffold.

**Impact:**  
The project can run without it in the current MVP.

---

### 5. Frontend API URL Is Sensitive to Build/Runtime Configuration
If `NEXT_PUBLIC_API_URL` is incorrect, login and API calls fail.

**Impact:**  
Frontend deployment must be validated carefully.

---

### 6. No Private Networking
The current implementation uses public endpoints.

**Impact:**  
Not appropriate for production-grade security posture.

---

### 7. No Key Vault Integration
Secrets are not yet retrieved from Azure Key Vault.

**Impact:**  
Current secret handling is acceptable for demo but not ideal for production.

---

### 8. Front Door Is Configured at Demo Level
The current Front Door setup is sufficient for routing and HTTPS, but not fully hardened.

**Impact:**  
Additional security controls would be needed for production.

---

## Summary
These issues do not prevent the project from serving its intended purpose as:
- a working demo,
- a portfolio project,
- a reusable Azure reference implementation.

They should, however, be addressed before any production use.