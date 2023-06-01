import { useMemo } from 'react';

import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import CHROMA from 'chroma-js';
import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { useBand } from 'hooks/data';
import { COLORS, useSoilHealths } from 'hooks/soil-healths';
import { convertHexToRgbaArray } from 'hooks/utils';

import env from 'env.mjs';
import { ColorHex } from 'types';

interface UseSoilHealthsSourceProps {
  filters: FiltersProps;
  settings?: Partial<LayerSettings<'soil-healths'>>;
}

interface UseSoilHealthsLayerProps {
  filters: FiltersProps;
  settings?: Partial<LayerSettings<'soil-healths'>>;
}

interface UseSoilHealthsLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'soil-healths'>;
}

export function useSource({
  filters,
  settings,
}: UseSoilHealthsSourceProps): AnySourceData & { key: string } {
  const { data: soilHealthsData } = useSoilHealths();

  const band = useMemo(() => {
    return soilHealthsData.find((v) => v.column === settings.column)?.value;
  }, [soilHealthsData, settings]);

  const {
    //
    data: soilHealthsStatisticsData,
  } = useBand({ band });

  const colormap = useMemo(() => {
    // https://cogeotiff.github.io/rio-tiler/colormap/#intervals-colormaps
    const c = [
      [
        [-1, 0],
        [0, 0, 0, 0],
      ],
      ...CHROMA
        //
        .scale(COLORS)
        .colors(20)
        .map((color: ColorHex, i: number) => {
          const { max } = soilHealthsStatisticsData || { max: 0 };
          const step = max / 20;
          const offset = i + 1 === 20 ? 0.1 : 0;

          // Clamp the opacity to min 0.25 and max 1
          const opacity = Math.min(Math.max(0.25, (i + 1) / 3), 1);

          return [[step * i, step * (i + 1) + offset], convertHexToRgbaArray(color, opacity)];
        }),
    ];

    return JSON.stringify(c);
  }, [soilHealthsStatisticsData]);

  const expression = useMemo(() => {
    const where = titilerAdapter(filters);

    if (!where) return null;

    return `where(${where},b${band},-1)`;
  }, [band, filters]);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();

    if (colormap) params.set('colormap', colormap);
    if (expression) params.set('expression', expression);

    return params.toString();
  }, [colormap, expression]);

  return {
    id: 'soil-healths-source',
    key: `${band}-${colormap}-${expression}`,
    type: 'raster',
    tiles: [
      `${env.NEXT_PUBLIC_TITILER_API_URL}/cog/foodscapes/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?${searchParams}`,
    ],
  };
}

export function useLayer({ settings }: UseSoilHealthsLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'soil-healths-layer',
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

export function useLegend({ dataset, settings }: UseSoilHealthsLegendProps) {
  const legend = useMemo(() => {
    return {
      id: dataset.id,
      name: dataset.label,
      settings: settings,
      settingsManager: {
        opacity: true,
        visibility: true,
        expand: true,
        info: true,
      },
    };
  }, [dataset, settings]);

  return legend;
}
