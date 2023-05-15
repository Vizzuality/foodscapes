import { useMemo } from 'react';

import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import { LayerSettings } from 'store/explore-map';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';

import { useFoodscapes } from 'hooks/foodscapes';

import { DATASETS } from 'constants/datasets';

import env from 'env.mjs';

interface UseFoodscapesSourceProps {
  filters: FiltersProps;
}

interface UseFoodscapesLayerProps {
  settings?: Partial<LayerSettings>;
}

interface UseFoodscapesLegendProps {
  dataset: Dataset;
  settings?: LayerSettings;
}

export function useSource({ filters }: UseFoodscapesSourceProps): AnySourceData & { key: string } {
  const { data: foodscapesData } = useFoodscapes();

  const DATASET = DATASETS.find((d) => d.id === 'foodscapes');

  const band = DATASET.layer.band;
  const colormap = useMemo(() => {
    const c = foodscapesData.reduce((acc, v) => {
      return {
        ...acc,
        [v.value]: v.color,
      };
    }, {});
    return JSON.stringify(c);
  }, [foodscapesData]);

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

  return {
    id: 'foodscapes-source',
    key: `${band}-${colormap}-${expression}`,
    type: 'raster',
    tiles: [
      `${env.NEXT_PUBLIC_TITILER_API_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?${searchParams}`,
    ],
  };
}

export function useLayer({ settings = {} }: UseFoodscapesLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'foodscapes-layer',
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
    id: 'foodscapes',
    group: false,
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
    return {
      id: dataset.id,
      name: dataset.label,
      ...((!foodscapesData || !foodscapesData.length) && {
        colormap,
      }),
      settings: settings,
      settingsManager: {
        opacity: true,
        visibility: true,
        expand: true,
        info: true,
      },
    };
  }, [dataset, colormap, settings, foodscapesData]);

  return legend;
}
