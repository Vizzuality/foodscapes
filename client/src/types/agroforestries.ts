import { Settings } from 'components/map/legend/types';

export interface Agroforestry {
  id: number;
  label: string;
  color: string;
  column:
    | 'cropland_areas_suitable_for_silvoarable_area'
    | 'forest_ecoregions_suitable_for_silvopastoral_area'
    | 'tropical_grassland_ecoregions_suitable_for_silvopastoral_area';
  value: 20 | 23 | 26;
}

export type AgroforestrySettings = {
  column: Agroforestry['column'];
} & Settings;
