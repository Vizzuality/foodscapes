import React, { useMemo, Children, isValidElement } from 'react';

import cn from 'lib/classnames';

import SortableList from './sortable/list';
import { LegendProps } from './types';

export const Legend: React.FC<LegendProps> = ({
  children,
  className = '',
  sortable,
  onChangeOrder,
}: LegendProps) => {
  const isChildren = useMemo(() => {
    return !!Children.count(Children.toArray(children).filter((c) => isValidElement(c)));
  }, [children]);

  return (
    <div
      className={cn({
        'flex w-full grow flex-col overflow-hidden': true,
        hidden: !isChildren,
        [className]: !!className,
      })}
    >
      {isChildren && (
        <div className="relative flex h-full grow flex-col overflow-hidden">
          {/* <div className="pointer-events-none absolute top-0 left-0 z-10 h-3 w-full bg-gradient-to-b from-black via-black" /> */}
          <div className="overflow-y-auto overflow-x-hidden">
            {!!sortable && (
              <SortableList sortable={sortable} onChangeOrder={onChangeOrder}>
                {children}
              </SortableList>
            )}

            {!sortable && children}
          </div>
          {/* <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-3 w-full bg-gradient-to-t from-black via-black" /> */}
        </div>
      )}
    </div>
  );
};

export default Legend;
