import { useMemo } from 'react';

import { LineLayer, LineLayerProps } from '@deck.gl/layers/typed';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseLandUseChangeLayerProps {
  id: string;
  settings?: Partial<Settings>;
  zIndex?: number;
}

interface UseLandUseChangeLegendProps {
  settings?: Settings;
}

export function useLayer({ id, settings = {} }: UseLandUseChangeLayerProps): LineLayerProps {
  const visibility = settings.visibility ?? true;

  const layer = useMemo<LineLayerProps>(() => {
    return {
      id: `${id}-deck`,
      type: LineLayer,
      data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-segments.json',

      /* props from LineLayer class */

      getColor: (d) => [Math.sqrt(d.inbound + d.outbound) * settings.opacity, 140, 0],
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getWidth: (settings.opacity ?? 1) * 5,
      // widthMaxPixels: Number.MAX_SAFE_INTEGER,
      // widthMinPixels: 0,
      // widthScale: 1,
      // widthUnits: 'pixels',

      /* props inherited from Layer class */

      // autoHighlight: false,
      // coordinateOrigin: [0, 0, 0],
      // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
      // highlightColor: [0, 0, 128, 128],
      // modelMatrix: null,
      // opacity: 1,
      pickable: true,
      // visible: true,
      // wrapLongitude: false,
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
}: UseLandUseChangeLegendProps) {
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
      id: 'land-use-change',
      name: 'Land Use Change',
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
