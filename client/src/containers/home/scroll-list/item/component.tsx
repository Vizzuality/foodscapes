import { PropsWithChildren, useEffect, useRef } from 'react';

import { stepAtom } from 'store/home';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRecoilValue } from 'recoil';

const threshold = 0.4;
const clamp = (v) => {
  if (v < threshold) {
    const p = (threshold - v) * (1 / threshold) * 2;

    // clamp value between 0 and 1
    return 1 - Math.min(Math.max(p, 0), 1);
  }

  if (v > 1 - threshold) {
    const p = (threshold - (1 - v)) * (1 / threshold) * 2;
    return 1 - Math.min(Math.max(p, 0), 1);
  }

  return 1;
};

interface ScrollItemProps extends PropsWithChildren {
  step: number;
  onChange: (step: number) => void;
}

const ScrollItem = ({ children, step, onChange }: ScrollItemProps) => {
  const s = useRecoilValue(stepAtom);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, (v) => clamp(v));

  useEffect(() => {
    if (inView && s !== step) {
      onChange(step);
    }
  }, [s, step, inView, onChange]);

  return (
    <motion.section
      ref={ref}
      className="h-[200vh]"
      style={{
        opacity,
      }}
    >
      {children}
    </motion.section>
  );
};

export default ScrollItem;
