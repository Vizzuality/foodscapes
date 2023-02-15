import { Settings } from 'components/map/legend/types';

export interface UseLayersProps {
  layers: readonly string[];
}

export interface UseLegendProps {
  layers: readonly string[];
  settings?: Record<string, Settings>;
}
