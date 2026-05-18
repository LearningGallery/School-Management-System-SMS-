terraform {
  backend "azurerm" {
    resource_group_name  = "rgsuiamgmtfm01"
    storage_account_name = "stguiamgmtfm01"
    container_name       = "tfstate"
    key                  = "uat/devsecops.tfstate"
  }
}
