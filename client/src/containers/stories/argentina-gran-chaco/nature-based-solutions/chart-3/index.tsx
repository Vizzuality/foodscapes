import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const Chart3 = () => {
  return (
    <section className="relative z-20 h-[200vh]">
      <div className="sticky top-0 left-0 z-10 flex min-h-screen w-full items-center">
        <Wrapper>
          <div className="grid grid-cols-12 items-end gap-6 pb-10">
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

            <div className="col-span-4 col-start-8">
              <div className="aspect-square w-full border border-dashed border-white" />
            </div>
          </div>
        </Wrapper>
      </div>
    </section>
  );
};

export default Chart3;
