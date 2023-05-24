import { useCallback } from 'react';

import { filtersOpenAtom } from 'store/explore-map';

import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import FoodscapesFilters from './foodscapes';

const Filters = () => {
  const open = useRecoilValue(filtersOpenAtom);
  const setOpen = useSetRecoilState(filtersOpenAtom);

  const handleFiltersClick = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  return (
    <>
      <motion.div
        whileHover={{ scaleY: 1.1 }}
        className="fixed bottom-0 left-0 flex w-full max-w-[640px] items-center space-x-4 overflow-hidden bg-navy-500 py-2 px-10"
        onClick={handleFiltersClick}
      >
        <p className="text-xs italic text-white">Filtering by:</p>
        <button
          type="button"
          className="cursor-pointer rounded-full bg-navy-400 p-2 text-xs font-bold uppercase"
        >
          Add filters
        </button>
      </motion.div>
      {open && (
        <div className="absolute z-20 h-full w-full max-w-[640px] space-y-8 bg-navy-500 px-20 pt-4 text-white">
          <div>
            <p className="text-xs italic text-white">Filtering by:</p>

            <button
              type="button"
              className="absolute top-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-white"
              onClick={handleFiltersClick}
            >
              <Icon icon={CLOSE_SVG} className="h-6 w-6 text-navy-500" />
            </button>
          </div>

          <div>
            <FoodscapesFilters />
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolor molestias odit ex
            earum voluptates et aliquid error, sunt, perferendis, commodi eum voluptate animi
            officia quos ipsam similique officiis dicta!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolor molestias odit ex
            earum voluptates et aliquid error, sunt, perferendis, commodi eum voluptate animi
            officia quos ipsam similique officiis dicta!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolor molestias odit ex
            earum voluptates et aliquid error, sunt, perferendis, commodi eum voluptate animi
            officia quos ipsam similique officiis dicta!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dolor molestias odit ex
            earum voluptates et aliquid error, sunt, perferendis, commodi eum voluptate animi
            officia quos ipsam similique officiis dicta!
          </p>
        </div>
      )}
    </>
  );
};

export default Filters;
