#!/bin/sh

while [ $# -gt 0 ]
do
    case "$1" in
      -f|--force)
        FORCE=true
        shift
        ;;
      -d|--date)
        DATE="$2"
        shift
        shift
        ;;
      -r|--revision)
        REVISION="$2"
        shift
        shift
        ;;
    esac
done

# exit with error if DATE or REVISION are not set
if [ -z "$DATE" ] || [ -z "$REVISION" ]
then
  echo "Please specify both a date (YYYYMMDD) and revision number (XY)"
  exit 1
fi

# delete the database first, if FORCE is true
if [ "$FORCE" = true ]
then
  rm -f dest/foodscapes.db
fi

sqlite3 dest/foodscapes.db < foodscapes_sqlite-db-setup.sql
cat source/foodscapes_filter_table_${DATE}_${REVISION}.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' data"

sqlite3 dest/foodscapes.db < foodscapes_metadata-setup.sql
cat source/metadata/crop_group_legend_${DATE}_${REVISION}.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' crop_groups"
cat source/metadata/crop_legend_${DATE}_${REVISION}.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' crops"

cat source/metadata/soil_group_legend_${DATE}_${REVISION}.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' soil_groups"
cat source/metadata/foodscapes_legend_${DATE}_${REVISION}.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' foodscapes"

cat source/metadata/intensity_group_legend_${DATE}_${REVISION}.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' intensity_groups"

cat source/metadata/layers_${DATE}_${REVISION}.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' layers"

cat source/metadata/countries_legend_${DATE}_${REVISION}.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' countries"
cat source/metadata/provinces_legend_${DATE}_${REVISION}.csv | sqlite3 -csv dest/foodscapes.db ".import --skip 1 '| cat -' provinces"

sqlite3 dest/foodscapes.db < foodscapes_metadata-cleanup.sql
