'use client';

import { useCallback, useMemo } from 'react';

import dynamic from 'next/dynamic';

import { filtersSelector, foodscapesAtom, layersSettingsAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeData } from 'types/data';
import { LayerSettings } from 'types/layers';

import { useData } from 'hooks/data';
import { useFoodscapes, useFoodscapesGroups } from 'hooks/foodscapes';
import { getArrayGroupValue, getArrayValue } from 'hooks/utils';

import { DATASETS } from 'constants/datasets';

import { WidgetHeader, WidgetTop, WidgetContent } from 'containers/widget';

import MultiSelect from 'components/ui/select/multi/component';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const ChartGroup = dynamic(() => import('./chart/group'), { ssr: false });
const ChartTop = dynamic(() => import('./chart/top'), { ssr: false });

const FoodscapesWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'foodscapes');

  const filters = useRecoilValue(filtersSelector('foodscapes'));
  const layersSettings = useRecoilValue(layersSettingsAtom);
  const setLayerSettings = useSetRecoilState(layersSettingsAtom);

  const foodscapes = useRecoilValue(foodscapesAtom);
  const setFoodscapes = useSetRecoilState(foodscapesAtom);

  const settings = layersSettings[DATASET.id] as LayerSettings<'foodscapes'>;

  const {
    data: foodscapesData,
    isPlaceholderData: foodscapesIsPlaceholderData,
    isFetching: foodscapesIsFetching,
    isFetched: foodscapesIsFetched,
    isError: foodscapesIsError,
  } = useFoodscapes();

  const {
    data: foodscapesGroupData,
    isPlaceholderData: foodscapesGroupIsPlaceholderData,
    isFetching: foodscapesGroupIsFetching,
    isFetched: foodscapesGroupIsFetched,
    isError: foodscapesGroupIsError,
  } = useFoodscapesGroups();

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<FoodscapeData>(
    'foodscapes',
    filters
  );

  const OPTIONS = useMemo(() => {
    if (!data || !foodscapesData) return [];
    return foodscapesData.filter((c) => data.map((d) => d.id).includes(c.value));
  }, [data, foodscapesData]);

  const GROUPED_OPTIONS = useMemo(() => {
    if (!data || !foodscapesGroupData) return [];
    return foodscapesGroupData.filter((c) => data.map((d) => d.parent_id).includes(c.value));
  }, [data, foodscapesGroupData]);

  const GROUPED_SELECTED = useMemo<number[]>(() => {
    if (!data || !foodscapesGroupData) return [];
    return (
      foodscapesGroupData
        //
        .filter((g) => {
          const ids = g.values
            .filter((v) => data.map((d) => d.id).includes(v.value))
            .map((v) => v.value);

          return ids.length && ids.some((i) => foodscapes.includes(i));
        })
        .map((g) => g.value)
    );
  }, [data, foodscapesGroupData, foodscapes]);

  const handleBarClick = (key: number) => {
    setFoodscapes((prev) => getArrayValue(prev, key));
  };

  const handleBarGroupClick = (key: number) => {
    const ids = foodscapesData
      .filter((d) => {
        return d.parentId === key && data.map((d1) => d1.id).includes(d.value);
      })
      .map((d) => d.value);

    setFoodscapes((prev) => getArrayGroupValue(prev, ids));
  };

  const handleSelectGroupOnChange = useCallback(
    (values: number[]) => {
      const newFoodscapes = [...foodscapes];

      values.forEach((v) => {
        const ids = foodscapesData
          .filter((v1) => data.map((d) => d.id).includes(v1.value))
          .filter((d) => d.parentId === v)
          .map((d) => d.value);

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
    [data, foodscapes, foodscapesData, GROUPED_SELECTED, setFoodscapes]
  );

  const handleTabChange = useCallback(
    (value: string) => {
      setLayerSettings({
        ...layersSettings,
        [DATASET.id]: {
          ...layersSettings[DATASET.id],
          group: value === 'group',
        },
      });
    },
    [DATASET.id, layersSettings, setLayerSettings]
  );

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title={DATASET.label} dataset={DATASET} />

      <div className="space-y-2">
        <p>
          <strong>Foodscapes</strong> can be consolidated into biophysical groupings that are
          identified by the dominant <strong>soil type</strong> found in each of them. Soil type is
          determined by the interaction of parent material, climate, vegetation, terrain, time, and
          human activity.
        </p>
        <p>Soil groups are inclusive of the biophysical attributes of an area.</p>
      </div>

      <WidgetContent
        isPlaceholderData={
          isPlaceholderData || foodscapesIsPlaceholderData || foodscapesGroupIsPlaceholderData
        }
        isFetching={isFetching || foodscapesIsFetching || foodscapesGroupIsFetching}
        isFetched={isFetched && foodscapesIsFetched && foodscapesGroupIsFetched}
        isError={isError || foodscapesIsError || foodscapesGroupIsError}
      >
        <Tabs value={settings.group ? 'group' : 'single'} onValueChange={handleTabChange}>
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
                options={OPTIONS}
                values={foodscapes as number[]}
                batchSelectionActive
                clearSelectionActive
                loading={foodscapesIsFetching || isFetching}
                onChange={(values) => setFoodscapes(values as number[])}
              />
              <div className="h-8">
                <Chart
                  //
                  selected={foodscapes}
                  ignore={null}
                  onBarClick={handleBarClick}
                  interactive
                />
              </div>

              <WidgetTop label="Top largest foodscapes">
                <ChartTop onBarClick={handleBarClick} />
              </WidgetTop>
            </div>
          </TabsContent>

          <TabsContent value="group">
            <div className="mt-5 space-y-5">
              <MultiSelect
                id="foodscapes-groups-multiselect"
                size="s"
                theme="light"
                placeholder="Filter soil groups"
                options={GROUPED_OPTIONS}
                values={GROUPED_SELECTED}
                batchSelectionActive
                clearSelectionActive
                loading={foodscapesGroupIsFetching || isFetching}
                onChange={handleSelectGroupOnChange}
              />

              <div className="h-8">
                <ChartGroup
                  selected={foodscapes}
                  ignore={null}
                  onBarClick={handleBarGroupClick}
                  interactive
                />
              </div>

              <WidgetTop label="Top largest foodscapes">
                <ChartTop onBarClick={handleBarClick} />
              </WidgetTop>
            </div>
          </TabsContent>
        </Tabs>
      </WidgetContent>
    </section>
  );
};

export default FoodscapesWidget;
