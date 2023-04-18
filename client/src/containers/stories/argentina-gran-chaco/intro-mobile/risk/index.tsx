import Image from 'next/image';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const Risk = () => {
  return (
    <section className="relative top-0 left-0 z-10 flex min-h-screen w-full items-center bg-white pt-20">
      <Wrapper>
        <div className="space-y-8 pb-10">
          <div>
            <Image
              src="/images/stories/argentina-gran-chaco/mobile/granchaco-mobile-2.jpg"
              alt="Gran Chaco"
              width={368}
              height={338}
              className="h-full w-full"
            />
          </div>
          <div className="space-y-5 text-right">
            <FadeYScroll>
              <h1 className="font-display text-3xl">Foodscapes at risk.</h1>
            </FadeYScroll>
            <FadeYScroll>
              <p className="font-light">
                <strong className="font-semibold">20% of the Argentinian Gran Chaco</strong> is
                already <strong className="font-semibold">affected by 1 or more risks.</strong> Some
                of these risks directly affect agriculture, others affect the integrity of the wider
                ecosystem.
              </p>
            </FadeYScroll>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Risk;
