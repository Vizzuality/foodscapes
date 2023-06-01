import Image from 'next/image';

import { contentAtom } from 'store/explore-map';

import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';

import { useCaseStudy } from 'hooks/case-studies';

import Icon from 'components/icon';
import { Skeleton } from 'components/ui/skeleton';

import CHEVRON_LEFT_SVG from 'svgs/ui/arrow-left.svg?sprite';

const CaseStudyDetail = ({ id }: { id: number }) => {
  const {
    data: caseStudyData,
    isPlaceholderData: caseStudyIsPlaceholderData,
    isError: caseStudyIsError,
    isFetched: caseStudyIsFetched,
    isFetching: caseStudyIsFetching,
  } = useCaseStudy(id);

  const setContent = useSetRecoilState(contentAtom);

  const handleCloseCaseStudyDetailClick = () => {
    setContent(null);
  };

  const Content = caseStudyData?.content;

  return (
    <motion.div
      // initial="initial"
      // animate="animate"
      // exit="exit"
      // variants={{
      //   initial: { opacity: 0, x: -20 },
      //   animate: { opacity: 1, x: 0 },
      //   exit: { opacity: 0, x: -20 },
      // }}
      className="flex flex-col"
    >
      <header className="relative z-0 px-20 pt-36">
        <div className="relative z-10 flex justify-between text-xs font-bold">
          <button
            className="flex items-center gap-3 uppercase"
            type="button"
            onClick={handleCloseCaseStudyDetailClick}
          >
            <Icon icon={CHEVRON_LEFT_SVG} className="h-3.5 w-3.5" />
            Case Studies
          </button>
        </div>
        <div className="absolute top-0 left-0 z-0 h-72 w-full bg-violet-500" />

        {caseStudyIsPlaceholderData && (
          <div className="relative z-10 mt-8 h-72 w-full rounded-md bg-gray-50">
            <Skeleton className="h-full w-full" />
          </div>
        )}

        {caseStudyIsError && caseStudyIsFetched && !caseStudyIsFetching && (
          <div className="text-center">Oops!! Something went wrong</div>
        )}

        {!caseStudyIsPlaceholderData && !caseStudyIsError && (
          <>
            <div className="relative z-10 flex justify-center pt-8">
              <span className="relative block h-72 w-full overflow-hidden">
                <Image
                  src={caseStudyData.image}
                  alt={caseStudyData.title}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                />
              </span>
            </div>
            <div className="relative z-10 mt-6 flex flex-col items-center justify-center">
              <h2 className="text-center font-display text-5xl">{caseStudyData.title}</h2>
            </div>
          </>
        )}
      </header>

      {!caseStudyIsPlaceholderData && !caseStudyIsError && (
        <div className="mt-10 w-full overflow-hidden border-t px-20 pt-10 pb-10">
          <Content />
        </div>
      )}
    </motion.div>
  );
};

export default CaseStudyDetail;
