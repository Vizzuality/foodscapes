import { useMemo } from 'react';

import { filtersSelector, foodscapesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapesGroups } from 'hooks/foodscapes';

import FilterSelected from 'containers/explore-map/filters/selected';

const FoodscapesGroupsSelected = () => {
  const filters = useRecoilValue(filtersSelector('foodscapes'));
  const foodscapes = useRecoilValue(foodscapesAtom);
  const setFoodscapes = useSetRecoilState(foodscapesAtom);

  const { data: foodscapesGroupData } = useFoodscapesGroups();

  const { data } = useData<FoodscapeData>('foodscapes', filters);

  const GROUPED_OPTIONS = useMemo(() => {
    if (!data || !foodscapesGroupData) return [];
    return foodscapesGroupData.filter((c) => data.map((d) => d.parent_id).includes(c.value));
  }, [data, foodscapesGroupData]);

  const GROUPED_SELECTED = useMemo<number[]>(() => {
    if (!data || !foodscapesGroupData) return [];
    return (
      foodscapesGroupData
        //
        .filter((g) => {
          const ids = g.values
            .filter((v) => data.map((d) => d.id).includes(v.value))
            .map((v) => v.value);

          return ids.length && ids.some((i) => foodscapes.includes(i));
        })
        .map((g) => g.value)
    );
  }, [data, foodscapesGroupData, foodscapes]);

  const SELECTED = useMemo(() => {
    if (GROUPED_SELECTED.length === 1) {
      const opt = GROUPED_OPTIONS.find((o) => o.value === GROUPED_SELECTED[0]);
      return opt?.label;
    }

    if (GROUPED_SELECTED.length === GROUPED_OPTIONS.length) return 'All soil groups';

    if (GROUPED_SELECTED.length > 1) return `${GROUPED_SELECTED.length} soil groups`;

    return null;
  }, [GROUPED_OPTIONS, GROUPED_SELECTED]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setFoodscapes([]);
  };

  return (
    <FilterSelected
      text={SELECTED}
      visible={!!GROUPED_SELECTED.length}
      onClear={handleClearClick}
    />
  );
};

export default FoodscapesGroupsSelected;
