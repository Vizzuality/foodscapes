import { LayerSpec } from '@vizzuality/layer-manager';

export type LayerProps<T> = Partial<LayerSpec> & {
  beforeId?: string;
  zIndex?: number;
  settings?: Partial<T>;
};
