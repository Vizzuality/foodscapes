import { useMemo, useRef, useState } from 'react';

import { stepAtom } from 'store/home';

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { useWindowSize, useInterval } from 'usehooks-ts';

import Icon from 'components/icon';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

const BACKGROUNDS = [
  'url(/images/hero/home1.jpg)',
  'url(/images/hero/home2.jpg)',
  'url(/images/hero/home3.jpg)',
  'url(/images/hero/home4.jpg)',
  'url(/images/hero/home5.jpg)',
  'url(/images/hero/home6.jpg)',
  'url(/images/hero/home7.jpg)',
  'url(/images/hero/home8.jpg)',
  'url(/images/hero/home9.jpg)',
  'url(/images/hero/home10.jpg)',
];

const Hero = () => {
  const backgroundsRef = useRef<string[]>([]);
  const DURATION = 3;
  const TOTAL_DURATION = 12;

  const [count, setCount] = useState<number>(0);
  const { width, height } = useWindowSize();

  const step = useRecoilValue(stepAtom);
  const inView = step === 0;

  useInterval(
    () => {
      setCount(count + 1);
    },
    inView ? TOTAL_DURATION * 1000 : null
  );

  const randomImage = () => {
    const bg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

    if (backgroundsRef.current.includes(bg)) {
      return null;
    }

    backgroundsRef.current.push(bg);
    return bg;
  };

  const ITEMS = useMemo(() => {
    const w = width;
    const h = height;

    if (!w || !h) {
      return null;
    }

    const ROW_COUNT = 3;
    const SIZE = h / ROW_COUNT;
    const ITEMS_PER_ROW = Math.floor((w * 1.5) / SIZE);
    const COUNT = ITEMS_PER_ROW * ROW_COUNT;

    backgroundsRef.current = [];

    return [...Array(COUNT)].map((_, i) => {
      const random = Math.random();

      // Generate a random color for the background but keep it light
      const backgroundColor = `hsl(${Math.floor(random * 360)}, 100%, ${
        Math.floor(random * 50) + 50
      }%)`;

      const backgroundImage = randomImage();

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
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: DURATION,
              ease: 'linear',
              delay: random * (TOTAL_DURATION - DURATION),
            }}
            className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundColor,
              backgroundImage,
            }}
          />
        </div>
      );
    });
  }, [width, height, count]);

  return (
    <AnimatePresence>
      {inView && (
        <motion.section
          key="hero"
          className="absolute flex h-full w-full items-center justify-center overflow-hidden"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -100,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10 space-y-2 text-center">
            <h1 className="font-display text-9xl">Foodscapes</h1>
            <h2 className="text-xl font-bold uppercase tracking-widest">
              Accelerating a global food system transfomation
            </h2>
          </div>

          <div className="absolute top-0 -left-1/4 z-0 h-full w-[150%]">
            <div className="flex h-full flex-wrap items-center justify-center">
              {/* Create an array of 15 eelement and loop over it */}
              {ITEMS}
            </div>
          </div>

          <button className="absolute bottom-0 mx-auto mb-5 flex flex-col items-center space-y-4 rounded-full">
            <Icon icon={ARROW_DOWN_SVG} className="h-4 w-4 animate-bounce" />

            <span className="text-xxs font-bold uppercase">scroll to explore</span>
          </button>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Hero;
