export interface FoodscapeData {
  id: number;
  value: number;
  soil_groups: number;
}

export type PointData = {
  band_names: string[];
  coordinates: [number, number];
  values: number[];
};
