import { useMap } from 'react-map-gl';

import { layersAtom, layersSettingsAtom } from 'store/explore-map';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';
import { useRecoilValue } from 'recoil';

import { useLayers } from 'hooks/explore-map';

const LayerManagerContainer = () => {
  const { current: map } = useMap();
  const layers = useRecoilValue(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);

  const LAYERS = useLayers({ layers, settings: layersSettings });

  return (
    <LayerManager map={map.getMap()} plugin={PluginMapboxGl}>
      {LAYERS.map((layer) => {
        return <Layer key={layer.id} {...layer} />;
      })}
    </LayerManager>
  );
};

export default LayerManagerContainer;
