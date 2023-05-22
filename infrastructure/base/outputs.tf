# Output values which can be referenced in other repos
output "account_id" {
  value       = data.aws_caller_identity.current.account_id
  description = "ID of AWS account"
}

output "vpc_id" {
  value = module.vpc.id
}

output "public_subnet_ids" {
  value = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  value = module.vpc.private_subnet_ids
}

output "client_container_registry_url" {
  value = module.client_container_registry.container_registry_url
}

output "datasette_container_registry_url" {
  value = module.datasette_container_registry.container_registry_url
}

output "tiler_container_registry_url" {
  value = module.tiler_container_registry.container_registry_url
}

output "acm_certificate_validation_fqdns" {
  value = module.https_certificate.aws_acm_certificate_validation_record_fqdns
}
