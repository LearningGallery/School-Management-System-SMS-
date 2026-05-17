output "workspace_id" {
  value = azurerm_log_analytics_workspace.this.id
}

output "workspace_customer_id" {
  value = azurerm_log_analytics_workspace.this.workspace_id
}

output "workspace_primary_key" {
  value     = azurerm_log_analytics_workspace.this.primary_shared_key
  sensitive = true
}

output "app_insights_instrumentation_key" {
  value     = azurerm_application_insights.this.instrumentation_key
  sensitive = true
}

output "app_insights_connection_string" {
  value     = azurerm_application_insights.this.connection_string
  sensitive = true
}
