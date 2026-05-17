output "resource_group_name" {
  value       = module.resource_group.name
  description = "Resource group name"
}

output "resource_group_id" {
  value       = module.resource_group.id
  description = "Resource group ID"
}

output "acr_name" {
  value       = split(".", module.acr.login_server)[0]
  description = "Azure Container Registry name"
}

output "acr_login_server" {
  value       = module.acr.login_server
  description = "ACR login server URL"
}

output "sql_server_fqdn" {
  value       = module.sql.server_fqdn
  description = "SQL Server FQDN"
}

output "sql_database_name" {
  value       = module.sql.database_name
  description = "SQL Database name"
}

output "storage_account_name" {
  value       = module.storage.account_name
  description = "Storage account name"
}

output "storage_blob_endpoint" {
  value       = module.storage.primary_blob_endpoint
  description = "Storage blob endpoint"
}

output "web_app_name" {
  value       = local.web_app_name
  description = "Web container app name"
}

output "web_app_url" {
  value       = "https://${module.container_app_web.fqdn}"
  description = "Web application URL"
}

output "api_app_name" {
  value       = local.api_app_name
  description = "API container app name"
}

output "api_app_url" {
  value       = "https://${module.container_app_api.fqdn}"
  description = "API application URL"
}

output "worker_app_name" {
  value       = local.worker_app_name
  description = "Worker container app name"
}

output "frontdoor_endpoint" {
  value       = var.enable_frontdoor ? "https://${module.frontdoor[0].endpoint_hostname}" : "Front Door not enabled"
  description = "Front Door endpoint URL"
}

output "app_insights_name" {
  value       = "appi-${module.log_analytics.workspace_id}"
  description = "Application Insights name"
}

output "log_analytics_workspace_id" {
  value       = module.log_analytics.workspace_id
  description = "Log Analytics workspace ID"
}

# Sensitive outputs
output "connection_string_sql" {
  value       = "Server=tcp:${module.sql.server_fqdn},1433;Initial Catalog=${module.sql.database_name};Persist Security Info=False;User ID=${var.sql_admin_username};Password=${var.sql_admin_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  sensitive   = true
  description = "SQL connection string"
}

output "app_insights_instrumentation_key" {
  value       = module.log_analytics.app_insights_instrumentation_key
  sensitive   = true
  description = "Application Insights instrumentation key"
}

output "acr_admin_username" {
  value       = module.acr.admin_username
  sensitive   = true
  description = "ACR admin username"
}

output "acr_admin_password" {
  value       = module.acr.admin_password
  sensitive   = true
  description = "ACR admin password"
}

# Deployment summary
output "deployment_summary" {
  value       = <<-EOT
  ========================================
  School Management System - Deployment Summary
  ========================================
  
  Resource Group: ${module.resource_group.name}
  Location: ${var.location}
  Environment: ${var.env}
  
  📦 Container Registry:
     Name: ${split(".", module.acr.login_server)[0]}
     URL: ${module.acr.login_server}
  
  🌐 Applications:
     Web: https://${module.container_app_web.fqdn}
     API: https://${module.container_app_api.fqdn}
     Front Door: ${var.enable_frontdoor ? "https://${module.frontdoor[0].endpoint_hostname}" : "Not enabled"}
  
  💾 Database:
     Server: ${module.sql.server_fqdn}
     Database: ${module.sql.database_name}
  
  📊 Monitoring:
     Application Insights: View in Azure Portal
     Log Analytics: View in Azure Portal
  
  🔐 Default Login:
     Email: admin@schoolsms.com
     Password: Admin@123
  
  ⚠️  Next Steps:
     1. Push Docker images to ACR
     2. Update Container Apps with new images
     3. Access the web URL above
  ========================================
  EOT
  description = "Deployment summary with all important URLs and info"
}
