'use client';

import { useCallback, useMemo } from 'react';

import dynamic from 'next/dynamic';

import { GAEvent } from 'lib/analytics/ga';

import { cropsAtom, filtersSelector, layersSettingsAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CropData } from 'types/data';
import { LayerSettings } from 'types/layers';

import { useCrops, useCropsGroups } from 'hooks/crops';
import { useData } from 'hooks/data';
import { getArrayGroupValue, getArrayValue } from 'hooks/utils';

import { DATASETS } from 'constants/datasets';

import { WidgetHeader, WidgetTop, WidgetContent } from 'containers/widget';

import MultiSelect from 'components/ui/select/multi/component';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const ChartGroup = dynamic(() => import('./chart/group'), { ssr: false });
const ChartTop = dynamic(() => import('./chart/top'), { ssr: false });

const CropsWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'crops');

  const filters = useRecoilValue(filtersSelector('crops'));
  const layersSettings = useRecoilValue(layersSettingsAtom);
  const setLayerSettings = useSetRecoilState(layersSettingsAtom);

  const crops = useRecoilValue(cropsAtom);
  const setCrops = useSetRecoilState(cropsAtom);

  const settings = layersSettings[DATASET.id] as LayerSettings<'foodscapes'>;

  const {
    data: cropsData,
    isPlaceholderData: cropsIsPlaceholderData,
    isFetching: cropsIsFetching,
    isFetched: cropsIsFetched,
    isError: cropsIsError,
  } = useCrops();

  const {
    data: cropsGroupData,
    isPlaceholderData: cropsGroupIsPlaceholderData,
    isFetching: cropsGroupIsFetching,
    isFetched: cropsGroupIsFetched,
    isError: cropsGroupIsError,
  } = useCropsGroups();

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<CropData>(
    'crops',
    filters
  );

  const GROUPED_SELECTED = useMemo<number[]>(() => {
    return (
      cropsGroupData
        //
        .filter((g) => {
          const ids = g.values
            .filter((v) => data.map((d) => d.id).includes(v.value))

            .map((v) => v.value);
          return ids.length && ids.some((i) => crops.includes(i));
        })
        .map((g) => g.value)
    );
  }, [data, cropsGroupData, crops]);

  const OPTIONS = useMemo(() => {
    return cropsData.map((c) => ({
      ...c,
      group: c.parentId,
      disabled: !data.map((d) => d.id).includes(c.value),
    }));
  }, [data, cropsData]);

  const GROUPED_OPTIONS = useMemo(() => {
    if (!data || !cropsGroupData) return [];

    return cropsGroupData.map((c) => ({
      ...c,
      disabled: !data.map((d) => d.parent_id).includes(c.value),
    }));
  }, [data, cropsGroupData]);

  const handleBarClick = (key: number) => {
    setCrops((prev) => {
      const newCrops = getArrayValue(prev, key);

      GAEvent({
        action: 'filter_selected',
        params: {
          type: 'crops',
          id: newCrops,
          value: newCrops.map((c) => cropsData.find((d) => d.value === c)?.label),
          from: 'chart',
        },
      });

      return newCrops;
    });
  };

  const handleBarGroupClick = (key: number) => {
    const ids = cropsData
      .filter((d) => {
        return d.parentId === key && data.map((d1) => d1.id).includes(d.value);
      })
      .map((d) => d.value);

    setCrops((prev) => {
      const newCrops = getArrayGroupValue(prev, ids);

      GAEvent({
        action: 'filter_selected',
        params: {
          type: 'crops',
          id: newCrops,
          value: newCrops.map((c) => cropsData.find((d) => d.value === c)?.label),
          from: 'chart',
        },
      });

      return newCrops;
    });
  };

  const handleCropsChange = useCallback(
    (values: number[]) => {
      setCrops(values);

      GAEvent({
        action: 'filter_selected',
        params: {
          type: 'crops',
          id: values,
          value: values.map((c) => cropsData.find((d) => d.value === c)?.label),
          from: 'content',
        },
      });
    },
    [cropsData, setCrops]
  );

  const handleSelectGroupOnChange = useCallback(
    (values: number[]) => {
      const newCrops = [...crops];

      values.forEach((v) => {
        const ids = cropsData
          .filter((v1) => data.map((d) => d.id).includes(v1.value))
          .filter((d) => d.parentId === v)
          .map((d) => d.value);
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

      GAEvent({
        action: 'filter_selected',
        params: {
          type: 'crops',
          id: newCrops,
          value: newCrops.map((c) => cropsData.find((d) => d.value === c)?.label),
          from: 'content',
        },
      });
    },
    [data, crops, cropsData, GROUPED_SELECTED, setCrops]
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
          Dominant crops are the primary agricultural product grown within a specific area. They
          represent the crops with the highest production level among all the crops at each pixel.
        </p>
      </div>

      <WidgetContent
        isPlaceholderData={
          isPlaceholderData || cropsIsPlaceholderData || cropsGroupIsPlaceholderData
        }
        isFetching={isFetching || cropsIsFetching || cropsGroupIsFetching}
        isFetched={isFetched && cropsIsFetched && cropsGroupIsFetched}
        isError={isError || cropsIsError || cropsGroupIsError}
      >
        <Tabs value={settings.group ? 'group' : 'single'} onValueChange={handleTabChange}>
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
                options={OPTIONS}
                groups={GROUPED_OPTIONS}
                values={crops as number[]}
                batchSelectionActive
                clearSelectionActive
                loading={cropsIsFetching || isFetching}
                onChange={handleCropsChange}
              />
              <div className="h-8">
                <Chart
                  //
                  selected={crops}
                  ignore={null}
                  onBarClick={handleBarClick}
                  interactive
                />
              </div>

              <WidgetTop label="Top largest crops">
                <ChartTop settings={settings} onBarClick={handleBarClick} />
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
                options={GROUPED_OPTIONS}
                values={GROUPED_SELECTED}
                batchSelectionActive
                clearSelectionActive
                loading={cropsGroupIsFetching || isFetching}
                onChange={handleSelectGroupOnChange}
              />
              <div className="h-8">
                <ChartGroup
                  selected={crops}
                  ignore={null}
                  onBarClick={handleBarGroupClick}
                  interactive
                />
              </div>

              <WidgetTop label="Top largest crop groups">
                <ChartTop settings={settings} onBarClick={handleBarClick} />
              </WidgetTop>
            </div>
          </TabsContent>
        </Tabs>
      </WidgetContent>
    </section>
  );
};

export default CropsWidget;
