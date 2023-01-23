#!/bin/sh

sqlite3 dest/foodscapes.db < foodscapes_sqlite-db-setup.sql
cat source/foodscapes_filter_table.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' foodscapes"
