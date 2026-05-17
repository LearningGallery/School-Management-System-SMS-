terraform {
  required_version = ">= 1.7.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  # Uncomment after creating backend storage
  # backend "azurerm" {
  #   resource_group_name  = "rg-tfstate-sms"
  #   storage_account_name = "sttfstatesms"
  #   container_name       = "tfstate"
  #   key                  = "prod.terraform.tfstate"
  # }
}
