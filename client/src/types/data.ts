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

export interface RisksClimateData {
  risked: number;
  not_risked: number;
}

export interface RisksPollutionData {
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
  pollutionRisk?: readonly number[];
  country?: number;
  province?: number;
};

export type FiltersOmitProps =
  | 'foodscapes'
  | 'intensities'
  | 'crops'
  | 'climateRisk'
  | 'pollutionRisk'
  | null;
