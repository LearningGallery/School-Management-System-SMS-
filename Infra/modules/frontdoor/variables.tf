variable "name" {
  type = string
}

variable "rg_name" {
  type = string
}

variable "web_origin_hostname" {
  type = string
}

variable "api_origin_hostname" {
  type = string
}

variable "tags" {
  type    = map(string)
  default = {}
}
