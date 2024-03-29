import { useMemo } from 'react';

import CHROMA from 'chroma-js';
import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { convertHexToRgbaArray } from 'hooks/utils';

import { DATASETS } from 'constants/datasets';

import env from 'env.mjs';
import { ColorHex } from 'types';

import { BOUNDARIES, COLORS } from './constants';

interface UseIrrecoverableCarbonLayerProps {
  settings?: Partial<LayerSettings<'irrecoverable-carbon'>>;
}

interface UseIrrecoverableCarbonLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'irrecoverable-carbon'>;
}

export function useSource(): AnySourceData & { key: string } {
  const DATASET = DATASETS.find((d) => d.id === 'irrecoverable-carbon');

  const band = DATASET.layer.band;
  const colormap = useMemo(() => {
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
          const { max } = BOUNDARIES;
          const step = max / 20;
          const offset = i + 1 === 20 ? 0.1 : 0;

          // Clamp the opacity to min 0.25 and max 1
          const opacity = Math.min(Math.max(0.25, (i + 1) / 3), 1);

          return [[step * i, step * (i + 1) + offset], convertHexToRgbaArray(color, opacity)];
        }),
    ];

    return JSON.stringify(c);
  }, []);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();

    if (colormap) params.set('colormap', colormap);

    return params.toString();
  }, [colormap]);

  const at = window.devicePixelRatio > 1 ? '@2x' : '@1x';

  return {
    id: 'irrecoverable-carbon-source',
    key: `${band}-${colormap}`,
    type: 'raster',
    tiles: [
      `${env.NEXT_PUBLIC_TITILER_API_URL}/cog/irrecoverable_carbon/tiles/WebMercatorQuad/{z}/{x}/{y}${at}.png?${searchParams}`,
    ],
  };
}

export function useLayer({ settings }: UseIrrecoverableCarbonLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'irrecoverable-carbon-layer',
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

export function useLegend({ dataset, settings }: UseIrrecoverableCarbonLegendProps) {
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
