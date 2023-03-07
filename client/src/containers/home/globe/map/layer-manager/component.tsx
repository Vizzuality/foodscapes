import { useMap } from 'react-map-gl';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager } from '@vizzuality/layer-manager-react';

import FoodscapesLayer from 'containers/datasets/foodscapes/layer';

const LayerManagerContainer = () => {
  const { current: map } = useMap();

  return (
    <LayerManager map={map.getMap()} plugin={PluginMapboxGl}>
      <FoodscapesLayer />
    </LayerManager>
  );
};

export default LayerManagerContainer;
