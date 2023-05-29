import { useMemo } from 'react';

import { filtersSelector, intensitiesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeIntensityData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import FiltersContent from 'containers/explore-map/filters/content';

import MultiSelect from 'components/ui/select/multi/component';

const IntensitiesFilters = () => {
  const intensitiesFilters = useRecoilValue(filtersSelector('intensities'));

  const intensities = useRecoilValue(intensitiesAtom);
  const setIntensities = useSetRecoilState(intensitiesAtom);

  const {
    data: intensitiesData,
    isPlaceholderData: intensitiesIsPlaceholderData,
    isFetching: intensitiesIsFetching,
    isFetched: intensitiesIsFetched,
    isError: intensitiesIsError,
  } = useFoodscapesIntensities();

  const { data, isPlaceholderData, isFetching, isFetched, isError } =
    useData<FoodscapeIntensityData>('foodscapes-intensities', intensitiesFilters);

  const OPTIONS = useMemo(() => {
    if (!data || !intensitiesData) return [];
    return intensitiesData.map((c) => ({
      ...c,
      disabled: !data.map((d) => d.id).includes(c.value),
    }));
  }, [data, intensitiesData]);

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Foodscapes intensity</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={intensitiesIsPlaceholderData || isPlaceholderData}
        isFetching={intensitiesIsFetched || isFetched}
        isFetched={intensitiesIsFetched && isFetched}
        isError={intensitiesIsError || isError}
      >
        <MultiSelect
          id="foodscapes-multiselect"
          size="s"
          theme="dark"
          placeholder="Select..."
          options={OPTIONS}
          values={intensities as number[]}
          batchSelectionActive
          clearSelectionActive
          loading={intensitiesIsFetching || isFetching}
          onChange={(values) => setIntensities(values as number[])}
        />
      </FiltersContent>
    </div>
  );
};

export default IntensitiesFilters;
