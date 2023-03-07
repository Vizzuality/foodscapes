import { useMemo } from 'react';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseSoilGroupsLayerProps {
  settings?: Partial<Settings>;
}

interface UseSoilGroupsLegendProps {
  settings?: Settings;
}

export function useSource(): AnySourceData {
  const band = 25;
  const colormap = useMemo(() => {
    const c = {
      '-1': '#000000',
      '0': '#ffffff00',
      '1': '#ff0000',
    };
    return encodeURIComponent(JSON.stringify(c));
  }, []);

  return {
    id: 'soil-groups-source',
    type: 'raster',
    tiles: [
      // `${process.env.NEXT_PUBLIC_TITILER_API_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?colormap={{COLOR_RAMP}}&bidx={{BAND}}`,
      `${process.env.NEXT_PUBLIC_TITILER_API_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?colormap=${colormap}&bidx=${band}`,
    ],
  };
}

export function useLayer({ settings = {} }: UseSoilGroupsLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'soil-groups-layer',
      type: 'raster',
      paint: {
        'raster-opacity': settings.opacity ?? 1,
      },
      layout: {
        visibility: visibility ? 'visible' : 'none',
      },
    };
  }, [settings, visibility]);

  return layer;
}

export function useLegend({
  settings = {
    opacity: 1,
    visibility: true,
    expand: true,
  },
}: UseSoilGroupsLegendProps) {
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
