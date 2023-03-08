import { useEffect } from 'react';

import { Layer, useMap } from 'react-map-gl';

import { LayerProps } from 'types/layers';

import { Settings } from 'components/map/legend/types';

import { useDeckLayer, useLayer } from './hooks';

const FoodscapesIntensityGroupsLayer = ({ settings, beforeId }: LayerProps<Settings>) => {
  const { current: map } = useMap();
  const LAYER = useLayer();
  const DECK_LAYER = useDeckLayer({ settings });

  // Add layer on mount
  // Move layer on beforeId change
  useEffect(() => {
    const m = map.getMap();
    const l = map.getLayer(DECK_LAYER.id);

    if (!l) {
      m.addLayer(DECK_LAYER, beforeId);
    }

    if (l) {
      m.moveLayer(DECK_LAYER.id, beforeId);
    }
  }, [map, DECK_LAYER, beforeId]);

  // Remove layer on unmount
  useEffect(() => {
    return () => {
      const m = map.getMap();
      const l = m.getLayer(DECK_LAYER.id);

      if (l) {
        m.removeLayer(DECK_LAYER.id);
      }
    };
  }, [DECK_LAYER, map]);

  if (!LAYER) return null;

  return <Layer {...LAYER} beforeId={beforeId} />;
};

export default FoodscapesIntensityGroupsLayer;
