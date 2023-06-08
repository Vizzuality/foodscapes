import { useCallback, useMemo } from 'react';

import { cropsAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CropData } from 'types/data';

import { useCrops, useCropsGroups } from 'hooks/crops';
import { useData } from 'hooks/data';

import FiltersContent from 'containers/explore-map/filters/content';

import MultiSelect from 'components/ui/select/multi/component';

const CropsFilters = () => {
  const filters = useRecoilValue(filtersSelector('crops'));

  const crops = useRecoilValue(cropsAtom);
  const setCrops = useSetRecoilState(cropsAtom);

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

  const GROUPED_SELECTED = useMemo<number[]>(() => {
    if (!data || !cropsGroupData) return [];
    return (
      cropsGroupData
        //
        .filter((g) => {
          const ids = g.values
            // .filter((v) => data.map((d) => d.id).includes(v.value))

            .map((v) => v.value);
          return ids.length && ids.some((i) => crops.includes(i));
        })
        .map((g) => g.value)
    );
  }, [data, cropsGroupData, crops]);

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

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Crop production</p>

      <FiltersContent
        skeletonClassname="h-[76px]"
        isPlaceholderData={
          isPlaceholderData || cropsIsPlaceholderData || cropsGroupIsPlaceholderData
        }
        isFetching={isFetching || cropsIsFetching || cropsGroupIsFetching}
        isFetched={isFetched && cropsIsFetched && cropsGroupIsFetched}
        isError={isError || cropsIsError || cropsGroupIsError}
      >
        <div className="space-y-2">
          <MultiSelect
            id="crops-multiselect"
            size="s"
            theme="dark"
            placeholder="All crops"
            options={OPTIONS}
            groups={GROUPED_OPTIONS}
            values={crops as number[]}
            batchSelectionActive
            clearSelectionActive
            loading={cropsIsFetching || isFetching}
            onChange={(values) => setCrops(values as number[])}
          />

          <MultiSelect
            id="crops-groups-multiselect"
            size="s"
            theme="dark"
            placeholder="All crop groups"
            options={GROUPED_OPTIONS}
            values={GROUPED_SELECTED}
            batchSelectionActive
            clearSelectionActive
            loading={cropsGroupIsFetching || isFetching}
            onChange={handleSelectGroupOnChange}
          />
        </div>
      </FiltersContent>
    </div>
  );
};

export default CropsFilters;
