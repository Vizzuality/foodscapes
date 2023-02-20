import { useCallback } from 'react';

import { layersAtom, layersSettingsAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import { useLegend } from 'hooks/explore-map';

import Legend from 'components/map/legend';
import LegendItem from 'components/map/legend/item';

const LegendContainer = () => {
  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);
  const setLayerSettings = useSetRecoilState(layersSettingsAtom);

  const LEGEND_LAYERS = useLegend({ layers, settings: layersSettings });

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
    (layer, opacity, settings) =>
      setLayerSettings({
        ...layersSettings,
        [layer.id]: {
          ...settings,
          opacity,
        },
      }),
    250,
    { maxWait: 1000 }
  );

  const onChangeVisibility = useCallback(
    (layer, visibility, settings) =>
      setLayerSettings({
        ...layersSettings,
        [layer.id]: {
          ...settings,
          visibility,
        },
      }),
    [layersSettings, setLayerSettings]
  );

  const onChangeExpand = useCallback(
    (layer, expand, settings) =>
      setLayerSettings({
        ...layersSettings,
        [layer.id]: {
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
        {LEGEND_LAYERS.map((layer) => {
          return (
            <LegendItem
              key={layer.id}
              {...layer}
              onChangeOpacity={(opacity, settings) => {
                onChangeOpacity(layer, opacity, settings);
              }}
              onChangeVisibility={(visibility, settings) => {
                onChangeVisibility(layer, visibility, settings);
              }}
              onChangeExpand={(expand, settings) => {
                onChangeExpand(layer, expand, settings);
              }}
            >
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam rerum libero modi quo
                quae maiores dolorum, reiciendis saepe corrupti maxime similique quos quidem
                repellendus tempore aut quam itaque amet laboriosam. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nam rerum libero modi quo quae maiores dolorum,
                reiciendis saepe corrupti maxime similique quos quidem repellendus tempore aut quam
                itaque amet laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                rerum libero modi quo quae maiores dolorum, reiciendis saepe corrupti maxime
                similique quos quidem repellendus tempore aut quam itaque amet laboriosam. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Nam rerum libero modi quo quae
                maiores dolorum, reiciendis saepe corrupti maxime similique quos quidem repellendus
                tempore aut quam itaque amet laboriosam. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nam rerum libero modi quo quae maiores dolorum, reiciendis saepe
                corrupti maxime similique quos quidem repellendus tempore aut quam itaque amet
                laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam rerum
                libero modi quo quae maiores dolorum, reiciendis saepe corrupti maxime similique
                quos quidem repellendus tempore aut quam itaque amet laboriosam. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Nam rerum libero modi quo quae maiores
                dolorum, reiciendis saepe corrupti maxime similique quos quidem repellendus tempore
                aut quam itaque amet laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Nam rerum libero modi quo quae maiores dolorum, reiciendis saepe corrupti
                maxime similique quos quidem repellendus tempore aut quam itaque amet laboriosam.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam rerum libero modi quo
                quae maiores dolorum, reiciendis saepe corrupti maxime similique quos quidem
                repellendus tempore aut quam itaque amet laboriosam. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nam rerum libero modi quo quae maiores dolorum,
                reiciendis saepe corrupti maxime similique quos quidem repellendus tempore aut quam
                itaque amet laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                rerum libero modi quo quae maiores dolorum, reiciendis saepe corrupti maxime
                similique quos quidem repellendus tempore aut quam itaque amet laboriosam.
              </div>
            </LegendItem>
          );
        })}
      </Legend>
    </div>
  );
};

export default LegendContainer;
