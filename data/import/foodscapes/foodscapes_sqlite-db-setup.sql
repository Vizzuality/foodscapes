CREATE TABLE IF NOT EXISTS foodscapes (
[id] integer,
[foodscapes] integer,
[soil_group] integer,
[intensity_group] integer,
[dominant_crop] integer,
[dominant_crop_group] integer,
[country] text,
[province] text,
[critically_endangered_ecosystems] integer,
[high_conservation_value_areas] integer,
[agricultural_frontier_zones] integer,
[soil_erosion] integer,
[water_scarcity] integer,
[climate_risk] integer,
[population_change] integer,
[pesticide_risk] float,
[pixel_count] float,
[staple_crop_production] float,
[cereals_oil_production] float,
[roots_tubers_production] float,
[legume_pulses_production] float,
[perrenials_production] float,
[vegetables_production] float,
[other_crops_production] float,
[cropland_restoration_area] float,
[grassland_restoration_area] float,
[cropland_to_silvoarable_area] float,
[grassland_to_silvopastoral_area_low] float,
[grassland_to_silvopastoral_area_high] float,
[cover_crops_area] float
);

create index foodscapes_idx on foodscapes (foodscapes);
create index soil_group_idx on foodscapes (soil_group);
create index intensity_group_idx on foodscapes (intensity_group);
create index dominant_crop_idx on foodscapes (dominant_crop);
create index dominant_crop_group_idx on foodscapes (dominant_crop_group);
create index country_idx on foodscapes (country);
create index province_idx on foodscapes (province);
create index critically_endangered_ecosystems_idx on foodscapes (critically_endangered_ecosystems);
create index high_conservation_value_areas_idx on foodscapes (high_conservation_value_areas);
create index agricultural_frontier_zones_idx on foodscapes (agricultural_frontier_zones);
create index soil_erosion_idx on foodscapes (soil_erosion);
create index water_scarcity_idx on foodscapes (water_scarcity);
create index climate_risk_idx on foodscapes (climate_risk);
create index population_change_idx on foodscapes (population_change);
create index pesticide_risk_idx on foodscapes (pesticide_risk);
create index pixel_count_idx on foodscapes (pixel_count);
create index staple_crop_production_idx on foodscapes (staple_crop_production);
create index cereals_oil_production_idx on foodscapes (cereals_oil_production);
create index roots_tubers_production_idx on foodscapes (roots_tubers_production);
create index legume_pulses_production_idx on foodscapes (legume_pulses_production);
create index perrenials_production_idx on foodscapes (perrenials_production);
create index vegetables_production_idx on foodscapes (vegetables_production);
create index other_crops_production_idx on foodscapes (other_crops_production);
create index cropland_restoration_area_idx on foodscapes (cropland_restoration_area);
create index grassland_restoration_area_idx on foodscapes (grassland_restoration_area);
create index cropland_to_silvoarable_area_idx on foodscapes (cropland_to_silvoarable_area);
create index grassland_to_silvopastoral_area_low_idx on foodscapes (grassland_to_silvopastoral_area_low);
create index grassland_to_silvopastoral_area_high_idx on foodscapes (grassland_to_silvopastoral_area_high);
create index cover_crops_area_idx on foodscapes (cover_crops_area);
