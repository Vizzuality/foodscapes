import { useEffect } from 'react';

import { Layer } from 'react-map-gl';

import { DeckLayerProps } from 'types/layers';

import { useMapboxOverlayContext } from 'containers/explore-map/map/layer-manager/provider';

import { Settings } from 'components/map/legend/types';

const DeckLayer = <T extends unknown>({
  id,
  settings,
  beforeId,
  ...props
}: DeckLayerProps<T, Settings>) => {
  // Render deck layer
  const i = `${id}-deck`;
  const { addLayer, removeLayer } = useMapboxOverlayContext();

  useEffect(() => {
    addLayer({ ...props, id: i, beforeId });
  }, [i, beforeId, props, addLayer]);

  useEffect(() => {
    return () => {
      removeLayer(i);
    };
  }, [i, removeLayer]);

  return (
    <Layer
      id={id}
      type="background"
      paint={{
        'background-color': '#77CCFF',
        'background-opacity': 0,
      }}
      beforeId={beforeId}
    />
  );
};

export default DeckLayer;
