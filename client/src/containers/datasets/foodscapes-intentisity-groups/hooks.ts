import { useEffect, useMemo, useRef } from 'react';

import { useMap } from 'react-map-gl';

import { ScatterplotLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { AnyLayer } from 'mapbox-gl';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseFoodscapesIntensityGroupsLayerProps {
  settings?: Partial<Settings>;
}

interface UseFoodscapesIntensityGroupsLegendProps {
  settings?: Settings;
}

type LayerDeckProps = AnyLayer & {
  implementation: any;
};

export function useLayer({
  settings = {},
}: UseFoodscapesIntensityGroupsLayerProps): typeof MapboxLayer {
  const { current: map } = useMap();
  const layerRef = useRef<typeof MapboxLayer>(null);
  const visibility = settings.visibility ?? true;

  const layer = useMemo<typeof MapboxLayer>(() => {
    if (layerRef.current) {
      return layerRef.current;
    }

    layerRef.current = new MapboxLayer({
      id: 'foodscapes-intensity-groups-layer',
      type: ScatterplotLayer,
      data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/line/airports.json',
      radiusScale: 20,
      radiusMinPixels: 0.5,
      getPosition: (d) => d.coordinates,
      getFillColor: [255, 255, 0],
      getRadius: () => 500,
      visible: visibility,
      opacity: settings.opacity ?? 1,
      // getPolygonOffset: () => [0, zIndex * 1000],
    });

    return layerRef.current;
  }, [settings, visibility]);

  useEffect(() => {
    const l = map.getLayer('foodscapes-intensity-groups-layer') as LayerDeckProps;

    if (l) {
      l.implementation.setProps({
        getFillColor: [Math.random() * 255, 255, 0],
        visible: settings.visibility,
        opacity: settings.opacity,
      });
    }
  }, [map, settings]);

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
      id: 'deck-test',
      name: 'Deck test',
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
