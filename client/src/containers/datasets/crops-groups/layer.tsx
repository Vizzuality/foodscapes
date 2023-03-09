import { H3HexagonLayerProps } from '@deck.gl/geo-layers/typed';

import { LayerProps } from 'types/layers';

import DeckLayer from 'components/map/layers/deck-layer';
import { Settings } from 'components/map/legend/types';

import { useLayer } from './hooks';

const CropGroupsLayer = ({ id, settings, beforeId, zIndex }: LayerProps<Settings>) => {
  const LAYER = useLayer({ id, settings });

  if (!LAYER) return null;

  return <DeckLayer<H3HexagonLayerProps> {...LAYER} id={id} beforeId={beforeId} zIndex={zIndex} />;
};

export default CropGroupsLayer;
