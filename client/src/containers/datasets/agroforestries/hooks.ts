import { useMemo } from 'react';

import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import CHROMA from 'chroma-js';
import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { COLORS, useAgroforestries } from 'hooks/agroforestries';
import { useBand } from 'hooks/data';
import { convertHexToRgbaArray } from 'hooks/utils';

import env from 'env.mjs';
import { ColorHex } from 'types';

interface UseAgroforestriesSourceProps {
  filters: FiltersProps;
  settings?: Partial<LayerSettings<'agroforestries'>>;
}

interface UseAgroforestriesLayerProps {
  filters: FiltersProps;
  settings?: Partial<LayerSettings<'agroforestries'>>;
}

interface UseAgroforestriesLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'agroforestries'>;
}

export function useSource({
  filters,
  settings,
}: UseAgroforestriesSourceProps): AnySourceData & { key: string } {
  const { data: agroforestriesData } = useAgroforestries();

  const band = useMemo(() => {
    return agroforestriesData.find((v) => v.column === settings.column)?.value;
  }, [agroforestriesData, settings]);

  const {
    //
    data: agroforestriesStatisticsData,
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
          const { max } = agroforestriesStatisticsData || { max: 0 };
          const step = max / 20;
          const offset = i + 1 === 20 ? 0.1 : 0;

          // Clamp the opacity to min 0.25 and max 1
          const opacity = Math.min(Math.max(0.25, (i + 1) / 3), 1);

          return [[step * i, step * (i + 1) + offset], convertHexToRgbaArray(color, opacity)];
        }),
    ];

    return JSON.stringify(c);
  }, [agroforestriesStatisticsData]);

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

  const at = window.devicePixelRatio > 1 ? '@2x' : '@1x';

  return {
    id: 'agroforestries-source',
    key: `${band}-${colormap}-${expression}`,
    type: 'raster',
    tiles: [
      `${env.NEXT_PUBLIC_TITILER_API_URL}/cog/foodscapes/tiles/WebMercatorQuad/{z}/{x}/{y}${at}.png?${searchParams}`,
    ],
  };
}

export function useLayer({ settings }: UseAgroforestriesLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'agroforestries-layer',
      type: 'raster',
      paint: {
        'raster-opacity': settings.opacity ?? 1,
        'raster-resampling': 'nearest',
      },
      layout: {
        visibility: visibility ? 'visible' : 'none',
      },
    };
  }, [settings, visibility]);

  return layer;
}

export function useLegend({ dataset, settings }: UseAgroforestriesLegendProps) {
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
