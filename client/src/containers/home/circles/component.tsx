import { motion } from 'framer-motion';

import { useScrollDirection } from 'hooks/home';

import Wrapper from 'containers/wrapper';

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
            <h2 className="font-display text-3xl">In 2010</h2>
            <div className="space-y-4">
              <p className="font-light">
                More than <strong className="font-semibold">240 million tons of soy</strong> was
                produced across nearly all 83 different foodscapes. Of that, almost{' '}
                <strong className="font-semibold">
                  68% comes from intensive production systems
                </strong>
                , where field size is large and agricultural inputs are high.
              </p>
            </div>
          </motion.div>
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
