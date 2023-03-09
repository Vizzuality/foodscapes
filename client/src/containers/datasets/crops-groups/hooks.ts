import { useMemo } from 'react';

import { H3HexagonLayer, H3HexagonLayerProps } from '@deck.gl/geo-layers/typed';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseCropGroupsLayerProps {
  id: string;
  settings: Partial<Settings>;
}

interface UseCropGroupsLegendProps {
  settings?: Settings;
}

export function useLayer({ id, settings = {} }: UseCropGroupsLayerProps): H3HexagonLayerProps {
  const visibility = settings.visibility ?? true;

  const layer = useMemo(() => {
    return {
      //
      id: `${id}-deck`,
      type: H3HexagonLayer,
      data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf.h3cells.json',
      extruded: false,
      filled: true,
      pickable: true,
      getElevation: (d) => d.count,
      getFillColor: (d) => [255, (1 - d.count / 500) * 255, 0] as [number, number, number],
      getHexagon: (d) => d.hex,
      visible: visibility,
      opacity: settings.opacity ?? 1,
    };
  }, [id, settings, visibility]);

  return layer;
}

export function useLegend({
  settings = {
    opacity: 1,
    visibility: true,
    expand: true,
  },
}: UseCropGroupsLegendProps) {
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
      id: 'crop-groups',
      name: 'Crop Groups',
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
