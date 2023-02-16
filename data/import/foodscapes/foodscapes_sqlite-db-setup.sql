CREATE TABLE IF NOT EXISTS foodscapes (
[id] integer,
[foodscapes] integer,
[soil_groups] integer,
[intensity_groups] integer,
[crops] integer,
[crop_groups] integer,
[critically_endangered_ecosystems] integer,
[area_with_high_conservation_value] integer,
[agricultural_frontier_zones] integer,
[soil_erosion] integer,
[water_scarcity] integer,
[climate_risk] integer,
[pesticide_risk] integer,
[cropland_areas_for_restoration_fraq] float,
[cropland_areas_for_restoration_area] float,
[cropland_areas_for_restoration_Cseq] float,
[grassland_area_for_restoration_fraq] float,
[grassland_area_for_restoration_area] float,
[grassland_area_for_restoration_Cseq] float,
[conversion_of_cropland_to_silvoarable_fraq] float,
[conversion_of_cropland_to_silvoarable_area] float,
[conversion_of_cropland_to_silvoarable_Cseq] float,
[conversion_of_grassland_to_silvopastoral_fraq] float,
[conversion_of_grassland_to_silvopastoral_area] float,
[conversion_of_grassland_to_silvopastoral_Cseq] float,
[cover_crops_fraq] float,
[cover_crops_area] float,
[cover_crops_Cseq] float,
[minimum_tillage_fraq] float,
[minimum_tillage_area] float,
[minimum_tillage_Cseq] float,
[country] integer,
[province] integer,
[pixel_count] integer
);

CREATE INDEX foodscapes_idx ON foodscapes(foodscapes);
CREATE INDEX soil_groups_idx ON foodscapes(soil_groups);
CREATE INDEX intensity_groups_idx ON foodscapes(intensity_groups);
CREATE INDEX crops_idx ON foodscapes(crops);
CREATE INDEX crop_groups_idx ON foodscapes(crop_groups);
CREATE INDEX critically_endangered_ecosystems_idx ON foodscapes(critically_endangered_ecosystems);
CREATE INDEX area_with_high_conservation_value_idx ON foodscapes(area_with_high_conservation_value);
CREATE INDEX agricultural_frontier_zones_idx ON foodscapes(agricultural_frontier_zones);
CREATE INDEX soil_erosion_idx ON foodscapes(soil_erosion);
CREATE INDEX water_scarcity_idx ON foodscapes(water_scarcity);
CREATE INDEX climate_risk_idx ON foodscapes(climate_risk);
CREATE INDEX pesticide_risk_idx ON foodscapes(pesticide_risk);
CREATE INDEX cropland_areas_for_restoration_fraq_idx ON foodscapes(cropland_areas_for_restoration_fraq);
CREATE INDEX cropland_areas_for_restoration_area_idx ON foodscapes(cropland_areas_for_restoration_area);
CREATE INDEX cropland_areas_for_restoration_Cseq_idx ON foodscapes(cropland_areas_for_restoration_Cseq);
CREATE INDEX grassland_area_for_restoration_fraq_idx ON foodscapes(grassland_area_for_restoration_fraq);
CREATE INDEX grassland_area_for_restoration_area_idx ON foodscapes(grassland_area_for_restoration_area);
CREATE INDEX grassland_area_for_restoration_Cseq_idx ON foodscapes(grassland_area_for_restoration_Cseq);
CREATE INDEX conversion_of_cropland_to_silvoarable_fraq_idx ON foodscapes(conversion_of_cropland_to_silvoarable_fraq);
CREATE INDEX conversion_of_cropland_to_silvoarable_area_idx ON foodscapes(conversion_of_cropland_to_silvoarable_area);
CREATE INDEX conversion_of_cropland_to_silvoarable_Cseq_idx ON foodscapes(conversion_of_cropland_to_silvoarable_Cseq);
CREATE INDEX conversion_of_grassland_to_silvopastoral_fraq_idx ON foodscapes(conversion_of_grassland_to_silvopastoral_fraq);
CREATE INDEX conversion_of_grassland_to_silvopastoral_area_idx ON foodscapes(conversion_of_grassland_to_silvopastoral_area);
CREATE INDEX conversion_of_grassland_to_silvopastoral_Cseq_idx ON foodscapes(conversion_of_grassland_to_silvopastoral_Cseq);
CREATE INDEX cover_crops_fraq_idx ON foodscapes(cover_crops_fraq);
CREATE INDEX cover_crops_area_idx ON foodscapes(cover_crops_area);
CREATE INDEX cover_crops_Cseq_idx ON foodscapes(cover_crops_Cseq);
CREATE INDEX minimum_tillage_fraq_idx ON foodscapes(minimum_tillage_fraq);
CREATE INDEX minimum_tillage_area_idx ON foodscapes(minimum_tillage_area);
CREATE INDEX minimum_tillage_Cseq_idx ON foodscapes(minimum_tillage_Cseq);
CREATE INDEX country_idx ON foodscapes(country);
CREATE INDEX province_idx ON foodscapes(province);
