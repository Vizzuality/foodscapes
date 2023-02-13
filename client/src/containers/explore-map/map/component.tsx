import { useCallback, useMemo, useState } from 'react';

import { ViewState } from 'react-map-gl';

import { basemapAtom } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { BASEMAPS } from 'constants/basemaps';

import Map from 'components/map';
import { CustomMapProps } from 'components/map/types';

import Controls from './controls';
import LayerManager from './layer-manager';

const DEFAULT_PROPS: CustomMapProps = {
  id: 'default',
  initialViewState: {
    latitude: 20,
    longitude: 0,
    zoom: 2,
  },
  minZoom: 2,
  maxZoom: 5,
  mapStyle: 'mapbox://styles/afilatore90/cjuvfwn1heng71ftijvnv2ek6',
  // mapStyle: 'mapbox://styles/afilatore90/cldlfn6r0000601pdppkwocaz',
  // mapStyle: {
  //   version: 8,
  //   name: 'Custom',
  //   sources: {},
  //   layers: [
  //     {
  //       id: 'background',
  //       type: 'background',
  //       paint: {
  //         'background-color': '#000',
  //         'background-opacity': 0,
  //       },
  //     },
  //     {
  //       id: 'custom-layers',
  //       type: 'background',
  //       paint: {
  //         'background-color': '#000',
  //         'background-opacity': 0,
  //       },
  //     },
  //   ],
  // },
};

const MapContainer = () => {
  const { id, initialViewState, minZoom, maxZoom, mapStyle } = DEFAULT_PROPS;
  const [viewState, setViewState] = useState<Partial<ViewState>>({});

  const basemap = useRecoilValue(basemapAtom);

  const MAP_STYLE = useMemo(() => {
    return BASEMAPS.find((b) => b.value === basemap)?.url || mapStyle;
  }, [basemap, mapStyle]);

  const handleViewState = useCallback((vw: ViewState) => {
    setViewState(vw);
  }, []);

  return (
    <div className="relative h-screen w-full">
      <Map
        id={id}
        // mapStyle="mapbox://styles/afilatore90/cjuvfwn1heng71ftijvnv2ek6"
        // mapStyle="mapbox://styles/afilatore90/cldlfn6r0000601pdppkwocaz"
        mapStyle={MAP_STYLE}
        minZoom={minZoom}
        maxZoom={maxZoom}
        initialViewState={initialViewState}
        viewState={viewState}
        mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
        onMapViewStateChange={handleViewState}
      >
        {() => (
          <>
            <LayerManager />

            <Controls />
          </>
        )}
      </Map>
    </div>
  );
};

export default MapContainer;
