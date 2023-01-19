# Foodscapes

Welcome to the Foodscapes application.

This repository includes all the code needed to run a local instance, as well
as (coming later on) deployment configuration for staging and production
environments.

## Quick start

This repository is a monorepo which includes all the microservices of the
Foodscapes application. Each microservice lives in a top-level folder.

Services are packaged as Docker images.

Most of the commands listed in this README and referenced elsewhere in the
repository are targeted at a GNU/Linux OS environment such as a recent Ubuntu,
Arch or Debian system, whether running natively or in a VM or under Windows
Subsystem for Linux 2 (WSL 2). They should also work identically on MacOS, while
they may need some adaptation to run on Windows systems.

### Set up docker

- Install Docker (19.03+):
- Install [Docker Compose](https://docs.docker.com/compose/install/)
- Create an `.env` at the root of the repository, defining all the required
  [environment variables](./ENV_VARS.md).
  
In most cases, for variables other than secrets, the defaults in `env.default`
should just work - your mileage may vary (for example, depending on ports in use
by other services in your local development environment).

### Start the services

From the root of the repository:

`docker-compose up`
