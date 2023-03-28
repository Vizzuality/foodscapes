import { useMemo } from 'react';

import { Position } from '@deck.gl/core/typed';
import { LineLayer, LineLayerProps } from '@deck.gl/layers/typed';

import { MapboxLayerProps } from 'types/layers';

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

interface LandUseChangeData {
  inbound: number;
  outbound: number;
  from: Location;
  to: Location;
}

interface Location {
  name: string;
  coordinates: Position;
}

export function useLayer({ settings = {} }: UseLandUseChangeLayerProps) {
  const visibility = settings.visibility ?? true;

  const layer = useMemo(() => {
    return {
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
      onHover: (info) => console.info(info),
      // visible: true,
      // wrapLongitude: false,
      visible: visibility,
      opacity: settings.opacity ?? 1,
    } satisfies MapboxLayerProps<LineLayerProps<LandUseChangeData>>;
  }, [settings, visibility]);

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
