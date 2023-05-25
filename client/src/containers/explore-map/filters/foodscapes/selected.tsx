import { useMemo } from 'react';

import cn from 'lib/classnames';

import { filtersSelector, foodscapesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

const FoodscapesSelected = () => {
  const filters = useRecoilValue(filtersSelector('foodscapes'));
  const foodscapes = useRecoilValue(foodscapesAtom);
  const setFoodscapes = useSetRecoilState(foodscapesAtom);

  const { data: foodscapesData } = useFoodscapes();

  const { data } = useData<FoodscapeData>('foodscapes', filters);

  const OPTIONS = useMemo(() => {
    if (!data || !foodscapesData) return [];
    return foodscapesData.filter((c) => data.map((d) => d.id).includes(c.value));
  }, [data, foodscapesData]);

  const SELECTED = useMemo(() => {
    if (foodscapes.length === 1) {
      const opt = OPTIONS.find((o) => o.value === foodscapes[0]);
      return opt?.label;
    }

    if (foodscapes.length === OPTIONS.length) return 'All foodscapes';

    if (foodscapes.length > 1) return `${foodscapes.length} foodscapes`;

    return null;
  }, [OPTIONS, foodscapes]);

  const handleClearClick = () => {
    setFoodscapes([]);
  };

  return (
    <div
      className={cn({
        'flex items-center justify-between space-x-2 rounded-3xl bg-white p-1 pl-2': true,
        hidden: !foodscapes.length,
      })}
    >
      <p className="text-xs font-bold uppercase text-navy-500">{SELECTED}</p>

      <button
        type="button"
        className="flex items-center justify-center rounded-full bg-navy-500 p-1"
        onClick={handleClearClick}
      >
        <Icon icon={CLOSE_SVG} className="h-3 w-3 text-white" />
      </button>
    </div>
  );
};

export default FoodscapesSelected;
