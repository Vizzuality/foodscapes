// Climate risk
import ClimateRiskInfo from './climate-risk/info.mdx';
import ClimateRiskLayer from './climate-risk/layer';
import ClimateRiskLegend from './climate-risk/legend';
import ClimateRiskPopup from './climate-risk/popup';
// Crops
import CropsInfo from './crops/info.mdx';
import CropsLayer from './crops/layer';
import CropsLegend from './crops/legend';
import CropsPopup from './crops/popup';
// Foodscapes intensity groups
import FoodscapesIntensitiesInfo from './foodscapes-intensities/info.mdx';
import FoodscapesIntensitiesLayer from './foodscapes-intensities/layer';
import FoodscapesIntensitiesLegend from './foodscapes-intensities/legend';
import FoodscapesIntensitiesPopup from './foodscapes-intensities/popup';
// Foodscapes
import FoodscapesInfo from './foodscapes/info.mdx';
import FoodscapesLayer from './foodscapes/layer';
import FoodscapesLegend from './foodscapes/legend';
import FoodscapesPopup from './foodscapes/popup';
// Land use risk
import LandUseInfo from './land-use-risks/info.mdx';
import LandUseLayer from './land-use-risks/layer';
import LandUseLegend from './land-use-risks/legend';
import LandUsePopup from './land-use-risks/popup';
// Pollution risk
import PollutionRiskInfo from './pollution-risk/info.mdx';
import PollutionRiskLayer from './pollution-risk/layer';
import PollutionRiskLegend from './pollution-risk/legend';
import PollutionRiskPopup from './pollution-risk/popup';

export const LAYERS = {
  foodscapes: FoodscapesLayer,
  'foodscapes-intensities': FoodscapesIntensitiesLayer,
  crops: CropsLayer,
  'climate-risk': ClimateRiskLayer,
  'land-use-risks': LandUseLayer,
  'pollution-risk': PollutionRiskLayer,
};

export const LEGENDS = {
  foodscapes: FoodscapesLegend,
  'foodscapes-intensities': FoodscapesIntensitiesLegend,
  crops: CropsLegend,
  'climate-risk': ClimateRiskLegend,
  'land-use-risks': LandUseLegend,
  'pollution-risk': PollutionRiskLegend,
};

export const POPUPS = {
  foodscapes: FoodscapesPopup,
  'foodscapes-intensities': FoodscapesIntensitiesPopup,
  crops: CropsPopup,
  'climate-risk': ClimateRiskPopup,
  'land-use-risks': LandUsePopup,
  'pollution-risk': PollutionRiskPopup,
};

export const INFO = {
  foodscapes: FoodscapesInfo,
  'foodscapes-intensities': FoodscapesIntensitiesInfo,
  crops: CropsInfo,
  'climate-risk': ClimateRiskInfo,
  'land-use-risks': LandUseInfo,
  'pollution-risk': PollutionRiskInfo,
};
