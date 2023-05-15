import { Source, Layer } from 'react-map-gl';

import { LayerSettings } from 'store/explore-map';

import { LayerProps } from 'types/layers';

import { useLayer, useSource } from './hooks';

const LocationLayer = ({ settings, filters, beforeId }: LayerProps<LayerSettings>) => {
  const SOURCE = useSource({ settings, filters });
  const LAYER = useLayer({ settings });

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};

export default LocationLayer;
