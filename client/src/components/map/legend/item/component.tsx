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
  theme = 'light',
  onChangeOpacity,
  onChangeVisibility,
}: LegendItemProps) => {
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
              'relative flex space-x-2': true,
            })}
          >
            {sortable?.handle && (
              <button
                aria-label="drag"
                type="button"
                className="cursor-pointer text-navy-400 hover:text-navy-500"
                {...listeners}
                {...attributes}
              >
                <Icon className="h-4 w-4" icon={DRAG_SVG} />
              </button>
            )}

            <div
              className={cx({
                'font-heading text-sm text-white': true,
                'text-white': theme === 'dark',
                'text-gray-700': theme === 'light',
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
          />
        </header>

        {description && <div className="mt-1 text-sm text-gray-300">{description}</div>}

        {validChildren && <div className="mt-2.5">{children}</div>}
      </div>
    </div>
  );
};

export default LegendItem;
