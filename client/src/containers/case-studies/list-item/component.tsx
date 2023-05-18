import Image from 'next/image';

import { CaseStudy } from 'types/case-studies';

import { Skeleton } from 'components/ui/skeleton';

interface CaseStudiesListItemProps {
  caseStudy?: CaseStudy;
}

const CaseStudiesListItem = ({ caseStudy }: CaseStudiesListItemProps) => {
  return (
    <div className="flex flex-col text-center">
      <span className="mb-4 px-4 font-display">
        {caseStudy ? <>{caseStudy.title}</> : <Skeleton className="h-6 w-full" />}
      </span>
      <span className="relative block h-48 overflow-hidden">
        {caseStudy ? (
          <Image
            className="duration-300 ease-in hover:scale-110"
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            priority
          />
        ) : (
          <Skeleton className="h-48 w-full" />
        )}
      </span>
      <span className="mt-4 text-xs">
        {caseStudy ? <>{caseStudy.description}</> : <Skeleton className="h-6 w-full" />}
      </span>
    </div>
  );
};

export default CaseStudiesListItem;
