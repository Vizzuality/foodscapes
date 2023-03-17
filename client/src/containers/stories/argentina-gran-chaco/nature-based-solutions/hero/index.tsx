import { useScrollItem } from 'lib/scroll';

import { motion, useTransform } from 'framer-motion';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const NatureBasedHero = () => {
  const { scrollYProgress: scrollYProgress3 } = useScrollItem('scroll-3');

  const color = useTransform(scrollYProgress3, [0.25, 0.4], ['#1A1A1A', '#FFFFFF']);
  const opacity = useTransform(scrollYProgress3, [0.25, 0.4], [0, 1]);

  return (
    <section className="relative z-20 h-[200vh]">
      <div className="sticky top-0 left-0 z-10 flex h-screen w-full items-center">
        <Wrapper>
          <div className="grid grid-cols-12 items-end gap-6 pb-10">
            <div className="col-span-5 col-start-7">
              <div className="space-y-5 text-right text-navy-500">
                <FadeYScroll>
                  <motion.h1 className="font-display text-5xl" style={{ color }}>
                    Nature-based solutions.
                  </motion.h1>
                </FadeYScroll>
                <FadeYScroll>
                  <motion.p className="font-semibold text-white" style={{ opacity }}>
                    We look to nature-based solutions to ensure the integrity of foodscapes and the
                    broader ecosystem that they interact with. For example, introducing
                    <strong className="font-bold">
                      agrosilvopastoral techniques to farming – the combination of growing trees,
                      crop production, and grazing cattle –
                    </strong>{' '}
                    offers the potential to protect Gran Chaco’s traditional mixed-use landscape and
                    its globally significant biodiversity, while still producing economically
                    essential commodities, such as soy.
                  </motion.p>
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
