import { atom } from 'recoil';

export const menuOpenAtom = atom({
  key: 'menu-open',
  default: false,
});

export const layersOpenAtom = atom({
  key: 'layers-open',
  default: false,
});
