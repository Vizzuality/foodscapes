import { useEffect, useRef } from 'react';

import { step } from 'store/home';

import { useInView } from 'framer-motion';
import { useSetRecoilState } from 'recoil';

export interface ScrollSectionProps {
  id: number;
}

const ScrollSection = ({ id }: ScrollSectionProps) => {
  const ref = useRef();
  const isInView = useInView(ref, { amount: 0.5 });
  const setStep = useSetRecoilState(step);

  useEffect(() => {
    if (isInView) {
      setStep(id);
    }
  }, [id, isInView, setStep]);

  return (
    <div
      id={`scroll-${id}`}
      ref={ref}
      className="pointer-events-none relative h-small-screen w-full snap-start snap-always"
    />
  );
};

export default ScrollSection;
