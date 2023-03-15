import { useRef } from 'react';

import Image from 'next/image';

import { motion, useScroll, useTransform } from 'framer-motion';

const IntroBackground = () => {
  const document = typeof window !== 'undefined' ? window.document : null;
  const ref3 = useRef(document?.getElementById('scroll-3'));
  const ref4 = useRef(document?.getElementById('scroll-4'));

  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: ref3,
    offset: ['0 0', '0.5 0'],
  });

  const { scrollYProgress: scrollYProgress4 } = useScroll({
    target: ref4,
    offset: ['0 1', '1 0'],
  });

  const x = useTransform(scrollYProgress3, (v) => `${(1 - v) * 100}%`);
  const y = useTransform(scrollYProgress4, (v) => `${v * -20}%`);

  return (
    <motion.div
      key="background"
      className="fixed z-0 h-[140%] w-full overflow-hidden object-cover"
      style={{
        x,
        y,
      }}
    >
      <div className="absolute top-0 left-0 h-full w-full bg-black/25" />
      <Image
        src="/images/stories/argentina-gran-chaco/granchaco-2.jpg"
        alt="Gran Chaco - cow"
        width={2400}
        height={1600}
      />
    </motion.div>
  );
};

export default IntroBackground;
