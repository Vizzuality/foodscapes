import { provinceAtom, filtersSelector, countryAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ClimateRiskData } from 'types/data';

import { useCountries } from 'hooks/countries';
import { useData } from 'hooks/data';
import { useProvinces } from 'hooks/provinces';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader } from 'containers/widget';

import SingleSelect from 'components/ui/select/single/component';

const LocationRankingWidget = () => {
  // ARREGLALO
  const DATASET = DATASETS.find((d) => d.id === 'climate-risk');

  // ARREGLALO
  const filters = useRecoilValue(filtersSelector('climateRisk'));

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

  const { isPlaceholderData, isFetching, isFetched, isError } = useData<ClimateRiskData>({
    sql: DATASET.widget.sql,
    shape: 'array',
    ...filters,
  });

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title="Location ranking" dataset={DATASET} />
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
