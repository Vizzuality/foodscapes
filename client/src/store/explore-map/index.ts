import { atom } from 'recoil';

export const menuOpen = atom({
  key: 'menu-open',
  default: false,
});

export const layersOpen = atom({
  key: 'layers-open',
  default: false,
});
