import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { MotionValue } from 'framer-motion';

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

export const ScrollProvider = ({ children }: PropsWithChildren) => {
  const [scrollItems, setScrollItems] = useState([]);

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

  return <Context.Provider value={context}>{children}</Context.Provider>;
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
      scrollX: new MotionValue(),
      scrollY: new MotionValue(),
      scrollXProgress: new MotionValue(),
      scrollYProgress: new MotionValue(),
    };
  }

  return scrollItem ?? {};
}

export function useAddScrollItem(data: ScrollItem) {
  const { addScrollItem } = useContext(Context);

  return addScrollItem(data);
}

export function clamp(v: number, min: number = 0, max: number = 1) {
  return Math.min(Math.max(v, min), max);
}
