import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const Chart2 = () => {
  return (
    <section className="relative top-0 left-0 z-10 flex min-h-screen w-full items-center">
      <Wrapper>
        <div className="grid grid-cols-12 items-end gap-6 pb-10">
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
            <div className="aspect-square w-full border border-dashed border-white" />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Chart2;
