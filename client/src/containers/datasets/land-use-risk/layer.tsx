import { Source, Layer } from 'react-map-gl';

import { LayerProps, LayerSettings } from 'types/layers';

import { useLayer, useSource } from './hooks';

const LandUseRiskLayer = ({
  settings,
  filters,
  beforeId,
}: LayerProps<LayerSettings<'land-use-risk'>>) => {
  const SOURCE = useSource({ filters });
  const LAYER = useLayer({ settings });

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};

export default LandUseRiskLayer;
