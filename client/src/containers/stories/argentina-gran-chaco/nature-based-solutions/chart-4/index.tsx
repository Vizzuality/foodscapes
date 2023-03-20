import { useScrollItem } from 'lib/scroll';

import { motion, useTransform } from 'framer-motion';

import { useScrollCounter } from 'hooks/animations';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const Chart4 = () => {
  const { scrollYProgress: scrollYProgress7 } = useScrollItem('scroll-7');
  const min = 0.25;
  const max = 1;
  const counter = useScrollCounter(0, 8.2, [min, max], scrollYProgress7);

  const opacity = useTransform(scrollYProgress7, (v) => {
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
          <div className="grid grid-cols-12 items-center gap-6 pb-10">
            <div className="col-span-4 col-start-2">
              <motion.div
                style={{
                  opacity,
                }}
              >
                <h2 className="font-display text-6xl">{`${counter.toFixed(1)} M Ha`}</h2>
              </motion.div>
            </div>

            <div className="col-span-4 col-start-8">
              <div className="space-y-5 text-white">
                <FadeYScroll>
                  <h1 className="font-display text-4xl">From local to global.</h1>
                </FadeYScroll>
                <FadeYScroll>
                  <p className="font-semibold">
                    Vital for many aspects of the food system, soy is no stranger to recognition.
                    But it comes with a downside, such as land conversion and deforestation. It
                    replaced 8.2 million hectares between 2001-2015 globally, of which 7.9 million
                    hectares of conversion occurred in South America. Although a resilient crop,
                    even it feels the effects of the climate crisis. To ensure the security of
                    global yields while reducing their negative impacts, action must be taken.
                  </p>
                </FadeYScroll>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </section>
  );
};

export default Chart4;
