import { stepAtom, lastStepAtom } from 'store/home';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import { STEPS } from 'containers/home/constants';

import ScrollSection from './item';

const SrollList = () => {
  const step = useRecoilValue(stepAtom);
  const setStep = useSetRecoilState(stepAtom);
  const setLastStep = useSetRecoilState(lastStepAtom);

  const onChangeDebounced = useDebouncedCallback((id) => {
    setLastStep(step);
    setStep(id);
  }, 150);

  return (
    <div className="-mt-[100svh]">
      {STEPS.map((s) => {
        const { id } = s;

        return <ScrollSection key={id} id={id} onChange={onChangeDebounced} />;
      })}
    </div>
  );
};

export default SrollList;
