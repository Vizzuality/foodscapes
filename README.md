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

- Install Docker (**version 20.10 or later**). Earlier versions of Docker may
  not be able to build some of the Dockerfiles in this repository; building with
  earlier versions may be possible if BuildKit is supported, but setting the
  environment variable `DOCKER_BUILDKIT=1` may be needed. Likewise newer Docker
  versions that have been upgraded from older ones may need default settings to
  be changed if BuildKit had ever been disabled by default.
- Install [Docker Compose](https://docs.docker.com/compose/install/).
- Create an `.env` at the root of the repository, defining all the required
  [environment variables](./ENV_VARS.md).
  
In most cases, for variables other than secrets, the defaults in `env.default`
should just work - your mileage may vary (for example, depending on ports in use
by other services in your local development environment).

### Start the services

From the root of the repository:

`docker-compose up`

Once all the container images are (re)built and the services start successfully,
the components of the platform should be available on the ports configured in
`.env`.

If using the default settings from `env.default` and if Docker binds on
`localhost` the exposed ports of the services it runs, the services will be
available at the following URLs:

- App: http://localhost:3200
- Tiler: http://localhost:3201
- Datasette: http://localhost:3203
