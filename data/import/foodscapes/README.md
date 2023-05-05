# Creating a SQLite db from Foodscapes CSV data

The data import process can be run on any system with suitable dependencies
available: these are the `sqlite3` binary and the `libsqlite3-mod-spatialite`
SQLite module for Spatialite.

First install the dependencies - for example, in Debian/Ubuntu:

```
sudo apt install sqlite3 libsqlite3-mod-spatialite
```

Copy the Foodscapes data source CSV file where the ingestion script expects to
find it.

Please note that the expected filename follows a template that includes a base
name and a part that includes a YYYYMMDD timestamp and a XY revision, so do make
sure that the filename matches what is shown in the example command below.

```
cp /path/to/local/copy/of/foodscapes.csv ./source/foodscapes-filter-table_YYYYMMDD_XY.csv
```

Place the Foodscapes metadata source CSV files where the ingestion script
expects to find them.

As for the core data CSV file, all these files are expected to have a specific
base name followed by a `_YYYYMMDD_XY` part.

The date and revision values _must_ be the same for the data file and for the
metadata files, so please make sure these are all aligned.

```
cp /path/to/local/copy/of/metadata_files/*YYYYMMDD-XY*csv ./source/metadata
```

And finally, run the import script:

```
sh foodscapes_csv-to-sqlite.sh -d YYYYMMDD -r XY
```

Optionally, the `-f` flag may be used to force deleting a previous copy of the
destination `foodscapes.db` SQLite file, if it exists in the `dest` folder:

```
sh foodscapes_csv-to-sqlite.sh -f -d YYYYMMDD -r XY
```

This is actually what users will likely want to do _every time_ when importing
new data, but given that it is a destructive operation it is left behind an
optional flag.

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
