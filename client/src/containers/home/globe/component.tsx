import { motion } from 'framer-motion';

import { STEP_DURATION } from 'containers/home/animations/constants';
import FadeY from 'containers/home/animations/fadeY';
import Wrapper from 'containers/wrapper';

const Globe = () => {
  return (
    <motion.section
      key="how"
      className="absolute flex h-full w-full items-center justify-center overflow-hidden pt-20 text-navy-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: STEP_DURATION * 0.5 }}
    >
      <Wrapper>
        <div className="grid grid-cols-12 items-center gap-20">
          <div className="col-span-6">
            <FadeY>
              <div className="space-y-10 xl:pl-20">
                <h2 className="font-display text-6xl">Globe do we feed the world?</h2>
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
              </div>
            </FadeY>
          </div>
          <div className="col-span-6">
            <video src="/videos/plant.m4v" muted autoPlay />
          </div>
        </div>
      </Wrapper>
    </motion.section>
  );
};

export default Globe;
