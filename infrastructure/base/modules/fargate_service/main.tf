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

  lifecycle {
    ignore_changes = [
      # I guess there's a clever and blessed way to do this, but in practice,
      # all we need here is to "seed" the task definition with some kind of
      # off-the-shelf OCI image when the task definition is first created, as
      # by then we won't have any of our images available to use (because we
      # haven't created any ECR infrastructure yet). Once the task definition
      # is created, deploying via GitHub Actions will update the task with
      # actual desired values, including references to our images on ECR.
      task_definition,
    ]
  }
}

resource "aws_cloudwatch_log_group" "service" {
  name              = var.name
  retention_in_days = 90
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
