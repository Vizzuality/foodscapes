import dynamic from 'next/dynamic';

import { ParentSize } from '@visx/responsive';
import { motion, AnimatePresence } from 'framer-motion';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const BarStackChart = dynamic(
  () => import('containers/stories/argentina-gran-chaco/charts/bar-stack'),
  {
    ssr: false,
  }
);

const data = [
  { key: 'A', name: 'Current Farm Benefits', type: 't1', value: 100 },
  { key: 'A', name: 'Current Farm Benefits', type: 't2', value: 0 },
  { key: 'A', name: 'Current Farm Benefits', type: 't3', value: 0 },
  { key: 'B', name: 'Benefits after interventions', type: 't1', value: 100 },
  { key: 'B', name: 'Benefits after interventions', type: 't2', value: 80 },
  { key: 'B', name: 'Benefits after interventions', type: 't3', value: 10 },
];

const Chart2Mobile = () => {
  return (
    <section className="relative top-0 left-0 z-10 flex min-h-screen w-full items-center pt-32">
      <Wrapper>
        <div className="flex flex-col space-y-8">
          <div className="space-y-5 text-white">
            <FadeYScroll>
              <h3 className="font-semibold uppercase">NATURE-BASED SOLUTIONS</h3>
            </FadeYScroll>
            <FadeYScroll>
              <h1 className="font-display text-3xl">Make socioeconomic sense.</h1>
            </FadeYScroll>
            <FadeYScroll>
              <p className="font-semibold">
                Across the Argentina Gran Chaco foodscape, mixed land use practices could nearly
                double farm income. However, the transition costs would be more than the current
                farm profit. Farms will require new sources of capital to support this transition.
              </p>
            </FadeYScroll>
          </div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.125, delay: 0.5 }}
            >
              <ParentSize>
                {({ width }) => (
                  <BarStackChart
                    id="stacked-bar-mobile"
                    width={width}
                    height={300}
                    data={data}
                    margin={{ top: 20, left: 20, bottom: 50, right: 20 }}
                  />
                )}
              </ParentSize>
            </motion.div>
          </AnimatePresence>
        </div>
      </Wrapper>
    </section>
  );
};

export default Chart2Mobile;
