import { motion } from 'framer-motion';

import Wrapper from 'containers/wrapper';

const Outro = () => {
  return (
    <section className="relative z-20">
      <Wrapper>
        <motion.div className="grid min-h-screen grid-cols-12 items-center gap-6 pb-10">
          <div className="col-span-6 col-start-4">
            <div className="space-y-5 text-center text-white">
              <p className="font-semibold">
                To guide that action, we can take inspiration from the nature-based solutions that
                would work in the Gran Chaco region and extrapolate these to similar foodscapes
                worldwide.
              </p>
              <p className="font-semibold">
                Extrapolating possible nature-based solutions should be done with care, as unique
                contexts will influence the viability and potential of solutions. However, the
                example of Soy in Gran Chaco offers a place to start and explore further.
              </p>
            </div>
          </div>
        </motion.div>
      </Wrapper>
    </section>
  );
};

export default Outro;
