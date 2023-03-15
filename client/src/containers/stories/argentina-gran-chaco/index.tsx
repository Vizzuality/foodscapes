import { lastStepAtom, stepAtom } from 'store/stories/gran-chaco';

import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import IntroBackground from './intro/background';
import IntroHero from './intro/hero';
import IntroHow from './intro/how';
import IntroMask from './intro/mask';
import IntroRisk from './intro/risk';
import NatureBasedBackground from './nature-based-solutions/background';
import NatureBasedHero from './nature-based-solutions/hero';
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
    <>
      {/* Backgrounds and masks */}
      <motion.div initial={false} animate={{ opacity: [0, 1, 2].includes(step) ? 1 : 0 }}>
        <IntroBackground />

        <IntroMask />
      </motion.div>

      <motion.div>
        <NatureBasedBackground />
      </motion.div>

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
    </>
  );
};

export default GranChaco;
