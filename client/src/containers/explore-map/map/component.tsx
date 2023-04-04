import { useCallback, useMemo, useRef, useState } from 'react';

import { useMap, ViewState } from 'react-map-gl';

import { basemapAtom, layersAtom, popupAtom, sidebarOpenAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { BASEMAPS } from 'constants/basemaps';

import Map from 'components/map';
import { CustomMapProps } from 'components/map/types';

import Controls from './controls';
import LayerManager from './layer-manager';
import Popup from './popup';

const DEFAULT_PROPS: CustomMapProps = {
  id: 'default',
  initialViewState: {
    longitude: 0,
    latitude: 20,
    zoom: 2,
    pitch: 0,
    bearing: 0,

    // longitude: -122.4,
    // latitude: 37.74,
    // zoom: 11,
    // pitch: 30,
    // bearing: 0,
  },
  minZoom: 2,
  maxZoom: 20,
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

  const { [id]: map } = useMap();

  const mapResizerIntervalRef = useRef<number>();

  const basemap = useRecoilValue(basemapAtom);
  const layers = useRecoilValue(layersAtom);
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);

  const setPopup = useSetRecoilState(popupAtom);

  const MAP_STYLE = useMemo(() => {
    return BASEMAPS.find((b) => b.value === basemap)?.url || mapStyle;
  }, [basemap, mapStyle]);

  const handleResize = useCallback(() => {
    // Prevent map flickering by ruunning the resize after aa timeout of 0
    // This will queue the resize after in the JS thread
    setTimeout(() => {
      map.resize();
    }, 0);

    mapResizerIntervalRef.current = requestAnimationFrame(() => {
      handleResize();
    });
  }, [map]);

  const handleViewState = useCallback((vw: ViewState) => {
    setViewState(vw);
  }, []);

  const handleClick = useCallback(
    (e) => {
      const { lngLat } = e;
      if (layers.length) {
        setPopup(lngLat);
      }
    },
    [layers, setPopup]
  );

  useMemo(() => {
    map?.easeTo({
      padding: {
        left: sidebarOpen ? 576 : 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      duration: 500,
    });
  }, [map, sidebarOpen]);

  return (
    <div className="absolute right-0 h-screen w-full">
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
        onClick={handleClick}
      >
        {() => (
          <>
            <LayerManager />

            <Controls />

            <Popup />
          </>
        )}
      </Map>
    </div>
  );
};

export default MapContainer;
