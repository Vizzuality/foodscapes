import { motion } from 'framer-motion';

import { useAnimatedCounter } from 'hooks/animations';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const Chart3Mobile = () => {
  const counter = useAnimatedCounter(0, 1.4, 1, (v) => `${v.toFixed(1)} M Ha`, true);

  return (
    <section className="relative z-20">
      <div className="sticky top-0 left-0 z-10 flex min-h-screen w-full items-center">
        <Wrapper>
          <div className="flex flex-col space-y-8 pt-10">
            <div className="space-y-5 text-white">
              <FadeYScroll>
                <h3 className="font-semibold uppercase">NATURE-BASED SOLUTIONS</h3>
              </FadeYScroll>
              <FadeYScroll>
                <h1 className="font-display text-3xl">Are locally viable.</h1>
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
                  Not only would it bring financial prosperity to these farms, these techniques help
                  make the agricultural area more resilient to climate change impacts while
                  contributing positively to wider environmental issues, such as reducing carbon
                  emissions and biodiversity loss.
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
                    of land suitable for agrosilvopastoral techniques
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

export default Chart3Mobile;
