import { useEffect, useState } from 'react';

import { animate } from 'framer-motion';

export const useAnimatedCounter = (from = 0, to: number = 100, duration = 1, format = (f) => f) => {
  const [counter, setCounter] = useState<number>(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        setCounter(value);
      },
    });
    return () => controls.stop();
  }, [from, to, duration]);

  return format(counter);
};
