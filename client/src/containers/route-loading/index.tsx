import React from 'react';

import cx from 'classnames';

import { useNProgress } from '@tanem/react-nprogress';
import { AnimatePresence, motion } from 'framer-motion';

export interface RouteLoadingProps {
  loading?: boolean;
}

export const RouteLoading: React.FC<RouteLoadingProps> = ({ loading }: RouteLoadingProps) => {
  const { isFinished, progress } = useNProgress({
    isAnimating: loading,
  });

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cx({
            'pointer-events-none fixed z-50 h-full w-full': true,
          })}
        >
          <div
            className={cx({
              'absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-navy-400 to-navy-500 transition-transform lg:h-1':
                true,
            })}
            style={{
              transform: `translateX(${-100 + progress * 100}%)`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteLoading;
