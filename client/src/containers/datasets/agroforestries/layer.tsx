import { Source, Layer } from 'react-map-gl';

import { LayerProps, LayerSettings } from 'types/layers';

import { useLayer, useSource } from './hooks';

const AgroforestriesLayer = ({
  settings,
  filters,
  beforeId,
}: LayerProps<LayerSettings<'agroforestries'>>) => {
  const SOURCE = useSource({ filters, settings });
  const LAYER = useLayer({ filters, settings });

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};

export default AgroforestriesLayer;
