import { useCallback, useMemo } from 'react';

import dynamic from 'next/dynamic';

import { foodscapesAtom, layersAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useFoodscapes, useFoodscapesGroups } from 'hooks/foodscapes';

import { DATASETS } from 'constants/datasets';

import Icon from 'components/icon';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'components/ui/collapsible';
import MultiSelect from 'components/ui/select/multi/component';
import Switch from 'components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';

import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const ChartGroup = dynamic(() => import('./chart/group'), { ssr: false });
const ChartTop = dynamic(() => import('./chart/top'), { ssr: false });

const FoodscapesWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'foodscapes');
  const { id } = DATASET;

  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);

  const foodscapes = useRecoilValue(foodscapesAtom);
  const setFoodscapes = useSetRecoilState(foodscapesAtom);

  const { data: foodscapesData, isLoading: foodscapesIsLoading } = useFoodscapes();
  const { data: foodscapesGroupData, isLoading: foodscapesGroupIsLoading } = useFoodscapesGroups();

  const GROUPED_SELECTED = useMemo<number[]>(() => {
    return (
      foodscapesGroupData
        //
        .filter((g) => {
          const ids = g.values.map((v) => v.value);
          return ids.every((i) => foodscapes.includes(i));
        })
        .map((g) => g.value)
    );
  }, [foodscapesGroupData, foodscapes]);

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

  const handleSelectGroupOnChange = useCallback(
    (values: number[]) => {
      const newFoodscapes = [...foodscapes];

      values.forEach((v) => {
        const ids = foodscapesData.filter((d) => d.parentId === v).map((d) => d.value);
        ids.forEach((i) => {
          const index = newFoodscapes.findIndex((f) => f === i);
          if (index === -1) {
            newFoodscapes.push(i);
          }
        });
      });

      // Remove foodscapes that are not in the selected groups
      GROUPED_SELECTED.forEach((g: number) => {
        if (!values.includes(g)) {
          const ids = foodscapesData.filter((d) => d.parentId === g).map((d) => d.value);
          ids.forEach((i) => {
            const index = newFoodscapes.findIndex((f) => f === i);
            newFoodscapes.splice(index, 1);
          });
        }
      });

      setFoodscapes(newFoodscapes);
    },
    [foodscapes, foodscapesData, GROUPED_SELECTED, setFoodscapes]
  );

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
        <p className="font-light">
          Soil groups are inclusive of the biophysical attributes of an area.
        </p>
      </div>

      <Tabs defaultValue="single">
        <TabsList>
          <TabsTrigger value="single">Foodscapes</TabsTrigger>
          <TabsTrigger value="group">Soil Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
          <div className="mt-5 space-y-5">
            <MultiSelect
              id="foodscapes-multiselect"
              size="s"
              theme="light"
              placeholder="Filter foodscapes"
              options={foodscapesData}
              values={foodscapes as number[]}
              batchSelectionActive
              clearSelectionActive
              loading={foodscapesIsLoading}
              onChange={(values) => setFoodscapes(values as number[])}
            />
            <div className="h-8">
              <Chart
                //
                dataset={DATASET}
                selected={foodscapes}
                onBarClick={handleBarClick}
                interactive
              />
            </div>

            <Collapsible>
              <CollapsibleTrigger className="mt-5 flex items-center space-x-2 font-semibold text-navy-500 hover:underline">
                <span>See top largest foodscapes</span>

                <Icon icon={ARROW_DOWN_SVG} className="relative top-px h-3 w-3 text-navy-500" />
              </CollapsibleTrigger>

              <CollapsibleContent asChild>
                <div className="mt-5">
                  <ChartTop dataset={DATASET} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </TabsContent>

        <TabsContent value="group">
          <div className="mt-5 space-y-5">
            <MultiSelect
              id="foodscapes-groups-multiselect"
              size="s"
              theme="light"
              placeholder="Filter soil groups"
              options={foodscapesGroupData}
              values={GROUPED_SELECTED}
              batchSelectionActive
              clearSelectionActive
              loading={foodscapesGroupIsLoading}
              onChange={handleSelectGroupOnChange}
            />

            <div className="h-8">
              <ChartGroup
                dataset={DATASET}
                selected={foodscapes}
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

export default FoodscapesWidget;
