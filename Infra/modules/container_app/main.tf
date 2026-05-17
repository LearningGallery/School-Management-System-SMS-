resource "azurerm_container_app" "this" {
  name                         = var.name
  container_app_environment_id = var.container_apps_env_id
  resource_group_name          = var.rg_name
  revision_mode                = "Single"

  registry {
    server               = var.registry_server
    username             = var.registry_username
    password_secret_name = "registry-password"
  }

  secret {
    name  = "registry-password"
    value = var.registry_password
  }

  template {
    container {
      name   = var.name
      image  = var.container_image
      cpu    = var.cpu
      memory = var.memory

      dynamic "env" {
        for_each = var.env_vars
        content {
          name  = env.value.name
          value = env.value.value
        }
      }
    }

    min_replicas = var.min_replicas
    max_replicas = var.max_replicas
  }

  dynamic "ingress" {
    for_each = var.target_port > 0 ? [1] : []
    content {
      external_enabled = var.ingress_external_enabled
      target_port      = var.target_port
      traffic_weight {
        percentage      = 100
        latest_revision = true
      }
    }
  }

  tags = var.tags
}
