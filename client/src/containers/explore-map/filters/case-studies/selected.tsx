import { useMemo } from 'react';

import { caseStudyAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCaseStudies } from 'hooks/case-studies';

import FilterSelected from 'containers/explore-map/filters/selected';

const CaseStudiesSelected = () => {
  const caseStudy = useRecoilValue(caseStudyAtom);
  const setCaseStudy = useSetRecoilState(caseStudyAtom);

  const { data: caseStudiesData, isFetched: caseStudiesIsFetched } = useCaseStudies();

  const OPTIONS = useMemo(() => {
    if (!caseStudiesData) return [];
    return caseStudiesData;
  }, [caseStudiesData]);

  const SELECTED = useMemo(() => {
    if (caseStudy) {
      const opt = OPTIONS.find((o) => o.id === caseStudy);
      return opt?.title;
    }

    return null;
  }, [OPTIONS, caseStudy]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setCaseStudy(null);
  };

  return (
    caseStudiesIsFetched && (
      <FilterSelected text={SELECTED} visible={!!caseStudy} onClear={handleClearClick} />
    )
  );
};

export default CaseStudiesSelected;
