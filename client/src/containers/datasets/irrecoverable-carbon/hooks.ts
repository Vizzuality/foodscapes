import { useMemo } from 'react';

import { titilerAdapter } from 'lib/adapters/titiler-adapter';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { useIrrecoverableCarbon } from 'hooks/irrecoverable-carbon';

import { DATASETS } from 'constants/datasets';

import env from 'env.mjs';

interface UseIrrecoverableCarbonSourceProps {
  filters: FiltersProps;
  settings?: Partial<LayerSettings<'irrecoverable-carbon'>>;
}

interface UseIrrecoverableCarbonLayerProps {
  settings?: Partial<LayerSettings<'irrecoverable-carbon'>>;
}

interface UseIrrecoverableCarbonLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'irrecoverable-carbon'>;
}

export function useSource({
  filters,
  settings,
}: UseIrrecoverableCarbonSourceProps): AnySourceData & { key: string } {
  const { data: irrecoverableCarbonData } = useIrrecoverableCarbon();

  const DATASET = DATASETS.find((d) => d.id === 'irrecoverable-carbon');

  const band = DATASET.layer.band;
  const colormap = useMemo(() => {
    const c = irrecoverableCarbonData.reduce((acc, v) => {
      return {
        ...acc,
        [v.value]: settings.group ? v.parentColor : v.color,
      };
    }, {});
    return JSON.stringify(c);
  }, [irrecoverableCarbonData, settings.group]);

  const expression = useMemo(() => {
    const where = titilerAdapter(filters);

    if (!where) return null;

    return `where(${where},b${band},-1)`;
  }, [filters, band]);

  const at = window.devicePixelRatio > 1 ? '@2x' : '@1x';

  return {
    id: 'irrecoverable-carbon-source',
    key: `${band}-${colormap}-${expression}`,
    type: 'raster',
    tiles: [
      `${env.NEXT_PUBLIC_TITILER_API_URL}/cog/irrecoverable-carbon/tiles/WebMercatorQuad/{z}/{x}/{y}${at}.png?`,
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
      },
      layout: {
        visibility: visibility ? 'visible' : 'none',
      },
    };
  }, [settings, visibility]);

  return layer;
}

export function useLegend({ dataset, settings }: UseIrrecoverableCarbonLegendProps) {
  const { data: irrecoverableCarbonData } = useIrrecoverableCarbon();
  console.log({ irrecoverableCarbonData });
  const colormap = useMemo(() => {
    const c = irrecoverableCarbonData.reduce((acc, v) => {
      return {
        ...acc,
        [v.value]: v.color,
      };
    }, {});
    return encodeURIComponent(JSON.stringify(c));
  }, [irrecoverableCarbonData]);

  const legend = useMemo(() => {
    return {
      id: dataset.id,
      name: settings.group ? dataset.labelGroup : dataset.label,
      ...((!irrecoverableCarbonData || !irrecoverableCarbonData.length) && {
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
  }, [dataset, colormap, settings, irrecoverableCarbonData]);

  return legend;
}
