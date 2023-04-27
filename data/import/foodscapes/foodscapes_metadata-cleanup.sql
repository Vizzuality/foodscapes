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

UPDATE countries
  SET
    geometry_geom = GeomFromText(geometry),
    bbox_geom = GeomFromText(bbox);

ALTER TABLE provinces
  DROP COLUMN id;

UPDATE provinces
  SET
    geometry_geom = GeomFromText(geometry),
    bbox_geom = GeomFromText(bbox);


