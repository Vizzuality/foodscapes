import { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const Mask = () => {
  const document = typeof window !== 'undefined' ? window.document : null;
  const ref = useRef(document?.getElementById('scroll-0'));

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 0', '0.5 0'],
  });

  const width = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const x = useTransform(scrollYProgress, (v) => `${(1 - v) * 16 * 2}px`);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 right-0 z-0 h-full w-0 border-[16px] border-white"
      style={{ width, x }}
    >
      <div className="absolute top-0 left-0 h-[calc(88px_-_theme(space.4))] w-full bg-white" />
      <div className="absolute top-0 right-0 h-full w-1/2 bg-white" />
    </motion.div>
  );
};

export default Mask;
