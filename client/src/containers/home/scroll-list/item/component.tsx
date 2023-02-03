import { PropsWithChildren, useEffect, useRef } from 'react';

import { stepAtom } from 'store/home';

import { useInView } from 'framer-motion';
import { useRecoilValue } from 'recoil';

interface ScrollItemProps extends PropsWithChildren {
  step: number;
  onChange: (step: number) => void;
}

const ScrollItem = ({ children, step, onChange }: ScrollItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });

  const s = useRecoilValue(stepAtom);

  useEffect(() => {
    if (inView && s !== step) {
      onChange(step);
    }
  }, [s, step, inView, onChange]);

  return (
    <section ref={ref} className="h-[200vh]">
      {children}
    </section>
  );
};

export default ScrollItem;
