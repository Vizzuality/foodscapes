import { LAYERS } from 'constants/layers';

import { UseLayersProps, UseLegendProps } from './types';

export function useLayers({ layers, settings = {} }: UseLayersProps) {
  const LS = LAYERS
    // Filter layers by the ones that are in the layers prop
    .filter((layer) => layers.includes(layer.value))
    // Sort layers by the order of the layers prop
    .sort((a, b) => layers.indexOf(a.value) - layers.indexOf(b.value));

  return LS.map((layer) => layer.config({ ...settings[layer.value], colormap: layer.colormap }));
}

export function useLegend({ layers, settings = {} }: UseLegendProps) {
  const LS = LAYERS
    // Filter layers by the ones that are in the layers prop
    .filter((layer) => layers.includes(layer.value))
    // Sort layers by the order of the layers prop
    .sort((a, b) => layers.indexOf(a.value) - layers.indexOf(b.value));

  return LS.map((layer) => ({
    id: layer.value,
    name: layer.label,
    settings: settings[layer.value] || {
      opacity: 1,
      visibility: true,
      expand: true,
    },
    settingsManager: {
      opacity: true,
      visibility: true,
      expand: true,
      info: true,
    },
  }));
}
