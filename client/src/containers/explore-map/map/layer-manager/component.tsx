import { foodscapesAtom, intensitiesAtom, layersAtom, layersSettingsAtom } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { LAYERS } from 'containers/datasets';
import { MapboxOverlayProvider } from 'containers/explore-map/map/layer-manager/provider';

const LayerManagerContainer = () => {
  const layers = useRecoilValue(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);

  const foodscapes = useRecoilValue(foodscapesAtom);
  const intensities = useRecoilValue(intensitiesAtom);

  const LAYERS_FILTERED = layers.filter((layer) => !!LAYERS[layer]);

  return (
    <MapboxOverlayProvider>
      {LAYERS_FILTERED.map((layer, i) => {
        const LayerComponent = LAYERS[layer];
        // We need to define where do we want to put the layer
        // We want to put it before the custom-layers transparent backgrond
        const beforeId = i === 0 ? 'custom-layers' : `${LAYERS_FILTERED[i - 1]}-layer`;

        return (
          <LayerComponent
            key={layer}
            id={`${layer}-layer`}
            filters={{
              foodscapes,
              intensities,
            }}
            settings={
              layersSettings[layer] ?? {
                opacity: 1,
                visibility: true,
                expand: false,
              }
            }
            beforeId={beforeId}
            zIndex={1000 - i}
          />
        );
      })}
    </MapboxOverlayProvider>
  );
};

export default LayerManagerContainer;
