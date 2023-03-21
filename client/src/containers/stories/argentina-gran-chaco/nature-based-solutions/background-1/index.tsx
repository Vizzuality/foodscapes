import Image from 'next/image';

import { clamp, useScrollItem } from 'lib/scroll';

import { motion, useTransform } from 'framer-motion';

const NatureBasedBackground1 = () => {
  const { scrollYProgress: scrollYProgress3 } = useScrollItem('scroll-3');
  const { scrollYProgress: scrollYProgress4 } = useScrollItem('scroll-4');
  const { scrollYProgress: scrollYProgress5 } = useScrollItem('scroll-5');

  // Bg-2 variables
  const width = useTransform(scrollYProgress3, (v) => `${clamp(v * 2) * 100}%`);
  const y = useTransform(
    [scrollYProgress3, scrollYProgress4, scrollYProgress5],
    (values: number[]) => {
      const v = values.reduce((a, b) => a + b, 0) / values.length;
      return `${clamp(v, 0.166666, 1) * -20}%`;
    }
  );

  return (
    <motion.div key="nature-based-background-1" className="fixed top-0 left-0 z-0 h-[140%] w-full">
      <motion.div
        key="nature-based-background-img-2"
        className="absolute top-0 left-0 z-0 h-full w-full overflow-hidden"
        style={{
          width,
          y,
        }}
      >
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-black/25" />

        <Image
          src="/images/stories/argentina-gran-chaco/granchaco-2.jpg"
          alt="Gran Chaco - cow"
          width={2400}
          height={1600}
          className="h-full w-full object-cover"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default NatureBasedBackground1;
