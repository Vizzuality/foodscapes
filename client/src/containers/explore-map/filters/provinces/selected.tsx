import { useMemo } from 'react';

import { countryAtom, provinceAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useProvinces } from 'hooks/provinces';

import FilterSelected from 'containers/explore-map/filters/selected';

const ProvincesSelected = () => {
  const country = useRecoilValue(countryAtom);
  const province = useRecoilValue(provinceAtom);
  const setProvince = useSetRecoilState(provinceAtom);

  const { data: provincesData } = useProvinces(country);

  const OPTIONS = useMemo(() => {
    if (!provincesData) return [];
    return provincesData;
  }, [provincesData]);

  const SELECTED = useMemo(() => {
    if (province) {
      const opt = OPTIONS.find((o) => o.value === province);
      return opt?.label;
    }

    return null;
  }, [OPTIONS, province]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setProvince(null);
  };

  return (
    <FilterSelected text={SELECTED} visible={!!province && !!country} onClear={handleClearClick} />
  );
};

export default ProvincesSelected;
