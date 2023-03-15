import { useRef } from 'react';

import Image from 'next/image';

import { motion, useScroll, useTransform } from 'framer-motion';

const IntroBackground = () => {
  const document = typeof window !== 'undefined' ? window.document : null;
  const ref = useRef(document?.getElementById('scroll-3'));
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 0', '0.5 0'],
  });

  const x = useTransform(scrollYProgress, (v) => `${(1 - v) * 100}%`);

  return (
    <motion.div
      key="background"
      className="fixed z-0 h-full w-full overflow-hidden object-cover"
      style={{
        x,
      }}
    >
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
