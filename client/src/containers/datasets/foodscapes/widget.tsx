import { useCallback, useState } from 'react';

import dynamic from 'next/dynamic';

import { foodscapesAtom, layersAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useFoodscapes } from 'hooks/foodscapes';

import { DATASETS } from 'constants/datasets';

import Switch from 'components/ui/switch';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const ChartGroup = dynamic(() => import('./chart/group'), { ssr: false });

const FoodscapesWidget = () => {
  const [view, setView] = useState<'single' | 'group'>('single');
  const DATASET = DATASETS.find((d) => d.id === 'foodscapes');
  const { id } = DATASET;

  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);

  const foodscapes = useRecoilValue(foodscapesAtom);
  const setFoodscapes = useSetRecoilState(foodscapesAtom);

  const { data: foodscapesData } = useFoodscapes();

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
    setFoodscapes((prev) => {
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

  const handleBarGroupClick = (key: number) => {
    const ids = foodscapesData.filter((d) => d.parentId === key).map((d) => d.value);

    setFoodscapes((prev) => {
      const fs = [...prev];

      // push or slice key in fs array base on index
      const every = ids.every((i) => fs.includes(i));

      // if all ids are in fs, remove all
      if (every) {
        ids.forEach((i) => {
          const index = fs.findIndex((f) => f === i);
          fs.splice(index, 1);
        });
      } else {
        ids.forEach((i) => {
          const index = fs.findIndex((f) => f === i);
          if (index === -1) {
            fs.push(i);
          }
        });
      }
      return fs;
    });
  };

  return (
    <section className="space-y-4 py-10">
      <header className="flex items-center justify-between space-x-5">
        <h3 className="font-display text-2xl">Global Foodscapes</h3>

        <Switch checked={layers.includes(id)} onCheckedChange={handleToggleLayer} />
      </header>

      <div className="space-y-2">
        <p>
          <strong>Foodscapes</strong> can be consolidated into biophysical groupings that are
          identified by the dominant <strong>soil type</strong> found in each of them. Soil type is
          determined by the interaction of parent material, climate, vegetation, terrain, time, and
          human activity.
        </p>
        <p className="text-xs">
          <em>Soil groups are inclusive of the biophysical attributes of an area.</em>
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="radio"
          name="view"
          id="single"
          value="single"
          checked={view === 'single'}
          onChange={() => setView('single')}
        />
        <label htmlFor="single">Single</label>

        <input
          type="radio"
          name="view"
          id="group"
          value="group"
          checked={view === 'group'}
          onChange={() => setView('group')}
        />
        <label htmlFor="group">Group</label>
      </div>

      <div className="h-8">
        {view === 'single' && (
          <Chart
            //
            dataset={DATASET}
            selected={foodscapes}
            onBarClick={handleBarClick}
            interactive
          />
        )}

        {view === 'group' && (
          <ChartGroup
            dataset={DATASET}
            selected={foodscapes}
            onBarClick={handleBarGroupClick}
            interactive
          />
        )}
      </div>
    </section>
  );
};

export default FoodscapesWidget;
