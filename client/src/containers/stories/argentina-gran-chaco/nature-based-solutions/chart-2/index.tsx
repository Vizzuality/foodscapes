import dynamic from 'next/dynamic';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const BarStackChart = dynamic(
  () => import('containers/stories/argentina-gran-chaco/charts/bar-stack'),
  {
    ssr: false,
  }
);

const data = [
  { key: 'A', name: 'Current Farm Benefits', type: 't1', value: 20 },
  { key: 'A', name: 'Current Farm Benefits', type: 't2', value: 0 },
  { key: 'A', name: 'Current Farm Benefits', type: 't3', value: 0 },
  { key: 'B', name: 'Benefits after interventions', type: 't1', value: 20 },
  { key: 'B', name: 'Benefits after interventions', type: 't2', value: 10 },
  { key: 'B', name: 'Benefits after interventions', type: 't3', value: 6 },
];

const Chart2 = () => {
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

          <div className="col-span-4 col-start-8">
            <BarStackChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 20, left: 20, bottom: 50, right: 20 }}
            />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Chart2;
