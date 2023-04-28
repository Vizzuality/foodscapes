#!/bin/sh

# Check if user has specified a -f flag; if so delete the database first
if [ "$1" = "-f" ]; then
    rm dest/foodscapes.db
fi

sqlite3 dest/foodscapes.db < foodscapes_sqlite-db-setup.sql
cat source/foodscapes_filter_table.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' data"

sqlite3 dest/foodscapes.db < foodscapes_metadata-setup.sql
cat source/label-data/crop_group_legend_20230421_00.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' crop_groups"
cat source/label-data/crop_legend_20230421_00.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' crops"

cat source/label-data/soil_group_legend_20230421_00.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' soil_groups"
cat source/label-data/foodscapes_legend_20230421_00.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' foodscapes"


cat source/label-data/intensity_group_legend_20230421_00.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' intensity_groups"

cat source/label-data/layers_20230421_00.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' layers"

cat source/label-data/countries_legend_20230421_00.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' countries"
cat source/label-data/provinces_legend_20230421_00.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' provinces"

sqlite3 dest/foodscapes.db < foodscapes_metadata-cleanup.sql