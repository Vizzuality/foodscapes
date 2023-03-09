import { ScatterplotLayerProps } from '@deck.gl/layers/typed';

import { LayerProps } from 'types/layers';

import DeckLayer from 'components/map/layers/deck-layer';
import { Settings } from 'components/map/legend/types';

import { useLayer } from './hooks';

const CropGroupsLayer = ({ id, settings, beforeId, zIndex }: LayerProps<Settings>) => {
  const LAYER = useLayer({ id, settings });

  if (!LAYER) return null;

  return (
    <DeckLayer<ScatterplotLayerProps> {...LAYER} id={id} beforeId={beforeId} zIndex={zIndex} />
  );
};

export default CropGroupsLayer;
