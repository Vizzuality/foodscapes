import { clamp, useScrollItem } from 'lib/scroll';

import { stepAtom } from 'store/stories/gran-chaco';

import { AnimatePresence, motion, useTransform } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import Mask1 from 'containers/stories/argentina-gran-chaco/intro/mask/mask-1';
import Mask2 from 'containers/stories/argentina-gran-chaco/intro/mask/mask-2';

const Mask = () => {
  const step = useRecoilValue(stepAtom);
  const { scrollYProgress } = useScrollItem('scroll-0');

  const width = useTransform(scrollYProgress, (v) => `${clamp(v * 2) * 100}%`);
  const x = useTransform(scrollYProgress, (v) => `${(1 - clamp(v * 2)) * 16 * 2}px`);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 right-0 z-0 h-full w-0 border-[16px] border-white"
      style={{ width, x }}
    >
      <div className="absolute top-0 left-0 h-[calc(88px_-_theme(space.4))] w-full bg-white" />
      <div className="absolute top-0 right-0 h-full w-1/2 bg-white" />

      <AnimatePresence>
        {step === 1 && <Mask1 key="mask-1" />}

        {step === 2 && <Mask2 key="mask-2" />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Mask;
