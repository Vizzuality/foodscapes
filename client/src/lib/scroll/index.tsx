import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  RefObject,
} from 'react';

import { motionValue, MotionValue, useMotionValueEvent, useScroll } from 'framer-motion';

type ScrollItem = {
  key: string | number;
  ref: RefObject<HTMLDivElement>;
  data: Record<string, any>;
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

export const ScrollProvider = ({ children, onStepChange }: PropsWithChildren<any>) => {
  const [scrollItems, setScrollItems] = useState<ScrollItem[]>([]);
  const { scrollY } = useScroll();

  const addScrollItem = useCallback<ScrollContext['addScrollItem']>(
    (data) => {
      if (scrollItems.find((item) => item.key === data.key)) return;
      return setScrollItems((prev) => [...prev, data]);
    },
    [scrollItems, setScrollItems]
  );

  const handleChange = useCallback(
    (key) => {
      if (onStepChange) {
        const item = scrollItems.find((i) => i.key === key);

        if (item) {
          onStepChange(item);
        }
      }
    },
    [scrollItems, onStepChange]
  );

  const scrollItemsHeights = useMemo(() => {
    return scrollItems.map((s) => {
      return {
        key: s.key,
        rect: s.ref.current?.getBoundingClientRect(),
      };
    });
  }, [scrollItems]);

  const context = useMemo(
    () => ({
      scrollItems,
      addScrollItem,
    }),
    [scrollItems, addScrollItem]
  );

  useMotionValueEvent(scrollY, 'change', (v) => {
    const current = scrollItemsHeights.reduce(
      (acc, i) => {
        const currentH = i.rect?.height ?? 0;
        const h = acc.height + currentH;
        const accH = Math.max(acc.height - window.innerHeight * 0.5, 0);

        // console.log({ currentH, accHeight: acc.height, v });
        if (v < accH) {
          return {
            key: acc.key,
            height: acc.height,
          };
        }

        return {
          key: i.key,
          height: h,
        };
      },
      {
        key: scrollItemsHeights[0].key,
        height: 0,
      }
    );

    handleChange(current.key);
  });

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
    } as ScrollItem;
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
