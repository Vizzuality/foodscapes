import React, { Children, isValidElement, useMemo } from 'react';

import cx from 'classnames';

import cn from 'lib/classnames';

import Icon from 'components/icon';
import { LegendItemProps } from 'components/map/legend/types';

import DRAG_SVG from 'svgs/legend/drag.svg?sprite';

import LegendItemToolbar from './toolbar/component';

export const LegendItem: React.FC<LegendItemProps> = ({
  id,
  name,
  description,
  children,
  sortable,
  listeners,
  attributes,
  settingsManager,
  settings,
  className,
  onChangeOpacity,
  onChangeVisibility,
  onChangeExpand,
}: LegendItemProps) => {
  const { expand } = settings || {};

  const validChildren = useMemo(() => {
    const chldn = Children.map(children, (Child) => {
      return isValidElement(Child);
    });
    return chldn && chldn.some((c) => !!c);
  }, [children]);

  return (
    <div key={id} className={'py-0.5'}>
      <div
        className={cn({
          'bg-white px-2.5 py-2.5': true,
          [className]: !!className,
        })}
      >
        <header className="relative flex justify-between space-x-8">
          <div
            className={cx({
              'relative flex space-x-0.5': true,
              '-ml-1': sortable?.handle,
            })}
          >
            {sortable?.handle && (
              <button
                aria-label="drag"
                type="button"
                className="cursor-pointer text-navy-500 transition-colors hover:text-navy-400"
                {...listeners}
                {...attributes}
              >
                <Icon className="h-5 w-5" icon={DRAG_SVG} />
              </button>
            )}

            <div
              className={cx({
                'font-heading mt-px text-sm text-navy-500': true,
              })}
            >
              {name}
            </div>
          </div>

          {/* TOOLBAR */}
          <LegendItemToolbar
            settings={settings}
            settingsManager={settingsManager}
            onChangeOpacity={onChangeOpacity}
            onChangeVisibility={onChangeVisibility}
            onChangeExpand={onChangeExpand}
          />
        </header>

        {description && <div className="mt-1 text-sm text-gray-300">{description}</div>}

        {validChildren && expand && <div className="mt-2.5">{children}</div>}
      </div>
    </div>
  );
};

export default LegendItem;
