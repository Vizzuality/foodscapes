import { useCallback, useState, useRef } from 'react';

import { stepAtom } from 'store/home';

import { useRecoilValue } from 'recoil';

import Map from 'components/map';
import { CustomMapProps } from 'components/map/types';

import LayerManager from './layer-manager';
import Spin from './spin';

const DEFAULT_PROPS: CustomMapProps = {
  initialViewState: {
    latitude: 20,
    longitude: 0,
    zoom: 1.5,
  },
  minZoom: 0,
  maxZoom: 5,
  mapStyle: 'mapbox://styles/afilatore90/cldlfn6r0000601pdppkwocaz',
  // mapStyle: {
  //   version: 8,
  //   name: 'Custom',
  //   sources: {},
  //   layers: [
  //     {
  //       id: 'custom-layers',
  //       type: 'background',
  //       paint: {
  //         'background-color': '#000',
  //         'background-opacity': 0,
  //       },
  //     },
  //     {
  //       id: 'background',
  //       type: 'background',
  //       paint: {
  //         'background-color': '#000',
  //         'background-opacity': 0.1,
  //       },
  //     },
  //   ],
  // },
};

const MapContainer = ({ currentId }) => {
  const { initialViewState, minZoom, maxZoom, mapStyle } = DEFAULT_PROPS;
  const [interacting, setInteracting] = useState(false);
  const timeoutRef = useRef(null);

  const step = useRecoilValue(stepAtom);

  const handleMouseDown = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setInteracting(true);
  }, []);

  const handleMapViewStateChange = useCallback(() => {
    timeoutRef.current = setTimeout(() => setInteracting(false), 500);
  }, []);

  return (
    <div
      id="home-globe"
      className="relative flex h-[300px] w-full items-center justify-center lg:h-full"
    >
      <div className="aspect-square w-full">
        <div className="relative flex h-full w-full items-center justify-center">
          <Map
            id={currentId}
            mapStyle={mapStyle}
            minZoom={minZoom}
            maxZoom={maxZoom}
            viewState={initialViewState}
            projection="globe"
            mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
            constrainedAxis="y"
            dragPan={true}
            dragRotate={false}
            scrollZoom={false}
            doubleClickZoom={false}
            keyboard={false}
            onMouseDown={handleMouseDown}
            onMapViewStateChange={handleMapViewStateChange}
          >
            {() => (
              <>
                <LayerManager />
                <Spin enabled={step >= 10 && !interacting} />
              </>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
