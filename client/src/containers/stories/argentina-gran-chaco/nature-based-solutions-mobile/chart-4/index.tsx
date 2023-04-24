import { motion } from 'framer-motion';

import { useAnimatedCounter } from 'hooks/animations';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const Chart4Mobile = () => {
  const counter = useAnimatedCounter(0, 8.2, 1, (v) => `${v.toFixed(1)} M Ha`, true);

  return (
    <section className="relative z-20">
      <div className="sticky top-0 left-0 z-10 flex min-h-screen w-full items-center">
        <Wrapper>
          <div className="flex flex-col space-y-8">
            <div className="space-y-5 text-white">
              <FadeYScroll>
                <h1 className="font-display text-4xl">From local to global.</h1>
              </FadeYScroll>
              <FadeYScroll>
                <p className="font-semibold">
                  Vital for many aspects of the food system, soy is no stranger to recognition. But
                  it comes with a downside, such as land conversion and deforestation. It replaced
                  8.2 million hectares between 2001-2015 globally, of which 7.9 million hectares of
                  conversion occurred in South America. Although a resilient crop, even it feels the
                  effects of the climate crisis. To ensure the security of global yields while
                  reducing their negative impacts, action must be taken.
                </p>
              </FadeYScroll>
            </div>

            <FadeYScroll>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.125, delay: 0.5 }}
                className="flex flex-col text-white"
              >
                <div>
                  <h2 className="font-display text-5xl">{counter}</h2>
                  <h3 className="max-w-[200px] text-xxs font-bold uppercase">
                    deforested land by soy globally
                  </h3>
                </div>
              </motion.div>
            </FadeYScroll>
          </div>
        </Wrapper>
      </div>
    </section>
  );
};

export default Chart4Mobile;
