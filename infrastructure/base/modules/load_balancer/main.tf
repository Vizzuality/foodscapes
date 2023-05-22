resource "aws_security_group" "lb" {
  name        = "lb-sg"
  description = "Security group for the Application Load Balancer (ALB)"
  vpc_id      = var.vpc_id

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
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
  vpc_id      = var.vpc_id

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
  subnets            = var.vpc_public_subnet_ids
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]

  tags = var.tags
}

resource "aws_lb_listener" "https_forward" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.https_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = var.client_lb_target_group_arn
  }
}

resource "aws_lb_listener" "http_redirect" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
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
      values = [
        "/cog*",
        "/stac*",
        "/docs*",
        "/openapi.json"
      ]
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
