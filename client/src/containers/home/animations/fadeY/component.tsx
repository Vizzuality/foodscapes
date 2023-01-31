import { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';

import { useScrollDirection } from 'hooks/home';

import { STEP_DURATION } from 'containers/home/animations/constants';

interface FadeYProps extends PropsWithChildren {
  className?: string;
}

const FadeY = ({ className, children }: FadeYProps) => {
  const { direction } = useScrollDirection();

  const variants = {
    initial: (d: number) => ({
      opacity: 0,
      y: d * 100,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: STEP_DURATION,
        delay: STEP_DURATION / 4,
      },
    },
    exit: (d: number) => ({
      opacity: 0,
      y: -d * 100,
      transition: {
        duration: STEP_DURATION,
        delay: 0,
      },
    }),
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={direction}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeY;
