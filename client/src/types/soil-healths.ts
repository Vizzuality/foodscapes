import { Settings } from 'components/map/legend/types';

export interface SoilHealth {
  id: number;
  label: string;
  color: string;
  column: 'areas_suitable_for_cover_cropping_area' | 'areas_suitable_for_minimum_tillage_area';
  value: 29 | 32;
}

export type SoilHealthSettings = {
  column: SoilHealth['column'];
} & Settings;
