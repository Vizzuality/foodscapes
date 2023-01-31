import { useMemo } from 'react';

import { useAnimatedCounter } from 'hooks/animations';
import { useScrollDirection } from 'hooks/home';

import { STEP_DURATION } from 'containers/home/animations/constants';

export const useHomeCounter = (substep) => {
  const { direction } = useScrollDirection();

  const from = useMemo(() => {
    switch (substep) {
      case 0:
        return direction === 1 ? 0 : 68;
      case 1:
        return direction === 1 ? 100 : 19;
      case 2:
        return direction === 1 ? 68 : 0;
      default:
        return 0;
    }
  }, [substep, direction]);

  const to = useMemo(() => {
    switch (substep) {
      case 0:
        return 100;
      case 1:
        return 68;
      case 2:
        return 19;
      default:
        return 0;
    }
  }, [substep]);

  const counter = useAnimatedCounter(from, to, STEP_DURATION * 2, (v) => parseInt(v.toFixed(0)));

  return counter;
};
