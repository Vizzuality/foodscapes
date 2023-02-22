import FoodscapesLayer from './foodscapes';
import FoodscapesLegend from './foodscapes/legend';
import SoilGroupsLayer from './soil-groups';
import SoilGroupsLegend from './soil-groups/legend';

export const LAYERS = {
  foodscapes: FoodscapesLayer,
  'soil-groups': SoilGroupsLayer,
};

export const LEGENDS = {
  foodscapes: FoodscapesLegend,
  'soil-groups': SoilGroupsLegend,
};
