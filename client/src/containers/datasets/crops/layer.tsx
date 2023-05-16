import { Source, Layer } from 'react-map-gl';

import { LayerProps, LayerSettings } from 'types/layers';

import { useLayer, useSource } from './hooks';

const CropsLayer = ({ settings, filters, beforeId }: LayerProps<LayerSettings<'crops'>>) => {
  const SOURCE = useSource({ filters, settings });
  const LAYER = useLayer({ settings });

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};

export default CropsLayer;
