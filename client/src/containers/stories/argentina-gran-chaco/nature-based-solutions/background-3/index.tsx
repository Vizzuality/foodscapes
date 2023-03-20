import Image from 'next/image';

import { clamp, useScrollItem } from 'lib/scroll';

import { motion, useTransform } from 'framer-motion';

const NatureBasedBackground3 = () => {
  const { scrollYProgress: scrollYProgress6 } = useScrollItem('scroll-6');
  const { scrollYProgress: scrollYProgress7 } = useScrollItem('scroll-7');

  const x1 = useTransform(scrollYProgress6, (v) => `${clamp(1 - v * 4) * 100}%`);
  const x2 = useTransform(scrollYProgress7, (v) => `${clamp(1 - v * 4) * 50}%`);

  return (
    <motion.div
      key="nature-based-background-3"
      className="fixed top-0 left-0 z-0 h-full w-full translate-x-full"
      style={{
        x: x1,
      }}
    >
      <motion.div
        key="nature-based-background-img-1"
        className="absolute z-0 h-full w-full overflow-hidden"
        style={{
          x: x2,
        }}
      >
        <div className="absolute top-0 left-0 h-full w-full bg-black/50" />
        <Image
          src="/images/stories/argentina-gran-chaco/granchaco-4.jpg"
          alt="Gran Chaco - corn"
          width={2400}
          height={1600}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default NatureBasedBackground3;
