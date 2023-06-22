import { useMemo } from 'react';

import { GAEvent } from 'lib/analytics/ga';

import {
  caseStudyAtom,
  countryAtom,
  filtersSelector,
  provinceAtom,
  tmpBboxAtom,
} from 'store/explore-map';

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
  const setCaseStudy = useSetRecoilState(caseStudyAtom);

  const setTmpBbox = useSetRecoilState(tmpBboxAtom);

  const filters = useRecoilValue(filtersSelector(['country', 'province', 'caseStudy']));

  const {
    data: countriesData,
    isPlaceholderData: countriesIsPlaceholderData,
    isFetching: countriesIsFetching,
    isFetched: countriesIsFetched,
    isError: countriesIsError,
  } = useCountries();

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<CountriesData>(
    'countries',
    filters
  );

  const OPTIONS = useMemo(() => {
    if (!data || !countriesData) return [];
    return countriesData.map((c) => ({
      ...c,
      disabled: !data.map((d) => d.id).includes(c.value),
    }));
  }, [data, countriesData]);

  const handleCountryChange = (value: number | null) => {
    if (value === null) {
      setCountry(null);
    } else {
      const C = countriesData?.find((c) => c.value === value);
      setCountry(value as number);
      setTmpBbox(C.bbox);

      GAEvent({
        action: 'filter_selected',
        params: {
          type: 'country',
          id: value,
          value: value ? countriesData?.find((c) => c.value === value)?.label : null,
          from: 'filters',
        },
      });
    }
    setProvince(null);
    setCaseStudy(null);
  };

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Countries</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={isPlaceholderData || countriesIsPlaceholderData}
        isFetching={isFetching || countriesIsFetching}
        isFetched={isFetched && countriesIsFetched}
        isError={isError || countriesIsError}
      >
        <div className="space-y-4">
          <SingleSelect
            id="countries-location-select"
            size="s"
            theme="dark"
            placeholder="All countries"
            options={OPTIONS}
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
