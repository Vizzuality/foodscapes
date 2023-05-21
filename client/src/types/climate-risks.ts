import { Settings } from 'components/map/legend/types';

export interface ClimateRisk {
  id: 'risk' | 'not_risk';
  label: string;
  color: string;
  value: 1 | -1;
}

export type ClimateChangeSettings = {} & Settings;
