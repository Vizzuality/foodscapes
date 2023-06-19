variable "project_name" {
  default     = "foodscapes"
  type        = string
  description = "A project namespace for the infrastructure"
}

variable "environment" {
  type        = string
  description = "An environment namespace for the infrastructure"
}

variable "domain" {
  type        = string
  description = "The base domain name"
}

variable "aws_region" {
  default     = "eu-west-3"
  type        = string
  description = "A valid AWS region to configure the underlying AWS SDK"
}

variable "dynamo_db_lock_table_name" {
  default     = "aws-locks"
  type        = string
  description = "Name of the lock table in Dynamo DB"
}

variable "tf_state_bucket" {
  type        = string
  description = "The name of the S3 bucket where the state is stored"
}

variable "allowed_account_id" {
  type        = string
  description = "Allowed AWS Account ID"
}

variable "aws_cli_profile" {
  default     = "default"
  type        = string
  description = "Named profile to use when interfacing with the AWS API"
}

variable "deploy_production" {
  default     = false
  type        = bool
  description = "Whether to deploy the production environment"
}
