'use client';

import { PropsWithChildren } from 'react';

import cn from 'lib/classnames';

export interface FiltersErrorProps extends PropsWithChildren {
  className?: string;
}

const FiltersError = ({ children, className }: FiltersErrorProps) => {
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

export default FiltersError;
