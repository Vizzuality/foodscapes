import { useCaseStudies } from 'hooks/case-studies';

import { Skeleton } from 'components/ui/skeleton';

import CaseStudiesListItem from '../list-item/component';

const CaseStudiesList = () => {
  const {
    data: caseStudiesData,
    isFetching: caseStudiesIsFetching,
    isFetched: caseStudiesIsFetched,
    isError: caseStudiesIsError,
    isPlaceholderData: caseStudiesIsPlaceholderData,
  } = useCaseStudies();
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
          {caseStudiesData.map((caseStudy) => (
            <CaseStudiesListItem key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CaseStudiesList;
