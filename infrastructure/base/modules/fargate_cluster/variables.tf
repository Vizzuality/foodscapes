variable "aws_region" {
  type        = string
  description = "The name of the AWS region where ECS will run application containers"
}

variable "name" {
  type        = string
  description = "The name of the Fargate cluster"
}
