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

  const {
    data: intensityData,
    isPlaceholderData: intensityIsPlaceholderData,
    isFetching: intensityIsFetching,
    isFetched: intensityIsFetched,
    isError: intensityIsError,
  } = useData<FoodscapeIntensityData>('foodscapes-intensities', intensitiesFilters);

  const OPTIONS_INTENSITIES = useMemo(() => {
    if (!intensityData) return [];
    return intensitiesData.filter((c) => intensityData.map((d) => d.id).includes(c.value));
  }, [intensityData, intensitiesData]);

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Foodscapes intensity</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={intensitiesIsPlaceholderData || intensityIsPlaceholderData}
        isFetching={intensitiesIsFetched || intensityIsFetched}
        isFetched={intensitiesIsFetched && intensityIsFetched}
        isError={intensitiesIsError || intensityIsError}
      >
        <MultiSelect
          id="foodscapes-multiselect"
          size="s"
          theme="dark"
          placeholder="Intensity groups"
          options={OPTIONS_INTENSITIES}
          values={intensities as number[]}
          batchSelectionActive
          clearSelectionActive
          loading={intensitiesIsFetching || intensityIsFetching}
          onChange={(values) => setIntensities(values as number[])}
        />
      </FiltersContent>
    </div>
  );
};

export default IntensitiesFilters;
