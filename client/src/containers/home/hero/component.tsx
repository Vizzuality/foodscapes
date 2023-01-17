import { useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import { useWindowSize, useInterval } from 'usehooks-ts';

// const BACKGROUNDS = ['url(/images/avatar.png)', null, null, null, null, null, null, null];

const Hero = () => {
  const [count, setCount] = useState<number>(0);
  const { width, height } = useWindowSize();

  useInterval(() => {
    setCount(count + 1);
  }, 2000);

  const ITEMS = useMemo(() => {
    const w = width || 1;
    const h = height || 1;
    const SIZE = h / 3;
    const COUNT = Math.ceil(((w * 1.5) / SIZE) * 3);
    const THRESHOLD = 0.75;

    return [...Array(COUNT)].map((_, i) => {
      const random = Math.random();
      const mid = Math.round(COUNT / 2) - 1;

      const visible = random > THRESHOLD && (i < mid - 1 || i > mid + 1);

      return (
        <div
          key={`${i}-${count}`}
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
              opacity: visible ? [0, 1, 1, 1, 0] : 0,
              backgroundColor: `hsl(${random * 360}, 100%, 50%)`,
            }}
            transition={{
              duration: 2,
              ease: 'linear',
            }}
            className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
          />
        </div>
      );
    });
  }, [width, height, count]);

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
