import cn from 'lib/classnames';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn({ 'animate-pulse rounded-md bg-gray-200': true, [className]: !!className })}
      {...props}
    />
  );
}

export { Skeleton };
