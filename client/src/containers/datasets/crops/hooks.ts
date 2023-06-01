import { useMemo } from 'react';

import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { useCrops } from 'hooks/crops';

import { DATASETS } from 'constants/datasets';

import env from 'env.mjs';

interface UseCropsSourceProps {
  filters: FiltersProps;
  settings?: Partial<LayerSettings<'crops'>>;
}

interface UseCropsLayerProps {
  settings?: Partial<LayerSettings<'crops'>>;
}

interface UseCropsLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'crops'>;
}

export function useSource({
  filters,
  settings,
}: UseCropsSourceProps): AnySourceData & { key: string } {
  const { data: cropsData } = useCrops();

  const DATASET = DATASETS.find((d) => d.id === 'crops');

  const band = DATASET.layer.band;
  const colormap = useMemo(() => {
    const c = cropsData.reduce((acc, v) => {
      return {
        ...acc,
        [v.value]: settings.group ? v.parentColor : v.color,
      };
    }, {});
    c[-1] = '#00000000';

    return JSON.stringify(c);
  }, [cropsData, settings.group]);

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
    id: 'crops-source',
    key: `${band}-${colormap}-${expression}`,
    type: 'raster',
    tiles: [
      `${env.NEXT_PUBLIC_TITILER_API_URL}/cog/foodscapes/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?${searchParams}`,
    ],
  };
}

export function useLayer({ settings }: UseCropsLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'crops-layer',
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

export function useLegend({ dataset, settings }: UseCropsLegendProps) {
  const { data: cropsData } = useCrops();

  const colormap = useMemo(() => {
    const c = cropsData.reduce((acc, v) => {
      return {
        ...acc,
        [v.value]: v.color,
      };
    }, {});
    return encodeURIComponent(JSON.stringify(c));
  }, [cropsData]);

  const legend = useMemo(() => {
    return {
      id: dataset.id,
      name: settings.group ? dataset.labelGroup : dataset.label,
      ...((!cropsData || !cropsData.length) && { colormap }),
      settings: settings,
      settingsManager: {
        opacity: true,
        visibility: true,
        expand: true,
        info: true,
      },
    };
  }, [dataset, colormap, settings, cropsData]);

  return legend;
}
