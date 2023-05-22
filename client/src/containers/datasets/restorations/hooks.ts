import { useMemo } from 'react';

import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { DATASETS } from 'constants/datasets';

import env from 'env.mjs';

interface UseRestorationsSourceProps {
  filters: FiltersProps;
}

interface UseRestorationsLayerProps {
  settings?: Partial<LayerSettings<'restorations'>>;
}

interface UseRestorationsLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'restorations'>;
}

export function useSource({
  filters,
}: UseRestorationsSourceProps): AnySourceData & { key: string } {
  const DATASET = DATASETS.find((d) => d.id === 'restorations');

  const bands = DATASET.layer.bands;
  const colormap = useMemo(() => {
    // https://cogeotiff.github.io/rio-tiler/colormap/#intervals-colormaps
    const c = [
      [
        [0, 1],
        [0, 0, 0, 0],
      ],
      // ...COLORS.map((color, index) => {
      //   return [[index + 1, index + 2], convertHexToRgbaArray(color, 1)];
      // }),
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
    id: 'restorations-source',
    key: `${bands.toString()}-${colormap}-${expression}`,
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
