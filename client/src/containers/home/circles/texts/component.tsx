import { stepAtom } from 'store/home';

import { AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import FadeY from 'containers/home/animations/fadeY';

const Texts = () => {
  const stepStart = 2;
  const step = useRecoilValue(stepAtom);
  const substep = Math.min(Math.max(step - stepStart, 0), 3);

  return (
    <AnimatePresence>
      {substep === 0 && (
        <FadeY key="text-0" className="absolute flex h-full w-full items-center">
          <div className="space-y-10 xl:pl-20">
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

      {substep === 1 && (
        <FadeY key="text-1" className="absolute flex h-full w-full items-center">
          <div className="space-y-10 xl:pl-20">
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

      {substep === 2 && (
        <FadeY key="text-2" className="absolute flex h-full w-full items-center">
          <div className="space-y-10 xl:pl-20">
            <h2 className="font-display text-4xl">A Globally Distributed Foodscape</h2>
            <div className="space-y-4">
              <p className="font-light">
                It is interesting to note that{' '}
                <strong className="font-semibold">the same foodscape</strong> favored by soy{' '}
                <strong className="font-semibold">
                  accounts for 1.4% of the global agricultural landscape, spanning 5 continents.
                </strong>{' '}
                These similarities offer a good starting point to learn from and apply to similar
                foodscapes across the globe.
              </p>
            </div>
          </div>
        </FadeY>
      )}
    </AnimatePresence>
  );
};

export default Texts;
