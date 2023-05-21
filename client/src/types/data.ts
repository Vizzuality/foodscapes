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
  id: 'risk' | 'not_risk';
  value: number;
}

export interface LandUseRiskData {
  id:
    | 'agricultural_frontier_zones'
    | 'area_with_high_conservation_value'
    | 'critically_endangered_ecosystems'
    | 'soil_erosion'
    | 'water_scarcity';
  value: number;
}
export interface PollutionRiskData {
  risk: number;
  not_risk: number;
}

export interface LocationData {
  id: number;
  name: string;
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
  | null;

export type SortProps = {
  sortBy?: string;
  sortDirection?: string;
};

export type PaginationProps = {
  limit?: number;
  offset?: number;
};
