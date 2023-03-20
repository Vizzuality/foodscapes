import Image from 'next/image';

import { clamp, useScrollItem } from 'lib/scroll';

import { stepAtom } from 'store/stories/gran-chaco';

import { motion, useTransform } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

const Hero = () => {
  const { scrollYProgress } = useScrollItem('scroll-0');

  const opacity = useTransform(scrollYProgress, (v) => 1 - clamp(v * 2));

  const step = useRecoilValue(stepAtom);

  return (
    <section className="relative z-20 h-[200vh]">
      <div className="fixed top-0 left-0 z-10 flex h-full w-full items-end">
        <Wrapper>
          <motion.div className="grid grid-cols-12 items-end gap-6 pb-10" style={{ opacity }}>
            <motion.div
              className="col-span-5 col-start-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.75 }}
            >
              <Image
                src="/images/stories/argentina-gran-chaco/argentina-map-state-2.svg"
                alt="Argentina map - Gran chaco"
                width={308}
                height={448}
                priority
              />
            </motion.div>

            <div className="col-span-5 col-start-7">
              <div className="flex flex-col items-end space-y-5 text-right text-white">
                <h1 className="font-display text-5xl">Foodscapes in action.</h1>
                <motion.p
                  className="overflow-hidden font-semibold"
                  initial={{ opacity: 0, y: 100, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  transition={{ delay: 0.5, duration: 0.75 }}
                >
                  The Gran Chaco is a large region across South America, known for its high endemic
                  biodiversity. The region has long accommodated a diversity of uses, such as
                  hunting, grazing, and crop production. The Gran Chaco region of Argentina
                  allocates 58% of its croplands to produce soy.
                </motion.p>

                <button
                  onClick={() => {
                    const el = document.querySelector(`#scroll-${step + 1}`);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Icon icon={ARROW_DOWN_SVG} className="h-4 w-4 animate-bounce" />
                </button>
              </div>
            </div>
          </motion.div>
        </Wrapper>
      </div>
    </section>
  );
};

export default Hero;
