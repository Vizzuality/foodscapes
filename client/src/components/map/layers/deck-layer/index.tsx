import { Layer } from 'react-map-gl';

import { DeckLayerProps } from 'types/layers';

import { Settings } from 'components/map/legend/types';

import { useLayer } from './hooks';

const DeckLayer = <T extends unknown>({
  id,
  settings,
  zIndex,
  beforeId,
  ...props
}: DeckLayerProps<T, Settings>) => {
  // Render deck layer
  useLayer({ id, beforeId, settings, zIndex, ...props });

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
