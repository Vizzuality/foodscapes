'use client';

import { PropsWithChildren } from 'react';

// import Loading from 'components/loading';
import FiltersError from 'containers/widget/error';

import { Skeleton } from 'components/ui/skeleton';

export interface FiltersContentProps extends PropsWithChildren {
  isPlaceholderData: boolean;
  isFetching: boolean;
  isFetched: boolean;
  isError: boolean;
}

const FiltersContent = ({
  children,
  isPlaceholderData,
  isFetching,
  isFetched,
  isError,
}: FiltersContentProps) => {
  return (
    <div className="relative">
      {isPlaceholderData && <Skeleton className="h-6 w-full bg-navy-400" />}

      {/* <Loading
        className="absolute z-10 flex h-full w-full items-center justify-center bg-white/50 py-2"
        iconClassName="w-5 h-5"
        visible={isFetching && !isPlaceholderData}
      /> */}

      {isError && isFetched && !isFetching && <FiltersError />}

      {!isPlaceholderData && !isError && children}
    </div>
  );
};

export default FiltersContent;
