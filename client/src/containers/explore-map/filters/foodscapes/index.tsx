import { useMemo } from 'react';

import { filtersSelector, foodscapesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

import FiltersContent from 'containers/explore-map/filters/content';

import MultiSelect from 'components/ui/select/multi/component';

const FoodscapesFilters = () => {
  const foodscapesFilters = useRecoilValue(filtersSelector('foodscapes'));

  const foodscapes = useRecoilValue(foodscapesAtom);
  const setFoodscapes = useSetRecoilState(foodscapesAtom);

  const {
    data: foodscapesData,
    isPlaceholderData: foodscapesIsPlaceholderData,
    isFetching: foodscapesIsFetching,
    isFetched: foodscapesIsFetched,
    isError: foodscapesIsError,
  } = useFoodscapes();

  const {
    data: foodscapeData,
    isPlaceholderData: foodscapeIsPlaceholderData,
    isFetching: foodscapeIsFetching,
    isFetched: foodscapeIsFetched,
    isError: foodscapeIsError,
  } = useData<FoodscapeData>('foodscapes', foodscapesFilters);

  const OPTIONS_FOODSCAPES = useMemo(() => {
    if (!foodscapeData || !foodscapesData) return [];
    return foodscapesData.filter((c) => foodscapeData.map((d) => d.id).includes(c.value));
  }, [foodscapeData, foodscapesData]);

  return (
    <FiltersContent
      isPlaceholderData={foodscapesIsPlaceholderData || foodscapeIsPlaceholderData}
      isFetching={foodscapesIsFetched || foodscapeIsFetched}
      isFetched={foodscapesIsFetched && foodscapeIsFetched}
      isError={foodscapesIsError || foodscapeIsError}
    >
      <div className="space-y-1">
        <p className="font-sans text-xs font-bold">Global foodscapes</p>

        <MultiSelect
          id="foodscapes-multiselect"
          size="s"
          theme="dark"
          placeholder="Foodscapes"
          options={OPTIONS_FOODSCAPES}
          values={foodscapes as number[]}
          batchSelectionActive
          clearSelectionActive
          loading={foodscapesIsFetching || foodscapeIsFetching}
          onChange={(values) => setFoodscapes(values as number[])}
        />
      </div>
    </FiltersContent>
  );
};

export default FoodscapesFilters;
