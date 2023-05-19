import { Settings } from 'components/map/legend/types';

export interface FoodscapeIntensity {
  id: number;
  label: string;
  color: string;
  value: number;
}

export type FoodscapesIntentisitySettings = {} & Settings;

export type FoodscapeIntensityChartData = {
  '1': number;
  '2': number;
  '3': number;
};
