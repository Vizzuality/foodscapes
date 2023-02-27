import LayerManager, { LayerSpec } from '@vizzuality/layer-manager';

export type LayerProps<T> = LayerSpec & {
  layerManager: LayerManager;
  settings: Partial<T>;
};
