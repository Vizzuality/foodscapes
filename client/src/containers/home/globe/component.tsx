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
                <h2 className="font-display text-5xl">Why think of soy in foodscapes?</h2>
                <div className="space-y-4">
                  <p className="font-light">
                    Mapping and analyzing foodscapes reveal the{' '}
                    <strong className="font-semibold">
                      food system transitions needed to meet this century’s most pressing challenges
                    </strong>
                    : the threats posed by the climate crisis, biodiversity loss, and increased
                    demand for the integrity of the global food system.
                  </p>
                </div>
              </div>
            </FadeY>
          </div>
          <div className="col-span-6">
            <div className="relative aspect-square w-full rounded-full bg-navy-500" />
          </div>
        </div>
      </Wrapper>
    </motion.section>
  );
};

export default Globe;
