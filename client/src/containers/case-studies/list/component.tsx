import { useCaseStudies } from 'hooks/case-studies';

import CaseStudiesListItem from '../list-item/component';

const NUM_LOADING_SKELETON_ENTRIES = 6;

const CaseStudiesList = () => {
  const { data: caseStudies, isFetching, isFetched, isError } = useCaseStudies();

  return (
    <section className="space-y-4 py-10">
      {isError ? (
        <div className="text-center">Oops!! Something went wrong</div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
          {isFetched && (
            <>
              {caseStudies.map((caseStudy) => (
                <CaseStudiesListItem key={caseStudy.id} caseStudy={caseStudy} />
              ))}
            </>
          )}
          {isFetching && (
            <>
              {[...Array(NUM_LOADING_SKELETON_ENTRIES)].map((_, idx) => (
                <CaseStudiesListItem key={idx} />
              ))}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default CaseStudiesList;
