import { useCallback, useMemo, useState } from 'react';

import cn from 'lib/classnames';

import { motion } from 'framer-motion';

import useImagesPreloader from 'hooks/images-preloader';

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

  useImagesPreloader(LAYERS.map((l) => l.imageUrl));

  const onClick = useCallback((id) => {
    return setLayerId(id);
  }, []);

  return (
    <Wrapper>
      <div className="grid h-small-screen grid-cols-12 gap-0" key={LAYER.id}>
        <div
          className={cn({
            'relative col-span-5': true,
            'before:absolute before:top-0 before:right-full before:h-full before:w-[50vw]': true,
            [LAYER.backgroundColor]: true,
          })}
        >
          <motion.div
            className="bg-red flex h-full flex-col justify-center space-y-4 pr-20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <h3 className="font-display text-5xl">{LAYER.title}</h3>
            <>{LAYER.content}</>
          </motion.div>
          <button className="absolute bottom-9 mx-auto mb-5 flex flex-col items-center space-y-4 rounded-full">
            <Icon icon={ARROW_DOWN_SVG} className="h-4 w-4 animate-bounce" />
          </button>
        </div>

        <div className="relative col-span-7 flex flex-col items-center justify-center">
          <Button
            theme="green"
            size="base"
            className="absolute top-52 left-0 z-10 uppercase"
            onClick={() => onClick(PHYSICAL)}
            disabled={layerId !== PHYSICAL}
          >
            Physical Geography
          </Button>
          <Button
            theme="yellow"
            size="base"
            className="absolute top-36 right-20 z-10 uppercase"
            onClick={() => onClick(SOCIO)}
            disabled={layerId !== SOCIO}
          >
            Socioeconomic Influence
          </Button>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              ease: 'anticipate',
              duration: 0.1,
            }}
            className="h-full w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${LAYER.imageUrl})`,
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          />
          <Button
            theme="red"
            size="base"
            className="absolute bottom-36 left-40 uppercase"
            onClick={() => onClick(MANAGEMENT)}
            disabled={layerId !== MANAGEMENT}
          >
            Management Patterns
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Layers;
