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
};

export const LEGENDS = {
  foodscapes: FoodscapesLegend,
  'soil-groups': SoilGroupsLegend,
};

export const POPUPS = {
  foodscapes: FoodscapesPopup,
  'soil-groups': SoilGroupsPopup,
};

export const INFO = {
  foodscapes: FoodscapesInfo,
};
