import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const NatureBasedHero = () => {
  return (
    <section className="relative z-20 h-[200vh]">
      <div className="sticky top-0 left-0 z-10 flex h-screen w-full items-center">
        <Wrapper>
          <div className="grid grid-cols-12 items-end gap-6 pb-10">
            <div className="col-span-5 col-start-7">
              <div className="space-y-5 text-right text-navy-500">
                <FadeYScroll>
                  <h1 className="font-display text-5xl">Nature-based solutions.</h1>
                </FadeYScroll>
                <FadeYScroll>
                  <p className="font-semibold text-white">
                    We look to nature-based solutions to ensure the integrity of foodscapes and the
                    broader ecosystem that they interact with. For example, introducing
                    <strong className="font-semibold">
                      agrosilvopastoral techniques to farming – the combination of growing trees,
                      crop production, and grazing cattle –
                    </strong>{' '}
                    offers the potential to protect Gran Chaco’s traditional mixed-use landscape and
                    its globally significant biodiversity, while still producing economically
                    essential commodities, such as soy.
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

export default NatureBasedHero;
