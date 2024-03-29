import { Popup } from 'react-map-gl';

import { layersAtom, layersSettingsAtom, popupAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { POPUPS } from 'containers/datasets';
import ProvincesPopup from 'containers/datasets/provinces/popup';

const PopupContainer = () => {
  const layers = useRecoilValue(layersAtom);
  const layersSettings = useRecoilValue(layersSettingsAtom);
  const popup = useRecoilValue(popupAtom);

  const setPopup = useSetRecoilState(popupAtom);

  if (!popup) return null;

  return (
    <Popup
      latitude={popup.lngLat.lat}
      longitude={popup.lngLat.lng}
      closeOnClick={false}
      style={{
        padding: 0,
      }}
      onClose={() => setPopup(null)}
    >
      <div className="pointer-events-none absolute top-0 left-0 h-4 w-full bg-gradient-to-b from-white" />
      <div className="max-h-[49vh] min-w-[250px] space-y-2.5 overflow-y-auto overflow-x-hidden p-2.5 pr-6 text-navy-500 shadow-[0_20px_15px_rgba(0,0,0,0.1)]">
        {layers
          .filter((layer) => {
            const layerSettings = layersSettings[layer];
            const visibility = layerSettings?.visibility ?? true;
            return visibility && !!POPUPS[layer];
          })
          .map((layer) => {
            const PopupComponent = POPUPS[layer];
            return <PopupComponent key={layer} event={popup} settings={layersSettings[layer]} />;
          })}

        <ProvincesPopup key="provinces-popup" event={popup} />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-full bg-gradient-to-t from-white" />
    </Popup>
  );
};

export default PopupContainer;
