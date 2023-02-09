#!/bin/sh

CORS_ORIGINS=`echo $DATASETTE_CORS_ORIGINS | sed -e 's/,/\n/g' | sed -e 's/^/"/g' | sed -e 's/$/"/g' | sed -z 's/\n/,/g' | sed -e 's/,$//'`
cat metadata.json.template | sed -e 's~"CORS_ORIGINS"~'"$CORS_ORIGINS"'~'