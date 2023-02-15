import { LAYERS } from 'constants/layers';

import { UseLayersProps, UseLegendProps } from './types';

export function useLayers({ layers }: UseLayersProps) {
  const LS = LAYERS.filter((layer) => layers.includes(layer.value));

  return LS.map((layer) => layer.config({ colormap: layer.colormap }));
}

export function useLegend({ layers, settings = {} }: UseLegendProps) {
  const LS = LAYERS.filter((layer) => layers.includes(layer.value));

  return LS.map((layer) => ({
    id: layer.value,
    name: layer.label,
    settings: settings[layer.value] || {
      opacity: 1,
      visibility: true,
    },
    settingsManager: {
      opacity: true,
      visibility: true,
    },
  }));
}
