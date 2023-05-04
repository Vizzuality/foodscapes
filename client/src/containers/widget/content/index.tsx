'use client';

import { PropsWithChildren } from 'react';

import { Skeleton } from 'components/ui/skeleton';

export interface WidgetContentProps extends PropsWithChildren {
  isFetching: boolean;
  isFetched: boolean;
  isError: boolean;
}

const WidgetContent = ({ children, isFetching, isFetched, isError }: WidgetContentProps) => {
  return (
    <>
      {isFetching && !isFetched && <Skeleton className="h-20 w-full" />}
      {isError && <div className="w-full">Oops!! Something went wrong</div>}
      {isFetched && !isError && children}
    </>
  );
};

export default WidgetContent;
