import { useCallback } from 'react';

import {
  caseStudyAtom,
  filtersSelector,
  layersAtom,
  layersInteractiveAtom,
  layersSettingsAtom,
} from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { LAYERS } from 'containers/datasets';
import CaseStudyLayer from 'containers/datasets/case-studies/layer';
import LocationLayer from 'containers/datasets/locations/layer';
import { MapboxOverlayProvider } from 'containers/explore-map/map/layer-manager/provider';

const LayerManagerContainer = () => {
  const layers = useRecoilValue(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);
  const setLayersInteractive = useSetRecoilState(layersInteractiveAtom);

  const filters = useRecoilValue(filtersSelector(null));

  const caseStudy = useRecoilValue(caseStudyAtom);

  const LAYERS_FILTERED = layers.filter((layer) => !!LAYERS[layer]);

  const handleLayerAdd = useCallback(
    ({ layers: layers1 }) => {
      setLayersInteractive((prev) => {
        // only add the layers that are not already in the list
        const newLayers = layers1.filter((l) => !prev.includes(l.id));
        return [...prev, ...newLayers.map((l) => l.id)];
      });
    },
    [setLayersInteractive]
  );

  const handleLayerRemove = useCallback(
    ({ layers: layers1 }) => {
      setLayersInteractive((prev) => {
        // remove the layers that are in the list
        const newLayers = prev.filter((l) => !layers1.map((l1) => l1.id).includes(l));
        return [...newLayers];
      });
    },
    [setLayersInteractive]
  );

  return (
    <MapboxOverlayProvider>
      <LocationLayer settings={layersSettings.locations} filters={filters} />
      <CaseStudyLayer settings={{ id: caseStudy }} />

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
            onAdd={handleLayerAdd}
            onRemove={handleLayerRemove}
          />
        );
      })}
    </MapboxOverlayProvider>
  );
};

export default LayerManagerContainer;
