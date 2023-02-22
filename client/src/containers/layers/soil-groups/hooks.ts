import { useMemo } from 'react';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseFoodscapesLayerProps {
  settings?: Partial<Settings>;
}

interface UseFoodscapesLegendProps {
  settings?: Settings;
}

export function useLayer({ settings = {} }: UseFoodscapesLayerProps) {
  const colormap = useMemo(() => {
    const c = {
      '-1': '#000000',
      '0': '#ffffff00',
      '1': '#ff0000',
    };
    return encodeURIComponent(JSON.stringify(c));
  }, []);

  const layer = useMemo(() => {
    return {
      id: 'soil-groups',
      type: 'raster',
      source: {
        type: 'raster',
        tiles: [
          `${process.env.NEXT_PUBLIC_TITILER_API_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?colormap={{COLOR_RAMP}}&bidx={{BAND}}`,
        ],
      },
      params: {
        BAND: 25,
        COLOR_RAMP: colormap,
      },
      opacity: settings.opacity,
      visibility: settings.visibility,
    };
  }, [colormap, settings]);

  return layer;
}

export function useLegend({
  settings = {
    opacity: 1,
    visibility: true,
    expand: true,
  },
}: UseFoodscapesLegendProps) {
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
      id: 'soil-groups',
      name: 'Soil Groups',
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
