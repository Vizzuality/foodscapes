import { useMemo } from 'react';

import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import { DATASETS } from 'constants/datasets';

import env from 'env.mjs';

interface UseFoodscapesIntensitiesSourceProps {
  filters: FiltersProps;
}

interface UseFoodscapesIntensitiesLayerProps {
  settings?: Partial<LayerSettings<'foodscapes-intensities'>>;
}

interface UseFoodscapesIntensitiesLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'foodscapes-intensities'>;
}

export function useSource({
  filters,
}: UseFoodscapesIntensitiesSourceProps): AnySourceData & { key: string } {
  const { data: foodscapesIntensitiesData } = useFoodscapesIntensities();

  const DATASET = DATASETS.find((d) => d.id === 'foodscapes-intensities');

  const band = DATASET.layer.band;
  const colormap = useMemo(() => {
    const c = foodscapesIntensitiesData.reduce((acc, v) => {
      return {
        ...acc,
        [v.value]: v.color,
      };
    }, {});

    c[-1] = '#00000000';

    return JSON.stringify(c);
  }, [foodscapesIntensitiesData]);

  const expression = useMemo(() => {
    const where = titilerAdapter(filters);

    if (!where) return null;

    return `where(${where},b${band},-1)`;
  }, [filters, band]);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();

    if (colormap) params.set('colormap', colormap);
    if (band) params.set('bidx', band.toString());
    if (expression) params.set('expression', expression);

    return params.toString();
  }, [band, colormap, expression]);

  const at = window.devicePixelRatio > 1 ? '@2x' : '@1x';

  return {
    id: 'foodscapes-intensities-source',
    key: `${band}-${colormap}-${expression}`,
    type: 'raster',
    tiles: [
      `${env.NEXT_PUBLIC_TITILER_API_URL}/cog/foodscapes/tiles/WebMercatorQuad/{z}/{x}/{y}${at}.png?${searchParams}`,
    ],
  };
}

export function useLayer({ settings }: UseFoodscapesIntensitiesLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'foodscapes-intensities-layer',
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

export function useLegend({ dataset, settings }: UseFoodscapesIntensitiesLegendProps) {
  const { data: foodscapesIntensitiesData } = useFoodscapesIntensities();

  const colormap = useMemo(() => {
    const c = foodscapesIntensitiesData.reduce((acc, v) => {
      return {
        ...acc,
        [v.value]: v.color,
      };
    }, {});
    return encodeURIComponent(JSON.stringify(c));
  }, [foodscapesIntensitiesData]);

  const legend = useMemo(() => {
    return {
      id: dataset.id,
      name: dataset.label,
      ...((!foodscapesIntensitiesData || !foodscapesIntensitiesData.length) && { colormap }),
      settings: settings,
      settingsManager: {
        opacity: true,
        visibility: true,
        expand: true,
        info: true,
      },
    };
  }, [dataset, colormap, settings, foodscapesIntensitiesData]);

  return legend;
}
