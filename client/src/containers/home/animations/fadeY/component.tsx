import { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';

import { useScrollDirection } from 'hooks/home';

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
    },
    exit: (d: number) => ({
      opacity: 0,
      y: -d * 100,
    }),
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={direction}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeY;
