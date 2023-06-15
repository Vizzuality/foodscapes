module "load_balancer" {
  source                        = "./modules/load_balancer"
  environment                   = "staging"
  vpc_id                        = module.vpc.id
  vpc_public_subnet_ids         = module.vpc.public_subnet_ids
  client_lb_target_group_arn    = module.fargate_service_client.aws_lb_target_group_arn
  tiler_lb_target_group_arn     = module.fargate_service_tiler.aws_lb_target_group_arn
  datasette_lb_target_group_arn = module.fargate_service_datasette.aws_lb_target_group_arn
  https_certificate_arn         = module.https_certificate.aws_acm_certificate_arn
}

module "load_balancer_production" {
  count                         = var.deploy_production ? 1 : 0

  source                        = "./modules/load_balancer"
  environment                   = "production"
  vpc_id                        = module.vpc.id
  vpc_public_subnet_ids         = module.vpc.public_subnet_ids
  client_lb_target_group_arn    = module.fargate_service_client_production[0].aws_lb_target_group_arn
  tiler_lb_target_group_arn     = module.fargate_service_tiler_production[0].aws_lb_target_group_arn
  datasette_lb_target_group_arn = module.fargate_service_datasette_production[0].aws_lb_target_group_arn
  https_certificate_arn         = module.https_certificate_production[0].aws_acm_certificate_arn
}
