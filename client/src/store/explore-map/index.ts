import { number, array } from '@recoiljs/refine';
import { atom } from 'recoil';
import { urlSyncEffect } from 'recoil-sync';

export const step = atom({
  key: 'step',
  default: 0,
  effects: [
    urlSyncEffect({
      refine: number(),
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

export const initializeState =
  (query) =>
  ({ set }) => {
    const keys = Object.keys(query);
    keys.forEach((key) => {
      set(exploreMapStore[key], query[key]);
    });
  };

export default exploreMapStore;
