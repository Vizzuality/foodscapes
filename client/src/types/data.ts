export interface FoodscapeData {
  id: number;
  value: number;
  parent_id: number;
}

export interface FoodscapeIntensityData {
  id: number;
  value: number;
}

export interface CropData {
  id: number;
  value: number;
  parent_id: number;
}

export interface LandUseRiskData {
  id:
    | 'agricultural_frontier_zones'
    | 'area_with_high_conservation_value'
    | 'critically_endangered_ecosystems'
    | 'soil_erosion'
    | 'water_scarcity';
  value: number;
  percentage: number;
}
export interface ClimateRiskData {
  id: 'risk' | 'not_risk';
  value: number;
}
export interface PollutionRiskData {
  id: 'risk' | 'not_risk';
  value: number;
}

export interface RestorationsData {
  id:
    | 'cropland_areas_suitable_for_restoration_area'
    | 'grassland_areas_suitable_for_restoration_area';
  value: number;
  percentage: number;
}

export interface AgroforestriesData {
  id:
    | 'cropland_areas_suitable_for_silvoarable_area'
    | 'forest_ecoregions_suitable_for_silvopastoral_area'
    | 'tropical_grassland_ecoregions_suitable_for_silvopastoral_area';
  value: number;
  percentage: number;
}

export interface SoilHealthsData {
  id: 'areas_suitable_for_cover_cropping_area' | 'areas_suitable_for_minimum_tillage_area';
  value: number;
  percentage: number;
}

export interface CountriesData {
  id: number;
}

export interface ProvincesData {
  id: number;
  parent_id: number;
}

export type PointData = {
  band_names: string[];
  coordinates: [number, number];
  values: number[];
};

export type FiltersProps = {
  foodscapes?: readonly number[];
  intensities?: readonly number[];
  crops?: readonly number[];
  climateRisk?: readonly number[];
  landUseRisk?: readonly number[];
  pollutionRisk?: readonly number[];
  country?: number;
  province?: number;
  caseStudy?: number;
};

export type FiltersOmitProps =
  | 'foodscapes'
  | 'intensities'
  | 'crops'
  | 'climateRisk'
  | 'landUseRisk'
  | 'pollutionRisk'
  | 'country'
  | 'province'
  | 'caseStudy'
  | null;

export type SortProps = {
  sortBy?: string;
  sortDirection?: string;
};

export type PaginationProps = {
  limit?: number;
  offset?: number;
};
