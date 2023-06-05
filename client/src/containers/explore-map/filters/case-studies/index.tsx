import { useMemo } from 'react';

import {
  caseStudyAtom,
  countryAtom,
  filtersSelector,
  provinceAtom,
  tmpBboxAtom,
} from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CaseStudy } from 'types/case-studies';

import { useCaseStudies } from 'hooks/case-studies';
import { useData } from 'hooks/data';

import FiltersContent from 'containers/explore-map/filters/content';

import SingleSelect from 'components/ui/select/single/component';

const CaseStudiesFilters = () => {
  const caseStudy = useRecoilValue(caseStudyAtom);
  const setCountry = useSetRecoilState(countryAtom);
  const setProvince = useSetRecoilState(provinceAtom);
  const setCaseStudy = useSetRecoilState(caseStudyAtom);

  const setTmpBbox = useSetRecoilState(tmpBboxAtom);

  const filters = useRecoilValue(filtersSelector(['country', 'province', 'caseStudy']));

  const {
    data: caseStudiesData,
    isFetching: caseStudiesIsFetching,
    isFetched: caseStudiesIsFetched,
    isError: caseStudiesIsError,
    isPlaceholderData: caseStudiesIsPlaceholderData,
  } = useCaseStudies();

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<CaseStudy>(
    'case-studies',
    filters
  );

  const handleCaseStudyChange = (value: number | null) => {
    setCountry(null);
    setProvince(null);
    setCaseStudy(value);
    if (value) {
      const bbox = caseStudiesData?.find((c) => c.id === value)?.bbox;
      setTmpBbox(bbox);
    }
  };

  const OPTIONS = useMemo(() => {
    if (!data || !caseStudiesData) return [];
    return caseStudiesData.map((c) => ({
      ...c,
      value: c.id,
      label: c.title,
      disabled: !data.map((d) => d.id).includes(c.id),
    }));
  }, [caseStudiesData, data]);

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Case Studies</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={isPlaceholderData || caseStudiesIsPlaceholderData}
        isFetching={isFetching || caseStudiesIsFetching}
        isFetched={isFetched || caseStudiesIsFetched}
        isError={isError || caseStudiesIsError}
      >
        <div className="space-y-4">
          <SingleSelect
            id="case-studies-select"
            size="s"
            theme="dark"
            placeholder="All case studies"
            options={OPTIONS}
            value={caseStudy ?? null}
            onChange={handleCaseStudyChange}
            clearable
          />
        </div>
      </FiltersContent>
    </div>
  );
};

export default CaseStudiesFilters;
