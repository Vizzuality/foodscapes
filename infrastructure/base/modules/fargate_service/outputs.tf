output "aws_lb_target_group_arn" {
  value = aws_lb_target_group.service.arn
  description = "ARN of the load balancer target group for the service"
}
