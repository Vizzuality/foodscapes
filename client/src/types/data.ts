export interface FoodscapeData {
  id: number;
  value: number;
  soil_groups: number;
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

export type PointData = {
  band_names: string[];
  coordinates: [number, number];
  values: number[];
};

export type FiltersProps = {
  foodscapes?: readonly number[];
  intensities?: readonly number[];
  crops?: readonly number[];
};

export type FiltersOmitProps = 'foodscapes' | 'intensities' | 'crops' | null;
