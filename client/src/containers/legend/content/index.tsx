'use client';

import { PropsWithChildren } from 'react';

// import Loading from 'components/loading';
import LegendError from 'containers/legend/error';

import { Skeleton } from 'components/ui/skeleton';

export interface LegendContentProps extends PropsWithChildren {
  isPlaceholderData: boolean;
  isFetching: boolean;
  isFetched: boolean;
  isError: boolean;
}

const LegendContent = ({
  children,
  isPlaceholderData,
  isFetching,
  isFetched,
  isError,
}: LegendContentProps) => {
  return (
    <div className="relative">
      {isPlaceholderData && <Skeleton className="h-20 w-full" />}

      {/* <Loading
        className="absolute z-10 flex h-full w-full items-center justify-center bg-white/50 py-2"
        iconClassName="w-5 h-5"
        visible={isFetching && !isPlaceholderData}
      /> */}

      {isError && isFetched && !isFetching && <LegendError />}

      {!isPlaceholderData && !isError && children}
    </div>
  );
};

export default LegendContent;