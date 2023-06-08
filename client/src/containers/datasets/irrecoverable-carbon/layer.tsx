import { Source, Layer } from 'react-map-gl';

import { LayerProps, LayerSettings } from 'types/layers';

import { useLayer, useSource } from './hooks';

const IrrecoverableCarbonLayer = ({
  settings,
  beforeId,
}: LayerProps<LayerSettings<'irrecoverable-carbon'>>) => {
  const SOURCE = useSource();
  const LAYER = useLayer({ settings });

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};

export default IrrecoverableCarbonLayer;
