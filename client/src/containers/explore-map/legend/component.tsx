import { layersSettingsAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import Legend from 'components/map/legend';
import LegendItem from 'components/map/legend/item';

const LegendContainer = () => {
  const layersSettings = useRecoilValue(layersSettingsAtom);
  const setLayerSettings = useSetRecoilState(layersSettingsAtom);

  console.log(layersSettings);

  return (
    <div className="absolute bottom-16 right-6 z-10">
      <Legend
        maxHeight={'80vh'}
        sortable={{
          enabled: true,
          handle: true,
          handleIcon: <div className="text-white">Drag</div>,
        }}
      >
        <LegendItem
          id="test"
          name="Foodscapes"
          className="bg-white px-5 py-2.5"
          settingsManager={{
            opacity: true,
            visibility: true,
          }}
          settings={
            layersSettings.test || {
              opacity: 1,
              visibility: true,
            }
          }
          onChangeOpacity={(opacity, settings) =>
            setLayerSettings({ test: { ...settings, opacity } })
          }
          onChangeVisibility={(visibility, settings) =>
            setLayerSettings({ test: { ...settings, visibility } })
          }
        >
          <div className="text-navy-500">Testing</div>
        </LegendItem>
      </Legend>
    </div>
  );
};

export default LegendContainer;
