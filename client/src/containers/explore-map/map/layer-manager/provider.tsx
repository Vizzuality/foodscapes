import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';

import { useControl } from 'react-map-gl';

import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';

interface MapboxOverlayContext {
  addLayer: (layer: any) => void;
  removeLayer: (id: any) => void;
}

const Context = createContext<MapboxOverlayContext>({
  addLayer: () => {},
  removeLayer: () => {},
});

function useMapboxOverlay(
  props: MapboxOverlayProps & {
    interleaved?: boolean;
  }
) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);

  return overlay;
}

export const MapboxOverlayProvider = ({ children }: PropsWithChildren) => {
  const OVERLAY = useMapboxOverlay({
    interleaved: true,
  });

  const addLayer = useCallback(
    (layer) => {
      const layers = OVERLAY._props.layers || [];

      const l1 = new layer.type({
        ...layer,
        getPolygonOffset: () => [0, -100000000 + layer.zIndex * 1000],
      });

      OVERLAY.setProps({
        layers: [...layers.filter((l) => l.id !== layer.id), l1],
      });
    },
    [OVERLAY]
  );

  const removeLayer = useCallback(
    (id) => {
      const layers = OVERLAY._props.layers || [];

      OVERLAY.setProps({
        layers: [...layers.filter((l) => l.id !== id)],
      });
    },
    [OVERLAY]
  );

  const context = useMemo(
    () => ({
      addLayer,
      removeLayer,
    }),
    [addLayer, removeLayer]
  );

  return (
    <Context.Provider key="scroll-provider" value={context}>
      {children}
    </Context.Provider>
  );
};

export const useMapboxOverlayContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useMapboxOverlayContext must be used within a MapboxOverlayProvider');
  }

  return context;
};
