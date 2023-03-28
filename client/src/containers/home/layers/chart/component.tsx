import { useMemo } from 'react';

import { stepAtom } from 'store/home';

import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import useImagesPreloader from 'hooks/images-preloader';

const LAYERS = [
  {
    step: 0,
    imageUrl: '/images/layers/empty.png',
  },
  {
    step: 1,
    imageUrl: '/images/layers/physical.png',
  },
  {
    step: 2,
    imageUrl: '/images/layers/management.png',
  },
  {
    step: 3,
    imageUrl: '/images/layers/socio.png',
  },
  {
    step: 4,
    imageUrl: '/images/layers/all.png',
  },
];

export interface LayersChartProps {
  initialStep: number;
}

const LayersChart = ({ initialStep }: LayersChartProps) => {
  const step = useRecoilValue(stepAtom);

  const SELECTED = useMemo(() => {
    return LAYERS.filter((l) => l.step === step - initialStep);
  }, [initialStep, step]);

  const PRELOADED_IMAGES = useMemo(() => {
    return LAYERS.map((l) => l.imageUrl);
  }, []);

  const ANIMATE = useMemo(() => {
    console.log({ step });
    if (step - initialStep < 0 || step - initialStep > LAYERS.length - 1)
      return {
        opacity: 0,
      };
    return {
      opacity: 1,
    };
  }, [initialStep, step]);

  useImagesPreloader(PRELOADED_IMAGES);

  return (
    <motion.div
      className="absolute z-10 flex h-full w-full scale-125 flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={ANIMATE}
    >
      <div className="relative aspect-square w-full">
        <AnimatePresence>
          <motion.div
            key="empty-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: 'linear',
              duration: 0.5,
            }}
            className="absolute h-full w-full bg-no-repeat"
            style={{
              backgroundImage: `url(${LAYERS[0].imageUrl})`,
              backgroundSize: '100% auto',
            }}
          />

          {SELECTED.map((l) => {
            return (
              <motion.div
                key={l.step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: 'linear',
                  duration: 0.5,
                }}
                className="absolute h-full w-full bg-no-repeat"
                style={{
                  backgroundImage: `url(${l.imageUrl})`,
                  backgroundSize: '100% auto',
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LayersChart;
