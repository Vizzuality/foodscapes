output "aws_acm_certificate_arn" {
  value = aws_acm_certificate.foodscapes.arn
  description = "The ARN of the ACM certificate"
}

output "aws_acm_certificate_validation_record_fqdns" {
  value = [ for dvo in aws_acm_certificate.foodscapes.domain_validation_options : tolist([dvo.resource_record_type, dvo.resource_record_name, dvo.resource_record_value])]
  description = "The FQDNs of the ACM certificate validation records"
}
