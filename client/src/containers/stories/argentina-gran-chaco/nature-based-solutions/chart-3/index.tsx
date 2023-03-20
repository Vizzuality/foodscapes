import { useScrollItem } from 'lib/scroll';

import { motion, useTransform } from 'framer-motion';

import { useScrollCounter } from 'hooks/animations';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const Chart3 = () => {
  const { scrollYProgress: scrollYProgress6 } = useScrollItem('scroll-6');
  const min = 0.25;
  const max = 1;
  const counter = useScrollCounter(0, 1.4, [min, max], scrollYProgress6);

  const opacity = useTransform(scrollYProgress6, (v) => {
    if (v < min) {
      return 0;
    }
    if (v > max * 0.5) {
      return 1;
    }

    return (v - min) / (max * 0.5 - min);
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
                  style={{
                    opacity,
                  }}
                >
                  <h2 className="font-display text-6xl">{`${counter.toFixed(1)} M Ha`}</h2>
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
