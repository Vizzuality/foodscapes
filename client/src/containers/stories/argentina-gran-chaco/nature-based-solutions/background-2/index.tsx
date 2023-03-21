import Image from 'next/image';

import { clamp, useScrollItem } from 'lib/scroll';

import { motion, useTransform } from 'framer-motion';

const NatureBasedBackground2 = () => {
  const { scrollYProgress: scrollYProgress5 } = useScrollItem('scroll-5');
  const { scrollYProgress: scrollYProgress6 } = useScrollItem('scroll-6');

  const x = useTransform(scrollYProgress6, (v) => `${clamp(v * 4) * -50}%`);

  const y = useTransform(scrollYProgress5, (v) => `${(1 - v) * 100}%`);

  return (
    <motion.div
      key="nature-based-background-2"
      className="fixed top-0 left-0 z-0 h-full w-full translate-y-full"
      style={{ y }}
    >
      <motion.div
        key="nature-based-background-img-1"
        className="absolute z-0 h-full w-full overflow-hidden"
        style={{
          x,
        }}
      >
        <div className="absolute top-0 left-0 h-full w-full bg-black/50" />
        <Image
          src="/images/stories/argentina-gran-chaco/granchaco-3.jpg"
          alt="Gran Chaco - corn"
          width={2400}
          height={1600}
          className="h-full w-full object-cover"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default NatureBasedBackground2;
