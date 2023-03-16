import { PropsWithChildren, useEffect, useRef } from 'react';

import cn from 'lib/classnames';

import { stepAtom } from 'store/home';

import { useInView } from 'framer-motion';
import { useRecoilValue } from 'recoil';

interface ScrollItemProps extends PropsWithChildren {
  className?: string;
  step: number;
  onChange: (step: number) => void;
}

const ScrollItem = ({ children, className, step, onChange }: ScrollItemProps) => {
  const s = useRecoilValue(stepAtom);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount: 0.25,
    margin: '-50% 0% 0% 0%',
  });

  useEffect(() => {
    if (inView && s !== step) {
      onChange(step);
    }
  }, [s, step, inView, onChange]);

  return (
    <section
      id={`scroll-${step}`}
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
