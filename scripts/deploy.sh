#!/bin/bash
set -e

echo "========================================="
echo "School SMS - Deployment Script"
echo "========================================="

# Get ACR details from Terraform output
cd infra
ACR_LOGIN_SERVER=\$(terraform output -raw acr_login_server)
ACR_NAME=\$(echo \$ACR_LOGIN_SERVER | cut -d'.' -f1)

echo "ACR: \$ACR_LOGIN_SERVER"

# Login to ACR
echo ""
echo "Step 1: Logging in to Azure Container Registry..."
az acr login --name \$ACR_NAME

# Build and push API
echo ""
echo "Step 2: Building and pushing API image..."
cd ../apps/api
docker build -t \$ACR_LOGIN_SERVER/sms-api:latest .
docker push \$ACR_LOGIN_SERVER/sms-api:latest

# Build and push Web
echo ""
echo "Step 3: Building and pushing Web image..."
cd ../web
docker build -t \$ACR_LOGIN_SERVER/sms-web:latest .
docker push \$ACR_LOGIN_SERVER/sms-web:latest

# Build and push Worker
echo ""
echo "Step 4: Building and pushing Worker image..."
cd ../worker
docker build -t \$ACR_LOGIN_SERVER/sms-worker:latest .
docker push \$ACR_LOGIN_SERVER/sms-worker:latest

echo ""
echo "✅ All images pushed successfully!"

# Update Container Apps
echo ""
echo "Step 5: Updating Container Apps..."
cd ../../infra

# Trigger Container Apps to pull new images
az containerapp revision copy \
  --name \$(terraform output -raw web_app_name 2>/dev/null || echo "ca-sms-web-dev") \
  --resource-group \$(terraform output -raw resource_group_name) \
  --image \$ACR_LOGIN_SERVER/sms-web:latest

az containerapp revision copy \
  --name \$(terraform output -raw api_app_name 2>/dev/null || echo "ca-sms-api-dev") \
  --resource-group \$(terraform output -raw resource_group_name) \
  --image \$ACR_LOGIN_SERVER/sms-api:latest

echo ""
echo "========================================="
echo "Deployment complete!"
echo "========================================="
echo ""
echo "URLs:"
terraform output
echo ""
