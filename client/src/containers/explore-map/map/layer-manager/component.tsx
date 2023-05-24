import { filtersSelector, layersAtom, layersSettingsAtom } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { LAYERS } from 'containers/datasets';
import LocationLayer from 'containers/datasets/locations/layer';
import { MapboxOverlayProvider } from 'containers/explore-map/map/layer-manager/provider';

const LayerManagerContainer = () => {
  const layers = useRecoilValue(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);

  const filters = useRecoilValue(filtersSelector(null));

  const LAYERS_FILTERED = layers.filter((layer) => !!LAYERS[layer]);

  return (
    <MapboxOverlayProvider>
      <LocationLayer settings={layersSettings.locations} filters={filters} />

      {LAYERS_FILTERED.map((layer, i) => {
        const LayerComponent = LAYERS[layer];
        // We need to define where do we want to put the layer
        // We want to put it before the custom-layers transparent backgrond
        const beforeId = i === 0 ? 'custom-layers' : `${LAYERS_FILTERED[i - 1]}-layer`;

        return (
          <LayerComponent
            key={layer}
            id={`${layer}-layer`}
            filters={filters}
            settings={layersSettings[layer]}
            beforeId={beforeId}
            zIndex={1000 - i}
          />
        );
      })}
    </MapboxOverlayProvider>
  );
};

export default LayerManagerContainer;
