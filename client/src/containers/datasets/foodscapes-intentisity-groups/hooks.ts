import { useMemo } from 'react';

import { ScatterplotLayer } from '@deck.gl/layers';
import { ScatterplotLayerProps } from '@deck.gl/layers/typed';

import { useFoodscapes } from 'hooks/foodscapes';

import { Settings } from 'components/map/legend/types';

interface UseFoodscapesIntensityGroupsLayerProps {
  id: string;
  settings?: Partial<Settings>;
  zIndex?: number;
}

interface UseFoodscapesIntensityGroupsLegendProps {
  settings?: Settings;
}

export function useLayer({
  id,
  settings = {},
}: UseFoodscapesIntensityGroupsLayerProps): ScatterplotLayerProps {
  const visibility = settings.visibility ?? true;

  const layer = useMemo<ScatterplotLayerProps>(() => {
    return {
      id: `${id}-deck`,
      type: ScatterplotLayer,
      data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/line/airports.json',

      /* props from LineLayer class */
      radiusScale: 20,
      radiusMinPixels: 0.5,
      getPosition: (d) => d.coordinates,
      getFillColor: [255 * settings.opacity, 255, 255 * (1 - settings.opacity)] as [
        number,
        number,
        number
      ],
      getRadius: () => 500,
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
}: UseFoodscapesIntensityGroupsLegendProps) {
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
      id: 'intensity-groups',
      name: 'Intensity Groups',
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
