'use client';

import { PropsWithChildren } from 'react';

// import Loading from 'components/loading';
import cn from 'lib/classnames';

import WidgetError from 'containers/widget/error';

import { Skeleton } from 'components/ui/skeleton';

export interface WidgetContentProps extends PropsWithChildren {
  skeletonClassName?: string;
  isPlaceholderData: boolean;
  isFetching: boolean;
  isFetched: boolean;
  isError: boolean;
}

const WidgetContent = ({
  skeletonClassName,
  children,
  isPlaceholderData,
  isFetching,
  isFetched,
  isError,
}: WidgetContentProps) => {
  return (
    <div className="relative">
      {isPlaceholderData && (
        <Skeleton
          className={cn({
            'h-20 w-full': true,
            [skeletonClassName]: !!skeletonClassName,
          })}
        />
      )}

      {/* <Loading
        className="absolute z-10 flex h-full w-full items-center justify-center bg-white/50 py-2"
        iconClassName="w-5 h-5"
        visible={isFetching && !isPlaceholderData}
      /> */}

      {isError && isFetched && !isFetching && <WidgetError />}

      {!isPlaceholderData && !isError && children}
    </div>
  );
};

export default WidgetContent;
