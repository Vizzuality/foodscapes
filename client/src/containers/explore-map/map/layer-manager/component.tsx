import { layersAtom, layersSettingsAtom } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { LAYERS } from 'containers/datasets';

const LayerManagerContainer = () => {
  const layers = useRecoilValue(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);

  const LAYERS_FILTERED = layers.filter((layer) => !!LAYERS[layer]);

  return (
    <>
      {LAYERS_FILTERED.map((layer, i) => {
        const LayerComponent = LAYERS[layer];
        // We need to define where do we want to put the layer
        // We want to put it before the custom-layers transparent backgrond
        const beforeId = i === 0 ? 'custom-layers' : `${LAYERS_FILTERED[i - 1]}-layer`;

        return <LayerComponent key={layer} settings={layersSettings[layer]} beforeId={beforeId} />;
      })}
    </>
  );
};

export default LayerManagerContainer;
