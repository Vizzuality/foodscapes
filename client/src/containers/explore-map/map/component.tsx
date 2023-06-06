import { useCallback, useMemo, useRef } from 'react';

import { useMap } from 'react-map-gl';

import Image from 'next/image';
import Link from 'next/link';

import {
  basemapAtom,
  bboxAtom,
  layersAtom,
  layersInteractiveAtom,
  popupAtom,
  sidebarOpenAtom,
  tmpBboxAtom,
} from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Bbox } from 'types/map';

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

  const { [id]: map } = useMap();

  const mapResizerIntervalRef = useRef<number>();

  const basemap = useRecoilValue(basemapAtom);
  const layers = useRecoilValue(layersAtom);
  const layersInteractive = useRecoilValue(layersInteractiveAtom);
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);
  const bbox = useRecoilValue(bboxAtom);
  const tmpBbox = useRecoilValue(tmpBboxAtom);

  const setBbox = useSetRecoilState(bboxAtom);
  const setTmpBbox = useSetRecoilState(tmpBboxAtom);

  const bounds: CustomMapProps['bounds'] | null = useMemo(() => {
    if (tmpBbox) {
      return {
        bbox: tmpBbox,
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
  }, [tmpBbox]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleViewState = useCallback(() => {
    if (map) {
      const b = map
        .getBounds()
        .toArray()
        .flat()
        .map((v) => {
          return parseFloat(v.toFixed(2));
        }) as Bbox;

      setBbox(b as Bbox);
      setTmpBbox(null);
    }
  }, [map, setBbox, setTmpBbox]);

  const handleClick = useCallback(
    (e) => {
      if (layers.length) {
        setPopup({
          ...e,
          features: e?.features ?? [],
        });
      }
    },
    [layers, setPopup]
  );

  return (
    <div className="absolute right-0 z-0 h-screen w-full">
      <Link href="/" className="absolute top-5 left-5 z-10">
        <Image src="/images/logo-map.svg" alt="Logo" width={151} height={29} />
      </Link>
      <Map
        id={id}
        mapStyle={MAP_STYLE}
        minZoom={minZoom}
        maxZoom={maxZoom}
        bounds={bounds}
        initialViewState={{
          ...initialViewState,
          ...(bbox && { bounds: bbox }),
        }}
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        interactiveLayerIds={layersInteractive}
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
