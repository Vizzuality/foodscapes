import { useMemo } from 'react';

import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';

import { DATASETS } from 'constants/datasets';

import { Settings } from 'components/map/legend/types';
import env from 'env.mjs';

interface UseLandUseRiskSourceProps {
  filters: FiltersProps;
}

interface UseLandUseRiskLayerProps {
  settings?: Partial<Settings>;
}

interface UseLandUseRiskLegendProps {
  dataset: Dataset;
  settings?: Settings;
}

export function useSource({ filters }: UseLandUseRiskSourceProps): AnySourceData & { key: string } {
  const DATASET = DATASETS.find((d) => d.id === 'land-use-risk');

  const bands = DATASET.layer.bands;
  const colormap = useMemo(() => {
    const c = [
      [
        [0, 1],
        [0, 0, 0, 0],
      ],
      ...Array.from(Array(5).keys()).map((i) => {
        return [
          [i + 1, i + 2],
          [255 * ((i + 1) / 5), 0, 0, 255],
        ];
      }),
    ];

    return JSON.stringify(c);
  }, []);

  const expression = useMemo(() => {
    const where = bands.map((b) => {
      const w = titilerAdapter(filters, `(b${b} > 0)`);
      return `where(${w},b${b},0)`;
    });

    return where.join('+');
  }, [bands, filters]);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();

    if (colormap) params.set('colormap', colormap);
    if (expression) params.set('expression', expression);

    return params.toString();
  }, [colormap, expression]);

  return {
    id: 'land-use-risk-source',
    key: `${bands.toString()}-${colormap}-${expression}`,
    type: 'raster',
    tiles: [
      `${env.NEXT_PUBLIC_TITILER_API_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?${searchParams}`,
    ],
  };
}

export function useLayer({ settings = {} }: UseLandUseRiskLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'land-use-risk-layer',
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
  dataset,
  settings = {
    opacity: 1,
    visibility: true,
    expand: true,
  },
}: UseLandUseRiskLegendProps) {
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