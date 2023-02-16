# Creating a SQLite db from Foodscapes CSV data

This should be set up to run in a Docker container: as a first quick step,
however, the following steps should be all that is needed. The only dependency
is the `sqlite3` binary.

```
sudo apt install sqlite3 # or whatever appropriate to install sqlite3 on your OS
# copy source CSV where the ingestion script expects it - please note that
# the expected filename is hardcoded, so do make sure it matches what is shown
# in the example command below
cp /path/to/local/copy/of/foodscapes.csv ./source/foodscapes-filter-table.csv
sh foodscapes_csv-to-sqlite.sh
```

The Foodscapes data will be available as `./dest/foodscapes.db`.

Indexes are currently added to each column: hence a very large file size,
compared to the source CSV file.

If you then wish to use this generated file instead of the one "baked" into the
container image for the Datasette service by default, you can either:

- place the generated SQLite db file somewhere HTTP-accessible, configure the
  `DATA_CORE_SQLITE_DB_SOURCE_URL` and `DATA_CORE_SQLITE_DB_CHECKSUM`
  environment variables in `.env` accordingly, and rebuild the Datasette
  container image: this will pull the db file from your configured location, and
  "bake" it into the container image

- copy the file into the `datasette/data` folder in this repository (this folder
  is gitignored by default) and configure the `DATASETTE_SQLITE_DB_FILENAME`
  environment variable in `.env` (for example
  `DATASETTE_SQLITE_DB_FILENAME=local-dev/foodscapes.dev`, taking into account
  that when running services via Docker Compose the `datasette/data` folder of
  this repository gets mounted as a volume as `data/local-dev` within the
  `WORKDIR` in the container)

For details on how these environment variables affect the setup, please see the
relevant documentation in [ENV_VARS.md](../../../ENV_VARS.md).
