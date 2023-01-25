import { useEffect, useRef } from 'react';

import { useInView } from 'framer-motion';

export interface ScrollSectionProps {
  step: number;
}

const ScrollSection = ({ step }: ScrollSectionProps) => {
  const ref = useRef();
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      console.info(step);
    }
  }, [step, isInView]);

  return (
    <div
      id={`scroll-${step}`}
      ref={ref}
      className="pointer-events-none relative h-small-screen w-full snap-start snap-always"
    />
  );
};

export default ScrollSection;
