# Container registries for the components of the platform

module "client_container_registry" {
  source = "./modules/container_registry"
  name   = "client"
}

module "datasette_container_registry" {
  source = "./modules/container_registry"
  name   = "datasette"
}

module "tiler_container_registry" {
  source = "./modules/container_registry"
  name   = "tiler"
}

