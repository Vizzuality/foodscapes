# Infrastructure

## Requirements

- AWS CLI
- Terraform
- Terragrunt

## Quick start

- For the first run, use a local state file (as the S3 bucket for shared state
  won't have been created yet): comment out the `terraform` block in `main.tf`
- Configure all the relevant Terraform variables in a `tfvars` file
- `terraform init`
- `terraform plan -var-file=./path/to/tfvars/file`
- Review the plan
- `terraform apply -var-file=./path/to/tfvars/file`
- Cross-check the plan, confirm if ok

Once the initial setup is done, the S3 bucket holding the state file will have
been created: un-comment the `terraform` block in `main.tf` and run `terraform
apply` again.

Terraform will ask whether the state should be migrated to the new AWS backend:
confirm to let Terraform switch to managing the state through the shared S3
bucket.
