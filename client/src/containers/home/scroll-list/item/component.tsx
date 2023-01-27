import { useEffect, useRef } from 'react';

import { useInView } from 'framer-motion';

export interface ScrollItemProps {
  id: number;
  onChange: (id: number) => void;
}

const ScrollItem = ({ id, onChange }: ScrollItemProps) => {
  const ref = useRef();
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      onChange(id);
    }
  }, [id, isInView, onChange]);

  return (
    <div
      id={`scroll-${id}`}
      ref={ref}
      className="pointer-events-none relative h-small-screen w-full snap-start snap-always"
    />
  );
};

export default ScrollItem;
