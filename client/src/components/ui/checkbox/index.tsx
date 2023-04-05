'use client';

import * as React from 'react';

import cn from 'lib/classnames';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import Icon from 'components/icon';

import CHECK_SVG from 'svgs/ui/check.svg?sprite';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn({
      'border-slate-300 focus:ring-slate-400 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 peer h-4 w-4 shrink-0 rounded-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50':
        true,
      [className]: className,
    })}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn({ 'flex items-center justify-center p-px': true })}>
      <Icon icon={CHECK_SVG} className="h-full w-full" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
