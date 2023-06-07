import { Source, Layer } from 'react-map-gl';

import { LayerProps, LayerSettings } from 'types/layers';

import { useLayer, useSource } from './hooks';

const DeprivationIndexLayer = ({
  settings,
  beforeId,
}: LayerProps<LayerSettings<'deprivation-index'>>) => {
  const SOURCE = useSource();
  const LAYER = useLayer({ settings });

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};

export default DeprivationIndexLayer;
