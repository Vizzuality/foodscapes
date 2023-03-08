import { useEffect } from 'react';

import { Layer, useMap } from 'react-map-gl';

import { LayerProps } from 'types/layers';

import { Settings } from 'components/map/legend/types';

import { useDeckLayer, useLayer } from './hooks';

const LandUseChangeLayer = ({ settings, zIndex, beforeId }: LayerProps<Settings>) => {
  const { current: map } = useMap();
  const LAYER = useLayer();
  const DECK_LAYER = useDeckLayer({ settings, zIndex });

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

    return () => {
      const l1 = m.getLayer(DECK_LAYER.id);

      if (l1) {
        m.removeLayer(DECK_LAYER.id);
      }
    };
  }, [map, DECK_LAYER, beforeId]);

  if (!LAYER) return null;

  return <Layer {...LAYER} beforeId={beforeId} />;
};

export default LandUseChangeLayer;
