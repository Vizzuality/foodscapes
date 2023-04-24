import { useCallback } from 'react';

import dynamic from 'next/dynamic';

import { intensitiesAtom, layersAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import { DATASETS } from 'constants/datasets';

import MultiSelect from 'components/ui/select/multi/component';
import Switch from 'components/ui/switch';

const Chart = dynamic(() => import('./chart'), { ssr: false });

const FoodscapesIntensitiesWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'foodscapes-intensities');
  const { id } = DATASET;

  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);

  const intensities = useRecoilValue(intensitiesAtom);
  const setIntensities = useSetRecoilState(intensitiesAtom);

  const { data: intensitiesData, isLoading: intensitiesIsLoading } = useFoodscapesIntensities();

  const handleToggleLayer = useCallback(() => {
    const lys = [...layers];

    // push or slice layer in lys array base on index
    const index = lys.findIndex((ly) => ly === id);
    if (index === -1) {
      lys.unshift(id);
    } else {
      lys.splice(index, 1);
    }

    setLayers(lys);
  }, [id, layers, setLayers]);

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
      <header className="flex items-center justify-between space-x-5">
        <h3 className="font-display text-2xl">Foodscapes Intensity</h3>

        <Switch checked={layers.includes(id)} onCheckedChange={handleToggleLayer} />
      </header>

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
      </div>
    </section>
  );
};

export default FoodscapesIntensitiesWidget;
