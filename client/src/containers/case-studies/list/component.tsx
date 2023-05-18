import { useCaseStudies } from 'hooks/case-studies';

import { Skeleton } from 'components/ui/skeleton';

import CaseStudiesListItem from '../list-item/component';

const CaseStudiesList = () => {
  const { data: caseStudies, isFetching, isFetched, isError, isPlaceholderData } = useCaseStudies();

  return (
    <section className="space-y-4 py-10">
      {isPlaceholderData && <Skeleton className="h-20 w-full" />}
      {isError && isFetched && !isFetching && (
        <div className="text-center">Oops!! Something went wrong</div>
      )}
      {!isPlaceholderData && !isError && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
          {caseStudies.map((caseStudy) => (
            <CaseStudiesListItem key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CaseStudiesList;
