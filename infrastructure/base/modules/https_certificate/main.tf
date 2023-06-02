resource "aws_acm_certificate" "foodscapes" {
  domain_name       = var.domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true

    ignore_changes = [
      validation_method,
      domain_name,
    ]
  }
  tags = var.tags
}

resource "aws_acm_certificate_validation" "foodscapes" {
  certificate_arn         = aws_acm_certificate.foodscapes.arn
  validation_record_fqdns = aws_acm_certificate.foodscapes.domain_validation_options[*].resource_record_name
}
