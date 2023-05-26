import { useMemo } from 'react';

import cn from 'lib/classnames';

import { cropsAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CropData } from 'types/data';

import { useCrops } from 'hooks/crops';
import { useData } from 'hooks/data';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

const CropsSelected = () => {
  const cropsFilters = useRecoilValue(filtersSelector('crops'));

  const crops = useRecoilValue(cropsAtom);
  const setCrops = useSetRecoilState(cropsAtom);

  const { data: cropsData } = useCrops();

  const { data } = useData<CropData>('crops', cropsFilters);

  const OPTIONS = useMemo(() => {
    if (!data || !cropsData) return [];
    return cropsData.filter((c) => data.map((d) => d.id).includes(c.value));
  }, [data, cropsData]);

  const SELECTED = useMemo(() => {
    if (crops.length === 1) {
      const opt = OPTIONS.find((o) => o.value === crops[0]);

      return opt?.label;
    }

    if (crops.length === OPTIONS.length) return 'All crops';

    if (crops.length > 1) return `${crops.length} crops`;

    return null;
  }, [OPTIONS, crops]);

  const handleClearClick = () => {
    setCrops([]);
  };

  return (
    <div
      className={cn({
        'mb-3 mr-3 flex items-center justify-between space-x-2 rounded-3xl bg-white p-1 pl-2': true,
        hidden: !crops.length,
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

export default CropsSelected;
