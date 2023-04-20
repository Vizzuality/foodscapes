import dynamic from 'next/dynamic';

import { ParentSize } from '@visx/responsive';
import { motion, AnimatePresence } from 'framer-motion';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const BarChart = dynamic(() => import('containers/stories/argentina-gran-chaco/charts/bar-chart'), {
  ssr: false,
});
const data = [
  {
    label: 'Grazing systems',
    value: 5,
  },
  {
    label: 'Mixed livestock cropping systems',
    value: 140,
  },
];

const Chart1Mobile = () => {
  return (
    <section className="relative top-0 left-0 z-10 flex min-h-screen w-full items-center">
      <Wrapper>
        <div className="flex flex-col items-end">
          <div className="space-y-5 text-white">
            <FadeYScroll>
              <h3 className="font-semibold uppercase">NATURE-BASED SOLUTIONS</h3>
            </FadeYScroll>
            <FadeYScroll>
              <h1 className="font-display text-3xl">Make socioeconomic sense.</h1>
            </FadeYScroll>
            <FadeYScroll>
              <p className="font-semibold">
                Incorporating nature-based solutions improves productivity, diversifies and
                increases yearly profits, and prevents land degradation. For grazing systems this
                would come from introducing silvopasture. For mixed livestock-cropping systems these
                opportunities come from adding forest buffers, silvopasture and cover crops.
              </p>
            </FadeYScroll>
          </div>
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
                <BarChart
                  width={width}
                  height={300}
                  data={data}
                  margin={{ top: 20, left: 20, bottom: 50, right: 20 }}
                />
              )}
            </ParentSize>
          </motion.div>
        </AnimatePresence>
      </Wrapper>
    </section>
  );
};

export default Chart1Mobile;
