import { clamp, useScrollItem } from 'lib/scroll';

import { motion, useTransform } from 'framer-motion';

const NatureBasedMask = () => {
  const { scrollYProgress: scrollYProgress5 } = useScrollItem('scroll-5');
  const { scrollYProgress: scrollYProgress6 } = useScrollItem('scroll-6');
  const { scrollYProgress: scrollYProgress7 } = useScrollItem('scroll-7');

  const x = useTransform([scrollYProgress6, scrollYProgress7], (values: number[]) => {
    const [v1, v2] = values;

    const p1 = clamp(v1 * 4) * -100;
    const p2 = clamp(v2 * 4) * -100;

    return `${p1 + p2}%`;
  });

  const y = useTransform(scrollYProgress5, (v) => `${(1 - v) * 100}%`);

  return (
    <motion.div
      key="nature-based-background-2"
      className="fixed top-0 left-0 z-0 h-full w-full translate-y-full"
      style={{ y }}
    >
      <motion.div
        key="nature-based-background-img-1"
        className="absolute top-0 left-full z-0 h-full w-1/2 overflow-hidden"
        style={{
          x,
        }}
      >
        <div className="absolute top-0 right-0 h-full w-full bg-white" />
      </motion.div>
    </motion.div>
  );
};

export default NatureBasedMask;
