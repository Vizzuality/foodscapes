import { useMemo } from 'react';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { WDPA_CATEGORIES } from 'containers/datasets/protected-areas/constants';

// interface UsePotectedAreasSourceProps {
//   filters: FiltersProps;
//   settings?: Partial<LayerSettings<'protected-areas'>>;
// }

interface UsePotectedAreasLayerProps {
  settings?: Partial<LayerSettings<'protected-areas'>>;
}

interface UsePotectedAreasLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'protected-areas'>;
}

export function useSource(): AnySourceData {
  return {
    id: 'protected-areas-source',
    type: 'vector',
    url: 'mapbox://foodscapes.895aslht',
  };
}

export function useLayers({ settings }: UsePotectedAreasLayerProps): AnyLayer[] {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer[]>(() => {
    return [
      {
        id: 'protected-areas-layer',
        paint: {
          'fill-color': '#333',
          'fill-opacity': settings.opacity ?? 1,
        },
        source: 'protected-areas-source',
        'source-layer': 'Protected',
        type: 'fill',
        layout: {
          visibility: visibility ? 'visible' : 'none',
        },
      },
      {
        id: 'protected-areas-layer-outline',
        type: 'line',
        paint: {
          'line-color': '#333',
          'line-width': 1,
          'line-opacity': 0.5,
        },
        source: 'protected-areas-source',
        'source-layer': 'Protected',
        layout: {
          visibility: visibility ? 'visible' : 'none',
        },
      },
      ...(WDPA_CATEGORIES.map((category) => ({
        id: `protected-areas-layer-${category.id}`,
        type: 'fill',
        filter: ['all', ['==', 'IUCN_CA', category.id]],
        paint: {
          'fill-color': category.color,
          'fill-opacity': settings.opacity ?? 1,
        },
        source: 'protected-areas-source',
        'source-layer': 'Protected',
        layout: {
          visibility: visibility ? 'visible' : 'none',
        },
      })) satisfies AnyLayer[]),
    ];
  }, [settings, visibility]);

  return layer;
}

export function useInteractiveLayers(): string[] {
  const layers = useLayers({});

  return layers.map((layer) => layer.id);
}

export function useLegend({ dataset, settings }: UsePotectedAreasLegendProps) {
  const legend = useMemo(() => {
    return {
      id: dataset.id,
      name: dataset.label,
      // ...((!foodscapesData || !foodscapesData.length) && {
      //   colormap,
      // }),
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
