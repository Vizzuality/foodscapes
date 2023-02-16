#!/bin/bash

# Given a comma-separated list of origins from an environment variable,
CORS_ORIGINS=`echo "$DATASETTE_CORS_ORIGINS" | \
# first split the list into one origin per line
sed -e 's/,/\n/g' | \
#then wrap each item in double quotes (target is an element in a JSON array)
sed -e 's/^/"/g' | sed -e 's/$/"/g' | \
# then concatenate all the array elements separating them with commas (using -z
# to pretend that lines are separated by NUL characters, therefore keeping the
# `\n`s rather than getting them stripped out by sed as it reads its input: see
# section 5.10 of the sed FAQ: https://www.pement.org/sed/sedfaq5.html#s5.10)
sed -z -e 's/\n/,/g' | \
# and remove the trailing comma, to get a proper JSON array of strings
sed -e 's/,$//'`

# Replace the `"{{CORS_ORIGINS}}"` placeholder in the template file with the
# JSON array created above.
#
# Double quotes are part of the placeholder so that the template file still is a
# valid JSON file.
#
# `^` is used as regexp delimiter instead of the common `/` character as the
# latter would clash with slashes in URLs configured as origins. On the other
# hand, `^` has no place in URLs of origins, so we should be able to safely use
# it here as regexp delimiter.
#
# This whole contraption would ideally be solved much more robustly and
# elegantly via the `envsubst(1)` command of the GNU Gettext suite, but this is
# not available within the upstream Datasette OCI images.
cat metadata.json.template | sed -e 's^"{{CORS_ORIGINS}}"^'"$CORS_ORIGINS"'^'
