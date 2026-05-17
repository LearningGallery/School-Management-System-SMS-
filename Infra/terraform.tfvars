subscription_id = "17da8110-ad0a-4bcc-99e3-f83260c6ccc0"

project  = "sms"
env      = "dev"
location = "southeastasia"

sql_admin_username = "sqladmin"
sql_admin_password = "P@ssw0rd123!Strong"                          # Change this!
jwt_secret         = "ISf7vpGPH4nr3VicZ1NtjWkK2szJmqeuY8lhwXaUTg9dMboQyEB5DCR06LOFAx" # Change this!

enable_frontdoor = true
enable_keyvault  = false # Set true if you want Key Vault

tags = {
  project     = "school-management-system"
  environment = "dev"
  managed_by  = "terraform"
  owner       = "github-demo"
  repository  = "school-sms"
}
