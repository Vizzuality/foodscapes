import { Source, Layer } from 'react-map-gl';

import { LayerProps } from 'types/layers';

import { useLayer, useSource } from './hooks';

const CaseStudyLayer = ({ settings, beforeId }: LayerProps<{ id: number }>) => {
  const SOURCE = useSource({ id: settings.id });
  const LAYER = useLayer({ id: settings.id });

  if (!SOURCE || !LAYER) return null;

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};

export default CaseStudyLayer;
