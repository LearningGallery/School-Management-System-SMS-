# Add these locals for cleaner output references
locals {
  web_app_name    = module.container_app_web.name
  api_app_name    = module.container_app_api.name
  worker_app_name = module.container_app_worker.name
}

# Random suffix for globally unique names
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# Resource Group
module "resource_group" {
  source   = "./modules/resource_group"
  name     = "rg-${var.project}-${var.env}"
  location = var.location
  tags     = var.tags
}

# Log Analytics & Application Insights
module "log_analytics" {
  source   = "./modules/log_analytics"
  name     = "log-${var.project}-${var.env}"
  rg_name  = module.resource_group.name
  location = var.location
  tags     = var.tags
}

# Azure Container Registry
module "acr" {
  source   = "./modules/acr"
  name     = "acr${var.project}${var.env}${random_string.suffix.result}"
  rg_name  = module.resource_group.name
  location = var.location
  tags     = var.tags
}

# Azure SQL Database
module "sql" {
  source         = "./modules/sql"
  server_name    = "sql-${var.project}-${var.env}-${random_string.suffix.result}"
  database_name  = "smsdb"
  rg_name        = module.resource_group.name
  location       = var.location
  admin_username = var.sql_admin_username
  admin_password = var.sql_admin_password
  tags           = var.tags
}

# Azure Storage Account
module "storage" {
  source   = "./modules/storage"
  name     = "st${var.project}${var.env}${random_string.suffix.result}"
  rg_name  = module.resource_group.name
  location = var.location
  tags     = var.tags
}

# Key Vault (optional)
module "keyvault" {
  count     = var.enable_keyvault ? 1 : 0
  source    = "./modules/keyvault"
  name      = "kv-${var.project}-${var.env}-${random_string.suffix.result}"
  rg_name   = module.resource_group.name
  location  = var.location
  tenant_id = data.azurerm_client_config.current.tenant_id
  tags      = var.tags
}

# Container Apps Environment
module "container_apps_env" {
  source                     = "./modules/container_apps_env"
  name                       = "cae-${var.project}-${var.env}"
  rg_name                    = module.resource_group.name
  location                   = var.location
  log_analytics_workspace_id = module.log_analytics.workspace_id
  tags                       = var.tags
}

# Container App - API
module "container_app_api" {
  source = "./modules/container_app"

  name                  = "ca-${var.project}-api-${var.env}"
  rg_name               = module.resource_group.name
  location              = var.location
  container_apps_env_id = module.container_apps_env.id

  #container_image          = "${module.acr.login_server}/sms-api:latest"
  container_image          = "mcr.microsoft.com/azuredocs/containerapps-helloworld:latest"
  target_port              = 8080
  #target_port              = 80
  ingress_external_enabled = true

  registry_server   = module.acr.login_server
  registry_username = module.acr.admin_username
  registry_password = module.acr.admin_password

  cpu          = "0.5"
  memory       = "1Gi"
  min_replicas = 1
  max_replicas = 3

  env_vars = [
    {
      name  = "ASPNETCORE_ENVIRONMENT"
      value = "Production"
    },
    {
      name  = "ConnectionStrings__DefaultConnection"
      value = "Server=tcp:${module.sql.server_fqdn},1433;Initial Catalog=${module.sql.database_name};User ID=${var.sql_admin_username};Password=${var.sql_admin_password};Encrypt=True;"
    },
    {
      name  = "JwtSettings__Secret"
      value = var.jwt_secret
    },
    {
      name  = "JwtSettings__Issuer"
      value = "SchoolSMS"
    },
    {
      name  = "JwtSettings__Audience"
      value = "SchoolSMS"
    },
    {
      name  = "JwtSettings__ExpiryMinutes"
      value = "480"
    },
    {
      name  = "BlobStorage__ConnectionString"
      value = module.storage.primary_connection_string
    },
    {
      name  = "BlobStorage__ContainerName"
      value = "documents"
    },
    {
      name  = "ApplicationInsights__InstrumentationKey"
      value = module.log_analytics.app_insights_instrumentation_key
    }
  ]

  tags = var.tags
}

# Container App - Web
module "container_app_web" {
  source = "./modules/container_app"

  name                  = "ca-${var.project}-web-${var.env}"
  rg_name               = module.resource_group.name
  location              = var.location
  container_apps_env_id = module.container_apps_env.id

  #container_image          = "${module.acr.login_server}/sms-web:latest"
  container_image          = "mcr.microsoft.com/azuredocs/containerapps-helloworld:latest"
  target_port              = 3000
  #target_port              = 80
  ingress_external_enabled = true

  registry_server   = module.acr.login_server
  registry_username = module.acr.admin_username
  registry_password = module.acr.admin_password

  cpu          = "0.25"
  memory       = "0.5Gi"
  min_replicas = 1
  max_replicas = 3

  env_vars = [
    {
      name  = "NEXT_PUBLIC_API_URL"
      value = "https://${module.container_app_api.fqdn}"
    },
    {
      name  = "NODE_ENV"
      value = "production"
    }
  ]

  tags = var.tags
}

# Container App - Worker (Optional)
module "container_app_worker" {
  source = "./modules/container_app"

  name                  = "ca-${var.project}-worker-${var.env}"
  rg_name               = module.resource_group.name
  location              = var.location
  container_apps_env_id = module.container_apps_env.id

  #container_image          = "${module.acr.login_server}/sms-worker:latest"
  container_image          = "mcr.microsoft.com/azuredocs/containerapps-helloworld:latest"
  target_port              = 0 # No ingress for worker
  ingress_external_enabled = false

  registry_server   = module.acr.login_server
  registry_username = module.acr.admin_username
  registry_password = module.acr.admin_password

  cpu          = "0.25"
  memory       = "0.5Gi"
  min_replicas = 1
  max_replicas = 1

  env_vars = [
    {
      name  = "ConnectionStrings__DefaultConnection"
      value = "Server=tcp:${module.sql.server_fqdn},1433;Initial Catalog=${module.sql.database_name};User ID=${var.sql_admin_username};Password=${var.sql_admin_password};Encrypt=True;"
    },
    {
      name  = "BlobStorage__ConnectionString"
      value = module.storage.primary_connection_string
    }
  ]

  tags = var.tags
}

# Azure Front Door (Optional)
module "frontdoor" {
  count  = var.enable_frontdoor ? 1 : 0
  source = "./modules/frontdoor"

  name    = "afd-${var.project}-${var.env}"
  rg_name = module.resource_group.name

  web_origin_hostname = module.container_app_web.fqdn
  api_origin_hostname = module.container_app_api.fqdn

  tags = var.tags
}

# Data source for current client config
data "azurerm_client_config" "current" {}
