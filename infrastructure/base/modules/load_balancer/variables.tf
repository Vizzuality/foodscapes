variable "tags" {
  default     = {}
  type        = map(string)
  description = "A mapping of keys and values to apply as tags to all resources that support them."
}

variable "environment" {
  type        = string
  description = "The environment to deploy to (staging or production)"
}

variable "vpc_id" {
  type = string
  description = "The ID of the VPC."
}

variable "vpc_public_subnet_ids" {
  type = list(string)
  description = "A list of VPC subnet IDs."
}

variable "client_lb_target_group_arn" {
  type = string
  description = "ARN for the load balancer's target group for the client service"
}

variable "tiler_lb_target_group_arn" {
  type = string
  description = "ARN for the load balancer's target group for the tiler service"
}

variable "datasette_lb_target_group_arn" {
  type = string
  description = "ARN for the load balancer's target group for the datasette service"
}

variable "https_certificate_arn" {
  type = string
  description = "ARN for the HTTPS certificate"
}
