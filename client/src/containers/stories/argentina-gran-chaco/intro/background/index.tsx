import Image from 'next/image';

import { clamp, useScrollItem } from 'lib/scroll';

import { motion, useTransform } from 'framer-motion';

const IntroBackground = () => {
  const { scrollYProgress } = useScrollItem('scroll-0');

  const x = useTransform(scrollYProgress, (v) => `${clamp(v * 2) * -25}%`);

  return (
    <motion.div
      key="background"
      className="fixed top-0 left-0 z-0 h-full w-full overflow-hidden"
      initial={{ y: 88 }}
      animate={{ y: 0 }}
      style={{
        x,
      }}
      transition={{ delay: 0.5, duration: 0.75 }}
    >
      <Image
        src="/images/stories/argentina-gran-chaco/granchaco-1.jpg"
        alt="Gran Chaco"
        width={2000}
        height={1100}
        className="h-full w-full object-cover"
        priority
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black/20" />
    </motion.div>
  );
};

export default IntroBackground;
