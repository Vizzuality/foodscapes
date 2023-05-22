import { useMemo } from 'react';

import { provinceAtom, countryAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { LocationData } from 'types/data';

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

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<LocationData>(
    'locations',
    filters
  );

  const COUNTRY_OPTIONS = useMemo(() => {
    if (!data || !countriesData) return [];
    return countriesData.filter((c) => data.map((d) => d.parent_id).includes(c.value));
  }, [data, countriesData]);

  const PROVINCE_OPTIONS = useMemo(() => {
    if (!data || !provincesData) return [];
    return provincesData.filter((c) => data.map((d) => d.id).includes(c.value));
  }, [data, provincesData]);

  return (
    <section className="space-y-4 pb-10">
      {/* <WidgetHeader title="Location ranking" dataset={DATASET} /> */}
      <WidgetContent
        isPlaceholderData={
          isPlaceholderData || countriesIsPlaceholderData || (country && provincesIsPlaceholderData)
        }
        isFetching={isFetching || countriesIsFetching || (country && provincesIsFetching)}
        isFetched={isFetched && countriesIsFetched && (!country || (country && provincesIsFetched))}
        isError={isError || countriesIsError || (country && provincesIsError)}
      >
        <div className="space-y-5">
          <SingleSelect
            id="countries-location-select"
            size="s"
            theme="light"
            placeholder="Select a country"
            options={COUNTRY_OPTIONS}
            value={country ?? null}
            onChange={(value) => {
              if (value === null) {
                setCountry(null);
              } else {
                setCountry(value as number);
              }
              setProvince(null);
            }}
            clearable
          />

          <SingleSelect
            id="province-location-select"
            size="s"
            theme="light"
            placeholder="Select a region"
            options={PROVINCE_OPTIONS}
            value={province ?? null}
            onChange={(value) => {
              if (value === null) {
                setProvince(null);
              } else {
                setProvince(value as number);
              }
            }}
            clearable
            disabled={!country}
          />
        </div>
      </WidgetContent>
    </section>
  );
};

export default LocationRankingWidget;
