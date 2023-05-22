import { Source, Layer } from 'react-map-gl';

import { LayerProps, LayerSettings } from 'types/layers';

import { useLayer, useSource } from './hooks';

const LocationLayer = ({ settings, filters, beforeId }: LayerProps<LayerSettings<'locations'>>) => {
  const SOURCE = useSource({ settings, filters });
  const LAYER = useLayer({ settings, filters });

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};

export default LocationLayer;
