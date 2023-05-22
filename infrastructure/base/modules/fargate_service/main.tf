resource "aws_ecs_task_definition" "task" {
  family                   = var.name
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  execution_role_arn       = var.task_execution_role_arn

  container_definitions = jsonencode([
    {
      name      = var.name
      image     = "busybox"
      cpu       = 1024
      memory    = 2048
      essential = true
      command   = ["sh"],
      portMappings = [
        {
          containerPort = 3000,
          hostPort      = 3000,
          protocol      = "tcp"
        }
      ]
    },
  ])
}

resource "aws_ecs_service" "service" {
  name            = var.name
  cluster         = var.fargate_cluster_id
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [var.ecs_tasks_security_group_id]
    subnets          = setunion(var.private_subnet_ids)
  }

  task_definition = aws_ecs_task_definition.task.arn

  load_balancer {
    target_group_arn = aws_lb_target_group.service.arn
    container_name   = var.name
    container_port   = 3000
  }
}

resource "aws_lb_target_group" "service" {
  name_prefix = "${substr(var.name, 0, 3)}-"
  target_type = "ip"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = var.vpc_id

  health_check {
    path = var.name == "tiler" ? "/healthz" : "/"
  }
}
