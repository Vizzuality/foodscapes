import { useMemo } from 'react';

import cn from 'lib/classnames';

import { cropsAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CropData } from 'types/data';

import { useCropsGroups } from 'hooks/crops';
import { useData } from 'hooks/data';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

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

  const handleClearClick = () => {
    setCrops([]);
  };

  return (
    <div
      className={cn({
        'mb-3 mr-3 flex items-center justify-between space-x-2 rounded-3xl bg-white p-1 pl-2': true,
        hidden: !GROUPED_SELECTED.length,
      })}
    >
      <p className="text-xs font-bold uppercase text-navy-500">{SELECTED}</p>

      <button
        type="button"
        className="flex items-center justify-center rounded-full bg-navy-500 p-1"
        onClick={handleClearClick}
      >
        <Icon icon={CLOSE_SVG} className="h-3 w-3 text-white" />
      </button>
    </div>
  );
};

export default CropsGroupsSelected;
