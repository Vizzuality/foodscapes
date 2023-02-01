import { stepAtom } from 'store/home';

import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { useScrollDirection } from 'hooks/home';

import { STEP_DURATION } from 'containers/home/animations/constants';
import { useHomeCounter } from 'containers/home/animations/hooks';

const Charts = () => {
  const { direction } = useScrollDirection();
  const stepStart = 2;
  const step = useRecoilValue(stepAtom);
  const substep = Math.min(Math.max(step - stepStart, 0), 2);

  const counter = useHomeCounter(step - stepStart);

  const variants = {
    initial: (d) => ({
      x: d === 1 ? 0 : `${(0.5 - 0.19 / 2) * 100}%`,
      y: d === 1 ? 0 : `${(-0.5 + 0.19 / 2) * 100}%`,
    }),
    step0: { x: 0, y: 0 },
    step1: { x: 0, y: 0 },
    step2: {
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
      backgroundColor: '#B7F08B',
      scale: 0.68,
      color: '#1C274A',
    },
    step1: {
      opacity: 1,
      borderColor: '#F0A38B',
      backgroundColor: '#F0A38B',
      scale: 0.19,
      color: '#1C274A',
    },
    step2: {
      opacity: 1,
      borderColor: '#F0A38B',
      backgroundColor: '#F0A38B',
      scale: 0.19,
      color: '#1C274A',
    },
  };

  const borderVariants = {
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
      opacity: 0,
      borderColor: '#F0A38B',
      scale: 0.19,
    },
  };

  const numberVariants = {
    initial: { color: '#fff' },
    step0: { color: '#fff' },
    step1: { color: '#1C274A' },
    step2: { color: '#1C274A' },
  };

  return (
    <motion.div
      className="absolute top-0 left-0 z-0 flex h-full w-full items-center justify-center rounded-full font-display text-4xl"
      variants={variants}
      initial="initial"
      animate={`step${substep}`}
      transition={{ duration: STEP_DURATION * 2 }}
      custom={direction}
    >
      <motion.div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-full border-2 border-navy"
        variants={borderVariants}
        initial="initial"
        animate={`step${substep}`}
        transition={{ duration: STEP_DURATION * 2 }}
        custom={direction}
      />
      <motion.div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-full border-2"
        variants={bgVariants}
        initial="initial"
        animate={`step${substep}`}
        transition={{ duration: STEP_DURATION * 2 }}
        custom={direction}
      />
      <motion.div
        className="relative z-10"
        variants={numberVariants}
        initial="initial"
        animate={`step${substep}`}
        transition={{ duration: STEP_DURATION * 2 }}
      >
        {`${counter}%`}
      </motion.div>
    </motion.div>
  );
};

export default Charts;
