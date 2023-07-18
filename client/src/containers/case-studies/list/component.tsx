import { GAEvent } from 'lib/analytics/ga';

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

import { Skeleton } from 'components/ui/skeleton';

import CaseStudiesListItem from './item/component';

const CaseStudiesList = () => {
  const setCountry = useSetRecoilState(countryAtom);
  const setProvince = useSetRecoilState(provinceAtom);
  const setCaseStudy = useSetRecoilState(caseStudyAtom);
  const setTmpBbox = useSetRecoilState(tmpBboxAtom);

  const filters = useRecoilValue(filtersSelector(['country', 'province', 'caseStudy']));

  const { data } = useData<CaseStudy>('case-studies', filters);

  const {
    data: caseStudiesData,
    isFetching: caseStudiesIsFetching,
    isFetched: caseStudiesIsFetched,
    isError: caseStudiesIsError,
    isPlaceholderData: caseStudiesIsPlaceholderData,
  } = useCaseStudies();

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setCountry(null);
    setProvince(null);
    setCaseStudy(caseStudy.id);
    setTmpBbox(caseStudy.bbox);

    GAEvent({
      action: 'filter_selected',
      params: {
        type: 'case_study',
        id: caseStudy.id,
        value: caseStudy.title,
        from: 'content',
      },
    });
  };

  return (
    <section className="space-y-4 py-10">
      {caseStudiesIsPlaceholderData && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
          {[...Array(6)].map((_, idx) => (
            <Skeleton key={idx} className="h-72 w-full" />
          ))}
        </div>
      )}

      {caseStudiesIsError && caseStudiesIsFetched && !caseStudiesIsFetching && (
        <div className="text-center">Oops!! Something went wrong</div>
      )}

      {!caseStudiesIsPlaceholderData && !caseStudiesIsError && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {caseStudiesData.map((caseStudy) => {
            const cardDisabled = !data.map((d) => d.id).includes(caseStudy.id);
            return (
              <div key={caseStudy.id}>
                <button
                  type="button"
                  className="w-full"
                  aria-label={`View ${caseStudy.title} case study`}
                  onClick={() => handleCaseStudyClick(caseStudy)}
                  disabled={cardDisabled}
                >
                  <CaseStudiesListItem caseStudy={caseStudy} disabled={cardDisabled} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CaseStudiesList;
