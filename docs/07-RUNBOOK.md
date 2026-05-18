# Operations Runbook

## Purpose

This runbook describes how to operate, validate, and recover the School Management System in Azure.

It is intended for:
- operators,
- DevOps engineers,
- support personnel,
- maintainers.

---

## System Components

| Component | Azure Service | Purpose |
|----------|---------------|---------|
| Web | Azure Container Apps | Frontend UI |
| API | Azure Container Apps | Business logic and auth |
| Worker | Azure Container Apps | Background processing |
| Database | Azure SQL Database | Relational data |
| Storage | Azure Blob Storage | Document/file storage |
| Edge | Azure Front Door | Public routing |
| Monitoring | App Insights + Log Analytics | Telemetry and logs |

---

## Standard Operating Procedures

## 1. Check Service Health

### API Health
```bash
curl https://<api-url>/health
```

Expected response:
```text
Healthy
```

### Web Access
Open the web URL in a browser and verify the login page loads.

---

## 2. Check Container App Logs

### API
```bash
az containerapp logs show --name ca-sms-api-dev --resource-group rg-sms-dev --follow
```

### Web
```bash
az containerapp logs show --name ca-sms-web-dev --resource-group rg-sms-dev --follow
```

### Worker
```bash
az containerapp logs show --name ca-sms-worker-dev --resource-group rg-sms-dev --follow
```

---

## 3. Check Current Revision

### API
```bash
az containerapp show --name ca-sms-api-dev --resource-group rg-sms-dev --query "properties.latestRevisionName"
```

### Web
```bash
az containerapp show --name ca-sms-web-dev --resource-group rg-sms-dev --query "properties.latestRevisionName"
```

### Worker
```bash
az containerapp show --name ca-sms-worker-dev --resource-group rg-sms-dev --query "properties.latestRevisionName"
```

---

## 4. Deploy a New Image

### API
```bash
az containerapp update --name ca-sms-api-dev --resource-group rg-sms-dev --image <acr>.azurecr.io/sms-api:v2
```

### Web
```bash
az containerapp update --name ca-sms-web-dev --resource-group rg-sms-dev --image <acr>.azurecr.io/sms-web:v2
```

### Worker
```bash
az containerapp update --name ca-sms-worker-dev --resource-group rg-sms-dev --image <acr>.azurecr.io/sms-worker:v2
```

---

## 5. Validate Login

### API Login Test
```powershell
$body = @{
  email = "admin@schoolsms.com"
  password = "Admin@123"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "https://<api-url>/api/auth/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

Expected:
- token returned
- email/role/userId returned

---

## Operational Scenarios

## Scenario A – Web Login Fails
### Symptoms
- browser shows "Login failed"
- login page loads but auth does not complete

### Checks
1. verify API health endpoint
2. verify `NEXT_PUBLIC_API_URL`
3. inspect browser network tab
4. inspect API logs

### Likely causes
- wrong API URL in web build
- stale web image
- API auth error
- CORS issue

---

## Scenario B – API Returns 500
### Checks
1. inspect API logs
2. verify DB schema exists
3. confirm runtime env vars
4. confirm JWT secret is present

### Likely causes
- DB schema issue
- bad connection string
- startup initialization issue
- auth exception

---

## Scenario C – New Image Does Not Appear to Deploy
### Checks
1. confirm ACR build succeeded
2. use a new image tag
3. verify latest revision changed
4. use `az containerapp update`

### Likely causes
- same image tag reused
- revision not refreshed
- wrong container app name

---

## Scenario D – Worker Is Not Running
### Checks
1. inspect worker logs
2. confirm worker image exists in ACR
3. confirm worker app updated successfully

### Notes
The worker is optional for current MVP operation.

---

## Recovery Procedures

## Recover API
1. redeploy last known-good image tag
2. verify revision
3. check logs
4. validate `/health`

## Recover Web
1. redeploy last known-good web image
2. verify `NEXT_PUBLIC_API_URL`
3. reload browser

## Recover Database
Because the demo may recreate schema on startup:
- restart API if schema must be rebuilt
- note that destructive startup behavior can reset data

---

## Planned Improvements
- remove destructive DB startup behavior
- add proper migration-based schema management
- introduce automated rollback logic
- add alerting for failures
- document image promotion strategy