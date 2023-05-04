import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import { filtersSelector, intensitiesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeIntensityData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import { DATASETS } from 'constants/datasets';

import { WidgetHeader, WidgetTop } from 'containers/widget';
import WidgetContent from 'containers/widget/content';

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
    isFetching: intensitiesIsFetching,
    isFetched: intensitiesIsFetched,
    isError: intensitiesIsError,
  } = useFoodscapesIntensities();

  const { data, isFetching, isFetched, isError } = useData<FoodscapeIntensityData>({
    sql: DATASET.widget.sql,
    shape: 'array',
    ...filters,
  });

  const OPTIONS = useMemo(() => {
    return intensitiesData.filter((c) => data.map((d) => d.id).includes(c.value));
  }, [data, intensitiesData]);

  const handleBarClick = (key: number) => {
    setIntensities((prev) => {
      const fs = [...prev];

      // push or slice key in fs array base on index
      const index = fs.findIndex((f) => f === key);

      if (index === -1) {
        fs.push(key);
      } else {
        fs.splice(index, 1);
      }

      return fs;
    });
  };

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title="Foodscapes Intensity" dataset={DATASET} />

      <div className="space-y-2">
        <p className="font-light">
          Intensity groups are inclusive of the land management attributes of an area.
        </p>
      </div>

      <WidgetContent
        isFetching={isFetching || intensitiesIsFetching}
        isFetched={isFetched || intensitiesIsFetched}
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
              dataset={DATASET}
              selected={intensities}
              onBarClick={handleBarClick}
              interactive
            />
          </div>

          <WidgetTop label="See top largest foodscapes intensities">
            <ChartTop dataset={DATASET} onBarClick={handleBarClick} />
          </WidgetTop>
        </div>
      </WidgetContent>
    </section>
  );
};

export default FoodscapesIntensitiesWidget;
