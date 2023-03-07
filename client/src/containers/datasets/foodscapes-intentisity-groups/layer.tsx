import { Layer } from 'react-map-gl';

import { LayerProps } from 'types/layers';

import { Settings } from 'components/map/legend/types';

import { useLayer } from './hooks';

const FoodscapesIntensityGroupsLayer = ({ settings, beforeId }: LayerProps<Settings>) => {
  const LAYER = useLayer({ settings });

  if (!LAYER) return null;

  return (
    <Layer
      {...LAYER}
      beforeId={beforeId}
      onAdd={LAYER.onAdd}
      onRemove={LAYER.onRemove}
      render={LAYER.render}
      setProps={LAYER.setProps}
    />
  );
};

export default FoodscapesIntensityGroupsLayer;
