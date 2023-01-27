import { atom } from 'recoil';

export const step = atom({
  key: 'step',
  default: 0,
});

const exploreMapStore = {
  step,
};

export default exploreMapStore;
