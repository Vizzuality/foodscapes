import { useCallback, useMemo, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import useImagesPreloader from 'hooks/images-preloader';

import Button from '../button';
import { LAYERS } from '../constants';

const MANAGEMENT = 'management';
const PHYSICAL = 'physical';
const SOCIO = 'socio';

const LayersChart = () => {
  const [layerId, setLayerId] = useState('empty');

  const SELECTED = useMemo(() => {
    return LAYERS.filter((l) => l.id === layerId);
  }, [layerId]);

  const PRELOADED_IMAGES = useMemo(() => {
    return LAYERS.map((l) => l.imageUrl);
  }, []);

  useImagesPreloader(PRELOADED_IMAGES);

  const onClick = useCallback(
    (id) => {
      if (id === layerId) {
        return setLayerId('empty');
      }
      return setLayerId(id);
    },
    [layerId]
  );
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative aspect-square w-full">
        <Button
          theme="green"
          size="base"
          className="absolute top-[20%] left-0 z-10 uppercase"
          onClick={() => onClick(PHYSICAL)}
          selected={layerId === PHYSICAL}
          unselected={layerId !== 'empty' && layerId !== PHYSICAL}
        >
          Physical Geography
        </Button>
        <Button
          theme="yellow"
          size="base"
          className="absolute top-[12%] right-[10%] z-10 uppercase"
          onClick={() => onClick(SOCIO)}
          selected={layerId === SOCIO}
          unselected={layerId !== 'empty' && layerId !== SOCIO}
        >
          Socioeconomic Influence
        </Button>
        <Button
          theme="red"
          size="base"
          className="absolute bottom-[20%] left-[25%] uppercase"
          onClick={() => onClick(MANAGEMENT)}
          selected={layerId === MANAGEMENT}
          unselected={layerId !== 'empty' && layerId !== MANAGEMENT}
        >
          Management Patterns
        </Button>

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
                key={l.id}
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
