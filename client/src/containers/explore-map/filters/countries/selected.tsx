import { useMemo } from 'react';

import { countryAtom, provinceAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCountries } from 'hooks/countries';

import FilterSelected from 'containers/explore-map/filters/selected';

const CountriesSelected = () => {
  const country = useRecoilValue(countryAtom);
  const setCountry = useSetRecoilState(countryAtom);
  const setProvince = useSetRecoilState(provinceAtom);

  const { data: countriesData, isFetched: countriesIsFetched } = useCountries();

  const OPTIONS = useMemo(() => {
    if (!countriesData) return [];
    return countriesData;
  }, [countriesData]);

  const SELECTED = useMemo(() => {
    if (country) {
      const opt = OPTIONS.find((o) => o.value === country);
      return opt?.label;
    }

    return null;
  }, [OPTIONS, country]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setCountry(null);
    setProvince(null);
  };

  return (
    countriesIsFetched && (
      <FilterSelected text={SELECTED} visible={!!country} onClear={handleClearClick} />
    )
  );
};

export default CountriesSelected;
