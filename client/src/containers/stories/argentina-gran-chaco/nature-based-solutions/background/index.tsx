import Image from 'next/image';

import { motion, useScroll, useTransform } from 'framer-motion';

import { useElementById } from 'hooks/utils';

const IntroBackground = () => {
  const ref3 = useElementById('scroll-3');
  const ref4 = useElementById('scroll-4');
  const ref6 = useElementById('scroll-6');

  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: ref3,
    offset: ['0 0', '0.5 0'],
  });

  const { scrollYProgress: scrollYProgress4 } = useScroll({
    target: ref4,
    offset: ['0 1', '1 0'],
  });

  const { scrollYProgress: scrollYProgress6 } = useScroll({
    target: ref6,
    offset: ['0 1', '1 1'],
  });

  // Bg-2 variables
  const y2 = useTransform(scrollYProgress6, (v) => `${v * -50}%`);
  const imgX2 = useTransform(scrollYProgress3, (v) => `${(1 - v) * 100}%`);
  const imgY2 = useTransform(scrollYProgress4, (v) => `${v * -20}%`);

  // Bg-3 variables
  const y3 = useTransform(scrollYProgress6, (v) => `${(1 - v) * 100}%`);

  return (
    <>
      {/* Bg-2 */}
      <motion.div
        key="nature-based-background-2"
        className="fixed top-0 left-0 z-0 h-[140%] w-full"
        style={{
          y: y2,
        }}
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

export default IntroBackground;
