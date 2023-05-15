import { Source, Layer } from 'react-map-gl';

import { LayerProps } from 'types/layers';

import { Settings } from 'components/map/legend/types';

import { useLayer, useSource } from './hooks';

const LocationLayer = ({ settings, filters, beforeId }: LayerProps<Settings>) => {
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
