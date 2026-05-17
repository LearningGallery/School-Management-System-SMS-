variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
}

variable "project" {
  description = "Project name"
  type        = string
  default     = "sms"
}

variable "env" {
  description = "Environment (dev/uat/prod)"
  type        = string
  default     = "dev"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "southeastasia"
}

variable "sql_admin_username" {
  description = "SQL admin username"
  type        = string
  default     = "sqladmin"
}

variable "sql_admin_password" {
  description = "SQL admin password"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT signing secret"
  type        = string
  sensitive   = true
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default = {
    project     = "school-management-system"
    environment = "dev"
    managed_by  = "terraform"
    owner       = "github-demo"
  }
}

variable "enable_frontdoor" {
  description = "Enable Azure Front Door"
  type        = bool
  default     = true
}

variable "enable_keyvault" {
  description = "Enable Azure Key Vault"
  type        = bool
  default     = false
}
