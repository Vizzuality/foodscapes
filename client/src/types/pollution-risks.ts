import { Settings } from 'components/map/legend/types';

export interface PollutionRisk {
  id: 'risk' | 'not_risk';
  label: string;
  color: string;
  value: 1 | -1;
}

export type PollutionSettings = {} & Settings;
