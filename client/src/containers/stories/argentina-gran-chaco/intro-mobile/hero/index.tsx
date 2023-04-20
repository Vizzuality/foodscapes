import { clamp, useScrollItem } from 'lib/scroll';

import { motion, useTransform } from 'framer-motion';

import Wrapper from 'containers/wrapper';

const HeroMobile = () => {
  const { scrollYProgress } = useScrollItem('scroll-0');

  const opacity = useTransform(scrollYProgress, (v) => 1 - clamp(v * 2));

  return (
    <section className="relative z-20 h-[100vh] lg:h-[200vh]">
      <div className="left-0 top-0 z-10 flex h-full w-full items-end lg:fixed">
        <Wrapper>
          <motion.div className="grid grid-cols-12 items-end gap-6 pb-20" style={{ opacity }}>
            <div className="col-span-12 lg:col-span-5 lg:col-start-7">
              <div className="flex flex-col items-end space-y-5 text-right text-white">
                <h1 className="max-w-xs font-display text-4xl lg:max-w-none lg:text-5xl">
                  Foodscapes in action.
                </h1>
                <motion.p
                  className="overflow-hidden font-semibold"
                  initial={{ opacity: 0, y: 100, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  transition={{ delay: 0.5, duration: 0.75 }}
                >
                  The Gran Chaco is a large region across South America, known for its high endemic
                  biodiversity. The region has long accommodated a diversity of uses, such as
                  hunting, grazing, and crop production. The Gran Chaco region of Argentina
                  allocates 58% of its croplands to produce soy.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </Wrapper>
      </div>
    </section>
  );
};

export default HeroMobile;
