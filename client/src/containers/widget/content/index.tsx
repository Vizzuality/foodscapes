'use client';

import { PropsWithChildren } from 'react';

import Loading from 'components/loading';
import { Skeleton } from 'components/ui/skeleton';

export interface WidgetContentProps extends PropsWithChildren {
  isPlaceholderData: boolean;
  isFetching: boolean;
  isFetched: boolean;
  isError: boolean;
}

const WidgetContent = ({
  children,
  isPlaceholderData,
  isFetching,
  isFetched,
  isError,
}: WidgetContentProps) => {
  return (
    <div className="relative">
      {isPlaceholderData && <Skeleton className="h-20 w-full" />}
      <Loading
        className="absolute z-10 flex h-full w-full items-center justify-center bg-white/50 py-2"
        iconClassName="w-5 h-5"
        visible={isFetching && !isPlaceholderData}
      />
      {isError && isFetched && !isFetching && (
        <div className="flex w-full justify-center bg-gray-500/10 p-6">
          Oops!! Something went wrong
        </div>
      )}
      {!isPlaceholderData && !isError && children}
    </div>
  );
};

export default WidgetContent;
