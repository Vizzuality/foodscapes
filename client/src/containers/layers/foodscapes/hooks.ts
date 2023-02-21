import { useMemo } from 'react';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseFoodscapesLayerProps {
  settings?: Partial<Settings>;
}

export function useFoodscapesLayer({ settings = {} }: UseFoodscapesLayerProps) {
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

  const layer = useMemo(() => {
    if (!foodscapesData || !foodscapesData.length) {
      return null;
    }

    return {
      id: 'foodscapes',
      type: 'raster',
      source: {
        type: 'raster',
        tiles: [
          `${process.env.NEXT_PUBLIC_TITILER_API_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?colormap={{COLOR_RAMP}}&bidx={{BAND}}`,
        ],
      },
      params: {
        BAND: 1,
        COLOR_RAMP: colormap,
      },
      opacity: settings.opacity,
      visibility: settings.visibility,
    };
  }, [foodscapesData, colormap, settings]);

  return layer;
}
