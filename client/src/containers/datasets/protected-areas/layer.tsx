import { Source, Layer } from 'react-map-gl';

import { LayerProps, LayerSettings } from 'types/layers';

import { useLayers, useSource } from './hooks';

const PotectedAreasLayer = ({
  settings,
  beforeId,
}: LayerProps<LayerSettings<'protected-areas'>>) => {
  const SOURCE = useSource();
  const LAYERS = useLayers({ settings });

  if (!SOURCE || !LAYERS) return null;

  return (
    <Source {...SOURCE}>
      {LAYERS.map((layer) => (
        <Layer key={layer.id} {...layer} beforeId={beforeId} />
      ))}
    </Source>
  );
};

export default PotectedAreasLayer;
