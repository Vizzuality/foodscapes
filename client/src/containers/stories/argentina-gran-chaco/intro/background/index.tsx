import Image from 'next/image';

import { motion, useScroll, useTransform } from 'framer-motion';

import { useElementById } from 'hooks/utils';

const IntroBackground = () => {
  const ref = useElementById('scroll-0');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 0', '0.5 0'],
  });

  const x = useTransform(scrollYProgress, (v) => `${v * -25}%`);

  return (
    <motion.div
      key="background"
      className="fixed z-0 h-full w-full overflow-hidden"
      style={{
        x,
      }}
    >
      <Image
        src="/images/stories/argentina-gran-chaco/granchaco-1.jpg"
        alt="Gran Chaco"
        width={2000}
        height={1100}
        className="h-full w-full object-cover"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black/20" />
    </motion.div>
  );
};

export default IntroBackground;
