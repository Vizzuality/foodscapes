import { Settings } from 'components/map/legend/types';

export interface PollutionRisk {
  id: number;
  label: string;
  color: string;
  value: 1 | -1;
}

export type PollutionSettings = {} & Settings;
