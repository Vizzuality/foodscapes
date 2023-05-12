.load mod_spatialite

ALTER TABLE crop_groups
  DROP COLUMN id;

ALTER TABLE crops
  DROP COLUMN id;

ALTER TABLE soil_groups
  DROP COLUMN id;

ALTER TABLE foodscapes
  DROP COLUMN id;

ALTER TABLE intensity_groups
  DROP COLUMN id;

ALTER TABLE layers
  DROP COLUMN id;

ALTER TABLE countries
  DROP COLUMN id;

ALTER TABLE countries
  RENAME COLUMN "geometry" to "geometry_wkt";

ALTER TABLE countries
  ADD COLUMN bbox_geojson text;

ALTER TABLE countries
  ADD COLUMN geometry_geojson text;

SELECT AddGeometryColumn('countries', 'geometry', 4326, 'MULTIPOLYGON', 'XY');

UPDATE countries
  SET
    geometry = GeomFromText(geometry_wkt, 4326);

UPDATE countries
  SET
    bbox_geojson = AsGeoJSON(Envelope(geometry));

UPDATE countries
  SET
    geometry_geojson = AsGeoJSON(geometry);

ALTER TABLE countries
  DROP COLUMN geometry_wkt;

ALTER TABLE provinces
  DROP COLUMN id;

ALTER TABLE provinces
  RENAME COLUMN "geometry" to "geometry_wkt";

ALTER TABLE provinces
  ADD COLUMN bbox_geojson text;

ALTER TABLE provinces
  ADD COLUMN geometry_geojson text;

SELECT AddGeometryColumn('provinces', 'geometry', 4326, 'MULTIPOLYGON', 'XY');

UPDATE provinces
  SET
    geometry = GeomFromText(geometry_wkt, 4326);

UPDATE provinces
  SET
    bbox_geojson = AsGeoJSON(Envelope(geometry));

UPDATE provinces
  SET
    geometry_geojson = AsGeoJSON(geometry);

ALTER TABLE provinces
  DROP COLUMN geometry_wkt;

VACUUM;
