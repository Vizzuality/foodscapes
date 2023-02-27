import { PropsWithChildren, useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const threshold = 0.3;
const clamp = (v) => {
  if (v < threshold) {
    const p = (threshold - v) * (1 / threshold);

    // clamp value between 0 and 1
    return 1 - Math.min(Math.max(p, 0), 1);
  }

  if (v > 1 - threshold) {
    const p = (threshold - (1 - v)) * (1 / threshold);
    return 1 - Math.min(Math.max(p, 0), 1);
  }

  return 1;
};

interface FadeYScrollProps extends PropsWithChildren {}

const FadeYScroll = ({ children }: FadeYScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end start', 'start end'],
  });

  const opacity = useTransform(scrollYProgress, (v) => clamp(v));

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeYScroll;
