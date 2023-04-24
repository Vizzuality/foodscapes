import Image from 'next/image';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const HowMobile = () => {
  return (
    <section className="relative top-0 left-0 z-10 flex min-h-screen w-full items-center bg-white pt-20">
      <Wrapper>
        <div className="space-y-8 pb-10">
          <div>
            <Image
              src="/images/stories/argentina-gran-chaco/mobile/granchaco-mobile-1.jpg"
              alt="Gran Chaco"
              width={368}
              height={338}
              className="h-full w-full"
            />
          </div>
          <div className="space-y-5 text-right">
            <FadeYScroll>
              <h1 className="font-display text-3xl">How foodscapes interact.</h1>
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
      </Wrapper>
    </section>
  );
};

export default HowMobile;
