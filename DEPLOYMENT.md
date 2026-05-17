# 🚀 Complete Deployment Guide

## Prerequisites Verification

```bash
# Check Azure CLI
az --version

# Check Terraform
terraform --version

# Check Docker
docker --version

# Login to Azure
az login

# Verify subscription
az account show
```

## Step 1: Initial Setup (5 minutes)

### 1.1 Clone and Navigate
```bash
git clone https://github.com/yourusername/school-management-system.git
cd school-management-system
```

### 1.2 Set Execute Permissions
```bash
chmod +x scripts/*.sh
```

### 1.3 Run Bootstrap
```bash
./scripts/bootstrap.sh
```

**Expected Output:**
- ✅ Terraform state storage created
- ✅ terraform.tfvars generated
- ✅ Terraform initialized

### 1.4 Update Secrets
```bash
cd infra
nano terraform.tfvars
```

**IMPORTANT: Change these values:**
```hcl
sql_admin_password = "YourStrongPassword123!"  # Must be strong
jwt_secret         = "your-generated-secret-min-32-chars"  # Already generated
```

Save and exit (Ctrl+X, Y, Enter)

---

## Step 2: Deploy Infrastructure (10-15 minutes)

### 2.1 Terraform Plan
```bash
terraform plan -out=tfplan
```

**Review the plan:**
- Should create ~15-20 resources
- Check resource names match your naming convention
- Verify no errors

### 2.2 Terraform Apply
```bash
terraform apply tfplan
```

**Wait for completion** (10-15 minutes)

### 2.3 Verify Deployment
```bash
terraform output deployment_summary
```

**Expected outputs:**
- Resource Group name
- ACR login server
- Container App URLs
- SQL Server FQDN
- Front Door endpoint (if enabled)

### 2.4 Get Credentials
```bash
# ACR credentials
terraform output acr_admin_username
terraform output acr_admin_password

# SQL connection string
terraform output connection_string_sql
```

---

## Step 3: Build and Deploy Applications (15-20 minutes)

This project supports **two build approaches**:

1. **Local Docker build + push**  
   Use this if Docker Desktop is installed locally.

2. **Azure Container Registry remote build (`az acr build`)**  
   Use this if Docker is not installed locally or you prefer cloud-side builds.

> For this demo project, **`az acr build` is recommended**, especially on constrained/local Windows setups.

---

## 3.1 Authenticate to Azure and Azure Container Registry

### Option A — Get ACR name dynamically from Terraform
#### Bash
```bash
cd infra
ACR_NAME=$(terraform output -raw acr_login_server | cut -d'.' -f1)
cd ..
az acr login --name $ACR_NAME
```

#### PowerShell
```powershell
cd infra
$ACR_NAME = (terraform output -raw acr_login_server).Split('.')[0]
cd ..
az acr login --name $ACR_NAME
```

---

### Option B — Use known ACR name directly
#### PowerShell
```powershell
az acr login --name $ACR_NAME
```

If local Docker is unavailable, you can still validate registry auth with:

```powershell
az acr login --name $ACR_NAME --expose-token
```

> Note: `--expose-token` is useful for authentication workflows, but **not required** when using `az acr build`.

---

## 3.2 Build and Push API Image

### Option A — Local Docker build
#### Bash
```bash
cd apps/api
docker build -t $ACR_NAME.azurecr.io/sms-api:v1 .
docker push $ACR_NAME.azurecr.io/sms-api:v1
```

#### PowerShell
```powershell
cd apps/api
docker build -t "$ACR_NAME.azurecr.io/sms-api:v1" .
docker push "$ACR_NAME.azurecr.io/sms-api:v1"
```

---

### Option B — Remote build in Azure ACR
#### PowerShell
```powershell
cd apps/api
az acr build --registry $ACR_NAME --image sms-api:v1 .
```

> Recommended: use versioned tags such as `v1`, `v2`, `v3` instead of only `latest` for predictable deployments.

