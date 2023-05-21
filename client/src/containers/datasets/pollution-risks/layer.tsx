import { Source, Layer } from 'react-map-gl';

import { LayerSettings } from 'types/layers';
import { LayerProps } from 'types/layers';

import { useLayer, useSource } from './hooks';

const PollutionRiskLayer = ({
  settings,
  filters,
  beforeId,
}: LayerProps<LayerSettings<'pollution-risks'>>) => {
  const SOURCE = useSource({ filters });
  const LAYER = useLayer({ settings });

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};

export default PollutionRiskLayer;
