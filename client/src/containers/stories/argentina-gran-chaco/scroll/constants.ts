type ScrollItem = {
  id: number;
  inViewProps: {
    amount: number;
    margin: string;
  };
  useScrollProps: {
    offset: any;
  };
};

export const SCROLL_ITEMS_METADATA: ScrollItem[] = [
  {
    id: 0,
    inViewProps: {
      amount: 0.25,
      margin: '-50% 0% 0% 0%',
    },
    useScrollProps: {
      offset: ['0 0', '1 0'],
    },
  },
  {
    id: 1,
    inViewProps: {
      amount: 0.25,
      margin: '-50% 0% 0% 0%',
    },
    useScrollProps: {
      offset: ['0 0', '1 0'],
    },
  },
  {
    id: 2,
    inViewProps: {
      amount: 0.25,
      margin: '-50% 0% 0% 0%',
    },
    useScrollProps: {
      offset: ['0 0', '1 0'],
    },
  },
  {
    id: 3,
    inViewProps: {
      amount: 0.25,
      margin: '-50% 0% 0% 0%',
    },
    useScrollProps: {
      offset: ['0 0', '1 0'],
    },
  },
  {
    id: 4,
    inViewProps: {
      amount: 0.25,
      margin: '-50% 0% 0% 0%',
    },
    useScrollProps: {
      offset: ['0 0', '1 0'],
    },
  },
  {
    id: 5,
    inViewProps: {
      amount: 0.25,
      margin: '-50% 0% 0% 0%',
    },
    useScrollProps: {
      offset: ['0 0', '1 0'],
    },
  },
  {
    id: 6,
    inViewProps: {
      amount: 0.25 * 0.3333,
      margin: `-${50 + 50 * 0.3333}% 0% 0% 0%`,
    },
    useScrollProps: {
      offset: ['0 0', '1 1'],
    },
  },
  {
    id: 7,
    inViewProps: {
      amount: 0.25 * 0.3333,
      margin: `-${50 + 50 * 0.3333}% 0% 0% 0%`,
    },
    useScrollProps: {
      offset: ['0 0', '1 0'],
    },
  },
  {
    id: 8,
    inViewProps: {
      amount: 0.25,
      margin: '-50% 0% 0% 0%',
    },
    useScrollProps: {
      offset: ['0.33 1', '1 0'],
    },
  },
];
