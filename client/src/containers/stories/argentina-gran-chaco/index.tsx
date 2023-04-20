import Image from 'next/image';

import cn from 'lib/classnames';
import { ScrollProvider } from 'lib/scroll';

import { lastStepAtom, stepAtom } from 'store/stories/gran-chaco';

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import { Media } from 'components/media-query';

// Mobile
import IntroBackgroundMobile from './intro-mobile/background';
import IntroHeroMobile from './intro-mobile/hero';
import IntroHowMobile from './intro-mobile/how';
import IntroMaskMobile from './intro-mobile/mask';
import IntroRiskMobile from './intro-mobile/risk';
import IntroBackground from './intro/background';
import IntroHero from './intro/hero';
import IntroHow from './intro/how';
import IntroMask from './intro/mask';
import IntroRisk from './intro/risk';
import NatureBasedBackground1Mobile from './nature-based-solutions-mobile/background-1';
import NatureBasedBackground2Mobile from './nature-based-solutions-mobile/background-2';
import NatureBasedBackground3Mobile from './nature-based-solutions-mobile/background-3';
import NatureBasedChart1Mobile from './nature-based-solutions-mobile/chart-1';
import NatureBasedChart2Mobile from './nature-based-solutions-mobile/chart-2';
import NatureBasedChart3Mobile from './nature-based-solutions-mobile/chart-3';
import NatureBasedChart4Mobile from './nature-based-solutions-mobile/chart-4';
import NatureBasedHeroMobile from './nature-based-solutions-mobile/hero';
import NatureBasedMaskMobile from './nature-based-solutions-mobile/mask';

// Desktop
import NatureBasedBackground1 from './nature-based-solutions/background-1';
import NatureBasedBackground2 from './nature-based-solutions/background-2';
import NatureBasedBackground3 from './nature-based-solutions/background-3';
import NatureBasedChart1 from './nature-based-solutions/chart-1';
import NatureBasedChart2 from './nature-based-solutions/chart-2';
import NatureBasedChart3 from './nature-based-solutions/chart-3';
import NatureBasedChart4 from './nature-based-solutions/chart-4';
import NatureBasedHero from './nature-based-solutions/hero';
import NatureBasedMask from './nature-based-solutions/mask';
import Outro from './outro';
import ScrollItem from './scroll';

const GranChaco = () => {
  const step = useRecoilValue(stepAtom);
  const setStep = useSetRecoilState(stepAtom);
  const setLastStep = useSetRecoilState(lastStepAtom);

  const onChange = useDebouncedCallback((id: number) => {
    setLastStep(step);
    setStep(id);
  }, 100);

  console.log({ step });

  return (
    <>
      <Media lessThan="sm">
        <div
          className={cn({
            'w-full overflow-hidden': true,
          })}
        >
          <ScrollItem step={0} onChange={onChange}>
            <IntroHeroMobile />
          </ScrollItem>

          <ScrollItem step={1} onChange={onChange}>
            <IntroHowMobile />
          </ScrollItem>

          <ScrollItem step={2} onChange={onChange}>
            <IntroRiskMobile />
          </ScrollItem>

          <ScrollItem step={3} onChange={onChange}>
            <NatureBasedHero />
          </ScrollItem>

          <ScrollItem step={4} onChange={onChange}>
            <NatureBasedChart1Mobile />
          </ScrollItem>

          <ScrollItem step={5} onChange={onChange}>
            <NatureBasedChart2Mobile />
          </ScrollItem>

          <ScrollItem step={6} onChange={onChange}>
            <NatureBasedChart3Mobile />
          </ScrollItem>

          <ScrollItem step={7} onChange={onChange}>
            <NatureBasedChart4Mobile />
          </ScrollItem>

          <ScrollItem step={8} onChange={onChange}>
            <Outro />
          </ScrollItem>

          <motion.div initial={false} animate={{ opacity: [0, 1, 2].includes(step) ? 1 : 0 }}>
            <IntroBackgroundMobile />

            <IntroMaskMobile />
          </motion.div>

          <AnimatePresence>
            {[3, 4, 5].includes(step) && <NatureBasedBackground1Mobile />}
            {[6, 7].includes(step) && <NatureBasedBackground2Mobile />}
            {[8].includes(step) && <NatureBasedBackground3Mobile />}
          </AnimatePresence>
        </div>
      </Media>

      <Media greaterThanOrEqual="sm">
        <ScrollProvider>
          <ScrollItem step={0} onChange={onChange}>
            <IntroHero />
          </ScrollItem>

          <ScrollItem step={1} onChange={onChange}>
            <IntroHow />
          </ScrollItem>

          <ScrollItem step={2} onChange={onChange}>
            <IntroRisk />
          </ScrollItem>

          <ScrollItem step={3} onChange={onChange}>
            <NatureBasedHero />
          </ScrollItem>

          <ScrollItem step={4} onChange={onChange}>
            <NatureBasedChart1 />
          </ScrollItem>

          <ScrollItem step={5} onChange={onChange}>
            <NatureBasedChart2 />
          </ScrollItem>

          <ScrollItem step={6} onChange={onChange}>
            <NatureBasedChart3 />
          </ScrollItem>

          <ScrollItem step={7} onChange={onChange}>
            <NatureBasedChart4 />
          </ScrollItem>

          <ScrollItem step={8} onChange={onChange}>
            <Outro />
          </ScrollItem>

          {/* Backgrounds and masks */}
          <motion.div initial={false} animate={{ opacity: [0, 1, 2].includes(step) ? 1 : 0 }}>
            <IntroBackground />

            <IntroMask />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: [3, 4, 5, 6, 7, 8].includes(step) ? 1 : 0 }}
          >
            <NatureBasedBackground1 />
            <NatureBasedBackground2 />
            <NatureBasedBackground3 />

            <NatureBasedMask />
          </motion.div>
        </ScrollProvider>
      </Media>
    </>
  );
};

export default GranChaco;
