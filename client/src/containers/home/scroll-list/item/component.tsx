import { PropsWithChildren, useEffect, useRef } from 'react';

import { stepAtom } from 'store/home';

import { useInView } from 'framer-motion';
import { useSetRecoilState } from 'recoil';

interface ScrollItemProps extends PropsWithChildren {
  step: number;
}

const ScrollItem = ({ children, step }: ScrollItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.75 });
  const setStep = useSetRecoilState(stepAtom);

  useEffect(() => {
    if (inView) {
      setStep(step);
    }
  }, [step, setStep, inView]);

  return <section ref={ref}>{children}</section>;
};

export default ScrollItem;
