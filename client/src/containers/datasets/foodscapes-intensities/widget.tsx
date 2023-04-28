import dynamic from 'next/dynamic';

import { intensitiesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import { DATASETS } from 'constants/datasets';

import { WidgetHeader, WidgetTop } from 'containers/widget';

import PieChart from 'components/charts/pie/component';
import MultiSelect from 'components/ui/select/multi/component';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const ChartTop = dynamic(() => import('./chart/top'), { ssr: false });

const PIE_DATA = [
  {
    id: 'a',
    label: 'Amazing',
    value: 10,
  },
  {
    id: 'b',
    label: 'Beautiful',
    value: 20,
  },
  {
    id: 'c',
    label: 'Cool',
    value: 30,
  },
  {
    id: 'd',
    label: 'Delightful',
    value: 40,
  },
  {
    id: 'e',
    label: 'Elegant',
    value: 50,
  },
];

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

      <div>
        <PieChart width={250} height={250} data={PIE_DATA} selected="e" />
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
