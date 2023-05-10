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

export interface ClimateRiskData {
  risked: number;
  not_risked: number;
}

export interface LandUseRiskData {
  agricultural_frontier_zones: number;
  area_with_high_conservation_value: number;
  critically_endangered_ecosystems: number;
  soil_erosion: number;
  water_scarcity: number;
}
export interface PollutionRiskData {
  risked: number;
  not_risked: number;
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
};

export type FiltersOmitProps =
  | 'foodscapes'
  | 'intensities'
  | 'crops'
  | 'climateRisk'
  | 'landUseRisk'
  | 'pollutionRisk'
  | null;
