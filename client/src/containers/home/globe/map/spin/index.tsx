import { useCallback, useEffect, useRef } from 'react';

import { useMap } from 'react-map-gl';

export interface SpinContainerProps {
  enabled: boolean;
}

const SpinContainer = ({ enabled }: SpinContainerProps) => {
  const animationFrame = useRef<number>();
  const { current: map } = useMap();
  const DURATION = 120;

  const spin = useCallback(() => {
    const distancePerSecond = 360 / DURATION;
    const center = map.getCenter();
    center.lng += distancePerSecond;

    map.easeTo({ center, duration: 1000, easing: (n) => n });

    animationFrame.current = requestAnimationFrame(spin);
  }, [map]);

  useEffect(() => {
    if (!enabled) {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      return;
    }

    spin();
  }, [enabled, spin]);

  return null;
};

export default SpinContainer;
