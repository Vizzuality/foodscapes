import { stepAtom } from 'store/home';

import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { useHomeCounter } from 'containers/home/animations/hooks';

const Charts = () => {
  const stepStart = 2;
  const step = useRecoilValue(stepAtom);
  const substep = Math.min(Math.max(step - stepStart, 0), 3);

  const counter = useHomeCounter(substep);

  const bgVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    step0: {
      opacity: 1,
      borderColor: '#1C274A',
      backgroundColor: '#1C274A',
      scale: 1,
      color: '#fff',
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
  };

  const numberVariants = {
    initial: { color: '#fff' },
    step0: { color: '#fff' },
    step1: { color: '#1C274A' },
    step2: { color: '#1C274A' },
  };

  return (
    <motion.div className="absolute z-0 flex h-full w-full items-center justify-center rounded-full font-display text-4xl">
      <motion.div
        className="absolute z-0 h-full w-full rounded-full border-2"
        variants={bgVariants}
        initial="initial"
        animate={`step${substep}`}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="relative z-10"
        variants={numberVariants}
        initial="initial"
        animate={`step${substep}`}
      >
        {`${counter}%`}
      </motion.div>
    </motion.div>
  );
};

export default Charts;
