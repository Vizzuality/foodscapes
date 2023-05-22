import { Settings } from 'components/map/legend/types';

export interface Restoration {
  id: number;
  label: string;
  color: string;
  column:
    | 'cropland_areas_suitable_for_restoration_area'
    | 'grassland_areas_suitable_for_restoration_area';
  value: 6 | 7 | 8 | 9 | 10;
}

export type RestorationSettings = {
  column: Restoration['column'];
} & Settings;
