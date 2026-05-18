# Troubleshooting

## Purpose

This document provides guidance for diagnosing and resolving common issues during deployment and runtime.

---

## Common Issues

## 1. Web Login Fails
### Symptoms
- login page loads
- credentials entered
- "Login failed" shown

### Likely Causes
- incorrect `NEXT_PUBLIC_API_URL`
- stale web image
- frontend built with wrong API URL
- API login endpoint not reachable

### Resolution
1. inspect browser developer tools → network tab
2. confirm API request URL is correct
3. verify web env vars
4. redeploy web with corrected API URL if required

---

## 2. API Returns 500
### Likely Causes
- DB schema missing
- bad SQL connection string
- startup initialization issue
- auth service exception

### Resolution
1. inspect API logs
2. verify `/health`
3. confirm DB tables exist
4. confirm env vars are correct

---

## 3. SQL Error 208
### Meaning
Invalid object name — table does not exist.

### Likely Causes
- schema not created
- DB initialization failed
- wrong database targeted

### Resolution
- inspect startup logs
- verify schema creation logic
- confirm SQL connection string

---

## 4. Revision Does Not Change
### Likely Causes
- same image tag reused
- update command not applied correctly

### Resolution
- use a new image tag
- run `az containerapp update`
- verify latest revision name

---

## 5. Worker Build Fails
### Likely Causes
- wrong Docker build context
- wrong Dockerfile path

### Resolution
- build from correct parent directory
- verify Dockerfile references

---

## 6. Frontend Calls Wrong API URL
### Cause
Build-time or runtime API URL is incorrect.

### Resolution
- verify `NEXT_PUBLIC_API_URL`
- rebuild web image if URL is baked at build time
- redeploy container app

---

## Useful Commands

### View logs
```bash
az containerapp logs show --name <app-name> --resource-group rg-sms-dev --follow
```

### Check health
```bash
curl https://<api-url>/health
```

### Check revision
```bash
az containerapp show --name <app-name> --resource-group rg-sms-dev --query "properties.latestRevisionName"
```
