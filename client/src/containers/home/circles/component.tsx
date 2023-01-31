import { motion } from 'framer-motion';

import Wrapper from 'containers/wrapper';

import Charts from './charts';
import Texts from './texts';

const Circles = () => {
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
            <div className="relative aspect-square w-full rounded-full">
              <Charts />
            </div>
          </div>
        </div>
      </Wrapper>
    </motion.section>
  );
};

export default Circles;
