import { useCallback, useMemo, useRef, useState } from 'react';

import { useMap, ViewState } from 'react-map-gl';

import {
  basemapAtom,
  countryAtom,
  layersAtom,
  popupAtom,
  provinceAtom,
  sidebarOpenAtom,
} from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCountry } from 'hooks/countries';
import { useProvince } from 'hooks/provinces';

import { BASEMAPS } from 'constants/basemaps';

import Map from 'components/map';
import { CustomMapProps } from 'components/map/types';
import env from 'env.mjs';

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

  //leer estado si hay pais y provincia SINGULAR
  const country = useRecoilValue(countryAtom);
  const province = useRecoilValue(provinceAtom);
  // Hook useCountry y useProvince a los que le paso el id.
  const {
    data: countryData,
    isPlaceholderData: countryIsPlaceholderData,
    isFetching: countryIsFetching,
    isFetched: countryIsFetched,
    isError: countryIsError,
  } = useCountry(country);

  const {
    data: provinceData,
    isPlaceholderData: provinceIsPlaceholderData,
    isFetching: provinceIsFetching,
    isFetched: provinceIsFetched,
    isError: provinceIsError,
  } = useProvince(province);

  // UseMemo con los datos de los hooks para sacar el bbox correspondiente.

  const bbox = useMemo(() => {
    if (countryData || provinceData) {
      console.log('countryData', countryData);
      console.log('provinceData', provinceData);
      //return countryData?.bbox || provinceData?.bbox;
    }
    return null;
  }, [countryData, provinceData]);
  // el mapa tiene una prop bounds.

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
        left: sidebarOpen ? 640 : 0,
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
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
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