### Expected Result
- Build completes successfully in approximately **2–5 minutes**
- Image is automatically pushed to ACR
- Output includes image digest and successful run ID

---

## 3.3 Build and Push Web Image

### Option A — Local Docker build
#### Bash
```bash
cd ../web
docker build -t $ACR_NAME.azurecr.io/sms-web:v1 .
docker push $ACR_NAME.azurecr.io/sms-web:v1
```

#### PowerShell
```powershell
cd ../web
docker build -t "$ACR_NAME.azurecr.io/sms-web:v1" .
docker push "$ACR_NAME.azurecr.io/sms-web:v1"
```

---

### Option B — Remote build in Azure ACR
#### PowerShell
```powershell
cd ../web
az acr build --registry $ACR_NAME --image sms-web:v1 .
```

### Optional: Pass API URL at build time
If your frontend depends on build-time environment variables, use:

```powershell
az acr build `
  --registry $ACR_NAME `
  --image sms-web:v2 `
  --build-arg NEXT_PUBLIC_API_URL=https://ca-sms-api-dev.nicetree-fad8d72f.southeastasia.azurecontainerapps.io `
  .
```

> Use this only if your Next.js build is consuming `NEXT_PUBLIC_API_URL` during build time.

### Expected Result
- Build completes successfully in approximately **3–7 minutes**
- Image is automatically pushed to ACR
- Output includes image digest and successful run ID

---

## 3.4 Build and Push Worker Image

### Option A — Local Docker build
#### Bash
```bash
cd ../worker
docker build -t $ACR_NAME.azurecr.io/sms-worker:v1 .
docker push $ACR_NAME.azurecr.io/sms-worker:v1
```

#### PowerShell
```powershell
cd ../worker
docker build -t "$ACR_NAME.azurecr.io/sms-worker:v1" .
docker push "$ACR_NAME.azurecr.io/sms-worker:v1"
```

---

### Option B — Remote build in Azure ACR
Since the worker Dockerfile is built from the `Apps` directory context, run:

#### PowerShell
```powershell
cd ..
az acr build --registry $ACR_NAME --image sms-worker:v1 --file worker/Dockerfile .
```

### Expected Result
- Build completes successfully in approximately **2–5 minutes**
- Image is automatically pushed to ACR

### 3.5 Alternative: Use Deployment Script
```bash
cd ../..
./scripts/deploy.sh
```

> This script can be enhanced to:
- build all images
- push to ACR
- update Container Apps
- validate revisions
- print deployment URLs

This builds and pushes all images automatically.

---

## Step 4: Update Container Apps (5 minutes)

### 4.1 Get Resource Details
```bash
cd infra
RG_NAME=$(terraform output -raw resource_group_name)
WEB_APP=$(terraform output -raw web_app_name)
API_APP=$(terraform output -raw api_app_name)
WORKER_APP=$(terraform output -raw worker_app_name)
```

### 4.2 Restart Container Apps
```bash
# This triggers pulling the latest images
az containerapp revision copy \
  --name $WEB_APP \
  --resource-group $RG_NAME \
  --image $ACR_NAME.azurecr.io/sms-web:latest

az containerapp revision copy \
  --name $API_APP \
  --resource-group $RG_NAME \
  --image $ACR_NAME.azurecr.io/sms-api:latest

az containerapp revision copy \
  --name $WORKER_APP \
  --resource-group $RG_NAME \
  --image $ACR_NAME.azurecr.io/sms-worker:latest
```

---

## Step 5: Verification (5 minutes)

### 5.1 Get Application URLs
```bash
terraform output web_app_url
terraform output api_app_url
terraform output frontdoor_endpoint
```

### 5.2 Test API Health
```bash
API_URL=$(terraform output -raw api_app_url)
curl $API_URL/health
```

**Expected:** `200 OK` or `Healthy`

### 5.3 Open Web Application
```bash
# Copy the web URL and open in browser
terraform output web_app_url
```

### 5.4 Test Login
Use these credentials:
- Email: `admin@schoolsms.com`
- Password: `Admin@123`

---

## Step 6: Monitor Application (Optional)

### 6.1 View Logs
```bash
# API logs
az containerapp logs show \
  --name $API_APP \
  --resource-group $RG_NAME \
  --follow

