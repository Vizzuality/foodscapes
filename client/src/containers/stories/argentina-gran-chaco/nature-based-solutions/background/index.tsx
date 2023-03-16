import Image from 'next/image';

import { clamp, useScrollItem } from 'lib/scroll';

import { motion, useTransform } from 'framer-motion';

const NatureBasedBackground = () => {
  const { scrollYProgress: scrollYProgress3 } = useScrollItem('scroll-3');
  const { scrollYProgress: scrollYProgress5 } = useScrollItem('scroll-5');

  // Bg-2 variables
  const imgX2 = useTransform(scrollYProgress3, (v) => `${(1 - clamp(v * 2)) * 100}%`);
  const imgY2 = useTransform(scrollYProgress3, (v) => `${clamp(v, 0.5, 1) * -10}%`);

  // Bg-3 variables
  const y3 = useTransform(scrollYProgress5, (v) => `${(1 - v) * 100}%`);

  return (
    <>
      {/* Bg-2 */}
      <motion.div
        key="nature-based-background-2"
        className="fixed top-0 left-0 z-0 h-[140%] w-full"
      >
        <motion.div
          key="nature-based-background-img-2"
          className="absolute z-0 h-full w-full overflow-hidden"
          style={{
            x: imgX2,
            y: imgY2,
          }}
        >
          <div className="absolute top-0 left-0 h-full w-full bg-black/25" />
          <Image
            src="/images/stories/argentina-gran-chaco/granchaco-2.jpg"
            alt="Gran Chaco - cow"
            width={2400}
            height={1600}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Bg-3 */}
      <motion.div
        key="nature-based-background-3"
        className="fixed top-0 left-0 z-0 h-full w-full translate-y-full"
        style={{
          y: y3,
        }}
      >
        <motion.div
          key="nature-based-background-img-1"
          className="absolute z-0 h-full w-full overflow-hidden"
        >
          <div className="absolute top-0 left-0 h-full w-full bg-black/50" />
          <Image
            src="/images/stories/argentina-gran-chaco/granchaco-3.jpg"
            alt="Gran Chaco - corn"
            width={2400}
            height={1600}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default NatureBasedBackground;
