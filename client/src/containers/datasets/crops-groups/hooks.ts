import { useEffect, useMemo, useRef } from 'react';

import { useMap } from 'react-map-gl';

import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { AnyLayer } from 'mapbox-gl';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseCropGroupsLayerProps {
  settings?: Partial<Settings>;
}

interface UseCropGroupsLegendProps {
  settings?: Settings;
}

type LayerDeckProps = AnyLayer & {
  implementation: any;
};

export function useLayer(): AnyLayer {
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'crop-groups-layer',
      type: 'background',
      paint: {
        'background-color': '#77CCFF',
        'background-opacity': 0,
      },
    };
  }, []);

  return layer;
}

export function useDeckLayer({ settings = {} }: UseCropGroupsLayerProps): typeof MapboxLayer {
  const { current: map } = useMap();
  const layerRef = useRef<typeof MapboxLayer>(null);
  const visibility = settings.visibility ?? true;

  const layer = useMemo<typeof MapboxLayer>(() => {
    if (layerRef.current) {
      return layerRef.current;
    }

    layerRef.current = new MapboxLayer({
      id: 'crop-groups-layer-deck',
      type: H3HexagonLayer,
      data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf.h3cells.json',
      extruded: false,
      filled: true,
      pickable: true,
      getElevation: (d) => d.count,
      getFillColor: (d) => [255, (1 - d.count / 500) * 255, 0],
      getHexagon: (d) => d.hex,
      visible: visibility,
      opacity: settings.opacity ?? 1,
    });

    return layerRef.current;
  }, [settings, visibility]);

  useEffect(() => {
    const l = map.getLayer('crop-groups-layer-deck') as LayerDeckProps;

    if (l) {
      l.implementation.setProps({
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
}: UseCropGroupsLegendProps) {
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
      id: 'crop-groups',
      name: 'Crop Groups',
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
