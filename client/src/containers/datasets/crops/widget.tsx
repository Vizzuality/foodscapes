import { useCallback, useMemo } from 'react';

import dynamic from 'next/dynamic';

import { cropsAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCrops, useCropsGroups } from 'hooks/crops';

import { DATASETS } from 'constants/datasets';

import { WidgetHeader, WidgetTop } from 'containers/widget';

import MultiSelect from 'components/ui/select/multi/component';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const ChartGroup = dynamic(() => import('./chart/group'), { ssr: false });
const ChartTop = dynamic(() => import('./chart/top'), { ssr: false });

const CropsWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'crops');

  const crops = useRecoilValue(cropsAtom);
  const setCrops = useSetRecoilState(cropsAtom);

  const { data: cropsData, isLoading: cropsIsLoading } = useCrops();
  const { data: cropsGroupData, isLoading: cropsGroupIsLoading } = useCropsGroups();

  const GROUPED_SELECTED = useMemo<number[]>(() => {
    return (
      cropsGroupData
        //
        .filter((g) => {
          const ids = g.values.map((v) => v.value);
          return ids.every((i) => crops.includes(i));
        })
        .map((g) => g.value)
    );
  }, [cropsGroupData, crops]);

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

  const handleSelectGroupOnChange = useCallback(
    (values: number[]) => {
      const newCrops = [...crops];

      values.forEach((v) => {
        const ids = cropsData.filter((d) => d.parentId === v).map((d) => d.value);
        ids.forEach((i) => {
          const index = newCrops.findIndex((f) => f === i);
          if (index === -1) {
            newCrops.push(i);
          }
        });
      });

      // Remove crops that are not in the selected groups
      GROUPED_SELECTED.forEach((g: number) => {
        if (!values.includes(g)) {
          const ids = cropsData.filter((d) => d.parentId === g).map((d) => d.value);
          ids.forEach((i) => {
            const index = newCrops.findIndex((f) => f === i);
            newCrops.splice(index, 1);
          });
        }
      });

      setCrops(newCrops);
    },
    [crops, cropsData, GROUPED_SELECTED, setCrops]
  );

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title="Crop production" dataset={DATASET} />

      <div className="space-y-2">
        <p>Crop output in fresh weight of major crop groupings from each foodscape.</p>
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

            <WidgetTop label="See top largest crops">
              <ChartTop dataset={DATASET} onBarClick={handleBarClick} />
            </WidgetTop>
          </div>
        </TabsContent>

        <TabsContent value="group">
          <div className="mt-5 space-y-5">
            <MultiSelect
              id="crops-groups-multiselect"
              size="s"
              theme="light"
              placeholder="Filter crop groups"
              options={cropsGroupData}
              values={GROUPED_SELECTED}
              batchSelectionActive
              clearSelectionActive
              loading={cropsGroupIsLoading}
              onChange={handleSelectGroupOnChange}
            />
            <div className="h-8">
              <ChartGroup
                dataset={DATASET}
                selected={crops}
                onBarClick={handleBarGroupClick}
                interactive
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default CropsWidget;
