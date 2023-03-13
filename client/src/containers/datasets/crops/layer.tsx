import { Source, Layer } from 'react-map-gl';

import { LayerProps } from 'types/layers';

import { Settings } from 'components/map/legend/types';

import { useLayer, useSource } from './hooks';

const CropsLayer = ({ settings, beforeId }: LayerProps<Settings>) => {
  const SOURCE = useSource();
  const LAYERS = useLayer({ settings });

  if (!SOURCE || !LAYERS) return null;

  return (
    <Source {...SOURCE}>
      {LAYERS.map((LAYER) => (
        <Layer key={LAYER.id} {...LAYER} beforeId={beforeId} />
      ))}
    </Source>
  );
  // return <Layer {...LAYER} {...props} />;
};

export default CropsLayer;
