import { useMemo } from 'react';

import {
  caseStudyAtom,
  countryAtom,
  filtersSelector,
  provinceAtom,
  tmpBboxAtom,
} from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ProvincesData } from 'types/data';

import { useData } from 'hooks/data';
import { useProvinces } from 'hooks/provinces';

import FiltersContent from 'containers/explore-map/filters/content';

import SingleSelect from 'components/ui/select/single/component';

const ProvincesFilters = () => {
  const country = useRecoilValue(countryAtom);

  const province = useRecoilValue(provinceAtom);
  const setProvince = useSetRecoilState(provinceAtom);
  const setCaseStudy = useSetRecoilState(caseStudyAtom);

  const setTmpBbox = useSetRecoilState(tmpBboxAtom);

  const filters = useRecoilValue(filtersSelector(['country', 'province', 'caseStudy']));

  const {
    data: provincesData,
    isPlaceholderData: provincesIsPlaceholderData,
    isFetching: provincesIsFetching,
    isFetched: provincesIsFetched,
    isError: provincesIsError,
  } = useProvinces(country);

  const {
    data: data,
    isPlaceholderData,
    isFetching,
    isFetched,
    isError,
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

  const OPTIONS = useMemo(() => {
    if (!data || !provincesData) return [];

    return provincesData.map((c) => ({
      ...c,
      disabled: !data.map((d) => d.id).includes(c.value),
    }));
  }, [data, provincesData]);

  const handleProvinceChange = (value: number | null) => {
    if (value === null) {
      setProvince(null);
    } else {
      const P = provincesData?.find((c) => c.value === value);
      setProvince(value as number);
      setTmpBbox(P.bbox);
    }
    setCaseStudy(null);
  };

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Regions</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={
          (country && provincesIsPlaceholderData) || (country && isPlaceholderData)
        }
        isFetching={(country && provincesIsFetching) || (country && isFetching)}
        isFetched={
          (!country || (country && provincesIsFetched)) && (!country || (country && isFetched))
        }
        isError={(country && provincesIsError) || (country && isError)}
      >
        <SingleSelect
          id="province-location-select"
          size="s"
          theme="dark"
          placeholder="All Regions"
          options={OPTIONS}
          loading={(country && provincesIsFetching) || (country && isFetching)}
          value={province ?? null}
          onChange={handleProvinceChange}
          clearable
          disabled={!country}
        />
      </FiltersContent>
    </div>
  );
};

export default ProvincesFilters;
