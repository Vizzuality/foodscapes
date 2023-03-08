import { useEffect, useMemo, useRef } from 'react';

import { useMap } from 'react-map-gl';

import { ScatterplotLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { AnyLayer } from 'mapbox-gl';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseFoodscapesIntensityGroupsLayerProps {
  settings?: Partial<Settings>;
  zIndex?: number;
}

interface UseFoodscapesIntensityGroupsLegendProps {
  settings?: Settings;
}

type LayerDeckProps = AnyLayer & {
  implementation: any;
};

export function useLayer(): AnyLayer {
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'foodscapes-intensity-groups-layer',
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
}: UseFoodscapesIntensityGroupsLayerProps): typeof MapboxLayer {
  const { current: map } = useMap();
  const layerRef = useRef<typeof MapboxLayer>(null);
  const visibility = settings.visibility ?? true;

  const layer = useMemo<typeof MapboxLayer>(() => {
    if (layerRef.current) {
      return layerRef.current;
    }

    layerRef.current = new MapboxLayer({
      id: 'foodscapes-intensity-groups-layer-deck',
      type: ScatterplotLayer,
      data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/line/airports.json',
      radiusScale: 20,
      radiusMinPixels: 0.5,
      getPosition: (d) => d.coordinates,
      getFillColor: [255, 255, 0],
      getRadius: () => 500,
      getPolygonOffset: () => [0, zIndex * 1000],
      visible: visibility,
      opacity: settings.opacity ?? 1,
    });

    return layerRef.current;
  }, [settings, visibility, zIndex]);

  useEffect(() => {
    const l = map.getLayer('foodscapes-intensity-groups-layer-deck') as LayerDeckProps;

    if (l) {
      l.implementation.setProps({
        getFillColor: [Math.random() * 255, 255, 0],
        visible: settings.visibility,
        opacity: settings.opacity,
        getPolygonOffset: () => [0, zIndex * 1000],
      });
    }
  }, [map, settings, zIndex]);

  return layer;
}

export function useLegend({
  settings = {
    opacity: 1,
    visibility: true,
    expand: true,
  },
}: UseFoodscapesIntensityGroupsLegendProps) {
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
      id: 'intensity-groups',
      name: 'Intensity Groups',
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
