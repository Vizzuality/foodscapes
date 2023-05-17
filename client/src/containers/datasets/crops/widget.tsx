'use client';

import { useCallback, useMemo } from 'react';

import dynamic from 'next/dynamic';

import { cropsAtom, filtersSelector, layersSettingsAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CropData } from 'types/data';
import { LayerSettings } from 'types/layers';

import { useCrops, useCropsGroups } from 'hooks/crops';
import { useData } from 'hooks/data';

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
  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<CropData>({
    sql: DATASET.widget.sql,
    shape: 'array',
    ...filters,
  });

  const GROUPED_SELECTED = useMemo<number[]>(() => {
    return (
      cropsGroupData
        //
        .filter((g) => {
          const ids = g.values
            .filter((v) => data.map((d) => d.id).includes(v.value))

            .map((v) => v.value);
          return ids.every((i) => crops.includes(i));
        })
        .map((g) => g.value)
    );
  }, [data, cropsGroupData, crops]);

  const OPTIONS = useMemo(() => {
    return cropsData.filter((c) => data.map((d) => d.id).includes(c.value));
  }, [data, cropsData]);

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
    const ids = cropsData
      .filter((d) => {
        return d.parentId === key && data.map((d1) => d1.id).includes(d.value);
      })
      .map((d) => d.value);

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
                values={crops as number[]}
                batchSelectionActive
                clearSelectionActive
                loading={cropsIsFetching || isFetching}
                onChange={(values) => setCrops(values as number[])}
              />
              <div className="h-8">
                <Chart
                  //
                  dataset={DATASET}
                  selected={crops}
                  ignore={null}
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
                loading={cropsGroupIsFetching || isFetching}
                onChange={handleSelectGroupOnChange}
              />
              <div className="h-8">
                <ChartGroup
                  dataset={DATASET}
                  selected={crops}
                  ignore={null}
                  onBarClick={handleBarGroupClick}
                  interactive
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </WidgetContent>
    </section>
  );
};

export default CropsWidget;
