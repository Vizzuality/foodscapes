import { PropsWithChildren } from 'react';

import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListeners } from '@dnd-kit/core/dist/hooks/utilities';

import { FiltersProps } from 'types/data';
import { LayerSettings, LayerType, LayerTypeSettings } from 'types/layers';

import { IconProps } from 'components/icon/types';

type Components = {
  Info: React.ReactNode;
};

type Sortable = {
  enabled: boolean;
  handle?: boolean;
  handleIcon?: React.ReactNode;
};

type OnChangeOrder = (id: string[]) => void;
type OnChangeOpacity = (opacity: number) => void;
type OnChangeVisibility = (visibility: boolean) => void;
type OnChangeExpand = (expand: boolean) => void;

export type Settings = {
  opacity: number;
  visibility: boolean;
  expand: boolean;
};

export type SettingsManager = {
  opacity: boolean;
  visibility: boolean;
  expand: boolean;
  info?: boolean;
};

export type LegendItemEvents = {
  onChangeOpacity?: OnChangeOpacity;
  onChangeVisibility?: OnChangeVisibility;
  onChangeExpand?: OnChangeExpand;
};
/*
 * Legend
 */
export interface LegendProps extends PropsWithChildren {
  className?: string;
  sortable: Sortable;
  onChangeOrder?: OnChangeOrder;
}

export interface LegendItemProps<I extends LayerType> extends PropsWithChildren, LegendItemEvents {
  id: string;
  name: string;
  className?: string;
  // filters
  filters: FiltersProps;

  // components
  Components: Components;

  // sortable
  sortable: Sortable;
  listeners?: SyntheticListeners;
  attributes?: DraggableAttributes;

  // settings
  // I extends Dataset['id'] so you can get the correct setting depending on the dataset id
  settings?: I extends infer T ? (T extends I ? LayerTypeSettings[T] : never) : never;
  settingsManager?: SettingsManager;
}

export interface LegendItemToolbarProps extends LegendItemEvents {
  className?: string;
  // components
  Components?: Components;
  // settings
  settings?: LayerSettings<LayerType>;
  settingsManager?: SettingsManager;
}

export interface LegendItemButtonProps {
  icon: IconProps['icon'];
  selected?: boolean;
  className?: string;
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
