# Creating a SQLite db from Foodscapes CSV data

This should be set up to run in a Docker container: as a first quick step,
however, the following steps should be all that is needed. The only dependency
is the `sqlite3` binary.

```
sudo apt install sqlite3 # or whatever appropriate to install sqlite3 on your OS
cp /path/to/local/copy/of/foodscapes.csv ./source
sh foodscapes_csv-to-sqlite.sh
```

The Foodscapes data will be available as `./dest/foodscapes.db`.

Indexes are currently added to each column: hence a very large file size,
compared to the source CSV file.
