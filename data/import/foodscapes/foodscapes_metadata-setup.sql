.load mod_spatialite
select InitSpatialMetadata();

CREATE TABLE crop_groups (
  [id] integer,
  [value] integer,
  [label] text,
  [color] text
);

CREATE TABLE crops (
  [id] integer,
  [value] integer,
  [label] text,
  [color] text,
  [parent_id] integer references crop_group_labels(value)
);

CREATE TABLE soil_groups (
  [id] integer,
  [value] integer,
  [label] text,
  [color] text
);

CREATE TABLE meta_foodscapes (
  [id] integer,
  [value] integer,
  [label] text,
  [color] text,
  [parent_id] integer references soil_group_labels(value)
);

CREATE TABLE intensity_groups (
  [id] integer,
  [value] integer,
  [label] text,
  [color] text
);

CREATE TABLE layers (
  [id] integer,
  [section] text,
  [sub_section] text,
  [indicator] text,
  [type] text,
  [unit] text,
  [cog_band] integer,
  [widget_column] text,
  [legend] text null,
  [file_name] text
);

CREATE TABLE countries (
  [id] integer,
  [value] integer,
  [label] text,
  [iso] text,
  [geometry] text,
  [bbox] text
);

CREATE TABLE provinces (
  [id] integer,
  [value] integer,
  [label] text,
  [parent_id] integer,
  [iso] text,
  [geometry] text,
  [bbox] text
);
