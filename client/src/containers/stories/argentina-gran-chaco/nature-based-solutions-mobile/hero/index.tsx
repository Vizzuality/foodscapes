import { motion } from 'framer-motion';

import FadeYScroll from 'containers/animations/fadeYScroll';
import Wrapper from 'containers/wrapper';

const NatureBasedHero = () => {
  return (
    <section className="relative z-20">
      <div className="sticky top-0 left-0 z-10 flex h-screen w-full items-center">
        <Wrapper>
          <div className="space-y-8 text-right text-white">
            <FadeYScroll>
              <motion.h1 className="font-display text-4xl">Nature-based solutions.</motion.h1>
            </FadeYScroll>
            <FadeYScroll>
              <motion.p className="font-semibold text-white">
                We look to nature-based solutions to ensure the integrity of foodscapes and the
                broader ecosystem that they interact with. For example, introducing{' '}
                <strong className="font-bold">
                  agrosilvopastoral techniques to farming – the combination of growing trees, crop
                  production, and grazing cattle –
                </strong>{' '}
                offers the potential to protect Gran Chaco’s traditional mixed-use landscape and its
                globally significant biodiversity, while still producing economically essential
                commodities, such as soy.
              </motion.p>
            </FadeYScroll>
          </div>
        </Wrapper>
      </div>
    </section>
  );
};

export default NatureBasedHero;
