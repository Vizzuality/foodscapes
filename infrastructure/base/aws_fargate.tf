# Fargate setup on Elastic Container Service

module "fargate_cluster" {
  source     = "./modules/fargate_cluster"
  aws_region = var.aws_region
}

module "fargate_service_client" {
  source                      = "./modules/fargate_service"
  name                        = "client"
  task_execution_role_arn     = module.iam.ecs_task_execution_role.arn
  fargate_cluster_id          = module.fargate_cluster.fargate_cluster_id
  ecs_tasks_security_group_id = module.vpc.ecs_tasks_security_group_id
  public_subnet_ids           = module.vpc.public_subnet_ids
  private_subnet_ids          = module.vpc.private_subnet_ids
  aws_lb_target_group_arn     = module.load_balancer.aws_lb_target_group_arn
}

module "fargate_service_datasette" {
  source                      = "./modules/fargate_service"
  name                        = "datasette"
  task_execution_role_arn     = module.iam.ecs_task_execution_role.arn
  fargate_cluster_id          = module.fargate_cluster.fargate_cluster_id
  ecs_tasks_security_group_id = module.vpc.ecs_tasks_security_group_id
  public_subnet_ids           = module.vpc.public_subnet_ids
  private_subnet_ids          = module.vpc.private_subnet_ids
  aws_lb_target_group_arn     = module.load_balancer.aws_lb_target_group_arn
}

module "fargate_service_tiler" {
  source                      = "./modules/fargate_service"
  name                        = "tiler"
  task_execution_role_arn     = module.iam.ecs_task_execution_role.arn
  fargate_cluster_id          = module.fargate_cluster.fargate_cluster_id
  ecs_tasks_security_group_id = module.vpc.ecs_tasks_security_group_id
  public_subnet_ids           = module.vpc.public_subnet_ids
  private_subnet_ids          = module.vpc.private_subnet_ids
  aws_lb_target_group_arn     = module.load_balancer.aws_lb_target_group_arn
}
