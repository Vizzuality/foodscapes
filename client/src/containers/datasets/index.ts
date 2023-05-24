// Agroforestries
import AgroforestriesInfo from './agroforestries/info.mdx';
import AgroforestriesLayer from './agroforestries/layer';
import AgroforestriesLegend from './agroforestries/legend';
import AgroforestriesPopup from './agroforestries/popup';
// Climate risk
import ClimateRiskInfo from './climate-risks/info.mdx';
import ClimateRiskLayer from './climate-risks/layer';
import ClimateRiskLegend from './climate-risks/legend';
import ClimateRiskPopup from './climate-risks/popup';
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
import PollutionRiskInfo from './pollution-risks/info.mdx';
import PollutionRiskLayer from './pollution-risks/layer';
import PollutionRiskLegend from './pollution-risks/legend';
import PollutionRiskPopup from './pollution-risks/popup';
// Restorations
import RestorationsInfo from './restorations/info.mdx';
import RestorationsLayer from './restorations/layer';
import RestorationsLegend from './restorations/legend';
import RestorationsPopup from './restorations/popup';

export const LAYERS = {
  foodscapes: FoodscapesLayer,
  'foodscapes-intensities': FoodscapesIntensitiesLayer,
  crops: CropsLayer,
  'climate-risks': ClimateRiskLayer,
  'land-use-risks': LandUseLayer,
  'pollution-risks': PollutionRiskLayer,
  restorations: RestorationsLayer,
  agroforestries: AgroforestriesLayer,
};

export const LEGENDS = {
  foodscapes: FoodscapesLegend,
  'foodscapes-intensities': FoodscapesIntensitiesLegend,
  crops: CropsLegend,
  'climate-risks': ClimateRiskLegend,
  'land-use-risks': LandUseLegend,
  'pollution-risks': PollutionRiskLegend,
  restorations: RestorationsLegend,
  agroforestries: AgroforestriesLegend,
};

export const POPUPS = {
  foodscapes: FoodscapesPopup,
  'foodscapes-intensities': FoodscapesIntensitiesPopup,
  crops: CropsPopup,
  'climate-risks': ClimateRiskPopup,
  'land-use-risks': LandUsePopup,
  'pollution-risks': PollutionRiskPopup,
  restorations: RestorationsPopup,
  agroforestries: AgroforestriesPopup,
};

export const INFO = {
  foodscapes: FoodscapesInfo,
  'foodscapes-intensities': FoodscapesIntensitiesInfo,
  crops: CropsInfo,
  'climate-risks': ClimateRiskInfo,
  'land-use-risks': LandUseInfo,
  'pollution-risks': PollutionRiskInfo,
  restorations: RestorationsInfo,
  agroforestries: AgroforestriesInfo,
};
