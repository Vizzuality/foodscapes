import { useCallback } from 'react';

import dynamic from 'next/dynamic';

import { cropsAtom, layersAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCrops } from 'hooks/crops';

import { DATASETS } from 'constants/datasets';

import MultiSelect from 'components/ui/select/multi/component';
import Switch from 'components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const ChartGroup = dynamic(() => import('./chart/group'), { ssr: false });

const CropsWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'crops');
  const { id } = DATASET;

  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);

  const crops = useRecoilValue(cropsAtom);
  const setCrops = useSetRecoilState(cropsAtom);

  const { data: cropsData, isLoading: cropsIsLoading } = useCrops();

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
    setCrops((prev) => {
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
    const ids = cropsData.filter((d) => d.parentId === key).map((d) => d.value);

    setCrops((prev) => {
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
        <h3 className="font-display text-2xl">Crops</h3>

        <Switch checked={layers.includes(id)} onCheckedChange={handleToggleLayer} />
      </header>

      <div className="space-y-2">
        <p>
          <strong>Crops</strong> can be consolidated into biophysical groupings that are identified
          by the dominant <strong>soil type</strong> found in each of them. Soil type is determined
          by the interaction of parent material, climate, vegetation, terrain, time, and human
          activity.
        </p>
        <p className="font-light">
          Soil groups are inclusive of the biophysical attributes of an area.
        </p>
      </div>

      <Tabs defaultValue="single">
        <TabsList>
          <TabsTrigger value="single">Crops</TabsTrigger>
          <TabsTrigger value="group">Crop Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
          <div className="mt-5 space-y-5">
            <MultiSelect
              id="crops-multiselect"
              size="s"
              theme="light"
              placeholder="Filter crops"
              options={cropsData}
              values={crops as number[]}
              batchSelectionActive
              clearSelectionActive
              loading={cropsIsLoading}
              onChange={(values) => setCrops(values as number[])}
            />
            <div className="h-8">
              <Chart
                //
                dataset={DATASET}
                selected={crops}
                onBarClick={handleBarClick}
                interactive
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="group">
          <div className="h-8">
            <ChartGroup
              dataset={DATASET}
              selected={crops}
              onBarClick={handleBarGroupClick}
              interactive
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default CropsWidget;
