import { useEffect } from 'react';

import { array, bool, dict, number, object, string } from '@recoiljs/refine';
import { atom, useRecoilCallback, useRecoilValue } from 'recoil';
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
          expand: bool(),
        })
      ),
    }),
  ],
});

export const popupAtom = atom({
  key: 'point',
  default: null,
});

export function useSyncExploreMap() {
  const layers = useRecoilValue(layersAtom);

  const syncAtoms = useRecoilCallback(
    ({ snapshot, set, reset }) =>
      async () => {
        const lys = await snapshot.getPromise(layersAtom);
        const lysSettings = await snapshot.getPromise(layersSettingsAtom);

        // Remove layersettings that are not in layers
        Object.keys(lysSettings).forEach((ly) => {
          if (!lys.includes(ly)) {
            set(layersSettingsAtom, (prev) => {
              const { [ly]: l, ...rest } = prev;
              return rest;
            });
          }
        });

        if (lys.length === 0) {
          reset(layersSettingsAtom);
          reset(popupAtom);
        }
      },
    []
  );

  // Sync layersettings when layers change
  useEffect(() => {
    syncAtoms();
  }, [layers]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
