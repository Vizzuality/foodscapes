import { Layer } from '@deck.gl/core/typed';

import { ClimateChangeSettings } from 'types/climate-risks';
import { CropsSettings } from 'types/crops';
import { FiltersProps } from 'types/data';
import { Dataset } from 'types/datasets';
import { FoodscapesSettings } from 'types/foodscapes';
import { FoodscapesIntentisitySettings } from 'types/foodscapes-intensities';
import { LandUseChangeSettings } from 'types/land-use-risks';
import { PollutionSettings } from 'types/pollution-risks';

import { Settings } from 'components/map/legend/types';

export type LayerProps<S> = {
  id?: string;
  beforeId?: string;
  zIndex?: number;
  settings?: Partial<S>;
  filters?: FiltersProps;
};

export type LayerTypeSettings = {
  foodscapes: FoodscapesSettings;
  'foodscapes-intensities': FoodscapesIntentisitySettings;
  crops: CropsSettings;
  'land-use-risk': LandUseChangeSettings;
  'climate-risk': ClimateChangeSettings;
  'pollution-risk': PollutionSettings;
  locations: Settings;
  countries: Settings;
  provinces: Settings;
};

export type LayerSettings<I extends Dataset['id']> = I extends infer T
  ? T extends I
    ? LayerTypeSettings[T]
    : never
  : never;

export type MapboxLayerProps<T> = Partial<Omit<T, 'id'>> & {
  type: typeof Layer;
};

export type DeckLayerProps<T, S> = LayerProps<S> &
  T & {
    type: typeof Layer;
  };
