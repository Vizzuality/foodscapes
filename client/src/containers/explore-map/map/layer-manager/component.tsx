import { useMap } from 'react-map-gl';

import { layersAtom, layersSettingsAtom } from 'store/explore-map';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager } from '@vizzuality/layer-manager-react';
import { useRecoilValue } from 'recoil';

import LAYERS from 'containers/layers';

const LayerManagerContainer = () => {
  const { current: map } = useMap();
  const layers = useRecoilValue(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);

  return (
    <LayerManager map={map.getMap()} plugin={PluginMapboxGl}>
      {layers
        .filter((layer) => !!LAYERS[layer])
        .map((layer) => {
          const LayerComponent = LAYERS[layer];
          return <LayerComponent key={layer} settings={layersSettings[layer]} />;
        })}
    </LayerManager>
  );
};

export default LayerManagerContainer;
