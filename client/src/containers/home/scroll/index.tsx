import { PropsWithChildren, useEffect, useRef } from 'react';

import { stepAtom } from 'store/home';

import { useInView } from 'framer-motion';
import { useRecoilValue } from 'recoil';

interface ScrollItemProps extends PropsWithChildren {
  step: number;
  onChange: (step: number) => void;
}

const ScrollItem = ({ children, step, onChange }: ScrollItemProps) => {
  const s = useRecoilValue(stepAtom);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (inView && s !== step) {
      onChange(step);
    }
  }, [s, step, inView, onChange]);

  return (
    <section ref={ref} id={`scroll-${step}`} className="min-h-[100vh]">
      {children}
    </section>
  );
};

export default ScrollItem;
