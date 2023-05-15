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
  },
  minZoom: 2,
  maxZoom: 20,
  mapStyle: 'mapbox://styles/afilatore90/cjuvfwn1heng71ftijvnv2ek6',
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

  const { data: countryData } = useCountry(country);
  const { data: provinceData } = useProvince(province);

  const bounds: CustomMapProps['bounds'] | null = useMemo(() => {
    if (countryData || provinceData) {
      return {
        bbox: provinceData?.bbox || countryData?.bbox,
        options: {
          padding: {
            top: 50,
            bottom: 50,
            left: sidebarOpen ? 640 + 50 : 50,
            right: 50,
          },
        },
      };
    }
    return null;
  }, [countryData, provinceData]); // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div className="absolute right-0 h-screen w-full">
      <Map
        id={id}
        mapStyle={MAP_STYLE}
        minZoom={minZoom}
        maxZoom={maxZoom}
        bounds={bounds}
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
