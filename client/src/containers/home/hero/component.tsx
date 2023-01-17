import { useMemo } from 'react';

import { motion } from 'framer-motion';
import { useWindowSize } from 'usehooks-ts';

// const BACKGROUNDS = ['url(/images/avatar.png)', null, null, null, null, null, null, null];

const Hero = () => {
  const { width, height } = useWindowSize();

  const ITEMS = useMemo(() => {
    const w = width || 1;
    const h = height || 1;
    const SIZE = height / 3;
    const COUNT = Math.ceil((w / h) * 5 * 3);

    return [...Array(COUNT)].map((_, i) => {
      const random = Math.random();

      // const bg = BACKGROUNDS[Math.floor(random * BACKGROUNDS.length)];

      return (
        <div
          key={i}
          className="relative"
          style={{
            width: SIZE,
            height: SIZE,
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 5 + random * 5,
              repeatType: 'reverse',
              delay: random * 10,
            }}
            className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundColor: `hsl(${Math.floor(random * 360)}, 100%, 50%)`,
            }}
          />
        </div>
      );
    });
  }, [width, height]);

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center">
        <h1 className="text-8xl">Foodscapes</h1>
        <h2 className="uppercase">Accelerating a global food system transfomation</h2>
      </div>

      <div className="absolute top-0 -left-1/4 z-0 h-full w-[150%]">
        <div className="flex h-full flex-wrap items-center justify-center">
          {/* Create an array of 15 eelement and loop over it */}
          {ITEMS}
        </div>
      </div>
    </section>
  );
};

export default Hero;