# Web logs
az containerapp logs show \
  --name $WEB_APP \
  --resource-group $RG_NAME \
  --follow
```

### 6.2 View Application Insights
```bash
# Get App Insights resource
az monitor app-insights component show \
  --resource-group $RG_NAME \
  --query '[].{Name:name, InstrumentationKey:instrumentationKey}' \
  --output table
```

Then open in Azure Portal.

---

## Troubleshooting

### Issue: Container App not starting

**Check logs:**
```bash
az containerapp logs show --name $API_APP --resource-group $RG_NAME
```

**Common causes:**
- Database connection string incorrect
- Missing environment variables
- Image build failed

**Fix:**
```bash
# Verify environment variables
az containerapp show --name $API_APP --resource-group $RG_NAME --query properties.template.containers[0].env

# Update if needed
az containerapp update \
  --name $API_APP \
  --resource-group $RG_NAME \
  --set-env-vars "ConnectionStrings__DefaultConnection=<new-value>"
```

### Issue: Database connection fails

**Check firewall rules:**
```bash
az sql server firewall-rule list \
  --resource-group $RG_NAME \
  --server $(terraform output -raw sql_server_name)
```

**Add your IP if needed:**
```bash
MY_IP=$(curl -s ifconfig.me)
az sql server firewall-rule create \
  --resource-group $RG_NAME \
  --server <sql-server-name> \
  --name AllowMyIP \
  --start-ip-address $MY_IP \
  --end-ip-address $MY_IP
```

### Issue: Front Door not routing

**Check origins health:**
```bash
az afd origin-group show \
  --resource-group $RG_NAME \
  --profile-name <frontdoor-name> \
  --origin-group-name web-origin-group
```

**Wait 5-10 minutes** after deployment for Front Door to propagate.

---

## Post-Deployment Tasks

### 1. Change Default Passwords
- Login as admin
- Navigate to Settings
- Change admin password
- Update teacher/student demo passwords

### 2. Configure Email (Optional)
- Set up SendGrid or Azure Communication Services
- Update environment variables

### 3. Enable Backups
```bash
# Enable automated SQL backups
az sql db ltr-policy set \
  --resource-group $RG_NAME \
  --server <sql-server-name> \
  --database smsdb \
  --weekly-retention P4W \
  --monthly-retention P12M
```

### 4. Set Up Alerts
```bash
# Create action group
az monitor action-group create \
  --resource-group $RG_NAME \
  --name sms-alerts \
  --short-name smsalert \
  --email <your-email>

# Create alert for API errors
az monitor metrics alert create \
  --resource-group $RG_NAME \
  --name api-error-alert \
  --scopes /subscriptions/<sub-id>/resourceGroups/$RG_NAME/providers/Microsoft.App/containerApps/$API_APP \
  --condition "count Http5xx > 10" \
  --window-size 5m \
  --action sms-alerts
```

---

## Cleanup

### To destroy all resources:
```bash
cd infra
terraform destroy
```

**Warning:** This will delete:
- All applications
- Database (and all data)
- Storage (and all files)
- Container images

**Type `yes` to confirm**

---

## Success Checklist

- [ ] Infrastructure deployed (terraform apply successful)
- [ ] All 3 images built and pushed to ACR
- [ ] Container Apps running (healthy status)
- [ ] Web app loads in browser
- [ ] Login works with demo credentials
- [ ] Students page shows data
- [ ] API returns data on /students endpoint
- [ ] Application Insights receiving telemetry
- [ ] No errors in container logs

---

## Next Steps

1. **Customize Application**
   - Update branding
   - Add your school logo
   - Configure email templates

2. **Add Real Data**
   - Import student records
   - Set up actual classrooms
   - Configure academic year

3. **Security Hardening**
   - Enable private endpoints (if you have permissions)
   - Configure custom domain
   - Set up SSL certificates

4. **Setup CI/CD**
   - Configure GitHub Actions secrets
   - Enable automated deployments
   - Set up staging environment

5. **Documentation**
   - Update README with your specific setup
   - Document custom configurations
   - Create user guides
```

