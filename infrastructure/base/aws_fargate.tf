# Fargate setup on Elastic Container Service

module "fargate" {
  source       = "./modules/fargate"
  aws_region   = var.aws_region
}
