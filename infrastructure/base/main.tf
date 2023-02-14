terraform {
  backend "s3" {
    region         = "eu-west-3"
    key            = "core.tfstate"
    dynamodb_table = "aws-locks"
    encrypt        = true
  }
}

module "bootstrap" {
  source               = "./modules/bootstrap"
  s3_bucket            = var.tf_state_bucket
  dynamo_db_table_name = var.dynamo_db_lock_table_name
  tags                 = local.tags
}

# Internal module which defines the VPC
module "vpc" {
  source  = "./modules/vpc"
  region  = var.aws_region
  project = var.project_name
  tags    = local.tags
}

module "foodscapes_container_registry" {
  source = "./modules/container_registry"
  name   = "foodscapes"
}
