import { PropsWithChildren, useEffect, useRef } from 'react';

import cn from 'lib/classnames';
import { useAddScrollItem } from 'lib/scroll';

import { useInView, useScroll } from 'framer-motion';

import { SCROLL_ITEMS_METADATA } from './constants';

interface ScrollItemProps extends PropsWithChildren {
  className?: string;
  step: number;
  onChange: (step: number) => void;
}

const ScrollItem = ({ children, className, step, onChange }: ScrollItemProps) => {
  const { inViewProps, useScrollProps } = SCROLL_ITEMS_METADATA[step];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, inViewProps);

  const scrollMotionValue = useScroll({
    target: ref,
    ...useScrollProps,
  });

  useAddScrollItem({
    key: `scroll-${step}`,
    ...scrollMotionValue,
  });

  useEffect(() => {
    if (inView) {
      onChange(step);
    }
  }, [inView, onChange]); // eslint-disable-line

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
