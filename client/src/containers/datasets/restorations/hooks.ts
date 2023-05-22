import { useMemo } from 'react';

import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import CHROMA from 'chroma-js';
import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { useStatisticsData } from 'hooks/data';
import { COLORS, useRestorations } from 'hooks/restorations';
import { convertHexToRgbaArray } from 'hooks/utils';

import env from 'env.mjs';
import { ColorHex } from 'types';

interface UseRestorationsSourceProps {
  filters: FiltersProps;
  settings?: Partial<LayerSettings<'restorations'>>;
}

interface UseRestorationsLayerProps {
  filters: FiltersProps;
  settings?: Partial<LayerSettings<'restorations'>>;
}

interface UseRestorationsLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'restorations'>;
}

export function useSource({
  filters,
  settings,
}: UseRestorationsSourceProps): AnySourceData & { key: string } {
  const { data: restorationsData } = useRestorations();

  const band = useMemo(() => {
    return restorationsData.find((v) => v.column === settings.column)?.value;
  }, [restorationsData, settings]);

  const {
    //
    data: restorationStatisticsData,
  } = useStatisticsData({ band, filters });

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
          const { max } = restorationStatisticsData || { max: 0 };
          const step = max / 20;

          // Clamp the opacity to min 0.25 and max 1
          const opacity = Math.min(Math.max(0.25, (i + 1) / 3), 1);

          return [[step * i, step * (i + 1)], convertHexToRgbaArray(color, opacity)];
        }),
    ];

    return JSON.stringify(c);
  }, [restorationStatisticsData]);

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
    id: 'restorations-source',
    key: `${band.toString()}-${colormap}-${expression}`,
    type: 'raster',
    tiles: [
      `${env.NEXT_PUBLIC_TITILER_API_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?${searchParams}`,
    ],
  };
}

export function useLayer({ settings }: UseRestorationsLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'restorations-layer',
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

export function useLegend({ dataset, settings }: UseRestorationsLegendProps) {
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
