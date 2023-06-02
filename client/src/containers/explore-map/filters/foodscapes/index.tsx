import { useCallback, useMemo } from 'react';

import { filtersSelector, foodscapesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapes, useFoodscapesGroups } from 'hooks/foodscapes';

import FiltersContent from 'containers/explore-map/filters/content';

import MultiSelect from 'components/ui/select/multi/component';

const FoodscapesFilters = () => {
  const filters = useRecoilValue(filtersSelector('foodscapes'));

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
    data: foodscapesGroupData,
    isPlaceholderData: foodscapesGroupIsPlaceholderData,
    isFetching: foodscapesGroupIsFetching,
    isFetched: foodscapesGroupIsFetched,
    isError: foodscapesGroupIsError,
  } = useFoodscapesGroups();

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<FoodscapeData>(
    'foodscapes',
    filters
  );

  const OPTIONS = useMemo(() => {
    return foodscapesData.map((c) => ({
      ...c,
      disabled: !data.map((d) => d.id).includes(c.value),
    }));
  }, [data, foodscapesData]);

  const GROUPED_OPTIONS = useMemo(() => {
    if (!data || !foodscapesGroupData) return [];

    return foodscapesGroupData.map((c) => ({
      ...c,
      disabled: !data.map((d) => d.parent_id).includes(c.value),
    }));
  }, [data, foodscapesGroupData]);

  const GROUPED_SELECTED = useMemo<number[]>(() => {
    if (!data || !foodscapesGroupData) return [];
    return (
      foodscapesGroupData
        //
        .filter((g) => {
          const ids = g.values.map((v) => v.value);
          // .filter((v) => data.map((d) => d.id).includes(v.value))

          return ids.length && ids.some((i) => foodscapes.includes(i));
        })
        .map((g) => g.value)
    );
  }, [data, foodscapesGroupData, foodscapes]);

  const handleSelectGroupOnChange = useCallback(
    (values: number[]) => {
      const newFoodscapes = [...foodscapes];

      values.forEach((v) => {
        const ids = foodscapesData
          .filter((v1) => data.map((d) => d.id).includes(v1.value))
          .filter((d) => d.parentId === v)
          .map((d) => d.value);

        ids.forEach((i) => {
          const index = newFoodscapes.findIndex((f) => f === i);
          if (index === -1) {
            newFoodscapes.push(i);
          }
        });
      });

      // Remove foodscapes that are not in the selected groups
      GROUPED_SELECTED.forEach((g: number) => {
        if (!values.includes(g)) {
          const ids = foodscapesData.filter((d) => d.parentId === g).map((d) => d.value);
          ids.forEach((i) => {
            const index = newFoodscapes.findIndex((f) => f === i);
            newFoodscapes.splice(index, 1);
          });
        }
      });

      setFoodscapes(newFoodscapes);
    },
    [data, foodscapes, foodscapesData, GROUPED_SELECTED, setFoodscapes]
  );

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Global foodscapes</p>

      <FiltersContent
        skeletonClassname="h-[76px]"
        isPlaceholderData={
          isPlaceholderData || foodscapesIsPlaceholderData || foodscapesGroupIsPlaceholderData
        }
        isFetching={isFetching || foodscapesIsFetching || foodscapesGroupIsFetching}
        isFetched={isFetched && foodscapesIsFetched && foodscapesGroupIsFetched}
        isError={isError || foodscapesIsError || foodscapesGroupIsError}
      >
        <div className="space-y-2">
          <MultiSelect
            id="foodscapes-multiselect"
            size="s"
            theme="dark"
            placeholder="All foodscapes"
            options={OPTIONS}
            values={foodscapes as number[]}
            batchSelectionActive
            clearSelectionActive
            loading={foodscapesIsFetching || isFetching}
            onChange={(values) => setFoodscapes(values as number[])}
          />

          <MultiSelect
            id="foodscapes-groups-multiselect"
            size="s"
            theme="dark"
            placeholder="All foodscapes groups"
            options={GROUPED_OPTIONS}
            values={GROUPED_SELECTED}
            batchSelectionActive
            clearSelectionActive
            loading={foodscapesGroupIsFetching || isFetching}
            onChange={handleSelectGroupOnChange}
          />
        </div>
      </FiltersContent>
    </div>
  );
};

export default FoodscapesFilters;
