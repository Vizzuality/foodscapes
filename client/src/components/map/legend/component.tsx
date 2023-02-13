import { FC, PropsWithChildren } from 'react';

import cx from 'classnames';

import SortableList from './sortable/list';
import type { LegendProps } from './types';

type LegendPropsWithChildren = PropsWithChildren<LegendProps>;

export const Legend: FC<LegendPropsWithChildren> = ({
  children,
  className = '',
  maxHeight,
  onChangeOrder,
}: LegendPropsWithChildren) => {
  return (
    <div
      className={cx({
        'flex grow flex-col bg-white': true,
        [className]: !!className,
      })}
    >
      <div
        className="relative flex grow flex-col overflow-hidden "
        style={{
          maxHeight,
        }}
      >
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-4 w-full bg-gradient-to-b from-white via-white" />
        <div className="overflow-y-auto overflow-x-hidden">
          <SortableList onChangeOrder={onChangeOrder}>{children}</SortableList>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-3 w-full bg-gradient-to-t from-white via-white" />
      </div>
    </div>
  );
};

export default Legend;
