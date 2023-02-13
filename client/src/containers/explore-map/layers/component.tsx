import { useCallback } from 'react';

import cn from 'lib/classnames';

import { layersOpenAtom } from 'store/explore-map';

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import Basemaps from './basemaps';
import LayersGroup from './layers-group';

const Layers = () => {
  const layersOpen = useRecoilValue(layersOpenAtom);
  const setLayersOpen = useSetRecoilState(layersOpenAtom);

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const sidebarVariants = {
    initial: { x: '100%' },
    animate: {
      x: 0,
      transition: {
        duration: 0.25,
        delay: 0.125,
        ease: 'easeOut',
      },
    },
    exit: {
      x: '100%',
      transition: {
        duration: 0.25,
        delay: 0,
        ease: 'easeOut',
      },
    },
  };

  const handleClose = useCallback(() => {
    setLayersOpen(false);
  }, [setLayersOpen]);

  return (
    <AnimatePresence>
      {layersOpen && (
        <motion.div
          key="overlay"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={overlayVariants}
          className="absolute top-0 left-0 z-10 h-full w-full"
          onClick={handleClose}
        />
      )}

      {layersOpen && (
        <motion.div
          key="layers"
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 right-0 z-20 h-full min-w-[300px] bg-white shadow-lg"
          variants={sidebarVariants}
        >
          <div className="flex items-center justify-between p-6">
            <h2
              className={cn({
                'py-1 font-display text-2xl text-navy-500 transition-colors': true,
              })}
            >
              Map layers
            </h2>

            <button className="h-6 w-6 text-navy-500" onClick={handleClose}>
              <Icon icon={CLOSE_SVG} />
            </button>
          </div>

          <div className="space-y-8">
            <Basemaps />
            <LayersGroup name="Foodscapes" group="foodscapes" />
            <LayersGroup name="Risks" group="risks" />
            <LayersGroup name="Opportunities" group="opportunities" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Layers;
