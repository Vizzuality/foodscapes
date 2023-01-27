import { stepAtom } from 'store/home';

import { useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import { STEPS } from 'containers/home/constants';

import ScrollSection from './item';

const SrollList = () => {
  const setStep = useSetRecoilState(stepAtom);

  const onChangeDebounced = useDebouncedCallback((id) => {
    setStep(id);
  }, 150);

  return (
    <div className="-mt-[100svh]">
      {STEPS.map((step) => {
        const { id } = step;

        return <ScrollSection key={id} id={id} onChange={onChangeDebounced} />;
      })}
    </div>
  );
};

export default SrollList;
