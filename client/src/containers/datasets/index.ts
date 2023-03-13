// Crop Groups
import CropGroupsLayer from './crops-groups/layer';
import CropGroupsLegend from './crops-groups/legend';
import CropGroupsPopup from './crops-groups/popup';
// Crops
import CropsLayer from './crops/layer';
import CropsLegend from './crops/legend';
import CropsPopup from './crops/popup';
// Foodscapes intensity groups
import FoodscapesIntensityGroupsLayer from './foodscapes-intentisity-groups/layer';
import FoodscapesIntensityGroupsLegend from './foodscapes-intentisity-groups/legend';
import FoodscapesIntensityGroupsPopup from './foodscapes-intentisity-groups/popup';
// Foodscapes
import FoodscapesInfo from './foodscapes/info';
import FoodscapesLayer from './foodscapes/layer';
import FoodscapesLegend from './foodscapes/legend';
import FoodscapesPopup from './foodscapes/popup';
// Land Use Change
import LandUseChangeLayer from './land-use-change/layer';
import LandUseChangeLegend from './land-use-change/legend';
import LandUseChangePopup from './land-use-change/popup';
// Soils
import SoilGroupsLayer from './soil-groups/layer';
import SoilGroupsLegend from './soil-groups/legend';
import SoilGroupsPopup from './soil-groups/popup';

export const LAYERS = {
  foodscapes: FoodscapesLayer,
  'soil-groups': SoilGroupsLayer,
  'foodscapes-intensity-groups': FoodscapesIntensityGroupsLayer,
  crops: CropsLayer,
  'crop-groups': CropGroupsLayer,
  'land-use-change': LandUseChangeLayer,
};

export const LEGENDS = {
  foodscapes: FoodscapesLegend,
  'soil-groups': SoilGroupsLegend,
  'foodscapes-intensity-groups': FoodscapesIntensityGroupsLegend,
  crops: CropsLegend,
  'crop-groups': CropGroupsLegend,
  'land-use-change': LandUseChangeLegend,
};

export const POPUPS = {
  foodscapes: FoodscapesPopup,
  'soil-groups': SoilGroupsPopup,
  'foodscapes-intensity-groups': FoodscapesIntensityGroupsPopup,
  crops: CropsPopup,
  'crop-groups': CropGroupsPopup,
  'land-use-change': LandUseChangePopup,
};

export const INFO = {
  foodscapes: FoodscapesInfo,
};
