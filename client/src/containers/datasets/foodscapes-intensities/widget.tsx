import dynamic from 'next/dynamic';

import { intensitiesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import { DATASETS } from 'constants/datasets';

import { WidgetHeader, WidgetTop } from 'containers/widget';

import MultiSelect from 'components/ui/select/multi/component';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const ChartTop = dynamic(() => import('./chart/top'), { ssr: false });

const FoodscapesIntensitiesWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'foodscapes-intensities');

  const intensities = useRecoilValue(intensitiesAtom);
  const setIntensities = useSetRecoilState(intensitiesAtom);

  const { data: intensitiesData, isLoading: intensitiesIsLoading } = useFoodscapesIntensities();

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

      <div className="space-y-5">
        <MultiSelect
          id="foodscapes-multiselect"
          size="s"
          theme="light"
          placeholder="Filter intensities"
          options={intensitiesData}
          values={intensities as number[]}
          batchSelectionActive
          clearSelectionActive
          loading={intensitiesIsLoading}
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
    </section>
  );
};

export default FoodscapesIntensitiesWidget;
