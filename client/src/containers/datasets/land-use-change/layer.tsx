import { LineLayerProps } from '@deck.gl/layers/typed';

import { LayerProps } from 'types/layers';

import DeckLayer from 'components/map/layers/deck-layer';
import { Settings } from 'components/map/legend/types';

import { useLayer } from './hooks';

const LandUseChangeLayer = ({ id, settings, zIndex, beforeId }: LayerProps<Settings>) => {
  const LAYER = useLayer({
    id,
    settings,
  });

  if (!LAYER) return null;

  return (
    <DeckLayer<LineLayerProps>
      {...LAYER}
      id={id}
      settings={settings}
      beforeId={beforeId}
      zIndex={zIndex}
    />
  );
};

export default LandUseChangeLayer;
