import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import { filtersSelector, intensitiesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeIntensityData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';
import { getArrayValue } from 'hooks/utils';

import { DATASETS } from 'constants/datasets';

import { WidgetHeader, WidgetTop, WidgetContent } from 'containers/widget';

import MultiSelect from 'components/ui/select/multi/component';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const ChartTop = dynamic(() => import('./chart/top'), { ssr: false });

const FoodscapesIntensitiesWidget = () => {
  const filters = useRecoilValue(filtersSelector('intensities'));

  const DATASET = DATASETS.find((d) => d.id === 'foodscapes-intensities');

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
    useData<FoodscapeIntensityData>('foodscapes-intensities', filters);

  const OPTIONS = useMemo(() => {
    if (!data) return [];
    return intensitiesData.filter((c) => data.map((d) => d.id).includes(c.value));
  }, [data, intensitiesData]);

  const handleBarClick = (key: number) => {
    setIntensities((prev) => getArrayValue(prev, key));
  };

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title={DATASET.label} dataset={DATASET} />

      <div className="space-y-2">
        <p>Intensity groups are inclusive of the land management attributes of an area.</p>
      </div>

      <WidgetContent
        isPlaceholderData={isPlaceholderData || intensitiesIsPlaceholderData}
        isFetching={isFetching || intensitiesIsFetching}
        isFetched={isFetched && intensitiesIsFetched}
        isError={isError || intensitiesIsError}
      >
        <div className="space-y-5">
          <MultiSelect
            id="foodscapes-multiselect"
            size="s"
            theme="light"
            placeholder="Filter intensities"
            options={OPTIONS}
            values={intensities as number[]}
            batchSelectionActive
            clearSelectionActive
            loading={intensitiesIsFetching}
            onChange={(values) => setIntensities(values as number[])}
          />
          <div className="h-8">
            <Chart
              //
              selected={intensities}
              ignore={null}
              onBarClick={handleBarClick}
              interactive
            />
          </div>

          <WidgetTop label="Top largest foodscapes intensities">
            <ChartTop onBarClick={handleBarClick} />
          </WidgetTop>
        </div>
      </WidgetContent>
    </section>
  );
};

export default FoodscapesIntensitiesWidget;
