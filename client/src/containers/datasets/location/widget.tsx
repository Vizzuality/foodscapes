import { provinceAtom, countryAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCountries } from 'hooks/countries';
import { useProvinces } from 'hooks/provinces';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader } from 'containers/widget';

import SingleSelect from 'components/ui/select/single/component';

const LocationRankingWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'locations');

  const country = useRecoilValue(countryAtom);
  const setCountry = useSetRecoilState(countryAtom);

  const province = useRecoilValue(provinceAtom);
  const setProvince = useSetRecoilState(provinceAtom);

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

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title="Location ranking" dataset={DATASET} />
      <WidgetContent
        isPlaceholderData={countriesIsPlaceholderData || (country && provincesIsPlaceholderData)}
        isFetching={countriesIsFetching || (country && provincesIsFetching)}
        isFetched={countriesIsFetched && (!country || (country && provincesIsFetched))}
        isError={countriesIsError || (country && provincesIsError)}
      >
        <div className="space-y-5">
          <SingleSelect
            id="countries-location-select"
            size="s"
            theme="light"
            placeholder="Select a country"
            options={countriesData}
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
            options={provincesData}
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