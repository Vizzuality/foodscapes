import { stepAtom } from 'store/home';

import { AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import FadeY from 'containers/home/animations/fadeY';

const Circles = () => {
  const step = useRecoilValue(stepAtom);

  return (
    <AnimatePresence>
      {step === 2 && (
        <FadeY key="text-2" className="absolute flex h-full w-full items-center">
          <div className="space-y-10">
            <h2 className="font-display text-3xl">In 2010</h2>
            <div className="space-y-4">
              <p className="font-light">
                More than <strong className="font-semibold">240 million tons of soy</strong> was
                produced across nearly all 83 different foodscapes. Of that, almost{' '}
                <strong className="font-semibold">
                  68% comes from intensive production systems
                </strong>
                , where field size is large and agricultural inputs are high.
              </p>
            </div>
          </div>
        </FadeY>
      )}

      {step === 3 && (
        <FadeY key="text-3" className="absolute flex h-full w-full items-center">
          <div className="space-y-10">
            <h2 className="font-display text-3xl">In 2010</h2>
            <div className="space-y-4">
              <p className="font-light">
                Just one of these 83 different foodscapes produces{' '}
                <strong className="font-semibold">19% of soy globally</strong>. It is characterized
                by its deep fertile soils called Mollisols that are found in the world’s plains, its
                rainfed irrigation, and its single-cropped fields of cereal and oil. Let us focus on
                this foodscape.
              </p>
            </div>
          </div>
        </FadeY>
      )}
    </AnimatePresence>
  );
};

export default Circles;
