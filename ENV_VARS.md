# Environment variables

This document covers the different
[environment variables](https://en.wikipedia.org/wiki/Environment_variable) used
by the Foodscapes application.

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
- `TILER_FOODSCAPES_COG_FILENAME` (string, optional, default is
  `foodscapes_stack_cog_lzw.tif`): the filename part of the absolute file path
  where the core Cloud-Optimized GeoTIFF (COG) file used by the tiler service
  can be read from; the full path is assembled by prepending the path of the
  folder on the container's local filesystem where the file will be `ADD`-ed
  during the build of the container image and where TiTiler will read it when
  processing requests.
- `TILER_ROOT_PATH` (string, optional, default is None): when the tiler service
  is behind a reverse proxy configured to use a path prefix for the tiler URLs
  (for example `/tiler`), the same prefix _must_ also be set through this
  environment variable, so that the FastAPI framework can generate internal URLs
  correctly.

As setting things up across reverse proxies, load balancers and so on may get
complicated rather quickly: given a value of `TILER_ROOT_PATH=/tiler` and the
following reverse proxy setup (using
[Caddy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy#reverse-proxy)
syntax)

```
app.foodscapes.tld {
  handle_path /tiler/* {
    reverse_proxy localhost:3201
  }
}
```

The tiler service will be accessible at the following base URL:
https://app.foodscapes.tld/tiler/

For example, the OpenAPI documentation will be available at
https://app.foodscapes.tld/tiler/docs.

Behind the reverse proxy, the tiler service will be available at the following
base URL (for example, exposed by Docker with no TLS internally behind a
firewall): http://tiler:3201/. Likewise the OpenAPI documentation, again as an
example, will be available at http://tiler:3201/docs.

Different setups are possible, and may be preferable over the one above
depending on specific deployment scenarios.

The `root_path` mechanism when running behind reverse proxies is described in
great detail in the
[FastAPI documentation](https://fastapi.tiangolo.com/advanced/behind-a-proxy/):
when setting up the Foodscapes services behind a reverse proxy, please make sure
to familiarise yourself with it.

- `TILER_CORS_ORIGINS_REGEX` (regular expression, optional, default is an empty
  string): whitelisted app origins for requests from the in-browser frontend app
  to the TiTiler service.

  If not provided, no origins will be whitelisted.

  Allowed origins are set via `allow_origin_regex` (see the
  [Starlette documentation for the underlying CORS
  middleware](https://www.starlette.io/middleware/#corsmiddleware)), so multiple
  origins must be listed as a valid regular expression: for example
  `(https?:\/\/example\.com|https:\/\/localhost)` will match all of
  `http://example.com`, `https://example.com` and `https://localhost`.

  The special value `\*` (regexp for the `*` character) will allow any origin
  (this is handled by using the `allow_origins=['*']` argument for the Starlette
  `CORSMiddleware`).

## Datasette service

- `DATASETTE_SERVICE_PORT` (number, required, default is 3203): the port exposed
  by Docker for the Datasette service; when running an instance under Docker
  Compose, the Datasette service will always be listening on port 3000
  internally, and this is mapped to `DATASETTE_SERVICE_PORT` when exposed
  outside of the container.
- `DATASETTE_SQLITE_DB_FILENAME` (string, optional, default is 'foodscapes.db'):
  the filename part of the absolute file path where the core SQLite data file
  used by the Datasette service can be read from; the full path will is
  assembled by prepending the path of the folder on the container's local
  filesystem where the file will be `ADD`-ed during the build of the container
  image and where Datasette will read it when processing requests.
- `DATASETTE_CORS_ORIGINS` (string, optional, comma-separated list of origins,
  default is an empty string): whitelisted app origins for requests from the
  in-browser frontend app to the Datasette service.

  If not provided, no origins will be whitelisted.

  The syntax for these origins is defined in the
  [asgi-cors](https://github.com/simonw/asgi-cors) package.

  In summary: the `host_wildcards` parameter to `asgi_cors` is used (via the
  `plugins.datasette-cors.host_wildcards` setting in the Datasette metadata
  file), so `*` can be used as part of an origin as a wildcard; for example
  `https://*.example.com` will match origins such as
  `https://staging.example.com` and `https://staging.api.example.com`, but not
  `https://example.com` nor `http://staging.example.com` (will only match `http`
  protocol part, unless `http*` is used for it).

  The special value `*` origin (literal `*` character) will allow any origin.

  Multiple origins from the comma-separated list are parsed into JSON array
  items and added during the OCI image build to the Datasette metadata file.

## Source data

- `DATA_CORE_COG_SOURCE_URL` (URL, required): the URL from which the Docker
  image build process can fetch the source COG file for the TiTiler service;
  this needs to be an HTTPS source with no authentication required, such as an
  URL for an asset on a public S3 bucket.
- `DATA_CORE_COG_CHECKSUM` (string, required): the checksum (see
  [Checksums for source data](#checksums-for-source-data) section below for
  details) of the file above.
- `DATA_CORE_SQLITE_DB_SOURCE_URL` (URL, required):t he URL from which the
  Docker image build process can fetch the source SQLite file for the Foodscapes
  tabular data served by the Datasette service; this needs to be an HTTPS source
  with no authentication required, such as an URL for an asset on a public S3
  bucket.
- `DATA_CORE_SQLITE_DB_CHECKSUM` (string, required): the checksum (see
  [Checksums for source data](#checksums-for-source-data) section below for
  details) of the file above.

### Checksums for source data

COG and tabular data are added to the TiTiler and Datasette service container
images, respectively, fetching them from a remote location through an `ADD`
Docker build step.

In order to make sure that the files being added are the ones expected (i.e.
they are the exact revision of the data that is needed, they have not been
tampered with - either accidentally or maliciously, etc.), a checksum is
calculated by the Docker build process and this is compared to the checksum
configured via environment variables. For details about the syntax for this
checksum and how to calculate it, please see the relevant Dockerfile reference
here:
https://docs.docker.com/engine/reference/builder/#verifying-a-remote-file-checksum-add---checksumchecksum-http-src-dest.
