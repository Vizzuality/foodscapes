import { useMemo } from 'react';

import { countryAtom, filtersSelector, provinceAtom, tmpBboxAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CountriesData } from 'types/data';

import { useCountries } from 'hooks/countries';
import { useData } from 'hooks/data';

import FiltersContent from 'containers/explore-map/filters/content';

import SingleSelect from 'components/ui/select/single/component';

const CountriesFilters = () => {
  const country = useRecoilValue(countryAtom);
  const setCountry = useSetRecoilState(countryAtom);
  const setProvince = useSetRecoilState(provinceAtom);

  const setTmpBbox = useSetRecoilState(tmpBboxAtom);

  const filters = useRecoilValue(filtersSelector(['country', 'province']));

  const {
    data: countriesData,
    isPlaceholderData: countriesIsPlaceholderData,
    isFetching: countriesIsFetching,
    isFetched: countriesIsFetched,
    isError: countriesIsError,
  } = useCountries();

  const {
    data: cData,
    isPlaceholderData: cIsPlaceholderData,
    isFetching: cIsFetching,
    isFetched: cIsFetched,
    isError: cIsError,
  } = useData<CountriesData>('countries', filters);

  const COUNTRY_OPTIONS = useMemo(() => {
    if (!cData || !countriesData) return [];
    return countriesData.filter((c) => cData.map((d) => d.id).includes(c.value));
  }, [cData, countriesData]);

  const handleCountryChange = (value: number | null) => {
    if (value === null) {
      setCountry(null);
    } else {
      const C = countriesData?.find((c) => c.value === value);
      setCountry(value as number);
      setTmpBbox(C.bbox);
    }
    setProvince(null);
  };

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Countries</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={cIsPlaceholderData || countriesIsPlaceholderData}
        isFetching={cIsFetching || countriesIsFetching}
        isFetched={cIsFetched && countriesIsFetched}
        isError={cIsError || countriesIsError}
      >
        <div className="space-y-4">
          <SingleSelect
            id="countries-location-select"
            size="s"
            theme="dark"
            placeholder="Select..."
            options={COUNTRY_OPTIONS}
            value={country ?? null}
            onChange={handleCountryChange}
            clearable
          />
        </div>
      </FiltersContent>
    </div>
  );
};

export default CountriesFilters;
