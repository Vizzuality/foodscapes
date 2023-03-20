import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const Chart3 = () => {
  return (
    <section className="relative z-20 h-[300vh]">
      <div className="sticky top-0 left-0 z-10 flex min-h-screen w-full items-center">
        <Wrapper>
          <div className="grid grid-cols-12 items-end gap-6 pb-10">
            <div className="col-span-4 col-start-2">
              <div className="aspect-square w-full border border-dashed border-white" />
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

export default Chart3;
