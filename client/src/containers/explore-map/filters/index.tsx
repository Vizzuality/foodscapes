import { useCallback } from 'react';

import {
  climateRiskAtom,
  countryAtom,
  cropsAtom,
  filtersOpenAtom,
  foodscapesAtom,
  intensitiesAtom,
  landUseRiskAtom,
  pollutionRiskAtom,
  provinceAtom,
} from 'store/explore-map';

import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import AreasOfInterestFilters from 'containers/explore-map/filters/areas-of-interest';
import ClimateRisksFilters from 'containers/explore-map/filters/climate-risks';
import ClimateRisksSelected from 'containers/explore-map/filters/climate-risks/selected';
import CropsFilters from 'containers/explore-map/filters/crops';
import CropsSelected from 'containers/explore-map/filters/crops/selected';
import IntensitiesFilters from 'containers/explore-map/filters/foodscapes-intensities';
import IntensitiesSelected from 'containers/explore-map/filters/foodscapes-intensities/selected';
import FoodscapesSelected from 'containers/explore-map/filters/foodscapes/selected';
import LandUseFilters from 'containers/explore-map/filters/land-use-risks';
import LandUseSelected from 'containers/explore-map/filters/land-use-risks/selected';
import PollutionRisksFilters from 'containers/explore-map/filters/pollution-risks';
import PollutionRisksSelected from 'containers/explore-map/filters/pollution-risks/selected';

import Icon from 'components/icon';

import FOODSCAPES_SVG from 'svgs/tabs/tab-foodscapes.svg?sprite';
import LOCATIONS_SVG from 'svgs/tabs/tab-locations.svg?sprite';
import RISKS_SVG from 'svgs/tabs/tab-risks.svg?sprite';
import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import FoodscapesFilters from './foodscapes';

const Filters = () => {
  const open = useRecoilValue(filtersOpenAtom);
  const setOpen = useSetRecoilState(filtersOpenAtom);

  const setFoodscapes = useSetRecoilState(foodscapesAtom);
  const setIntensities = useSetRecoilState(intensitiesAtom);
  const setCrops = useSetRecoilState(cropsAtom);

  const setClimateChange = useSetRecoilState(climateRiskAtom);
  const setLandUseRisk = useSetRecoilState(landUseRiskAtom);
  const setPollution = useSetRecoilState(pollutionRiskAtom);

  const setCountry = useSetRecoilState(countryAtom);
  const setProvince = useSetRecoilState(provinceAtom);

  const handleFiltersClick = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const handleClearClick = useCallback(() => {
    setFoodscapes([]);
    setIntensities([]);
    setCrops([]);
    setClimateChange([]);
    setLandUseRisk([]);
    setPollution([]);
    setCountry(null);
    setProvince(null);

    setOpen(!open);
  }, [
    setFoodscapes,
    setIntensities,
    setCrops,
    setClimateChange,
    setLandUseRisk,
    setPollution,
    setCountry,
    setProvince,
    setOpen,
    open,
  ]);

  return (
    <>
      <motion.div
        whileHover={{ scaleY: 1.1 }}
        className="absolute bottom-0 left-0 z-10 flex w-full max-w-[640px] items-center space-x-4 overflow-hidden bg-navy-500 py-2 px-10"
        onClick={handleFiltersClick}
      >
        <p className="text-xs italic text-white">Filtering by:</p>

        <div className="flex flex-wrap space-x-2 space-y-2">
          {/* Foodscapes */}
          <FoodscapesSelected />
          <IntensitiesSelected />
          <CropsSelected />

          {/* Risks */}
          <LandUseSelected />
          <ClimateRisksSelected />
          <PollutionRisksSelected />

          <button
            type="button"
            className="cursor-pointer rounded-full bg-navy-400 p-2 text-xs font-bold uppercase"
          >
            Add filters
          </button>
        </div>
      </motion.div>

      {open && (
        <div className="absolute top-0 left-0 z-20 h-full w-full max-w-[640px] space-y-8 overflow-auto bg-navy-500 px-20 py-4 text-white">
          <div>
            <p className="text-xs italic text-white">Filtering by:</p>

            <button
              type="button"
              className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white"
              onClick={handleFiltersClick}
            >
              <Icon icon={CLOSE_SVG} className="h-6 w-6 text-navy-500" />
            </button>
          </div>

          <div>
            <div className="flex items-center justify-center space-x-2">
              <Icon icon={FOODSCAPES_SVG} className="h-6 w-6 text-white" />
              <h3 className="font-display text-2xl">Foodscapes</h3>
            </div>

            <div className="space-y-4">
              <FoodscapesFilters />
              <IntensitiesFilters />
              <CropsFilters />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center space-x-2">
              <Icon icon={RISKS_SVG} className="h-6 w-6 text-white" />
              <h3 className="font-display text-2xl">Risks</h3>
            </div>

            <div className="space-y-4">
              <LandUseFilters />
              <ClimateRisksFilters />
              <PollutionRisksFilters />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center space-x-2">
              <Icon icon={LOCATIONS_SVG} className="h-6 w-6 text-white" />
              <h3 className="font-display text-2xl">Locations</h3>
            </div>

            <AreasOfInterestFilters />
          </div>

          <div className="flex justify-end space-x-4 text-xs">
            <button type="button" className="italic underline" onClick={handleClearClick}>
              Clear all filters
            </button>

            <button type="button" className="h-6 w-12 bg-navy-400" onClick={handleFiltersClick}>
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
