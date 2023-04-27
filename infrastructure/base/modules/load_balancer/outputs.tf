output "aws_lb_target_group_arn" {
  value = aws_lb_target_group.foodscapes.arn
  description = "ARN of the Foodscapes load balancer target group"
}
