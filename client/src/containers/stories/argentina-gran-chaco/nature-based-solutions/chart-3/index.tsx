import { useState } from 'react';

import { useScrollItem } from 'lib/scroll';

import { motion, useMotionValueEvent } from 'framer-motion';

import { useAnimatedCounter } from 'hooks/animations';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const Chart3 = () => {
  const [enabled, setEnabled] = useState(false);
  const { scrollYProgress: scrollYProgress6 } = useScrollItem('scroll-6');
  const threshold = 0.25;

  const counter = useAnimatedCounter(0, 1.4, 1, (v) => `${v.toFixed(1)} M Ha`, enabled);

  useMotionValueEvent(scrollYProgress6, 'change', (v) => {
    if (v > threshold) {
      return setEnabled(true);
    }

    return setEnabled(false);
  });

  return (
    <section className="relative z-20 h-[300vh]">
      <div className="sticky top-0 left-0 z-10 flex min-h-screen w-full items-center">
        <Wrapper>
          <div className="grid grid-cols-12 items-center gap-6 pt-24">
            <div className="col-span-4 col-start-2">
              <div className="space-y-5 text-white">
                <FadeYScroll>
                  <h3 className="font-semibold uppercase">NATURE-BASED SOLUTIONS</h3>
                </FadeYScroll>
                <FadeYScroll>
                  <h1 className="font-display text-4xl">Are locally viable.</h1>
                </FadeYScroll>
                <FadeYScroll>
                  <p className="font-semibold">
                    Nature-based solutions could positively impact one tenth of the Argentinian Gran
                    Chaco, as 1.4M Ha of land is suitable for agrosilvopastoral techniques. Of that
                    area, the majority of opportunity is in the foodscape that produces the majority
                    of soy.
                  </p>
                </FadeYScroll>
                <FadeYScroll>
                  <p>
                    Not only would it bring financial prosperity to these farms, these techniques
                    help make the agricultural area more resilient to climate change impacts while
                    contributing positively to wider environmental issues, such as reducing carbon
                    emissions and biodiversity loss.
                  </p>
                </FadeYScroll>
              </div>
            </div>

            <div className="col-span-4 col-start-8 flex justify-center">
              <FadeYScroll>
                <motion.div
                  initial="hidden"
                  animate={enabled ? 'visible' : 'hidden'}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  className="flex flex-col items-center"
                >
                  <div>
                    <h2 className="font-display text-6xl">{counter}</h2>
                    <h3 className="max-w-[200px] text-xxs font-bold uppercase">
                      of land suitable for agrosilvopastoral techniques
                    </h3>
                  </div>
                </motion.div>
              </FadeYScroll>
            </div>
          </div>
        </Wrapper>
      </div>
    </section>
  );
};

export default Chart3;
