import { useMemo } from 'react';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { Dataset } from 'types/datasets';

import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import { Settings } from 'components/map/legend/types';

interface UseFoodscapesIntensitiesSourceProps {
  filters: {
    foodscapes: number[];
  };
}

interface UseFoodscapesIntensitiesLayerProps {
  settings?: Partial<Settings>;
}

interface UseFoodscapesIntensitiesLegendProps {
  dataset: Dataset;
  settings?: Settings;
}

export function useSource({
  filters,
}: UseFoodscapesIntensitiesSourceProps): AnySourceData & { key: string } {
  const { data: foodscapesIntensitiesData } = useFoodscapesIntensities();
  const { foodscapes } = filters;

  const band = 3;
  const colormap = useMemo(() => {
    const c = foodscapesIntensitiesData.reduce((acc, v) => {
      return {
        ...acc,
        [v.value]: v.color,
      };
    }, {});

    return JSON.stringify(c);
  }, [foodscapesIntensitiesData]);

  const expression = useMemo(() => {
    if (!foodscapes.length) return null;
    // loop through the foodscapes and create a where expression
    const where = foodscapes
      .map((v) => {
        return `(b1==${v})`;
      })
      .join('|');

    return `where(${where},b1,-1)`;
  }, [foodscapes]);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();

    if (colormap) params.set('colormap', colormap);
    if (band) params.set('bidx', band.toString());
    if (expression) params.set('expression', expression);

    return params.toString();
  }, [band, colormap, expression]);

  return {
    id: 'foodscapes-intensities-source',
    key: `${band}-${colormap}-${expression}`,
    type: 'raster',
    tiles: [
      `${process.env.NEXT_PUBLIC_TITILER_API_URL}/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?${searchParams}`,
    ],
  };
}

export function useLayer({ settings = {} }: UseFoodscapesIntensitiesLayerProps): AnyLayer {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer>(() => {
    return {
      id: 'foodscapes-intensities-layer',
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
}: UseFoodscapesIntensitiesLegendProps) {
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
    if (!foodscapesIntensitiesData || !foodscapesIntensitiesData.length) {
      return null;
    }

    return {
      id: dataset.id,
      name: dataset.label,
      colormap,
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
