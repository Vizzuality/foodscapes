import { useCallback } from 'react';

import { layersAtom, layersSettingsAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import { LEGENDS } from 'containers/layers';

import Legend from 'components/map/legend';

const LegendContainer = () => {
  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);
  const setLayerSettings = useSetRecoilState(layersSettingsAtom);

  const onChangeOrder = useCallback(
    (order) => {
      const newLayers = order.map((id) => {
        return layers.find((layer) => layer === id);
      });

      setLayers(newLayers);
    },
    [layers, setLayers]
  );

  const onChangeOpacity = useDebouncedCallback(
    (id, opacity, settings) =>
      setLayerSettings({
        ...layersSettings,
        [id]: {
          ...settings,
          opacity,
        },
      }),
    250,
    { maxWait: 1000 }
  );

  const onChangeVisibility = useCallback(
    (id, visibility, settings) =>
      setLayerSettings({
        ...layersSettings,
        [id]: {
          ...settings,
          visibility,
        },
      }),
    [layersSettings, setLayerSettings]
  );

  const onChangeExpand = useCallback(
    (id, expand, settings) =>
      setLayerSettings({
        ...layersSettings,
        [id]: {
          ...settings,
          expand,
        },
      }),
    [layersSettings, setLayerSettings]
  );

  return (
    <div className="absolute bottom-16 right-6 z-10 w-full max-w-xs">
      <Legend
        className={'max-h-[calc(100vh_-_theme(space.16)_-_theme(space.6)_-_theme(space.48))]'}
        sortable={{
          enabled: true,
          handle: true,
          handleIcon: <div className="text-white">Drag</div>,
        }}
        onChangeOrder={onChangeOrder}
      >
        {layers
          .filter((layer) => !!LEGENDS[layer])
          .map((layer) => {
            const LegendComponent = LEGENDS[layer];

            return (
              <LegendComponent
                key={layer}
                id={layer}
                settings={layersSettings[layer]}
                onChangeOpacity={(opacity, settings) => {
                  onChangeOpacity(layer, opacity, settings);
                }}
                onChangeVisibility={(visibility, settings) =>
                  onChangeVisibility(layer, visibility, settings)
                }
                onChangeExpand={(expand, settings) => {
                  onChangeExpand(layer, expand, settings);
                }}
              />
            );
          })}
      </Legend>
    </div>
  );
};

export default LegendContainer;
