variable "name" {
  type        = string
  description = "The name of the Fargate service"
}

variable "task_execution_role_arn" {
  type        = string
  description = "ARN of the execution role for the Fargate service"
}

variable "fargate_cluster_id" {
  type = string
  description = "Fargate cluster id for this Fargate service"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "IDs of the private subnets used in the ECS cluster"
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "IDs of the public subnets used in the ECS cluster"
}

variable "ecs_tasks_security_group_id" {
  type        = string
  description = "IDs of the security group for ECS tasks"
}

variable "aws_lb_target_group_arn" {
  type = string
  description = "ARN for the load balancer's target group"
}
