import { useCallback, useMemo, useState, useRef } from 'react';

import { stepAtom } from 'store/home';

import { useRecoilValue } from 'recoil';

import FadeY from 'containers/animations/fadeY';

import Map from 'components/map';
import { CustomMapProps } from 'components/map/types';

import LayerManager from './layer-manager';
import Spin from './spin';

const DEFAULT_PROPS: CustomMapProps = {
  id: 'default',
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

const MapContainer = () => {
  const { id, initialViewState, minZoom, maxZoom, mapStyle } = DEFAULT_PROPS;
  const [interacting, setInteracting] = useState(false);
  const timeoutRef = useRef(null);

  const step = useRecoilValue(stepAtom);

  const ANIMATE = useMemo(() => {
    if (step >= 10) {
      return 'animate';
    }

    return 'exit';
  }, [step]);

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
    <FadeY animate={ANIMATE}>
      <div id="home-globe" className="relative flex h-full w-full items-center justify-center">
        <div className="aspect-square w-full">
          <div className="relative flex h-full w-full items-center justify-center">
            <Map
              id={id}
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
    </FadeY>
  );
};

export default MapContainer;
