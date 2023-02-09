import { Children, isValidElement, PropsWithChildren, useMemo } from 'react';

import { lastStepAtom, stepAtom } from 'store/home';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import ScrollItem from './item';

interface ScrollListProps extends PropsWithChildren {}

const ScrollList = ({ children }: ScrollListProps) => {
  const step = useRecoilValue(stepAtom);
  const setStep = useSetRecoilState(stepAtom);
  const setLastStep = useSetRecoilState(lastStepAtom);

  const onChange = useDebouncedCallback((id: number) => {
    setLastStep(step);
    setStep(id);
  }, 100);

  const CHILDREN = useMemo(() => {
    return Children.map(children, (child, index) => {
      if (!child || !isValidElement(child)) {
        return null;
      }

      return (
        <ScrollItem key={`scroll-${index}`} step={index} onChange={onChange}>
          {child}
        </ScrollItem>
      );
    });
  }, [children, onChange]);

  return <>{CHILDREN}</>;
};

export default ScrollList;
