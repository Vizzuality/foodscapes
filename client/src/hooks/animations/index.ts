import { useEffect, useState } from 'react';

import { animate, transform, useMotionValueEvent } from 'framer-motion';

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

export const useScrollCounter = (
  from = 0,
  to: number = 100,
  offsets = [0, 1],
  scrollMotionValue = null,
  format = (f) => f
) => {
  const [min, max] = offsets;
  const [progress, setProgress] = useState<number>(0);
  const transformer = transform([0, max - min], [from, to]);

  useMotionValueEvent(scrollMotionValue, 'change', (value: number) => {
    if (value < min) {
      setProgress(0);
    }

    if (value >= min && value <= max) {
      setProgress(transformer(value - min));
    }

    if (value > max) {
      setProgress(1);
    }
  });

  return format(transformer(progress));
};
