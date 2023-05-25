module "https_certificate" {
  source = "./modules/https_certificate"
  domain = var.domain
}
