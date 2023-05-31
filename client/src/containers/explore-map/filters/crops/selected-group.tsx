import { useMemo } from 'react';

import { cropsAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CropData } from 'types/data';

import { useCropsGroups } from 'hooks/crops';
import { useData } from 'hooks/data';

import FilterSelected from 'containers/explore-map/filters/selected';

const CropsGroupsSelected = () => {
  const filters = useRecoilValue(filtersSelector('crops'));
  const crops = useRecoilValue(cropsAtom);
  const setCrops = useSetRecoilState(cropsAtom);

  const { data: cropsGroupData } = useCropsGroups();

  const { data } = useData<CropData>('crops', filters);

  const GROUPED_OPTIONS = useMemo(() => {
    if (!data || !cropsGroupData) return [];
    return cropsGroupData.filter((c) => data.map((d) => d.parent_id).includes(c.value));
  }, [data, cropsGroupData]);

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

  const SELECTED = useMemo(() => {
    if (GROUPED_SELECTED.length === 1) {
      const opt = GROUPED_OPTIONS.find((o) => o.value === GROUPED_SELECTED[0]);
      return opt?.label;
    }

    if (GROUPED_SELECTED.length === GROUPED_OPTIONS.length) return 'All soil groups';

    if (GROUPED_SELECTED.length > 1) return `${GROUPED_SELECTED.length} soil groups`;

    return null;
  }, [GROUPED_OPTIONS, GROUPED_SELECTED]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setCrops([]);
  };

  return (
    <FilterSelected
      text={SELECTED}
      visible={!!GROUPED_SELECTED.length}
      onClear={handleClearClick}
    />
  );
};

export default CropsGroupsSelected;
