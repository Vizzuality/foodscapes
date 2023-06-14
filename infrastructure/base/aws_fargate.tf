# Fargate setup on Elastic Container Service

## Staging

module "fargate_cluster" {
  source     = "./modules/fargate_cluster"
  name       = "foodscapes-staging"
  aws_region = var.aws_region
}

module "fargate_service_client" {
  source                      = "./modules/fargate_service"
  name                        = "client-staging"
  environment                 = "staging"
  task_execution_role_arn     = module.iam.ecs_task_execution_role.arn
  fargate_cluster_id          = module.fargate_cluster.fargate_cluster_id
  ecs_tasks_security_group_id = module.load_balancer.ecs_tasks_security_group_id
  vpc_id                      = module.vpc.id
  public_subnet_ids           = module.vpc.public_subnet_ids
  private_subnet_ids          = module.vpc.private_subnet_ids
}

module "fargate_service_datasette" {
  source                      = "./modules/fargate_service"
  name                        = "datasette-staging"
  environment                 = "staging"
  task_execution_role_arn     = module.iam.ecs_task_execution_role.arn
  fargate_cluster_id          = module.fargate_cluster.fargate_cluster_id
  ecs_tasks_security_group_id = module.load_balancer.ecs_tasks_security_group_id
  vpc_id                      = module.vpc.id
  public_subnet_ids           = module.vpc.public_subnet_ids
  private_subnet_ids          = module.vpc.private_subnet_ids
}

module "fargate_service_tiler" {
  source                      = "./modules/fargate_service"
  name                        = "tiler-staging"
  environment                 = "staging"
  task_execution_role_arn     = module.iam.ecs_task_execution_role.arn
  fargate_cluster_id          = module.fargate_cluster.fargate_cluster_id
  ecs_tasks_security_group_id = module.load_balancer.ecs_tasks_security_group_id
  vpc_id                      = module.vpc.id
  public_subnet_ids           = module.vpc.public_subnet_ids
  private_subnet_ids          = module.vpc.private_subnet_ids
}

## Production

module "fargate_cluster_production" {
  count = var.deploy_production ? 1 : 0

  source     = "./modules/fargate_cluster"
  name       = "foodscapes-production"
  aws_region = var.aws_region
}

module "fargate_service_client_production" {
  count = var.deploy_production ? 1 : 0

  source                      = "./modules/fargate_service"
  name                        = "client-production"
  environment                 = "production"
  task_execution_role_arn     = module.iam.ecs_task_execution_role.arn
  fargate_cluster_id          = module.fargate_cluster_production[0].fargate_cluster_id
  ecs_tasks_security_group_id = module.load_balancer_production[0].ecs_tasks_security_group_id
  vpc_id                      = module.vpc.id
  public_subnet_ids           = module.vpc.public_subnet_ids
  private_subnet_ids          = module.vpc.private_subnet_ids
}

module "fargate_service_datasette_production" {
  count = var.deploy_production ? 1 : 0

  source                      = "./modules/fargate_service"
  name                        = "datasette-production"
  environment                 = "production"
  task_execution_role_arn     = module.iam.ecs_task_execution_role.arn
  fargate_cluster_id          = module.fargate_cluster_production[0].fargate_cluster_id
  ecs_tasks_security_group_id = module.load_balancer_production[0].ecs_tasks_security_group_id
  vpc_id                      = module.vpc.id
  public_subnet_ids           = module.vpc.public_subnet_ids
  private_subnet_ids          = module.vpc.private_subnet_ids
}

module "fargate_service_tiler_production" {
  count = var.deploy_production ? 1 : 0

  source                      = "./modules/fargate_service"
  name                        = "tiler-production"
  environment                 = "production"
  task_execution_role_arn     = module.iam.ecs_task_execution_role.arn
  fargate_cluster_id          = module.fargate_cluster_production[0].fargate_cluster_id
  ecs_tasks_security_group_id = module.load_balancer_production[0].ecs_tasks_security_group_id
  vpc_id                      = module.vpc.id
  public_subnet_ids           = module.vpc.public_subnet_ids
  private_subnet_ids          = module.vpc.private_subnet_ids
}
