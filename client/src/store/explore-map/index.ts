import { useEffect } from 'react';

import { array, bool, dict, nullable, number, object, optional, string } from '@recoiljs/refine';
import { atom, selectorFamily, useRecoilCallback, useRecoilValue } from 'recoil';
import { urlSyncEffect } from 'recoil-sync';

import { FiltersOmitProps, FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';
import { LayerSettings, LayerType } from 'types/layers';
import { Bbox } from 'types/map';

// Menus
export const sidebarOpenAtom = atom({
  key: 'sidebar-open',
  default: true,
});

export const layersOpenAtom = atom({
  key: 'layers-open',
  default: false,
});

// Filters
export const filtersOpenAtom = atom({
  key: 'filters-open',
  default: false,
});

// Map
export const bboxAtom = atom<Bbox>({
  key: 'bbox',
  default: null,
  effects: [
    urlSyncEffect({
      refine: array(number()),
    }),
  ],
});

export const tmpBboxAtom = atom<Bbox>({
  key: 'tmp-bbox',
  default: null,
});

export const basemapAtom = atom({
  key: 'basemap',
  default: 'light',
  effects: [
    urlSyncEffect({
      refine: string(),
    }),
  ],
});

export const layersAtom = atom<Dataset['id'][]>({
  key: 'layers',
  default: ['foodscapes'],
  effects: [
    urlSyncEffect({
      refine: array(string()),
    }),
  ],
});

const DEFAULT_SETTINGS = {
  opacity: 1,
  visibility: true,
  expand: true,
};

const SETTINGS = {
  foodscapes: { group: false, ...DEFAULT_SETTINGS },
  'foodscapes-intensities': { ...DEFAULT_SETTINGS },
  crops: { group: false, ...DEFAULT_SETTINGS },
  'land-use-risks': { ...DEFAULT_SETTINGS },
  'climate-risks': { ...DEFAULT_SETTINGS },
  'pollution-risks': { ...DEFAULT_SETTINGS },
  locations: { ...DEFAULT_SETTINGS },
  restorations: { ...DEFAULT_SETTINGS, column: 'grassland_areas_suitable_for_restoration_area' },
  agroforestries: { ...DEFAULT_SETTINGS, column: 'cropland_areas_suitable_for_silvoarable_area' },
  'soil-healths': { ...DEFAULT_SETTINGS, column: 'areas_suitable_for_cover_cropping_area' },
} satisfies Record<LayerType, LayerSettings<LayerType>>;

export const layersSettingsAtom = atom<Record<LayerType, LayerSettings<LayerType>>>({
  key: 'layers-settings',
  default: SETTINGS,
  effects: [
    urlSyncEffect({
      refine: dict(
        object({
          opacity: number(),
          visibility: bool(),
          expand: bool(),
          group: optional(bool()),
          column: optional(string()),
        })
      ),
    }),
  ],
});

export const popupAtom = atom({
  key: 'point',
  default: null,
});

export const tabAtom = atom({
  key: 'tab',
  default: 'foodscapes',
  effects: [
    urlSyncEffect({
      refine: string(),
    }),
  ],
});

// Filters
export const foodscapesAtom = atom({
  key: 'foodscapes',
  default: [],
  effects: [
    urlSyncEffect({
      refine: array(number()),
    }),
  ],
});

export const intensitiesAtom = atom({
  key: 'intensities',
  default: [],
  effects: [
    urlSyncEffect({
      refine: array(number()),
    }),
  ],
});

export const cropsAtom = atom({
  key: 'crops',
  default: [],
  effects: [
    urlSyncEffect({
      refine: array(number()),
    }),
  ],
});

export const landUseRiskAtom = atom({
  key: 'landUseRisk',
  default: [],
  effects: [
    urlSyncEffect({
      refine: array(number()),
    }),
  ],
});

export const climateRiskAtom = atom({
  key: 'climateRisk',
  default: [],
  effects: [
    urlSyncEffect({
      refine: array(number()),
    }),
  ],
});

export const pollutionRiskAtom = atom({
  key: 'pollutionRisk',
  default: [],
  effects: [
    urlSyncEffect({
      refine: array(number()),
    }),
  ],
});

export const countryAtom = atom({
  key: 'country',
  default: null,
  effects: [
    urlSyncEffect({
      refine: nullable(number()),
    }),
  ],
});

export const provinceAtom = atom({
  key: 'province',
  default: null,
  effects: [
    urlSyncEffect({
      refine: nullable(number()),
    }),
  ],
});

export const caseStudyAtom = atom({
  key: 'caseStudy',
  default: null,
  effects: [
    urlSyncEffect({
      refine: nullable(number()),
    }),
  ],
});

export const filtersSelector = selectorFamily<FiltersProps, FiltersOmitProps | FiltersOmitProps[]>({
  key: 'filters',
  get:
    (omit) =>
    ({ get }) => {
      const o = Array.isArray(omit) ? omit : [omit];
      return {
        ...(!o.includes('foodscapes') && { foodscapes: get(foodscapesAtom) }),
        ...(!o.includes('intensities') && { intensities: get(intensitiesAtom) }),
        ...(!o.includes('crops') && { crops: get(cropsAtom) }),
        ...(!o.includes('climateRisk') && { climateRisk: get(climateRiskAtom) }),
        ...(!o.includes('landUseRisk') && { landUseRisk: get(landUseRiskAtom) }),
        ...(!o.includes('pollutionRisk') && { pollutionRisk: get(pollutionRiskAtom) }),
        ...(!o.includes('country') && { country: get(countryAtom) }),
        ...(!o.includes('province') && { province: get(provinceAtom) }),
        ...(!o.includes('caseStudy') && { caseStudy: get(caseStudyAtom) }),
      };
    },
});

export function useSyncExploreMap() {
  const layers = useRecoilValue(layersAtom);

  const syncAtoms = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const lys = await snapshot.getPromise(layersAtom);
        const lysSettings = await snapshot.getPromise(layersSettingsAtom);

        // Reset layersettings that are not in layers
        (Object.keys(lysSettings) as Array<LayerType>).forEach((ly) => {
          if (!lys.includes(ly)) {
            set(layersSettingsAtom, (prev) => ({
              ...prev,
              [ly]: { ...SETTINGS[ly] },
            }));
          }
        });
      },
    []
  );

  // Sync layersettings when layers change
  useEffect(() => {
    syncAtoms();
  }, [layers.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
