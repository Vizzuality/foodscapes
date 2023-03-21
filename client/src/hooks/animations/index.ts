import { useEffect, useRef, useState } from 'react';

import { animate } from 'framer-motion';

export const useAnimatedCounter = (
  from = 0,
  to: number = 100,
  duration = 1,
  format = (f) => f,
  enabled = true
) => {
  const controlsRef = useRef(null);
  const [counter, setCounter] = useState<number>(from);

  useEffect(() => {
    controlsRef.current = animate(from, to, {
      duration,
      onUpdate(value) {
        setCounter(value);
      },
    });

    return () => controlsRef.current.stop();
  }, [from, to, duration]);

  useEffect(() => {
    if (enabled) {
      controlsRef.current.play();
    } else {
      controlsRef.current.pause();
    }
  }, [enabled]);

  return format(counter);
};
