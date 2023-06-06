import { useEffect } from 'react';

import { Source, Layer } from 'react-map-gl';

import { LayerProps, LayerSettings } from 'types/layers';

import { useLayers, useSource } from './hooks';

const PotectedAreasLayer = ({
  settings,
  beforeId,
  onAdd,
}: LayerProps<LayerSettings<'protected-areas'>>) => {
  const SOURCE = useSource();
  const LAYERS = useLayers({ settings });

  useEffect(() => {
    if (SOURCE && LAYERS && onAdd)
      onAdd({
        source: SOURCE,
        layers: LAYERS,
      });
  }, [onAdd]); // eslint-disable-line react-hooks/exhaustive-deps

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
