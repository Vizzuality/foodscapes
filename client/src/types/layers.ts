import LayerManager, { LayerSpec } from '@vizzuality/layer-manager';

export type LayerProps<T> = Partial<LayerSpec> & {
  layerManager?: LayerManager;
  settings?: Partial<T>;
};
