import React, { Children, isValidElement, useMemo } from 'react';

import cx from 'classnames';

import cn from 'lib/classnames';

import { Accordion, AccordionContent, AccordionItem } from '@radix-ui/react-accordion';

import Icon from 'components/icon';
import { LegendItemProps } from 'components/map/legend/types';

import DRAG_SVG from 'svgs/legend/drag.svg?sprite';

import LegendItemToolbar from './toolbar/component';

export const LegendItem: React.FC<LegendItemProps> = ({
  id,
  name,
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

  const acordionState = expand ? id : null;

  return (
    <div key={id} className={'py-0.5'}>
      <Accordion type="single" value={acordionState}>
        <AccordionItem value={id} asChild>
          <div
            className={cn({
              'bg-white': true,
              [className]: !!className,
            })}
          >
            <header className="flex justify-between space-x-8 bg-white px-2.5 py-2.5">
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

            {validChildren && (
              <AccordionContent className="overflow-hidden px-2.5 pb-2.5 transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                {children}
              </AccordionContent>
            )}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LegendItem;
