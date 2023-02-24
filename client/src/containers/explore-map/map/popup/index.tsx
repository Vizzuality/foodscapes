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
      onClose={() => setPopup(null)}
    >
      {layers
        .filter((layer) => !!POPUPS[layer])
        .map((layer) => {
          const PopupComponent = POPUPS[layer];
          return <PopupComponent key={layer} latLng={popup} />;
        })}
    </Popup>
  );
};

export default PopupContainer;
