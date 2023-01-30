import { number, array } from '@recoiljs/refine';
import { atom } from 'recoil';
import { urlSyncEffect } from 'recoil-sync';

export const step = atom({
  key: 'step',
  default: 0,
  effects: [
    urlSyncEffect({
      refine: number(),
      history: 'push',
    }),
  ],
});

export const steps = atom({
  key: 'steps',
  default: [],
  effects: [
    urlSyncEffect({
      refine: array(number()),
    }),
  ],
});

const exploreMapStore = {
  step,
  steps,
};

export default exploreMapStore;
