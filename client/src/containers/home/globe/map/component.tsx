import { useMemo } from 'react';

import { stepAtom } from 'store/home';

import { useRecoilValue } from 'recoil';

import FadeY from 'containers/home/animations/fadeY';

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

  const step = useRecoilValue(stepAtom);

  const ANIMATE = useMemo(() => {
    if (step >= 10) {
      return 'animate';
    }

    return 'exit';
  }, [step]);

  return (
    <FadeY animate={ANIMATE}>
      <div className="pointer-events-none relative flex h-full w-full items-center justify-center">
        <div className="aspect-square w-full">
          <div className="relative flex h-full w-full items-center justify-center">
            <Map
              id={id}
              mapStyle={mapStyle}
              minZoom={minZoom}
              maxZoom={maxZoom}
              initialViewState={initialViewState}
              projection="globe"
              mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
              dragPan={false}
              dragRotate={false}
              scrollZoom={false}
              doubleClickZoom={false}
              keyboard={false}
            >
              {() => (
                <>
                  <LayerManager />
                  <Spin enabled={step >= 10} />
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
