import Image from 'next/image';

import { CaseStudy } from 'types/case-studies';

interface CaseStudiesListItemProps {
  caseStudy: CaseStudy;
}

const CaseStudiesListItem = ({ caseStudy }: CaseStudiesListItemProps) => {
  return (
    <div className="group/item flex flex-col text-center">
      <span className="mb-4 flex h-12 items-end justify-center px-4 font-display">
        {caseStudy.title}
      </span>
      <span className="relative block h-48 overflow-hidden">
        <Image
          className="duration-300 ease-in group-hover/item:scale-110"
          src={caseStudy.image}
          alt={caseStudy.title}
          fill
          sizes="500px"
          priority
          style={{ objectFit: 'cover' }}
        />
      </span>
      <span className="mt-4 text-xs">{caseStudy.description}</span>
    </div>
  );
};

export default CaseStudiesListItem;
