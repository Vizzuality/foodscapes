import FoodscapesLayer from './foodscapes';
import FoodscapesInfo from './foodscapes/info';
import FoodscapesLegend from './foodscapes/legend';
import FoodscapesPopup from './foodscapes/popup';
import SoilGroupsLayer from './soil-groups';
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
