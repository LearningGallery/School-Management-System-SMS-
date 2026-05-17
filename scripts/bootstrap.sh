#!/bin/bash
set -e

echo "========================================="
echo "School SMS - Bootstrap Script"
echo "========================================="

# Variables
RESOURCE_GROUP="rg-sms-dev"
LOCATION="southeastasia"
TFSTATE_RG="rg-tfstate-sms"
TFSTATE_STORAGE="sttfstatesms"
TFSTATE_CONTAINER="tfstate"

echo ""
echo "Step 1: Creating Terraform backend storage..."
az group create --name \$TFSTATE_RG --location \$LOCATION

az storage account create \
  --name \$TFSTATE_STORAGE \
  --resource-group \$TFSTATE_RG \
  --location \$LOCATION \
  --sku Standard_LRS \
  --encryption-services blob

STORAGE_ACCOUNT_KEY=\$(az storage account keys list \
  --resource-group \$TFSTATE_RG \
  --account-name \$TFSTATE_STORAGE \
  --query '.value' -o tsv)

az storage container create \
  --name \$TFSTATE_CONTAINER \
  --account-name \$TFSTATE_STORAGE \
  --account-key \$STORAGE_ACCOUNT_KEY

echo "✅ Terraform backend storage created"

echo ""
echo "Step 2: Creating terraform.tfvars..."
SUBSCRIPTION_ID=\$(az account show --query id -o tsv)

cat > infra/terraform.tfvars <<EOF
subscription_id = "\$SUBSCRIPTION_ID"

project  = "sms"
env      = "dev"
location = "southeastasia"

sql_admin_username = "sqladmin"
sql_admin_password = "P@ssw0rd123!Strong"  # CHANGE THIS!
jwt_secret         = "\$(openssl rand -base64 32)"

enable_frontdoor = true
enable_keyvault  = false

tags = {
  project     = "school-management-system"
  environment = "dev"
  managed_by  = "terraform"
  owner       = "github-demo"
}
EOF

echo "✅ terraform.tfvars created"

echo ""
echo "Step 3: Initialize Terraform..."
cd infra

# Uncomment backend in versions.tf
sed -i 's/# backend/backend/g' versions.tf
sed -i 's/#   /  /g' versions.tf

terraform init \
  -backend-config="resource_group_name=\$TFSTATE_RG" \
  -backend-config="storage_account_name=\$TFSTATE_STORAGE" \
  -backend-config="container_name=\$TFSTATE_CONTAINER" \
  -backend-config="key=dev.terraform.tfstate"

echo "✅ Terraform initialized"

echo ""
echo "========================================="
echo "Bootstrap complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Review and update infra/terraform.tfvars (especially passwords!)"
echo "2. Run: cd infra && terraform plan"
echo "3. Run: terraform apply"
echo ""
