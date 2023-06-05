import { useMemo } from 'react';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

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
    url: 'mapbox://afilatore90.d6plyya8',
  };
}

export function useLayers({ settings }: UsePotectedAreasLayerProps): AnyLayer[] {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer[]>(() => {
    return [
      {
        id: 'protected-areas-layer',
        paint: {
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
        id: 'protected-areas-line-layer',
        paint: {
          'line-opacity': 0,
          'line-width': 0,
        },
        source: 'protected-areas-source',
        'source-layer': 'Protected',
        type: 'line',
        layout: {
          visibility: visibility ? 'visible' : 'none',
        },
      },
      {
        id: 'protected-areas-layer-II',
        filter: ['all', ['==', 'IUCN_CA', 'II']],
        paint: {
          'fill-color': '#0f3b82',
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
        id: 'protected-areas-layer-III',
        filter: ['all', ['==', 'IUCN_CA', 'III']],
        paint: {
          'fill-color': '#c9ddff',
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
        id: 'protected-areas-layer-IV',
        filter: ['all', ['==', 'IUCN_CA', 'IV']],
        paint: {
          'fill-color': '#b9b2a1',
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
        id: 'protected-areas-layer-Ia',
        filter: ['all', ['==', 'IUCN_CA', 'Ia']],
        paint: {
          'fill-color': '#5ca2d1',
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
        id: 'protected-areas-layer-Ib',
        filter: ['all', ['==', 'IUCN_CA', 'Ib']],
        paint: {
          'fill-color': '#3e7bb6',
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
        id: 'protected-areas-layer-Not-Applicable',
        filter: ['all', ['==', 'IUCN_CA', 'Not Applicable']],
        paint: {
          'fill-color': '#eed54c',
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
        id: 'protected-areas-layer-Not-Assigned',
        filter: ['all', ['==', 'IUCN_CA', 'Not Assigned']],
        paint: {
          'fill-color': '#e7ab36',
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
        id: 'protected-areas-layer-Not-Reported',
        filter: ['all', ['==', 'IUCN_CA', 'Not Reported']],
        paint: {
          'fill-color': '#fa894b',
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
        id: 'protected-areas-layer-V',
        filter: ['all', ['==', 'IUCN_CA', 'V']],
        paint: {
          'fill-color': '#ae847e',
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
        id: 'protected-areas-layer-VI',
        filter: ['all', ['==', 'IUCN_CA', 'VI']],
        paint: {
          'fill-color': '#daa89b',
          'fill-opacity': settings.opacity ?? 1,
        },
        source: 'protected-areas-source',
        'source-layer': 'Protected',
        type: 'fill',
        layout: {
          visibility: visibility ? 'visible' : 'none',
        },
      },
    ];
  }, [settings, visibility]);

  return layer;
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
