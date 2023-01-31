import { motion } from 'framer-motion';

import { useScrollDirection } from 'hooks/home';

import Wrapper from 'containers/wrapper';

import Texts from './texts';

const Circles = () => {
  const { direction } = useScrollDirection();

  const variants = {
    initial: (d: number) => ({
      opacity: 0,
      y: d * 100,
    }),
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: (d: number) => ({
      opacity: 0,
      y: -d * 100,
    }),
  };

  return (
    <motion.section
      key="how"
      className="absolute flex h-full w-full items-center justify-center overflow-hidden pt-20 text-navy"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        <div className="grid w-full grid-cols-12 items-center gap-20">
          <div className="relative col-span-6 h-full">
            <Texts />
          </div>

          <div className="col-span-6">
            <motion.div
              className="relative aspect-square w-full rounded-full bg-navy"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </Wrapper>
    </motion.section>
  );
};

export default Circles;
