import { useMemo } from 'react';

import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { useClimateRisks } from 'hooks/climate-risks';

import { DATASETS } from 'constants/datasets';

import env from 'env.mjs';

interface UseClimateRiskSourceProps {
  filters: FiltersProps;
}

interface UseClimateRiskLayerProps {
  settings?: Partial<LayerSettings<'climate-risks'>>;
}

interface UseClimateRiskLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'climate-risks'>;
}

export function useSource({ filters }: UseClimateRiskSourceProps): AnySourceData & { key: string } {
  const DATASET = DATASETS.find((d) => d.id === 'climate-risks');
  const { data: climateRisksData } = useClimateRisks();

  const band = DATASET.layer.band;
  const colormap = useMemo(() => {
    const c = climateRisksData
      .filter((v) => v.value !== -1)
      .reduce((acc, v) => {
        return {
          ...acc,
          [v.value]: v.color,
        };
      }, {});

    c[-1] = '#00000000';

    return JSON.stringify(c);
  }, [climateRisksData]);

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
    id: 'climate-risks-source',
    key: `${band}-${colormap}-${expression}`,
    type: 'raster',
    tiles: [
      `${env.NEXT_PUBLIC_TITILER_API_URL}/cog/foodscapes/tiles/WebMercatorQuad/{z}/{x}/{y}${at}.png?${searchParams}`,
    ],
  };
}

export function useLayer({ settings }: UseClimateRiskLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'climate-risks-layer',
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

export function useLegend({ dataset, settings }: UseClimateRiskLegendProps) {
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
