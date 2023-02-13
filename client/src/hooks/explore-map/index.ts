import { LAYERS } from 'constants/layers';

import { UseLayersProps } from './types';

export default function useLayers({ layers }: UseLayersProps) {
  const LS = LAYERS.filter((layer) => layers.includes(layer.value));

  return LS.map((layer) => layer.config({ colormap: layer.colormap }));
}