---

## 5.5 Cost Optimization Guide

Create `COST-OPTIMIZATION.md`:

```markdown
# 💰 Cost Optimization Guide

## Current Architecture Costs (Estimated Monthly - Singapore Region)

| Service | SKU | Estimated Cost |
|---------|-----|----------------|
| Container Apps (3 apps) | Consumption | $10-30 |
| Azure SQL Database | Basic | $5 |
| Storage Account | Standard LRS | $2-5 |
| Container Registry | Basic | $5 |
| Front Door Standard | Standard | $35-50 |
| Application Insights | Pay-as-you-go | $5-10 |
| Log Analytics | Pay-as-you-go | $5-10 |
| **Total** | | **$67-115/month** |

## Cost Reduction Options

### Option 1: Remove Front Door (-$35-50/month)
Set in `terraform.tfvars`:
```hcl
enable_frontdoor = false
```

Access apps directly via Container Apps URLs.

### Option 2: Use Shared App Service Plan Instead of Container Apps
Replace Container Apps with App Service (cheaper for always-on apps).

Estimated savings: $10-20/month

### Option 3: Use Azure SQL Free Tier (if eligible)
Some subscriptions offer free SQL database tier.

Savings: $5/month

### Option 4: Stop Non-Production Hours
```bash
# Stop Container Apps at night
az containerapp update --name $APP_NAME --resource-group $RG_NAME --min-replicas 0
```

### Option 5: Use Spot Containers (when available)
Not yet available for Container Apps, but coming soon.

## Auto-Shutdown Script

Create `scripts/stop-apps.sh`:
```bash
#!/bin/bash
# Stop all apps to save costs
RG_NAME="rg-sms-dev"

az containerapp update --name ca-sms-web-dev --resource-group $RG_NAME --min-replicas 0
az containerapp update --name ca-sms-api-dev --resource-group $RG_NAME --min-replicas 0
az containerapp update --name ca-sms-worker-dev --resource-group $RG_NAME --min-replicas 0

echo "Apps stopped. Restart with start-apps.sh"
```

Create `scripts/start-apps.sh`:
```bash
#!/bin/bash
# Start all apps
RG_NAME="rg-sms-dev"

az containerapp update --name ca-sms-web-dev --resource-group $RG_NAME --min-replicas 1
az containerapp update --name ca-sms-api-dev --resource-group $RG_NAME --min-replicas 1
az containerapp update --name ca-sms-worker-dev --resource-group $RG_NAME --min-replicas 1

echo "Apps started"
```

## Monitoring Costs

```bash
# Check current month costs
az consumption usage list \
  --start-date $(date -d "$(date +%Y-%m-01)" +%Y-%m-%d) \
  --end-date $(date +%Y-%m-%d) \
  --query "[].{Service:instanceName, Cost:pretaxCost}" \
  --output table

# Set budget alert
az consumption budget create \
  --budget-name sms-monthly-budget \
  --amount 100 \
  --time-grain Monthly \
  --start-date $(date +%Y-%m-01) \
  --end-date $(date -d "+1 year" +%Y-%m-01) \
  --resource-group rg-sms-dev
```
```

---

**Your complete School Management System is now ready with:**
✅ Full Terraform infrastructure code
✅ Complete .NET 8 API with authentication
✅ Full Next.js frontend with dashboards
✅ Background worker service
✅ Deployment automation scripts
✅ GitHub Actions CI/CD
✅ Complete documentation
✅ Troubleshooting guides
✅ Cost optimization tips

**What would you like me to elaborate on next?**

1. Security hardening steps?
2. Performance optimization?
3. Multi-environment setup (dev/uat/prod)?
4. Additional features implementation?