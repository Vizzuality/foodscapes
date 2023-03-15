import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const How = () => {
  return (
    <section className="relative top-0 left-0 z-10 flex min-h-screen w-full items-center">
      <Wrapper>
        <div className="grid grid-cols-12 items-end gap-6 pb-10">
          <div className="col-span-4 col-start-8">
            <div className="space-y-5 text-right">
              <FadeYScroll>
                <h1 className="font-display text-4xl">How foodscapes interact.</h1>
              </FadeYScroll>
              <FadeYScroll>
                <p className="font-light">
                  There are 9 different foodscapes within the mosaic of the Argentina Gran Chaco
                  boundary.
                </p>
              </FadeYScroll>
              <FadeYScroll>
                <p className="font-light">
                  <strong className="font-semibold">7 of them</strong> contain croplands that are
                  producing a total amount of{' '}
                  <strong className="font-semibold">
                    2 million tonnes of soy in the whole region.
                  </strong>
                </p>
              </FadeYScroll>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default How;
