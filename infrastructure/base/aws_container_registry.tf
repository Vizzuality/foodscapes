# Container registries for the components of the platform

## Staging

module "client_container_registry" {
  source = "./modules/container_registry"
  name   = "client-staging"
}

module "datasette_container_registry" {
  source = "./modules/container_registry"
  name   = "datasette-staging"
}

module "tiler_container_registry" {
  source = "./modules/container_registry"
  name   = "tiler-staging"
}

## Production

module "client_container_registry_production" {
  count = var.deploy_production ? 1 : 0

  source = "./modules/container_registry"
  name   = "client-production"
}

module "datasette_container_registry_production" {
  count = var.deploy_production ? 1 : 0

  source = "./modules/container_registry"
  name   = "datasette-production"
}

module "tiler_container_registry_production" {
  count = var.deploy_production ? 1 : 0

  source = "./modules/container_registry"
  name   = "tiler-production"
}
