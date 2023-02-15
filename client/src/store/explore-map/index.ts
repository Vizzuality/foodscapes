import { array, bool, dict, number, object, string } from '@recoiljs/refine';
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

export const layersAtom = atom({
  key: 'layers',
  default: ['foodscapes'],
  effects: [
    urlSyncEffect({
      refine: array(string()),
    }),
  ],
});

export const layersSettingsAtom = atom({
  key: 'layers-settings',
  default: {},
  effects: [
    urlSyncEffect({
      refine: dict(
        object({
          opacity: number(),
          visibility: bool(),
        })
      ),
    }),
  ],
});
