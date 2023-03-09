export type LayerProps<S> = {
  id?: string;
  beforeId?: string;
  zIndex?: number;
  settings?: Partial<S>;
};

export type DeckLayerProps<T, S> = LayerProps<S> & T;
