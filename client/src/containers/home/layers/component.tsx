import { useCallback, useState } from 'react';

import cn from 'lib/classnames';

import { motion } from 'framer-motion';

import Button from 'components/button';
import Icon from 'components/icon';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

import { LAYERS } from './constants';

const Layers = () => {
  const initialValues = LAYERS.find((l) => l.id === 'empty');
  const [layer, setLayer] = useState(initialValues);

  const onClick = useCallback((id) => {
    const newLayer = LAYERS.find((l) => l.id === id);
    return setLayer(newLayer);
  }, []);

  return (
    <>
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
          <button className="absolute bottom-0 mx-auto mb-5 flex flex-col items-center space-y-4 rounded-full">
            <Icon icon={ARROW_DOWN_SVG} className="h-4 w-4 animate-bounce" />
          </button>
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
              animate={{ x: 100 }}
              transition={{ type: 'spring', stiffness: 100 }}
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
    </>
  );
};

export default Layers;
