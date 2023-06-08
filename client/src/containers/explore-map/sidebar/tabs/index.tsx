'use client';

import * as React from 'react';

import cn from 'lib/classnames';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import Icon from 'components/icon';

import CASE_STUDIES_SVG from 'svgs/tabs/tab-casestudies.svg?sprite';
import FOODSCAPES_SVG from 'svgs/tabs/tab-foodscapes.svg?sprite';
import LOCATIONS_SVG from 'svgs/tabs/tab-locations.svg?sprite';
import OPPORTUNITIES_SVG from 'svgs/tabs/tab-opportunities.svg?sprite';
import RISKS_SVG from 'svgs/tabs/tab-risks.svg?sprite';

const TABS = [
  {
    id: 'foodscapes',
    label: 'Foodscapes',
    active: 'group-data-[state=active]:text-yellow-500',
    icon: FOODSCAPES_SVG,
  },
  {
    id: 'risks',
    label: 'Risks',
    active: 'group-data-[state=active]:text-red-500',
    icon: RISKS_SVG,
  },
  {
    id: 'opportunities',
    label: 'Opportunities',
    active: 'group-data-[state=active]:text-green-500',
    icon: OPPORTUNITIES_SVG,
  },
  {
    id: 'locations',
    label: 'Locations',
    active: 'group-data-[state=active]:text-blue-500',
    icon: LOCATIONS_SVG,
  },
  {
    id: 'case-studies',
    label: 'Case Studies',
    active: 'group-data-[state=active]:text-violet-500',
    icon: CASE_STUDIES_SVG,
  },
];

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn({
      'flex items-center space-x-5 py-3 px-20': true,
      [className]: !!className,
    })}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const TAB = TABS.find((tab) => tab.id === props.value);

  return (
    <TabsPrimitive.Trigger
      className={cn({
        'group flex flex-col items-center justify-center disabled:pointer-events-none disabled:opacity-50':
          true,
        [className]: !!className,
      })}
      {...props}
      ref={ref}
    >
      <div className="relative z-0 flex h-10 w-10 items-center justify-center">
        <div
          className={cn({
            'absolute top-0 left-0 z-0 flex h-full w-full rounded-full transition-all': true,
            'bg-navy-500/0 animate-out zoom-out': true,
            'group-hover:bg-navy-500/5 group-hover:animate-in group-hover:zoom-in': true,
            'group-data-[state=active]:bg-navy-500 group-data-[state=active]:animate-in group-data-[state=active]:zoom-in':
              true,
          })}
        />

        <Icon
          icon={TAB?.icon}
          className={cn({
            'relative z-10 h-6 w-6 text-navy-500 transition-colors duration-300': true,
            [TAB?.active]: true,
          })}
        />
      </div>
      <span className="text-xxs">{TAB?.label}</span>
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      className={cn({
        'group relative': true,
        'data-[state=active]:flex data-[state=active]:grow data-[state=active]:flex-col': true,
        [className]: !!className,
      })}
      {...props}
      ref={ref}
    >
      <div
        className={cn({
          'relative z-10 flex grow flex-col transition-all animate-in duration-500 group-data-[state=active]:slide-in-from-left-4':
            true,
        })}
      >
        {props.children}
      </div>
    </TabsPrimitive.Content>
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
