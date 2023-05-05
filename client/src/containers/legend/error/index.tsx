'use client';

import { PropsWithChildren } from 'react';

export interface LegendErrorProps extends PropsWithChildren {}

const LegendError = ({ children }: LegendErrorProps) => {
  return (
    <div className="flex w-full justify-center bg-gray-500/10 p-6">
      {children || 'Oops!! Something went wrong'}
    </div>
  );
};

export default LegendError;
