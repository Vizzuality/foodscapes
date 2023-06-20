module "https_certificate" {
  source = "./modules/https_certificate"
  domain = "staging.${var.domain}"
}

module "https_certificate_production" {
  count = var.deploy_production ? 1 : 0

  source = "./modules/https_certificate"
  domain = "www.${var.domain}"
}
