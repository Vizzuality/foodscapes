import { stepAtom } from 'store/home';

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

const Globe = () => {
  const step = useRecoilValue(stepAtom);

  return (
    <AnimatePresence>
      {step === 1 && (
        <motion.section
          key="globe"
          className="absolute flex h-full w-full items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Globe
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Globe;
