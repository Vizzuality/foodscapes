import { PropsWithChildren, useRef } from 'react';

import cn from 'lib/classnames';
import { useAddScrollItem } from 'lib/scroll';

import { useScroll } from 'framer-motion';

import { SCROLL_ITEMS_METADATA } from './constants';

interface ScrollItemProps extends PropsWithChildren {
  className?: string;
  step: number;
}

const ScrollItem = ({ children, className, step }: ScrollItemProps) => {
  const { useScrollProps } = SCROLL_ITEMS_METADATA[step];

  const ref = useRef<HTMLDivElement>(null);

  const scrollMotionValue = useScroll({
    target: ref,
    ...useScrollProps,
  });

  useAddScrollItem({
    ref,
    key: `scroll-${step}`,
    data: {
      step,
    },
    ...scrollMotionValue,
  });

  return (
    <section
      id={`scroll-${step}`}
      key={`scroll-${step}`}
      ref={ref}
      className={cn({
        'relative min-h-[100vh]': true,
        [className]: !!className,
      })}
    >
      {children}
    </section>
  );
};

export default ScrollItem;
