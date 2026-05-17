resource "azurerm_storage_account" "this" {
  name                     = var.name
  resource_group_name      = var.rg_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"

  blob_properties {
    cors_rule {
      allowed_headers    = ["*"]
      allowed_methods    = ["GET", "HEAD", "POST", "PUT"]
      allowed_origins    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 3600
    }
  }

  tags = var.tags
}

resource "azurerm_storage_container" "documents" {
  name                  = "documents"
  storage_account_id  = azurerm_storage_account.this.id
  container_access_type = "private"
}

resource "azurerm_storage_container" "avatars" {
  name                  = "avatars"
  storage_account_id  = azurerm_storage_account.this.id
  container_access_type = "blob"
}
