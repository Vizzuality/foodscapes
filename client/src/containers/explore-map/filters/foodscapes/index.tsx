import { useMemo } from 'react';

import { cropsAtom, filtersSelector, foodscapesAtom, intensitiesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CropData, FoodscapeData, FoodscapeIntensityData } from 'types/data';

import { useCrops } from 'hooks/crops';
import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import FiltersContent from 'containers/explore-map/filters/content';

import Icon from 'components/icon';
import MultiSelect from 'components/ui/select/multi/component';

import FOODSCAPES_SVG from 'svgs/tabs/tab-foodscapes.svg?sprite';

const FoodscapesFilters = () => {
  const foodscapesFilters = useRecoilValue(filtersSelector('foodscapes'));
  const intensitiesFilters = useRecoilValue(filtersSelector('intensities'));
  const cropsFilters = useRecoilValue(filtersSelector('crops'));

  const foodscapes = useRecoilValue(foodscapesAtom);
  const setFoodscapes = useSetRecoilState(foodscapesAtom);

  const intensities = useRecoilValue(intensitiesAtom);
  const setIntensities = useSetRecoilState(intensitiesAtom);

  const crops = useRecoilValue(cropsAtom);
  const setCrops = useSetRecoilState(cropsAtom);

  const {
    data: foodscapesData,
    isPlaceholderData: foodscapesIsPlaceholderData,
    isFetching: foodscapesIsFetching,
    isFetched: foodscapesIsFetched,
    isError: foodscapesIsError,
  } = useFoodscapes();

  const {
    data: intensitiesData,
    isPlaceholderData: intensitiesIsPlaceholderData,
    isFetching: intensitiesIsFetching,
    isFetched: intensitiesIsFetched,
    isError: intensitiesIsError,
  } = useFoodscapesIntensities();

  const {
    data: cropsData,
    isPlaceholderData: cropsIsPlaceholderData,
    isFetching: cropsIsFetching,
    isFetched: cropsIsFetched,
    isError: cropsIsError,
  } = useCrops();

  const {
    data: foodscapeData,
    isPlaceholderData: foodscapeIsPlaceholderData,
    isFetching: foodscapeIsFetching,
    isFetched: foodscapeIsFetched,
    isError: foodscapeIsError,
  } = useData<FoodscapeData>('foodscapes', foodscapesFilters);

  const {
    data: intensityData,
    isPlaceholderData: intensityIsPlaceholderData,
    isFetching: intensityIsFetching,
    isFetched: intensityIsFetched,
    isError: intensityIsError,
  } = useData<FoodscapeIntensityData>('foodscapes-intensities', intensitiesFilters);

  const {
    data: cropData,
    isPlaceholderData: cropIsPlaceholderData,
    isFetching: cropIsFetching,
    isFetched: cropIsFetched,
    isError: cropIsError,
  } = useData<CropData>('crops', cropsFilters);

  const OPTIONS_FOODSCAPES = useMemo(() => {
    if (!foodscapeData || !foodscapesData) return [];
    return foodscapesData.filter((c) => foodscapeData.map((d) => d.id).includes(c.value));
  }, [foodscapeData, foodscapesData]);

  const OPTIONS_INTENSITIES = useMemo(() => {
    if (!intensityData) return [];
    return intensitiesData.filter((c) => intensityData.map((d) => d.id).includes(c.value));
  }, [intensityData, intensitiesData]);

  const OPTIONS_CROPS = useMemo(() => {
    return cropsData.filter((c) => cropData.map((d) => d.id).includes(c.value));
  }, [cropData, cropsData]);

  return (
    <div>
      <div className="flex items-center justify-center space-x-2">
        <Icon icon={FOODSCAPES_SVG} className="h-6 w-6 text-white" />
        <h3 className="font-display text-2xl">Foodscapes</h3>
      </div>

      <FiltersContent
        isPlaceholderData={
          foodscapesIsPlaceholderData ||
          foodscapeIsPlaceholderData ||
          intensitiesIsPlaceholderData ||
          intensityIsPlaceholderData ||
          cropsIsPlaceholderData ||
          cropIsPlaceholderData
        }
        isFetching={
          foodscapesIsFetched ||
          foodscapeIsFetched ||
          intensitiesIsFetched ||
          intensityIsFetched ||
          cropsIsFetching ||
          cropIsFetching
        }
        isFetched={
          foodscapesIsFetched &&
          foodscapeIsFetched &&
          intensitiesIsFetched &&
          intensityIsFetched &&
          cropsIsFetched &&
          cropIsFetched
        }
        isError={
          foodscapesIsError ||
          foodscapeIsError ||
          intensitiesIsError ||
          intensityIsError ||
          cropsIsError ||
          cropIsError
        }
      >
        <div className="space-y-4">
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

          <div className="space-y-1">
            <p className="font-sans text-xs font-bold">Foodscapes intensity</p>

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
          </div>

          <div className="space-y-1">
            <p className="font-sans text-xs font-bold">Crop production</p>

            <MultiSelect
              id="crops-multiselect"
              size="s"
              theme="dark"
              placeholder="Crops"
              options={OPTIONS_CROPS}
              values={crops as number[]}
              batchSelectionActive
              clearSelectionActive
              loading={cropsIsFetching || cropIsFetching}
              onChange={(values) => setCrops(values as number[])}
            />
          </div>
        </div>
      </FiltersContent>
    </div>
  );
};

export default FoodscapesFilters;
