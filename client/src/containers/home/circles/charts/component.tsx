import { useMemo } from 'react';

import { stepAtom } from 'store/home';

import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { useScrollDirection } from 'hooks/home';

import { STEP_DURATION } from 'containers/home/animations/constants';
import { useSoyCounter, useSoyFavoredCounter } from 'containers/home/animations/hooks';

export interface ChartsProps {
  initialStep: number;
  currentStep?: number;
}

const Charts = ({ initialStep, currentStep }: ChartsProps) => {
  const { direction } = useScrollDirection();
  const step = useRecoilValue(stepAtom);
  const s = currentStep ?? step;
  const substep = s - initialStep;

  const soyCounter = useSoyCounter(s - initialStep);
  const soyFavoredCounter = useSoyFavoredCounter(s - initialStep);

  const ANIMATE = useMemo(() => {
    if (s - initialStep < 0)
      return {
        scale: 0,
        opacity: 0,
      };
    return {
      scale: 1,
      opacity: 1,
    };
  }, [initialStep, s]);

  const variants = {
    initial: (d) => ({
      x: d === 1 ? 0 : `${(0.5 - 0.19 / 2) * 100}%`,
      y: d === 1 ? 0 : `${(-0.5 + 0.19 / 2) * 100}%`,
    }),
    step0: { x: 0, y: 0 },
    step1: { x: 0, y: 0 },
    step2: { x: 0, y: 0 },
    step3: {
      x: `${(0.5 - 0.19 / 2) * 100}%`,
      y: `${(-0.5 + 0.19 / 2) * 100}%`,
    },
  };

  const bgVariants = {
    initial: (d) => ({
      opacity: 0,
      scale: d === 1 ? 1 : 0.19,
      borderColor: d === 1 ? '#1C274A' : '#F0A38B',
      backgroundColor: d === 1 ? '#1C274A' : '#F0A38B',
      color: d === 1 ? '#fff' : '#1C274A',
    }),
    step0: {
      opacity: 1,
      borderColor: '#1C274A',
      backgroundColor: '#1C274A',
      scale: 1,
      color: '#FFF',
    },
    step1: {
      opacity: 1,
      borderColor: '#1C274A',
      backgroundColor: '#B7F08B',
      scale: 0.68,
      color: '#1C274A',
    },
    step2: {
      opacity: 1,
      borderColor: '#F0A38B',
      backgroundColor: '#F0A38B',
      scale: 0.19,
      color: '#1C274A',
    },
    step3: {
      opacity: 1,
      borderColor: '#F0A38B',
      backgroundColor: '#F0A38B',
      scale: 0.19,
      color: '#1C274A',
    },
  };

  const border1Variants = {
    initial: (d) => ({
      scale: d === 1 ? 1 : 0.19,
      borderColor: d === 1 ? '#1C274A' : '#F0A38B',
    }),
    step0: {
      opacity: 1,
      borderColor: '#1C274A',
      scale: 1,
    },
    step1: {
      opacity: 1,
      borderColor: '#1C274A',
      scale: 1,
    },
    step2: {
      opacity: 1,
      borderColor: '#1C274A',
      scale: 1,
    },
    step3: {
      opacity: 0,
      borderColor: '#F0A38B',
      scale: 0.19,
    },
  };

  const border2Variants = {
    initial: (d) => ({
      scale: d === 1 ? 1 : 0.19,
      borderColor: d === 1 ? '#1C274A' : '#F0A38B',
    }),
    step0: {
      opacity: 1,
      borderColor: '#1C274A',
      scale: 1,
    },
    step1: {
      opacity: 1,
      borderColor: '#1C274A',
      scale: 0.68,
    },
    step2: {
      opacity: 1,
      borderColor: '#1C274A',
      scale: 0.68,
    },
    step3: {
      opacity: 0,
      borderColor: '#F0A38B',
      scale: 0.19,
    },
  };

  const labelVariants = {
    initial: { opacity: 0 },
    step0: { opacity: 0 },
    step1: { opacity: 0 },
    step2: { opacity: 0 },
    step3: { opacity: 1 },
  };

  const numberVariants = {
    initial: { color: '#fff', opacity: 0 },
    step0: { color: '#fff', opacity: 0 },
    step1: { color: '#fff', opacity: 1 },
    step2: { color: '#1C274A', opacity: 1 },
    step3: { color: '#1C274A', opacity: 1 },
  };

  const bgYellowVariants = {
    initial: { opacity: 0, scale: 0 },
    step0: { opacity: 0, scale: 0 },
    step1: { opacity: 0, scale: 0 },
    step2: { opacity: 0, scale: 0 },
    step3: { opacity: 1, scale: 0.68 },
  };

  const numberYellowVariants = {
    initial: { opacity: 0 },
    step0: { opacity: 0 },
    step1: { opacity: 0 },
    step2: { opacity: 0 },
    step3: { opacity: 1 },
  };

  return (
    <motion.div
      className="relative z-0 flex w-full items-center justify-center pt-20 lg:h-full lg:pt-0"
      initial={{ opacity: 0 }}
      animate={ANIMATE}
      transition={{ duration: STEP_DURATION }}
    >
      <div className="relative aspect-square w-full rounded-full">
        {/* CIRCLE and NUMBER */}
        <motion.div
          className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center rounded-full"
          variants={variants}
          initial="initial"
          animate={`step${substep}`}
          transition={{ duration: STEP_DURATION }}
          custom={direction}
        >
          <motion.div
            className="absolute top-0 left-0 z-0 h-full w-full rounded-full border-2 border-navy-500"
            variants={border1Variants}
            initial="initial"
            animate={`step${substep}`}
            transition={{ duration: STEP_DURATION }}
            custom={direction}
          />

          <motion.div
            className="absolute top-0 left-0 z-0 h-full w-full rounded-full border-2 border-navy-500"
            variants={border2Variants}
            initial="initial"
            animate={`step${substep}`}
            transition={{ duration: STEP_DURATION }}
            custom={direction}
          />

          <motion.div
            className="absolute top-0 left-0 z-0 h-full w-full rounded-full border-2"
            variants={bgVariants}
            initial="initial"
            animate={`step${substep}`}
            transition={{ duration: STEP_DURATION }}
            custom={direction}
          />

          <motion.div
            className="relative z-10 font-display text-4xl"
            variants={numberVariants}
            initial="initial"
            animate={`step${substep}`}
            transition={{ duration: STEP_DURATION }}
          >
            {`${soyCounter}%`}
          </motion.div>

          <motion.div
            variants={labelVariants}
            initial="initial"
            animate={`step${substep}`}
            transition={{ duration: STEP_DURATION * 0.5 }}
            className="absolute z-10 flex h-full w-full -translate-y-[9.5%] items-center justify-center text-navy-500"
          >
            <div className="-mt-10 font-semibold">Soy production</div>
          </motion.div>
        </motion.div>

        {/* YELLOW CIRCLE and NUMBER */}
        <div className="absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center rounded-full">
          <motion.div
            className="absolute top-0 left-0 z-0 h-full w-full rounded-full bg-yellow-500 bg-contain"
            variants={bgYellowVariants}
            initial="initial"
            animate={`step${substep}`}
            transition={{ duration: STEP_DURATION }}
            style={{
              backgroundImage: `url('/images/layers/globe-distributed-foodscape.png')`,
            }}
            custom={direction}
          />

          <motion.div
            className="relative z-10 font-display text-4xl text-navy-500"
            variants={numberYellowVariants}
            initial="initial"
            animate={`step${substep}`}
            transition={{ duration: STEP_DURATION }}
          >
            {`${soyFavoredCounter}%`}
          </motion.div>

          <motion.div
            variants={labelVariants}
            initial="initial"
            animate={`step${substep}`}
            transition={{ duration: STEP_DURATION * 0.5 }}
            className="absolute z-10 flex h-full w-full translate-y-[34%] items-center justify-center text-navy-500"
          >
            <div className="mt-10 font-semibold">Soy distribution</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Charts;
