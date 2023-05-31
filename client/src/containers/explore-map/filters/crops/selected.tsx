import { useMemo } from 'react';

import { cropsAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CropData } from 'types/data';

import { useCrops } from 'hooks/crops';
import { useData } from 'hooks/data';

import FilterSelected from 'containers/explore-map/filters/selected';

const CropsSelected = () => {
  const cropsFilters = useRecoilValue(filtersSelector('crops'));

  const crops = useRecoilValue(cropsAtom);
  const setCrops = useSetRecoilState(cropsAtom);

  const { data: cropsData, isFetched: cropsIsFetched } = useCrops();

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

  const POPOVER_SELECTED = useMemo(() => {
    const selected = OPTIONS.filter((o) => crops.includes(o.value));
    return selected;
  }, [OPTIONS, crops]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setCrops([]);
  };

  return (
    cropsIsFetched && (
      <FilterSelected
        text={SELECTED}
        popover={POPOVER_SELECTED}
        visible={!!crops.length}
        onClear={handleClearClick}
      />
    )
  );
};

export default CropsSelected;
