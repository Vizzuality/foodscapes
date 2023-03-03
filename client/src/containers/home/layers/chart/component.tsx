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

  useImagesPreloader(PRELOADED_IMAGES);

  return (
    <div className="flex h-full flex-col items-center justify-center">
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
    </div>
  );
};

export default LayersChart;
