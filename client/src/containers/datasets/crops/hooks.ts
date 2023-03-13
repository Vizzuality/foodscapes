import { useMemo } from 'react';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseCropsLayerProps {
  settings?: Partial<Settings>;
}

interface UseCropsLegendProps {
  settings?: Settings;
}

export function useSource(): AnySourceData {
  return {
    id: 'crops-source',
    type: 'vector',
    url: 'mapbox://afilatore90.azhsjfex',
  };
}

export function useLayer({ settings = {} }: UseCropsLayerProps): AnyLayer[] {
  const visibility = settings.visibility ?? true;
  const layers = useMemo(() => {
    return [
      {
        id: 'crops-layer',
        type: 'fill',
        'source-layer': 'everest_rivers_v2-8my8fi',
        paint: {
          'fill-color': '#77CCFF',
          'fill-opacity': 0.5 * (settings.opacity ?? 1),
        },
        layout: {
          visibility: visibility ? 'visible' : 'none',
        },
      },
      {
        id: 'crops-layer-line',
        type: 'line',
        'source-layer': 'everest_rivers_v2-8my8fi',
        paint: {
          'line-color': '#0044FF',
          'line-width': 1,
          'line-opacity': settings.opacity ?? 1,
        },
        layout: {
          visibility: visibility ? 'visible' : 'none',
        },
      },
    ] as AnyLayer[];
  }, [settings, visibility]);

  return layers;
}

export function useLegend({
  settings = {
    opacity: 1,
    visibility: true,
    expand: true,
  },
}: UseCropsLegendProps) {
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
    if (!foodscapesData || !foodscapesData.length) {
      return null;
    }

    return {
      id: 'crops',
      name: 'Crops',
      colormap,
      settings: settings,
      settingsManager: {
        opacity: true,
        visibility: true,
        expand: true,
        info: true,
      },
    };
  }, [foodscapesData, colormap, settings]);

  return legend;
}
