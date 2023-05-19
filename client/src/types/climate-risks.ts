import { Settings } from 'components/map/legend/types';

export interface ClimateRisk {
  id: number;
  label: string;
  color: string;
  value: 1 | -1;
}

export type ClimateChangeSettings = {} & Settings;
