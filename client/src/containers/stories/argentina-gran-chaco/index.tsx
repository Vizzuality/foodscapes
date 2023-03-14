import { lastStepAtom, stepAtom } from 'store/stories/gran-chaco';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import Background from './background';
import Hero from './hero';
import How from './how';
import Mask from './mask';
import Risk from './risk';
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
      <Background />

      <Mask />

      <ScrollItem step={0} onChange={onChange}>
        <Hero />
      </ScrollItem>

      <ScrollItem step={1} onChange={onChange}>
        <How />
      </ScrollItem>

      <ScrollItem step={2} onChange={onChange}>
        <Risk />
      </ScrollItem>
    </>
  );
};

export default GranChaco;
