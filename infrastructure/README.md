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

## Deploying via GitHub Actions

Once the infrastructure is fully terraformed, deployment of the Foodscapes
services (client app, tiler and datasette) via GitHub actions can be configured.

- Manually generate AWS credentials (_access key id_ + _secret access key_) for
  the `foodscapes_ci_bot` IAM user created via Terraform.

- Configure the following GitHub Actions _secrets_ with the values from the
  generated credentials:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`

- Set the following GitHub Actions _variables_ too:
  - `AWS_ECR_REPOSITORY`
  - `AWS_ECS_CLUSTER`
  - `AWS_ECS_EXECUTION_ROLE_ARN`
  - `AWS_REGION`

- Set the environment variables documented in the [main documentation of
  environment variables](../ENV_VARS.md) and the [client application's
  README](../client/README.md).
