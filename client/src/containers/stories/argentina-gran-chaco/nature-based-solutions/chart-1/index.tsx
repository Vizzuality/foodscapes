import dynamic from 'next/dynamic';

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

const Chart1 = () => {
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
                  Incorporating nature-based solutions improves productivity, diversifies and
                  increases yearly profits, and prevents land degradation. For grazing systems this
                  would come from introducing silvopasture. For mixed livestock-cropping systems
                  these opportunities come from adding forest buffers, silvopasture and cover crops.
                </p>
              </FadeYScroll>
            </div>
          </div>

          <div className="col-span-4 col-start-8">
            <BarChart
              width={600}
              height={600}
              data={data}
              margin={{ top: 20, left: 20, bottom: 50, right: 20 }}
            />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Chart1;
