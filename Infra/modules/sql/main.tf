resource "azurerm_mssql_server" "this" {
  name                         = var.server_name
  resource_group_name          = var.rg_name
  location                     = var.location
  version                      = "12.0"
  administrator_login          = var.admin_username
  administrator_login_password = var.admin_password
  minimum_tls_version          = "1.2"

  tags = var.tags
}

resource "azurerm_mssql_database" "this" {
  name           = var.database_name
  server_id      = azurerm_mssql_server.this.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  max_size_gb    = 2
  sku_name       = "Basic"
  zone_redundant = false

  tags = var.tags
}

# Allow Azure services
resource "azurerm_mssql_firewall_rule" "azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.this.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# Allow your IP for management (optional - add your IP)
# resource "azurerm_mssql_firewall_rule" "admin" {
#   name             = "AllowAdminIP"
#   server_id        = azurerm_mssql_server.this.id
#   start_ip_address = "YOUR_PUBLIC_IP"
#   end_ip_address   = "YOUR_PUBLIC_IP"
# }
