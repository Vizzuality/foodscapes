resource "aws_security_group" "lb" {
  name        = "lb-sg"
  description = "Security group for the Application Load Balancer (ALB)"

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ecs_tasks" {
  name        = "ecs-tasks-sg"
  description = "Allow TCP connections to apps from load balancer only"

  ingress {
    protocol        = "tcp"
    from_port       = 3000
    to_port         = 3000
    cidr_blocks     = ["0.0.0.0/0"]
    security_groups = [aws_security_group.lb.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "load_balancer" {
  name               = "alb"
  subnets            = var.vpc_subnet_ids
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]

  tags = var.tags
}

resource "aws_lb_listener" "https_forward" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = var.client_lb_target_group_arn
  }
}

resource "aws_lb_listener_rule" "tiler" {
  listener_arn = aws_lb_listener.https_forward.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = var.tiler_lb_target_group_arn
  }

  condition {
    path_pattern {
      values = ["/tiler*"]
    }
  }
}

resource "aws_lb_listener_rule" "datasette" {
  listener_arn = aws_lb_listener.https_forward.arn
  priority     = 200

  action {
    type             = "forward"
    target_group_arn = var.datasette_lb_target_group_arn
  }

  condition {
    path_pattern {
      values = ["/data*"]
    }
  }
}

resource "aws_lb_target_group" "foodscapes" {
  name        = "foodscapes-alb-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "90"
    protocol            = "HTTP"
    matcher             = "200-299"
    timeout             = "20"
    path                = "/"
    unhealthy_threshold = "2"
  }
}
