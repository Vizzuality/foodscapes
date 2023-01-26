import { useCallback } from 'react';

import cn from 'lib/classnames';

import { motion } from 'framer-motion';

import Button from 'components/button';
import Icon from 'components/icon';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

import { LAYERS } from './constants';

const Layers = () => {
  const onClick = useCallback((id) => {
    const layer = LAYERS.find((l) => l.id === id);
    return layer;
  }, []);

  return (
    <>
      {LAYERS.map((layer) => (
        <div className="grid h-small-screen grid-cols-2" key={layer.id}>
          <div
            className={cn({
              'flex flex-col content-between justify-center space-y-4 pr-16 pl-36 pt-44': true,
              [layer.backgroundColor]: true,
            })}
          >
            <h3 className="text-4xl">{layer.title}</h3>
            <p>{layer.description}</p>
            <p className="font-semibold">{layer.info}</p>
            <p>{layer.source}</p>
            <Icon icon={ARROW_DOWN_SVG} className="h-5 w-5" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative h-2/3 w-2/3">
              <Button
                theme="primary"
                size="base"
                className="absolute top-1/4 left-28 z-10 uppercase"
                onClick={() => onClick('physical')}
              >
                Physical Geography
              </Button>
              <Button
                theme="secondary"
                size="base"
                className="absolute top-16 right-1/4 z-10 uppercase"
                onClick={() => onClick('socio')}
              >
                Socioeconomic Influence
              </Button>
              <motion.div
                animate={{ x: 50 }}
                transition={{ delay: 1 }}
                className="h-full w-full bg-cover"
                style={{
                  backgroundImage: layer.imageUrl,
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed',
                }}
              />
              <Button
                theme="primary-alt"
                size="base"
                className="absolute bottom-28 left-1/2 uppercase"
                onClick={() => onClick('management')}
              >
                Management Patterns
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Layers;
