import { useEffect, useMemo, useRef } from 'react';

import { useMap } from 'react-map-gl';

import { MapboxLayer } from '@deck.gl/mapbox';

import { Settings } from 'components/map/legend/types';

interface UseLayerProps {
  id: string;
  beforeId: string;
  settings?: Partial<Settings>;
  zIndex?: number;
}

export function useLayer({ id, beforeId, settings = {}, zIndex, ...props }: UseLayerProps) {
  const { current: map } = useMap();
  const layerRef = useRef<typeof MapboxLayer>(null);
  const visibility = settings.visibility ?? true;

  useMemo<typeof MapboxLayer>(() => {
    if (layerRef.current && layerRef.current.id === `${id}-deck`) {
      return layerRef.current;
    }

    if (layerRef.current) {
      const m = map.getMap();
      m.removeLayer(layerRef.current.id);
    }

    layerRef.current = new MapboxLayer({
      id: `${id}-deck`,
      ...props,
      getPolygonOffset: () => [0, zIndex * 1000],
    });

    return layerRef.current;
  }, [id, map, zIndex, props]);

  // Add layer on mount using map from mapbox
  // Move layer on beforeId change
  useEffect(() => {
    const m = map.getMap();
    const l = map.getLayer(layerRef.current.id);

    if (!l) {
      m.addLayer(layerRef.current, beforeId);
    }

    if (l) {
      m.moveLayer(layerRef.current.id, beforeId);
    }

    return () => {
      const l1 = m.getLayer(layerRef.current.id);

      if (l1) {
        m.removeLayer(layerRef.current.id);
      }
    };
  }, [map, beforeId]);

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.setProps({
        ...props,
        getPolygonOffset: () => [0, zIndex * 1000],
      });
    }
  }, [id, map, visibility, settings, zIndex, props]);

  return null;
}
