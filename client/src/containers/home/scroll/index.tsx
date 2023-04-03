import { PropsWithChildren, useEffect, useRef } from 'react';

import { useInView } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';

import { screens } from 'styles/styles.config';
interface ScrollItemProps extends PropsWithChildren {
  step: number;
  onChange: (step: number) => void;
}

const ScrollItem = ({ children, step, onChange }: ScrollItemProps) => {
  const lg = useMediaQuery(`(min-width: ${screens.lg})`);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount: 0.5,
    margin: '0% 0% 0% 0%',
    ...(!lg && {
      amount: 0,
      margin: '0% 0% -50% 0%',
    }),
  });

  useEffect(() => {
    if (inView) {
      onChange(step);
    }
  }, [step, inView, onChange]);

  return (
    <section ref={ref} id={`scroll-${step}`} className="lg:h-small-screen lg:min-h-[100vh]">
      {children}
    </section>
  );
};

export default ScrollItem;
