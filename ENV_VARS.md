# Environment variables

This document covers the different [environment
variables](https://en.wikipedia.org/wiki/Environment_variable) used by the
Foodscapes application.

Defaults for settings other than secrets are available in the `env.default`
file.

## Frontend application

- `APP_SERVICE_PORT` (number, required): the port exposed by Docker for the
  client application; when running an instance under Docker Compose, the Node
  process will always be listening on port 3000 internally, and this is mapped
  to `APP_SERVICE_PORT` when exposed outside of the container.

## Tiler service

- `TILER_SERVICE_PORT` (number, required): the port exposed by Docker for the
  TiTiler tiler service; when running an instance under Docker Compose, the
  FastAPI process for TiTiler will always be listening on port 3000 internally,
  and this is mapped to `TILER_SERVICE_PORT` when exposed outside of the
  container.
- `TILER_FOODSCAPES_COG_URL` (URL or filesystem path as string, optional,
  default is `/opt/foodscapes-tiler/data/foodscapes.tif`): the URL where the
  core Cloud-Optimized GeoTIFF (COG) file used by the tiler service can be read
  from; this will typically be a path on the local filesystem of the Docker
  image, where the file should be `COPY`-ed during the build of the container
  image.
