variable "domain" {
  type        = string
  description = "The base domain name"
}

variable "tags" {
  default     = {}
  type        = map(string)
  description = "A mapping of keys and values to apply as tags to all resources that support them."
}
