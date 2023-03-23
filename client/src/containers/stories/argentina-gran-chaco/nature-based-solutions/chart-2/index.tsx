import dynamic from 'next/dynamic';

import { stepAtom } from 'store/home';

import { ParentSize } from '@visx/responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';

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

const Chart2 = () => {
  const step = useRecoilValue(stepAtom);

  return (
    <section className="relative top-0 left-0 z-10 flex min-h-screen w-full items-center">
      <Wrapper>
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="col-span-4 col-start-2">
            <div className="space-y-5 text-white">
              <FadeYScroll>
                <h3 className="font-semibold uppercase">NATURE-BASED SOLUTIONS</h3>
              </FadeYScroll>
              <FadeYScroll>
                <h1 className="font-display text-4xl">Make socioeconomic sense.</h1>
              </FadeYScroll>
              <FadeYScroll>
                <p className="font-semibold">
                  Across the Argentina Gran Chaco foodscape, mixed land use practices could nearly
                  double farm income. However, the transition costs would be more than the current
                  farm profit. Farms will require new sources of capital to support this transition.
                </p>
              </FadeYScroll>
            </div>
          </div>

          <div className="col-span-6 col-start-6">
            <AnimatePresence>
              {step === 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.125, delay: 0.5 }}
                >
                  <ParentSize>
                    {({ width }) => (
                      <BarStackChart
                        width={width}
                        height={400}
                        data={data}
                        margin={{ top: 20, left: 20, bottom: 50, right: 20 }}
                      />
                    )}
                  </ParentSize>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Chart2;
