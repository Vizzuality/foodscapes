output "fargate_cluster_id" {
  value = aws_ecs_cluster.foodscapes.id
  description = "The Fargate cluster id"
}