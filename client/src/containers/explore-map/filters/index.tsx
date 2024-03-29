import { useCallback } from 'react';

import { GAEvent } from 'lib/analytics/ga';
import cn from 'lib/classnames';

import {
  caseStudyAtom,
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

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import CaseStudiesFilters from 'containers/explore-map/filters/case-studies';
import CaseStudiesSelected from 'containers/explore-map/filters/case-studies/selected';

import Icon from 'components/icon';

import CASE_STUDIES_SVG from 'svgs/tabs/tab-casestudies.svg?sprite';
import FOODSCAPES_SVG from 'svgs/tabs/tab-foodscapes.svg?sprite';
import LOCATIONS_SVG from 'svgs/tabs/tab-locations.svg?sprite';
import RISKS_SVG from 'svgs/tabs/tab-risks.svg?sprite';
import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import ClimateRisksFilters from './climate-risks';
import ClimateRisksSelected from './climate-risks/selected';
import CountriesFilters from './countries';
import CountriesSelected from './countries/selected';
import CropsFilters from './crops';
import CropsSelected from './crops/selected';
import FoodscapesFilters from './foodscapes';
import IntensitiesFilters from './foodscapes-intensities';
import IntensitiesSelected from './foodscapes-intensities/selected';
import FoodscapesSelected from './foodscapes/selected';
import LandUseFilters from './land-use-risks';
import LandUseSelected from './land-use-risks/selected';
import PollutionRisksFilters from './pollution-risks';
import PollutionRisksSelected from './pollution-risks/selected';
import ProvincesFilters from './provinces';
import ProvincesSelected from './provinces/selected';

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

  const setCaseStudy = useSetRecoilState(caseStudyAtom);

  const handleFiltersClick = useCallback(() => {
    GAEvent({
      action: 'filter_open',
      params: {},
    });

    setOpen(!open);
  }, [open, setOpen]);

  const handleClearClick = useCallback(
    (e) => {
      e.stopPropagation();
      setFoodscapes([]);
      setIntensities([]);
      setCrops([]);
      setClimateChange([]);
      setLandUseRisk([]);
      setPollution([]);
      setCountry(null);
      setProvince(null);
      setCaseStudy(null);

      GAEvent({
        action: 'filter_clear_all',
        params: {},
      });

      setOpen(!open);
    },
    [
      setFoodscapes,
      setIntensities,
      setCrops,
      setClimateChange,
      setLandUseRisk,
      setPollution,
      setCountry,
      setProvince,
      setCaseStudy,
      setOpen,
      open,
    ]
  );

  return (
    <>
      <div
        className={cn({
          'group sticky bottom-0 left-0 z-10 w-full cursor-pointer bg-navy-500': true,
        })}
        onClick={handleFiltersClick}
      >
        <div
          className={cn({
            'flex items-start space-x-6 overflow-hidden bg-navy-500 py-4 px-10 transition-transform':
              true,
            'group-hover:-translate-y-1': true,
          })}
        >
          <p className="shrink-0 py-1.5 text-xs italic text-white">Filtering by:</p>

          <div className="flex flex-wrap gap-2">
            {/* Foodscapes */}
            <FoodscapesSelected />
            {/* <FoodscapesGroupsSelected /> */}
            <IntensitiesSelected />
            <CropsSelected />
            {/* <CropsGroupsSelected /> */}

            {/* Risks */}
            <LandUseSelected />
            <ClimateRisksSelected />
            <PollutionRisksSelected />

            {/* Locations */}
            <CountriesSelected />
            <ProvincesSelected />

            {/* Case Studies */}
            <CaseStudiesSelected />

            <button
              type="button"
              className="mr-3 cursor-pointer rounded-3xl bg-navy-400 py-1 px-2 text-xs font-bold uppercase transition-colors hover:bg-white"
            >
              Add filters
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="filters"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ bounce: 0 }}
            className="absolute top-0 left-0 z-20 h-full w-full max-w-[640px] space-y-8 overflow-auto bg-navy-500 px-20 py-4 text-white"
          >
            <div>
              <p className="text-xs italic text-white">Filtering by:</p>

              <button
                type="button"
                className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-navy-200"
                onClick={handleFiltersClick}
              >
                <Icon icon={CLOSE_SVG} className="h-4 w-4 text-navy-500" />
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

              <div className="space-y-4">
                <CountriesFilters />
                <ProvincesFilters />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center space-x-2">
                <Icon icon={CASE_STUDIES_SVG} className="h-6 w-6 text-white" />
                <h3 className="font-display text-2xl">Case Studies</h3>
              </div>

              <div>
                <CaseStudiesFilters />
              </div>
            </div>

            <div className="flex justify-end space-x-4 text-xs">
              <button type="button" className="italic underline" onClick={handleClearClick}>
                Clear all filters
              </button>

              <button
                type="button"
                className="h-6 w-12 rounded bg-navy-400 px-1"
                onClick={handleFiltersClick}
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Filters;
