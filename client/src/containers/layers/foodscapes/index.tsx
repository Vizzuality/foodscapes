import { Layer } from '@vizzuality/layer-manager-react';

import { LayerProps } from 'types/layers';

import { Settings } from 'components/map/legend/types';

import { useFoodscapesLayer } from './hooks';

const FoodscapesLayer = ({ settings, ...props }: LayerProps<Settings>) => {
  const LAYER = useFoodscapesLayer({ settings });

  if (!LAYER) return null;

  return <Layer {...LAYER} {...props} />;
};

export default FoodscapesLayer;
