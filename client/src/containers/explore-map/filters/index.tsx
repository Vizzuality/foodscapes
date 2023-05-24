import { useCallback, useMemo } from 'react';

import { filtersOpenAtom, filtersSelector } from 'store/explore-map';

import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import CropsFilters from 'containers/explore-map/filters/crops';
import IntensitiesFilters from 'containers/explore-map/filters/foodscapes-intensities';
import RisksFilters from 'containers/explore-map/filters/risks';

import Icon from 'components/icon';

import FOODSCAPES_SVG from 'svgs/tabs/tab-foodscapes.svg?sprite';
// import LOCATIONS_SVG from 'svgs/tabs/tab-locations.svg?sprite';
// import OPPORTUNITIES_SVG from 'svgs/tabs/tab-opportunities.svg?sprite';
// import RISKS_SVG from 'svgs/tabs/tab-risks.svg?sprite';
import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import FoodscapesFilters from './foodscapes';

const Filters = () => {
  const open = useRecoilValue(filtersOpenAtom);
  const setOpen = useSetRecoilState(filtersOpenAtom);

  const foodscapesFilters = useRecoilValue(filtersSelector('province'));

  const handleFiltersClick = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const SELECTED_FOODSCAPES = useMemo(() => {
    if (foodscapesFilters?.foodscapes.length > 1)
      return `${foodscapesFilters?.foodscapes.length} foodscapes selected`;

    return null;
  }, [foodscapesFilters?.foodscapes.length]);

  return (
    <>
      <motion.div
        whileHover={{ scaleY: 1.1 }}
        className="fixed bottom-0 left-0 z-10 flex w-full max-w-[640px] items-center space-x-4 overflow-hidden bg-navy-500 py-2 px-10"
        onClick={handleFiltersClick}
      >
        <p className="text-xs italic text-white">Filtering by:</p>

        <p className="text-white">{SELECTED_FOODSCAPES}</p>
        <button
          type="button"
          className="cursor-pointer rounded-full bg-navy-400 p-2 text-xs font-bold uppercase"
        >
          Add filters
        </button>
      </motion.div>

      {open && (
        <div className="fixed top-0 left-0 h-full w-full max-w-[640px] space-y-8 bg-navy-500 px-20 pt-4 text-white">
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
            <RisksFilters />
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
