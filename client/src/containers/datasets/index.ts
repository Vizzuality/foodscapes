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
// Protected areas
import ProtectedAreasInfo from './protected-areas/info.mdx';
import ProtectedAreasLayer from './protected-areas/layer';
import ProtectedAreasLegend from './protected-areas/legend';
// Restorations
import RestorationsInfo from './restorations/info.mdx';
import RestorationsLayer from './restorations/layer';
import RestorationsLegend from './restorations/legend';
import RestorationsPopup from './restorations/popup';
// Soil health
import SoilHealthsInfo from './soil-healths/info.mdx';
import SoilHealthsLayer from './soil-healths/layer';
import SoilHealthsLegend from './soil-healths/legend';
import SoilHealthsPopup from './soil-healths/popup';

// import ProtectedAreasPopup from './protected-areas/popup';

export const LAYERS = {
  foodscapes: FoodscapesLayer,
  'foodscapes-intensities': FoodscapesIntensitiesLayer,
  crops: CropsLayer,
  'climate-risks': ClimateRiskLayer,
  'land-use-risks': LandUseLayer,
  'pollution-risks': PollutionRiskLayer,
  restorations: RestorationsLayer,
  agroforestries: AgroforestriesLayer,
  'soil-healths': SoilHealthsLayer,
  'protected-areas': ProtectedAreasLayer,
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
  'soil-healths': SoilHealthsLegend,
  'protected-areas': ProtectedAreasLegend,
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
  'soil-healths': SoilHealthsPopup,
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
  'soil-healths': SoilHealthsInfo,
  'protected-areas': ProtectedAreasInfo,
};
