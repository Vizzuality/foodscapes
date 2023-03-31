'use client';

import * as React from 'react';

import cn from 'lib/classnames';

import * as SwitchPrimitives from '@radix-ui/react-switch';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn({
      'peer inline-flex h-3 w-6 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-navy-200 data-[state=checked]:bg-navy-500 dark:focus:ring-navy-400 dark:focus:ring-offset-navy-500 dark:data-[state=unchecked]:bg-navy-500 dark:data-[state=checked]:bg-navy-400':
        true,
      [className]: !!className,
    })}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn({
        'pointer-events-none block h-2 w-2 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-3':
          true,
      })}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
