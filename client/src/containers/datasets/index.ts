// Foodscapes intensity groups
import CropsLayer from 'containers/datasets/crops/layer';
import CropsLegend from 'containers/datasets/crops/legend';
import CropsPopup from 'containers/datasets/crops/popup';

import FoodscapesIntensityGroupsLayer from './foodscapes-intentisity-groups/layer';
import FoodscapesIntensityGroupsLegend from './foodscapes-intentisity-groups/legend';
import FoodscapesIntensityGroupsPopup from './foodscapes-intentisity-groups/popup';
// Foodscapes
import FoodscapesInfo from './foodscapes/info';
import FoodscapesLayer from './foodscapes/layer';
import FoodscapesLegend from './foodscapes/legend';
import FoodscapesPopup from './foodscapes/popup';
// Soils
import SoilGroupsLayer from './soil-groups/layer';
import SoilGroupsLegend from './soil-groups/legend';
import SoilGroupsPopup from './soil-groups/popup';

export const LAYERS = {
  foodscapes: FoodscapesLayer,
  'soil-groups': SoilGroupsLayer,
  'foodscapes-intensity-groups': FoodscapesIntensityGroupsLayer,
  crops: CropsLayer,
};

export const LEGENDS = {
  foodscapes: FoodscapesLegend,
  'soil-groups': SoilGroupsLegend,
  'foodscapes-intensity-groups': FoodscapesIntensityGroupsLegend,
  crops: CropsLegend,
};

export const POPUPS = {
  foodscapes: FoodscapesPopup,
  'soil-groups': SoilGroupsPopup,
  'foodscapes-intensity-groups': FoodscapesIntensityGroupsPopup,
  crops: CropsPopup,
};

export const INFO = {
  foodscapes: FoodscapesInfo,
};
