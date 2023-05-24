terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.54.0"
    }
    template = {
      source = "hashicorp/template"
    }
  }
  required_version = "~> 1.4.0"
}

provider "aws" {
  region              = var.aws_region
  allowed_account_ids = [var.allowed_account_id]
  profile             = var.aws_cli_profile
}
