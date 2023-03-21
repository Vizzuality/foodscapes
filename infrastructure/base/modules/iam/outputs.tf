output "ecs_task_execution_role" {
  value = aws_iam_role.ecs_task_execution_role
  description = "ARN of the ECS task execution role"
}