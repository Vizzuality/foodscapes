import { Popup } from 'react-map-gl';

import { layersAtom, popupAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { POPUPS } from 'containers/layers';

const PopupContainer = () => {
  const layers = useRecoilValue(layersAtom);
  const popup = useRecoilValue(popupAtom);

  const setPopup = useSetRecoilState(popupAtom);

  if (!popup) return null;

  return (
    <Popup
      latitude={popup.lat}
      longitude={popup.lng}
      closeOnClick={false}
      style={{
        padding: 0,
      }}
      onClose={() => setPopup(null)}
    >
      <div className="space-y-2.5 p-2.5 pr-6">
        {layers
          .filter((layer) => !!POPUPS[layer])
          .map((layer) => {
            const PopupComponent = POPUPS[layer];
            return <PopupComponent key={layer} latLng={popup} />;
          })}
      </div>
    </Popup>
  );
};

export default PopupContainer;
