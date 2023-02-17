import { layersAtom, layersSettingsAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useLegend } from 'hooks/explore-map';

import Legend from 'components/map/legend';
import LegendItem from 'components/map/legend/item';

const LegendContainer = () => {
  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);
  const setLayerSettings = useSetRecoilState(layersSettingsAtom);

  const LEGEND_LAYERS = useLegend({ layers, settings: layersSettings });

  return (
    <div className="absolute bottom-16 right-6 z-10">
      <Legend
        maxHeight={'80vh'}
        sortable={{
          enabled: true,
          handle: true,
          handleIcon: <div className="text-white">Drag</div>,
        }}
        onChangeOrder={(order) => {
          const newLayers = order.map((id) => {
            return layers.find((layer) => layer === id);
          });

          setLayers(newLayers);
        }}
      >
        {LEGEND_LAYERS.map((layer) => {
          return (
            <LegendItem
              key={layer.id}
              {...layer}
              onChangeOpacity={(opacity, settings) =>
                setLayerSettings({ [layer.id]: { ...settings, opacity } })
              }
              onChangeVisibility={(visibility, settings) =>
                setLayerSettings({ [layer.id]: { ...settings, visibility } })
              }
              onChangeExpand={(expand, settings) =>
                setLayerSettings({ [layer.id]: { ...settings, expand } })
              }
            >
              <div>Testing expand</div>
            </LegendItem>
          );
        })}
      </Legend>
    </div>
  );
};

export default LegendContainer;
