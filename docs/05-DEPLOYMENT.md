# Deployment Guide

## Purpose

This document explains how to deploy the School Management System from source code to Azure.

It covers:
- infrastructure provisioning,
- image builds,
- container app updates,
- validation steps.

---

## Deployment Approaches

This project supports two application build paths:

1. **Local Docker build + push**
2. **Azure Container Registry remote build (`az acr build`)**

For this project, **`az acr build` is recommended**, especially if Docker is not installed locally.

---

## Prerequisites

### Required
- Azure subscription with Contributor access
- Azure CLI installed
- Terraform 1.7+
- Git installed
- PowerShell or Bash

### Optional
- Docker Desktop

---

## Step 1 – Authenticate to Azure

```bash
az login
az account show
```

Verify that the correct subscription is selected.

---

## Step 2 – Deploy Infrastructure with Terraform

```bash
cd infra
terraform init
terraform plan
terraform apply
```

This provisions:
- resource group
- ACR
- SQL
- Storage
- Log Analytics
- Application Insights
- Container Apps environment
- Container Apps
- Front Door

---

## Step 3 – Build and Push Application Images

## 3.1 API
```bash
cd apps/api
az acr build --registry <acr-name> --image sms-api:v1 .
```

## 3.2 Web
```bash
cd ../web
az acr build --registry <acr-name> --image sms-web:v1 .
```

If needed, pass build-time API URL:
```bash
az acr build --registry <acr-name> --image sms-web:v2 --build-arg NEXT_PUBLIC_API_URL=https://<api-url> .
```

## 3.3 Worker
```bash
cd ..
az acr build --registry <acr-name> --image sms-worker:v1 --file worker/Dockerfile .
```

---

## Step 4 – Update Azure Container Apps

### API
```bash
az containerapp update --name ca-sms-api-dev --resource-group rg-sms-dev --image <acr>.azurecr.io/sms-api:v1
```

### Web
```bash
az containerapp update --name ca-sms-web-dev --resource-group rg-sms-dev --image <acr>.azurecr.io/sms-web:v1
```

### Worker
```bash
az containerapp update --name ca-sms-worker-dev --resource-group rg-sms-dev --image <acr>.azurecr.io/sms-worker:v1
```

---

## Step 5 – Validate Deployment

### Check API health
```bash
curl https://<api-url>/health
```

Expected response:
```text
Healthy
```

### Test login
Use demo credentials through browser or direct API call.

### Check latest revision
```bash
az containerapp show --name ca-sms-api-dev --resource-group rg-sms-dev --query "properties.latestRevisionName"
```

### Inspect logs
```bash
az containerapp logs show --name ca-sms-api-dev --resource-group rg-sms-dev --follow
```

---

## Step 6 – Validate Frontend Configuration

Confirm that the web app is using the correct API URL.

Check:
```bash
az containerapp show --name ca-sms-web-dev --resource-group rg-sms-dev --query "properties.template.containers[0].env"
```

Look for:
- `NEXT_PUBLIC_API_URL`

---

## Notes on Image Versioning

Use versioned tags such as:
- `sms-api:v1`
- `sms-api:v2`
- `sms-web:v1`
- `sms-worker:v1`

Avoid relying only on `latest` because it can make revision tracking harder.

---

## Rollback Procedure

If a deployment fails:
1. identify the last known-good image tag,
2. redeploy that image tag to the affected Container App,
3. validate health and logs.

Example:
```bash
az containerapp update --name ca-sms-api-dev --resource-group rg-sms-dev --image <acr>.azurecr.io/sms-api:v1
```

---

## Deployment Validation Checklist

- Terraform apply completed successfully
- ACR images built successfully
- Container Apps updated successfully
- API health endpoint returns `Healthy`
- Login works with demo credentials
- Web frontend loads successfully
- Logs show no startup exceptions