import { useMemo } from 'react';

import { lastStepAtom, stepAtom } from 'store/home';

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import Wrapper from 'containers/wrapper';

const How = () => {
  const step = useRecoilValue(stepAtom);
  const lastStep = useRecoilValue(lastStepAtom);

  const variants = {
    initial: (direction: number) => ({
      opacity: 0,
      y: direction * 100,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      y: -direction * 100,
    }),
  };

  const direction = useMemo(() => {
    if (step < lastStep) {
      return -1;
    }

    if (step > lastStep) {
      return 1;
    }

    return 0;
  }, [step, lastStep]);

  return (
    <AnimatePresence custom={direction}>
      {step === 1 && (
        <motion.section
          key="how"
          className="absolute flex h-full w-full items-center justify-center overflow-hidden pt-20 text-navy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Wrapper>
            <div className="grid grid-cols-12 items-center">
              <motion.div
                className="col-span-6 space-y-10"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-6xl">How do we feed the world?</h2>
                <div className="space-y-4">
                  <p className="font-light">
                    The need for food is a universal constant, but how it’s produced is different
                    across the globe.
                  </p>
                  <p className="font-light">
                    To understand this, let’s explore the{' '}
                    <strong className="font-semibold">production of soy.</strong>
                  </p>
                </div>
              </motion.div>
              <div className="col-span-6">
                <video src="/videos/plant.m4v" muted autoPlay />
              </div>
            </div>
          </Wrapper>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default How;
