# Uncomment the following `terraform` block after creating the S3 bucket and
# DynamoDB table for Terraform state management (see README.md)

# terraform {
#   backend "s3" {
#     # set this to match the region used project-wide (tfvar aws_region)
#     region         = "us-east-1"
#     key            = "core.tfstate"
#     dynamodb_table = "aws-locks"
#     encrypt        = true
#     profile        = "default"
#   }
# }

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
  availability_zones = ["${var.aws_region}a", "${var.aws_region}b"]
  project = var.project_name
  tags    = local.tags
}
