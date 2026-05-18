# RBAC Matrix

## Purpose

This document defines the current role-based access model for the School Management System.

It describes:
- supported roles,
- permissions by feature,
- current implementation scope.

---

## Roles

### SuperAdmin
Has full administrative access to the current demo system.

### Teacher
Has operational access to teaching-related modules such as attendance and class views.

### Student
Has limited end-user access to student-facing features.

---

## Current Role Matrix

| Capability | SuperAdmin | Teacher | Student |
|------------|------------|---------|---------|
| Login | Yes | Yes | Yes |
| View dashboard | Yes | Yes | Yes |
| View students | Yes | Yes | No |
| Create students | Yes | No | No |
| View classrooms | Yes | Yes | No |
| View attendance sessions | Yes | Yes | No |
| Create attendance sessions | Yes | Yes | No |
| Mark attendance | Yes | Yes | No |
| View announcements | Yes | Yes | Yes |
| Create announcements | Yes | No | No |

---

## Enforcement Model

Authorization is enforced at the API layer using:
- `[Authorize]`
- `[Authorize(Roles = "...")]`

The frontend also uses role-based navigation, but the API is the final enforcement point.

---

## Current Limitations

The current implementation does not yet include:
- Parent role
- Registrar role
- Finance role
- granular record-level permissions
- permission administration UI

---

## Future Direction

Planned expansion may include:
- Parent role
- Admin role separate from SuperAdmin
- Fine-grained permissions
- Role management module