# Roadmap

## Purpose

This document outlines the planned future evolution of the School Management System.

---

## Short-Term Goals

### 1. Stabilize Deployment Experience
- finalize frontend API URL handling
- simplify runtime configuration
- improve deployment scripts

### 2. Remove Demo-Only Behaviors
- remove fallback password logic
- remove destructive DB initialization
- replace with proper migration handling

### 3. Improve User Experience
- add better role-based dashboards
- improve error messages
- add loading and empty-state handling

---

## Medium-Term Goals

### 1. Security Hardening
- integrate Azure Key Vault
- restrict CORS
- improve secret handling
- remove direct secret exposure in env vars where possible

### 2. Identity Improvements
- introduce Entra ID / External ID option
- support enterprise SSO
- add parent and admin roles

### 3. Background Processing
- extend worker for:
  - fee reminders
  - scheduled announcements
  - report generation
  - document processing

### 4. Data & API Enhancements
- add proper EF migrations
- add pagination/filtering
- improve API consistency
- add audit logging

---

## Long-Term Goals

### 1. Production Readiness
- private endpoints
- managed identities
- private networking
- WAF hardening
- secure secret rotation

### 2. Platform Maturity
- dev / uat / prod environments
- release promotion pipeline
- automated rollback strategy
- observability dashboards and alerts

### 3. Feature Expansion
- parent portal
- finance module
- timetable module
- exam and report card module
- document upload and management
- notification engine

### 4. Mobility
- mobile-friendly UX
- optional mobile app support

---

## Vision
The long-term vision is to evolve this project from a demo-ready Azure reference implementation into a production-grade, enterprise-ready school platform with stronger identity, security, automation, and operational maturity.