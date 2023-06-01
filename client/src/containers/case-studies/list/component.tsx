import { contentAtom, tmpBboxAtom } from 'store/explore-map';

import { useSetRecoilState } from 'recoil';

import { CaseStudy } from 'types/case-studies';

import { useCaseStudies } from 'hooks/case-studies';

import { Skeleton } from 'components/ui/skeleton';

import CaseStudiesListItem from './item/component';

const CaseStudiesList = () => {
  const setContentAtom = useSetRecoilState(contentAtom);
  const setTmpBboxAtom = useSetRecoilState(tmpBboxAtom);

  const {
    data: caseStudiesData,
    isFetching: caseStudiesIsFetching,
    isFetched: caseStudiesIsFetched,
    isError: caseStudiesIsError,
    isPlaceholderData: caseStudiesIsPlaceholderData,
  } = useCaseStudies();

  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setContentAtom({
      id: caseStudy.id,
      type: 'case-study',
    });

    setTmpBboxAtom(caseStudy.bbox);
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
          {caseStudiesData.map((caseStudy) => (
            <div key={caseStudy.id}>
              <button
                type="button"
                className="w-full"
                aria-label={`View ${caseStudy.title} case study`}
                onClick={() => handleCaseStudyClick(caseStudy)}
              >
                <CaseStudiesListItem caseStudy={caseStudy} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CaseStudiesList;
