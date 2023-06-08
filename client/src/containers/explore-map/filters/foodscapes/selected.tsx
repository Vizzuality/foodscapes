import { useMemo } from 'react';

import { filtersSelector, foodscapesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

import FilterSelected from 'containers/explore-map/filters/selected';

const FoodscapesSelected = () => {
  const filters = useRecoilValue(filtersSelector('foodscapes'));
  const foodscapes = useRecoilValue(foodscapesAtom);
  const setFoodscapes = useSetRecoilState(foodscapesAtom);

  const { data: foodscapesData, isFetched: foodscapesIsFetched } = useFoodscapes();

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

  const POPOVER_SELECTED = useMemo(() => {
    const selected = OPTIONS.filter((o) => foodscapes.includes(o.value));
    return selected;
  }, [OPTIONS, foodscapes]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setFoodscapes([]);
  };

  return (
    foodscapesIsFetched && (
      <FilterSelected
        text={SELECTED}
        popover={POPOVER_SELECTED}
        visible={!!foodscapes.length}
        onClear={handleClearClick}
      />
    )
  );
};

export default FoodscapesSelected;
