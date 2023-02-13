import { string } from '@recoiljs/refine';
import { atom } from 'recoil';
import { urlSyncEffect } from 'recoil-sync';

// Menus
export const menuOpenAtom = atom({
  key: 'menu-open',
  default: false,
});

export const layersOpenAtom = atom({
  key: 'layers-open',
  default: false,
});

// Map
export const basemapAtom = atom({
  key: 'basemap',
  default: 'light',
  effects: [
    urlSyncEffect({
      refine: string(),
    }),
  ],
});
