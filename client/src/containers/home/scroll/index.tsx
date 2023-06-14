import { PropsWithChildren, useRef } from 'react';

import { useAddScrollItem } from 'lib/scroll';

import { useScroll } from 'framer-motion';
interface ScrollItemProps extends PropsWithChildren {
  step: number;
}

const ScrollItem = ({ children, step }: ScrollItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollMotionValue = useScroll({
    target: ref,
    offset: ['0 1', '1 0'],
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
    <section ref={ref} id={`scroll-${step}`} className="lg:h-small-screen lg:min-h-[100vh]">
      {children}
    </section>
  );
};

export default ScrollItem;
