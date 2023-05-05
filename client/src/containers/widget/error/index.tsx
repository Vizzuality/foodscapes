'use client';

import { PropsWithChildren } from 'react';

import cn from 'lib/classnames';

export interface WidgetErrorProps extends PropsWithChildren {
  className?: string;
}

const WidgetError = ({ children, className }: WidgetErrorProps) => {
  return (
    <div
      className={cn({
        'flex w-full justify-center bg-gray-500/10 p-6': true,
        [className]: className,
      })}
    >
      {children || 'Oops!! Something went wrong'}
    </div>
  );
};

export default WidgetError;
