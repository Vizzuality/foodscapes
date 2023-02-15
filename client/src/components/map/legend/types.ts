import { PropsWithChildren } from 'react';

import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListeners } from '@dnd-kit/core/dist/hooks/utilities';

type Sortable = {
  enabled: boolean;
  handle?: boolean;
  handleIcon?: React.ReactNode;
};

type OnChangeOrder = (id: string[]) => void;
type OnChangeOpacity = (opacity: number, settings: Settings) => void;
type OnChangeVisibility = (visibility: boolean, settings: Settings) => void;

export type Settings = {
  opacity: number;
  visibility: boolean;
};

export type SettingsManager = {
  opacity: boolean;
  visibility: boolean;
};
/*
 * Legend
 */
export interface LegendProps extends PropsWithChildren {
  className?: string;
  maxHeight: string | number;
  sortable?: Sortable;
  onChangeOrder?: OnChangeOrder;
}

export interface LegendItemProps extends PropsWithChildren {
  id: string;
  name: string;
  description?: string;
  // sortable
  sortable?: Sortable;
  listeners?: SyntheticListeners;
  attributes?: DraggableAttributes;

  // settings
  settings?: Settings;
  settingsManager?: SettingsManager;
  theme?: 'dark' | 'light';
  className?: string;
  onChangeOpacity?: OnChangeOpacity;
  onChangeVisibility?: OnChangeVisibility;
}

export interface LegendItemToolbarProps {
  // settings
  settings?: Settings;
  settingsManager?: SettingsManager;

  theme?: 'dark' | 'light';
  className?: string;
  onChangeOpacity?: OnChangeOpacity;
  onChangeVisibility?: OnChangeVisibility;
}

/*
 * Sortable
 */
export interface SortableListProps extends PropsWithChildren {
  className?: string;
  sortable: Sortable;
  onChangeOrder: OnChangeOrder;
}

export interface SortableItemProps extends PropsWithChildren {
  id: string;
  sortable: Sortable;
}
