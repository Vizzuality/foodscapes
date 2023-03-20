import { ScrollProvider } from 'lib/scroll';

import { lastStepAtom, stepAtom } from 'store/stories/gran-chaco';

import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import IntroBackground from './intro/background';
import IntroHero from './intro/hero';
import IntroHow from './intro/how';
import IntroMask from './intro/mask';
import IntroRisk from './intro/risk';
import NatureBasedBackground1 from './nature-based-solutions/background-1';
import NatureBasedBackground2 from './nature-based-solutions/background-2';
import NatureBasedBackground3 from './nature-based-solutions/background-3';
import NatureBasedChart1 from './nature-based-solutions/chart-1';
import NatureBasedChart2 from './nature-based-solutions/chart-2';
import NatureBasedChart3 from './nature-based-solutions/chart-3';
import NatureBasedChart4 from './nature-based-solutions/chart-4';
import NatureBasedHero from './nature-based-solutions/hero';
import NatureBasedMask from './nature-based-solutions/mask';
import ScrollItem from './scroll';

const GranChaco = () => {
  const step = useRecoilValue(stepAtom);
  const setStep = useSetRecoilState(stepAtom);
  const setLastStep = useSetRecoilState(lastStepAtom);

  const onChange = useDebouncedCallback((id: number) => {
    setLastStep(step);
    setStep(id);
  }, 100);

  return (
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

      {/* Backgrounds and masks */}
      <motion.div initial={false} animate={{ opacity: [0, 1, 2].includes(step) ? 1 : 0 }}>
        <IntroBackground />

        <IntroMask />
      </motion.div>

      <motion.div initial={false} animate={{ opacity: [3, 4, 5, 6, 7].includes(step) ? 1 : 0 }}>
        <NatureBasedBackground1 />
        <NatureBasedBackground2 />
        <NatureBasedBackground3 />

        <NatureBasedMask />
      </motion.div>
    </ScrollProvider>
  );
};

export default GranChaco;
