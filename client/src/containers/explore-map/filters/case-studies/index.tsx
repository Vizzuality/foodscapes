import { useMemo } from 'react';

import { caseStudyAtom, countryAtom, provinceAtom, tmpBboxAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCaseStudies } from 'hooks/case-studies';

import FiltersContent from 'containers/explore-map/filters/content';

import SingleSelect from 'components/ui/select/single/component';

const CaseStudiesFilters = () => {
  const caseStudy = useRecoilValue(caseStudyAtom);
  const setCountry = useSetRecoilState(countryAtom);
  const setProvince = useSetRecoilState(provinceAtom);
  const setCaseStudy = useSetRecoilState(caseStudyAtom);

  const setTmpBbox = useSetRecoilState(tmpBboxAtom);

  const {
    data: caseStudiesData,
    isFetching: caseStudiesIsFetching,
    isFetched: caseStudiesIsFetched,
    isError: caseStudiesIsError,
    isPlaceholderData: caseStudiesIsPlaceholderData,
  } = useCaseStudies();

  const handleCaseStudyClick = (value: number | null) => {
    setCountry(null);
    setProvince(null);
    setCaseStudy(value);
    const bbox = caseStudiesData?.find((c) => c.id === value)?.bbox;
    setTmpBbox(bbox);
  };

  const OPTIONS = useMemo(() => {
    if (!caseStudiesData) return [];
    return caseStudiesData.map((c) => ({
      ...c,
      value: c.id,
      label: c.title,
      disabled: caseStudy === c.id,
    }));
  }, [caseStudiesData, caseStudy]);

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Case Studies</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={caseStudiesIsPlaceholderData}
        isFetching={caseStudiesIsFetching}
        isFetched={caseStudiesIsFetched}
        isError={caseStudiesIsError}
      >
        <div className="space-y-4">
          <SingleSelect
            id="countries-location-select"
            size="s"
            theme="dark"
            placeholder="All case studies"
            options={OPTIONS}
            value={caseStudy ?? null}
            onChange={handleCaseStudyClick}
            clearable
          />
        </div>
      </FiltersContent>
    </div>
  );
};

export default CaseStudiesFilters;
