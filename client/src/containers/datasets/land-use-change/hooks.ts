import { useEffect, useMemo, useRef } from 'react';

import { useMap } from 'react-map-gl';

import { LineLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { AnyLayer } from 'mapbox-gl';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseLandUseChangeLayerProps {
  settings?: Partial<Settings>;
  zIndex?: number;
}

interface UseLandUseChangeLegendProps {
  settings?: Settings;
}

type LayerDeckProps = AnyLayer & {
  implementation: any;
};

export function useLayer(): AnyLayer {
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'land-use-change-layer',
      type: 'background',
      paint: {
        'background-color': '#77CCFF',
        'background-opacity': 0,
      },
    };
  }, []);

  return layer;
}

export function useDeckLayer({
  settings = {},
  zIndex,
}: UseLandUseChangeLayerProps): typeof MapboxLayer {
  const { current: map } = useMap();
  const layerRef = useRef<typeof MapboxLayer>(null);
  const visibility = settings.visibility ?? true;

  const layer = useMemo<typeof MapboxLayer>(() => {
    if (layerRef.current) {
      return layerRef.current;
    }

    layerRef.current = new MapboxLayer({
      id: 'land-use-change-layer-deck',
      type: LineLayer,
      data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-segments.json',

      /* props from LineLayer class */

      getColor: (d) => [Math.sqrt(d.inbound + d.outbound), 140, 0],
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getWidth: 12,
      // widthMaxPixels: Number.MAX_SAFE_INTEGER,
      // widthMinPixels: 0,
      // widthScale: 1,
      // widthUnits: 'pixels',

      /* props inherited from Layer class */

      // autoHighlight: false,
      // coordinateOrigin: [0, 0, 0],
      // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
      // highlightColor: [0, 0, 128, 128],
      // modelMatrix: null,
      // opacity: 1,
      pickable: true,
      getPolygonOffset: () => [0, zIndex * 1000],
      // visible: true,
      // wrapLongitude: false,
      visible: visibility,
      opacity: settings.opacity ?? 1,
    });

    return layerRef.current;
  }, [settings, visibility, zIndex]);

  useEffect(() => {
    const l = map.getLayer('land-use-change-layer-deck') as LayerDeckProps;

    if (l) {
      l.implementation.setProps({
        visible: visibility,
        opacity: settings.opacity ?? 1,
        getPolygonOffset: () => [0, zIndex * 1000],
      });
    }
  }, [map, visibility, settings, zIndex]);

  return layer;
}

export function useLegend({
  settings = {
    opacity: 1,
    visibility: true,
    expand: true,
  },
}: UseLandUseChangeLegendProps) {
  const { data: foodscapesData } = useFoodscapes();

  const colormap = useMemo(() => {
    const c = foodscapesData.reduce((acc, v) => {
      return {
        ...acc,
        [v.value]: v.color,
      };
    }, {});
    return encodeURIComponent(JSON.stringify(c));
  }, [foodscapesData]);

  const legend = useMemo(() => {
    if (!foodscapesData || !foodscapesData.length) {
      return null;
    }

    return {
      id: 'land-use-change',
      name: 'Land Use Change',
      colormap,
      settings: settings,
      settingsManager: {
        opacity: true,
        visibility: true,
        expand: true,
        info: true,
      },
    };
  }, [foodscapesData, colormap, settings]);

  return legend;
}
