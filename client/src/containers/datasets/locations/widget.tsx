import { useMemo } from 'react';

import { provinceAtom, countryAtom, filtersSelector, tmpBboxAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CountriesData, ProvincesData } from 'types/data';

import { useCountries } from 'hooks/countries';
import { useData } from 'hooks/data';
import { useProvinces } from 'hooks/provinces';

import { WidgetContent } from 'containers/widget';

import SingleSelect from 'components/ui/select/single/component';

const LocationRankingWidget = () => {
  const country = useRecoilValue(countryAtom);
  const setCountry = useSetRecoilState(countryAtom);

  const province = useRecoilValue(provinceAtom);
  const setProvince = useSetRecoilState(provinceAtom);

  const setTmpBbox = useSetRecoilState(tmpBboxAtom);

  const filters = useRecoilValue(filtersSelector(['country', 'province']));

  const {
    data: provincesData,
    isPlaceholderData: provincesIsPlaceholderData,
    isFetching: provincesIsFetching,
    isFetched: provincesIsFetched,
    isError: provincesIsError,
  } = useProvinces(country);

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

  const {
    data: pData,
    isPlaceholderData: pIsPlaceholderData,
    isFetching: pIsFetching,
    isFetched: pIsFetched,
    isError: pIsError,
  } = useData<ProvincesData>(
    'provinces',
    {
      ...filters,
      country: country ?? null,
    },
    {
      enabled: !!country,
    }
  );

  const COUNTRY_OPTIONS = useMemo(() => {
    if (!cData || !countriesData) return [];
    return countriesData.map((c) => ({
      ...c,
      disabled: !cData.map((d) => d.id).includes(c.value),
    }));
  }, [cData, countriesData]);

  const PROVINCE_OPTIONS = useMemo(() => {
    if (!pData || !provincesData) return [];

    return provincesData.map((c) => ({
      ...c,
      disabled: !pData.map((d) => d.id).includes(c.value),
    }));
  }, [pData, provincesData]);

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

  const handleProvinceChange = (value: number | null) => {
    if (value === null) {
      setProvince(null);
    } else {
      const P = provincesData?.find((c) => c.value === value);
      setProvince(value as number);
      setTmpBbox(P.bbox);
    }
  };

  return (
    <section className="space-y-4 pb-10">
      {/* <WidgetHeader title="Location ranking" dataset={DATASET} /> */}
      <WidgetContent
        isPlaceholderData={
          cIsPlaceholderData ||
          countriesIsPlaceholderData ||
          (country && provincesIsPlaceholderData) ||
          (country && pIsPlaceholderData)
        }
        isFetching={
          cIsFetching ||
          countriesIsFetching ||
          (country && provincesIsFetching) ||
          (country && pIsFetching)
        }
        isFetched={
          cIsFetched &&
          countriesIsFetched &&
          (!country || (country && provincesIsFetched)) &&
          (!country || (country && pIsFetched))
        }
        isError={
          cIsError || countriesIsError || (country && provincesIsError) || (country && pIsError)
        }
      >
        <div className="space-y-5">
          <SingleSelect
            id="countries-location-select"
            size="s"
            theme="light"
            placeholder="Select a country"
            options={COUNTRY_OPTIONS}
            value={country ?? null}
            onChange={handleCountryChange}
            clearable
          />

          <SingleSelect
            id="province-location-select"
            size="s"
            theme="light"
            placeholder="Select a region"
            options={PROVINCE_OPTIONS}
            value={province ?? null}
            onChange={handleProvinceChange}
            clearable
            disabled={!country}
          />
        </div>
      </WidgetContent>
    </section>
  );
};

export default LocationRankingWidget;
