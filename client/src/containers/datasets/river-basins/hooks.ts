import { useMemo } from 'react';

import { AnyLayer, AnySourceData } from 'mapbox-gl';

import { Dataset } from 'types/datasets';
import { LayerSettings } from 'types/layers';

import { MAPBOX_TILESETS } from 'constants/mapbox';

// interface UseRiverBasinsSourceProps {
//   filters: FiltersProps;
//   settings?: Partial<LayerSettings<'river-basins'>>;
// }

interface UseRiverBasinsLayerProps {
  settings?: Partial<LayerSettings<'river-basins'>>;
}

interface UseRiverBasinsLegendProps {
  dataset: Dataset;
  settings?: LayerSettings<'river-basins'>;
}

export function useSource(): AnySourceData {
  return {
    id: 'river-basins-source',
    type: 'vector',
    url: MAPBOX_TILESETS.river_basins,
  };
}

export function useLayers({ settings }: UseRiverBasinsLayerProps): AnyLayer[] {
  const visibility = settings.visibility ?? true;
  const layer = useMemo<AnyLayer[]>(() => {
    return [
      {
        id: 'river-basins-layer',
        paint: {
          'fill-color': '#1f31b4',
          'fill-opacity': 0,
        },
        source: 'river-basins-source',
        'source-layer': 'Hydrological',
        type: 'fill',
        layout: {
          visibility: visibility ? 'visible' : 'none',
        },
      },
      {
        id: 'river-basins-layer-outline',
        type: 'line',
        paint: {
          'line-color': '#1f31b4',
          'line-width': 1,
          'line-opacity': 0.5 * settings.opacity,
        },
        source: 'river-basins-source',
        'source-layer': 'Hydrological',
        layout: {
          visibility: visibility ? 'visible' : 'none',
        },
      },
    ];
  }, [settings, visibility]);

  return layer;
}

export function useInteractiveLayers(): string[] {
  const layers = useLayers({});

  return layers.map((layer) => layer.id);
}

export function useLegend({ dataset, settings }: UseRiverBasinsLegendProps) {
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
