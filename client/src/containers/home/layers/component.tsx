import { useCallback, useMemo, useState } from 'react';

import cn from 'lib/classnames';

import { AnimatePresence, motion } from 'framer-motion';

import useImagesPreloader from 'hooks/images-preloader';

import { STEP_DURATION } from 'containers/home/animations/constants';
import FadeY from 'containers/home/animations/fadeY';
import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

import Button from './button';
import { LAYERS } from './constants';

const MANAGEMENT = 'management';
const PHYSICAL = 'physical';
const SOCIO = 'socio';

const Layers = () => {
  const [layerId, setLayerId] = useState('empty');

  const LAYER = useMemo(() => {
    const layer = LAYERS.find((l) => l.id === layerId);
    return layer;
  }, [layerId]);

  const FILTERED_LAYERS = useMemo(() => {
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
    <motion.section
      key="layers"
      className="absolute flex h-full w-full items-center justify-center overflow-hidden pt-20 text-navy"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: STEP_DURATION * 0.5 }}
    >
      <Wrapper>
        <div className="grid h-small-screen grid-cols-12 gap-20">
          <div
            className={cn({
              'relative col-span-5': true,
              'before:absolute before:top-0 before:right-full before:h-full before:w-[50vw]': true,
              [LAYER.backgroundColor]: true,
            })}
          >
            <FadeY className="h-full">
              <AnimatePresence>
                <motion.div
                  key={LAYER.id}
                  className="flex h-full flex-col justify-center space-y-10 pr-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: 'linear',
                    duration: 0.1,
                  }}
                >
                  <h3 className="font-display text-5xl">{LAYER.title}</h3>
                  <>{LAYER.content}</>
                </motion.div>
              </AnimatePresence>
            </FadeY>

            <button className="absolute bottom-20 mx-auto mb-5 flex flex-col items-center space-y-4 rounded-full">
              <Icon icon={ARROW_DOWN_SVG} className="h-4 w-4 animate-bounce" />
            </button>
          </div>

          <div className="col-span-7 flex flex-col items-center justify-center">
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

                {FILTERED_LAYERS.map((l) => {
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
        </div>
      </Wrapper>
    </motion.section>
  );
};

export default Layers;
