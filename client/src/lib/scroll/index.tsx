import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { motionValue, MotionValue } from 'framer-motion';

type ScrollItem = {
  key: string;
  scrollX: MotionValue<number>;
  scrollY: MotionValue<number>;
  scrollXProgress: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
};

interface ScrollContext {
  scrollItems: ScrollItem[];
  addScrollItem: (data: ScrollItem) => void;
}

const Context = createContext<ScrollContext>({
  scrollItems: [],
  addScrollItem: () => {},
});

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect;

export const ScrollProvider = ({ children }: PropsWithChildren) => {
  const [scrollItems, setScrollItems] = useState<ScrollItem[]>([]);

  const addScrollItem = useCallback<ScrollContext['addScrollItem']>(
    (data) => {
      if (scrollItems.find((item) => item.key === data.key)) return;
      return setScrollItems((prev) => [...prev, data]);
    },
    [scrollItems, setScrollItems]
  );

  const context = useMemo(
    () => ({
      scrollItems,
      addScrollItem,
    }),
    [scrollItems, addScrollItem]
  );

  return (
    <Context.Provider key="scroll-provider" value={context}>
      {children}
    </Context.Provider>
  );
};

export function useScrollItems() {
  const { scrollItems } = useContext(Context);

  return scrollItems;
}

export function useScrollItem(key: string) {
  const { scrollItems } = useContext(Context);

  const scrollItem = scrollItems.find((item) => item.key === key);

  if (!scrollItem) {
    return {
      key,
      scrollX: motionValue<number>(0),
      scrollY: motionValue<number>(0),
      scrollXProgress: motionValue<number>(0),
      scrollYProgress: motionValue<number>(0),
    } satisfies ScrollItem;
  }

  return scrollItem;
}

export function useAddScrollItem(data: ScrollItem) {
  const { addScrollItem } = useContext(Context);

  useIsomorphicLayoutEffect(() => {
    addScrollItem(data);
  }, [addScrollItem, data]);

  return null;
}

export function clamp(v: number, min: number = 0, max: number = 1) {
  return Math.min(Math.max(v, min), max);
}
