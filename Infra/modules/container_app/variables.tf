variable "name" {
  type = string
}

variable "rg_name" {
  type = string
}

variable "location" {
  type = string
}

variable "container_apps_env_id" {
  type = string
}

variable "container_image" {
  type = string
}

variable "target_port" {
  type    = number
  default = 0
}

variable "ingress_external_enabled" {
  type    = bool
  default = true
}

variable "registry_server" {
  type = string
}

variable "registry_username" {
  type      = string
  sensitive = true
}

variable "registry_password" {
  type      = string
  sensitive = true
}

variable "cpu" {
  type    = string
  default = "0.25"
}

variable "memory" {
  type    = string
  default = "0.5Gi"
}

variable "min_replicas" {
  type    = number
  default = 1
}

variable "max_replicas" {
  type    = number
  default = 3
}

variable "env_vars" {
  type = list(object({
    name  = string
    value = string
  }))
  default = []
}

variable "tags" {
  type    = map(string)
  default = {}
}
